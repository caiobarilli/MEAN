import express from 'express';
import { expressLogger, logger } from './config/winston.config';
import authRouter from './routes/api/auth';
import userRouter from './routes/api/users';
import postsRouter from './routes/api/posts';

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
   * Use express.json() middleware to parse json data from request body
   */
  app.use(express.json());

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
   * Define routes
   */
  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/posts', postsRouter);

  /**
   * Return express app
   */
  return app;
};

export default expressApp;
