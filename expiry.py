from flask import Flask, jsonify, request
from pymongo import MongoClient
from langchain.llms import HuggingFaceHub
import os
import json
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta
from dotenv import load_dotenv
from flask_cors import CORS
from bson import ObjectId
import traceback

# Custom JSON encoder to handle MongoDB ObjectId
class MongoJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)
app.json_encoder = MongoJSONEncoder  # Use custom JSON encoder

# Connect to MongoDB
client = MongoClient(os.getenv("MONGODB_URL"))
db = client["foodmanage"]
items_collection = db["items"]
requests_collection = db["orphanageposts"]

# Initialize Hugging Face Model via LangChain
llm = HuggingFaceHub(
    repo_id="tiiuae/falcon-7b-instruct",
    model_kwargs={"temperature": 1.0, "top_p": 0.95, "max_length": 250},
    huggingfacehub_api_token=os.getenv("HF_API_KEY")
)

# Define dynamic expiry thresholds
EXPIRY_THRESHOLDS = {
    "Fruits": 5,
    "Vegetables": 7,
    "Dairy": 3,
    "Grains": 13,
    "Meat": 2,
    "Beverages": 10
}

def get_expiry_threshold(category):
    return EXPIRY_THRESHOLDS.get(category, 5)

# Function to format date for better display
def format_date_for_display(date_obj_or_string):
    try:
        # If it's already a string, try to parse it
        if isinstance(date_obj_or_string, str):
            # Try to parse ISO format with timezone info
            try:
                date_obj = datetime.fromisoformat(date_obj_or_string.replace('Z', '+00:00'))
            except ValueError:
                # Try to parse the format with T00:00:00 at the end
                try:
                    base_format = date_obj_or_string.split('T')[0]
                    date_obj = datetime.strptime(base_format, "%Y-%m-%d")
                except:
                    return date_obj_or_string  # Return as is if we can't parse it
        else:
            date_obj = date_obj_or_string
            
        # Format as YYYY-MM-DD
        return date_obj.strftime("%Y-%m-%d")
    except:
        # If any error occurs, return the original
        return str(date_obj_or_string)

# Function to sanitize MongoDB document for JSON response
def sanitize_document(doc):
    if not doc:
        return None
    
    # Convert MongoDB document for JSON serialization
    if isinstance(doc, dict):
        # Convert ObjectId to string
        if '_id' in doc:
            doc['_id'] = str(doc['_id'])
        
        # Convert datetime objects to ISO format strings
        for key, value in doc.items():
            if isinstance(value, datetime):
                doc[key] = value.isoformat()
    
    return doc

# Function to check expiring products
def check_expiring_products():
    today = datetime.utcnow()
    expiring_items = []
    
    try:
        all_items = list(items_collection.find({"status": "Available"}))
        sanitized_items = [sanitize_document(item) for item in all_items]
        
        for item in sanitized_items:
            category = item.get("category", "Unknown")
            expiry_threshold = today + timedelta(days=get_expiry_threshold(category))
            
            # Handle date string vs datetime object
            item_expiry = item.get("expiryDate")
            if isinstance(item_expiry, str):
                try:
                    item_expiry = datetime.fromisoformat(item_expiry.replace('Z', '+00:00'))
                except ValueError:
                    try:
                        # Try to parse the format with T00:00:00
                        base_format = item_expiry.split('T')[0]
                        item_expiry = datetime.strptime(base_format, "%Y-%m-%d")
                    except:
                        continue  # Skip this item if date parsing fails
            
            if item_expiry and item_expiry <= expiry_threshold:
                # Format expiry date for display
                formatted_expiry = format_date_for_display(item['expiryDate'])
                
                # Create structured item data
                expiring_item = {
                    "itemName": item.get('itemName', ''),
                    "quantity": item.get('quantity', ''),
                    "unit": item.get('unit', ''),
                    "location": item.get('location', ''),
                    "expiryDate": formatted_expiry,
                    "category": category,
                    "daysUntilExpiry": (item_expiry - today).days,
                    "status": "Available"
                }
                expiring_items.append(expiring_item)

        print(f"Expiring items found: {len(expiring_items)}")

        if not expiring_items:
            return {
                "status": "success",
                "message": "No expiring products found.",
                "data": []
            }

        # Generate AI recommendation based on the items
        items_description = ", ".join([
            f"{item['itemName']} ({item['quantity']} {item['unit']}) in {item['location']}, expires on {item['expiryDate']}"
            for item in expiring_items
        ])

        prompt = f"""
        The following food items are expiring soon:
        {items_description}.
        Suggest an appropriate action.
        """

        ai_recommendation = llm(prompt)

        # Return structured JSON response
        response = {
            "status": "success",
            "message": "Found expiring products",
            "data": {
                "items": expiring_items,
                "totalItems": len(expiring_items),
                "recommendation": ai_recommendation
            }
        }
        
        return response
    
    except Exception as e:
        error_msg = f"Error in check_expiring_products: {str(e)}\n{traceback.format_exc()}"
        print(error_msg)
        return {
            "status": "error",
            "message": f"Error checking expiring products: {str(e)}",
            "data": None
        }

