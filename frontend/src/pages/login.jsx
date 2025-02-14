import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
<<<<<<< HEAD
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import DonationImage from '../assets/R.jpg';
=======
import DonationImage from "../assets/R.jpg";
import Toast from "../components/Toast"; // Importing Toast component
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
>>>>>>> 5db729bd39f4aee6557c345e5a7a67d5f2e418d1

function Login() {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext); // Use AuthContext
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // "success" or "error"

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

<<<<<<< HEAD
=======
  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role);
  };


  
>>>>>>> 5db729bd39f4aee6557c345e5a7a67d5f2e418d1
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
<<<<<<< HEAD

    try {
      const res = await axios.post("http://localhost:5001/api/user/login", values);

      if (res.data) {
        updateUser(res.data); // Update global context state
=======
  
    try {
      const res = await axios.post("http://localhost:5001/api/user/login", values);
  
      if (res.data) {
        updateUser(res.data);
        toast.success("Login successful!", { position: "top-right" });
  
>>>>>>> 5db729bd39f4aee6557c345e5a7a67d5f2e418d1
        const userRole = res.data.role;
        if (userRole === "store") {
<<<<<<< HEAD
          navigate("/");
=======
          navigate("/store_home");
>>>>>>> 5db729bd39f4aee6557c345e5a7a67d5f2e418d1
        } else if (userRole === "orphanage") {
          navigate("/shelter");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Invalid response from server", { position: "top-right" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <FormContainer>
      {/* Show Toast when message exists */}
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage("")} />
      )}

      <div className="card">
        <div className="left">
          <img src={DonationImage} alt="food-donation" />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="brand">
              <h1>Food & Drink Donation</h1>
              <p>Login to make a difference</p>
            </div>
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
            <span>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </span>
          </form>
        </div>
      </div>
    </FormContainer>
  );
}

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const FormContainer = styled.div`
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
    width: 800px;
    height: 450px;
    animation: ${fadeIn} 0.8s ease-out;

    &:hover {
      box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.2);
    }
  }

  .left {
    flex: 1;
    overflow: hidden;
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

    input {
      background-color: transparent;
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

    .error {
      color: #ff4d4d;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      text-align: center;
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

export default Login;
