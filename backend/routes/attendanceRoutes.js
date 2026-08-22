const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Attendance routes working!' });
});

// Get my attendance
router.get('/my/:employeeId', (req, res) => {
  res.json({ 
    success: true, 
    data: [],
    stats: { totalDays: 0, presentDays: 0, attendanceRate: 0 }
  });
});

// Check-in
router.post('/checkin', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Check-in successful',
    data: { checkIn: new Date() }
  });
});

// Check-out
router.post('/checkout', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Check-out successful',
    data: { checkOut: new Date() }
  });
});

module.exports = router;
