import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import sendRequest from '../../utilities/sendRequest';  // Import the sendRequest function
import { Check, Close } from '@mui/icons-material';  // Import Material-UI icons
import './DoctorDashboard.css';

function DoctorDashboard({ user }) {
  const [patientRequests, setPatientRequests] = useState([]); // To store patient requests
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    // Fetch pending patient requests when the component mounts
    const fetchPatientRequests = async () => {
      try {
        const data = await sendRequest('/patient-requests/', 'GET'); // Fetch patient requests from the backend
        setPatientRequests(data);  // Update the state with fetched data
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
  const handleAccept = async (requestId) => {
    try {
      const response = await sendRequest(`/patient-requests/${requestId}/action/`, 'POST', { action: 'accept' });
      console.log(`URL being sent: /patient-requests/${requestId}/action/`);
      console.log('Request accepted', response);
      fetchPatientRequests();  // Re-fetch requests after action
    } catch (error) {
      console.error('Error accepting request', error);
    }
  };
  
  const handleDecline = async (requestId) => {
    try {
      const response = await sendRequest(`/patient-requests/${requestId}/action/`, 'POST', { action: 'decline' });
      console.log(`URL being sent: /patient-requests/${requestId}/action/`);
      console.log('Request declined', response);
      fetchPatientRequests();  // Re-fetch requests after action
    } catch (error) {
      console.error('Error declining request', error);
    }
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
                  <td>{request.summary_comment}</td>
                  <td>
                    {/* Accept Button with Material-UI Check Icon */}
                    <button 
                      onClick={() => handleAccept(request.id)} 
                      className="accept-btn" 
                      style={{ color: 'green', fontSize: '24px', border: 'none', background: 'none' }}
                    >
                      <Check />
                    </button>
                    {/* Decline Button with Material-UI Close Icon */}
                    <button 
                      onClick={() => handleDecline(request.id)} 
                      className="decline-btn" 
                      style={{ color: 'red', fontSize: '24px', border: 'none', background: 'none' }}
                    >
                      <Close />
                    </button>
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
