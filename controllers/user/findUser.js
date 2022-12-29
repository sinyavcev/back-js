const { News, User } = require('../../models');
const { INTERNAL_SERVER_ERROR, OK } = require('../../constants/responseCodes');

module.exports = {
  async findUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(
        id,
        {
          include: {
            model: News,
            as: 'news',
          },
          attributes: ['id', 'email', 'login', 'avatar'],
        },
      );
      return res.status(OK).send(user);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
