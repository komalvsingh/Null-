import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";


function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const updateUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role); // Store role separately
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { username, password } = values;

    try {
      const res = await axios.post("http://localhost:5001/api/user/login", {
        username,
        password,
      });

      if (res.data) {
        updateUser(res.data);
        const userRole = res.data.role;

        if (userRole === "store") {
          navigate("/dashboard");
        } else if (userRole === "orphanage") {
          navigate("/shelter");
        } else {
          navigate("/"); // Default fallback
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <div className="card">
        <div className="left">
          <img
            src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="side-img"
          />
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

const FormContainer = styled.div`
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
    width: 800px;
    height: 450px;
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

    input {
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

export default Login;