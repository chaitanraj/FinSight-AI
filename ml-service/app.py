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
import logging
import traceback

app = Flask(__name__)

# Configure CORS properly
CORS(app, resources={
    r"/*": {
        "origins": ["*"],  # In production, replace with your Vercel domain
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "ML Service is running"}), 200


@app.route("/forecast/global", methods=["POST"])
def forecast_global():
    try:
        logger.info("Received global forecast request")
        data = request.get_json()
        expenses = data.get("expenses", [])
        
        if not expenses:
            logger.warning("No expenses provided")
            return jsonify({"error": "expenses_required"}), 400
        
        logger.info(f"Processing {len(expenses)} expenses")
        result = monthly_predict(expenses)
        logger.info("Global forecast completed successfully")
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error in global forecast: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e), "type": type(e).__name__}), 500


@app.route("/forecast/category", methods=["POST"])
def forecast_category():
    try:
        logger.info("Received category forecast request")
        data = request.get_json()
        expenses = data.get("expenses", [])
        
        if not expenses:
            logger.warning("No expenses provided")
            return jsonify({"error": "expenses_required"}), 400
        
        logger.info(f"Processing {len(expenses)} expenses")
        result = category_predict(expenses)
        logger.info("Category forecast completed successfully")
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error in category forecast: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e), "type": type(e).__name__}), 500


@app.route("/forecast/daily", methods=["POST"])
def forecast_daily():
    try:
        logger.info("Received daily forecast request")
        data = request.get_json()
        expenses = data.get("expenses", [])
        
        if not expenses:
            logger.warning("No expenses provided")
            return jsonify({"error": "expenses_required"}), 400
        
        logger.info(f"Processing {len(expenses)} expenses")
        daily_df = daily_series(expenses)
        result = fit_and_forecast(daily_df, periods=30)
        logger.info("Daily forecast completed successfully")
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error in daily forecast: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e), "type": type(e).__name__}), 500


@app.route("/anomaly", methods=["POST"])
def detect_anomaly():
    try:
        logger.info("Received anomaly detection request")
        data = request.get_json()
        expenses = data.get("expenses", [])

        if not expenses:
            logger.warning("No expenses provided")
            return jsonify({"error": "expenses_required"}), 400

        logger.info(f"Processing {len(expenses)} expenses for anomaly detection")
        result = detect_anomaly_model(expenses)
        logger.info("Anomaly detection completed successfully")
        return jsonify(result), 200

    except Exception as e:
        logger.error(f"Error in anomaly detection: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e), "type": type(e).__name__}), 500


# Add health check endpoint
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "service": "ML Model API",
        "endpoints": ["/forecast/global", "/forecast/category", "/forecast/daily", "/anomaly"]
    }), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    logger.info(f"Starting Flask app on port {port}")
    app.run(host="0.0.0.0", port=port, debug=False)