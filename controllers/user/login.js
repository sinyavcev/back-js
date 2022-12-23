const {
  BAD_REQUEST,
  OK,
  NOT_FOUND,
} = require('../../constants/responseCodes');
const {
  NO_DATA,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} = require('../../constants/responseMessages');
const { User } = require('../../models');
const generateToken = require('../../utils/generateToken');

module.exports = {
  async login(req, res) {
    try {
      const { body: { email, password } } = req;

      const userData = {
        email: email?.trim(),
        password,
      };

      if (!userData.email || !userData.password) {
        return res.status(BAD_REQUEST).send(NO_DATA);
      }

      const user = await User.findOne({ where: { email: userData.email } });

      if (!user) {
        return res.status(NOT_FOUND).send(USER_NOT_FOUND);
      }

      const isValidPassword = await user.comparePassword(userData.password);

      if (!isValidPassword) {
        return res.status(BAD_REQUEST).send(WRONG_PASSWORD);
      }

      const token = generateToken(user.id);
      return res.status(OK).send({
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
