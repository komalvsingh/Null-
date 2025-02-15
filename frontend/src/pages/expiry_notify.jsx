import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/expiry_card";
import { Alert, AlertDescription } from "../components/expiry_alert";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

const ExpiryNotifications = () => {
  const [expiryData, setExpiryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/check-expiring")
      .then((response) => response.json())
      .then((data) => {
        setExpiryData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching expiry notifications:", error);
        setError("Failed to fetch expiring items");
        setLoading(false);
      });
  }, []);

  const getStatusColor = (daysUntilExpiry) => {
    if (daysUntilExpiry <= 2) return "text-red-600 bg-red-50 border-red-200";
    if (daysUntilExpiry <= 5) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-orange-600 bg-orange-50 border-orange-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Expiry Notifications
          </h1>
          {expiryData?.data?.totalItems > 0 && (
            <p className="text-gray-600">
              Found {expiryData.data.totalItems} items expiring soon
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-gray-600 text-center">
            Checking for expiring products...
          </div>
        ) : error ? (
          <Alert className="bg-red-50 border-red-200 text-red-800 max-w-md mx-auto">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : expiryData?.data?.items?.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {expiryData.data.items.map((item, index) => (
                <Card 
                  key={index} 
                  className={`border-2 ${getStatusColor(item.daysUntilExpiry)}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">
                        {item.itemName}
                      </CardTitle>
                      <Clock className="h-5 w-5" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Quantity:</span>
                        <span className="text-sm">
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Location:</span>
                        <span className="text-sm">{item.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Category:</span>
                        <span className="text-sm">{item.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Expires:</span>
                        <span className="text-sm">
                          {item.expiryDate} ({item.daysUntilExpiry} days left)
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {expiryData.data.recommendation && (
              <Card className="bg-blue-50 border-blue-200 max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-blue-800 text-lg">
                    Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 text-sm">
                    {expiryData.data.recommendation}
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Alert className="bg-green-50 border-green-200 text-green-800 max-w-md mx-auto">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription>No expiring products found.</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ExpiryNotifications;