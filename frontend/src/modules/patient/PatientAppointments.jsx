import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DataTable from '../../components/common/DataTable';
import './PatientAppointments.css';

const PatientAppointments = () => {
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
          doctorName: 'Dr. Sarah Johnson',
          specialization: 'Cardiologist',
          date: '2024-01-20',
          time: '10:00 AM',
          status: 'Scheduled',
          reason: 'Regular checkup',
        },
        {
          id: 2,
          doctorName: 'Dr. Michael Brown',
          specialization: 'Dermatologist',
          date: '2024-01-18',
          time: '02:30 PM',
          status: 'Completed',
          reason: 'Skin consultation',
        },
        {
          id: 3,
          doctorName: 'Dr. James Wilson',
          specialization: 'Orthopedic',
          date: '2024-01-25',
          time: '11:00 AM',
          status: 'Pending',
          reason: 'Joint pain assessment',
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId ? { ...apt, status: 'Cancelled' } : apt
        )
      );
      console.log(`Appointment ${appointmentId} cancelled`);
      // API call will be added in Phase 3
    }
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

  const upcomingCount = appointments.filter(apt => 
    apt.status === 'Scheduled' || apt.status === 'Pending'
  ).length;
  
  const completedCount = appointments.filter(apt => apt.status === 'Completed').length;

  const columns = [
    {
      header: 'Doctor',
      accessor: 'doctorName',
      render: (name, row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{row.specialization}</div>
        </div>
      ),
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
          {(row.status === 'Scheduled' || row.status === 'Pending') && (
            <button
              className="btn-cancel"
              onClick={() => handleCancelAppointment(id)}
            >
              ❌ Cancel
            </button>
          )}
          <button
            className="btn-view"
            onClick={() => console.log('View details:', id)}
          >
            👁️ View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="patient-appointments">
      <div className="page-header">
        <h1>📋 My Appointments</h1>
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
          <div className="stat-icon">⏰</div>
          <div className="stat-details">
            <div className="stat-value">{upcomingCount}</div>
            <div className="stat-label">Upcoming</div>
          </div>
        </div>

        <div className="stat-box green">
          <div className="stat-icon">✅</div>
          <div className="stat-details">
            <div className="stat-value">{completedCount}</div>
            <div className="stat-label">Completed</div>
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

export default PatientAppointments;
