import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; 
import { registerUser, checkEmailUnique } from '../../utilities/auth-api'; // Import API functions
import Navbar from '../../components/Navbar/Navbar'; // Import Navbar component
import './Register.css';
import * as userAPI from '../../utilities/user-api'; // Import user API functions

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); // Default role is 'patient'
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const navigate = useNavigate(); // Use navigation hook

  // Username and password validation
  // const validateUsername = (username) => {
  //   const usernameRegex = /^[A-Za-z]{3,}$/; // Only letters, minimum 3 characters
  //   if (!usernameRegex.test(username)) {
  //     return 'Username must be at least 3 characters long and only contain letters.';
  //   }
  //   return '';
  // };

  // const validatePassword = (password) => {
  //   const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  //   if (!passwordRegex.test(password)) {
  //     return 'Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one symbol.';
  //   }
  //   return '';
  // };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  // Check if the email is unique by calling the API
  const handleEmailCheck = async (email) => {
    try {
      const error = await checkEmailUnique(email);
      if (error) {
        return 'Email is already registered.';
      }
      return '';
    } catch (error) {
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    // const usernameError = validateUsername(username);
    // const passwordError = validatePassword(password);
    // const emailError = validateEmail(email);
    // const emailUniqueError = await handleEmailCheck(email);

    // If any validation fails, set errors and return
    // if (usernameError || passwordError || emailError) {
    //   setErrors({
    //     username: usernameError,
    //     email: emailError,
    //     password: passwordError,
    //   });
    //   return;
    // }

    try {
      // Make a POST request to register the user using API utility
      const user = await userAPI.signup({ username, email, password, role });
      // Successful registration

      // Redirect to role-specific dashboard
      navigate('/')
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));  // Persist mode in localStorage
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="register-container">
      <Navbar /> {/* Include Navbar here */}
      
      <h2>Register</h2>
      
      {/* Dark mode toggle button */}
      <div className="toggle-container" onClick={toggleDarkMode}>
        <FaSun className={`icon sun ${darkMode ? 'hide' : ''}`} />
        <FaMoon className={`icon moon ${darkMode ? '' : 'hide'}`} />
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ borderColor: errors.username ? 'red' : '' }}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>

        <div className="input-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ borderColor: errors.email ? 'red' : '' }}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="input-container password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ borderColor: errors.password ? 'red' : '' }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="eye-icon"
          >
            <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} />
          </span>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        {/* Role Selection */}
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="patient" default>Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        
        <button type="submit">Register</button>
      </form> 
    </div>
  );
}

export default Register;