# Update the API route to handle the JSON response
@app.route("/check-expiring", methods=["GET"])
def api_check_expiring():
    response = check_expiring_products()
    
    # Only send email if there are expiring items
    if response["status"] == "success" and response["data"] and response["data"]["items"]:
        email_content = (
            f"Found {response['data']['totalItems']} expiring items.\n\n"
            f"AI Recommendation:\n{response['data']['recommendation']}\n\n"
            "Items List:\n" + "\n".join([
                f"- {item['itemName']} ({item['quantity']} {item['unit']}) in {item['location']}, expires on {item['expiryDate']}"
                for item in response['data']['items']
            ])
        )
        email_sent = send_email("Expiring Products Notification", email_content)
        response["email_sent"] = email_sent
    
    return jsonify(response)

# Function to match expiring items with orphanage requests
def match_expiring_items():
    today = datetime.utcnow()
    expiring_items = []
    
    try:
        all_items = list(items_collection.find({"status": "Available"}))
        sanitized_items = [sanitize_document(item) for item in all_items]
        
        for item in sanitized_items:
            category = item.get("category", "Unknown")
            expiry_threshold = today + timedelta(days=get_expiry_threshold(category))
            
            # Handle date string vs datetime object
            item_expiry = item.get("expiryDate")
            if isinstance(item_expiry, str):
                try:
                    item_expiry = datetime.fromisoformat(item_expiry.replace('Z', '+00:00'))
                except ValueError:
                    try:
                        # Try to parse the format with T00:00:00
                        base_format = item_expiry.split('T')[0]
                        item_expiry = datetime.strptime(base_format, "%Y-%m-%d")
                    except:
                        continue  # Skip this item if date parsing fails
            
            if item_expiry and item_expiry <= expiry_threshold:
                expiring_items.append(item)

        orphanage_requests = list(requests_collection.find({}))
        sanitized_requests = [sanitize_document(req) for req in orphanage_requests]

        if not expiring_items:
            return ["No expiring products found."]

        recommendations = []
        for item in expiring_items:
            matching_requests = [
                req for req in sanitized_requests 
                if 'itemName' in req and 'itemName' in item and 
                req["itemName"].lower() in item["itemName"].lower()
            ]

            if matching_requests:
                # Format expiry date for display
                formatted_expiry = format_date_for_display(item['expiryDate'])
                
                prompt = f"""
                The following orphanage requests match the expiring food items:
                - Expiring Item: {item['itemName']} ({item['quantity']} {item['unit']}), Location: {item['location']}, Expiry: {formatted_expiry}
                - Matching Requests: {', '.join([req['location'] for req in matching_requests if 'location' in req])}
                Recommend further action.
                """
                ai_response = llm(prompt)
                recommendations.append(ai_response)

        return recommendations if recommendations else ["No matching requests found."]
    
    except Exception as e:
        error_msg = f"Error in match_expiring_items: {str(e)}\n{traceback.format_exc()}"
        print(error_msg)
        return [f"Error matching expiring items: {str(e)}"]

# Function to predict category and unit
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

        # Extract JSON from response
        import re
        import json
        
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
            item_name_lower = item_name.lower()
            
            category_rules = {
                'Fruits': ['apple', 'banana', 'orange', 'grape', 'berry', 'fruit'],
                'Vegetables': ['carrot', 'potato', 'tomato', 'onion', 'vegetable', 'leafy'],
                'Dairy': ['milk', 'cheese', 'yogurt', 'butter', 'cream'],
                'Grains': ['rice', 'wheat', 'bread', 'cereal', 'flour', 'pasta']
            }
            
            matched_category = None
            for category, keywords in category_rules.items():
                if any(keyword in item_name_lower for keyword in keywords):
                    matched_category = category
                    break
            
            result['category'] = matched_category if matched_category in categories else categories[0]

        if 'unit' not in result or result['unit'] not in units:
            print(f"⚠️ Invalid Unit: {result.get('unit', 'None')} → Correcting")
            item_name_lower = item_name.lower()
            if any(liquid_keyword in item_name_lower for liquid_keyword in ['milk', 'juice', 'water', 'oil']):
                result['unit'] = 'liters'
            elif any(small_keyword in item_name_lower for small_keyword in ['spice', 'powder', 'seed']):
                result['unit'] = 'grams'
            else:
                result['unit'] = 'kg'

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
    try:
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
        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

# API Route: Check Expiring Products
# @app.route("/check-expiring", methods=["GET"])
# def api_check_expiring():
#     response = check_expiring_products()
#     email_sent = send_email("Expiring Products Notification", response)
    
#     return jsonify({
#         "message": response,
#         "email_sent": email_sent
#     })

# API Route: Match Expiring Items with Requests
@app.route("/match-requests", methods=["GET"])
def api_match_requests():
    response = match_expiring_items()
    email_sent = send_email("Food Donation Recommendations", "\n".join(response))
    
    return jsonify({
        "message": response,
        "email_sent": email_sent
    })

# Run Flask App
if __name__ == "__main__":
    app.run(debug=True, port=5000)