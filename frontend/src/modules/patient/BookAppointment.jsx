import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import patientService from '../../services/patientService';
import DashboardLayout from '../../components/layout/DashboardLayout';
import './BookAppointment.css';

const BookAppointment = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    symptoms: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    setLoadingDoctors(true);
    try {
      const response = await patientService.getAllDoctors();
      setDoctors(response);
    } catch (error) {
      console.error('Error loading doctors:', error);
      setMessage({ type: 'error', text: 'Failed to load doctors. Please try again.' });
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.doctorId || !formData.date || !formData.time || !formData.reason) {
      setMessage({ type: 'error', text: 'Please fill all required fields' });
      return;
    }

    setLoading(true);
    
    try {
      // Combine date and time into a single DateTime
      const appointmentDateTime = new Date(`${formData.date}T${formData.time}`);
      
      const appointmentData = {
        doctorId: parseInt(formData.doctorId),
        appointmentDate: appointmentDateTime.toISOString(),
        reasonForVisit: formData.reason,
        symptoms: formData.symptoms || '',
        durationMinutes: 30,
      };
      
      await patientService.bookAppointment(appointmentData);
      setMessage({ type: 'success', text: 'Appointment booked successfully!' });
      
      // Reset form
      setFormData({
        doctorId: '',
        date: '',
        time: '',
        reason: '',
        symptoms: '',
      });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to book appointment. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const availableDoctors = doctors.filter(doc => doc.available);

  return (
    <DashboardLayout>
      <div className="book-appointment">
      <div className="page-header">
        <div>
          <h1>📅 Book Appointment</h1>
          <p>Schedule an appointment with your preferred doctor</p>
        </div>
        <button 
          className="back-btn" 
          onClick={() => window.history.back()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
      </div>

      <div className="appointment-container">
        <div className="doctors-list">
          <h2>Available Doctors</h2>
          {loadingDoctors ? (
            <p>Loading doctors...</p>
          ) : availableDoctors.length === 0 ? (
            <p>No doctors available at the moment.</p>
          ) : (
            <div className="doctors-grid">
              {availableDoctors.map(doctor => (
                <div
                  key={doctor.id}
                  className={`doctor-card ${formData.doctorId === doctor.id.toString() ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, doctorId: doctor.id.toString() }))}
                >
                  <div className="doctor-icon">👨‍⚕️</div>
                  <div className="doctor-info">
                    <h3>Dr. {doctor.fullName || 'Unknown'}</h3>
                    <p>{doctor.specialization}</p>
                    <p className="fee">Fee: ₹{doctor.consultationFee}</p>
                    <span className="availability-badge">
                      ✅ Available
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="booking-form">
          <h2>Appointment Details</h2>
          
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Select Doctor *</label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Choose a doctor --</option>
                {availableDoctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.fullName || 'Unknown'} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Appointment Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Time *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Reason for Visit *</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows="3"
                placeholder="Describe the reason for consultation..."
                required
              />
            </div>

            <div className="form-group">
              <label>Symptoms</label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                rows="3"
                placeholder="Describe your symptoms (optional)..."
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '⏳ Booking...' : '📅 Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default BookAppointment;
