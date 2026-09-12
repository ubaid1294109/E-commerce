const express = require('express');

const router = express.Router();

router.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'E-commerce server is running',
  });
});

module.exports = router;
