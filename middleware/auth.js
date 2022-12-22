const jwt = require('jsonwebtoken');

const { BAD_REQUEST } = require('../constants/responseCodes');

module.exports = {
  auth(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new Error('No auth');
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      console.log(decoded);
      next();
    } catch (error) {
      return res.status(BAD_REQUEST).send(error.message);
    }
  },
};
//паспорт библи 
