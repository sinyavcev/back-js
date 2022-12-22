const { findAllNews } = require('./news');
const { registration, login, checkUser } = require('./user');

module.exports = {
  news: {
    findAllNews,
  },
  user: {
    registration,
    login,
    checkUser,
  },
};
