import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="public-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🏥 Hospital Management System
        </Link>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/help">Help</Link>
          <Link to="/login" className="nav-btn-link">Login</Link>
          <Link to="/register" className="nav-btn-register">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
