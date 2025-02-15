"use client";

import React from "react";
import OrderSummary from "../components/deliveryOrderSummary";
import DeliveryStatus from "../components/deliveryStatus";
import DeliveryPersonDetails from "../components/deliveryPersonDetails";
import LiveTracking from "../components/deliveryLiveTracking";
import SupportHelp from "../components/deliverySupport";

const TrackDeliveryPage = () => {
  const orderStatus = "Out for Delivery";
  const deliverySteps = ["Order Received", "Preparing", "Out for Delivery", "Delivered"];
  const deliveryPerson = {
    name: "John Doe",
    phone: "+91 98765 43210",
    vehicle: "Toyota Prius - XYZ 1234",
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
      <OrderSummary orderId="#123456" total="₹45.99" status={orderStatus} />
      <DeliveryStatus steps={deliverySteps} currentStep={2} />
      <DeliveryPersonDetails person={deliveryPerson} />
      <LiveTracking />
      <SupportHelp />
    </div>
  );
};

export default TrackDeliveryPage;
