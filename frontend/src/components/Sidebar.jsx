import React from "react";
import { PlusSquare, Package, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#134611] min-h-screen p-4">
      <div className="flex flex-col gap-4">
        <Link
          to="/add_items"
          className="flex items-center gap-2 text-white hover:bg-[#1b2e27] p-3 rounded-lg w-full"
        >
          <PlusSquare size={20} />
          <span>Add Items</span>
        </Link>
        <Link
          to="/inventory"
          className="flex items-center gap-2 text-white hover:bg-[#1b2e27] p-3 rounded-lg w-full"
        >
          <Package size={20} />
          <span>Inventory</span>
        </Link>
        <Link
          to="/donations"
          className="flex items-center gap-2 text-white hover:bg-[#1b2e27] p-3 rounded-lg w-full"
        >
          <Heart size={20} />
          <span>Donations</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
