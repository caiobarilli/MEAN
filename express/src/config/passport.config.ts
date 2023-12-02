import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import usersService from '../modules/users/users.service';

const configurePassport = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwtSecret
  };

  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      try {
        const user = usersService.getUserById(jwt_payload.id);
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
