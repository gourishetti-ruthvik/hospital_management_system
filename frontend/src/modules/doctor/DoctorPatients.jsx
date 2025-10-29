import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
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

  const loadPatients = () => {
    setLoading(true);
    // Simulated data - will be replaced with API call in Phase 3
    setTimeout(() => {
      setPatients([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          age: 35,
          bloodGroup: 'O+',
          lastVisit: '2024-01-10',
          status: 'Active',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1234567891',
          age: 28,
          bloodGroup: 'A+',
          lastVisit: '2024-01-12',
          status: 'Active',
        },
        {
          id: 3,
          name: 'Robert Johnson',
          email: 'robert@example.com',
          phone: '+1234567892',
          age: 42,
          bloodGroup: 'B+',
          lastVisit: '2024-01-08',
          status: 'Inactive',
        },
      ]);
      setLoading(false);
    }, 500);
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

  return (
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
  );
};

export default DoctorPatients;
