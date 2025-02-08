import React, { useState } from "react";
import axios from "axios";
import { CalendarIcon, LocationMarkerIcon, ClipboardListIcon, CubeIcon, HashtagIcon } from "@heroicons/react/solid";

const AddItemPage = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [expiryDate, setExpiryDate] = useState("");
  const [location, setLocation] = useState("");

  const categories = ["Vegetables", "Packaged Food", "Grains"];
  const units = ["kg", "liters", "packs"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemName && quantity && location && unit && category) {
      const newItem = { itemName, category, quantity, unit, expiryDate, location };
      try {
        const response = await axios.post("http://localhost:5001/api/items/add", newItem);
        console.log("Item added:", response.data);
        alert("Item added successfully!");
      } catch (error) {
        console.error("Error adding item:", error);
        alert("Failed to add item.");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F6F4F0] p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl border border-[#4DA1A9] shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-8 text-[#2E5077]">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Item Name */}
          <div>
            <label className="block text-[#2E5077] font-medium mb-2">Item Name</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
              <ClipboardListIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
              <input type="text" className="w-full bg-transparent outline-none text-[#2E5077]" value={itemName} onChange={(e) => setItemName(e.target.value)} required placeholder="Enter item name" />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[#2E5077] font-medium mb-2">Category</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
              <CubeIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
              <select className="w-full bg-transparent outline-none text-[#2E5077]" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-white text-[#2E5077]">{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#2E5077] font-medium mb-2">Quantity</label>
              <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
                <HashtagIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
                <input type="number" className="w-full bg-transparent outline-none text-[#2E5077]" value={quantity} onChange={(e) => setQuantity(e.target.value)} required placeholder="Enter quantity" />
              </div>
            </div>

            <div>
              <label className="block text-[#2E5077] font-medium mb-2">Unit</label>
              <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
                <CubeIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
                <select className="w-full bg-transparent outline-none text-[#2E5077]" value={unit} onChange={(e) => setUnit(e.target.value)}>
                  {units.map((u) => (
                    <option key={u} value={u} className="bg-white text-[#2E5077]">{u}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-[#2E5077] font-medium mb-2">Expiry Date</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
              <CalendarIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
              <input type="date" className="w-full bg-transparent outline-none text-[#2E5077]" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[#2E5077] font-medium mb-2">Location</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
              <LocationMarkerIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
              <input type="text" className="w-full bg-transparent outline-none text-[#2E5077]" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder="Enter location" />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full mt-8 bg-[#4DA1A9] text-white font-semibold py-4 rounded-lg shadow-lg hover:bg-[#79D7BE] transition-all duration-300">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default AddItemPage;
