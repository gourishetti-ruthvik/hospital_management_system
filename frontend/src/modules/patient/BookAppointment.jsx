import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './BookAppointment.css';

const BookAppointment = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = () => {
    // Simulated data - will be replaced with API call in Phase 3
    setDoctors([
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialization: 'Cardiologist',
        available: true,
      },
      {
        id: 2,
        name: 'Dr. Michael Brown',
        specialization: 'Dermatologist',
        available: true,
      },
      {
        id: 3,
        name: 'Dr. Emily Davis',
        specialization: 'Pediatrician',
        available: false,
      },
      {
        id: 4,
        name: 'Dr. James Wilson',
        specialization: 'Orthopedic',
        available: true,
      },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.doctorId || !formData.date || !formData.time || !formData.reason) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      return;
    }

    setLoading(true);
    
    // Simulated API call - will be replaced in Phase 3
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Appointment booked successfully!' });
      setLoading(false);
      
      // Reset form
      setFormData({
        doctorId: '',
        date: '',
        time: '',
        reason: '',
      });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }, 1000);
  };

  const availableDoctors = doctors.filter(doc => doc.available);

  return (
    <div className="book-appointment">
      <div className="page-header">
        <h1>📅 Book Appointment</h1>
        <p>Schedule an appointment with your preferred doctor</p>
      </div>

      <div className="appointment-container">
        <div className="doctors-list">
          <h2>Available Doctors</h2>
          <div className="doctors-grid">
            {availableDoctors.map(doctor => (
              <div
                key={doctor.id}
                className={`doctor-card ${formData.doctorId === doctor.id.toString() ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, doctorId: doctor.id.toString() }))}
              >
                <div className="doctor-icon">👨‍⚕️</div>
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialization}</p>
                  <span className="availability-badge">
                    ✅ Available
                  </span>
                </div>
              </div>
            ))}
          </div>
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
                    {doctor.name} - {doctor.specialization}
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
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select time --</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>

            <div className="form-group">
              <label>Reason for Visit *</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe your symptoms or reason for consultation..."
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '⏳ Booking...' : '📅 Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
