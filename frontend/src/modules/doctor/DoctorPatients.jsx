import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS } from '../../config/apiConfig';
import apiClient from '../../services/apiClient';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DataTable from '../../components/common/DataTable';
import './DoctorPatients.css';

const DoctorPatients = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    try {
      // Get all appointments for this doctor
      const response = await apiClient.get(API_ENDPOINTS.APPOINTMENTS.DOCTOR);
      const appointments = Array.isArray(response.data) ? response.data : [];
      
      // Extract unique patients from appointments
      const uniquePatientsMap = new Map();
      appointments.forEach(apt => {
        if (apt.patient && !uniquePatientsMap.has(apt.patient.id)) {
          uniquePatientsMap.set(apt.patient.id, {
            id: apt.patient.id,
            name: apt.patient.user?.fullName || apt.patient.user?.username || 'Unknown',
            email: apt.patient.user?.email || 'N/A',
            phone: apt.patient.phoneNumber || 'N/A',
            age: apt.patient.age || 'N/A',
            bloodGroup: apt.patient.bloodGroup || 'N/A',
            lastVisit: apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleDateString() : 'N/A',
            status: 'Active',
          });
        }
      });
      
      setPatients(Array.from(uniquePatientsMap.values()));
    } catch (error) {
      console.error('Error loading patients:', error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Patient Name',
      accessor: 'name',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Phone',
      accessor: 'phone',
    },
    {
      header: 'Age',
      accessor: 'age',
    },
    {
      header: 'Blood Group',
      accessor: 'bloodGroup',
    },
    {
      header: 'Last Visit',
      accessor: 'lastVisit',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (status) => (
        <span className={`status-badge ${status === 'Active' ? 'green' : 'gray'}`}>
          {status}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (id) => (
        <div className="action-buttons">
          <button
            className="btn-view"
            onClick={() => console.log('View patient:', id)}
          >
            👁️ View
          </button>
          <button
            className="btn-prescription"
            onClick={() => console.log('Add prescription:', id)}
          >
            📝 Prescription
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading patients..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="doctor-patients">
      <div className="page-header">
        <h1>👥 My Patients</h1>
      </div>

      <div className="stats-row">
        <div className="stat-box blue">
          <div className="stat-icon">👥</div>
          <div className="stat-details">
            <div className="stat-value">{patients.length}</div>
            <div className="stat-label">Total Patients</div>
          </div>
        </div>

        <div className="stat-box green">
          <div className="stat-icon">✅</div>
          <div className="stat-details">
            <div className="stat-value">
              {patients.filter(p => p.status === 'Active').length}
            </div>
            <div className="stat-label">Active Patients</div>
          </div>
        </div>

        <div className="stat-box orange">
          <div className="stat-icon">📅</div>
          <div className="stat-details">
            <div className="stat-value">12</div>
            <div className="stat-label">This Month</div>
          </div>
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search by patient name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="patients-table">
        <DataTable
          columns={columns}
          data={filteredPatients}
          loading={loading}
          emptyMessage="No patients found"
        />
      </div>
    </div>
    </DashboardLayout>
  );
};

export default DoctorPatients;
