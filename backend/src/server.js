const app = require('./app');
const logger = require('./utils/logger');
const Config = require('./utils/envConfig');

Config.loadConfig();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});