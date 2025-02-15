import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/card";

const OrphanageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("http://localhost:5000/match-requests");
      const data = await response.json();

      setRequests(data.message.map((request, index) => ({
        id: index,
        content: request,
        orphanageName: `Request ${index + 1}`,
      })));
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-green-800 text-center mb-6">
        Matching Orphanage Requests
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((request) => (
          <Card key={request.id} className="bg-white border-green-200">
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold text-green-800">
                {request.orphanageName}
              </h2>
              <p className="text-green-700 text-sm">
                {expandedId === request.id
                  ? request.content
                  : `${request.content.substring(0, 350)}...`}
              </p>
              <button
                onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                className="mt-3 px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
              >
                {expandedId === request.id ? "Show Less" : "View Details"}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrphanageRequests;
