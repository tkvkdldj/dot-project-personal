//미션 글쓰기 저장
const express = require('express');
const router = express.Router();
const { createMissionPost, getMissionPosts } = require('../controllers/missionController');

// POST -> 미션글 작성
router.post('/', createMissionPost);

// 미션글 조회
router.get('/view', getMissionPosts);

module.exports = router;