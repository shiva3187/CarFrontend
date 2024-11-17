import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { car } from "../services/api";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode for decoding the token
 import "./profile.css";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [user, setUser] = useState({}); // Initialize user state
  const [userCars, setUserCars] = useState([]); // Fixed syntax
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          throw new Error("No token found");
        }

        const decoded = jwtDecode(token); // Decode the token
        setUser(decoded); // Assuming the decoded token contains user info
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchUserCars = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        // console.log("profile page me token", token);
        const decoded = jwtDecode(token);
        const userId = decoded.userId; // Assuming the token contains the user ID
        // console.log("profile page me user id", userId);
        const response = await apiConnector(
          "GET",
          `${car.GET_USER_CARS}/${userId}`,
          null,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        console.log("Response Profile page me",response.data.cars);
        setUserCars(response.data.cars || []); // Set user cars or empty array
      } catch (error) {
        console.error("Error fetching user cars:", error);
      }
    };

    fetchUserDetails();
    fetchUserCars();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token"); // Ensure consistent key
    navigate("/login");
  };

  const handleDeleteCar = async (carId) => {
    try {
      const token = localStorage.getItem("auth_token");
      await apiConnector("DELETE", `${car.DELETE_CAR}/${carId}`, null, {
        Authorization: `Bearer ${token}`,
      });
      setUserCars(userCars.filter((car) => car._id !== carId));
      alert("Car deleted successfully!"); // Success message
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
  

  const handleUpdateCar = (carId) => {
    navigate(`/updateCar/${carId}`);
  };

  return (
    <div>
        <Navbar></Navbar>
      <div className="profile-container">
        <h1 className="profile-header">Welcome, {user.name}</h1>
        <p className="profile-email">{user.email}</p>
        {/* <button className="logout-button" onClick={handleLogout}>
          Logout
        </button> */}
        <button className="add-car-button" onClick={() => navigate("/addCar")}>
          Add Car
        </button>

        <div className="car-list">
          <h2>Your Cars</h2>
          {userCars.length > 0 ? (
            userCars.map((car) => (
              <div key={car.id} className="car-card">
                <img src={car.image} alt={car.title} className="car-image" />
                <div className="car-info">
                  <h3>{car.title}</h3>
                  <p>{car.description}</p>
                  <p>Price: ${car.price}</p>
                  <button
                    className="update-button"
                    onClick={() => handleUpdateCar(car._id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteCar(car._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No cars added by you yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
