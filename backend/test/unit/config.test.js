/* eslint-disable no-undef */
const fs = require('fs');
const config = require('../../src/utils/envConfig');

jest.mock('dotenv');
jest.mock('fs');

describe('Config Utility test', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Define NODE_ENV as default value', async () => {
    fs.existsSync.mockReturnValueOnce(true);
    delete process.env.NODE_ENV;
    config.loadConfig();
    expect(process.env.NODE_ENV).toEqual('development');
    expect(fs.existsSync).toHaveBeenCalledTimes(1);
  });

  test('File not found exception', async () => {
    fs.existsSync.mockReturnValueOnce(false);
    expect(() => {
      config.loadConfig();
    }).toThrow(Error);
  });
});
