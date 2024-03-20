/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    dir: './',
});

const config: Config = {
    coverageProvider: 'v8',
    setupFiles: ['./jest.setup.js'],
    testRegex: ['__tests__/.*spec.[jt]sx?$'],
    testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(config);
