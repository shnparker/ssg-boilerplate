/**
 * JEST CONFIG
 *
 * Additional jest package configuration.
 * Bundles third party packages and setup files
 */

module.exports = {
  testEnvironment: "node",
  modulePathIgnorePatterns: [".next/", "cypress"],
  moduleNameMapper: {
    "^pages(.*)$": "<rootDir>/src/pages$1",
    "^components(.*)$": "<rootDir>/src/components$1",
    "^hooks(.*)$": "<rootDir>/src/hooks$1",
    "^stores(.*)$": "<rootDir>/src/stores$1",
    "^styles(.*)$": "<rootDir>/src/styles$1",
    "^utils(.*)$": "<rootDir>/src/utils$1",
  },
  setupFilesAfterEnv: [
    "jest-extended", // @see https://github.com/jest-community/jest-extended
    "./jest.setup.js",
  ],
};
