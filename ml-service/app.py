from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import (
    daily_series,
    fit_and_forecast,
    monthly_predict,
    category_predict
)
from anomaly import detect_anomaly_model
import os
from rag import get_rag_response

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000", "https://usefinsightai.vercel.app"],  
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "ML Service is running"}), 200


@app.route("/forecast/global", methods=["POST"])
def forecast_global():
    try:
        data = request.get_json()
        expenses = data.get("expenses", [])
        
        if not expenses:
            return jsonify({"error": "expenses_required"}), 400
        
        result = monthly_predict(expenses)
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/forecast/category", methods=["POST"])
def forecast_category():
    try:
        data = request.get_json()
        expenses = data.get("expenses", [])
        
        if not expenses:
            return jsonify({"error": "expenses_required"}), 400
        
        result = category_predict(expenses)
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/forecast/daily", methods=["POST"])
def forecast_daily():
    try:
        data = request.get_json()
        expenses = data.get("expenses", [])
        
        if not expenses:
            return jsonify({"error": "expenses_required"}), 400
        
        daily_df = daily_series(expenses)
        result = fit_and_forecast(daily_df, periods=30)
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/anomaly", methods=["POST"])
def detect_anomaly():
    try:
        data = request.get_json()
        expenses = data.get("expenses", [])

        if not expenses:
            return jsonify({"error": "expenses_required"}), 400

        result = detect_anomaly_model(expenses)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/rag/chat", methods=["POST"])
def rag_chat():
    try:
        data = request.get_json() or {}
        user_query = data.get("message")

        if not user_query or not isinstance(user_query, str):
            return jsonify({"error": "message_required"}), 400

        result = get_rag_response(user_query)
        return jsonify(result), 200

    except RuntimeError as e:
        return jsonify({"error": str(e)}), 503
    except Exception:
        return jsonify({"error": "rag_service_failed"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)