import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming your CSS file is named Navbar.css

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">CarApp</Link>

        {/* Middle Links */}
        <div className="navbar-middle">
          <ul className="navbar-links">
            <li>
              <Link to="/" className="navbar-link">Home</Link>
            </li>
            <li>
              <Link to="/add-car" className="navbar-link">Add Car</Link>
            </li>
          </ul>
        </div>

        {/* Login */}
        <div className="navbar-login">
          <Link to="/login" className="navbar-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
