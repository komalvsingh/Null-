import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, User, LogOut } from "lucide-react";

const NavbarInventory = ({ notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token (example: localStorage)
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="text-xl font-semibold text-gray-800">Store Dashboard</div>

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
                <button 
                  onClick={handleLogout} 
                  className="w-full p-2 text-left text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-2"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarInventory;