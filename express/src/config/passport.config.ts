import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import userRepository from '../modules/users/users.repository';

const configurePassport = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwtSecret,
    algorithms: ['HS256']
  };

  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      try {
        const user = userRepository.getUserById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );

  return passport;
};

export default configurePassport;
