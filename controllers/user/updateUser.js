const { Op } = require('sequelize');

const { User } = require('../../models');
const { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST } = require('../../constants/responseCodes');
const { USER_EXIST } = require('../../constants/responseMessages');

module.exports = {
  async updateUser(req, res) {
    try {
      const {
        body: {
          login,
          email,
        },
        user: {
          id,
        },
        file,
      } = req;

      const newUserData = {};
      if (email?.trim()) newUserData.email = email;
      if (login?.trim()) newUserData.login = login;

      const user = await User.findOne({
        where: {
          [Op.or]: [
            newUserData,
          ],
        },
      });

      if (user) {
        return res.status(BAD_REQUEST).send(USER_EXIST);
      }

      if (file?.path) newUserData.avatar = file?.path.replace('public/', '') || '';
      const updatedUser = await User.update(
        newUserData,
        {
          where: { id },
        },
      );

      return res.status(OK).send(updatedUser);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
