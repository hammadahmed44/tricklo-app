const express = require('express');
const router = express.Router();

// GET /api/health — used by Railway/Vercel health checks and for Postman smoke testing
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
