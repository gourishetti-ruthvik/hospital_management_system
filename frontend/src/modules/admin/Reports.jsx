import React, { useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [reportType, setReportType] = useState('appointments');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });

  const handleGenerateReport = () => {
    console.log('Generating report:', reportType, dateRange);
    // API call will be added in Phase 3
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>📊 Reports & Analytics</h1>
      </div>

      <div className="reports-container">
        <div className="report-selector">
          <h2>Generate Report</h2>
          
          <div className="form-group">
            <label>Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="report-select"
            >
              <option value="appointments">Appointments Report</option>
              <option value="patients">Patients Report</option>
              <option value="doctors">Doctors Report</option>
              <option value="billing">Billing Report</option>
              <option value="revenue">Revenue Report</option>
            </select>
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="date-input"
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="date-input"
            />
          </div>

          <button className="generate-btn" onClick={handleGenerateReport}>
            📥 Generate Report
          </button>
        </div>

        <div className="reports-preview">
          <h2>Quick Stats</h2>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👨‍⚕️</div>
              <div className="stat-content">
                <h3>25</h3>
                <p>Total Doctors</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🏥</div>
              <div className="stat-content">
                <h3>156</h3>
                <p>Total Patients</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <h3>89</h3>
                <p>Appointments (Month)</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>₹45,000</h3>
                <p>Revenue (Month)</p>
              </div>
            </div>
          </div>

          <div className="chart-placeholder">
            <h3>Analytics Chart</h3>
            <p>📈 Chart visualization will be added in Phase 3</p>
            <div className="placeholder-chart">
              <div className="bar" style={{ height: '60%' }}></div>
              <div className="bar" style={{ height: '80%' }}></div>
              <div className="bar" style={{ height: '45%' }}></div>
              <div className="bar" style={{ height: '90%' }}></div>
              <div className="bar" style={{ height: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
