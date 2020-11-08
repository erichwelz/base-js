module.exports = {
  rootDir: './src',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/index.js'
  ],
  coverageDirectory: '<rootDir>/../coverage',
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  testMatch: ['**/*.test.js'],
  testEnvironment: 'node',
  verbose: true
}
