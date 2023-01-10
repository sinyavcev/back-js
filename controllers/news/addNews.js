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
        },
        user: {
          id,
        },
        file,
      } = req;

      if (!title?.trim()
      || !content?.trim()
      || !tags?.trim()) return res.status(BAD_REQUEST).send(NO_DATA);

      const news = await News.create({
        title,
        userId: id,
        content,
        image: file?.path || '',
        tags,
      });

      return res.status(CREATED).send(news);
    } catch (error) {
      return res.status(BAD_REQUEST).send(error.message);
    }
  },
};
