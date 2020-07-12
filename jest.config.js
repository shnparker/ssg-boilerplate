/**
 * JEST CONFIG
 *
 * Additional jest package configuration.
 * Bundles third party packages and setup files
 */

module.exports = {
  testEnvironment: "node",
  modulePathIgnorePatterns: [".next/", "cypress"],
  setupFilesAfterEnv: [
    "jest-extended", // @see https://github.com/jest-community/jest-extended
    "jest-expect-message", // @see https://github.com/mattphillips/jest-expect-message
    "./jest.setup.js",
  ],
};
