import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './features/home/Home';
import Login from './features/auth/Login';
import PatientDashboard from './features/dashboard/PatientDashboard';
import DoctorDashboard from './features/dashboard/DoctorDashboard';
import Register from './features/auth/Register';
import './App.css';
import ForgotPassword from './features/auth/ForgotPassword';
import { getUser } from './utilities/user-api';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

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
        <Route path="/" element={<Home user={user} setUser={setUser}/>} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/patient-dashboard" element={<PatientDashboard user={user}/>} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard user={user}/>} />
        <Route path="/register" element={<Register user={user}/>} />
        <Route path="/forgot-password" element={<ForgotPassword user={user}/>} />
      </Routes>
    </div>
  );
}

export default App;
