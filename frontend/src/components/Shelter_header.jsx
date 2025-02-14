import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function DashboardHeader() {
  const [theme, setTheme] = useState("light");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#134611]/20 bg-[#e0ffbc] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="md:hidden p-2 bg-transparent border-none" aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold">Shelter Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-transparent border-none" aria-label="Notifications">
            <Bell className="h-6 w-6" />
          </button>
          <div className="relative">
            <button
              className="p-2 bg-transparent border-none relative"
              aria-label="Toggle theme"
              onClick={() =>
                setTheme((prev) => (prev === "light" ? "dark" : "light"))
              }
            >
              <Sun
                className={`h-6 w-6 transition-all ${
                  theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
                }`}
              />
              <Moon
                className={`absolute h-6 w-6 transition-all ${
                  theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                }`}
              />
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md hidden group-hover:block">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setTheme("light")}
              >
                Light
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setTheme("dark")}
              >
                Dark
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setTheme("system")}
              >
                System
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
