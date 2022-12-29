const { News, User } = require('../../models');
const { INTERNAL_SERVER_ERROR, OK, NOT_FOUND } = require('../../constants/responseCodes');
const { USER_NOT_FOUND } = require('../../constants/responseMessages');

module.exports = {
  async getUser(req, res) {
    try {
      const user = await User.findByPk(
        req.params.id,
        {
          include: {
            model: News,
            as: 'news',
          },
          attributes: ['id', 'email', 'login', 'avatar'],
        },
      );
      if (!user) return res.status(NOT_FOUND).send(USER_NOT_FOUND);
      return res.status(OK).send(user);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
