import * as express from 'express';

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
  app.use('/api/auth', require('./routes/api/auth'));
  app.use('/api/profile', require('./routes/api/profile'));
  app.use('/api/users', require('./routes/api/users'));
  app.use('/api/posts', require('./routes/api/posts'));

  /**
   * Start server
   */
  app.listen(process.env.port || 5000, () =>
    console.warn(`Server running on port ${process.env.port || 5000}`)
  );
};

export default expressApp;
