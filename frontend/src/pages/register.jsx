import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DonationImage from "../assets/R.jpg";
import donorImage from "../assets/donate.png";
import Header from "../components/Header";

function Signin() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    userType: "store",
    city: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to get user's location using Geolocation API
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchCityFromCoords(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation permission denied or error occurred:", error);
        }
      );
    }
  }, []);

  // Fetch city name from OpenStreetMap's Nominatim API
  const fetchCityFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      const city = data.address?.city || data.address?.town || data.address?.village || "";
      setValues((prevValues) => ({ ...prevValues, city }));
    } catch (error) {
      console.error("Error fetching city name:", error);
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://localhost:5001/api/user/register", values);
      toast.success("Registration successful! Redirecting...", { position: "top-right" });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      style={{
        background: `url(${donorImage}) no-repeat center center / cover`,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="card relative -top-16">
        <div className="left">
          <img src={DonationImage} alt="food-donation" />
        </div>

        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="brand">
              <h1>Food & Drink Donation</h1>
              <p>Join us to make a difference</p>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="username"
                required
                placeholder="Username"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                required
                placeholder="City"
                value={values.city}
                onChange={handleChange}
              />
              <select
                name="userType"
                onChange={handleChange}
                value={values.userType}
                required
              >
                <option value="store">Grocery Store (Inventory Management)</option>
                <option value="orphanage">Orphanage (Food Request)</option>
              </select>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Sign Up"}
            </button>

            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
      </div>
    </Container>
  );
}
// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f4f0;
  overflow: hidden;

  .card {
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    width: 900px;
    height: 550px;
    animation: ${fadeIn} 0.8s ease-out;
  }

  .left {
    flex: 1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .right {
    flex: 1;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: ${fadeIn} 1s ease-out;

    .brand {
      text-align: center;
      margin-bottom: 1.5rem;
      h1 {
        color: #2e5077;
        font-size: 2.2rem;
        margin-bottom: 0.5rem;
      }
      p {
        color: #4da1a9;
        font-size: 0.9rem;
      }
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    input,
    select {
      border: none;
      border-bottom: 2px solid #4da1a9;
      padding: 0.5rem 0;
      color: #2e5077;
      width: 100%;
      font-size: 1rem;
      outline: none;
      transition: border-bottom 0.3s ease;

      &:focus {
        border-bottom: 2px solid #79d7be;
      }

      &::placeholder {
        color: #aaaaaa;
      }
    }

    button {
      background: linear-gradient(135deg, #4da1a9, #79d7be);
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      width: 100%;
      text-transform: uppercase;
      transition: background 0.3s ease, transform 0.3s ease;
      animation: ${pulse} 2s infinite;

      &:hover {
        background: linear-gradient(135deg, #79d7be, #4da1a9);
        transform: translateY(-2px);
      }

      &:disabled {
        cursor: not-allowed;
        background: #cccccc;
        animation: none;
      }
    }

    span {
      font-size: 0.9rem;
      color: #2e5077;
      text-align: center;
      margin-top: 1.5rem;

      a {
        color: #4da1a9;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s ease;

        &:hover {
          color: #79d7be;
        }
      }
    }
  }
`;

export default Signin;
