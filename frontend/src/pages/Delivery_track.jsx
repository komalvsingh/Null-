import DeliveryMap from "../components/delivery_map";
import DeliveryList from "../components/delivery_list";
import { Map, Package } from "lucide-react";

export default function DeliveryTrackingPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Delivery Tracking</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-lg shadow-md p-4 md:col-span-2">
          <div className="flex items-center mb-2">
            <Map className="w-5 h-5 mr-2 text-blue-500" />
            <h2 className="text-xl font-semibold">Live Delivery Map</h2>
          </div>
          <DeliveryMap />
        </div>
        <div className="border rounded-lg shadow-md p-4 md:col-span-2">
          <div className="flex items-center mb-2">
            <Package className="w-5 h-5 mr-2 text-green-500" />
            <h2 className="text-xl font-semibold">Ongoing Deliveries</h2>
          </div>
          <DeliveryList />
        </div>
      </div>
    </div>
  );
}