import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardLayout from '../../components/layout/DashboardLayout';
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
      console.log('Fetching dashboard data...');
      const patientService = (await import('../../services/patientService')).default;
      const appointmentsData = await patientService.getMyAppointments();
      
      console.log('Appointments data received:', appointmentsData);
      
      // Ensure appointmentsData is an array
      const appointments = Array.isArray(appointmentsData) ? appointmentsData : [];
      
      // Calculate stats from appointments
      const upcoming = appointments.filter(apt => 
        apt.status === 'SCHEDULED' || apt.status === 'CONFIRMED'
      ).length;
      const completed = appointments.filter(apt => apt.status === 'COMPLETED').length;
      
      setStats({
        upcomingAppointments: upcoming,
        completedAppointments: completed,
        activePrescriptions: 0, // Will be implemented with prescription API
        pendingBills: 0, // Will be implemented with billing API
      });
      
      // Format appointments for display
      const formattedAppointments = appointments
        .filter(apt => apt.status === 'SCHEDULED' || apt.status === 'CONFIRMED')
        .slice(0, 5)
        .map(apt => ({
          id: apt.id,
          doctorName: apt.doctor?.user?.fullName || 'Dr. ' + apt.doctor?.user?.username || 'Unknown Doctor',
          specialty: apt.doctor?.specialization || 'General',
          date: new Date(apt.appointmentDate).toISOString().split('T')[0],
          time: new Date(apt.appointmentDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          status: apt.status,
        }));
      
      setAppointments(formattedAppointments);
      console.log('Dashboard data loaded successfully');
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Don't throw error, just set empty data
      setStats({
        upcomingAppointments: 0,
        completedAppointments: 0,
        activePrescriptions: 0,
        pendingBills: 0,
      });
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading dashboard..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="patient-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🏥 Patient Dashboard</h1>
          <div className="header-actions">
            <div className="user-info">
              <div className="user-details">
                <span className="user-name">Welcome, {user?.fullName || user?.username || 'Patient'}</span>
                <span className="user-email">{user?.email}</span>
              </div>
            </div>
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

          <button className="action-card" onClick={() => navigate('/patient/find-doctors')}>
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
    </DashboardLayout>
  );
};

export default PatientDashboard;
