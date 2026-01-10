import { AuthContext } from '@/context/AuthContext'
import React, { useContext, useEffect } from 'react'

const GlobalProphetCard = ({ onInsight }) => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.id) return;
        let isMounted = true;

        const GlobalProphet = async () => {
            try {
                const res = await fetch("/api/forecast/global", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ userId: user.id })
                })
                if (!res.ok) {
                    console.log("/forecast/global fetch failed");
                    return;
                }
                const data = await res.json();
                if (!data) {
                    console.log("Prophet data can't be found");
                    return;
                }
                console.log("Prophet Response:", data);
                const filteredInsight = filterAndFormatProphetData(data);
                if (filteredInsight && isMounted) {
                    onInsight(filteredInsight);
                }

            } catch (err) {
                console.log("Prophet global model fetch failed", err);
            }
        }

        GlobalProphet();
        return () => {
            isMounted = false;
        };
    }, [user?.id]);

    const filterAndFormatProphetData = (data) => {

        if (data.status === 'insufficient_data' || data.confidence === 'none' || !data.predicted_next_month) {
            return {
                type: 'info',
                message: 'Predictive model is still calculating. Keep adding expenses for faster and better prediction for next month.',
                meta: {
                    modelType: 'prophet',
                    status: 'insufficient_data',
                    confidenceLevel: 'none',
                    showWarning: false,
                    isPlaceholder: true
                }
            };
        }

        const { confidence, last_month_actual, predicted_next_month, trend_percent } = data;

        const isUnrealistic = predicted_next_month > (last_month_actual * 5)
            || predicted_next_month < (last_month_actual * 0.2);

        if (isUnrealistic && confidence === 'low') {
            return {
                type: 'info',
                message: 'Add more expense data to improve prediction accuracy for next month.',
                meta: {
                    modelType: 'prophet',
                    status: 'unreliable',
                    confidenceLevel: 'very_low',
                    showWarning: true,
                    isPlaceholder: true
                }
            };
        }

        if (!predicted_next_month || !last_month_actual || predicted_next_month < 0) {
            return {
                type: 'info',
                message: 'Not enough data yet. Add expenses regularly to enable monthly predictions.',
                meta: {
                    modelType: 'prophet',
                    status: 'no_data',
                    confidenceLevel: 'none',
                    showWarning: false,
                    isPlaceholder: true
                }
            };
        }


        let insightType = 'prediction';
        let message = '';
        const MAX_MULTIPLIER = 2.0;
        let predicted = predicted_next_month;
        predicted = Math.min(predicted, last_month_actual * MAX_MULTIPLIER);

        if (confidence === 'low' && trend_percent > 100) {
            insightType = 'prediction';
            message = `Your expenses may increase to ₹${Math.max(1000, Math.floor(predicted / 1000) * 1000)}+ next month, but confidence is low. Review recent spending patterns.`;
        } else if (confidence === 'low') {
            insightType = 'prediction';
            message = `Predicted expenses: ₹${Math.max(1000, Math.floor(predicted / 1000) * 1000)}+ (Low confidence - need more data for accuracy)`;
        } else if (trend_percent > 100) {
            insightType = 'prediction';
            message = `Expense spike detected! Predicted ₹${predicted.toLocaleString()} next month (${trend_percent}% increase from ₹${last_month_actual.toLocaleString()})`;
        } else if (trend_percent < -20) {
            insightType = 'success';
            message = `Great news! Expenses trending down to ₹${predicted.toLocaleString()} next month (${Math.abs(trend_percent)}% decrease)`;
        } else {
            insightType = 'prediction';
            message = `Next month forecast: ₹${predicted.toLocaleString()} (${trend_percent > 0 ? '+' : ''}${trend_percent}% from last month)`;
        }



        return {
            type: insightType,
            message: message,
            meta: {
                predictionValue: predicted_next_month,
                lastMonthActual: last_month_actual,
                trendPercent: trend_percent,
                confidence: confidence,
                modelType: 'prophet',
                displayValue: confidence === 'low'
                    ? `₹${Math.max(1000, Math.floor(predicted / 1000) * 1000)}`
                    : `₹${predicted.toLocaleString()}`,
                confidenceLevel: confidence,
                showWarning: confidence === 'low' || trend_percent > 100,
                isPlaceholder: false
            }
        };
    }

    return null;
}

export default GlobalProphetCard;
