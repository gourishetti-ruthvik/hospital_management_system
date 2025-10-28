import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    upcomingAppointments: 0,
    completedAppointments: 0,
    activePrescriptions: 0,
    pendingBills: 0,
  });
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulated data - will be replaced with API calls in Phase 3
      setTimeout(() => {
        setStats({
          upcomingAppointments: 2,
          completedAppointments: 5,
          activePrescriptions: 3,
          pendingBills: 1,
        });
        setAppointments([
          {
            id: 1,
            doctorName: 'Dr. Sarah Williams',
            specialty: 'Cardiologist',
            date: '2025-10-30',
            time: '10:00 AM',
            status: 'Scheduled',
          },
          {
            id: 2,
            doctorName: 'Dr. Michael Brown',
            specialty: 'General Physician',
            date: '2025-11-02',
            time: '02:30 PM',
            status: 'Scheduled',
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <div className="patient-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🏥 Patient Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">Welcome, {user?.firstName || 'Patient'}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Statistics Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{stats.upcomingAppointments}</h3>
              <p>Upcoming Appointments</p>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats.completedAppointments}</h3>
              <p>Completed Visits</p>
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-icon">💊</div>
            <div className="stat-info">
              <h3>{stats.activePrescriptions}</h3>
              <p>Active Prescriptions</p>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>{stats.pendingBills}</h3>
              <p>Pending Bills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card" onClick={() => navigate('/patient/book-appointment')}>
            <span className="action-icon">📅</span>
            <span className="action-text">Book Appointment</span>
          </button>

          <button className="action-card" onClick={() => navigate('/patient/doctors')}>
            <span className="action-icon">👨‍⚕️</span>
            <span className="action-text">Find Doctors</span>
          </button>

          <button className="action-card" onClick={() => navigate('/patient/prescriptions')}>
            <span className="action-icon">💊</span>
            <span className="action-text">My Prescriptions</span>
          </button>

          <button className="action-card" onClick={() => navigate('/patient/medical-records')}>
            <span className="action-icon">📋</span>
            <span className="action-text">Medical Records</span>
          </button>
        </div>
      </section>

      {/* Upcoming Appointments */}
      <section className="appointments-section">
        <h2>Upcoming Appointments</h2>
        <div className="appointments-list">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-header">
                  <h3>{appointment.doctorName}</h3>
                  <span className="status-badge">{appointment.status}</span>
                </div>
                <p className="specialty">{appointment.specialty}</p>
                <div className="appointment-details">
                  <span className="detail-item">
                    📅 {appointment.date}
                  </span>
                  <span className="detail-item">
                    🕐 {appointment.time}
                  </span>
                </div>
                <div className="appointment-actions">
                  <button className="btn-view">View Details</button>
                  <button className="btn-cancel">Cancel</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No upcoming appointments</p>
          )}
        </div>
      </section>

      {/* Health Tips */}
      <section className="tips-section">
        <h2>Health Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">💧</span>
            <p>Drink at least 8 glasses of water daily</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🏃</span>
            <p>Exercise for 30 minutes daily</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">😴</span>
            <p>Get 7-8 hours of sleep every night</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🥗</span>
            <p>Eat a balanced diet with fruits and vegetables</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;
