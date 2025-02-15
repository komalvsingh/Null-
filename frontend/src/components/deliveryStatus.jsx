"use client";

import React from "react";
import { CheckCircle, Timer } from "lucide-react";

const DeliveryStatus = ({ steps, currentStep }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 mb-4">
      <div className="mb-2">
        <h2 className="text-xl font-semibold">Delivery Status</h2>
      </div>
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            {index < currentStep ? <CheckCircle className="text-green-500" /> : <Timer className="text-gray-500" />}
            <p className="text-sm mt-1">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryStatus;
