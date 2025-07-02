const express = require('express');
const router = express.Router();
const { createReadLog } = require('../controllers/readLogsController');

// POST /api/read-logs
router.post('/', createReadLog);

module.exports = router;