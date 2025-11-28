import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import patientService from '../../services/patientService';
import DataTable from '../../components/common/DataTable';
import './PatientAppointments.css';

const PatientAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await patientService.getMyAppointments();
      // Transform API data to match component format
      const formattedAppointments = data.map(apt => ({
        id: apt.id,
        doctorName: apt.doctor?.user?.fullName || 'Dr. ' + apt.doctor?.user?.username,
        specialization: apt.doctor?.specialization || 'General',
        date: new Date(apt.appointmentDate).toISOString().split('T')[0],
        time: new Date(apt.appointmentDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: apt.status,
        reason: apt.reasonForVisit,
      }));
      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Error loading appointments:', error);
      setError('Failed to load appointments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await patientService.cancelAppointment(appointmentId);
        setAppointments(prev =>
          prev.map(apt =>
            apt.id === appointmentId ? { ...apt, status: 'CANCELLED' } : apt
          )
        );
        alert('Appointment cancelled successfully!');
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        alert('Failed to cancel appointment. Please try again.');
      }
    }
  };

  const getStatusClass = (status) => {
    const statusMap = {
      SCHEDULED: 'blue',
      CONFIRMED: 'blue',
      PENDING: 'orange',
      COMPLETED: 'green',
      CANCELLED: 'red',
    };
    return statusMap[status] || 'gray';
  };

  const filteredAppointments = filter === 'all'
    ? appointments
    : appointments.filter(apt => apt.status === filter);

  const upcomingCount = appointments.filter(apt => 
    apt.status === 'SCHEDULED' || apt.status === 'CONFIRMED' || apt.status === 'PENDING'
  ).length;
  
  const completedCount = appointments.filter(apt => apt.status === 'COMPLETED').length;

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
          {(row.status === 'SCHEDULED' || row.status === 'CONFIRMED' || row.status === 'PENDING') && (
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
