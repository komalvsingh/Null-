import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CalendarIcon, LocationMarkerIcon, ClipboardListIcon, CubeIcon, HashtagIcon } from "@heroicons/react/solid";
import * as THREE from "three";
import styled from "styled-components";

const AddItemPage = ({setOpen}) => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [expiryDate, setExpiryDate] = useState("");
  const [location, setLocation] = useState("");

  const categories = ["Vegetables", "Packaged Food", "Grains"];
  const units = ["kg", "liters", "packs"];

  const mountRef = useRef(null); // Ref for Three.js canvas

  // useEffect(() => {
  //   // Set up Three.js scene
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //   const renderer = new THREE.WebGLRenderer({ alpha: true });
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   mountRef.current.appendChild(renderer.domElement);

  //   // Add a 3D object (e.g., a rotating cube)
  //   const geometry = new THREE.BoxGeometry(2, 2, 2);
  //   const material = new THREE.MeshBasicMaterial({ color: 0x4da1a9, wireframe: true });
  //   const cube = new THREE.Mesh(geometry, material);
  //   scene.add(cube);

  //   // Position the camera
  //   camera.position.z = 5;

  //   // Animation loop
  //   const animate = () => {
  //     requestAnimationFrame(animate);
  //     cube.rotation.x += 0.01;
  //     cube.rotation.y += 0.01;
  //     renderer.render(scene, camera);
  //   };
  //   animate();

  //   // Handle window resize
  //   const handleResize = () => {
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //   };
  //   window.addEventListener("resize", handleResize);

  //   // Cleanup
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     mountRef?.current?.removeChild(renderer.domElement);
  //   };
  // }, []);

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
    <div>
      {/* Form Overlay */}
      <FormWrapper>
        <div className="flex justify-between">
          <div></div>
        <h2 className="text-2xl font-bold text-center mb-3 text-[#2E5077]">Add New Item</h2>
        <button onClick={()=>setOpen(false)} className="rounded-full border w-5 h-5 flex items-center justify-center">x</button>
        </div>
        
        <form onSubmit={handleSubmit} className="">
          
          {/* Item Name */}
          <InputGroup>
            <label className="block text-[#2E5077]  ">Item Name</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-2 py-2">
              <ClipboardListIcon className="w-3 h-3 text-[#4DA1A9] mr-3" />
              <input type="text" className="w-full bg-transparent outline-none text-[#2E5077]" value={itemName} onChange={(e) => setItemName(e.target.value)} required placeholder="Enter item name" />
            </div>
          </InputGroup>

          {/* Category */}
          <InputGroup>
            <label className="block text-[#2E5077]  ">Category</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-2 py-2">
              <CubeIcon className="w-3 h-3 text-[#4DA1A9] mr-3" />
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
              <label className="block text-[#2E5077]  ">Quantity</label>
              <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-2 py-2">
                <HashtagIcon className="w-3 h-3 text-[#4DA1A9] mr-3" />
                <input type="number" className="w-full bg-transparent outline-none text-[#2E5077]" value={quantity} onChange={(e) => setQuantity(e.target.value)} required placeholder="Enter quantity" />
              </div>
            </InputGroup>

            <InputGroup>
              <label className="block text-[#2E5077]  ">Unit</label>
              <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-2 py-2">
                <CubeIcon className="w-3 h-3 text-[#4DA1A9] mr-3" />
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
            <label className="block text-[#2E5077]  ">Expiry Date</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-2 py-2">
              <CalendarIcon className="w-3 h-3 text-[#4DA1A9] mr-3" />
              <input type="date" className="w-full bg-transparent outline-none text-[#2E5077]" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
            </div>
          </InputGroup>

          {/* Location */}
          <InputGroup>
            <label className="block text-[#2E5077]  ">Location</label>
            <div className="flex items-center bg-[#F6F4F0] border border-[#4DA1A9] rounded-lg px-2 py-2">
              <LocationMarkerIcon className="w-3 h-3 text-[#4DA1A9] mr-3" />
              <input type="text" className="w-full bg-transparent outline-none text-[#2E5077]" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder="Enter location" />
            </div>
          </InputGroup>

          {/* Submit Button */}
          <SubmitButton className="mt-5" type="submit">Add Item</SubmitButton>
        </form>
      </FormWrapper>
    </div>
  );
};

// Styled Components
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f6f4f0;
  overflow: hidden;
`;

const FormWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 15px;
  border: 2px solid #4da1a9;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  margin-bottom: 0.5rem;

  label {
    color: #2e5077;
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: block;
  }

  input,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 2px solid #4da1a9;
    border-radius: 8px;
    background: #f6f4f0;
    color: #2e5077;
    font-size: 0.75rem;
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