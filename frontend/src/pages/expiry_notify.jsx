import React, { useEffect, useState } from "react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="w-full max-w-4xl p-6 bg-green-100 shadow-lg rounded-lg border-l-4 border-green-500">
        <h2 className="text-3xl font-semibold text-center text-green-700 mb-4">
          Expiry Notifications
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Checking for expiring products...</p>
        ) : notifications.length > 0 ? (
          <div className="space-y-4">
            <ul className="list-disc list-inside text-gray-800 bg-white p-4 rounded-md shadow">
              {notifications.map((note, index) => (
                <li key={index} className="p-2 border-b border-green-300 last:border-none">
                  {note}
                </li>
              ))}
            </ul>

            <div className="bg-green-200 p-4 rounded-md shadow">
              <h3 className="text-lg font-bold text-green-700">Suggested Actions:</h3>
              <ul className="list-decimal list-inside text-green-900 mt-2">
                <li>Consume the food items before they expire.</li>
                <li>Share or donate the food items to needy people or organizations.</li>
                <li>Freeze certain food items to extend their shelf life.</li>
                <li>Cook and preserve the food items to increase their storage life.</li>
                <li>Sell or trade the food items to other parties before they expire.</li>
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-green-600">No expiring products found.</p>
        )}
      </div>
    </div>
  );
}

export default ExpiryNotifications;
