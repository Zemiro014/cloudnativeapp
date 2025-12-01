/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { logger } = require('./utils/logger');
const app = express();
const router = require('./routers');

app.use(express.json());
app.use(
  morgan('combined', { stream: { write: (message) => logger.info(message) } }),
);

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/', router);

module.exports = app;
