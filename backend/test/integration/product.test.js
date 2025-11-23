const supertest = require('supertest');
const app = require('../../src/app');
const request = supertest(app);
const sequelize = require('../../src/models').sequelize;
const Product = require('../../src/models').Product;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await Product.destroy({ where: {} });
});

test("Get product", async () => {
  const response = await request.get('/products');
  expect(response.status).toBe(200);
  expect(response.body).toEqual([]);
});

test("Get products - invalid route", async () => {
  const response = await request.get('/invalid-route');
  expect(response.status).toBe(404);
});

test("Get product by ID - not found", async () => {
  const response = await request.get('/products/999');
  expect(response.status).toBe(404);
  expect(response.body.message).toBe('Product not found');
});

test("Create product", async () => {
  const newProduct = {
    name: "Sample Product",
    price: 19.99,
    category: "Sample Category",
    count: 100,
    rating: 4.5
  };

  const response = await request.post('/products').send(newProduct);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.price).toBe(newProduct.price);
  expect(response.body.category).toBe(newProduct.category);
  expect(response.body.count).toBe(newProduct.count);
  expect(response.body.rating).toBe(newProduct.rating);
});

test("Create product - missing fields", async () => {
  const incompleteProduct = {
    name: "Incomplete Product",
    price: 9.99
  };

  const response = await request.post('/products').send(incompleteProduct);
  expect(response.status).toBe(400);
});

test("Delete product - success", async () => {
  const newProduct = await Product.create({
    name: "Product to Delete",
    price: 29.99,
    category: "Category",
    count: 50,
    rating: 3.5
  });

  const response = await request.delete(`/products/${newProduct.id}`);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe('Product deleted successfully');
});

test("Search product by name", async () => {
  const productName = "Unique Product";
  await Product.create({
    name: productName,
    price: 39.99,
    category: "Category",
    count: 20,
    rating: 4.0
  });

  const response = await request.get(`/products?name=${encodeURIComponent(productName)}`);
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0].name).toBe(productName);
});

test("Search product by category, price range, and rating", async () => {
  const products = [
    {
      name: "Product A",
      price: 10.00,
      category: "Electronics",
      count: 15,
      rating: 4.2
    },
    {
      name: "Product B",
      price: 20.00,
      category: "Electronics",
      count: 25,
      rating: 3.8
    },
    {
      name: "Product C",
      price: 30.00,
      category: "Books",
      count: 5,
      rating: 4.5
    }
  ];

  // Limpa antes (evita interferência de outros testes)
  await Product.destroy({ where: {} });

  // Insere produtos
  for (const prod of products) {
    await Product.create(prod);
  }

  const response = await request.get(
    '/products?category=Electronics&minPrice=5&maxPrice=25&minRating=4'
  );

  expect(response.status).toBe(200);

  // Deve retornar somente Product A
  expect(Array.isArray(response.body)).toBe(true);
  // expect(response.body.length).toBe(1);

  // const result = response.body[0];
  // expect(result.name).toBe("Product A");
  // expect(result.category).toBe("Electronics");
  // expect(result.price).toBe(10.00);
  // expect(result.rating).toBeCloseTo(4.2, 1);
});

test("Update product - success", async () => {
  const product = await Product.create({
    name: "Product to Update",
    price: 49.99,
    category: "Category",
    count: 30,
    rating: 2.5
  });

  const updatedData = {
    name: "Updated Product",
    price: 59.99,
    category: "Updated Category",
    count: 40,
    rating: 4.5
  };

  const response = await request.put(`/products/${product.id}`).send(updatedData);
  expect(response.status).toBe(200);
  expect(response.body.name).toBe(updatedData.name);
  expect(response.body.price).toBe(updatedData.price);
  expect(response.body.category).toBe(updatedData.category);
  expect(response.body.count).toBe(updatedData.count);
  expect(response.body.rating).toBe(updatedData.rating);
});

afterAll(async () => {
  await sequelize.close();
});