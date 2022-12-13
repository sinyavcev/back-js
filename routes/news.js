const express = require('express');

const router = express.Router();

const { findAllNews } = require('../controllers').news;

router.get('/', findAllNews);

module.exports = router;
