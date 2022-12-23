const jwt = require('jsonwebtoken');

module.exports = (id) => jwt.sign(id, process.env.SECRET_KEY);
