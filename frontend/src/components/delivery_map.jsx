"use client";

import { MapPin } from "lucide-react";

const deliveries = [
  { id: 1, city: "New York Shelter", location: "New York, NY" },
  { id: 2, city: "Los Angeles Shelter", location: "Los Angeles, CA" },
  { id: 3, city: "Chicago Shelter", location: "Chicago, IL" },
];

export default function DeliveryMap() {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center border rounded-lg p-4 bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">Delivery Locations</h2>
      <ul className="space-y-4">
        {deliveries.map((delivery) => (
          <li key={delivery.city} className="flex items-center bg-white shadow-md p-3 rounded-lg w-80">
            <MapPin className="w-6 h-6 text-blue-500 mr-3" />
            <div>
              <p className="font-medium">{delivery.city}</p>
              <p className="text-sm text-gray-500">{delivery.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
