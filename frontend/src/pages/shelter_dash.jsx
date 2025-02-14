import React, { useState } from 'react';
import { UserPlus, ClipboardList, Truck, LogOut, Home, Search } from 'lucide-react';

const ShelterPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogout = () => {
    setShowAlert(true);
    setAlertMessage('Successfully logged out');
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-blue-600">Shelter Connect</span>
          </div>
          <button
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 container mx-auto px-4">
        {showAlert && (
          <div className="mb-6 p-4 bg-blue-100 text-blue-800 rounded-lg">{alertMessage}</div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Welcome to Shelter Connect</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your food donation process and help those in need with our integrated management system.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'Request Food', icon: <UserPlus />, path: '/add-request' },
            { title: 'View Requests', icon: <ClipboardList />, path: '/view-requests' },
            { title: 'Track Deliveries', icon: <Truck />, path: '/track-delivery' },
          ].map(({ title, icon, path }) => (
            <div key={title} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-blue-100 rounded-full">{icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600">Manage {title.toLowerCase()} easily.</p>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  onClick={() => handleNavigation(path)}
                >
                  {title}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Search Section */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>&copy; 2025 Shelter Connect. All rights reserved.</p>
          <p className="mt-1">Making a difference in our community, one meal at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default ShelterPage;