const express = require('express');
const router = express.Router();

// Temporary test route
router.get('/test', (req, res) => {
  res.json({ message: 'Leave routes working!' });
});

router.post('/apply', (req, res) => {
  res.json({ message: 'Apply leave endpoint working!' });
});

module.exports = router;
