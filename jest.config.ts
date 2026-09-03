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

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

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
