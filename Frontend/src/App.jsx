import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; // import SignupPage
import Profile from './pages/profile';
import AddCar from './pages/AddCar';
import UpdateCar from './pages/Update';

// import './styles/global.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/addCar" element={<AddCar />} />
      <Route path="/updateCar/:carId" element={<UpdateCar />} />
      {/* <Route path="/car/:id" element={<CarDetailPage />} /> */}
    </Routes>
  );
};

export default App;
