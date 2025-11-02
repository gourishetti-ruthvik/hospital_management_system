import React from 'react';
import './About.css';

const About = () => {
  const features = [
    {
      icon: '👨‍⚕️',
      title: 'Expert Doctors',
      description: 'Access to highly qualified doctors across multiple specializations',
    },
    {
      icon: '📅',
      title: 'Easy Appointments',
      description: 'Book appointments online 24/7 with instant confirmation',
    },
    {
      icon: '💊',
      title: 'Digital Prescriptions',
      description: 'Get digital prescriptions and access them anytime, anywhere',
    },
    {
      icon: '📋',
      title: 'Medical Records',
      description: 'Secure storage of all your medical history and reports',
    },
    {
      icon: '🔒',
      title: 'Data Security',
      description: 'Your health data is encrypted and securely stored',
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your queries',
    },
  ];

  const stats = [
    { value: '500+', label: 'Doctors' },
    { value: '10,000+', label: 'Patients' },
    { value: '50+', label: 'Specializations' },
    { value: '99%', label: 'Satisfaction' },
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      specialty: 'Cardiology',
      image: '👩‍⚕️',
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Director of Operations',
      specialty: 'Neurology',
      image: '👨‍⚕️',
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Head of Pediatrics',
      specialty: 'Pediatrics',
      image: '👩‍⚕️',
    },
    {
      name: 'Dr. James Wilson',
      role: 'Senior Consultant',
      specialty: 'Orthopedics',
      image: '👨‍⚕️',
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-content">
          <h1>🏥 About Hospital Management System</h1>
          <p className="hero-subtitle">
            Transforming Healthcare Through Digital Innovation
          </p>
          <p className="hero-description">
            We are committed to making quality healthcare accessible to everyone through 
            our comprehensive digital platform that connects patients with expert doctors 
            and provides seamless healthcare management.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="mission-vision-section">
        <div className="mission-vision-grid">
          <div className="mission-card">
            <div className="card-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>
              To revolutionize healthcare delivery by leveraging technology to create 
              a seamless, efficient, and patient-centric healthcare ecosystem that 
              empowers both patients and healthcare providers.
            </p>
          </div>
          <div className="vision-card">
            <div className="card-icon">🔭</div>
            <h2>Our Vision</h2>
            <p>
              To become the leading digital healthcare platform, setting new standards 
              in patient care, medical excellence, and healthcare accessibility while 
              maintaining the highest levels of security and privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose Us</h2>
        <p className="section-subtitle">
          Experience healthcare like never before with our comprehensive features
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2>Meet Our Leadership Team</h2>
        <p className="section-subtitle">
          Experienced professionals dedicated to your healthcare
        </p>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">{member.image}</div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-specialty">{member.specialty}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <span className="value-icon">🤝</span>
            <h3>Trust</h3>
            <p>Building lasting relationships through transparency and reliability</p>
          </div>
          <div className="value-card">
            <span className="value-icon">⭐</span>
            <h3>Excellence</h3>
            <p>Committed to the highest standards in healthcare delivery</p>
          </div>
          <div className="value-card">
            <span className="value-icon">❤️</span>
            <h3>Compassion</h3>
            <p>Treating every patient with empathy and care</p>
          </div>
          <div className="value-card">
            <span className="value-icon">🚀</span>
            <h3>Innovation</h3>
            <p>Embracing technology to improve healthcare outcomes</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience Better Healthcare?</h2>
          <p>Join thousands of satisfied patients and healthcare providers</p>
          <div className="cta-buttons">
            <button className="btn-primary">📅 Book Appointment</button>
            <button className="btn-secondary">📞 Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
