/* eslint-disable no-undef */
module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'cloud_native_app.db',
  },
  test: {
    dialect: 'sqlite',
    storage: 'cloud_native_app.db',
    logging: false,
  },
  production: {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    logging: false,
  },
};
