export {};
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/*.{ts,tsx}', 'src/**/*.{ts,tsx}', '!src/**/*.d.ts',
    '!**/vendor/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    ".(ts|tsx)": "ts-jest",
  },
  moduleNameMapper: {
    '\\.css': '<rootDir>/src/test/styleMock.ts',
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "graphql.ts",
    "<rootDir>/src/test"
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
}
