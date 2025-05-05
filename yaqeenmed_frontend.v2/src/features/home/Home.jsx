import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utilities/axios';
import './Home.css';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/token/', { username, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      alert('Login successful!');
      navigate('/patient-dashboard');  // Redirect to patient dashboard after successful login
    } catch (error) {
      console.error('Error logging in', error);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to YaqeenMed</h1>
      <p>Your health, your choice.</p>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          className="home-input"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="home-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="home-button">Login</button>
      </form>

      {/* Forgot Password link */}
      <div className="forgot-password">
        <Link to="/forgot-password" className="home-link">Forgot Password?</Link>
      </div>

      {/* Register link */}
      <div className="home-links">
        <Link to="/register" className="home-link">Register</Link>
      </div>
    </div>
  );
}

export default Home;
