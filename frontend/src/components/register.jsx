import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
  }; // 🔴 FIXED: Missing closing brace

  return (
    <Container>
      <div className="card">
        <div className="left">
          <img
            src="https://t3.ftcdn.net/jpg/08/57/94/28/360_F_857942877_4wpnYJVWAiso1dgVnoVuVnqwFcHLuTCp.jpg"
            alt="side-img"
          />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="brand">
              <h1>InnovateHub</h1>
            </div>
            {error && <p className="error">{error}</p>} {/* 🔹 Show error message */}

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

            <select name="userType" onChange={handleChange} value={values.userType} required>
              <option value="store">Grocery Store (Inventory Management)</option>
              <option value="orphanage">Orphanage (Food Request)</option>
            </select>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Sign In"}
            </button>

            <span>
              Already have an account? <Link to="/login">Login.</Link>
            </span>
          </form>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #121212;

  .card {
    display: flex;
    background-color: #1e1e1e;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
    width: 900px;
    height: 600px;
  }

  .left {
    flex: 1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .right {
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #1e1e1e;

    .brand {
      text-align: center;
      margin-bottom: 20px;
      h1 {
        color: #ffffff;
        font-size: 2rem;
      }
    }

    input, select {
      background-color: transparent;
      border: none;
      border-bottom: 2px solid #edcef8;
      padding: 0.5rem 0;
      color: #ffffff;
      width: 100%;
      font-size: 1rem;
      margin-bottom: 1.5rem;
      outline: none;
      transition: border-bottom 0.3s ease;

      &:focus {
        border-bottom: 2px solid transparent;
        background: linear-gradient(90deg, #9b5de5, #8338ec);
        -webkit-background-clip: text;
        color: white;
      }
    }

    button {
      background: linear-gradient(135deg, #007bff, #00d4ff);
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      width: 100%;
      transition: background 0.3s ease;

      &:hover {
        background: linear-gradient(90deg, #1e5adf, #4c8bf5);
      }
    }

    .error {
      color: red;
      text-align: center;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    span {
      font-size: 0.9rem;
      color: #aaaaaa;
      margin-top: 2rem;
      text-align: center;

      a {
        color: #4c8bf5;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Signin;
