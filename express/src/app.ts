import express, { NextFunction, Request, Response } from 'express';
import { expressLogger, logger } from './config/winston.config';
import postsRouter from './routes/api/posts';
import { Error } from 'mongoose';

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
   * Middleware to handle errors
   */
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

  /**
   * Define a route handler for the default home page
   */
  app.get('/', (req: Request, res: Response) => {
    logger.info('Request to /');
    res.status(200).send('Express & TypeScript');
  });

  /**
   * Define routes
   */
  app.use('/api/posts', postsRouter);

  /**
   * Return express app
   */
  return app;
};

export default expressApp;
