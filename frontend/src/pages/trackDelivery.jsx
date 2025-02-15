"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import OrderSummary from "../components/deliveryOrderSummary";
import DeliveryStatus from "../components/deliveryStatus";
import DeliveryPersonDetails from "../components/deliveryPersonDetails";
import LiveTracking from "../components/deliveryLiveTracking";
import SupportHelp from "../components/deliverySupport";

// 📍 Custom Icon for Markers
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32], // Adjust icon size
});

const TrackDeliveryPage = () => {
  const orderStatus = "Out for Delivery";
  const deliverySteps = ["Order Received", "Preparing", "Out for Delivery", "Delivered"];
  const deliveryPerson = {
    name: "John Doe",
    phone: "+91 98765 43210",
    vehicle: "Toyota Prius - XYZ 1234",
  };

  const volunteer = "Rahul Sharma";
  const storeLocation = [19.076, 72.8777]; // Mumbai
  const orphanageLocation = [18.5204, 73.8567]; // Pune

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800">Track Your Order</h1>

      {/* Order Details */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <OrderSummary orderId="#123456" total="₹45.99" status={orderStatus} />
        <DeliveryStatus steps={deliverySteps} currentStep={2} />
        <DeliveryPersonDetails person={deliveryPerson} />
      </div>

      {/* Volunteer Info */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">Current Volunteer:</h2>
        <p className="text-lg text-gray-600">{volunteer}</p>
      </div>

      {/* 📌 Map Section */}
      <div className="h-96 rounded-lg overflow-hidden shadow-md bg-white p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Delivery Route</h2>
        <MapContainer center={storeLocation} zoom={6} className="w-full h-full rounded-lg">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* 📍 Store Location */}
          <Marker position={storeLocation} icon={customIcon}>
            <Popup>
              <strong>Store Location</strong>
              <br />
              Mumbai
            </Popup>
          </Marker>
          {/* 📍 Orphanage Location */}
          <Marker position={orphanageLocation} icon={customIcon}>
            <Popup>
              <strong>Orphanage</strong>
              <br />
              Hope Orphanage, Pune
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <LiveTracking />
      <SupportHelp />
    </div>
  );
};

export default TrackDeliveryPage;
