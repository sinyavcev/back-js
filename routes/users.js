const express = require('express');

const router = express.Router();

const { findUser } = require('../controllers/user');

router.get('/:id', findUser);

module.exports = router;
