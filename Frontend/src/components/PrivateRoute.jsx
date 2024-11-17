// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Correct path to AuthContext

const PrivateRoute = ({ element }) => {
  const { user } = useAuth(); // This will give you the current user state

  if (!user) {
    return <Navigate to="/login" />; // Redirect if not authenticated
  }

  return element; // Return the protected route's component if authenticated
};

export default PrivateRoute;
