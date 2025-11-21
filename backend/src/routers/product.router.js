const express = require('express');
const router = express.Router();
const productMessage = "Product list!";

router.get('/', (req, resp) => {
  resp.status(200).send(productMessage);
});

module.exports = router;