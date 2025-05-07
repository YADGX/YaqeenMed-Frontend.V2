import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext'; // 👈 import context
import './Navbar.css';

function Navbar() {
  const { darkMode, setDarkMode } = useDarkMode(); // 👈 use context

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">YaqeenMed</Link>
      <ul className="nav-links">
        {/* <li><Link to="/register">Register</Link></li> */}
        <li><Link to="/">Login</Link></li>
        {/* Add other links here if needed */}
      </ul>
      {/* <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        <i className={`fa ${darkMode ? 'fa-sun' : 'fa-moon'}`} />
      </div> */}
    </nav>
  );
}

export default Navbar;
