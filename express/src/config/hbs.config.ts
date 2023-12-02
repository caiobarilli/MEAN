import express from 'express';
import { engine } from 'express-handlebars';

export const configureHBS = (app: express.Application): void => {
  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set('views', './src/views');
};
