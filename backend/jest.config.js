module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/__tests__/**',
    '!jest.config.js',
    '!index.js',
  ],
  setupFilesAfterEnv: ['./__tests__/setup.js'],
  testTimeout: 30000, // 30 seconds for slower operations
  verbose: true,
  forceExit: true,
  detectOpenHandles: true,
};
