import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { car } from "../services/api";
import './AddCar.css';
import Navbar from "../components/Navbar";

const AddCarForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    car_type: "",
    company: "",
    price: "",
    imageUrl: [], // Updated key to match your backend model
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + formData.imageUrl.length > 10) {
      setErrorMessage("You can upload a maximum of 10 images.");
      return;
    }

    const newUrls = files.map((file) => URL.createObjectURL(file)); // Create temporary URLs for preview
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: [...prevData.imageUrl, ...newUrls], // Combine new URLs with existing ones
    }));
    setErrorMessage(""); // Clear error if any
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("auth_token");
      console.log(formData);

      const response = await apiConnector("POST", car.ADD_CAR, formData, {
        Authorization: `Bearer ${token}`,
      });

    //   console.log(response.status);

      if (response.status === 201) {
        alert("Car added successfully!");
        // Reset form data after successful submission
        setFormData({
          title: "",
          description: "",
          tags: "",
          car_type: "",
          company: "",
          price: "",
          imageUrl: [],
        });
        navigate("/profile"); // Redirect to profile or any desired page
      }
    } catch (error) {
      setErrorMessage("Failed to add car. Please try again.");
      console.error("Error adding car:", error);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
    <div className="add-car-container">
      <h1>Add a New Car</h1>
      <form onSubmit={handleSubmit} className="add-car-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter car title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter car description"
            required
          />
        </div>
        <div className="form-group">
          <label>Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags"
            required
          />
        </div>
        <div className="form-group">
          <label>Car Type</label>
          <input
            type="text"
            name="car_type"
            value={formData.car_type}
            onChange={handleChange}
            placeholder="Enter car type"
            required
          />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>
        <div className="form-group">
          <label>Images (up to 10)</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
          />
          <div className="image-preview">
            {formData.imageUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                style={{ width: "100px", margin: "5px" }}
              />
            ))}
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="submit-button">
          Add Car
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddCarForm;
