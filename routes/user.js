const express = require('express');
const { auth } = require('../middleware/auth');
const { registration, login, checkUser } = require('../controllers').user;

const router = express.Router();



router.post('/reg', registration);
router.post('/login', login);
router.get('/',passport, checkUser);

module.exports = router;
