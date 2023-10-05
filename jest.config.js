module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    "^__constants(.*)$": "<rootDir>/src/constants$1"
  },
  testEnvironment: 'jsdom'
};
