module.exports = {
  globalSetup: "<rootDir>/jest.globalSetup.js",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    "^__assets(.*)$": "<rootDir>/src/assets$1",
    "^__components(.*)$": "<rootDir>/src/components$1",
    "^__constants(.*)$": "<rootDir>/src/constants$1",
    "^__contexts(.*)$": "<rootDir>/src/contexts$1",
    "^__helpers(.*)$": "<rootDir>/src/helpers$1",
    "^__mocks(.*)$": "<rootDir>/__mocks__$1",
    "^__services(.*)$": "<rootDir>/src/services$1",
    "^__src(.*)$": "<rootDir>/src$1",
  },
  testEnvironment: 'jsdom'
};
