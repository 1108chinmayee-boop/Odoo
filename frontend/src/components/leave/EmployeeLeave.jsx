import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const EmployeeLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: 'paid',
    startDate: '',
    endDate: '',
    reason: ''
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await api.get('/leaves/my/66d4e5f6');
      setLeaves(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaves:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/leaves/apply', {
        employeeId: '66d4e5f6',
        ...formData
      });
      setShowForm(false);
      fetchLeaves();
    } catch (error) {
      alert('Failed to apply for leave');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>📋 My Leaves</h2>
      <button onClick={() => setShowForm(true)} style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
        ✏️ Apply Leave
      </button>
      
      {showForm && (
        <form onSubmit={handleSubmit} style={{ margin: '20px 0', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>Leave Type: </label>
            <select value={formData.leaveType} onChange={(e) => setFormData({...formData, leaveType: e.target.value})}>
              <option value="paid">Paid Leave</option>
              <option value="sick">Sick Leave</option>
              <option value="unpaid">Unpaid Leave</option>
              <option value="casual">Casual Leave</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Start Date: </label>
            <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>End Date: </label>
            <input type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} required />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Reason: </label>
            <textarea placeholder="Enter reason" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} required style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>
              Submit
            </button>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 20px', background: 'gray', color: 'white', border: 'none', borderRadius: '5px' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Type</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Start Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>End Date</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Days</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{leave.leaveType}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{leave.totalDays}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  background: leave.status === 'approved' ? 'green' : leave.status === 'rejected' ? 'red' : 'orange',
                  color: 'white'
                }}>
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLeave;
