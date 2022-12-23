const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

const ROUNDS = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.News, {
        foreignKey: 'userId',
        as: 'news',
      });
    }
  }
  User.init({
    login: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
      allowNull: false,
    },
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeSave(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, ROUNDS);
    }
  });
  User.prototype.comparePassword = function compare(password) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
          return rej(err);
        }
        return res(isMatch);
      });
    });
  };
  return User;
};
