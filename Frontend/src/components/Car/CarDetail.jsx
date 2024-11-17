import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCar } from '../../context/CarContext';

const CarDetail = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const { getCarDetails, deleteCar } = useCar();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      const carData = await getCarDetails(carId);
      setCar(carData);
    };

    fetchCarDetails();
  }, [carId, getCarDetails]);

  const handleDelete = async () => {
    await deleteCar(carId);
    navigate('/');
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div>
      <h2>{car.title}</h2>
      <p>{car.description}</p>
      <div>
        <h4>Tags:</h4>
        {car.tags.map((tag, idx) => (
          <span key={idx} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div>
        <h4>Images:</h4>
        {car.images.map((img, idx) => (
          <img key={idx} src={img} alt={`Car image ${idx + 1}`} />
        ))}
      </div>
      <button onClick={handleDelete}>Delete Car</button>
    </div>
  );
};

export default CarDetail;
