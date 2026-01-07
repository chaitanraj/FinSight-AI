# prophet model 
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
    if daily_df.shape[0] < 5:
        return {"error": "not_enough_data", "rows": int(daily_df.shape[0])}
    
    model = Prophet(daily_seasonality=True, weekly_seasonality=True, yearly_seasonality=True)
    model.fit(daily_df)
    
    future = model.make_future_dataframe(periods=periods, freq='D')
    forecast = model.predict(future)
    
    last_forecast = forecast.tail(periods).reset_index(drop=True)
    
    result = {
        "forecast_tail": last_forecast[["ds", "yhat", "yhat_lower", "yhat_upper"]].to_dict(orient="records"),
        "future_len": int(periods)
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
    
    if monthly.shape[0] < 6:
        return {"error": "not_enough_months", "rows": int(monthly.shape[0])}
    
    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=False,
        daily_seasonality=False
    )
    model.fit(monthly)
    
    future = model.make_future_dataframe(periods=1, freq="M")
    forecast = model.predict(future)
    
    next_row = forecast.iloc[-1]
    last_val = float(monthly["y"].iloc[-1])

    if last_val <= 0:
        return {"error": "invalid_last_month"}

    raw_predicted = float(next_row["yhat"])

    MAX_MULTIPLIER = 3.0
    predicted_capped = min(raw_predicted, last_val * MAX_MULTIPLIER)
    predicted_capped = max(predicted_capped, 0)

    trend_percent = round(
        ((predicted_capped - last_val) / last_val) * 100, 2
    )

    return {
        "predicted_next_month": round(predicted_capped, 2),
        "last_month_actual": round(last_val, 2),
        "trend_percent": trend_percent,
        "confidence": "low" if abs(trend_percent) > 100 else "medium"
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

      
        if df_cat.shape[0] < 4:
            result[cat] = {
                "error": "not_enough_months",
                "rows": int(df_cat.shape[0]),
                "forecast_next_month": None
            }
            continue

        model = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=False,
            daily_seasonality=False
        )

        model.fit(df_cat)

        future = model.make_future_dataframe(periods=1, freq="M")
        forecast = model.predict(future)

        next_row = forecast.iloc[-1]
        # handling negative values 
        predicted = max(float(next_row["yhat"]), 0.0)

        result[cat] = {
            "forecast_next_month": round(predicted, 2),
            "last_month_actual": round(float(df_cat["y"].iloc[-1]), 2),
            "trend_percent": (
                round(
                    ((predicted - df_cat["y"].iloc[-1]) / df_cat["y"].iloc[-1]) * 100,
                    2
                )
                if df_cat["y"].iloc[-1] != 0
                else None
            ),
            "status": "ok"
        }

    return result
