import type { Config } from "jest";
import { createDefaultEsmPreset, pathsToModuleNameMapper } from "ts-jest";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { compilerOptions } = require("./tsconfig.json");

const defaultPreset = createDefaultEsmPreset({
  tsconfig: "tsconfig.json",
});

/** @type {import("jest").Config} **/

const jestConfig: Config = {
  ...defaultPreset,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "@happy-dom/jest-environment", // note: https://github.com/jsdom/jsdom/issues/2177
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    "^firebase/app$": "<rootDir>/src/test/mocks/firebase-app.ts",
    "^firebase/auth$": "<rootDir>/src/test/mocks/firebase-auth.ts",
    "^firebase/firestore$": "<rootDir>/src/test/mocks/firebase-firestore.ts",
    "^firebase/compat/app$": "<rootDir>/src/test/mocks/firebase-compat-app.ts",
  },
  transform: {
    ...defaultPreset.transform,
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
  },
};

export default jestConfig;
