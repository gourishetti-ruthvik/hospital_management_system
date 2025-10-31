import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Notifications.css';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your appointment with Dr. Sarah Johnson is confirmed for Jan 20, 2024 at 10:00 AM',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'prescription',
      title: 'New Prescription Added',
      message: 'Dr. Michael Brown has added a new prescription for you',
      time: '5 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Appointment Reminder',
      message: 'You have an appointment tomorrow at 11:00 AM with Dr. James Wilson',
      time: '1 day ago',
      read: true,
    },
    {
      id: 4,
      type: 'report',
      title: 'Lab Report Ready',
      message: 'Your blood test results are now available. Please check your medical records.',
      time: '2 days ago',
      read: true,
    },
    {
      id: 5,
      type: 'system',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated',
      time: '3 days ago',
      read: true,
    },
  ]);
  const [filter, setFilter] = useState('all');

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const getNotificationIcon = (type) => {
    const iconMap = {
      appointment: '📅',
      prescription: '💊',
      reminder: '⏰',
      report: '📋',
      system: '⚙️',
    };
    return iconMap[type] || '🔔';
  };

  const filteredNotifications = filter === 'all'
    ? notifications
    : filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-page">
      <div className="page-header">
        <div>
          <h1>🔔 Notifications</h1>
          <p>Stay updated with your latest activities</p>
        </div>
        <div className="header-actions">
          {unreadCount > 0 && (
            <button className="btn-mark-all" onClick={handleMarkAllAsRead}>
              ✅ Mark all as read
            </button>
          )}
          <button className="btn-clear" onClick={handleClearAll}>
            🗑️ Clear all
          </button>
        </div>
      </div>

      <div className="notifications-stats">
        <div className="stat-card">
          <span className="stat-icon">🔔</span>
          <div>
            <div className="stat-value">{notifications.length}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>
        <div className="stat-card unread">
          <span className="stat-icon">📬</span>
          <div>
            <div className="stat-value">{unreadCount}</div>
            <div className="stat-label">Unread</div>
          </div>
        </div>
        <div className="stat-card read">
          <span className="stat-icon">✅</span>
          <div>
            <div className="stat-value">{notifications.length - unreadCount}</div>
            <div className="stat-label">Read</div>
          </div>
        </div>
      </div>

      <div className="notifications-filter">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </button>
        <button
          className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
        <button
          className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
          onClick={() => setFilter('read')}
        >
          Read ({notifications.length - unreadCount})
        </button>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-card ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="notification-content">
                <div className="notification-header">
                  <h3>{notification.title}</h3>
                  <span className="notification-time">{notification.time}</span>
                </div>
                <p className="notification-message">{notification.message}</p>
              </div>

              <div className="notification-actions">
                {!notification.read && (
                  <button
                    className="btn-icon"
                    title="Mark as read"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    ✅
                  </button>
                )}
                <button
                  className="btn-icon delete"
                  title="Delete"
                  onClick={() => handleDelete(notification.id)}
                >
                  🗑️
                </button>
              </div>

              {!notification.read && <div className="unread-indicator" />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
