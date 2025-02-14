import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Signin from "./pages/register";
import HomePage from "./pages/Home";
import Login from "./pages/login";
import ShelterDash from "./pages/shelter_dash";
import AddItemPage from "./pages/add_iyems"; // Fixed import name
import OrphanagePostPage from "./pages/add_post";
import DashboardLayout from "./pages/StoreDashboard";
import StoreHomePage from "./pages/store_home";

function App() {
  return (
    <BrowserRouter>
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shelter" element={<ShelterDash />} />
        <Route path="/add_items" element={<AddItemPage />} />
        <Route path="/add_post" element={<OrphanagePostPage />} />
        <Route path="/storedashboard" element={<DashboardLayout />} />
        <Route path="/store_home" element={<StoreHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
