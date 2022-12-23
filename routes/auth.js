const express = require('express');
const passport = require('passport');

const { registration, login, checkUser } = require('../controllers/user').user;

const router = express.Router();

router.post('/reg', registration);
router.post('/login', login);
router.get('/', passport.authenticate('jwt', { session: false }), checkUser);

module.exports = router;
