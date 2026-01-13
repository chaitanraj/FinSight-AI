import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { AlertTriangle } from 'lucide-react';

const AnomalyCard = ({ onInsight }) => {
    const { user } = useContext(AuthContext);
    const [message, setMessage] = useState(null);

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

                console.log(data);
                const { anomalies, anomaly_days, average_expense } = data;

                let dispalyAnomlayDays="";
                if (average_expense < 500) return;
                const meaningful=anomalies;
                
                if(anomaly_days>10)
                    dispalyAnomlayDays="10+";
                else
                    dispalyAnomlayDays=anomaly_days

                if (meaningful.length === 0) {
                    onInsight({
                        type: "success",
                        message: "Your spending looks consistent with your usual pattern",
                        icon: AlertTriangle,
                        meta:null,
                    });
                    return;
                }

                const text =
                    meaningful.length > 3
                        ? `Your spending has been more variable on several days recently.`
                        : `We noticed ${meaningful.length} day${meaningful.length > 1 ? "s" : ""
                        } with unusually high spending.`;

                onInsight({
                    type: "warning",
                    message: text,
                    meta: {
                        anomalyDays: anomaly_days,
                        display:dispalyAnomlayDays,
                        anomalies: meaningful,
                        averageExpense: average_expense
                    },
                    priority: "high"
                });

            } catch (e) {
                console.log("Anomaly Insights failed", e);
            }
        }

        AnomalyInsights();

    }, [user?.id]);

    return (
        null
    )
}

export default AnomalyCard;
