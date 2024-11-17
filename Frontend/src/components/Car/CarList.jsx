import React from 'react';
import { Link } from 'react-router-dom';
import { useCar } from '../../context/CarContext';
import './Car.css';
const CarList = () => {
  const { cars } = useCar();

  return (
    <div>
      <h2>Your Cars</h2>
      {cars.map((car) => (
        <Link to={`/cars/${car._id}`} key={car._id}>
          <div className="car-item">
            <h3>{car.title}</h3>
            <p>{car.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CarList;
