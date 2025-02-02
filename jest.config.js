const { pathsToModuleNameMapper } = require('ts-jest/utils');
const path = require('path');
const { mapValues } = require('lodash');
const { compilerOptions } = require('./packages/tsconfig.test');

// Due to invalid typings built-in to `json-schema-faker` we had to force typescript to load
// typings from @types/json-schema-faker instead
const pathsMappings = Object.fromEntries(
  Object.entries(compilerOptions.paths).filter(([name]) => name.startsWith('@stoplight'))
);

const projectDefault = {
  moduleNameMapper: mapValues(pathsToModuleNameMapper(pathsMappings), v => path.resolve(path.join('packages', v))),
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
};

module.exports = {
  projects: [
    {
      ...projectDefault,
      displayName: 'HTTP-SERVER',
      testMatch: ['<rootDir>/packages/http-server/src/**/__tests__/*.*.ts'],
      globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/packages/tsconfig.test.json',
        },
      },
    },
    {
      ...projectDefault,
      displayName: 'HTTP',
      testMatch: ['<rootDir>/packages/http/src/**/__tests__/*.*.ts'],
      globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/packages/tsconfig.test.json',
        },
      },
    },
    {
      ...projectDefault,
      displayName: 'CORE',
      testMatch: ['<rootDir>/packages/core/src/**/__tests__/*.*.ts'],
      globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/packages/tsconfig.test.json',
        },
      },
    },
    {
      ...projectDefault,
      displayName: 'CLI',
      testMatch: ['<rootDir>/packages/cli/src/**/__tests__/*.*.ts'],
      globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/packages/tsconfig.test.json',
        },
      },
    },
  ],
  collectCoverageFrom: ['**/src/**/*.{ts,tsx}', '!**/src/**/__tests__/**/*.{ts,tsx}'],
};
