import React from "react";
import { PlusSquare, Package, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {  const location = useLocation();
  console.log(location)

  return (
    <div className="w-64 bg-[#134611] min-h-screen p-4">
      <div className="flex flex-col gap-4">
        <Link
          to="/storeview"
          className={`${location.pathname=='/storeview'?'bg-[#c4fc9e] text-black':'text-white'} flex items-center gap-2 hover:bg-[#1b2e27] p-3 rounded-lg w-full`}
        >
          <Package size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/storedashboard"
          className={`${location.pathname=='/storedashboard'?'bg-[#c4fc9e] text-black':'text-white'} flex items-center gap-2 hover:bg-[#1b2e27] p-3 rounded-lg w-full`}
        >
          <Package size={20} />
          <span>Inventory</span>
        </Link>
        <Link
          to="/add_items"
          className={`${location.pathname=='/add_items'?'bg-[#c4fc9e] text-black':'text-white'} flex items-center gap-2 hover:bg-[#1b2e27] p-3 rounded-lg w-full`}
        >
          <PlusSquare size={20} />
          <span>Add Items</span>
        </Link>
        
        <Link
          to="/expiry_notify"
          className={`${location.pathname=='/donations'?'bg-[#c4fc9e] text-black':'text-white'} flex items-center gap-2 hover:bg-[#1b2e27] p-3 rounded-lg w-full`}
        >
          <Heart size={20} />
          <span>Check Expiry Products</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
