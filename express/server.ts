import createConnection from './src/config/mongoose.config';
import expressApp from './src/app';
import * as dotenv from 'dotenv';

/**
 * Load .env file
 */
dotenv.config();

/**
 * Connect to MongoDB
 */
createConnection();

/**
 * Start express server
 */
expressApp();
