import { BadgeCheck, Clock, Truck } from "lucide-react";

const mockRequests = [
  { id: 1, items: "Rice x 10kg, Milk x 5L", status: "Pending", estimatedTime: "2023-12-20 14:00" },
  { id: 2, items: "Chicken Curry x 20 portions", status: "Approved", estimatedTime: "2023-12-21 12:00" },
  { id: 3, items: "Bread x 30 loaves", status: "Out for Delivery", estimatedTime: "2023-12-19 16:00" },
];

const getStatusBadge = (status) => {
  if (status === "Pending") {
    return <span className="bg-gray-500 text-white px-2 py-1 rounded flex items-center"><Clock className="w-4 h-4 mr-1" /> {status}</span>;
  } else if (status === "Approved") {
    return <span className="bg-green-500 text-white px-2 py-1 rounded flex items-center"><BadgeCheck className="w-4 h-4 mr-1" /> {status}</span>;
  }
  return <span className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center"><Truck className="w-4 h-4 mr-1" /> {status}</span>;
};

export default function RequestTracking() {
  return (
    <div className="border rounded-lg p-4 shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Request Tracking</h2>
      <div className="space-y-4">
        {mockRequests.map((request) => (
          <div key={request.id} className="flex items-center justify-between border-b pb-2">
            <div>
              <h3 className="font-semibold">{request.items}</h3>
              <p className="text-sm text-gray-500">Estimated: {request.estimatedTime}</p>
            </div>
            {getStatusBadge(request.status)}
          </div>
        ))}
      </div>
    </div>
  );
}
