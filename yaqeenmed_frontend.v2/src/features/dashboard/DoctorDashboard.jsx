import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import './DoctorDashboard.css';

function DoctorDashboard({user}) {
  const [patientRequests, setPatientRequests] = useState([]); // To store patient requests
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    const fetchPatientRequests = async () => {
      try {
        const data = await getAllPatientRequests(); // Fetch the patient requests from the backend
        setPatientRequests(data);
      } catch (error) {
        console.error('Error fetching patient requests', error);
      }
    };

    fetchPatientRequests();

    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    document.body.classList.toggle('dark-mode', savedMode);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.body.classList.toggle('dark-mode', newMode);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/'); // Redirect to login page
  };

  // Handle Accept action
  const handleAccept = (requestId) => {
    console.log('Accept request', requestId);
    // You can send an API request here to update the request status to 'Accepted'
  };

  // Handle Decline action
  const handleDecline = (requestId) => {
    console.log('Decline request', requestId);
    // You can send an API request here to update the request status to 'Declined'
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
              src="https://i.pravatar.cc/150?img=3"
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
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="dashboard-main">
        <h2>Patient Requests</h2>
        <div className="requests-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Summary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.title}</td>
                  <td>{request.summary}</td>
                  <td>
                    <button onClick={() => handleAccept(request.id)} className="accept-btn">✔️</button>
                    <button onClick={() => handleDecline(request.id)} className="decline-btn">❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="dashboard-footer">
        &copy; {new Date().getFullYear()} YaqeenMed. All rights reserved.
      </footer>
    </div>
  );
}

export default DoctorDashboard;
