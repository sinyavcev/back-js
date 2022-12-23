const { registration } = require('./registration');
const { login } = require('./login');
const { checkUser } = require('./checkUser');

module.exports = {
  user: {
    registration,
    login,
    checkUser,
  },
};
