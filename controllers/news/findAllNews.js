const { News, User } = require('../../models');
const { INTERNAL_SERVER_ERROR, OK } = require('../../constants/responseCodes');

module.exports = {
  async findAllNews(req, res) {
    try {
      const news = await News.findAll({
        order: [['createdAt', 'ASC']],
        attributes: [
          'id',
          'title',
          'content',
          'image',
          'tags',
        ],
        include: {
          model: User,
          as: 'user',
          attributes: [
            'id',
            'login',
            'avatar',
          ],
        },
      });
      return res.status(OK).send(news);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).send(error);
    }
  },
};
