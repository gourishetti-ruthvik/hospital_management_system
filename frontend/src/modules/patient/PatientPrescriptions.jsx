import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { API_ENDPOINTS } from '../../config/apiConfig';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardLayout from '../../components/layout/DashboardLayout';
import './PatientPrescriptions.css';

const PatientPrescriptions = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, inactive

  useEffect(() => {
    fetchPrescriptions();
  }, [filter]);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const endpoint = filter === 'active' 
        ? API_ENDPOINTS.PATIENT.PRESCRIPTIONS_ACTIVE 
        : API_ENDPOINTS.PATIENT.PRESCRIPTIONS;
      
      const response = await apiClient.get(endpoint);
      let data = response.data;
      
      if (filter === 'inactive') {
        data = data.filter(p => !p.active);
      }
      
      setPrescriptions(data);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (prescription) => {
    const now = new Date();
    const endDate = prescription.endDate ? new Date(prescription.endDate) : null;
    
    if (!prescription.active) {
      return <span className="status-badge inactive">Inactive</span>;
    } else if (endDate && endDate < now) {
      return <span className="status-badge expired">Expired</span>;
    } else {
      return <span className="status-badge active">Active</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading prescriptions..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="prescriptions-container">
      <div className="prescriptions-header">
        <h1>💊 My Prescriptions</h1>
        <button className="back-btn" onClick={() => navigate('/patient/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Prescriptions
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
            onClick={() => setFilter('inactive')}
          >
            Inactive
          </button>
        </div>
      </div>

      <div className="prescriptions-grid">
        {prescriptions.length === 0 ? (
          <div className="empty-state">
            <p>📋 No prescriptions found</p>
            <p className="empty-subtitle">Your prescriptions will appear here once prescribed by a doctor</p>
          </div>
        ) : (
          prescriptions.map((prescription) => (
            <div key={prescription.id} className="prescription-card">
              <div className="prescription-header">
                <h3>{prescription.medicationName}</h3>
                {getStatusBadge(prescription)}
              </div>
              
              <div className="prescription-details">
                <div className="detail-row">
                  <span className="label">Dosage:</span>
                  <span className="value">{prescription.dosage}</span>
                </div>
                
                <div className="detail-row">
                  <span className="label">Frequency:</span>
                  <span className="value">{prescription.frequency || 'As directed'}</span>
                </div>
                
                <div className="detail-row">
                  <span className="label">Start Date:</span>
                  <span className="value">{formatDate(prescription.startDate)}</span>
                </div>
                
                {prescription.endDate && (
                  <div className="detail-row">
                    <span className="label">End Date:</span>
                    <span className="value">{formatDate(prescription.endDate)}</span>
                  </div>
                )}
                
                <div className="detail-row">
                  <span className="label">Prescribed By:</span>
                  <span className="value">
                    Dr. {prescription.doctor?.user?.fullName || prescription.doctor?.user?.username || 'Unknown'}
                  </span>
                </div>
                
                {prescription.refills !== undefined && (
                  <div className="detail-row">
                    <span className="label">Refills:</span>
                    <span className="value">{prescription.refills}</span>
                  </div>
                )}
              </div>
              
              {prescription.instructions && (
                <div className="prescription-instructions">
                  <strong>Instructions:</strong>
                  <p>{prescription.instructions}</p>
                </div>
              )}
              
              {prescription.precautions && (
                <div className="prescription-precautions">
                  <strong>⚠️ Precautions:</strong>
                  <p>{prescription.precautions}</p>
                </div>
              )}
              
              {prescription.notes && (
                <div className="prescription-notes">
                  <strong>Notes:</strong>
                  <p>{prescription.notes}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default PatientPrescriptions;
