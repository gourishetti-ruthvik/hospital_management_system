import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS } from '../../config/apiConfig';
import apiClient from '../../services/apiClient';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardLayout from '../../components/layout/DashboardLayout';
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

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.APPOINTMENTS.DOCTOR);
      const appointments = Array.isArray(response.data) ? response.data : [];
      
      const today = getTodayDate();
      const todayAppts = appointments.filter(apt => 
        apt.appointmentDate?.split('T')[0] === today
      );
      
      setStats({
        todayAppointments: todayAppts.length,
        totalPatients: new Set(appointments.map(apt => apt.patient?.id)).size,
        pendingConsultations: appointments.filter(apt => 
          apt.status === 'PENDING' || apt.status === 'SCHEDULED'
        ).length,
        completedToday: todayAppts.filter(apt => apt.status === 'COMPLETED').length,
      });

      // Get today's appointments sorted by time
      const upcomingToday = todayAppts
        .sort((a, b) => a.appointmentTime?.localeCompare(b.appointmentTime))
        .slice(0, 5)
        .map(apt => ({
          id: apt.id,
          patientName: apt.patient?.user?.fullName || apt.patient?.user?.username || 'Unknown',
          time: formatTime(apt.appointmentTime),
          type: apt.reason || 'Consultation',
          status: apt.status,
        }));

      setUpcomingAppointments(upcomingToday);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats({
        todayAppointments: 0,
        totalPatients: 0,
        pendingConsultations: 0,
        completedToday: 0,
      });
      setUpcomingAppointments([]);
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
      <div className="doctor-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>👨‍⚕️ Doctor Dashboard</h1>
          <div className="header-actions">
            <div className="user-info">
              <div className="user-details">
                <span className="user-name">Dr. {user?.fullName || user?.username || 'Doctor'}</span>
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
    </DashboardLayout>
  );
};

export default DoctorDashboard;
