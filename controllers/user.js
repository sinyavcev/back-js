const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { BAD_REQUEST, OK, CREATED, NOT_FOUND } = require('../constants/responseCodes');
const {
  NO_DATA,
  USER_EXIST,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} = require("../constants/errors");

const { User } = require('../models');
const {generateToken} = require('../utils/generateToken')



module.exports = {
  async registration(req, res) {
    try {
      const {
        body: { 
          email,
          password, 
          name,
        },
      } = req;

      const userData = {
        email: email?.trim(),
        name: name?.trim(),
        password: password?.trim(),
      };

      if (!userData.email
       || !userData.name
       || !userData.password) {

        return res.status(BAD_REQUEST).send(NO_DATA);
      }

      const candidate = await User.findOne({
        where: {
          [Op.or]: [
            { name: userData.name },
            { email: userData.email },
          ],
        },
      });

      if (candidate) {
        return res.status(BAD_REQUEST).send(USER_EXIST);
      }

      const user = await User.create(userData);

      const token = generateToken(user.id);
      return res.status(CREATED).send({ user:{id,email,name}, token });
    } catch (error) {
      return res.status(BAD_REQUEST).send(error.message);
    }
  },
  async login(req, res) {
    try {
      const { body: { email, password } } = req;
      
      const userData = {
        email: email?.trim(),
        password: password?.trim(),
      };

      const user = await User.findOne({ where: { email: userData.email } });

      if (!user) {
        return res.status(NOT_FOUND).send(USER_NOT_FOUND);
      }

      const isValidPassword = await user.comparePassword(userData.password);

      if (!isValidPassword) {
        return res.status(BAD_REQUEST).send(WRONG_PASSWORD);
      }

      const token = generateToken(user.id);
      return res.status(OK).send({ user:{id, email}, token });
    } catch (error) {
      return res.status(BAD_REQUEST).send(error.message);
    }
  },
  async checkUser(req, res) { //tru/catch
    const token = generateToken(req.user.id, req.user.email);
    res.status(OK).send(req.user);//
  },
};