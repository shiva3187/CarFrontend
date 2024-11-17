import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {jwtDecode} from "jwt-decode"; // Correct import
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null); // State to track user information
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user from token
    const token = localStorage.getItem("auth_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.name) {
          setUser(decoded.name); // Set user name from token
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("auth_token"); // Remove invalid token
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar bg-orange-600 p-4 flex justify-between items-center pr-5">
      {/* Left: Brand Name */}
      <div className="logo">
        <Link to="/" className="text-white font-bold text-xl">
          CarManagement
        </Link>
      </div>

      {/* Right: User Info or Authentication Buttons */}
      <div className="auth-section flex items-center space-x-4">
        {user ? (
          <div className="user-info flex items-center space-x-3">
            <FaUserCircle className="text-white text-2xl" />
            <span className="text-white font-medium">{user}</span> {/* Show user name */}
            <button
              onClick={() => navigate("/profile")}
              className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-100 transition"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons flex items-center space-x-3">
            <button
              onClick={() => navigate("/signup")}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-100 transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
