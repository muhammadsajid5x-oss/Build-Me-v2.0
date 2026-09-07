import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  roots: [
    "<rootDir>/tests",
    "<rootDir>/apps",
    "<rootDir>/packages",
    "<rootDir>/services",
  ],

  testMatch: ["**/*.jest.test.ts", "**/*.jest.test.tsx"],
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^.+\\.(css|scss|sass)$": "<rootDir>/tests/mocks/styleMock.js",
  },

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.jest.json",
      },
    ],
  },

  clearMocks: true,
};

export default config;


