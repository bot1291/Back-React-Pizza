export const config: import('ts-jest/dist/types').InitialOptionsTsJest = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['./src/setupFilesAfterEnv.ts'],
	modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
