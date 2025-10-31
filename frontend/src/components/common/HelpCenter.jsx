import React, { useState } from 'react';
import './HelpCenter.css';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = {
    general: [
      {
        id: 1,
        question: 'How do I create an account?',
        answer: 'Click on the "Register" button on the login page, fill in your details including name, email, password, and role. After successful registration, you can log in with your credentials.',
      },
      {
        id: 2,
        question: 'How do I reset my password?',
        answer: 'On the login page, click on "Forgot Password", enter your registered email address, and follow the instructions sent to your email to reset your password.',
      },
      {
        id: 3,
        question: 'Is my medical data secure?',
        answer: 'Yes, we use industry-standard encryption and security measures to protect your medical data. All data is encrypted both in transit and at rest.',
      },
    ],
    appointments: [
      {
        id: 4,
        question: 'How do I book an appointment?',
        answer: 'Navigate to "Book Appointment" from your dashboard, select a doctor, choose your preferred date and time slot, provide the reason for visit, and submit the form.',
      },
      {
        id: 5,
        question: 'Can I cancel or reschedule an appointment?',
        answer: 'Yes, go to "My Appointments", find the appointment you want to modify, and click on the cancel or reschedule button. Please note that cancellations should be made at least 24 hours in advance.',
      },
      {
        id: 6,
        question: 'How do I receive appointment reminders?',
        answer: 'Appointment reminders are automatically sent via email and SMS (if enabled in settings) 24 hours before your scheduled appointment.',
      },
    ],
    doctors: [
      {
        id: 7,
        question: 'How do I find a specialist doctor?',
        answer: 'Use the "Find Doctors" feature, where you can search by specialization, view doctor profiles, ratings, experience, and availability before booking.',
      },
      {
        id: 8,
        question: 'Can I view my doctor\'s availability?',
        answer: 'Yes, when booking an appointment, you can see the available time slots for each doctor. Doctors also manage their schedules which are updated in real-time.',
      },
    ],
    prescriptions: [
      {
        id: 9,
        question: 'How do I access my prescriptions?',
        answer: 'Go to "Medical Records" section and click on the "Prescriptions" tab to view all your past and current prescriptions.',
      },
      {
        id: 10,
        question: 'Can I download my prescription?',
        answer: 'Yes, each prescription has a "Download" button that allows you to save it as a PDF for your records or to share with pharmacies.',
      },
    ],
    billing: [
      {
        id: 11,
        question: 'How do I view my billing history?',
        answer: 'Navigate to the "Billing" section from your dashboard where you can view all your past invoices, payment history, and outstanding amounts.',
      },
      {
        id: 12,
        question: 'What payment methods are accepted?',
        answer: 'We accept credit/debit cards, net banking, UPI, and digital wallets. All payments are processed securely through our payment gateway.',
      },
    ],
  };

  const categories = [
    { id: 'general', name: 'General', icon: '❓' },
    { id: 'appointments', name: 'Appointments', icon: '📅' },
    { id: 'doctors', name: 'Doctors', icon: '👨‍⚕️' },
    { id: 'prescriptions', name: 'Prescriptions', icon: '💊' },
    { id: 'billing', name: 'Billing', icon: '💰' },
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const filteredFaqs = searchTerm
    ? Object.values(faqs)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : faqs[activeCategory] || [];

  return (
    <div className="help-center">
      <div className="help-header">
        <h1>❓ Help Center</h1>
        <p>Find answers to commonly asked questions</p>
      </div>

      <div className="search-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {!searchTerm && (
        <div className="categories-nav">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      )}

      <div className="faqs-container">
        {filteredFaqs.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <p>No results found for "{searchTerm}"</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${expandedFaq === faq.id ? 'expanded' : ''}`}
            >
              <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                <h3>{faq.question}</h3>
                <span className="expand-icon">
                  {expandedFaq === faq.id ? '−' : '+'}
                </span>
              </div>
              {expandedFaq === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="contact-support">
        <div className="support-card">
          <h2>📧 Still Need Help?</h2>
          <p>Can't find what you're looking for? Contact our support team</p>
          <div className="contact-options">
            <button className="contact-btn email">
              📧 Email Support
            </button>
            <button className="contact-btn phone">
              📞 Call Support
            </button>
            <button className="contact-btn chat">
              💬 Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
