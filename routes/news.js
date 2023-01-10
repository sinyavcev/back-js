const express = require('express');

const router = express.Router();

const passport = require('passport');
const upload = require('../middleware/uploadImage');

const { findAllNews, addNews } = require('../controllers/news');

router.get('/', findAllNews);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  addNews,
);

module.exports = router;
