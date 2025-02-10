'use client';

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const mountRef = useRef(null);
  const communityRef = useRef(null);

  useEffect(() => {
    // Header Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add floating food items
    const geometries = [
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.BoxGeometry(0.6, 0.6, 0.6),
      new THREE.ConeGeometry(0.4, 0.8, 32)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xff6b6b }),
      new THREE.MeshPhongMaterial({ color: 0x4ecdc4 }),
      new THREE.MeshPhongMaterial({ color: 0xffd93d })
    ];

    const foodItems = [];
    for (let i = 0; i < 100; i++) {
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

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 50;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      foodItems.forEach((item, index) => {
        item.rotation.x += 0.01;
        item.rotation.y += 0.01;
        item.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Community Section 3D
    const communityScene = new THREE.Scene();
    const communityCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const communityRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    communityRenderer.setSize(window.innerWidth, window.innerHeight);
    communityRef.current.appendChild(communityRenderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(5, 1);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x4ecdc4,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const sphere = new THREE.Mesh(geometry, material);
    communityScene.add(sphere);

    communityScene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pointLight = new THREE.PointLight(0xff6b6b, 1);
    pointLight.position.set(10, 10, 10);
    communityScene.add(pointLight);

    communityCamera.position.z = 15;

    // Add OrbitControls to community scene
    const communityControls = new OrbitControls(communityCamera, communityRenderer.domElement);
    communityControls.enableDamping = true;
    communityControls.dampingFactor = 0.05;
    communityControls.screenSpacePanning = false;
    communityControls.minDistance = 10;
    communityControls.maxDistance = 20;

    const animateCommunity = () => {
      requestAnimationFrame(animateCommunity);
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
      communityControls.update();
      communityRenderer.render(communityScene, communityCamera);
    };
    animateCommunity();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      communityCamera.aspect = window.innerWidth / window.innerHeight;
      communityCamera.updateProjectionMatrix();
      communityRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef?.current?.removeChild(renderer.domElement);
      communityRef?.current?.removeChild(communityRenderer.domElement);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen relative overflow-hidden">
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full opacity-30" />
      <Navbar />
      
      <header className="text-center py-20 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white relative z-10">
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in-down">Fight Hunger, Save Food</h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto animate-fade-in-up">
            Donate surplus food, drinks, and other consumables close to expiry to help those in need.
          </p>
          <div className="mt-8 space-x-4">
          <Link
          to="/add_items"
          className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition transform hover:scale-105 animate-bounce"
        >
          Inventory
        </Link>
            <Link
              to="/volunteer"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition transform hover:scale-105"
            >
              Volunteer
            </Link>
          </div>
        </div>
      </header>

      <section className="text-center py-16 px-6 relative z-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">How You Can Help</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445", title: "Donate Food", color: "bg-red-500" },
            { img: "https://images.unsplash.com/photo-1554866585-cd94860890b7", title: "Donate Drinks", color: "bg-blue-500" },
            { img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", title: "Partner With Us", color: "bg-green-500" }
          ].map((item, index) => (
            <div 
              key={index}
              className="p-6 bg-white shadow-xl rounded-lg transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
            >
              <div className={`absolute inset-0 ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              <img
                src={item.img || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mt-4">{item.title}</h3>
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
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-gradient-to-r from-teal-500 to-cyan-600 p-8 rounded-xl shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="mt-4 text-lg">
            Sign up today to become part of our mission to fight hunger and reduce waste.
          </p>
          <div className="mt-8 space-x-4">
            <Link
              to="/login"
              className="inline-block bg-white text-teal-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-teal-600 transition transform hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 text-center relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-lg mb-4">&copy; 2025 Food & Drink Donation Platform. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
