import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
          navigate("/");
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
            src="https://t3.ftcdn.net/jpg/08/07/69/46/360_F_807694695_ABPSKCCFE0rpnoDU1YySd9Dwdc6JrIXY.jpg"
            alt="side-img"
          />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="brand">
              <h1>InnovateHub</h1>
            </div>
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
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
            <span>
              Don't have an account? <Link to="/register">Sign In.</Link>
            </span>
          </form>
        </div>
      </div>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #121212;

  .card {
    display: flex;
    flex-direction: row;
    background-color: #1e1e1e;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
    width: 700px;
    height: 400px;
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

    .brand {
      text-align: center;
      margin-bottom: 20px;
      h1 {
        color: #ffffff;
        font-size: 2rem;
      }
    }

    input {
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
      text-transform: uppercase;
      transition: background 0.3s ease;

      &:hover {
        background: linear-gradient(90deg, #1e5adf, #4c8bf5);
      }

      &:disabled {
        cursor: not-allowed;
        background: #444;
      }
    }

    .error {
      color: red;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    span {
      font-size: 0.9rem;
      color: #aaaaaa;
      text-align: center;
      margin-top: 2rem;

      a {
        color: #4c8bf5;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
