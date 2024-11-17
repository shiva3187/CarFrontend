import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./CarCard.css";

const CarCard = ({ car }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === car.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="car-card">
      <div className="image-slider">
        <img
          src={car.images[currentIndex]}
          alt={`Car ${car.name}`}
          className="car-image"
        />
        <button className="slider-button prev" onClick={handlePrev}>
          <FaChevronLeft />
        </button>
        <button className="slider-button next" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>
      <div className="car-details">
        <h3>{car.name}</h3>
        <p>{car.description}</p>
        <p>Price: ${car.price}</p>
      </div>
    </div>
  );
};

export default CarCard;
