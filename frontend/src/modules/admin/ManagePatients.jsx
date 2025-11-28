import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { API_ENDPOINTS } from '../../config/apiConfig';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardLayout from '../../components/layout/DashboardLayout';
import './ManageUsers.css';

const ManagePatients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${API_ENDPOINTS.ADMIN.PATIENTS}/users/patients`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error loading patients:', error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (userId) => {
    try {
      setActionLoading(userId);
      await apiClient.put(`${API_ENDPOINTS.ADMIN.PATIENTS}/users/${userId}/activate`);
      loadPatients();
      alert('Patient activated successfully!');
    } catch (error) {
      console.error('Error activating patient:', error);
      alert('Failed to activate patient');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeactivate = async (userId) => {
    if (!window.confirm('Are you sure you want to deactivate this patient?')) return;
    
    try {
      setActionLoading(userId);
      await apiClient.put(`${API_ENDPOINTS.ADMIN.PATIENTS}/users/${userId}/deactivate`);
      loadPatients();
      alert('Patient deactivated successfully!');
    } catch (error) {
      console.error('Error deactivating patient:', error);
      alert('Failed to deactivate patient');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this patient? This action cannot be undone.')) return;
    
    try {
      setActionLoading(userId);
      await apiClient.delete(`${API_ENDPOINTS.ADMIN.PATIENTS}/users/${userId}`);
      loadPatients();
      alert('Patient deleted successfully!');
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert(error.response?.data?.message || 'Failed to delete patient');
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
      await apiClient.put(`${API_ENDPOINTS.ADMIN.PATIENTS}/users/${userId}/reset-password`, {
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
        <LoadingSpinner message="Loading patients..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="manage-users-container">
      <div className="page-header">
        <div>
          <h1>🏥 Manage Patients</h1>
          <p>Control patient accounts and permissions</p>
        </div>
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="users-count">
        <p>Total Patients: <strong>{patients.length}</strong></p>
        <p>Active: <strong>{patients.filter(p => p.active).length}</strong></p>
        <p>Inactive: <strong>{patients.filter(p => !p.active).length}</strong></p>
      </div>

      <div className="users-table">
        {patients.length === 0 ? (
          <div className="empty-state">
            <p>No patients found</p>
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
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.username}</td>
                  <td>{patient.fullName}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phoneNumber}</td>
                  <td>
                    <span className={`status-badge ${patient.active ? 'active' : 'inactive'}`}>
                      {patient.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {patient.active ? (
                        <button
                          className="btn-warning"
                          onClick={() => handleDeactivate(patient.id)}
                          disabled={actionLoading === patient.id}
                        >
                          🚫 Deactivate
                        </button>
                      ) : (
                        <button
                          className="btn-success"
                          onClick={() => handleActivate(patient.id)}
                          disabled={actionLoading === patient.id}
                        >
                          ✅ Activate
                        </button>
                      )}
                      <button
                        className="btn-info"
                        onClick={() => handleResetPassword(patient.id)}
                        disabled={actionLoading === patient.id}
                      >
                        🔑 Reset Password
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(patient.id)}
                        disabled={actionLoading === patient.id}
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

export default ManagePatients;
