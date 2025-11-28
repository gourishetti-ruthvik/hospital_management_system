import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { API_ENDPOINTS } from '../../config/apiConfig';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardLayout from '../../components/layout/DashboardLayout';
import './PatientRecords.css';

const PatientRecords = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.PATIENT.MEDICAL_RECORDS);
      setRecords(response.data);
    } catch (error) {
      console.error('Error loading medical records:', error);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = filter === 'all' 
    ? records 
    : records.filter(r => r.recordType === filter);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getRecordTypeIcon = (type) => {
    switch(type?.toUpperCase()) {
      case 'CHECKUP': return '🩺';
      case 'LAB_RESULT': return '🔬';
      case 'RADIOLOGY': return '📷';
      case 'SURGERY': return '🏥';
      case 'VACCINATION': return '💉';
      default: return '📋';
    }
  };

  const getRecordTypeColor = (type) => {
    switch(type?.toUpperCase()) {
      case 'CHECKUP': return '#28a745';
      case 'LAB_RESULT': return '#17a2b8';
      case 'RADIOLOGY': return '#6f42c1';
      case 'SURGERY': return '#dc3545';
      case 'VACCINATION': return '#ffc107';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading medical records..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="medical-records-container">
      <div className="records-header">
        <h1>📋 Medical Records</h1>
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
            All Records
          </button>
          <button 
            className={`filter-btn ${filter === 'CHECKUP' ? 'active' : ''}`}
            onClick={() => setFilter('CHECKUP')}
          >
            Checkups
          </button>
          <button 
            className={`filter-btn ${filter === 'LAB_RESULT' ? 'active' : ''}`}
            onClick={() => setFilter('LAB_RESULT')}
          >
            Lab Results
          </button>
          <button 
            className={`filter-btn ${filter === 'RADIOLOGY' ? 'active' : ''}`}
            onClick={() => setFilter('RADIOLOGY')}
          >
            Radiology
          </button>
        </div>
      </div>

      <div className="records-grid">
        {filteredRecords.length === 0 ? (
          <div className="empty-state">
            <p>📋 No medical records found</p>
            <p className="empty-subtitle">Your medical records will appear here after your appointments</p>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div key={record.id} className="record-card">
              <div className="record-header">
                <div className="record-type" style={{ backgroundColor: getRecordTypeColor(record.recordType) }}>
                  <span className="type-icon">{getRecordTypeIcon(record.recordType)}</span>
                  <span className="type-name">{record.recordType?.replace('_', ' ')}</span>
                </div>
                <span className="record-date">{formatDate(record.recordDate)}</span>
              </div>

              <div className="record-content">
                <h3>{record.title}</h3>
                <p className="description">{record.description}</p>

                {record.diagnosis && (
                  <div className="record-section">
                    <strong>Diagnosis:</strong>
                    <p>{record.diagnosis}</p>
                  </div>
                )}

                {record.treatment && (
                  <div className="record-section">
                    <strong>Treatment:</strong>
                    <p>{record.treatment}</p>
                  </div>
                )}

                {record.labResults && (
                  <div className="record-section lab-results">
                    <strong>Lab Results:</strong>
                    <p>{record.labResults}</p>
                  </div>
                )}

                <div className="record-footer">
                  <div className="doctor-info">
                    <span>👨‍⚕️ Dr. {record.doctor?.user?.fullName || record.doctor?.user?.username || 'Unknown'}</span>
                  </div>
                  {record.confidential && (
                    <span className="confidential-badge">🔒 Confidential</span>
                  )}
                </div>

                {record.notes && (
                  <div className="record-notes">
                    <strong>Notes:</strong>
                    <p>{record.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </DashboardLayout>
  );
};

export default PatientRecords;
