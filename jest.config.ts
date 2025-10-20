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
  testEnvironment: "@happy-dom/jest-environment", // note: https://github.com/thymikee/jest-preset-angular/issues/2194
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  transform: {
    ...defaultPreset.transform,
    "^.+\\.(ts|tsx)$": "ts-jest",
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
  },
};

export default jestConfig;
