

import DashboardHeader from "../components/Shelter_header";
import InventoryDisplay from "../components/Shelter_inventory";
import RequestPanel from "../components/Shelter_Req";
import RequestTracking from "../components/Shelter_ReqTrack";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0ffcc] to-[#acf17f] text-[#134611]">
      <DashboardHeader />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <InventoryDisplay />
          </div>
          <div>
            <RequestPanel />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <RequestTracking />
          </div>
          
        </div>
      </main>
    </div>
  );
}