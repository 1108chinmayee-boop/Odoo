import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const EmployeeAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await api.get('/attendance/my/66d4e5f6');
      console.log('Attendance response:', response.data);
      setAttendance(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setMessage('Failed to load attendance');
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      const response = await api.post('/attendance/checkin', { employeeId: '66d4e5f6' });
      setMessage('✅ Check-in successful!');
      fetchAttendance();
    } catch (error) {
      console.error('Check-in error:', error);
      setMessage('❌ Check-in failed');
    }
  };

  const handleCheckOut = async () => {
    try {
      const response = await api.post('/attendance/checkout', { employeeId: '66d4e5f6' });
      setMessage('✅ Check-out successful!');
      fetchAttendance();
    } catch (error) {
      console.error('Check-out error:', error);
      setMessage('❌ Check-out failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>📅 My Attendance</h2>
      
      {message && <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
      
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <button onClick={handleCheckIn} style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>
          ✅ Check In
        </button>
        <button onClick={handleCheckOut} style={{ padding: '10px 20px', background: 'red', color: 'white', border: 'none', borderRadius: '5px' }}>
          ❌ Check Out
        </button>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hours</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ padding: '20px', textAlign: 'center' }}>No attendance records found</td>
            </tr>
          ) : (
            attendance.map((record) => (
              <tr key={record._id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(record.date).toLocaleDateString()}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.status}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{record.workingHours || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAttendance;
