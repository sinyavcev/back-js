const { ExtractJwt, Strategy } = require('passport-jwt');

const { User } = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await User.findByPk(
          payload,
          {
            attributes: ['id', 'email', 'login', 'avatar'],
          },
        );
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error, null);
      }
    }),
  );
};
