import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Help Center', path: '/help' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  const services = [
    { name: 'Book Appointment', path: '/patient/appointments/book' },
    { name: 'Find Doctors', path: '/patient/doctors' },
    { name: 'Medical Records', path: '/patient/records' },
    { name: 'Emergency Services', path: '/emergency' },
  ];

  const specializations = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'General Medicine',
  ];

  return (
    <footer className="app-footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section">
          <h3>🏥 Hospital Management System</h3>
          <p>
            Providing comprehensive healthcare management solutions with cutting-edge technology. 
            Your health, our priority.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="icon">📞</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <span className="icon">📧</span>
              <span>info@hospitalmgmt.com</span>
            </div>
            <div className="contact-item">
              <span className="icon">📍</span>
              <span>123 Healthcare Ave, Medical District</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4>Services</h4>
          <ul className="footer-links">
            {services.map((service, index) => (
              <li key={index}>
                <Link to={service.path}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Specializations */}
        <div className="footer-section">
          <h4>Specializations</h4>
          <ul className="footer-links">
            {specializations.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h4>Stay Updated</h4>
          <p className="newsletter-text">
            Subscribe to our newsletter for health tips and updates
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook">📘</a>
            <a href="#twitter" aria-label="Twitter">🐦</a>
            <a href="#instagram" aria-label="Instagram">📷</a>
            <a href="#linkedin" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="emergency-strip">
        <span className="emergency-icon">🚨</span>
        <span>For Medical Emergencies, Call: </span>
        <strong>+1 (555) 911-0000</strong>
        <span className="emergency-status">🟢 Available 24/7</span>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © {currentYear} Hospital Management System. All rights reserved.
        </p>
        <div className="footer-meta">
          <Link to="/terms">Terms of Service</Link>
          <span className="separator">•</span>
          <Link to="/privacy">Privacy Policy</Link>
          <span className="separator">•</span>
          <Link to="/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
