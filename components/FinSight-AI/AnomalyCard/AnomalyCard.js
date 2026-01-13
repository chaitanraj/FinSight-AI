import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { AlertTriangle } from 'lucide-react';

const AnomalyCard = ({ onInsight }) => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.id) return;
        
        const AnomalyInsights = async () => {
            try {
                const res = await fetch(`/api/forecast/anomaly`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ userId: user.id })
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

                if (!data) {
                    console.log("Anomaly data can't be found");
                    return;
                }

                console.log("Anomaly Response:", data);
                const { anomalies, anomaly_days, average_expense } = data;

                if (average_expense < 500) return;

                const meaningful = anomalies;
                
                if (meaningful.length === 0) {
                    onInsight({
                        type: "success",
                        message: "Your spending looks consistent with your usual pattern.",
                        meta: {
                            modelType: 'anomaly',
                            isPlaceholder: false,
                            anomalyDays: 0,
                            display: "0",
                            anomalies: [],
                            averageExpense: average_expense
                        }
                    });
                    return;
                }

                // Generate message based on anomaly count
                let message = '';
                let insightType = 'warning';
                
                if (anomaly_days >= 15) {
                    message = `${anomaly_days} unusual spending days detected. Your expenses show high variability—review the breakdown to identify patterns.`;
                    insightType = 'warning';
                } else if (anomaly_days >= 8) {
                    message = `${anomaly_days} days showed unusual spending patterns. Some fluctuation is normal, but monitor these trends.`;
                    insightType = 'info';
                } else if (anomaly_days >= 4) {
                    message = `${anomaly_days} unusual spending days found. These may be one-time expenses or special occasions.`;
                    insightType = 'info';
                } else {
                    message = `${anomaly_days} day${anomaly_days > 1 ? 's' : ''} with unusually high spending detected.`;
                    insightType = 'warning';
                }

                
                const displayAnomalyDays = anomaly_days > 10 ? "10+" : anomaly_days.toString();

                onInsight({
                    type: insightType,
                    message: message,
                    meta: {
                        modelType: 'anomaly',
                        isPlaceholder: false,
                        anomalyDays: anomaly_days,
                        display: displayAnomalyDays,
                        anomalies: meaningful.sort((a, b) => a.score - b.score),
                        averageExpense: average_expense
                    }
                });

            } catch (e) {
                console.log("Anomaly Insights failed", e);
            }
        }

        AnomalyInsights();

    }, [user?.id, onInsight]);

    return null;
}

export default AnomalyCard;