import React, { useState } from 'react';
import { Bell, Search, User, LogOut } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const InventoryHome = () => {
  const [notifications] = useState([
    { id: 1, text: "Low stock alert: Rice (10 units remaining)" },
    { id: 2, text: "New delivery scheduled for tomorrow" },
    { id: 3, text: "5 items pending donation approval" }
  ]);

  const [deliveryStatus] = useState([
    { id: 1, item: "Rice", quantity: "50 kg", status: "In Transit", eta: "2 hours", supplier: "Global Foods" },
    { id: 2, item: "Beans", quantity: "30 kg", status: "Delivered", eta: "Completed", supplier: "Local Farms" },
    { id: 3, item: "Pasta", quantity: "100 boxes", status: "Processing", eta: "24 hours", supplier: "Italian Imports" },
    { id: 4, item: "Canned Goods", quantity: "200 units", status: "In Transit", eta: "5 hours", supplier: "Metro Supply" }
  ]);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#e0FFCC]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-[#52B2CF] p-4 flex items-center justify-between shadow-md">
          <div className="text-white text-2xl font-bold">Store Dashboard</div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                className="w-full p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255d49]"
              />
              <Search className="absolute left-2 top-2.5 text-gray-500" size={20} />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-white hover:bg-[#355761] p-2 rounded-full transition-colors"
              >
                <Bell size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50">
                  <div className="p-3 border-b bg-[#52B2CF] text-white font-semibold rounded-t-lg">
                    Notifications
                  </div>
                  {notifications.map(notification => (
                    <div key={notification.id} className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                      {notification.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 text-white hover:bg-[#355761] p-2 rounded-lg transition-colors"
              >
                <img
                  src="/api/placeholder/32/32"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                  <div className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                    <User size={18} />
                    <span>Profile</span>
                  </div>
                  <div className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-red-600">
                    <LogOut size={18} />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Total Items</h3>
              <p className="text-3xl font-bold text-[#52B2CF] mt-2">1,234</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Low Stock Items</h3>
              <p className="text-3xl font-bold text-yellow-500 mt-2">8</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Pending Donations</h3>
              <p className="text-3xl font-bold text-[#255d49] mt-2">5</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700">Active Deliveries</h3>
              <p className="text-3xl font-bold text-blue-500 mt-2">3</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Recent Deliveries</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Item</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Supplier</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {deliveryStatus.map(delivery => (
                  <tr key={delivery.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{delivery.item}</td>
                    <td className="px-6 py-4">{delivery.quantity}</td>
                    <td className="px-6 py-4">{delivery.supplier}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        delivery.status === "Delivered" 
                          ? "bg-green-100 text-green-800"
                          : delivery.status === "In Transit"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {delivery.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{delivery.eta}</td>
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