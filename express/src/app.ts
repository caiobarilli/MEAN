import express from 'express';
import { expressLogger, logger } from './config/winston.config';
import configurePassport from './config/passport.config';
import { configureHBS } from './config/hbs.config';
import authRouter from './routes/api/auth';
import userRouter from './routes/api/user';
import usersRouter from './routes/api/users';
import postsRouter from './routes/api/posts';
import webRouter from './routes/web';

const expressApp = () => {
  /**
   * Create a new express application instance
   */
  const app = express();

  /**
   * Use expressLogger middleware to log all requests
   */
  app.use(expressLogger);

  /**
   * Configure handlebars
   */
  configureHBS(app);

  /**
   * Use express.json() middleware to parse json data from request body
   */
  app.use(express.json());

  /**
   * Use passport middleware to handle authentication
   */
  app.use(configurePassport().initialize());

  /**
   * Use express.urlencoded() middleware to parse urlencoded data from request body
   */
  app.use(express.urlencoded({ extended: true }));

  /**
   * Use middleware to handle errors
   */
  app.use((err, req, res, next) => {
    logger.error(err.message);
  });

  /**
   * Define API routes
   */
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/posts', postsRouter);

  /**
   * Define web routes (tests)
   */
  app.use('/tests/', webRouter);

  /**
   * Return express app
   */
  return app;
};

export default expressApp;
