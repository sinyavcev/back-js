const { BAD_REQUEST, CREATED } = require('../../constants/responseCodes');
const { NO_DATA } = require('../../constants/responseMessages');
const { News } = require('../../models');

module.exports = {
  async addNews(req, res) {
    try {
      const {
        body: {
          title,
          content,
          tags,
          userId,
        },
        file: {
          path,
        },
      } = req;

      if (!title
        || !content
        || !userId
        || !tags) {
        return res.status(BAD_REQUEST).send(NO_DATA);
      }

      const image = path || '';
      const news = await News.create({
        title,
        content,
        image,
        tags,
        userId,
      });

      return res.status(CREATED).send(news);
    } catch (error) {
      return res.status(BAD_REQUEST).send(error.message);
    }
  },
};
