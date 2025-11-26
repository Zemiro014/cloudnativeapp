'use strict';
const dotenv = require('dotenv');
const fs = require('fs');

class Config {
static loadConfig() {
    if (
        process.env.NODE_ENV === undefined ||
        process.env.NODE_ENV === null ||
        process.env.NODE_ENV === ''
    ) {
        process.env.NODE_ENV = 'development';
    }
    this.envPath = `${process.cwd()}/.env.${process.env.NODE_ENV}`;
    this.checkNodeEnv();
    dotenv.config({ path: this.envPath });
  }
  
  static checkNodeEnv() {
    if (!fs.existsSync(this.envPath)) {
      throw new Error(`Config file not found at ${this.envPath}`);
    }
  }
}

module.exports = Config;