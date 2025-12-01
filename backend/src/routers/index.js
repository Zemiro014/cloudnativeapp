/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const rootRouter = require('./root.router');
const productRouter = require('./product.router');

router.use('/', rootRouter);
router.use('/products', productRouter);

module.exports = router;
