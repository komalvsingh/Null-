import mongoose from "mongoose";

const orphanagePostSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  urgency: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  description: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("OrphanagePost", orphanagePostSchema);
