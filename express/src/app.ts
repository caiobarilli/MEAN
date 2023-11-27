import express from 'express';
import postsRouter from './routes/api/posts';

const expressApp = () => {
  /**
   * Create a new express application instance
   */
  const app = express();

  /**
   * Use express.json() middleware to parse json data from request body
   */
  app.use(express.json());

  /**
   * Use express.urlencoded() middleware to parse urlencoded data from request body
   */
  app.use(express.urlencoded({ extended: true }));

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
