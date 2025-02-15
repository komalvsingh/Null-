import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react";

function ExpiryNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/check-expiring")
      .then((response) => response.json())
      .then((data) => {
        if (data.message && typeof data.message === "string") {
          setNotifications([data.message]); // If message is a string
        } else if (Array.isArray(data.message)) {
          setNotifications(data.message); // If message is an array
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching expiry notifications:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 py-10">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg border-l-4 border-green-600">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6 flex items-center justify-center">
          <AlertCircle className="text-yellow-500 mr-2" /> Expiry Notifications
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 animate-pulse">
            Checking for expiring products...
          </p>
        ) : notifications.length > 0 ? (
          <div className="space-y-6">
            <div className="bg-yellow-50 p-4 rounded-md shadow-md border border-yellow-300">
              <h3 className="text-lg font-semibold text-yellow-700 flex items-center">
                <AlertCircle className="text-yellow-600 mr-2" /> Expiring Soon:
              </h3>
              <ul className="mt-3 list-disc list-inside text-gray-800">
                {notifications.map((note, index) => (
                  <li key={index} className="p-2 border-b border-yellow-300 last:border-none">
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-100 p-4 rounded-md shadow-md border border-green-400">
              <h3 className="text-lg font-semibold text-green-800 flex items-center">
                <CheckCircle className="text-green-600 mr-2" /> Suggested Actions:
              </h3>
              <ul className="mt-3 space-y-2 text-green-900">
                <li className="flex items-center">
                  <ArrowRight className="text-green-600 mr-2" /> Consume the food items before they expire.
                </li>
                <li className="flex items-center">
                  <ArrowRight className="text-green-600 mr-2" /> Share or donate the food items to those in need.
                </li>
                <li className="flex items-center">
                  <ArrowRight className="text-green-600 mr-2" /> Freeze perishable food items to extend their shelf life.
                </li>
                <li className="flex items-center">
                  <ArrowRight className="text-green-600 mr-2" /> Cook and preserve food items to avoid wastage.
                </li>
                <li className="flex items-center">
                  <ArrowRight className="text-green-600 mr-2" /> Sell or trade food items before they expire.
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-green-600">
            No expiring products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default ExpiryNotifications;
