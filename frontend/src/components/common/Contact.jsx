import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated API call - will be replaced in Phase 3
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Message sent successfully! We will get back to you soon.' });
      setLoading(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Clear message after 5 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      details: ['123 Healthcare Avenue', 'Medical District', 'City, State 12345'],
    },
    {
      icon: '📞',
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    },
    {
      icon: '📧',
      title: 'Email',
      details: ['info@hospitalmgmt.com', 'support@hospitalmgmt.com'],
    },
    {
      icon: '🕐',
      title: 'Working Hours',
      details: ['Mon - Fri: 8:00 AM - 8:00 PM', 'Sat - Sun: 9:00 AM - 5:00 PM'],
    },
  ];

  const departments = [
    { icon: '🚑', name: 'Emergency', phone: '+1 (555) 911-0000' },
    { icon: '👨‍⚕️', name: 'Consultations', phone: '+1 (555) 123-4567' },
    { icon: '💊', name: 'Pharmacy', phone: '+1 (555) 246-8135' },
    { icon: '🔬', name: 'Laboratory', phone: '+1 (555) 369-2580' },
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <h1>📞 Contact Us</h1>
        <p>We're here to help! Reach out to us for any queries or support</p>
      </div>

      <div className="contact-container">
        {/* Contact Information */}
        <div className="contact-info-section">
          <h2>Get In Touch</h2>
          <p className="section-description">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="contact-cards">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Departments */}
          <div className="departments-section">
            <h3>Quick Contact - Departments</h3>
            <div className="departments-grid">
              {departments.map((dept, index) => (
                <div key={index} className="department-card">
                  <span className="dept-icon">{dept.icon}</span>
                  <div className="dept-info">
                    <h4>{dept.name}</h4>
                    <p>{dept.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="map-section">
            <h3>Find Us</h3>
            <div className="map-placeholder">
              <div className="map-icon">🗺️</div>
              <p>Interactive map will be integrated in Phase 3</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <div className="form-card">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we'll get back to you shortly</p>

            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select Subject --</option>
                  <option value="appointment">Appointment Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Type your message here..."
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? '⏳ Sending...' : '📤 Send Message'}
              </button>
            </form>
          </div>

          {/* Social Media */}
          <div className="social-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <button className="social-btn facebook">📘 Facebook</button>
              <button className="social-btn twitter">🐦 Twitter</button>
              <button className="social-btn instagram">📷 Instagram</button>
              <button className="social-btn linkedin">💼 LinkedIn</button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="emergency-banner">
        <div className="emergency-content">
          <span className="emergency-icon">🚨</span>
          <div>
            <h3>Medical Emergency?</h3>
            <p>Call our 24/7 emergency hotline immediately</p>
          </div>
          <button className="emergency-btn">📞 Call 911</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
