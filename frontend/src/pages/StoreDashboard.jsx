import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Button from '../components/Button';


const InventoryHome = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ totalItems: 0, lowStock: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchItems();
    fetchStats();
  }, []);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/items/delete/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditItemId(item._id);
    setFormData({ itemName: item.itemName, quantity: item.quantity });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5001/api/items/update/${editItemId}`, formData);
      fetchItems();
      setEditItemId(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'in stock': return 'text-green-500';
      case 'low stock': return 'text-yellow-500';
      case 'out of stock': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <nav className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
         
          <div className="flex-1 flex justify-between mx-8">
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  <th className="px-6 py-4">Item Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Unit</th>
                  <th className="px-6 py-4">Expiry Date</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.filter(item => item.itemName.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {editItemId === item._id ? (
                        <input
                          type="text"
                          value={formData.itemName}
                          onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                          className="border p-1 w-full"
                        />
                      ) : (
                        item.itemName
                      )}
                    </td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">
                      {editItemId === item._id ? (
                        <input
                          type="number"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          className="border p-1 w-full"
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td className="px-6 py-4">{item.unit}</td>
                    <td className="px-6 py-4">{new Date(item.expiryDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{item.location}</td>
                    <td className={`px-6 py-4 font-semibold ${getStatusClass(item.status)}`}>{item.status}</td>
                    <td className="px-6 py-4 flex gap-2">
                      {editItemId === item._id ? (
                        <button onClick={handleUpdate} className="text-green-500 hover:text-green-700">Save</button>
                      ) : (
                        <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700">
                          <Edit size={18} />
                        </button>
                      )}
                      <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
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