
import { useState } from "react";
import { Calendar, Leaf } from "lucide-react";

export default function RequestPanel() {
  const [selectedItems, setSelectedItems] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [comments, setComments] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      selectedItems,
      pickupTime,
      comments,
      vegOnly,
    });
  };

  return (
    <div className=" rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">Request Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="items" className="block font-medium">
            Selected Items
          </label>
          <textarea
            id="items"
            className="w-full border border-[#b4ff82] p-2 rounded-md"
            placeholder="Rice x 10kg, Milk x 5L"
            value={selectedItems}
            onChange={(e) => setSelectedItems(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pickup" className="font-medium flex items-center gap-2">
            <Calendar size={18} /> Pickup/Delivery Time
          </label>
          <input
            id="pickup"
            type="datetime-local"
            className="w-full p-2 border rounded-md"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comments" className="block font-medium">
            Special Requests/Comments
          </label>
          <textarea
            id="comments"
            className="w-full p-2 border rounded-md"
            placeholder="Any special instructions..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <input
            id="veg-only"
            type="checkbox"
            className="h-5 w-5 accent-green-600"
            checked={vegOnly}
            onChange={() => setVegOnly(!vegOnly)}
          />
          <label htmlFor="veg-only" className="flex items-center gap-2">
            <Leaf size={18} className="text-green-600" /> Vegetarian Only
          </label>
        </div>
        <button type="submit" className="w-full p-2 mt-4 bg-[#134611] text-white rounded-md hover:bg-green-700">
          Submit Request
        </button>
      </form>
    </div>
  );
}
