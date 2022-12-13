const express = require('express');

const newsController = require('../controllers/newsController');

const router = express.Router();

router.get('/', newsController.findAllNews);

module.exports = router;
