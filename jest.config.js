module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'server.js',
    'scripts/**/*.js',
    'js/**/*.js'
  ],
  coverageDirectory: 'coverage',
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  verbose: true
};