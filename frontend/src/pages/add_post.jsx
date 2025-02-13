import React, { useState } from 'react';
import axios from 'axios';

export default function OrphanagePostPage() {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    urgency: 'Medium',
    description: '',
    location: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { itemName, quantity, location, phone, email, urgency, description } = formData;
    if (itemName && quantity && location && phone && email) {
      try {
        const response = await axios.post('http://localhost:5001/api/post/add', formData);
        console.log('Request submitted:', response.data);
        alert('Request submitted successfully!');
        setFormData({ itemName: '', quantity: '', urgency: 'Medium', description: '', location: '', phone: '', email: '' });
      } catch (error) {
        console.error('Error submitting request:', error);
        alert('Failed to submit request.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Orphanage Food Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Urgency Level</label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold">Orphanage Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition duration-300"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
