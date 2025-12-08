/* eslint-disable no-undef */
const logger = require('../../src/utils/logger');

test('Test logger call', () => {
  logger.info('This is an info message');
  logger.info('This is a log info level');
  logger.warning('This is a log warning level');

  logger.error('This is a log error level');
});
