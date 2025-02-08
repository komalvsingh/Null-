import React from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-[#F6F4F0] min-h-screen">
      <Navbar />
      <header className="text-center py-20 px-6 bg-[#2E5077] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-30"
        ></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Fight Hunger, Save Food</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Donate surplus food, drinks, and other consumables close to expiry to help those in need. Together, we can reduce waste and feed the hungry.
          </p>
          <div className="mt-8 space-x-4">
            <Link
              to="/add_items"
              className="inline-block bg-[#4DA1A9] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#79D7BE] transition"
            >
              Inventory
            </Link>
            <Link
              to="/volunteer"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#2E5077] transition"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </header>

      <section className="text-center py-16 px-6">
        <h2 className="text-4xl font-bold text-[#2E5077]">How You Can Help</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Donate Food"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold text-[#4DA1A9] mt-4">Donate Food</h3>
            <p className="mt-2 text-gray-600">Donate surplus food items close to expiry to help feed the hungry.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Donate Drinks"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold text-[#4DA1A9] mt-4">Donate Drinks</h3>
            <p className="mt-2 text-gray-600">Contribute beverages and drinks close to expiry to support those in need.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Partner With Us"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold text-[#4DA1A9] mt-4">Partner With Us</h3>
            <p className="mt-2 text-gray-600">Collaborate with us to create a sustainable food donation network.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#4DA1A9] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Join Our Community</h2>
          <p className="mt-4 text-lg">
            Sign up today to become a part of our mission to fight hunger, reduce waste, and support communities in need.
          </p>
          <div className="mt-8 space-x-4">
            <Link
              to="/login"
              className="inline-block bg-white text-[#4DA1A9] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#F6F4F0] transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#4DA1A9] transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#2E5077] text-white py-6 text-center">
        <p>&copy; 2025 Food & Drink Donation Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;