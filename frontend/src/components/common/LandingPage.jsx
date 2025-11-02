import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { APP_CONFIG } from '../../config/appConfig';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  // Redirect if already logged in
  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (role === APP_CONFIG.ROLES.ADMIN) {
        navigate(APP_CONFIG.ROUTES.ADMIN_DASHBOARD);
      } else if (role === APP_CONFIG.ROLES.DOCTOR) {
        navigate(APP_CONFIG.ROUTES.DOCTOR_DASHBOARD);
      } else if (role === APP_CONFIG.ROLES.PATIENT) {
        navigate(APP_CONFIG.ROUTES.PATIENT_DASHBOARD);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            🏥 Hospital Management System
          </Link>
          <div className="nav-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/help">Help</Link>
            {isAuthenticated ? (
              <button className="nav-btn" onClick={handleGetStarted}>
                Dashboard
              </button>
            ) : (
              <>
                <Link to="/login" className="nav-btn-link">Login</Link>
                <Link to="/register" className="nav-btn-register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            🏥 Hospital Management System
          </h1>
          <p className="hero-subtitle">
            Modern Healthcare Management Platform for Seamless Medical Services
          </p>
          <p className="hero-description">
            Empowering hospitals, doctors, and patients with efficient digital solutions
            for appointments, medical records, and healthcare administration.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <Link to="/register" className="btn-secondary">
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <h3>For Doctors</h3>
            <ul>
              <li>Manage appointments efficiently</li>
              <li>Access patient medical records</li>
              <li>Create digital prescriptions</li>
              <li>View consultation schedule</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>For Patients</h3>
            <ul>
              <li>Book appointments online</li>
              <li>Search available doctors</li>
              <li>View medical history</li>
              <li>Access prescriptions anytime</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>For Administrators</h3>
            <ul>
              <li>Manage doctors and patients</li>
              <li>Track appointments & billing</li>
              <li>Generate detailed reports</li>
              <li>Monitor hospital operations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <span className="benefit-icon">🔒</span>
            <h4>Secure & Private</h4>
            <p>Your data protected with enterprise-grade security</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">⚡</span>
            <h4>Fast & Reliable</h4>
            <p>Quick response times and 99.9% uptime</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">📱</span>
            <h4>Responsive Design</h4>
            <p>Works seamlessly on all devices</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🎯</span>
            <h4>Easy to Use</h4>
            <p>Intuitive interface for all users</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/help">Help Center</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
        <p>&copy; 2025 Hospital Management System. All rights reserved.</p>
        <p>Built with ❤️ for better healthcare</p>
      </footer>
    </div>
  );
};

export default LandingPage;
