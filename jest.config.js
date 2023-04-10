/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'ts'],
  transform: {"^.+\\.(ts|tsx)$": "ts-jest",},
  testMatch: [
    '**/*.(test.js|test.ts)'
  ],
  testEnvironment: 'node',
};