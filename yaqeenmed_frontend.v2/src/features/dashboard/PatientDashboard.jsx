// src/pages/PatientDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../utilities/axios';
import './PatientDashboard.css';
import { FaMoon, FaSun } from 'react-icons/fa';

function PatientDashboard() {
  const [patientData, setPatientData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('patients/');
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data', error);
      }
    };

    fetchData();

    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    document.body.classList.toggle('dark-mode', savedMode);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.body.classList.toggle('dark-mode', newMode);
  };

  return (
    <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <header className="dashboard-header">
        <button className="hamburger" onClick={toggleSidebar}>☰</button>
        <h1 className="app-name">YaqeenMed</h1>
        <div className="header-right">
          <button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            style={{ backgroundColor: '#3c4e69' }}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <div className="profile-button">
            <img
              src="https://i.pravatar.cc/150?img=3" // Replace with dynamic profile image
              alt="Profile"
              className="profile-pic"
            />
          </div>
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul>
          <li>Dashboard</li>
          <li>Documents</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <button className="post-request-btn">Post Request +</button>
        <h2 className="dashboard-title">Your Info</h2>
        <ul className="dashboard-list">
          {patientData.map((patient) => (
            <li className="dashboard-card" key={patient.id}>
              <strong>{patient.user.username}</strong> - {patient.age} years old
            </li>
          ))}
        </ul>
      </main>

      <footer className="dashboard-footer">
        &copy; {new Date().getFullYear()} YaqeenMed. All rights reserved.
      </footer>
    </div>
  );
}

export default PatientDashboard;
