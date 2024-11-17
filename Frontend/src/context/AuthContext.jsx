import React, { createContext, useState, useEffect } from "react";
import { apiConnector } from "../services/apiConnector"; // Keep this if you still need it for login/signup
import { endpoints } from "../services/api"; // Keep this if you still need it for login/signup

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Assuming user data is stored in local storage or you can set some default user info
      setUser ({ /* default user info or parse from token */ });
      setIsAuthenticated(true);
    }
    setLoading(false); // Set loading to false after checking for token
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiConnector("POST", endpoints.LOGIN_API, { email, password });
      localStorage.setItem("auth_token", response.data.token);
      setUser (response.data.user); // Assuming the user data is returned in the login response
      setIsAuthenticated(true);
      return { success: true, msg: response.data.msg || "Login successful!" };
    } catch (error) {
      return { success: false, msg: error.response?.data?.msg || "Invalid email or password" };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await apiConnector("POST", endpoints.SIGNUP_API, { name, email, password });
      return { success: true, msg: response.data.msg || "Signup successful!" };
    } catch (error) {
      return { success: false, msg: error.response?.data?.msg || "Signup failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser (null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;