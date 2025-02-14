import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-primary font-display">
          Waste No Food
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-text-primary hover:text-accent">
            About
          </a>
          <a href="#" className="text-text-primary hover:text-accent">
            How It Works
          </a>
          <a href="#" className="text-text-primary hover:text-accent">
            Contact
          </a>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6 text-text-primary" />
          </button>
        </div>
        
        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="border px-4 py-2 rounded">Log In</button>
          <button className="bg-primary text-white px-4 py-2 rounded">Sign Up</button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md p-4 absolute top-16 left-0 right-0">
          <a href="#" className="block py-2 text-text-primary hover:text-accent">
            About
          </a>
          <a href="#" className="block py-2 text-text-primary hover:text-accent">
            How It Works
          </a>
          <a href="#" className="block py-2 text-text-primary hover:text-accent">
            Contact
          </a>
          <div className="mt-4 flex flex-col space-y-2">
            <button className="border px-4 py-2 rounded">Log In</button>
            <button className="bg-primary text-white px-4 py-2 rounded">Sign Up</button>
          </div>
        </nav>
      )}
    </header>
  );
}