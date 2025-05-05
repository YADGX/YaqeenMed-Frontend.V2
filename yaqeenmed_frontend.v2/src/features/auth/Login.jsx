import React, { useState } from 'react';
import axios from '../../utilities/axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to authenticate the user
      const response = await axios.post('http://localhost:8000/api/token/', { username, password });

      // Store the tokens in local storage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      alert('Login successful!');

      // Redirect based on user role (if available)
      const userRole = response.data.role; // Example: Get the user role from the response

      if (userRole === 'patient') {
        navigate('/patient-dashboard');  // Navigate to the patient dashboard
      } else if (userRole === 'doctor') {
        navigate('/doctor-dashboard');  // Navigate to the doctor dashboard
      } else {
        // Default case if role is not set or unexpected
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="center-wrapper">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            className="login-input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="register-link">Don't have an account? <Link to="/register">Register here</Link></p>
        <p className="forgot-password-link"><Link to="/forgot-password">Forgot Password?</Link></p> {/* Forgot password link */}
      </div>
    </div>
  );
}

export default Login;
