import React, { useState } from 'react';
import axios from 'axios';

const AddItemPage = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [expiryDate, setExpiryDate] = useState('');
  const [location, setLocation] = useState('');

  const categories = ['Vegetables', 'Packaged Food', 'Grains'];
  const units = ['kg', 'liters', 'packs'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemName && quantity && location && unit && category) {
      const newItem = { itemName, category, quantity, unit, expiryDate, location };
      try {
        const response = await axios.post('http://localhost:5001/api/items/add', newItem);
        console.log('Item added:', response.data);
        alert('Item added successfully!');
      } catch (error) {
        console.error('Error adding item:', error);
        alert('Failed to add item.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Name:</label>
          <input 
            type="text" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantity:</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Unit:</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Expiry Date:</label>
          <input 
            type="date" 
            value={expiryDate} 
            onChange={(e) => setExpiryDate(e.target.value)} 
          />
        </div>

        <div>
          <label>Location:</label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required 
          />
        </div>

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemPage;
