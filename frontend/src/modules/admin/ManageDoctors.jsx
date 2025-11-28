import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { API_ENDPOINTS } from '../../config/apiConfig';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardLayout from '../../components/layout/DashboardLayout';
import './ManageUsers.css';

const ManageDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${API_ENDPOINTS.ADMIN.DOCTORS}/users/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error loading doctors:', error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (userId) => {
    try {
      setActionLoading(userId);
      await apiClient.put(`${API_ENDPOINTS.ADMIN.DOCTORS}/users/${userId}/activate`);
      loadDoctors();
      alert('Doctor activated successfully!');
    } catch (error) {
      console.error('Error activating doctor:', error);
      alert('Failed to activate doctor');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeactivate = async (userId) => {
    if (!window.confirm('Are you sure you want to deactivate this doctor?')) return;
    
    try {
      setActionLoading(userId);
      await apiClient.put(`${API_ENDPOINTS.ADMIN.DOCTORS}/users/${userId}/deactivate`);
      loadDoctors();
      alert('Doctor deactivated successfully!');
    } catch (error) {
      console.error('Error deactivating doctor:', error);
      alert('Failed to deactivate doctor');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this doctor? This action cannot be undone.')) return;
    
    try {
      setActionLoading(userId);
      await apiClient.delete(`${API_ENDPOINTS.ADMIN.DOCTORS}/users/${userId}`);
      loadDoctors();
      alert('Doctor deleted successfully!');
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert(error.response?.data?.message || 'Failed to delete doctor');
    } finally {
      setActionLoading(null);
    }
  };

  const handleResetPassword = async (userId) => {
    const newPassword = prompt('Enter new password (minimum 6 characters):');
    if (!newPassword || newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    try {
      setActionLoading(userId);
      await apiClient.put(`${API_ENDPOINTS.ADMIN.DOCTORS}/users/${userId}/reset-password`, {
        newPassword
      });
      alert('Password reset successfully!');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading doctors..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="manage-users-container">
      <div className="page-header">
        <div>
          <h1>👨‍⚕️ Manage Doctors</h1>
          <p>Control doctor accounts and permissions</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="users-count">
        <p>Total Doctors: <strong>{doctors.length}</strong></p>
        <p>Active: <strong>{doctors.filter(d => d.active).length}</strong></p>
        <p>Inactive: <strong>{doctors.filter(d => !d.active).length}</strong></p>
      </div>

      <div className="users-table">
        {doctors.length === 0 ? (
          <div className="empty-state">
            <p>No doctors found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.username}</td>
                  <td>{doctor.fullName}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phoneNumber}</td>
                  <td>
                    <span className={`status-badge ${doctor.active ? 'active' : 'inactive'}`}>
                      {doctor.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {doctor.active ? (
                        <button
                          className="btn-warning"
                          onClick={() => handleDeactivate(doctor.id)}
                          disabled={actionLoading === doctor.id}
                        >
                          🚫 Deactivate
                        </button>
                      ) : (
                        <button
                          className="btn-success"
                          onClick={() => handleActivate(doctor.id)}
                          disabled={actionLoading === doctor.id}
                        >
                          ✅ Activate
                        </button>
                      )}
                      <button
                        className="btn-info"
                        onClick={() => handleResetPassword(doctor.id)}
                        disabled={actionLoading === doctor.id}
                      >
                        🔑 Reset Password
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(doctor.id)}
                        disabled={actionLoading === doctor.id}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default ManageDoctors;
