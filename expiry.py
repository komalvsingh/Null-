from flask import Flask, jsonify
from pymongo import MongoClient
from langchain.llms import HuggingFaceHub
import os
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient(os.getenv("MONGODB_URL"))
db = client["food_donation"]
items_collection = db["items"]
requests_collection = db["requests"]

# Initialize Hugging Face Model via LangChain
llm = HuggingFaceHub(
    repo_id="mistralai/Mistral-7B-Instruct-v0.2",  
    model_kwargs={"temperature": 0.7, "max_length": 200},
    huggingfacehub_api_token=os.getenv("HF_API_KEY")
)

# Function to check expiring products
def check_expiring_products():
    today = datetime.utcnow()
    expiry_threshold = today + timedelta(days=3)

    expiring_items = list(items_collection.find({
        "expiryDate": {"$lte": expiry_threshold.strftime('%Y-%m-%d')},
        "status": "Available"
    }))

    if not expiring_items:
        return "No expiring products found."

    prompt = f"""
    The following food items are expiring soon:
    {', '.join([f"{item['itemName']} ({item['quantity']} {item['unit']}) in {item['location']}, expires on {item['expiryDate']}" for item in expiring_items])}.
    Suggest an appropriate action.
    """

    ai_response = llm(prompt)
    return ai_response

# Function to match expiring items with orphanage requests
def match_expiring_items():
    expiring_items = list(items_collection.find({
        "expiryDate": {"$lte": (datetime.utcnow() + timedelta(days=3)).strftime('%Y-%m-%d')},
        "status": "Available"
    }))

    orphanage_requests = list(requests_collection.find({}))

    recommendations = []
    for item in expiring_items:
        matching_requests = [req for req in orphanage_requests if req["itemName"].lower() in item["itemName"].lower()]
        
        if matching_requests:
            prompt = f"""
            The following orphanage requests match the expiring food items:
            - Expiring Item: {item['itemName']} ({item['quantity']} {item['unit']}), Location: {item['location']}, Expiry: {item['expiryDate']}
            - Matching Requests: {', '.join([req['location'] for req in matching_requests])}
            Recommend further action.
            """
            ai_response = llm(prompt)
            recommendations.append(ai_response)

    return recommendations if recommendations else ["No matching requests found."]

# Function to send email notifications
def send_email(subject, message):
    sender_email = os.getenv("EMAIL_USER")
    receiver_email = os.getenv("STORE_EMAIL")
    password = os.getenv("EMAIL_PASS")

    msg = MIMEText(message)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = receiver_email

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, msg.as_string())

# API Route: Check Expiring Products
@app.route("/check-expiring", methods=["GET"])
def api_check_expiring():
    response = check_expiring_products()
    send_email("Expiring Products Notification", response)
    return jsonify({"message": response})

# API Route: Match Expiring Items with Requests
@app.route("/match-requests", methods=["GET"])
def api_match_requests():
    response = match_expiring_items()
    send_email("Food Donation Recommendations", "\n".join(response))
    return jsonify({"message": response})

# Run Flask App
if __name__ == "__main__":
    app.run(debug=True, port=5000)
