import express from 'express';
import { transport, mailOptions } from './config/mailer.config';
import { expressLogger, logger } from './config/winston.config';
import configurePassport from './config/passport.config';
import { configureHBS } from './config/hbs.config';
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
   * Define routes
   */

  app.get('/', (req, res) => {
    transport().sendMail(
      mailOptions(
        'caiobarilli@gmail.com',
        'Teste de email',
        'Teste de email 123'
      ),
      (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.status(200).send('Email enviado: ' + info.response);
      }
    );
  });

  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/posts', postsRouter);

  /**
   * Return express app
   */
  return app;
};

export default expressApp;
