import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import * as userAPI from '../../utilities/user-api'; // Import user API functions

function Login({setUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userAPI.login({ username, password });
 
      setUser(response.user)

      if (response.access && response.refresh && response.role) {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);

        alert('Login successful!');

        const userRole = response.role;  

        if (userRole === 'patient') {
          navigate('/patient-dashboard'); 
        } else if (userRole === 'doctor') {
          navigate('/doctor-dashboard'); // Navigate to doctor dashboard
        } else {
          navigate('/');  // Redirect to the home page or another appropriate page
        }
      } else {
        alert('Invalid response from the server.');
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
        <p className="forgot-password-link"><Link to="/forgot-password">Forgot Password?</Link></p>
      </div>
    </div>
  );
}

export default Login;
