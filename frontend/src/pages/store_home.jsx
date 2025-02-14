import React from "react";

const StoreHomePage = ({ username, onLogout }) => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://cdn.prod.website-files.com/622faf89982b1a82750a4f2b/62ce9040f6e3931b4589c94a_Supermarket%20Management%20Systems%20-%20Header.png')",
          filter: "brightness(0.6)",
        }}
      ></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-4 bg-green-500 bg-opacity-90 text-white shadow-md">
        <h1 className="text-2xl font-bold">Store Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-medium">{username}</span>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h2 className="text-4xl font-bold mb-4 text-green-200">
          Welcome to Your Store Dashboard
        </h2>
        <p className="text-lg mb-6 text-green-300">
          Manage your inventory, track donations, and help those in need.
        </p>
        <button className="px-6 py-3 bg-green-600 text-white rounded-xl text-lg hover:bg-green-700 transition duration-300">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default StoreHomePage;
