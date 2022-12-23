const { OK, UNAUTHORIZED } = require('../../constants/responseCodes');
const { USER_UNAUTHORIZED } = require('../../constants/responseMessages');

module.exports = {
  async checkUser(req, res) {
    try {
      return res.status(OK).send(req.user);
    } catch (error) {
      return res.status(UNAUTHORIZED).send(USER_UNAUTHORIZED);
    }
  },
};
