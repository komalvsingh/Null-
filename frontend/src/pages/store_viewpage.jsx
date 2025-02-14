import React, { useState } from 'react';
import { Bell, Search, User, LogOut, TrendingUp, Package, AlertTriangle,Heart, Truck } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const InventoryHomenew = () => {
  const [notifications] = useState([
    { id: 1, text: "Low stock alert: Rice (10 units remaining)", time: "2 minutes ago" },
    { id: 2, text: "New delivery scheduled for tomorrow", time: "1 hour ago" },
    { id: 3, text: "5 items pending donation approval", time: "3 hours ago" }
  ]);

  const [deliveryStatus] = useState([
    { id: 1, item: "Rice", quantity: "50 kg", status: "In Transit", eta: "2 hours", supplier: "Global Foods" },
    { id: 2, item: "Beans", quantity: "30 kg", status: "Delivered", eta: "Completed", supplier: "Local Farms" },
    { id: 3, item: "Pasta", quantity: "100 boxes", status: "Processing", eta: "24 hours", supplier: "Italian Imports" },
    { id: 4, item: "Canned Goods", quantity: "200 units", status: "In Transit", eta: "5 hours", supplier: "Metro Supply" }
  ]);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate=useNavigate()
  const signOut=()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate("/")
  }
  return (
    <div>
      
    <div className="flex min-h-screen  bg-gray-50">
      {/* <Header/> */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          
          
          {/* Search Bar */}
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
          
          {/* Right Side Icons */}
          <div className="flex items-center gap-6">
            {/* Notifications */}
            <Button className='bg-[#ccfeab] text-green-800 font-bold rounded-4xl'>
              Add Items
            </Button>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors relative"
                >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-96 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <div className="text-lg font-semibold text-gray-800">Notifications</div>
                  </div>
                  {notifications.map(notification => (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="text-sm text-gray-800">{notification.text}</div>
                      <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                    </div>
                  ))}
                  <div className="p-3 text-center text-sm">
                    <button className="text-[#52B2CF] hover:text-[#355761] font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                >
                <img
                  src="/api/placeholder/32/32"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                  />
                <div className="text-sm font-medium text-gray-700">Admin</div>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                  <div className="p-3 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-800">Store Admin</div>
                    <div className="text-xs text-gray-500">admin@store.com</div>
                  </div>
                  <div className="p-2">
                    <button className="w-full p-2 text-left text-sm hover:bg-gray-50 rounded flex items-center gap-2">
                      <User size={16} />
                      <span>View Profile</span>
                    </button>
                    <button onClick={signOut} className="w-full p-2 text-left text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-2">
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Items</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">1,234</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Package className="text-[#52B2CF]" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm text-green-600">
                <TrendingUp size={16} className="mr-1" />
                <span>12% from last month</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">8</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="text-yellow-500" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm text-red-600">
                <TrendingUp size={16} className="mr-1" />
                <span>3 items need reorder</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Pending Donations</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">5</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <Heart className="text-[#255d49]" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm text-blue-600">
                <TrendingUp size={16} className="mr-1" />
                <span>2 new requests today</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Active Deliveries</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-1">3</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Truck className="text-purple-500" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm text-purple-600">
                <TrendingUp size={16} className="mr-1" />
                <span>1 arriving today</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Deliveries</h2>
            <button className="text-sm text-[#52B2CF] hover:text-[#355761] font-medium">
              View All Deliveries
            </button>
            
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {deliveryStatus.map(delivery => (
                  <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{delivery.item}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{delivery.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{delivery.supplier}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        delivery.status === "Delivered" 
                          ? "bg-green-100 text-green-700"
                          : delivery.status === "In Transit"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {delivery.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{delivery.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
                </div>
  );
};

export default InventoryHomenew;