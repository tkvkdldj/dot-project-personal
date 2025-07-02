//RecordScreen에서 누적시간 계산하기
const express = require('express');
const router = express.Router();
const { getTodayDuration } = require('../controllers/readStatsController');
const { getServerDateInfo } = require('../controllers/readStatsController');

router.get('/duration', getTodayDuration);
router.get('/date', getServerDateInfo); 

module.exports = router;