const path = require('path');
const express = require('express');

const router = express.Router();

const trendingController = require('../controllers/trendingMovie');

router.get('/trending',trendingController.trendingsection);

module.exports = router;