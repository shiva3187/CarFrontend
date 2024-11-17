import React, { createContext, useState, useEffect } from "react";
import { apiConnector } from "../services/apiConnector";
import { endpoints } from "../services/api";

export const CarContext = createContext();

const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiConnector("GET", `${endpoints.CAR_API}/all`);
      setCars(response.data.cars || []);
    } catch (error) {
      setError(error.response?.data?.msg || "Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  const addCar = async (carData) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");

      const response = await apiConnector("POST", `${endpoints.CAR_API}/add`, carData, {
        Authorization: `Bearer ${token}`,
      });

      setCars((prevCars) => [...prevCars, response.data.car]);
      return { success: true, msg: "Car added successfully" };
    } catch (error) {
      return { success: false, msg: error.response?.data?.msg || "Failed to add car" };
    }
  };

  const deleteCar = async (carId) => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("Not authenticated");

      await apiConnector("DELETE", `${endpoints.CAR_API}/delete/${carId}`, null, {
        Authorization: `Bearer ${token}`,
      });

      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
      return { success: true, msg: "Car deleted successfully" };
    } catch (error) {
      return { success: false, msg: error.response?.data?.msg || "Failed to delete car" };
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <CarContext.Provider value={{ cars, loading, error, fetchCars, addCar, deleteCar }}>
      {children}
    </CarContext.Provider>
  );
};

export default CarProvider;
