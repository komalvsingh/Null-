import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const InventoryHome = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ totalItems: 0, lowStock: 0 });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/items/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/items/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchItems();
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <nav className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800">Store Dashboard</div>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search inventory..."
                className="w-full p-2.5 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#52B2CF] focus:border-transparent"
              />
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            </div>
          </div>
        </nav>

        <div className="grid grid-cols-2 gap-4 p-8">
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-gray-500 text-sm">Total Items</h3>
            <p className="text-xl font-bold">{stats.totalItems}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-gray-500 text-sm">Low Stock Items</h3>
            <p className="text-xl font-bold">{stats.lowStock}</p>
          </div>
        </div>

        <div className="flex-1 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Inventory Items</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{item.itemName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(item.expiryDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.location}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryHome;
