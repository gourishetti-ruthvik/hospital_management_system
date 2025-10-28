import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalPatients: 0,
    pendingConsultations: 0,
    completedToday: 0,
  });
  const [loading, setLoading] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulated data - will be replaced with API calls in Phase 3
      setTimeout(() => {
        setStats({
          todayAppointments: 8,
          totalPatients: 45,
          pendingConsultations: 3,
          completedToday: 5,
        });
        setUpcomingAppointments([
          {
            id: 1,
            patientName: 'John Doe',
            time: '10:00 AM',
            type: 'Consultation',
            status: 'Scheduled',
          },
          {
            id: 2,
            patientName: 'Jane Smith',
            time: '11:30 AM',
            type: 'Follow-up',
            status: 'Scheduled',
          },
          {
            id: 3,
            patientName: 'Robert Johnson',
            time: '02:00 PM',
            type: 'Consultation',
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
    <div className="doctor-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>👨‍⚕️ Doctor Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">Dr. {user?.firstName || 'Doctor'}</span>
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
              <h3>{stats.todayAppointments}</h3>
              <p>Today's Appointments</p>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">🏥</div>
            <div className="stat-info">
              <h3>{stats.totalPatients}</h3>
              <p>Total Patients</p>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <h3>{stats.pendingConsultations}</h3>
              <p>Pending Consultations</p>
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats.completedToday}</h3>
              <p>Completed Today</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card" onClick={() => navigate('/doctor/appointments')}>
            <span className="action-icon">📅</span>
            <span className="action-text">My Appointments</span>
          </button>

          <button className="action-card" onClick={() => navigate('/doctor/patients')}>
            <span className="action-icon">🏥</span>
            <span className="action-text">My Patients</span>
          </button>

          <button className="action-card" onClick={() => navigate('/doctor/prescriptions')}>
            <span className="action-icon">💊</span>
            <span className="action-text">Prescriptions</span>
          </button>

          <button className="action-card" onClick={() => navigate('/doctor/schedule')}>
            <span className="action-icon">🕐</span>
            <span className="action-text">My Schedule</span>
          </button>
        </div>
      </section>

      {/* Upcoming Appointments */}
      <section className="appointments-section">
        <h2>Today's Appointments</h2>
        <div className="appointments-table">
          {upcomingAppointments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Patient Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.time}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.type}</td>
                    <td>
                      <span className="status-badge scheduled">{appointment.status}</span>
                    </td>
                    <td>
                      <button className="action-btn">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No appointments scheduled for today</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboard;
