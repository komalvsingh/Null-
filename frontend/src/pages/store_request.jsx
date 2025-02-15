import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/card";
import { Alert, AlertDescription } from "../components/alert";
import { AlertCircle } from "lucide-react";


const OrphanageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log("Fetching requests...");
        const response = await fetch("http://localhost:5000/match-requests");
        const data = await response.json();
        console.log("Received data:", data);

        if (data.status === "error") {
          throw new Error(data.message);
        }

        setDebug(data.debug); // Store debug info
        
        // Handle the response data
        const matchedRequests = data.message || [];
        if (Array.isArray(matchedRequests)) {
          const parsedRequests = matchedRequests.map((request, index) => ({
            id: index,
            content: request,
            orphanageName: `Request ${index + 1}`,
            timestamp: new Date().toISOString()
          }));
          setRequests(parsedRequests);
        } else {
          console.warn("Unexpected response format:", matchedRequests);
          setRequests([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-pulse text-gray-500">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Matching Orphanage Requests
      </h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Error: {error}</AlertDescription>
        </Alert>
      )}

      {debug && (
        <div className="mb-6 p-4 bg-gray-200 rounded-lg">
          <p>Available Items: {debug.availableItems}</p>
          <p>Orphanage Requests: {debug.orphanageRequests}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id} className="transform transition-all duration-300 hover:scale-105">
              <Card className="shadow-lg">
                <CardContent className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {request.orphanageName}
                  </h2>
                  <p className="text-gray-600 mt-2 whitespace-pre-line">
                    {request.content}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(request.timestamp).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            <p>No matching requests found.</p>
            <p className="text-sm mt-2">
              This could be because there are no expiring items or no matching orphanage requests.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrphanageRequests;