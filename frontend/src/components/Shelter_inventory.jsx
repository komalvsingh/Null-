"use client";

import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";

export default function InventoryDisplay() {
  const [inventory, setInventory] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/match-requests");
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const filteredInventory = inventory.filter(
    (item) => filter === "All" || item.category === filter
  );

  return (
    <div className="p-4 rounded-md min-h-full h-full shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Available Food Items</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          <input 
            className="pl-8 p-2 w-full border rounded-md" 
            placeholder="Search items..." 
          />
        </div>
        <select 
          className="border rounded-md p-2" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Packaged Food">Packaged Food</option>
          <option value="Grains">Grains</option>
        </select>
        <button className="p-2 border rounded-md bg-gray-100">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </button>
      </div>
      <div className="space-y-4">
        {filteredInventory.length > 0 ? (
          filteredInventory.map((item) => (
            <div key={item._id} className="flex items-center justify-between border-b pb-2">
              <div>
                <h3 className="font-semibold">{item.itemName}</h3>
                <p className="text-sm text-gray-500">Quantity: {item.quantity} {item.unit}</p>
                <p className="text-sm text-gray-500">Expiry: {new Date(item.expiryDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Location: {item.location}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-md ${
                item.category === "Vegetables" ? "bg-green-200 text-green-800" : 
                item.category === "Packaged Food" ? "bg-blue-200 text-blue-800" : 
                "bg-yellow-200 text-yellow-800"
              }`}>
                {item.category}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No food items available.</p>
        )}
      </div>
    </div>
  );
}
