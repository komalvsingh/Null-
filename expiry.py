from flask import Flask, jsonify, request
from pymongo import MongoClient
from langchain.llms import HuggingFaceHub
import os
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient(os.getenv("MONGODB_URL"))
db = client["foodmanage"]
items_collection = db["items"]
requests_collection = db["orphanageposts"]

# Initialize Hugging Face Model via LangChain
llm = HuggingFaceHub(
    repo_id="mistralai/Mistral-7B-Instruct-v0.2",
    model_kwargs={"temperature": 1.0, "top_p": 0.95, "max_length": 250},
    huggingfacehub_api_token=os.getenv("HF_API_KEY")
)

# Function to check expiring products
def check_expiring_products():
    today = datetime.utcnow()
    expiry_threshold = today + timedelta(days=5)

    print(f"Checking for expiry dates before: {expiry_threshold}")

    expiring_items = list(items_collection.find({
        "expiryDate": {"$lte": expiry_threshold},
        "status": "Available"
    }))

    print(f"Expiring items found: {len(expiring_items)}")

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
    today = datetime.utcnow()
    expiry_threshold = today + timedelta(days=3)

    expiring_items = list(items_collection.find({
        "expiryDate": {"$lte": expiry_threshold},
        "status": "Available"
    }))

    orphanage_requests = list(requests_collection.find({}))

    if not expiring_items:
        return ["No expiring products found."]

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

# New function to predict category and unit
@app.route('/api/predict-category', methods=['POST'])
def predict_category():
    data = request.json
    item_name = data['item']
    categories = data['categories']
    units = data['units']
    
    print(f"🔵 Received Item: {item_name}")
    print(f"🎯 Available Categories: {categories}")
    print(f"🎯 Available Units: {units}")

    try:
        # More detailed and structured prompt
        prompt = f"""Given the food item '{item_name}', analyze its characteristics and categorize it.

Rules for categorization:
1. Fruits: Fresh fruits, dried fruits, or fruit products
2. Vegetables: Fresh vegetables, leafy greens, or vegetable products
3. Dairy: Milk, cheese, yogurt, butter, or other dairy products
4. Grains: Rice, wheat, bread, cereals, or grain products

Rules for units:
1. kg: For bulk items and larger quantities of solid foods
2. grams: For smaller quantities of solid foods or precise measurements
3. liters: For liquid items only

Analyze '{item_name}' and respond in this exact JSON format:
{{
    "category": "<category>",
    "unit": "<unit>",
    "confidence": "<confidence>",
    "reasoning": "<brief explanation>"
}}

Be precise and consider the item's typical form and usage."""

        response = llm(prompt)
        print(f"🟡 Raw AI Response: {response}")

        # Extract JSON from response (more robust parsing)
        import re
        import json
        
        # Find JSON-like structure in the response
        json_match = re.search(r'\{.*\}', response, re.DOTALL)
        if json_match:
            try:
                result = json.loads(json_match.group())
            except json.JSONDecodeError:
                print("🔴 JSON parsing failed, using default response")
                result = {
                    "category": categories[0],
                    "unit": units[0],
                    "confidence": "low",
                    "reasoning": "Failed to parse AI response"
                }
        else:
            print("🔴 No JSON found in response, using default response")
            result = {
                "category": categories[0],
                "unit": units[0],
                "confidence": "low",
                "reasoning": "No structured response found"
            }

        # Validate and clean the response
        if 'category' not in result or result['category'] not in categories:
            print(f"⚠️ Invalid Category: {result.get('category', 'None')} → Correcting")
            # Use more sophisticated category matching
            item_name_lower = item_name.lower()
            
            # Basic category matching rules
            category_rules = {
                'Fruits': ['apple', 'banana', 'orange', 'grape', 'berry', 'fruit'],
                'Vegetables': ['carrot', 'potato', 'tomato', 'onion', 'vegetable', 'leafy'],
                'Dairy': ['milk', 'cheese', 'yogurt', 'butter', 'cream'],
                'Grains': ['rice', 'wheat', 'bread', 'cereal', 'flour', 'pasta']
            }
            
            # Find the best matching category
            matched_category = None
            for category, keywords in category_rules.items():
                if any(keyword in item_name_lower for keyword in keywords):
                    matched_category = category
                    break
            
            result['category'] = matched_category if matched_category in categories else categories[0]

        if 'unit' not in result or result['unit'] not in units:
            print(f"⚠️ Invalid Unit: {result.get('unit', 'None')} → Correcting")
            # Basic unit matching logic
            item_name_lower = item_name.lower()
            if any(liquid_keyword in item_name_lower for liquid_keyword in ['milk', 'juice', 'water', 'oil']):
                result['unit'] = 'liters'
            elif any(small_keyword in item_name_lower for small_keyword in ['spice', 'powder', 'seed']):
                result['unit'] = 'grams'
            else:
                result['unit'] = 'kg'

        # Ensure all required fields are present
        final_result = {
            "category": result.get('category', categories[0]),
            "unit": result.get('unit', units[0]),
            "confidence": result.get('confidence', 'medium'),
            "reasoning": result.get('reasoning', 'Based on item characteristics')
        }

        print(f"✅ Final Prediction: {final_result}")
        return jsonify(final_result)

    except Exception as e:
        print(f"🔴 Error in prediction: {str(e)}")
        return jsonify({
            "category": categories[0],
            "unit": units[0],
            "confidence": "low",
            "reasoning": f"Error occurred: {str(e)}"
        })

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