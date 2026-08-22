const express = require('express');
const router = express.Router();

// Temporary test route
router.get('/test', (req, res) => {
  res.json({ message: 'Attendance routes working!' });
});

router.post('/checkin', (req, res) => {
  res.json({ message: 'Check-in endpoint working!' });
});

router.post('/checkout', (req, res) => {
  res.json({ message: 'Check-out endpoint working!' });
});

module.exports = router;
