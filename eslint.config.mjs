/* ==========================================================================
eslint.config.mjs

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import js from '@eslint/js'; // Provides ESLint core rules and recommended config
import eslintConfigPrettier from 'eslint-config-prettier'; // Prettier config to disable conflicting ESLint rules
import jsdocPlugin from 'eslint-plugin-jsdoc'; // JSDoc plugin
import sveltePlugin from 'eslint-plugin-svelte'; // Svelte plugin
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser'; // Svelte parser

const GLOBALS = {
  ...globals.browser,
  ...globals.node,
  self: 'readonly',
  location: 'readonly',
  indexedDB: 'readonly',
  ...globals.vitest, // Add Vitest globals for test functions like afterEach, describe, etc.
};

// Define general ESLint rules (non-Svelte-specific)
const ESLINT_RULES = {
  indent: 'off', // Turn off the 'indent' rule, managed by Prettier
  quotes: 'off', // Turn off the 'quotes' rule, managed by Prettier
  semi: 'off', // Turn off the 'semi' rule, managed by Prettier
};

export default [
  // Global ignores
  {
    ignores: [
      '.*', // Hidden files
      '*.xml', // XML files
      '**/.cache/**', // Cache directories
      '**/.vscode/**', // VSCode-specific files
      '**/coverage/**', // Coverage reports
      '**/build/**', // Distribution files
      'package.json', // NPM package manifest
      'package-lock.json', // NPM lockfile
      '**/playwright-report/**', // Playwright report files
      'node_modules/', // Node.js dependencies
      '**/test-results/**', // Test results
      '.vite/', // Vite-specific cache directory
      '*.lock', // Lock files
      '.env*', // Environment files
    ],
  },

  // General JavaScript/Node.js configuration
  {
    files: ['**/*.mjs', '**/*.cjs', '**/*.js'],
    languageOptions: {
      globals: GLOBALS,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      jsdoc: jsdocPlugin, // Include JSDoc plugin
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint's core recommended rules (scoped)
      ...eslintConfigPrettier.rules, // Prettier config to disable conflicting ESLint rules (scoped)
      ...ESLINT_RULES, // Additional custom rules

      // Updated unused variable handling:
      // - Ignore args starting with "_"
      // - Ignore vars starting with "_"
      // - Allow unused catch variables named "_err" or any "_*"
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'jsdoc/check-alignment': 'warn', // Ensure JSDoc block tags are aligned
      'jsdoc/check-param-names': 'warn', // Checks parameter names in JSDoc
      'jsdoc/check-tag-names': [
        'warn',
        {
          definedTags: ['updated'], // Allow custom @updated tag
        },
      ],
      'jsdoc/check-types': 'warn', // Checks if types in JSDoc are defined correctly
      'jsdoc/require-param': 'warn', // Requires @param in JSDoc
      'jsdoc/require-returns': 'warn', // Requires @returns in JSDoc
      'jsdoc/require-jsdoc': [
        'warn',
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
          },
        },
      ],
    },
  },

  // Svelte-specific configuration
  {
    files: ['**/*.svelte'],
    plugins: { svelte: sveltePlugin }, // Use imported Svelte plugin
    languageOptions: {
      parser: svelteParser, // Use imported Svelte parser
      globals: GLOBALS, // Your global variables
      ecmaVersion: 'latest', // Use "latest" for Svelte to leverage modern features
      sourceType: 'module',
    },
    rules: {
      ...sveltePlugin.configs.recommended.rules, // Svelte recommended rules
      ...sveltePlugin.configs.prettier.rules, // Prettier compatibility for Svelte
      'svelte/no-at-html-tags': 'warn', // Warn on use of @html (security risk)
      'svelte/require-optimized-style-attribute': 'warn', // Recommend optimized style attributes
    },
  },

  // Vitest-specific configuration
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/vitest-setup-client.js'], // Test-related files
    languageOptions: {
      globals: {
        ...GLOBALS,
        afterEach: 'readonly', // Explicitly declare afterEach as a global
      },
    },
    rules: {
      'no-undef': 'off', // Turn off no-undef for test globals
    },
  },
];
