import React, { useState } from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  const [activeTab, setActiveTab] = useState('terms');

  const lastUpdated = 'November 2, 2025';
  const effectiveDate = 'January 1, 2025';

  return (
    <div className="terms-page">
      {/* Header */}
      <div className="terms-header">
        <h1>📜 Terms of Service</h1>
        <p>Please read these terms carefully before using our platform</p>
        <div className="date-info">
          <span>Last Updated: {lastUpdated}</span>
          <span className="separator">|</span>
          <span>Effective: {effectiveDate}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="terms-tabs">
        <button
          className={`tab ${activeTab === 'terms' ? 'active' : ''}`}
          onClick={() => setActiveTab('terms')}
        >
          📋 Terms of Service
        </button>
        <button
          className={`tab ${activeTab === 'user' ? 'active' : ''}`}
          onClick={() => setActiveTab('user')}
        >
          👤 User Agreement
        </button>
        <button
          className={`tab ${activeTab === 'disclaimer' ? 'active' : ''}`}
          onClick={() => setActiveTab('disclaimer')}
        >
          ⚠️ Disclaimer
        </button>
      </div>

      <div className="terms-container">
        {/* Terms of Service Content */}
        {activeTab === 'terms' && (
          <div className="terms-content">
            <section className="term-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Hospital Management System platform, you agree to be bound 
                by these Terms of Service and all applicable laws and regulations. If you do not agree 
                with any of these terms, you are prohibited from using this platform.
              </p>
              <div className="important-note">
                <span className="note-icon">💡</span>
                <p>Your continued use of the platform constitutes acceptance of these terms and any updates.</p>
              </div>
            </section>

            <section className="term-section">
              <h2>2. User Accounts</h2>
              <h3>Account Registration</h3>
              <ul>
                <li>You must provide accurate and complete information during registration</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must be at least 18 years old to create an account</li>
                <li>One person or entity may maintain only one active account</li>
              </ul>

              <h3>Account Security</h3>
              <ul>
                <li>You are responsible for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use or security breach</li>
                <li>We reserve the right to terminate accounts that violate these terms</li>
              </ul>
            </section>

            <section className="term-section">
              <h2>3. Platform Usage</h2>
              <h3>Permitted Use</h3>
              <p>You may use our platform to:</p>
              <ul>
                <li>Schedule and manage medical appointments</li>
                <li>Access and manage your medical records</li>
                <li>Communicate with healthcare providers</li>
                <li>Receive prescriptions and test results</li>
              </ul>

              <h3>Prohibited Activities</h3>
              <div className="prohibited-box">
                <p>You agree NOT to:</p>
                <ul>
                  <li>Use the platform for any unlawful purpose</li>
                  <li>Impersonate another person or entity</li>
                  <li>Upload malicious code, viruses, or harmful content</li>
                  <li>Attempt to gain unauthorized access to the system</li>
                  <li>Share your account credentials with others</li>
                  <li>Use automated systems to access the platform</li>
                  <li>Interfere with or disrupt the platform's functionality</li>
                </ul>
              </div>
            </section>

            <section className="term-section">
              <h2>4. Medical Information Disclaimer</h2>
              <div className="disclaimer-box">
                <span className="warning-icon">⚠️</span>
                <div>
                  <h3>Important Medical Notice</h3>
                  <p>
                    This platform is designed to facilitate healthcare management but does not replace 
                    professional medical advice, diagnosis, or treatment. Always seek the advice of 
                    qualified healthcare providers with questions regarding medical conditions.
                  </p>
                </div>
              </div>

              <h3>Emergency Situations</h3>
              <p>
                In case of a medical emergency, call emergency services (911) immediately. 
                Do not rely on this platform for emergency medical assistance.
              </p>
            </section>

            <section className="term-section">
              <h2>5. Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Our collection, use, and disclosure of your personal 
                and health information is governed by our Privacy Policy, which is incorporated into 
                these Terms by reference.
              </p>
              <ul>
                <li>We comply with HIPAA and applicable data protection regulations</li>
                <li>Your medical data is encrypted and stored securely</li>
                <li>We do not sell your personal health information</li>
                <li>You have rights regarding your data (access, correction, deletion)</li>
              </ul>
            </section>

            <section className="term-section">
              <h2>6. Intellectual Property</h2>
              <h3>Platform Content</h3>
              <p>
                All content, features, and functionality of the platform, including but not limited to 
                text, graphics, logos, icons, images, and software, are owned by Hospital Management 
                System and protected by copyright and trademark laws.
              </p>

              <h3>User Content</h3>
              <p>
                By uploading or submitting content to the platform, you grant us a license to use, 
                store, and display such content solely for the purpose of providing our services.
              </p>
            </section>

            <section className="term-section">
              <h2>7. Payment Terms</h2>
              <ul>
                <li>Fees for services are clearly displayed before confirmation</li>
                <li>Payment is required at the time of service unless otherwise arranged</li>
                <li>We accept major credit cards and insurance payments</li>
                <li>Refunds are subject to our Refund Policy</li>
                <li>You are responsible for any applicable taxes</li>
              </ul>
            </section>

            <section className="term-section">
              <h2>8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Hospital Management System shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages resulting from:
              </p>
              <ul>
                <li>Your use or inability to use the platform</li>
                <li>Unauthorized access to your data</li>
                <li>Errors, mistakes, or inaccuracies in content</li>
                <li>System downtime or interruptions</li>
              </ul>
            </section>

            <section className="term-section">
              <h2>9. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of 
                significant changes via email or platform notification. Your continued use of the 
                platform after such modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            <section className="term-section">
              <h2>10. Termination</h2>
              <p>We may terminate or suspend your account immediately, without prior notice, for:</p>
              <ul>
                <li>Violation of these Terms of Service</li>
                <li>Fraudulent or illegal activities</li>
                <li>Prolonged inactivity</li>
                <li>Request from law enforcement</li>
              </ul>
              <p>
                Upon termination, your right to use the platform will cease immediately. You may 
                request a copy of your medical records before account closure.
              </p>
            </section>

            <section className="term-section">
              <h2>11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the 
                jurisdiction in which our organization is registered, without regard to conflict of law provisions.
              </p>
            </section>

            <section className="term-section">
              <h2>12. Contact Information</h2>
              <p>For questions about these Terms of Service, please contact us:</p>
              <div className="contact-info">
                <div className="contact-item">
                  <span>📧 Email:</span>
                  <strong>legal@hospitalmgmt.com</strong>
                </div>
                <div className="contact-item">
                  <span>📞 Phone:</span>
                  <strong>+1 (555) 123-4567 ext. 200</strong>
                </div>
                <div className="contact-item">
                  <span>📍 Address:</span>
                  <strong>123 Healthcare Avenue, Medical District, City, State 12345</strong>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* User Agreement */}
        {activeTab === 'user' && (
          <div className="terms-content">
            <section className="term-section">
              <h2>User Rights and Responsibilities</h2>
              <p>
                As a user of the Hospital Management System, you have certain rights and responsibilities 
                that ensure a safe and effective healthcare experience for all.
              </p>
            </section>

            <section className="term-section">
              <h2>Your Rights</h2>
              <div className="rights-grid">
                <div className="right-card">
                  <span className="card-icon">🏥</span>
                  <h3>Healthcare Access</h3>
                  <p>Right to access quality healthcare services through our platform</p>
                </div>
                <div className="right-card">
                  <span className="card-icon">🔒</span>
                  <h3>Privacy</h3>
                  <p>Right to privacy and confidentiality of your medical information</p>
                </div>
                <div className="right-card">
                  <span className="card-icon">📋</span>
                  <h3>Information</h3>
                  <p>Right to receive clear information about services and costs</p>
                </div>
                <div className="right-card">
                  <span className="card-icon">✅</span>
                  <h3>Choice</h3>
                  <p>Right to choose your healthcare providers and treatment options</p>
                </div>
              </div>
            </section>

            <section className="term-section">
              <h2>Your Responsibilities</h2>
              <div className="responsibilities-list">
                <div className="responsibility-item">
                  <span className="resp-number">1</span>
                  <div>
                    <h3>Accurate Information</h3>
                    <p>Provide complete and accurate medical history and personal information</p>
                  </div>
                </div>
                <div className="responsibility-item">
                  <span className="resp-number">2</span>
                  <div>
                    <h3>Respectful Behavior</h3>
                    <p>Treat healthcare providers and staff with respect and courtesy</p>
                  </div>
                </div>
                <div className="responsibility-item">
                  <span className="resp-number">3</span>
                  <div>
                    <h3>Timely Communication</h3>
                    <p>Communicate promptly and inform providers of any changes</p>
                  </div>
                </div>
                <div className="responsibility-item">
                  <span className="resp-number">4</span>
                  <div>
                    <h3>Financial Obligations</h3>
                    <p>Fulfill payment obligations for services received</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="term-section">
              <h2>Appointment Guidelines</h2>
              <ul>
                <li>Arrive on time for scheduled appointments</li>
                <li>Cancel or reschedule at least 24 hours in advance when possible</li>
                <li>Prepare questions and concerns before appointments</li>
                <li>Follow through with prescribed treatments and follow-ups</li>
              </ul>
            </section>

            <section className="term-section">
              <h2>Communication Standards</h2>
              <p>When communicating through our platform:</p>
              <ul>
                <li>Use clear and professional language</li>
                <li>Respond to messages in a timely manner</li>
                <li>Keep communications relevant to healthcare matters</li>
                <li>Report any technical issues or concerns promptly</li>
              </ul>
            </section>
          </div>
        )}

        {/* Disclaimer */}
        {activeTab === 'disclaimer' && (
          <div className="terms-content">
            <section className="term-section">
              <div className="warning-banner">
                <span className="banner-icon">⚠️</span>
                <h2>Important Disclaimers</h2>
                <p>Please read these disclaimers carefully. They limit our liability and define the scope of our services.</p>
              </div>
            </section>

            <section className="term-section">
              <h2>Medical Services Disclaimer</h2>
              <div className="disclaimer-card">
                <h3>Not a Substitute for Professional Care</h3>
                <p>
                  The Hospital Management System platform is a management tool and does not provide 
                  medical advice, diagnosis, or treatment. Always consult with qualified healthcare 
                  professionals for medical decisions.
                </p>
              </div>

              <div className="disclaimer-card">
                <h3>Emergency Situations</h3>
                <p>
                  This platform is NOT for emergencies. If you are experiencing a medical emergency, 
                  call 911 or go to the nearest emergency room immediately.
                </p>
              </div>

              <div className="disclaimer-card">
                <h3>Information Accuracy</h3>
                <p>
                  While we strive for accuracy, we do not guarantee that all information on the platform 
                  is complete, accurate, or up-to-date. Medical information may change rapidly.
                </p>
              </div>
            </section>

            <section className="term-section">
              <h2>Technology Disclaimer</h2>
              <ul>
                <li><strong>System Availability:</strong> We do not guarantee uninterrupted access to the platform</li>
                <li><strong>Data Loss:</strong> We are not liable for data loss due to technical issues</li>
                <li><strong>Third-Party Services:</strong> We are not responsible for third-party service failures</li>
                <li><strong>Browser Compatibility:</strong> Platform may not work on all browsers or devices</li>
              </ul>
            </section>

            <section className="term-section">
              <h2>Financial Disclaimer</h2>
              <div className="disclaimer-card">
                <h3>Insurance Coverage</h3>
                <p>
                  Displayed costs are estimates. Actual charges may vary based on insurance coverage, 
                  services rendered, and other factors. Verify coverage with your insurance provider.
                </p>
              </div>

              <div className="disclaimer-card">
                <h3>Billing Disputes</h3>
                <p>
                  While we make every effort to ensure accurate billing, errors may occur. Contact our 
                  billing department immediately if you believe there is an error.
                </p>
              </div>
            </section>

            <section className="term-section">
              <h2>Content Disclaimer</h2>
              <p>
                Educational content, blog posts, and health information provided on the platform are for 
                general informational purposes only and should not be considered medical advice.
              </p>
            </section>

            <section className="term-section">
              <h2>External Links Disclaimer</h2>
              <p>
                Our platform may contain links to external websites. We are not responsible for the 
                content, privacy practices, or availability of external sites.
              </p>
            </section>

            <section className="term-section">
              <h2>No Warranty</h2>
              <div className="no-warranty-box">
                <p>
                  THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                  EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
                  FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="terms-footer">
        <h3>Have Questions About Our Terms?</h3>
        <p>Our legal team is available to clarify any concerns you may have</p>
        <button className="footer-cta-btn">Contact Legal Team</button>
      </div>
    </div>
  );
};

export default TermsOfService;
