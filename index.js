require('dotenv').config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

const express = require('express');
const logger = require('./logger');

const app = express();

const port = process.env.PORT || 3000;

const {
  NODE_ENV,
  TEST,
  CLOUDWATCH_GROUP_NAME,
  // CLOUDWATCH_ACCESS_KEY,
  // CLOUDWATCH_SECRET_ACCESS_KEY,
  CLOUDWATCH_REGION,
} = process.env;

logger.info(
  'Starting server - NODE_ENV: ' +
    JSON.stringify({
      NODE_ENV,
      TEST,
      CLOUDWATCH_GROUP_NAME,
      // CLOUDWATCH_ACCESS_KEY,
      // CLOUDWATCH_SECRET_ACCESS_KEY,
      CLOUDWATCH_REGION,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  logger.debug('debug GET /');
  logger.info('info GET /');
  logger.error('error GET /');
  res.send('Hellooooo World!');
});

app.listen(port, () => {
  logger.info(`👂 App listening at http://localhost:${port}`);
});
