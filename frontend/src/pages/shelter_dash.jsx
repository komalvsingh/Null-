import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  ClipboardList,
  Truck,
  LogOut,
  Home,
  Search,
  ChevronDown,
} from "lucide-react";
import { Link,useNavigate } from "react-router-dom";

const ShelterPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    setShowAlert(true);
    setAlertMessage("Successfully logged out");
    setTimeout(() => setShowAlert(false), 3000);
    navigate("/");
  };

  const handleNavigation = (path) => {
    console.log(`Navigating to ${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="h-6 w-6 text-[#134611]" />
            <span className="text-xl font-semibold text-[#134611]">
              Shelter Connect
            </span>
          </motion.div>
          <motion.button
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-28 pb-16 container mx-auto px-4">
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mb-6 p-4 bg-blue-100 text-[#134611] rounded-lg"
          >
            {alertMessage}
          </motion.div>
        )}

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Shelter Connect
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your food donation process and help those in need with
            our integrated management system.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {[
            {
              title: "Request Assistance",
              buttonText: "Submit Request",
              icon: <UserPlus />,
              path: "/add_post",
              color: "bg-green-100",
            },
            {
              title: "Browse Requests",
              buttonText: "View Requests",
              icon: <ClipboardList />,
              path: "/request",
              color: "bg-yellow-100",

            },
            {
              title: "Monitor Deliveries",
              buttonText: "Track Now",
              icon: <Truck />,
              path: "/track-delivery",
              color: "bg-purple-100",
            },
          ].map(({ title, icon, path, color, buttonText }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6"
              onClick={()=> {navigate(path)}}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <motion.div
                  className={`p-3 ${color} rounded-full`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600">
                  Manage {title.toLowerCase()} easily.
                </p>
                <motion.button
                  className="w-full bg-[#134611] hover:bg-[#134611] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  onClick={() => handleNavigation(path)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  
                >
                  {buttonText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <motion.button
                className="bg-[#134611] hover:bg-[#4f7f4d] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
        >
          <ChevronDown className="h-8 w-8 text-[#134611]" />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>&copy; 2025 Shelter Connect. All rights reserved.</p>
          <p className="mt-1">
            Making a difference in our community, one meal at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ShelterPage;
