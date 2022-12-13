const { News, User } = require('../models');
const { BAD_REQUEST, OK } = require('../constants/responseCodes');

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
            'name',
            'avatar',
          ],
        },
      });
      return res.status(OK).send(news);
    } catch (error) {
      return res.status(BAD_REQUEST).send(error);
    }
  },
};
