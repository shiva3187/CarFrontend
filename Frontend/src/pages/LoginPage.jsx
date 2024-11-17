import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/api";
// import "./Login.css";
import Navbar from "../components/Navbar.jsx";
import './LoginPage.css';
import '../components/Navbar.css';



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await apiConnector("POST", endpoints.LOGIN_API, { email, password });

      // If login is successful, store the token securely
      // console.log(response.data);
      console.log("login", response.data.token);
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token); // Use secure storage for production
        alert(response.data.msg || "Login Successful!");
        navigate("/"); // Corrected route to navigate to home page
      }
    } catch (error) {
      // Handle errors
      setErrorMessage(error.response?.data?.msg || "Invalid email or password");
    }
  };

  const redirectToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container flex flex-col">
      <Navbar />
      <div className="login-card">
        <h2 className="login-header">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              className="redirect-button"
              onClick={redirectToSignup}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
