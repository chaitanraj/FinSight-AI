import pandas as pd
from prophet import Prophet
from typing import List, Dict, Any


def daily_series(expenses: List[Dict[str, Any]]) -> pd.DataFrame:
    if not expenses:
        return pd.DataFrame(columns=["ds", "y"])
    
    df = pd.DataFrame(expenses)
    
    if "date" not in df.columns or "amount" not in df.columns:
        raise ValueError("expenses must include 'date' and 'amount' fields")
    
    df["date"] = pd.to_datetime(df["date"])
    df["amount"] = df["amount"].astype(float)
    
    daily = df.groupby(df["date"].dt.date)["amount"].sum().reset_index()
    daily["ds"] = pd.to_datetime(daily["date"])
    daily["y"] = daily["amount"]
    daily = daily[["ds", "y"]].sort_values("ds")
    
    return daily


def fit_and_forecast(daily_df: pd.DataFrame, periods: int = 30) -> Dict:
    n_days = daily_df.shape[0]
    
    if n_days < 14:
        return {"error": "not_enough_data", "rows": int(n_days)}
    
    model = Prophet(
        daily_seasonality=False,
        weekly_seasonality='auto',
        yearly_seasonality='auto'
    )
    
    model.fit(daily_df)
    
    future = model.make_future_dataframe(periods=periods, freq='D')
    forecast = model.predict(future)
    
    last_forecast = forecast.tail(periods).reset_index(drop=True)
    
    result = {
        "forecast_tail": last_forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].to_dict(orient="records"),
        "future_len": int(periods),
        "days_of_data": int(n_days)
    }
    
    return result


def monthly_predict(expenses: List[Dict[str, Any]]) -> Dict:
    if not expenses:
        return {"error": "no_data"}
    
    df = pd.DataFrame(expenses)
    df["date"] = pd.to_datetime(df["date"]).dt.tz_localize(None)
    df["amount"] = df["amount"].astype(float)
    
    monthly = (
        df.groupby(pd.Grouper(key="date", freq="M"))["amount"]
        .sum()
        .reset_index()
        .rename(columns={"date": "ds", "amount": "y"})
        .sort_values("ds")
    )
    
    n_months = monthly.shape[0]
    
    if n_months < 3:
        return {
            "error": "insufficient_data",
            "rows": int(n_months),
            "message": "Need at least 3 months of data"
        }
    
    last_val = float(monthly["y"].iloc[-1])
    
    if last_val <= 0:
        return {"error": "invalid_last_month"}
    
    if n_months < 6:
        predicted = float(monthly["y"].mean())
        method = "simple_average"
        confidence = "low"
    
    elif n_months < 12:
        recent_months = min(3, n_months)
        weights = list(range(1, recent_months + 1))
        recent = monthly["y"].tail(recent_months)
        predicted = float(sum(recent * weights) / sum(weights))
        method = "weighted_average"
        confidence = "medium"
    
    else:
        model = Prophet(
            yearly_seasonality='auto',
            weekly_seasonality='auto',
            daily_seasonality=False,
            seasonality_mode='multiplicative'
        )
        
        if n_months < 24:
            model.add_seasonality(
                name='monthly',
                period=30.5,
                fourier_order=3
            )
        
        model.fit(monthly)
        future = model.make_future_dataframe(periods=1, freq="M")
        forecast = model.predict(future)
        
        predicted = float(forecast.iloc[-1]["yhat"])
        method = "prophet"
        confidence = "medium" if n_months < 24 else "high"
    
    predicted = max(predicted, last_val * 0.2)
    predicted = min(predicted, last_val * 3.0)
    predicted = max(predicted, 0)
    
    trend_percent = round(
        ((predicted - last_val) / last_val) * 100, 2
    )

    return {
        "predicted_next_month": round(predicted, 2),
        "last_month_actual": round(last_val, 2),
        "trend_percent": trend_percent,
        "confidence": confidence,
        "method": method,
        "months_of_data": int(n_months)
    }


def category_predict(expenses: List[Dict[str, Any]]) -> Dict:
    if not expenses:
        return {"error": "no_data"}

    df = pd.DataFrame(expenses)

    if "category" not in df.columns:
        return {"error": "category_field_missing"}

    df["date"] = pd.to_datetime(df["date"]).dt.tz_localize(None)
    df["amount"] = df["amount"].astype(float)

    monthly = (
        df
        .groupby([
            "category",
            pd.Grouper(key="date", freq="M")
        ])["amount"]
        .sum()
        .reset_index()
        .rename(columns={"date": "ds", "amount": "y"})
        .sort_values("ds")
    )

    result = {}

    for cat in monthly["category"].unique():
        df_cat = monthly[monthly["category"] == cat][["ds", "y"]]
        n_months = df_cat.shape[0]
        
        if n_months < 3:
            result[cat] = {
                "error": "not_enough_months",
                "rows": int(n_months),
                "forecast_next_month": None
            }
            continue
        
        last_val = float(df_cat["y"].iloc[-1])
        
        if n_months < 12:
            recent_months = min(3, n_months)
            weights = list(range(1, recent_months + 1))
            recent = df_cat["y"].tail(recent_months)
            predicted = float(sum(recent * weights) / sum(weights))
            predicted = max(predicted, 0.0)
            method = "weighted_average"
            confidence = "low" if n_months < 6 else "medium"
        else:
            model = Prophet(
                yearly_seasonality='auto',
                weekly_seasonality='auto',
                daily_seasonality=False,
                seasonality_mode='multiplicative'
            )
            
            if n_months < 24:
                model.add_seasonality(
                    name='monthly',
                    period=30.5,
                    fourier_order=3
                )
            
            model.fit(df_cat)
            future = model.make_future_dataframe(periods=1, freq="M")
            forecast = model.predict(future)
            
            predicted = max(float(forecast.iloc[-1]["yhat"]), 0.0)
            method = "prophet"
            confidence = "medium" if n_months < 24 else "high"
        
        if last_val > 0:
            predicted = max(predicted, last_val * 0.2)
            predicted = min(predicted, last_val * 3.0)

        result[cat] = {
            "forecast_next_month": round(predicted, 2),
            "last_month_actual": round(last_val, 2),
            "trend_percent": (
                round(
                    ((predicted - last_val) / last_val) * 100,
                    2
                )
                if last_val != 0
                else None
            ),
            "method": method,
            "confidence": confidence,
            "months_of_data": int(n_months),
            "status": "ok"
        }

    return result