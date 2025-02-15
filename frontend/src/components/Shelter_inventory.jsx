

import { useState } from "react";
import { Search, Filter } from "lucide-react";

const mockInventory = [
  { id: 1, name: "Rice", quantity: 100, expiry: "2023-12-31", category: "Veg", source: "Restaurant" },
  { id: 2, name: "Chicken Curry", quantity: 50, expiry: "2023-12-25", category: "Non-Veg", source: "Restaurant" },
  { id: 3, name: "Milk", quantity: 30, expiry: "2023-12-20", category: "Dairy", source: "Grocery Store" },
];

export default function InventoryDisplay() {
  const [filter, setFilter] = useState("All");
  
  const filteredInventory = mockInventory.filter(
    (item) => filter === "All" || item.category === filter
  );

  return (
    <div className=" p-4 rounded-md min-h-full h-full shadow-md bg-white">
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
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Dairy">Dairy</option>
        </select>
        <button className="p-2 border rounded-md bg-gray-100">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </button>
      </div>
      <div className="space-y-4">
        {filteredInventory.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-2">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-500">Expiry: {item.expiry}</p>
              <p className="text-sm text-gray-500">Source: {item.source}</p>
            </div>
            <span className={`px-2 py-1 text-xs rounded-md ${
              item.category === "Veg" ? "bg-green-200 text-green-800" : 
              item.category === "Non-Veg" ? "bg-red-200 text-red-800" : 
              "bg-gray-200 text-gray-800"
            }`}>
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
