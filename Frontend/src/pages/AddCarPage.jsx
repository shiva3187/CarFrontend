import React, { useState } from "react";
import "./AddCar.css";

const AddCarPage = () => {
  const [carDetails, setCarDetails] = useState({
    name: "",
    model: "",
    price: "",
    images: [],
  });

  const [newImage, setNewImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setCarDetails({ ...carDetails, images: [...carDetails.images, newImage] });
      setNewImage("");
    }
  };

  const handleRemoveImage = (index) => {
    setCarDetails({
      ...carDetails,
      images: carDetails.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Car Details Submitted:", carDetails);
    alert("Car added successfully!");
    setCarDetails({
      name: "",
      model: "",
      price: "",
      images: [],
    });
  };

  return (
    <div className="add-car-container">
      <h1 className="form-header">Add New Car</h1>
      <form className="add-car-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Car Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={carDetails.name}
          onChange={handleInputChange}
          placeholder="Enter car name"
          required
        />

        <label htmlFor="model">Car Model</label>
        <input
          type="text"
          id="model"
          name="model"
          value={carDetails.model}
          onChange={handleInputChange}
          placeholder="Enter car model"
          required
        />

        <label htmlFor="price">Car Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={carDetails.price}
          onChange={handleInputChange}
          placeholder="Enter car price"
          required
        />

        <label htmlFor="image">Car Images</label>
        <div className="image-input-container">
          <input
            type="text"
            id="image"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="Enter image URL"
          />
          <button
            type="button"
            className="add-image-button"
            onClick={handleAddImage}
          >
            Add Image
          </button>
        </div>

        <div className="image-preview-container">
          {carDetails.images.map((img, index) => (
            <div key={index} className="image-preview">
              <img src={img} alt={`Car Image ${index + 1}`} />
              <button
                type="button"
                className="remove-image-button"
                onClick={() => handleRemoveImage(index)}
              >
                &#10005;
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCarPage;
