//인증과 관련된 작업을 처리 (라우팅 등록)
const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

router.post('/login', loginUser);

module.exports = router;