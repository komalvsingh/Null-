"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";

const OrderSummary = ({ orderId, total, status }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <ShoppingCart className="w-6 h-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold">Order Summary</h2>
      </div>
      <div className="space-y-2">
        <p>
          Order ID: <strong>{orderId}</strong>
        </p>
        <p>
          Total: <strong>{total}</strong>
        </p>
        <p>
          Status: <strong>{status}</strong>
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
