/* eslint-disable no-undef */
const Product = require('../models').Product;

exports.getProductById = async (req, resp) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      resp.status(200).send(product);
    } else {
      resp.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Failed to retrieve product:', error);
    resp
      .status(500)
      .send({ message: error.message || 'Error retrieving product' });
  }
};

exports.createProduct = async (req, resp) => {
  const { name, price, category, count, rating } = req.body;

  if (
    !name ||
    price === undefined ||
    !category ||
    count === undefined ||
    rating === undefined
  ) {
    return resp.status(400).send({ message: 'Missing required fields' });
  }

  try {
    const newProduct = await Product.create({
      name,
      price,
      category,
      count,
      rating,
    });
    resp.status(201).send(newProduct);
  } catch (error) {
    console.error('Failed to create product:', error);
    resp
      .status(500)
      .send({ message: error.message || 'Error creating product' });
  }
};

exports.deleteProduct = async (req, resp) => {
  const { id } = req.params;
  try {
    const deletedCount = await Product.destroy({ where: { id } });
    if (deletedCount) {
      resp.status(200).send({ message: 'Product deleted successfully' });
    } else {
      resp.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Failed to delete product:', error);
    resp
      .status(500)
      .send({ message: error.message || 'Error deleting product' });
  }
};

exports.updateProduct = async (req, resp) => {
  const { id } = req.params;
  const { name, price, category, count, rating } = req.body;

  try {
    const [updatedCount] = await Product.update(
      { name, price, category, count, rating },
      { where: { id } },
    );

    if (updatedCount) {
      const updatedProduct = await Product.findByPk(id);
      resp.status(200).send(updatedProduct);
    } else {
      resp.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Failed to update product:', error);
    resp
      .status(500)
      .send({ message: error.message || 'Error updating product' });
  }
};

exports.searchProducts = async (req, resp) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const whereClause = {};

  if (name) {
    whereClause.name = name;
  }
  if (category) {
    whereClause.category = category;
  }
  if (minPrice) {
    whereClause.price = { ...whereClause.price, $gte: parseFloat(minPrice) };
  }
  if (maxPrice) {
    whereClause.price = { ...whereClause.price, $lte: parseFloat(maxPrice) };
  }

  try {
    const products = await Product.findAll({ where: whereClause });
    resp.status(200).send(products);
  } catch (error) {
    console.error('Failed to search products:', error);
    resp
      .status(500)
      .send({ message: error.message || 'Error searching products' });
  }
};
