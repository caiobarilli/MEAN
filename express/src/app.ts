import express from 'express';
import postsRouter from './routes/api/posts';
import { expressLogger, logger } from './config/winston.config';

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
   * Define a route handler for the default home page
   */
  app.get('/', (req, res) => {
    logger.info('Requisição recebida na rota /');
    res.send('Hello, World!');
  });

  /**
   * Define routes
   */
  app.use('/api/posts', postsRouter);

  /**
   * Start server
   */
  app.listen(process.env.port || 5000, () =>
    console.warn(`Server running on port ${process.env.port || 5000}`)
  );
};

export default expressApp;
