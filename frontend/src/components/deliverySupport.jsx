"use client";

import React from "react";
import { HelpCircle } from "lucide-react";

const SupportHelp = () => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <div className="mb-2">
        <h2 className="text-xl font-semibold">Need Help?</h2>
      </div>
      <div>
        <button className="border rounded-lg px-4 py-2 flex items-center space-x-2">
          <HelpCircle className="w-4 h-4" />
          <span>Contact Support</span>
        </button>
      </div>
    </div>
  );
};

export default SupportHelp;
