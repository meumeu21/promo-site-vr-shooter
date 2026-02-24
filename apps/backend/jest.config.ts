import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/../frontend/src/$1'
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        module: 'CommonJS',
        moduleResolution: 'Node',
        baseUrl: '.',
        paths: {
          '@/*': ['../frontend/src/*']
        }
      }
    }
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/scripts/**',
    '!<rootDir>/src/types/**'
  ],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 35,
      lines: 35,
      statements: 35
    }
  },
  clearMocks: true
};

export default config;
