const { User } = require('../../models');
const { INTERNAL_SERVER_ERROR, OK, BAD_REQUEST } = require('../../constants/responseCodes');
const { USER_EXIST } = require('../../constants/responseMessages');

module.exports = {
  async updateUser(req, res) {
    try {
      const {
        body: {
          login,
        },
        user,
        file,
      } = req;

      if (login) {
        const existUser = await User.findOne({
          where: {
            login,
          },
        });

        if (existUser) {
          return res.status(BAD_REQUEST).send(USER_EXIST);
        }
      }

      const updatedUser = await User.update(
        {
          login: login || user.login,
          avatar: file?.path.replace('public/', '') || user.avatar,
        },
        {
          where: { id: user.id },
          returning: true,
          plain: true,
        },
      );

      return res.status(OK).send(updatedUser);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
