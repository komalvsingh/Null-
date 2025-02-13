import React from "react";
import { Bell, LayoutGrid, Package, Grid } from "lucide-react";

// Custom Alert Component
const CustomAlert = ({ children, variant = "default" }) => {
  const bgColor =
    variant === "destructive" ? "bg-red-50 border-red-100" : "bg-blue-50 border-blue-100";

  return (
    <div className={`${bgColor} border rounded-lg p-4 flex items-center gap-3 shadow-sm`}>
      {children}
    </div>
  );
};

export default function DashboardLayout() {
  const navItems = [
    { icon: <LayoutGrid size={24} />, label: "Dashboards", color: "text-blue-600", bgColor: "bg-blue-100" },
    { icon: <Package size={24} />, label: "Inventory", color: "text-purple-600", bgColor: "bg-purple-100" },
    { icon: <Grid size={24} />, label: "Add Items", color: "text-emerald-600", bgColor: "bg-emerald-100" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full bg-white shadow-md p-4 flex items-center justify-between px-6">
        <h1 className="text-lg font-semibold text-gray-700">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </button>
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            A
          </div>
        </div>
      </header>

      {/* Navigation Grid */}
      <main className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
            >
              <div className={`p-4 rounded-full ${item.color} ${item.bgColor} mb-3`}>
                {item.icon}
              </div>
              <span className="text-base font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
