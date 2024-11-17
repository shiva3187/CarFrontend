import React, { useState } from 'react';
import { useCar } from '../../context/CarContext';

const CarForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const { createCar } = useCar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCar({ title, description, tags, images });
    setTitle('');
    setDescription('');
    setTags([]);
    setImages([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value.split(','))}
      />
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setImages([...e.target.files])}
      />
      <button type="submit">Add Car</button>
    </form>
  );
};

export default CarForm;
