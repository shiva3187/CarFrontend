import api from './api';

export const fetchCarsService = async () => {
  const response = await api.get('/cars');
  return response.data.cars;
};

export const createCarService = async (car) => {
  const formData = new FormData();
  car.images.forEach((image) => formData.append('images', image));
  formData.append('title', car.title);
  formData.append('description', car.description);
  formData.append('tags', JSON.stringify(car.tags));

  const response = await api.post('/cars', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.car;
};

export const searchCarsService = async (keyword) => {
  const response = await api.get(`/cars/search?keyword=${keyword}`);
  return response.data.cars;
};

export const getCarDetailsService = async (id) => {
  const response = await api.get(`/cars/${id}`);
  return response.data.car;
};

export const updateCarService = async (id, car) => {
  const formData = new FormData();
  car.images.forEach((image) => formData.append('images', image));
  formData.append('title', car.title);
  formData.append('description', car.description);
  formData.append('tags', JSON.stringify(car.tags));

  const response = await api.put(`/cars/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.car;
};

export const deleteCarService = async (id) => {
  await api.delete(`/cars/${id}`);
};
