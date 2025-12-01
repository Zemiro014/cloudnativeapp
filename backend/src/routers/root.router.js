/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const welcomeMessage = 'Welcome to the backend module!';

router.get('/', (req, resp) => {
  resp.status(200).send(welcomeMessage);
});

module.exports = router;
