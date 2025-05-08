import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import * as userAPI from '../../utilities/user-api'; // Import user API functions
import Logo from '../../assets/Logo3.png'; // Assuming the logo is stored in the "assets" folder

function Home({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await userAPI.login({ username, password });
      console.log(response.user);
      setUser(response.user); // Save user data in state

      alert('Login successful!');

      const userRole = response.user.role; // Check the role of the user
      if (userRole === 'patient') {
        navigate('/patient-dashboard'); // Navigate to patient dashboard
      } else if (userRole === 'doctor') {
        navigate('/doctor-dashboard'); // Navigate to doctor dashboard
      } else {
        navigate('/patient-dashboard'); // Default to patient dashboard if role is unknown
      }
    } catch (error) {
      console.error('Error logging in', error);
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="home-container">
      <div className="logo-container">
        <h1>Welcome to YaqeenMed</h1>
        <img src={Logo} alt="YaqeenMed Logo" className="home-logo" />
      </div>
      
      <p>Your health, your choice.</p>

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

      <div className="forgot-password">
        <Link to="/forgot-password" className="home-link">Forgot Password?</Link>
      </div>
      <div className="home-links">
        <Link to="/register" className="home-link">Register</Link>
      </div>
    </div>
  );
}

export default Home;
