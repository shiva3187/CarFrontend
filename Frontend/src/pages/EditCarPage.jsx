import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCar } from '../context/CarContext';

const EditCarPage = () => {
  const { carId } = useParams();
  const { getCarById, updateCar } = useCar();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      const carData = await getCarById(carId);
      if (carData) {
        setCar(carData);
      }
    };
    fetchCarDetails();
  }, [carId, getCarById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCar(carId, car);
    navigate(`/car/${carId}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={car.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={car.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tags"
          value={car.tags.join(',')}
          onChange={handleChange}
        />
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default EditCarPage;
