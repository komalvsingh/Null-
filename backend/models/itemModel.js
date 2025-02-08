import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Vegetables', 'Packaged Food', 'Grains'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ['kg', 'liters', 'packs'],
    required: true,
  },
  expiryDate: {
    type: Date,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Donated', 'Expired'],
    default: 'Available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
