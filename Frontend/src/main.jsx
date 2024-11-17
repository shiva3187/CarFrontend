import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/AuthContext'; // Ensure correct import paths
import CarProvider from './context/CarContext'; // Ensure correct import paths
import "./index.css";

// Check for root element before rendering
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found. Ensure there's an element with id 'root' in your HTML.");
}

// Create root for React 18
const root = ReactDOM.createRoot(rootElement);

// Render the app with providers
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarProvider>
          <App />
        </CarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
