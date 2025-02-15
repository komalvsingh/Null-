"use client";

import { useState, useEffect } from "react";
import { Calendar, Leaf, Phone, AlertTriangle } from "lucide-react";

export default function RequestPanel() {
  const [foodRequests, setFoodRequests] = useState([]);
  const [selectedItems, setSelectedItems] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [urgency, setUrgency] = useState("Medium");
  const [pickupTime, setPickupTime] = useState("");
  const [comments, setComments] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/requests");
        const data = await response.json();
        setFoodRequests(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ selectedItems, quantity, unit, urgency, pickupTime, comments, vegOnly, phone, location });
  };

  return (
    <div className="rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">Request Food</h2>
      <ul className="mb-4 border p-2 rounded-md">
        {foodRequests.length > 0 ? (
          foodRequests.map((item) => (
            <li key={item._id} className="p-2 border-b last:border-none">
              <strong>{item.itemName}</strong> - {item.quantity} {item.unit} ({item.urgency} urgency)
            </li>
          ))
        ) : (
          <li>No food requests available.</li>
        )}
      </ul>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="items" className="block font-medium">Selected Items</label>
          <textarea
            id="items"
            className="w-full border border-[#b4ff82] p-2 rounded-md"
            placeholder="E.g., Rice, Milk"
            value={selectedItems}
            onChange={(e) => setSelectedItems(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="w-2/3">
            <label htmlFor="quantity" className="block font-medium">Quantity</label>
            <input
              id="quantity"
              type="number"
              className="w-full p-2 border rounded-md"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="unit" className="block font-medium">Unit</label>
            <select
              id="unit"
              className="w-full p-2 border rounded-md"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="kg">kg</option>
              <option value="L">L</option>
              <option value="pieces">pieces</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="urgency" className=" font-medium flex items-center gap-2">
            <AlertTriangle size={18} /> Urgency Level
          </label>
          <select
            id="urgency"
            className="w-full p-2 border rounded-md"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label htmlFor="pickup" className="font-medium flex items-center gap-2">
            <Calendar size={18} /> Pickup/Delivery Time
          </label>
          <input
            id="pickup"
            type="datetime-local"
            className="w-full p-2 border rounded-md"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone" className="font-medium flex items-center gap-2">
            <Phone size={18} /> Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium">Location</label>
          <input
            id="location"
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comments" className="block font-medium">Special Requests/Comments</label>
          <textarea
            id="comments"
            className="w-full p-2 border rounded-md"
            placeholder="Any special instructions..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <input
            id="veg-only"
            type="checkbox"
            className="h-5 w-5 accent-green-600"
            checked={vegOnly}
            onChange={() => setVegOnly(!vegOnly)}
          />
          <label htmlFor="veg-only" className="flex items-center gap-2">
            <Leaf size={18} className="text-green-600" /> Vegetarian Only
          </label>
        </div>
        <button type="submit" className="w-full p-2 mt-4 bg-[#134611] text-white rounded-md hover:bg-green-700">
          Submit Request
        </button>
      </form>
    </div>
  );
}
