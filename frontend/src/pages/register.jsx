import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import DonationImage from "../assets/R.jpg"

function Signin() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    userType: "store",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const userType = formData.get("userType");
    

    try {
      const res = await axios.post("http://localhost:5001/api/user/register", {
        username,
        email,
        password,
        userType,
        
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <div className="card">
        <div className="left">
           <img src={DonationImage} alt="food-donation" />
        </div>
        
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="brand">
              <h1>Food & Drink Donation</h1>
              <p>Join us to make a difference</p>
            </div>
            {error && <p className="error">{error}</p>}

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

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f4f0; /* Light background color */
  overflow: hidden;

  .card {
    display: flex;
    flex-direction: row;
    background-color: #ffffff; /* White background */
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    width: 900px;
    height: 550px;
    animation: ${fadeIn} 0.8s ease-out;

    &:hover {
      box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
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
        transform: scale(1.1); /* Zoom effect on hover */
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
        color: #2e5077; /* Dark blue color */
        font-size: 2.2rem;
        margin-bottom: 0.5rem;
      }
      p {
        color: #4da1a9; /* Teal color */
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
      background-color: transparent;
      border: none;
      border-bottom: 2px solid #4da1a9; /* Teal color */
      padding: 0.5rem 0;
      color: #2e5077; /* Dark blue color */
      width: 100%;
      font-size: 1rem;
      outline: none;
      transition: border-bottom 0.3s ease;

      &:focus {
        border-bottom: 2px solid #79d7be; /* Light green color */
      }

      &::placeholder {
        color: #aaaaaa; /* Light gray placeholder */
      }
    }

    button {
      background: linear-gradient(135deg, #4da1a9, #79d7be); /* Teal to light green gradient */
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
        background: linear-gradient(135deg, #79d7be, #4da1a9); /* Reverse gradient on hover */
        transform: translateY(-2px); /* Lift effect on hover */
      }

      &:disabled {
        cursor: not-allowed;
        background: #cccccc; /* Gray for disabled state */
        animation: none;
      }
    }

    .error {
      color: #ff4d4d; /* Red for errors */
      font-size: 0.9rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    span {
      font-size: 0.9rem;
      color: #2e5077; /* Dark blue color */
      text-align: center;
      margin-top: 1.5rem;

      a {
        color: #4da1a9; /* Teal color */
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s ease;

        &:hover {
          color: #79d7be; /* Light green on hover */
        }
      }
    }
  }
`;

export default Signin;