"use client";

import { useState } from "react";
import { PackageCheck } from "lucide-react";

export default function DonationPanel() {
  const [donation, setDonation] = useState("");

  const handleDonate = (e) => {
    e.preventDefault();
    console.log("Donation submitted:", donation);
  };

  return (
    <div className=" rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#134611]">
        <PackageCheck size={20} /> Donate Items
      </h2>
      <form onSubmit={handleDonate} className="space-y-4">
        <div>
          <label htmlFor="donation" className="block font-medium">
            Items to Donate
          </label>
          <input
            id="donation"
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="E.g., Rice x 5kg, Water Bottles x 10"
            value={donation}
            onChange={(e) => setDonation(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
  <button type="submit" className="w-1/4 p-2 bg-[#134611] font-bold text-white rounded-md hover:bg-green-700">
    Donate
  </button>
</div>

      </form>
    </div>
  );
}
