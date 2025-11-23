const app = require('./app');
const Config = require('./utils/config');

Config.loadConfig();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});