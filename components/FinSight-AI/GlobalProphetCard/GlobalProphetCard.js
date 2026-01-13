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
        let trend_per = trend_percent
        predicted = Math.min(predicted, last_month_actual * MAX_MULTIPLIER);
        predicted = Math.round(predicted)
        trend_per = Math.round(trend_per)

        if (confidence === 'medium') {
            if (trend_per > 50) {
                insightType = 'prediction';
                message = `Spending expected to increase significantly to ₹${predicted.toLocaleString()} next month (+${trend_per}%).`;
            } else if (trend_per < -5) {
                insightType = 'success';
                message = `Great news! Expenses trending down to ₹${predicted.toLocaleString()} next month (${trend_per}%).`;
            } else if (trend_per > 5) {
                insightType = 'prediction';
                message = `Spending expected to rise to ₹${predicted.toLocaleString()} next month (+${trend_per}%).`;
            } else {
                insightType = 'info';
                message = `Spending stable at ~₹${predicted.toLocaleString()} next month (${trend_per > 0 ? '+' : ''}${trend_per}%).`;
            }
        }

        return {
            type: insightType,
            message: message,
            meta: {
                predictionValue: predicted_next_month,
                lastMonthActual: last_month_actual,
                trendPercent: trend_per,
                confidence: confidence,
                modelType: 'prophet',
                displayValue: confidence === 'low'
                    ? `₹${Math.max(1000, Math.floor(predicted / 1000) * 1000)}`
                    : `₹${predicted.toLocaleString()}`,
                confidenceLevel: confidence,
                showWarning: confidence === 'low',
                isPlaceholder: false
            }
        };
    }

    return null;
}

export default GlobalProphetCard;
