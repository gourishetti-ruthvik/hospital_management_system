import React, { useState, useEffect } from 'react';
import DataTable from '../../components/common/DataTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ErrorAlert from '../../components/common/ErrorAlert';
import './DoctorManagement.css';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      // Simulated data - will be replaced with API call
      setTimeout(() => {
        setDoctors([
          {
            id: 1,
            name: 'Dr. Sarah Williams',
            specialization: 'Cardiology',
            email: 'sarah.williams@hospital.com',
            phone: '1234567890',
            status: 'Active',
          },
          {
            id: 2,
            name: 'Dr. Michael Brown',
            specialization: 'Neurology',
            email: 'michael.brown@hospital.com',
            phone: '0987654321',
            status: 'Active',
          },
          {
            id: 3,
            name: 'Dr. Emily Davis',
            specialization: 'Pediatrics',
            email: 'emily.davis@hospital.com',
            phone: '5555555555',
            status: 'Active',
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to fetch doctors');
      setLoading(false);
    }
  };

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // API call will be added in Phase 3
      setDoctors(doctors.filter((d) => d.id !== selectedDoctor.id));
      setShowDeleteDialog(false);
      setSelectedDoctor(null);
    } catch (err) {
      setError('Failed to delete doctor');
    }
  };

  const columns = [
    { header: 'Name', field: 'name' },
    { header: 'Specialization', field: 'specialization' },
    { header: 'Email', field: 'email' },
    { header: 'Phone', field: 'phone' },
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
    <div className="doctor-management">
      <div className="page-header">
        <h1>👨‍⚕️ Doctor Management</h1>
        <button className="btn-add">+ Add Doctor</button>
      </div>

      {error && <ErrorAlert message={error} onClose={() => setError('')} />}

      <div className="table-container">
        <DataTable
          columns={columns}
          data={doctors}
          loading={loading}
          emptyMessage="No doctors found"
        />
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Doctor"
        message={`Are you sure you want to delete ${selectedDoctor?.name}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteDialog(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default DoctorManagement;
