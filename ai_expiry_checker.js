import { OpenAI } from "openai"; // Using OpenAI API format for Deepseek
import dotenv from "dotenv";
import mongoose from "mongoose";
import Item from "./src/itemModel.js";
import Post from "./src/postmodel.js"; 
import nodemailer from "nodemailer";

dotenv.config();

// Initialize MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Initialize Deepseek R1 API Client
const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY, // Replace with your Deepseek R1 API Key
  baseURL: "https://api.deepseek.com/v1", // Deepseek API URL
});

/**
 * Function to check for expiring products and notify store personnel
 */
export const checkExpiringProducts = async () => {
  const today = new Date();
  const expiryThreshold = new Date();
  expiryThreshold.setDate(today.getDate() + 3); // Items expiring in 3 days

  const expiringItems = await Item.find({
    expiryDate: { $lte: expiryThreshold },
    status: "Available",
  });

  if (expiringItems.length === 0) {
    console.log("No expiring products found.");
    return;
  }

  const prompt = `
    The following food items in our inventory are expiring soon:
    ${expiringItems.map((item) => `- ${item.itemName} (${item.quantity} ${item.unit}) in ${item.location}, expires on ${item.expiryDate}`).join("\n")}

    Notify store personnel and recommend donation before expiration.
  `;

  const response = await openai.chat.completions.create({
    model: "deepseek-chat", // Deepseek model name
    messages: [{ role: "system", content: prompt }],
    max_tokens: 200,
  });

  console.log("AI Notification:", response.choices[0].message.content);
};

/**
 * Match Expiring Items with Orphanage Requests
 */
export const matchExpiringItemsWithRequests = async () => {
  const today = new Date();
  const expiryThreshold = new Date();
  expiryThreshold.setDate(today.getDate() + 3);

  const expiringItems = await Item.find({
    expiryDate: { $lte: expiryThreshold },
    status: "Available",
  });

  if (expiringItems.length === 0) return;

  const orphanageRequests = await Post.find({});

  for (const item of expiringItems) {
    const matchingRequests = orphanageRequests.filter((post) =>
      post.itemName.toLowerCase().includes(item.itemName.toLowerCase()) &&
      post.urgency === "High"
    );

    if (matchingRequests.length > 0) {
      const recommendationPrompt = `
        The following orphanage requests match the expiring food items:
        - Expiring Item: ${item.itemName} (${item.quantity} ${item.unit}), Location: ${item.location}, Expiry: ${item.expiryDate}
        - Recommended Orphanages:
        ${matchingRequests.map((post) => `- ${post.itemName}, Location: ${post.location}, Urgency: ${post.urgency}`).join("\n")}

        Notify store personnel to prioritize donations.
      `;

      const response = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [{ role: "system", content: recommendationPrompt }],
        max_tokens: 200,
      });

      console.log("AI Recommendation:", response.choices[0].message.content);

      await sendEmailNotification("Matching Food Donations", response.choices[0].message.content);
    }
  }
};

/**
 * Send Email Notifications
 */
export const sendEmailNotification = async (subject, message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.STORE_EMAIL,
    subject: subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent:", subject);
};

/**
 * Run Functions After Connecting to MongoDB
 */
const runTasks = async () => {
  await connectDB();
  await checkExpiringProducts();
  await matchExpiringItemsWithRequests();
};

await runTasks();
