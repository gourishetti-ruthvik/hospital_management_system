import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS } from '../../config/apiConfig';
import apiClient from '../../services/apiClient';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardLayout from '../../components/layout/DashboardLayout';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalUsers: 0,
    activeDoctors: 0,
    activePatients: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${API_ENDPOINTS.ADMIN.DASHBOARD}`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        totalDoctors: 0,
        totalPatients: 0,
        totalAppointments: 0,
        totalUsers: 0,
        activeDoctors: 0,
        activePatients: 0,
      });
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
      <div className="admin-dashboard">
        {/* Header */}
        <header className="dashboard-header">
        <div className="header-content">
          <h1>🏥 Admin Dashboard</h1>
          <div className="header-actions">
            <div className="user-info">
              <div className="user-details">
                <span className="user-name">Welcome, {user?.fullName || user?.username || 'Admin'}</span>
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
            <div className="stat-icon">👨‍⚕️</div>
            <div className="stat-info">
              <h3>{stats.totalDoctors}</h3>
              <p>Total Doctors</p>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">🏥</div>
            <div className="stat-info">
              <h3>{stats.totalPatients}</h3>
              <p>Total Patients</p>
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>{stats.totalAppointments}</h3>
              <p>Total Appointments</p>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <h3>{stats.pendingAppointments}</h3>
              <p>Pending Appointments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-card" onClick={() => navigate('/admin/doctors')}>
            <span className="action-icon">👨‍⚕️</span>
            <span className="action-text">Manage Doctors</span>
          </button>

          <button className="action-card" onClick={() => navigate('/admin/patients')}>
            <span className="action-icon">🏥</span>
            <span className="action-text">Manage Patients</span>
          </button>

          <button className="action-card" onClick={() => navigate('/admin/appointments')}>
            <span className="action-icon">📅</span>
            <span className="action-text">View Appointments</span>
          </button>

          <button className="action-card" onClick={() => navigate('/admin/reports')}>
            <span className="action-icon">📊</span>
            <span className="action-text">Generate Reports</span>
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="activity-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">👨‍⚕️</span>
            <div className="activity-details">
              <p><strong>Dr. John Smith</strong> registered</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-icon">📅</span>
            <div className="activity-details">
              <p><strong>New appointment</strong> scheduled</p>
              <span className="activity-time">3 hours ago</span>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-icon">🏥</span>
            <div className="activity-details">
              <p><strong>Patient Sarah Johnson</strong> registered</p>
              <span className="activity-time">5 hours ago</span>
            </div>
          </div>
        </div>
      </section>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
