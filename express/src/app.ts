import express from 'express';
import authRouter from './routes/api/auth';
import profileRouter from './routes/api/profile';
import usersRouter from './routes/api/users';
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
   * Define routes
   */
  app.use('/api/auth', authRouter);
  app.use('/api/profile', profileRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/posts', postsRouter);

  /**
   * Start server
   */
  app.listen(process.env.port || 5000, () =>
    console.warn(`Server running on port ${process.env.port || 5000}`)
  );
};

export default expressApp;
