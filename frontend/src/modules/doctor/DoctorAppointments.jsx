import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS } from '../../config/apiConfig';
import apiClient from '../../services/apiClient';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DashboardLayout from '../../components/layout/DashboardLayout';
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

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(API_ENDPOINTS.APPOINTMENTS.DOCTOR);
      console.log('Doctor appointments loaded:', response.data);
      setAppointments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error loading appointments:', error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await apiClient.put(API_ENDPOINTS.APPOINTMENTS.UPDATE_STATUS(appointmentId), null, {
        params: { status: newStatus }
      });
      
      // Update local state
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        )
      );
      console.log(`Appointment ${appointmentId} status changed to ${newStatus}`);
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Failed to update appointment status');
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const filteredAppointments = filter === 'all'
    ? appointments
    : appointments.filter(apt => apt.status === filter);

  const todayAppointments = appointments.filter(apt => 
    apt.appointmentDate?.split('T')[0] === getTodayDate()
  ).length;
  const pendingAppointments = appointments.filter(apt => apt.status === 'PENDING' || apt.status === 'SCHEDULED').length;

  const columns = [
    {
      header: 'Patient Name',
      accessor: 'patient',
      render: (patient) => patient?.user?.fullName || patient?.user?.username || 'Unknown'
    },
    {
      header: 'Date',
      accessor: 'appointmentDate',
      render: (date) => formatDate(date)
    },
    {
      header: 'Time',
      accessor: 'appointmentTime',
      render: (time) => formatTime(time)
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

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner message="Loading appointments..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
};

export default DoctorAppointments;
