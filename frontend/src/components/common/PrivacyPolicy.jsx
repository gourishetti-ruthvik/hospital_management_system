import React, { useState } from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: '📋 Introduction', icon: '📋' },
    { id: 'information', title: '🔍 Information We Collect', icon: '🔍' },
    { id: 'usage', title: '💡 How We Use Your Information', icon: '💡' },
    { id: 'sharing', title: '🤝 Information Sharing', icon: '🤝' },
    { id: 'security', title: '🔒 Data Security', icon: '🔒' },
    { id: 'rights', title: '⚖️ Your Rights', icon: '⚖️' },
    { id: 'cookies', title: '🍪 Cookies Policy', icon: '🍪' },
    { id: 'changes', title: '📝 Policy Changes', icon: '📝' },
    { id: 'contact', title: '📞 Contact Us', icon: '📞' },
  ];

  const lastUpdated = 'November 2, 2025';

  return (
    <div className="privacy-policy-page">
      {/* Header */}
      <div className="privacy-header">
        <h1>🔐 Privacy Policy</h1>
        <p>Your privacy is important to us. Learn how we protect your information.</p>
        <div className="last-updated">Last Updated: {lastUpdated}</div>
      </div>

      <div className="privacy-container">
        {/* Navigation */}
        <div className="privacy-nav">
          <h3>Quick Navigation</h3>
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              {section.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="privacy-content">
          {/* Introduction */}
          {activeSection === 'introduction' && (
            <div className="content-section">
              <h2>📋 Introduction</h2>
              <p>
                Welcome to Hospital Management System. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our healthcare management platform.
              </p>
              <p>
                We are committed to protecting your privacy and ensuring the security of your personal 
                health information in compliance with HIPAA (Health Insurance Portability and Accountability Act) 
                and other applicable regulations.
              </p>
              <div className="highlight-box">
                <h4>🎯 Our Commitment</h4>
                <ul>
                  <li>Transparent data practices</li>
                  <li>Strong security measures</li>
                  <li>Compliance with healthcare regulations</li>
                  <li>User control over personal information</li>
                </ul>
              </div>
            </div>
          )}

          {/* Information We Collect */}
          {activeSection === 'information' && (
            <div className="content-section">
              <h2>🔍 Information We Collect</h2>
              
              <div className="info-category">
                <h3>Personal Information</h3>
                <ul>
                  <li><strong>Identity Data:</strong> Name, date of birth, gender, contact details</li>
                  <li><strong>Account Data:</strong> Username, password, email address</li>
                  <li><strong>Contact Data:</strong> Phone number, address, emergency contacts</li>
                </ul>
              </div>

              <div className="info-category">
                <h3>Health Information</h3>
                <ul>
                  <li><strong>Medical Records:</strong> Diagnoses, treatments, prescriptions</li>
                  <li><strong>Appointment Data:</strong> Scheduling, visit history, preferences</li>
                  <li><strong>Insurance Information:</strong> Coverage details, claims data</li>
                </ul>
              </div>

              <div className="info-category">
                <h3>Technical Data</h3>
                <ul>
                  <li><strong>Usage Data:</strong> How you interact with our platform</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                  <li><strong>Cookies:</strong> Session data, preferences, analytics</li>
                </ul>
              </div>
            </div>
          )}

          {/* How We Use Your Information */}
          {activeSection === 'usage' && (
            <div className="content-section">
              <h2>💡 How We Use Your Information</h2>
              
              <div className="usage-grid">
                <div className="usage-card">
                  <span className="usage-icon">🏥</span>
                  <h4>Healthcare Services</h4>
                  <p>Provide medical care, manage appointments, and maintain health records</p>
                </div>

                <div className="usage-card">
                  <span className="usage-icon">📊</span>
                  <h4>Service Improvement</h4>
                  <p>Analyze usage patterns to enhance platform features and user experience</p>
                </div>

                <div className="usage-card">
                  <span className="usage-icon">📧</span>
                  <h4>Communication</h4>
                  <p>Send appointment reminders, test results, and important notifications</p>
                </div>

                <div className="usage-card">
                  <span className="usage-icon">🔒</span>
                  <h4>Security & Fraud Prevention</h4>
                  <p>Protect accounts and detect unauthorized access or suspicious activity</p>
                </div>

                <div className="usage-card">
                  <span className="usage-icon">⚖️</span>
                  <h4>Legal Compliance</h4>
                  <p>Meet regulatory requirements and respond to legal requests</p>
                </div>

                <div className="usage-card">
                  <span className="usage-icon">📈</span>
                  <h4>Analytics & Research</h4>
                  <p>Conduct aggregated analysis for healthcare research and quality improvement</p>
                </div>
              </div>
            </div>
          )}

          {/* Information Sharing */}
          {activeSection === 'sharing' && (
            <div className="content-section">
              <h2>🤝 Information Sharing</h2>
              <p>We may share your information with:</p>

              <div className="sharing-list">
                <div className="sharing-item">
                  <h4>👨‍⚕️ Healthcare Providers</h4>
                  <p>Doctors, specialists, and medical staff involved in your care</p>
                </div>

                <div className="sharing-item">
                  <h4>🏢 Insurance Companies</h4>
                  <p>For billing, claims processing, and coverage verification</p>
                </div>

                <div className="sharing-item">
                  <h4>🔧 Service Providers</h4>
                  <p>Trusted third parties who assist in operating our platform</p>
                </div>

                <div className="sharing-item">
                  <h4>⚖️ Legal Authorities</h4>
                  <p>When required by law or to protect rights and safety</p>
                </div>
              </div>

              <div className="highlight-box warning">
                <h4>⚠️ Important Note</h4>
                <p>
                  We will never sell your personal health information. Any sharing is done strictly 
                  for legitimate healthcare, legal, or operational purposes with appropriate safeguards.
                </p>
              </div>
            </div>
          )}

          {/* Data Security */}
          {activeSection === 'security' && (
            <div className="content-section">
              <h2>🔒 Data Security</h2>
              <p>We implement comprehensive security measures to protect your information:</p>

              <div className="security-measures">
                <div className="security-card">
                  <span className="measure-icon">🔐</span>
                  <h4>Encryption</h4>
                  <p>End-to-end encryption for data in transit and at rest</p>
                </div>

                <div className="security-card">
                  <span className="measure-icon">🛡️</span>
                  <h4>Access Controls</h4>
                  <p>Role-based access with multi-factor authentication</p>
                </div>

                <div className="security-card">
                  <span className="measure-icon">📹</span>
                  <h4>Monitoring</h4>
                  <p>24/7 security monitoring and intrusion detection</p>
                </div>

                <div className="security-card">
                  <span className="measure-icon">🔄</span>
                  <h4>Regular Backups</h4>
                  <p>Automated backups with disaster recovery procedures</p>
                </div>

                <div className="security-card">
                  <span className="measure-icon">✅</span>
                  <h4>Compliance Audits</h4>
                  <p>Regular security assessments and HIPAA compliance checks</p>
                </div>

                <div className="security-card">
                  <span className="measure-icon">👥</span>
                  <h4>Staff Training</h4>
                  <p>Ongoing security awareness and privacy training</p>
                </div>
              </div>
            </div>
          )}

          {/* Your Rights */}
          {activeSection === 'rights' && (
            <div className="content-section">
              <h2>⚖️ Your Rights</h2>
              <p>You have the following rights regarding your personal information:</p>

              <div className="rights-list">
                <div className="right-item">
                  <span className="right-icon">👁️</span>
                  <div>
                    <h4>Right to Access</h4>
                    <p>Request copies of your personal and health information</p>
                  </div>
                </div>

                <div className="right-item">
                  <span className="right-icon">✏️</span>
                  <div>
                    <h4>Right to Correction</h4>
                    <p>Request corrections to inaccurate or incomplete information</p>
                  </div>
                </div>

                <div className="right-item">
                  <span className="right-icon">🗑️</span>
                  <div>
                    <h4>Right to Deletion</h4>
                    <p>Request deletion of your data (subject to legal requirements)</p>
                  </div>
                </div>

                <div className="right-item">
                  <span className="right-icon">🚫</span>
                  <div>
                    <h4>Right to Object</h4>
                    <p>Object to processing of your information for specific purposes</p>
                  </div>
                </div>

                <div className="right-item">
                  <span className="right-icon">📦</span>
                  <div>
                    <h4>Right to Portability</h4>
                    <p>Receive your data in a structured, machine-readable format</p>
                  </div>
                </div>

                <div className="right-item">
                  <span className="right-icon">⏸️</span>
                  <div>
                    <h4>Right to Restrict</h4>
                    <p>Request restriction of processing in certain circumstances</p>
                  </div>
                </div>
              </div>

              <div className="cta-box">
                <h4>Exercise Your Rights</h4>
                <p>To exercise any of these rights, contact our Privacy Officer</p>
                <button className="cta-button">Contact Privacy Officer</button>
              </div>
            </div>
          )}

          {/* Cookies Policy */}
          {activeSection === 'cookies' && (
            <div className="content-section">
              <h2>🍪 Cookies Policy</h2>
              <p>We use cookies and similar technologies to enhance your experience:</p>

              <div className="cookie-types">
                <div className="cookie-card">
                  <h4>✅ Essential Cookies</h4>
                  <p>Required for the platform to function properly. Cannot be disabled.</p>
                  <span className="badge required">Required</span>
                </div>

                <div className="cookie-card">
                  <h4>📊 Analytics Cookies</h4>
                  <p>Help us understand how users interact with our platform.</p>
                  <span className="badge optional">Optional</span>
                </div>

                <div className="cookie-card">
                  <h4>⚙️ Functional Cookies</h4>
                  <p>Remember your preferences and personalize your experience.</p>
                  <span className="badge optional">Optional</span>
                </div>
              </div>

              <div className="cookie-control">
                <h4>Cookie Preferences</h4>
                <p>You can manage your cookie preferences at any time through Settings</p>
                <button className="settings-button">Manage Cookie Settings</button>
              </div>
            </div>
          )}

          {/* Policy Changes */}
          {activeSection === 'changes' && (
            <div className="content-section">
              <h2>📝 Policy Changes</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or for legal, regulatory, or operational reasons.
              </p>

              <div className="changes-info">
                <div className="change-item">
                  <span className="change-icon">📢</span>
                  <div>
                    <h4>Notification</h4>
                    <p>We will notify you of significant changes via email or platform notification</p>
                  </div>
                </div>

                <div className="change-item">
                  <span className="change-icon">📅</span>
                  <div>
                    <h4>Effective Date</h4>
                    <p>Changes take effect 30 days after notification unless otherwise stated</p>
                  </div>
                </div>

                <div className="change-item">
                  <span className="change-icon">📜</span>
                  <div>
                    <h4>Version History</h4>
                    <p>Previous versions are archived and available upon request</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact */}
          {activeSection === 'contact' && (
            <div className="content-section">
              <h2>📞 Contact Us</h2>
              <p>If you have questions or concerns about this Privacy Policy:</p>

              <div className="contact-cards">
                <div className="contact-card">
                  <span className="contact-icon">👤</span>
                  <h4>Privacy Officer</h4>
                  <p>privacy@hospitalmgmt.com</p>
                  <p>+1 (555) 123-4567 ext. 100</p>
                </div>

                <div className="contact-card">
                  <span className="contact-icon">📧</span>
                  <h4>General Inquiries</h4>
                  <p>info@hospitalmgmt.com</p>
                  <p>Available Mon-Fri, 9 AM - 5 PM</p>
                </div>

                <div className="contact-card">
                  <span className="contact-icon">📍</span>
                  <h4>Mailing Address</h4>
                  <p>123 Healthcare Avenue</p>
                  <p>Medical District, City, State 12345</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="privacy-footer">
        <div className="footer-content">
          <h3>Questions About Your Privacy?</h3>
          <p>Our team is here to help. Contact us anytime for privacy-related concerns.</p>
          <button className="contact-btn">Contact Privacy Team</button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
