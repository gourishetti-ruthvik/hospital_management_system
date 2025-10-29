import React, { useState, useEffect } from 'react';
import DataTable from '../../components/common/DataTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ErrorAlert from '../../components/common/ErrorAlert';
import { formatDate } from '../../utils/helpers';
import './PatientManagement.css';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      // Simulated data - will be replaced with API call
      setTimeout(() => {
        setPatients([
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@email.com',
            phone: '1234567890',
            age: 35,
            gender: 'Male',
            registeredDate: '2025-01-15',
            status: 'Active',
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@email.com',
            phone: '0987654321',
            age: 28,
            gender: 'Female',
            registeredDate: '2025-02-20',
            status: 'Active',
          },
          {
            id: 3,
            name: 'Robert Johnson',
            email: 'robert.j@email.com',
            phone: '5555555555',
            age: 45,
            gender: 'Male',
            registeredDate: '2025-03-10',
            status: 'Active',
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to fetch patients');
      setLoading(false);
    }
  };

  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setPatients(patients.filter((p) => p.id !== selectedPatient.id));
      setShowDeleteDialog(false);
      setSelectedPatient(null);
    } catch (err) {
      setError('Failed to delete patient');
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: 'Name', field: 'name' },
    { header: 'Email', field: 'email' },
    { header: 'Phone', field: 'phone' },
    { header: 'Age', field: 'age' },
    { header: 'Gender', field: 'gender' },
    {
      header: 'Registered',
      field: 'registeredDate',
      render: (value) => formatDate(value),
    },
    {
      header: 'Status',
      field: 'status',
      render: (value) => (
        <span className={`status-badge ${value.toLowerCase()}`}>{value}</span>
      ),
    },
    {
      header: 'Actions',
      field: 'id',
      render: (value, row) => (
        <div className="action-buttons">
          <button className="btn-view" onClick={() => console.log('View', row)}>
            👁️ View
          </button>
          <button className="btn-edit" onClick={() => console.log('Edit', row)}>
            ✏️ Edit
          </button>
          <button className="btn-delete" onClick={() => handleDeleteClick(row)}>
            🗑️ Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="patient-management">
      <div className="page-header">
        <h1>🏥 Patient Management</h1>
      </div>

      {error && <ErrorAlert message={error} onClose={() => setError('')} />}

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="stats-cards">
          <div className="stat-card">
            <span className="stat-label">Total Patients</span>
            <span className="stat-value">{patients.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Active</span>
            <span className="stat-value">{patients.filter(p => p.status === 'Active').length}</span>
          </div>
        </div>
      </div>

      <div className="table-container">
        <DataTable
          columns={columns}
          data={filteredPatients}
          loading={loading}
          emptyMessage="No patients found"
        />
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Patient"
        message={`Are you sure you want to delete ${selectedPatient?.name}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteDialog(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default PatientManagement;
