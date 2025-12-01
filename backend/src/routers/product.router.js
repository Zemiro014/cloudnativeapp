/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.searchProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);

module.exports = router;
