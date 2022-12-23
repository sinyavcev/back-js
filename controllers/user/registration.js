const { Op } = require('sequelize');

const { BAD_REQUEST, CREATED } = require('../../constants/responseCodes');
const { NO_DATA, USER_EXIST } = require('../../constants/responseMessages');
const { User } = require('../../models');
const generateToken = require('../../utils/generateToken');

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
        password,
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
      return res.status(CREATED).send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      return res.status(BAD_REQUEST).send(error.message);
    }
  },
};
