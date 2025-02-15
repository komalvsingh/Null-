import { BadgeCheck, Truck, Clock } from "lucide-react";

const deliveries = [
  { id: 1, items: "Rice x 10kg, Milk x 5L", status: "In Transit", eta: "30 mins", destination: "New York Shelter" },
  {
    id: 2,
    items: "Chicken Curry x 20 portions",
    status: "Preparing",
    eta: "1 hour",
    destination: "Los Angeles Shelter",
  },
  { id: 3, items: "Bread x 30 loaves", status: "Delivered", eta: "-", destination: "Chicago Shelter" },
];

const getStatusBadge = (status) => {
  if (status === "In Transit") {
    return <span className="bg-blue-500 text-white px-2 py-1 rounded flex items-center"><Truck className="w-4 h-4 mr-1" /> {status}</span>;
  } else if (status === "Preparing") {
    return <span className="bg-gray-500 text-white px-2 py-1 rounded flex items-center"><Clock className="w-4 h-4 mr-1" /> {status}</span>;
  }
  return <span className="bg-green-500 text-white px-2 py-1 rounded flex items-center"><BadgeCheck className="w-4 h-4 mr-1" /> {status}</span>;
};

export default function DeliveryList() {
  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Items</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">ETA</th>
            <th className="border border-gray-300 px-4 py-2">Destination</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id} className="border border-gray-300">
              <td className="px-4 py-2 border border-gray-300">{delivery.items}</td>
              <td className="px-4 py-2 border border-gray-300">{getStatusBadge(delivery.status)}</td>
              <td className="px-4 py-2 border border-gray-300">{delivery.eta}</td>
              <td className="px-4 py-2 border border-gray-300">{delivery.destination}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-200">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}