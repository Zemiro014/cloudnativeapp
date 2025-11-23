const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routers');

app.use(express.json());

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/', router);

module.exports = app;