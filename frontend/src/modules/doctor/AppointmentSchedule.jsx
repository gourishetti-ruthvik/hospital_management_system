import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AppointmentSchedule.css';

const AppointmentSchedule = () => {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [formData, setFormData] = useState({
    date: '',
    timeSlots: [],
    maxPatientsPerSlot: 5,
  });

  useEffect(() => {
    loadSchedule();
  }, [selectedDate]);

  const loadSchedule = () => {
    // Simulated data - will be replaced with API call in Phase 3
    setSchedule([
      {
        id: 1,
        date: '2024-01-15',
        timeSlot: '09:00 AM - 10:00 AM',
        bookedSlots: 3,
        totalSlots: 5,
        status: 'Available',
      },
      {
        id: 2,
        date: '2024-01-15',
        timeSlot: '10:00 AM - 11:00 AM',
        bookedSlots: 5,
        totalSlots: 5,
        status: 'Full',
      },
      {
        id: 3,
        date: '2024-01-15',
        timeSlot: '11:00 AM - 12:00 PM',
        bookedSlots: 2,
        totalSlots: 5,
        status: 'Available',
      },
      {
        id: 4,
        date: '2024-01-15',
        timeSlot: '02:00 PM - 03:00 PM',
        bookedSlots: 4,
        totalSlots: 5,
        status: 'Available',
      },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSlotToggle = (timeSlot) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(timeSlot)
        ? prev.timeSlots.filter(slot => slot !== timeSlot)
        : [...prev.timeSlots, timeSlot],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.date || formData.timeSlots.length === 0) {
      alert('Please select date and at least one time slot');
      return;
    }

    console.log('Schedule created:', formData);
    // API call will be added in Phase 3
    
    setShowForm(false);
    setFormData({
      date: '',
      timeSlots: [],
      maxPatientsPerSlot: 5,
    });
    loadSchedule();
  };

  const timeSlotOptions = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
  ];

  const getStatusClass = (status) => {
    return status === 'Available' ? 'available' : 'full';
  };

  return (
    <div className="appointment-schedule">
      <div className="page-header">
        <div>
          <h1>📅 My Schedule</h1>
          <p>Manage your availability and time slots</p>
        </div>
        <button className="btn-new" onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancel' : '➕ Add Availability'}
        </button>
      </div>

      {showForm && (
        <div className="schedule-form-card">
          <h2>Set Availability</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
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
                <label>Max Patients per Slot *</label>
                <input
                  type="number"
                  name="maxPatientsPerSlot"
                  value={formData.maxPatientsPerSlot}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Select Time Slots *</label>
              <div className="time-slots-grid">
                {timeSlotOptions.map(slot => (
                  <div
                    key={slot}
                    className={`time-slot-option ${formData.timeSlots.includes(slot) ? 'selected' : ''}`}
                    onClick={() => handleTimeSlotToggle(slot)}
                  >
                    <span className="slot-icon">🕐</span>
                    <span className="slot-time">{slot}</span>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-submit">
              💾 Save Availability
            </button>
          </form>
        </div>
      )}

      <div className="schedule-filter">
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-filter"
        />
      </div>

      <div className="schedule-list">
        <h2>Schedule for {selectedDate}</h2>
        
        {schedule.length === 0 ? (
          <div className="empty-state">
            <p>📋 No schedule found for this date</p>
            <button className="btn-add" onClick={() => setShowForm(true)}>
              ➕ Add Availability
            </button>
          </div>
        ) : (
          <div className="schedule-grid">
            {schedule.map(item => (
              <div key={item.id} className={`schedule-card ${getStatusClass(item.status)}`}>
                <div className="schedule-header">
                  <span className="time-icon">🕐</span>
                  <h3>{item.timeSlot}</h3>
                </div>
                
                <div className="schedule-body">
                  <div className="slots-info">
                    <div className="slots-bar">
                      <div
                        className="slots-filled"
                        style={{ width: `${(item.bookedSlots / item.totalSlots) * 100}%` }}
                      />
                    </div>
                    <div className="slots-text">
                      <span className="booked">{item.bookedSlots} Booked</span>
                      <span className="total">/ {item.totalSlots} Total</span>
                    </div>
                  </div>
                  
                  <div className="status-badge">
                    {item.status === 'Available' ? '✅ Available' : '🔴 Full'}
                  </div>
                </div>
                
                <div className="schedule-actions">
                  <button className="btn-view" onClick={() => console.log('View appointments:', item.id)}>
                    👁️ View Appointments
                  </button>
                  <button className="btn-edit" onClick={() => console.log('Edit slot:', item.id)}>
                    ✏️ Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentSchedule;
