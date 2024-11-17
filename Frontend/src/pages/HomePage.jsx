import React, { useState, useEffect } from "react";
import { apiConnector } from "../services/apiConnector";
import { car } from "../services/api";
// import "./Home.css";
import Navbar from "../components/Navbar.jsx";


const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("auth_token"); // Get the token from localStorage
        if (!token) {
          throw new Error("Unauthorized: No token provided.");
        }

        const response = await apiConnector("GET", car.GET_CAR, null, {
          Authorization: `Bearer ${token}`,
        });

        // Destructure cars from response
        const { cars: fetchedCars } = response.data;

        // Set cars state or default to an empty array
        setCars(fetchedCars || []);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError(
          error.response?.data?.message ||
          "Failed to load cars. Please ensure you are logged in."
        );
      }
    };

    fetchCars();
  }, []);

  // Filter cars based on search text
  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="homepage-container max-w-[80%]">
      <div className="">
        <Navbar></Navbar>
      </div>
      <h1 className="homepage-title">Car Listings</h1>
      <div className="search-bar-container w-[10%]">
        <input
          type="text"
          placeholder="Search cars by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-bar"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="cars-container">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image} alt={car.title} className="car-image" />
              <div className="car-info">
                <h2 className="car-title">{car.title}</h2>
                <p className="car-description">{car.description}</p>
                <p className="car-price">Price: ${car.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-cars-message">No cars found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;