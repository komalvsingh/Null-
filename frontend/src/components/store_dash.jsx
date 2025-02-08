import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Navbar from "./navbar";

const HomePage = () => {
  const mountRef = useRef(null);
  const communityRef = useRef(null);

  useEffect(() => {
    // Header Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add floating food items
    const geometries = [
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.ConeGeometry(1, 2, 32)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x4da1a9 }),
      new THREE.MeshPhongMaterial({ color: 0x79d7be }),
      new THREE.MeshPhongMaterial({ color: 0x2e5077 })
    ];

    const foodItems = [];
    for (let i = 0; i < 50; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        Math.random() * 40 - 20,
        Math.random() * 40 - 20,
        Math.random() * 40 - 20
      );
      
      scene.add(mesh);
      foodItems.push(mesh);
    }

    // Add lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 30;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      foodItems.forEach((item, index) => {
        item.rotation.x += 0.01;
        item.rotation.y += 0.01;
        item.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });
      renderer.render(scene, camera);
    };
    animate();

    // Community Section 3D
    const communityScene = new THREE.Scene();
    const communityCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const communityRenderer = new THREE.WebGLRenderer({ alpha: true });
    communityRenderer.setSize(window.innerWidth, window.innerHeight);
    communityRef.current.appendChild(communityRenderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(5, 1);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const sphere = new THREE.Mesh(geometry, material);
    communityScene.add(sphere);

    communityScene.add(new THREE.AmbientLight(0x4da1a9));
    const pointLight = new THREE.PointLight(0x79d7be, 1);
    pointLight.position.set(10, 10, 10);
    communityScene.add(pointLight);

    communityCamera.position.z = 15;

    const animateCommunity = () => {
      requestAnimationFrame(animateCommunity);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      communityRenderer.render(communityScene, communityCamera);
    };
    animateCommunity();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      communityRef.current.removeChild(communityRenderer.domElement);
    };
  }, []);

  return (
    <div className="bg-[#F6F4F0] min-h-screen relative overflow-hidden">
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full opacity-20" />
      <Navbar />
      
      <header className="text-center py-20 px-6 bg-[#2E5077] text-white relative z-10">
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Fight Hunger, Save Food</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Donate surplus food, drinks, and other consumables close to expiry to help those in need.
          </p>
          <div className="mt-8 space-x-4">
            <Link
              to="/add_items"
              className="inline-block bg-[#4DA1A9] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#79D7BE] transition transform hover:scale-105"
            >
              Inventory
            </Link>
            <Link
              to="/volunteer"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#2E5077] transition transform hover:scale-105"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </header>

      <section className="text-center py-16 px-6 relative z-10">
        <h2 className="text-4xl font-bold text-[#2E5077]">How You Can Help</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445", title: "Donate Food" },
            { img: "https://images.unsplash.com/photo-1554866585-cd94860890b7", title: "Donate Drinks" },
            { img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", title: "Partner With Us" }
          ].map((item, index) => (
            <div 
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#4DA1A9] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold text-[#4DA1A9] mt-4">{item.title}</h3>
              <p className="mt-2 text-gray-600">
                {item.title === "Donate Food" ? "Donate surplus food items close to expiry to help feed the hungry." :
                 item.title === "Donate Drinks" ? "Contribute beverages and drinks close to expiry to support those in need." :
                 "Collaborate with us to create a sustainable food donation network."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-16 px-6 text-white">
        <div ref={communityRef} className="absolute top-0 left-0 w-full h-full opacity-30" />
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-[#4DA1A9] bg-opacity-90 p-8 rounded-xl">
          <h2 className="text-4xl font-bold">Join Our Community</h2>
          <p className="mt-4 text-lg">
            Sign up today to become part of our mission to fight hunger and reduce waste.
          </p>
          <div className="mt-8 space-x-4">
            <Link
              to="/login"
              className="inline-block bg-white text-[#4DA1A9] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#F6F4F0] transition transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#4DA1A9] transition transform hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-[#2E5077] text-white py-6 text-center relative z-10">
        <p>&copy; 2025 Food & Drink Donation Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;