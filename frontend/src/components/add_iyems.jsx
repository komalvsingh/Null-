import React, { useState } from "react";
import axios from "axios";
import { CalendarIcon, LocationMarkerIcon, ClipboardListIcon, CubeIcon, HashtagIcon } from "@heroicons/react/solid";
import styled, { keyframes } from "styled-components";

const AddItemPage = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [expiryDate, setExpiryDate] = useState("");
  const [location, setLocation] = useState("");

  const categories = ["Vegetables", "Packaged Food", "Grains"];
  const units = ["kg", "liters", "packs"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemName && quantity && location && unit && category) {
      const newItem = { itemName, category, quantity, unit, expiryDate, location };
      try {
        const response = await axios.post("http://localhost:5001/api/items/add", newItem);
        console.log("Item added:", response.data);
        alert("Item added successfully!");
      } catch (error) {
        console.error("Error adding item:", error);
        alert("Failed to add item.");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h2 className="text-4xl font-bold text-center mb-8 text-[#2E5077]">Add New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Item Name */}
          <InputGroup>
            <label className="block text-[#2E5077] font-medium mb-2">Item Name</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
              <ClipboardListIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
              <input type="text" className="w-full bg-transparent outline-none text-[#2E5077]" value={itemName} onChange={(e) => setItemName(e.target.value)} required placeholder="Enter item name" />
            </div>
          </InputGroup>

          {/* Category */}
          <InputGroup>
            <label className="block text-[#2E5077] font-medium mb-2">Category</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
              <CubeIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
              <select className="w-full bg-transparent outline-none text-[#2E5077]" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-white text-[#2E5077]">{cat}</option>
                ))}
              </select>
            </div>
          </InputGroup>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <InputGroup>
              <label className="block text-[#2E5077] font-medium mb-2">Quantity</label>
              <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
                <HashtagIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
                <input type="number" className="w-full bg-transparent outline-none text-[#2E5077]" value={quantity} onChange={(e) => setQuantity(e.target.value)} required placeholder="Enter quantity" />
              </div>
            </InputGroup>

            <InputGroup>
              <label className="block text-[#2E5077] font-medium mb-2">Unit</label>
              <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
                <CubeIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
                <select className="w-full bg-transparent outline-none text-[#2E5077]" value={unit} onChange={(e) => setUnit(e.target.value)}>
                  {units.map((u) => (
                    <option key={u} value={u} className="bg-white text-[#2E5077]">{u}</option>
                  ))}
                </select>
              </div>
            </InputGroup>
          </div>

          {/* Expiry Date */}
          <InputGroup>
            <label className="block text-[#2E5077] font-medium mb-2">Expiry Date</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
              <CalendarIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
              <input type="date" className="w-full bg-transparent outline-none text-[#2E5077]" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            </div>
          </InputGroup>

          {/* Location */}
          <InputGroup>
            <label className="block text-[#2E5077] font-medium mb-2">Location</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-4 py-3">
              <LocationMarkerIcon className="w-5 h-5 text-[#4DA1A9] mr-3" />
              <input type="text" className="w-full bg-transparent outline-none text-[#2E5077]" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder="Enter location" />
            </div>
          </InputGroup>

          {/* Submit Button */}
          <SubmitButton type="submit">Add Item</SubmitButton>
        </form>
      </FormWrapper>
    </Container>
  );
};

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f6f4f0;
  padding: 2rem;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  border: 2px solid #4da1a9;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-out;

  &:hover {
    box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.2);
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    color: #2e5077;
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: block;
  }

  input,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #4da1a9;
    border-radius: 8px;
    background: #f6f4f0;
    color: #2e5077;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
      border-color: #79d7be;
      box-shadow: 0px 0px 8px rgba(77, 161, 169, 0.3);
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #4da1a9, #79d7be);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #79d7be, #4da1a9);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default AddItemPage;