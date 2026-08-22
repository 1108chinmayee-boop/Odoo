import React, { useState, useEffect } from 'react';
import { testConnection } from './services/api';
import EmployeeAttendance from './components/attendance/EmployeeAttendance';
import EmployeeLeave from './components/leave/EmployeeLeave';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    async function checkBackend() {
      const result = await testConnection();
      if (result) {
        setBackendStatus('✅ Connected to Backend');
      } else {
        setBackendStatus('❌ Backend not reachable');
      }
    }
    checkBackend();
  }, []);

  const renderPage = () => {
    switch(currentPage) {case 'attendance':
        return <EmployeeAttendance />;
      case 'leave':
        return <EmployeeLeave />;
      default:
        return (
          <div>
            <h2>Welcome to HRMS Dashboard</h2>
            <p>Select a module from the cards below:</p>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <h1>🏢 HRMS Dashboard</h1>
      <p>{backendStatus}</p>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
        <div 
          style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}
          onClick={() => setCurrentPage('dashboard')}
        >
          <h3>🏠 Dashboard</h3>
          <p>Home</p>
        </div>
        <div 
          style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}
          onClick={() => setCurrentPage('attendance')}
        >
          <h3>📅 Attendance</h3>
          <p>Check-in / Check-out</p>
        </div>
        <div 
          style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}
          onClick={() => setCurrentPage('leave')}
        >
          <h3>📋 Leave</h3>
          <p>Apply for leave</p>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
