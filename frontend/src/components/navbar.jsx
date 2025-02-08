import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#2E5077] fixed top-0 w-full shadow-lg z-50 py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <h3 className="text-2xl font-bold bg-gradient-to-r from-[#4DA1A9] to-[#79D7BE] text-transparent bg-clip-text font-poppins">
        InnovateHub
      </h3>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8">
        <Link to="/" className="text-[#F6F4F0] hover:text-[#79D7BE] transition">
          Home
        </Link>
        <Link to="#about" className="text-[#F6F4F0] hover:text-[#79D7BE] transition">
          About
        </Link>
        <Link to="/dish" className="text-[#F6F4F0] hover:text-[#79D7BE] transition">
          Dashboard
        </Link>
        <Link to="#contact" className="text-[#F6F4F0] hover:text-[#79D7BE] transition">
          Contact Us
        </Link>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="search"
            placeholder="Search"
            className="px-4 py-2 rounded-md border border-[#4DA1A9] bg-transparent text-[#F6F4F0] focus:outline-none focus:border-[#79D7BE]"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F6F4F0]">
            🔍
          </span>
        </div>

        {/* Sign In Button */}
        <Link
          to="/register"
          className="px-4 py-2 border border-[#4DA1A9] text-[#4DA1A9] rounded-md transition hover:bg-[#4DA1A9] hover:text-white"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;