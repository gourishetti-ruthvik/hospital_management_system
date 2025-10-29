import React, { useState, useEffect } from 'react';
import DataTable from '../../components/common/DataTable';
import ErrorAlert from '../../components/common/ErrorAlert';
import { formatDate, formatDateTime } from '../../utils/helpers';
import './AppointmentManagement.css';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // Simulated data - will be replaced with API call
      setTimeout(() => {
        setAppointments([
          {
            id: 1,
            patientName: 'John Doe',
            doctorName: 'Dr. Sarah Williams',
            date: '2025-10-30',
            time: '10:00 AM',
            type: 'Consultation',
            status: 'Scheduled',
            createdAt: '2025-10-28T14:30:00',
          },
          {
            id: 2,
            patientName: 'Jane Smith',
            doctorName: 'Dr. Michael Brown',
            date: '2025-10-29',
            time: '02:30 PM',
            type: 'Follow-up',
            status: 'Completed',
            createdAt: '2025-10-27T10:15:00',
          },
          {
            id: 3,
            patientName: 'Robert Johnson',
            doctorName: 'Dr. Emily Davis',
            date: '2025-11-01',
            time: '11:00 AM',
            type: 'Consultation',
            status: 'Pending',
            createdAt: '2025-10-28T16:45:00',
          },
          {
            id: 4,
            patientName: 'Mary Wilson',
            doctorName: 'Dr. Sarah Williams',
            date: '2025-10-28',
            time: '09:00 AM',
            type: 'Check-up',
            status: 'Cancelled',
            createdAt: '2025-10-26T11:20:00',
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to fetch appointments');
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      setAppointments(
        appointments.map((apt) =>
          apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        )
      );
    } catch (err) {
      setError('Failed to update appointment status');
    }
  };

  const filteredAppointments =
    filterStatus === 'all'
      ? appointments
      : appointments.filter((apt) => apt.status.toLowerCase() === filterStatus);

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'blue',
      pending: 'orange',
      completed: 'green',
      cancelled: 'red',
    };
    return colors[status.toLowerCase()] || 'gray';
  };

  const columns = [
    { header: 'Patient', field: 'patientName' },
    { header: 'Doctor', field: 'doctorName' },
    {
      header: 'Date',
      field: 'date',
      render: (value) => formatDate(value),
    },
    { header: 'Time', field: 'time' },
    { header: 'Type', field: 'type' },
    {
      header: 'Status',
      field: 'status',
      render: (value) => (
        <span className={`status-badge ${getStatusColor(value)}`}>
          {value}
        </span>
      ),
    },
    {
      header: 'Created',
      field: 'createdAt',
      render: (value) => formatDateTime(value),
    },
    {
      header: 'Actions',
      field: 'id',
      render: (value, row) => (
        <div className="action-dropdown">
          <select
            className="status-select"
            value={row.status}
            onChange={(e) => handleStatusChange(value, e.target.value)}
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      ),
    },
  ];

  const statusStats = {
    total: appointments.length,
    scheduled: appointments.filter((a) => a.status === 'Scheduled').length,
    pending: appointments.filter((a) => a.status === 'Pending').length,
    completed: appointments.filter((a) => a.status === 'Completed').length,
    cancelled: appointments.filter((a) => a.status === 'Cancelled').length,
  };

  return (
    <div className="appointment-management">
      <div className="page-header">
        <h1>📅 Appointment Management</h1>
      </div>

      {error && <ErrorAlert message={error} onClose={() => setError('')} />}

      <div className="stats-overview">
        <div className="stat-box">
          <span className="stat-icon">📊</span>
          <div className="stat-details">
            <span className="stat-value">{statusStats.total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
        <div className="stat-box blue">
          <span className="stat-icon">📅</span>
          <div className="stat-details">
            <span className="stat-value">{statusStats.scheduled}</span>
            <span className="stat-label">Scheduled</span>
          </div>
        </div>
        <div className="stat-box orange">
          <span className="stat-icon">⏱️</span>
          <div className="stat-details">
            <span className="stat-value">{statusStats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="stat-box green">
          <span className="stat-icon">✅</span>
          <div className="stat-details">
            <span className="stat-value">{statusStats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        <div className="stat-box red">
          <span className="stat-icon">❌</span>
          <div className="stat-details">
            <span className="stat-value">{statusStats.cancelled}</span>
            <span className="stat-label">Cancelled</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <label>Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Appointments</option>
          <option value="scheduled">Scheduled</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="table-container">
        <DataTable
          columns={columns}
          data={filteredAppointments}
          loading={loading}
          emptyMessage="No appointments found"
        />
      </div>
    </div>
  );
};

export default AppointmentManagement;
