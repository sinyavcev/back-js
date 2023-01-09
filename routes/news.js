const express = require('express');

const router = express.Router();

const upload = require('../middleware/uploadImage');

const { findAllNews, addNews } = require('../controllers/news');

router.get('/', findAllNews);
router.post('/', upload.single('image'), addNews);

module.exports = router;
