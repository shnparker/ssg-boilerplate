module.exports = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['.next/', 'cypress'],
  setupFilesAfterEnv: [
    'jest-extended', // Extends native "expect" abilities - See https://github.com/jest-community/jest-extended
    'jest-expect-message', // Allows to add additional message when test fails - See https://github.com/mattphillips/jest-expect-message
    './jest.setup.js',
  ],
};
