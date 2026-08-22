const express = require('express');
const router = express.Router();

// Store leaves in memory (temporary)
let leaves = [];
let leaveId = 1;

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Leave routes working!' });
});

// Get my leaves
router.get('/my/:employeeId', (req, res) => {
  const employeeLeaves = leaves.filter(l => l.employeeId === req.params.employeeId);
  res.json({ 
    success: true, 
    data: employeeLeaves
  });
});

// Apply for leave
router.post('/apply', (req, res) => {
  const { employeeId, leaveType, startDate, endDate, reason } = req.body;
  
  // Calculate days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  
  const newLeave = {
    _id: leaveId++,
    employeeId: employeeId || '66d4e5f6',
    leaveType,
    startDate,
    endDate,
    totalDays,
    reason,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  leaves.push(newLeave);
  console.log('✅ New leave request:', newLeave);
  
  res.json({ 
    success: true, 
    message: 'Leave applied successfully',
    data: newLeave
  });
});

// Admin: Get all leaves
router.get('/all', (req, res) => {
  res.json({ 
    success: true, 
    data: leaves
  });
});

// Admin: Update leave status
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status, adminComments } = req.body;
  
  const leave = leaves.find(l => l._id === parseInt(id));
  if (leave) {
    leave.status = status;
    leave.adminComments = adminComments;
    res.json({ success: true, data: leave });
  } else {
    res.status(404).json({ success: false, message: 'Leave not found' });
  }
});

module.exports = router;
