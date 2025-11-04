import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = ({ errorCode = '404', message = 'Page Not Found' }) => {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-content">
        <div className="error-icon">🔍</div>
        <h1 className="error-code">{errorCode}</h1>
        <h2 className="error-message">{message}</h2>
        <p className="error-description">
          {errorCode === '404'
            ? "The page you're looking for doesn't exist or has been moved."
            : 'Something went wrong. Please try again later.'}
        </p>

        <div className="error-actions">
          <button className="btn-primary" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
          <Link to="/" className="btn-secondary">
            🏠 Home
          </Link>
          <Link to="/contact" className="btn-tertiary">
            📞 Contact Support
          </Link>
        </div>

        <div className="helpful-links">
          <h3>Helpful Links</h3>
          <div className="links-grid">
            <Link to="/about">About Us</Link>
            <Link to="/help">Help Center</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
