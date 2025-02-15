import React from "react";
import { CheckCircle, Timer, Phone, HelpCircle } from "lucide-react";

const TrackDelivery = () => {
  const orderStatus = "Out for Delivery";
  const deliverySteps = ["Order Received", "Preparing", "Out for Delivery", "Delivered"];
  const deliveryPerson = {
    name: "John Doe",
    phone: "+1 234 567 890",
    vehicle: "Toyota Prius - XYZ 1234",
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>

      {/* Order Summary */}
      <div className="mb-4 p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        <p>Order ID: <strong>#123456</strong></p>
        <p>Total: <strong>$45.99</strong></p>
        <p>Status: <strong>{orderStatus}</strong></p>
      </div>

      {/* Delivery Status */}
      <div className="mb-4 p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Delivery Status</h2>
        <div className="flex items-center space-x-4">
          {deliverySteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {index < 2 ? <CheckCircle className="text-green-500" /> : <Timer className="text-gray-500" />}
              <p className="text-sm mt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Person Details */}
      <div className="mb-4 p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Delivery Person</h2>
        <p><strong>{deliveryPerson.name}</strong></p>
        <p>Vehicle: {deliveryPerson.vehicle}</p>
        <button className="mt-2 flex items-center border px-4 py-2 rounded-lg shadow hover:bg-gray-100">
          <Phone className="mr-2" /> Call {deliveryPerson.phone}
        </button>
      </div>

      {/* Live Map Placeholder */}
      <div className="mb-4 p-4 border rounded-lg shadow text-center">
        <h2 className="text-lg font-semibold mb-2">Live Tracking</h2>
        <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">
          <p className="text-gray-500">Map Placeholder</p>
        </div>
      </div>

      {/* Support & Help */}
      <div className="p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
        <button className="flex items-center border px-4 py-2 rounded-lg shadow hover:bg-gray-100">
          <HelpCircle className="mr-2" /> Contact Support
        </button>
      </div>
    </div>
  );
};

export default TrackDelivery;
