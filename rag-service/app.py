from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from rag import get_rag_response

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",
            "https://usefinsightai.vercel.app",
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
    }
})


@app.route("/", methods=["GET"])
@app.route("/health", methods=["GET"])
def home():
    return jsonify({"message": "RAG Service is running"}), 200


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
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)
