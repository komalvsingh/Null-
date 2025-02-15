import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Button from '../components/Button';

const InventoryHome = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ totalItems: 0, lowStock: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [formData, setFormData] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: '',
    category: '',
    quantity: 0,
    unit: '',
    expiryDate: '',
    location: '',
    status: 'In Stock',
  });
  const [selectedItem, setSelectedItem] = useState(null); // For detailed view
  const [selectedItems, setSelectedItems] = useState([]); // For bulk actions

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
  setSelectedItem(null); // Close detailed view if open
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

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:5001/api/items/add', newItem);
      fetchItems();
      setIsAddModalOpen(false);
      setNewItem({
        itemName: '',
        category: '',
        quantity: 0,
        unit: '',
        expiryDate: '',
        location: '',
        status: 'In Stock',
      });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleSellDonate = async (id, quantityChange) => {
    try {
      const item = items.find((item) => item._id === id);
      const updatedQuantity = item.quantity - quantityChange;
      await axios.put(`http://localhost:5001/api/items/update/${id}`, { quantity: updatedQuantity });
      fetchItems();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const toggleItemSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedItems.map((id) => axios.delete(`http://localhost:5001/api/items/delete/${id}`)));
      fetchItems();
      setSelectedItems([]);
    } catch (error) {
      console.error('Error during bulk delete:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'in stock':
        return 'text-green-500';
      case 'low stock':
        return 'text-yellow-500';
      case 'out of stock':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStockAlertClass = (quantity) => {
    if (quantity <= 0) return 'bg-red-100';
    if (quantity < 10) return 'bg-yellow-100';
    return '';
  };

  const isNearExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = Math.abs(expiry - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // 30 days before expiry
  };

  const viewDetails = (item) => {
    setSelectedItem(item);
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
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-500 text-white p-2 rounded flex items-center gap-2"
            >
              <Plus size={18} /> Add Product
            </button>
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
          {selectedItems.length > 0 && (
            <div className="mb-4">
              <button
                onClick={handleBulkDelete}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete Selected ({selectedItems.length})
              </button>
            </div>
          )}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4"></th>
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
                {items
                  .filter((item) =>
                    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((item) => (
                    <tr
                      key={item._id}
                      className={`hover:bg-gray-50 transition-colors ${getStockAlertClass(
                        item.quantity
                      )}`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item._id)}
                          onChange={() => toggleItemSelection(item._id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        {editItemId === item._id ? (
                          <input
                            type="text"
                            value={formData.itemName}
                            onChange={(e) =>
                              setFormData({ ...formData, itemName: e.target.value })
                            }
                            className="border p-1 w-full"
                          />
                        ) : (
                          <span
                            className="cursor-pointer hover:underline"
                            onClick={() => viewDetails(item)}
                          >
                            {item.itemName}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">
                        {editItemId === item._id ? (
                          <input
                            type="number"
                            value={formData.quantity}
                            onChange={(e) =>
                              setFormData({ ...formData, quantity: e.target.value })
                            }
                            className="border p-1 w-full"
                          />
                        ) : (
                          item.quantity
                        )}
                      </td>
                      <td className="px-6 py-4">{item.unit}</td>
                      <td className="px-6 py-4">
                        {new Date(item.expiryDate).toLocaleDateString()}
                        {isNearExpiry(item.expiryDate) && (
                          <span className="text-red-500 ml-2">(Near Expiry)</span>
                        )}
                      </td>
                      <td className="px-6 py-4">{item.location}</td>
                      <td className={`px-6 py-4 font-semibold ${getStatusClass(item.status)}`}>
                        {item.status}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        {editItemId === item._id ? (
                          <button
                            onClick={handleUpdate}
                            className="text-green-500 hover:text-green-700"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => handleSellDonate(item._id, 1)}
                          className="text-purple-500 hover:text-purple-700"
                        >
                          Sell/Donate
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddItem();
              }}
            >
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={newItem.itemName}
                  onChange={(e) =>
                    setNewItem({ ...newItem, itemName: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={newItem.unit}
                  onChange={(e) =>
                    setNewItem({ ...newItem, unit: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="date"
                  placeholder="Expiry Date"
                  value={newItem.expiryDate}
                  onChange={(e) =>
                    setNewItem({ ...newItem, expiryDate: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newItem.location}
                  onChange={(e) =>
                    setNewItem({ ...newItem, location: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  value={newItem.status}
                  onChange={(e) =>
                    setNewItem({ ...newItem, status: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detailed Product View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">{selectedItem.itemName}</h2>
            <div className="space-y-2">
              <p><strong>Category:</strong> {selectedItem.category}</p>
              <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
              <p><strong>Unit:</strong> {selectedItem.unit}</p>
              <p><strong>Expiry Date:</strong> {new Date(selectedItem.expiryDate).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {selectedItem.location}</p>
              <p><strong>Status:</strong> {selectedItem.status}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryHome;