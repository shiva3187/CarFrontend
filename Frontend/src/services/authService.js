import api from './api';

export const loginService = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signupService = async (name, email, password) => {
  const response = await api.post('/auth/signup', { name, email, password });
  return response.data;
};

export const logoutService = () => {
  localStorage.removeItem('token');
};
