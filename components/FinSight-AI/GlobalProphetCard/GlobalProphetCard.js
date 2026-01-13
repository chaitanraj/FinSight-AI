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
        let trend_per = trend_percent;
        predicted = Math.min(predicted, last_month_actual * MAX_MULTIPLIER);
        predicted = Math.round(predicted);
        trend_per = Math.round(trend_per);

        // Determine if spending is increasing or decreasing
        const isDecreasing = predicted < last_month_actual;
        const isIncreasing = predicted > last_month_actual;

        if (confidence === 'medium' || confidence === 'high') {
            if (isDecreasing) {
                if (trend_per < -10) {
                    insightType = 'success';
                    message = `🎉 Excellent! Spending trending down significantly to ₹${predicted.toLocaleString()} next month (${trend_per}%). Great job managing expenses!`;
                } else if (trend_per < -5) {
                    insightType = 'success';
                    message = `👍 Good news! Spending decreasing to ₹${predicted.toLocaleString()} next month (${trend_per}%). Keep it up!`;
                } else {
                    insightType = 'success';
                    message = `✅ Nice! Spending slightly lower at ₹${predicted.toLocaleString()} next month (${trend_per}%). You're saving money!`;
                }
            } else if (isIncreasing) {
                
                if (trend_per > 20) {
                    insightType = 'drop';
                    message = `⚠️ Alert! Spending expected to spike significantly to ₹${predicted.toLocaleString()} next month (+${trend_per}%). Consider reviewing your budget.`;
                } else if (trend_per > 10) {
                    insightType = 'prediction';
                    message = `📈 Spending projected to increase to ₹${predicted.toLocaleString()} next month (+${trend_per}%). Plan accordingly!`;
                } else if (trend_per > 5) {
                    insightType = 'prediction';
                    message = `Spending expected to rise slightly to ₹${predicted.toLocaleString()} next month (+${trend_per}%).`;
                } else {
                    insightType = 'info';
                    message = `Spending edging up to ₹${predicted.toLocaleString()} next month (+${trend_per}%).`;
                }
            } else {
                
                insightType = 'info';
                message = `📊 Spending holding steady at ₹${predicted.toLocaleString()} next month (${trend_per > 0 ? '+' : ''}${trend_per}%). Your expenses are stable.`;
            }
        } else if (confidence === 'low') {
           
            if (isDecreasing) {
                insightType = 'info';
                message = `Early signals show spending may decrease to ~₹${predicted.toLocaleString()} next month. Track more to confirm this positive trend!`;
            } else if (isIncreasing) {
                insightType = 'info';
                message = `Early forecast suggests spending may increase to ~₹${predicted.toLocaleString()} next month. Add more data for better accuracy.`;
            } else {
                insightType = 'info';
                message = `Preliminary forecast: ~₹${predicted.toLocaleString()} next month. Keep adding expenses for more reliable predictions.`;
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
                showWarning: confidence === 'low' || trend_per > 20,
                isPlaceholder: false
            }
        };
    }

    return null;
}

export default GlobalProphetCard;