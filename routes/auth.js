const express = require('express');
const passport = require('passport');

const { registration, login, whoAmI } = require('../controllers/auth');

const router = express.Router();

router.post('/registration', registration);
router.post('/login', login);
router.get('/who-am-i', passport.authenticate('jwt', { session: false }), whoAmI);

module.exports = router;
