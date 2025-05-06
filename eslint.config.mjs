/* ==========================================================================
eslint.config.mjs

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import mocha from "eslint-plugin-mocha";
import globals from "globals";

// Files and directories to ignore during linting
const IGNORED_FILES = [
  ".*", // Hidden files
  "*.xml", // XML files
  "**/.vscode/**", // VSCode-specific files
  "**/.webpack_cache/**", // Webpack cache
  "**/coverage/**", // Coverage reports
  "**/dist/**", // Distribution files
  "package.json", // NPM package manifest
  "package-lock.json", // NPM lockfile
  ".cache/", // Cache directory
  "node_modules/", // Node.js dependencies
  "*.lock", // Lock files
];

// Global variables for the project
const GLOBALS = {
  ...globals.browser,
  ...globals.node,
  ...globals.mocha,
  self: "readonly",
  location: "readonly",
  indexedDB: "readonly",
};

// ESLint rules configuration
const ESLINT_RULES = {
  "mocha/no-exclusive-tests": "error",
  "mocha/no-skipped-tests": "warn",
  "mocha/no-hooks-for-single-case": "warn",
};

export default [
  js.configs.recommended,
  {
    files: ["**/*.mjs", "**/*.js"],
    ignores: IGNORED_FILES,
    plugins: { mocha },
    languageOptions: {
      globals: GLOBALS,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: ESLINT_RULES,
  },
  eslintConfigPrettier,
];
