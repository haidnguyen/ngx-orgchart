const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [
    '<rootDir>/src/setup-test.ts',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
  transformIgnorePatterns: ['^.+\\.js$'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths ?? {}, { prefix: '<rootDir>/' }),
  snapshotResolver: './snapshotResolver.js',
}
