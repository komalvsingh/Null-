import React from 'react';

const FoodDonationDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">🍎 Surplus Food Donation Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage donations, track inventory, and help reduce food waste.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-green-800 mb-4">📦 Manage Donations</h2>
            <p className="text-gray-600">Add, update, or remove surplus food donations.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">📊 Track Inventory</h2>
            <p className="text-gray-600">Monitor available food items and expiration dates.</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4">🚚 Schedule Pickups</h2>
            <p className="text-gray-600">Arrange for food collection and distribution.</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">📝 View Requests</h2>
            <p className="text-gray-600">See requests from organizations or individuals in need.</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700">🕒 Latest Donations</h3>
              <p className="text-gray-600">View recently added surplus food items.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700">📈 Distribution Stats</h3>
              <p className="text-gray-600">Track how much food has been distributed.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700">📝 Pending Requests</h3>
              <p className="text-gray-600">Review and fulfill pending food requests.</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-indigo-800 mb-4">Tips & Updates</h2>
          <p className="text-gray-600">💡 <strong>Pro Tip:</strong> Regularly update inventory to avoid expired items.</p>
          <p className="text-gray-600">🔔 <strong>Update:</strong> New features for managing donations are now available!</p>
        </div>

        <div className="text-center mt-8">
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDonationDashboard;