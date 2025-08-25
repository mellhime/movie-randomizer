import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import pluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {},
      },
    },
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    plugins: {
      js,
      prettier: pluginPrettier,
      react: pluginReact,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^react-dom"],
            ["^@?\\w"],
            ["^.+\\.s?css$"],
            [
              "^@styles",
              "^@layouts",
              "^@modules",
              "^@hooks",
              "^@api",
              "^@images",
            ],
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],
    },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  globalIgnores(["node_modules/*", "dist/*"]),
]);
