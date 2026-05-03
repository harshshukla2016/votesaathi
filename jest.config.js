const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/utils/**/*.ts',
    'src/hooks/**/*.ts',
    'src/services/**/*.ts',
    'src/components/VoterVerification.tsx',
    'src/components/CampaignTracker.tsx',
  ],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 90,
      statements: 90,
    },
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
};

module.exports = createJestConfig(customJestConfig);
