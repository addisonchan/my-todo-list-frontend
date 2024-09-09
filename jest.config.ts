module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>'],
  testRegex: ['.*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    // Replicate as .env.development file
                    VITE_API_BASE_URL: 'http://localhost:3000/api/todos',
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  collectCoverageFrom: ['./src/**', '!**/node_modules/**'],
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}
