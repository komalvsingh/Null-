"use client";

import React from "react";
import { Phone } from "lucide-react";

const DeliveryPersonDetails = ({ person }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 mb-4">
      <div className="mb-2">
        <h2 className="text-xl font-semibold">Delivery Person</h2>
      </div>
      <div>
        <p>
          <strong>{person.name}</strong>
        </p>
        <p>Vehicle: {person.vehicle}</p>
        <button className="border rounded-lg px-4 py-2 mt-2 flex items-center space-x-2">
          <Phone className="w-4 h-4" />
          <span>Call {person.phone}</span>
        </button>
      </div>
    </div>
  );
};

export default DeliveryPersonDetails;
