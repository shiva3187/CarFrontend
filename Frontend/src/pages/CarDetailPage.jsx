import React from 'react';
import { useParams } from 'react-router-dom';
import './CarDetailPage.css';

const CarDetailPage = () => {
  const { id } = useParams(); // Get the car ID from the URL
  
  // Dummy data for cars (you'll replace this with actual data from your backend)
  const cars = [
    {
      id: 1,
      name: 'Toyota Corolla',
      model: '2020',
      price: 20000,
      imageUrl: 'https://via.placeholder.com/400',
      description: 'A reliable and fuel-efficient sedan.',
    },
    {
      id: 2,
      name: 'Honda Civic',
      model: '2021',
      price: 22000,
      imageUrl: 'https://via.placeholder.com/400',
      description: 'A sporty and stylish compact car.',
    },
    {
      id: 3,
      name: 'Ford Mustang',
      model: '2022',
      price: 35000,
      imageUrl: 'https://via.placeholder.com/400',
      description: 'An iconic muscle car with great performance.',
    },
  ];

  // Find the car by ID
  const car = cars.find(car => car.id === parseInt(id));

  if (!car) {
    return <p>Car not found.</p>;
  }

  return (
    <div className="car-detail-container">
      <h1 className="car-name">{car.name}</h1>
      <img src={car.imageUrl} alt={car.name} className="car-image" />
      <p className="car-model">Model: {car.model}</p>
      <p className="car-price">Price: ${car.price}</p>
      <p className="car-description">{car.description}</p>
      <button className="back-button" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default CarDetailPage;
