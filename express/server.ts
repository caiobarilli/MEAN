import createConnection from './src/config/mongoose.config';
import expressApp from './src/app';
import * as dotenv from 'dotenv';

/**
 * Load .env file
 */
dotenv.config();

/**
 * Connect to MongoDB and start express server
 */
const conn = createConnection();
conn
  .then(() => {
    const app = expressApp();

    app.listen(process.env.port || 5000, () =>
      console.warn(`Server running on port ${process.env.port || 5000}`)
    );

    console.warn('MongoDB is connected');
  })
  .catch((err: Error) => {
    console.error(err);
    process.exit(1);
  });
