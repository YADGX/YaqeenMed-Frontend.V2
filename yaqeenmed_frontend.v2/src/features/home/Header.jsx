import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ toggleDarkMode, darkMode }) {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src="/path/to/logo.png" alt="YaqeenMed Logo" className="logo" />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
      </nav>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}

export default Header;
