// "package.json:jest" config cannot be used alongside this config, all Jest config must be centralised in this file - See https://github.com/facebook/jest/issues/10123#issuecomment-638796267
module.exports = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['.next/', 'cypress'],
  setupFilesAfterEnv: [
    'jest-extended', // Extends native "expect" abilities - See https://github.com/jest-community/jest-extended
    'jest-expect-message', // Allows to add additional message when test fails - See https://github.com/mattphillips/jest-expect-message
    './jest.setup.js',
    './jest.extends.ts',
  ],
};
