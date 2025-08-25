import type { Config } from "jest";
import { createDefaultPreset, pathsToModuleNameMapper } from "ts-jest";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { compilerOptions } = require("./tsconfig.json");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/

const jestConfig: Config = {
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg,
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

export default jestConfig;
