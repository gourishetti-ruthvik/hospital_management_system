import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    prescriptionAlerts: true,
    language: 'en',
    timezone: 'Asia/Kolkata',
    theme: 'light',
    autoBackup: true,
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
    setMessage({ type: 'success', text: 'Settings saved successfully!' });
    
    // API call will be added in Phase 3
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        emailNotifications: true,
        smsNotifications: false,
        appointmentReminders: true,
        prescriptionAlerts: true,
        language: 'en',
        timezone: 'Asia/Kolkata',
        theme: 'light',
        autoBackup: true,
      });
      setMessage({ type: 'success', text: 'Settings reset to default!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>⚙️ Settings</h1>
        <p>Customize your application preferences</p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="settings-container">
        {/* Notifications Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h2>🔔 Notifications</h2>
            <p>Manage how you receive notifications</p>
          </div>

          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Email Notifications</h3>
                <p>Receive notifications via email</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>SMS Notifications</h3>
                <p>Receive notifications via SMS</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={() => handleToggle('smsNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Appointment Reminders</h3>
                <p>Get reminded about upcoming appointments</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.appointmentReminders}
                  onChange={() => handleToggle('appointmentReminders')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Prescription Alerts</h3>
                <p>Receive alerts for new prescriptions</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.prescriptionAlerts}
                  onChange={() => handleToggle('prescriptionAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h2>🌐 General</h2>
            <p>Basic application settings</p>
          </div>

          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Language</h3>
                <p>Select your preferred language</p>
              </div>
              <select
                name="language"
                value={settings.language}
                onChange={handleSelectChange}
                className="setting-select"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="es">Español (Spanish)</option>
                <option value="fr">Français (French)</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Timezone</h3>
                <p>Your local timezone</p>
              </div>
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleSelectChange}
                className="setting-select"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Theme</h3>
                <p>Choose your interface theme</p>
              </div>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleSelectChange}
                className="setting-select"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="settings-section">
          <div className="section-header">
            <h2>🔒 Privacy & Security</h2>
            <p>Manage your data and security preferences</p>
          </div>

          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Automatic Backup</h3>
                <p>Automatically backup your data</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={() => handleToggle('autoBackup')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security</p>
              </div>
              <button className="btn-secondary">
                🔐 Enable 2FA
              </button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Data Export</h3>
                <p>Download your data</p>
              </div>
              <button className="btn-secondary">
                📥 Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-reset" onClick={handleResetSettings}>
          🔄 Reset to Default
        </button>
        <button className="btn-save" onClick={handleSaveSettings}>
          💾 Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
