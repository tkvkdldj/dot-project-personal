const express = require('express');
const router = express.Router();
const { getUserLibrary } = require('../controllers/libraryController');

router.get('/user', getUserLibrary);

module.exports = router;