const express = require('express');
const app = express();
const welcomeMessage = 'Welcome to the backend module!';

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send(welcomeMessage);
});

module.exports = app;