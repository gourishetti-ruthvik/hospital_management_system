import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DataTable from '../../components/common/DataTable';
import './DoctorAppointments.css';

const DoctorAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    setLoading(true);
    // Simulated data - will be replaced with API call in Phase 3
    setTimeout(() => {
      setAppointments([
        {
          id: 1,
          patientName: 'John Doe',
          patientEmail: 'john@example.com',
          date: '2024-01-15',
          time: '10:00 AM',
          status: 'Scheduled',
          reason: 'Regular checkup',
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          patientEmail: 'jane@example.com',
          date: '2024-01-15',
          time: '11:30 AM',
          status: 'Completed',
          reason: 'Follow-up consultation',
        },
        {
          id: 3,
          patientName: 'Robert Johnson',
          patientEmail: 'robert@example.com',
          date: '2024-01-16',
          time: '02:00 PM',
          status: 'Pending',
          reason: 'Lab results review',
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
    console.log(`Appointment ${appointmentId} status changed to ${newStatus}`);
    // API call will be added in Phase 3
  };

  const getStatusClass = (status) => {
    const statusMap = {
      Scheduled: 'blue',
      Pending: 'orange',
      Completed: 'green',
      Cancelled: 'red',
    };
    return statusMap[status] || 'gray';
  };

  const filteredAppointments = filter === 'all'
    ? appointments
    : appointments.filter(apt => apt.status === filter);

  const todayAppointments = appointments.filter(apt => apt.date === '2024-01-15').length;
  const pendingAppointments = appointments.filter(apt => apt.status === 'Pending').length;

  const columns = [
    {
      header: 'Patient Name',
      accessor: 'patientName',
    },
    {
      header: 'Date',
      accessor: 'date',
    },
    {
      header: 'Time',
      accessor: 'time',
    },
    {
      header: 'Reason',
      accessor: 'reason',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (status) => (
        <span className={`status-badge ${getStatusClass(status)}`}>
          {status}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (id, row) => (
        <div className="action-buttons">
          <select
            className="status-select"
            value={row.status}
            onChange={(e) => handleStatusChange(id, e.target.value)}
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button className="btn-view" onClick={() => console.log('View details:', id)}>
            👁️ View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="doctor-appointments">
      <div className="page-header">
        <h1>📅 My Appointments</h1>
      </div>

      <div className="stats-row">
        <div className="stat-box blue">
          <div className="stat-icon">📋</div>
          <div className="stat-details">
            <div className="stat-value">{appointments.length}</div>
            <div className="stat-label">Total Appointments</div>
          </div>
        </div>

        <div className="stat-box orange">
          <div className="stat-icon">📅</div>
          <div className="stat-details">
            <div className="stat-value">{todayAppointments}</div>
            <div className="stat-label">Today's Appointments</div>
          </div>
        </div>

        <div className="stat-box red">
          <div className="stat-icon">⏰</div>
          <div className="stat-details">
            <div className="stat-value">{pendingAppointments}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <label>Filter by Status:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Appointments</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="appointments-table">
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

export default DoctorAppointments;
