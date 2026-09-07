module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  roots: ["<rootDir>/tests", "<rootDir>/packages/ui/tests"],
  testMatch: [
    "**/*.jest.test.ts",
    "**/*.jest.test.tsx"
  ],
  setupFiles: ["<rootDir>/tests/jest.setup.ts"],
  resolver: "<rootDir>/tests/jest.resolver.cjs",
  moduleNameMapper: {
    "^.+\\.(css|scss|sass)$": "<rootDir>/tests/mocks/styleMock.js"
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/storybook-static/"
  ],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "<rootDir>/tsconfig.jest.json"
      }
    ]
  }
};
