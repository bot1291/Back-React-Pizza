/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['./src/setupFilesAfterEnv.ts'],
	modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
