import React from 'react';
import Footer from '../layout/Footer';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <main className="dashboard-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
