const express = require('express');

const router = express.Router();

const passport = require('passport');
const { getUser, updateUser } = require('../controllers/user');
const upload = require('../middleware/uploadImage');

router.get('/:id', getUser);
router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  updateUser,
);

module.exports = router;
