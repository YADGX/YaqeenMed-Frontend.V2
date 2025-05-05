import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './features/home/Home';
import Login from './features/auth/Login';
import PatientDashboard from './features/dashboard/PatientDashboard';
import DoctorDashboard from './features/dashboard/DoctorDashboard';
import Register from './features/auth/Register';
import './App.css';
import ForgotPassword from './features/auth/ForgotPassword';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      if (newMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      return newMode;
    });
  };

  return (
    <div>
      {/* <button onClick={toggleDarkMode} className="dark-mode-toggle">
        Toggle Dark Mode
      </button> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
