/* =========================================================================
vitest.config.client.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { sveltekit } from "@sveltejs/kit/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import lightningcssPlugin from "vite-plugin-lightningcss";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteTesting(),
    lightningcssPlugin({
      minify: process.env.NODE_ENV === "production",
      pruneUnusedFontFaceRules: true,
      pruneUnusedKeyframes: true,
      removeUnusedFontFaces: true,
    }),
  ],
  test: {
    name: "client",
    environment: "jsdom",
    clearMocks: true,
    include: ["tests/unit/**/*.svelte.test.{js,mjs}"],
    exclude: [],
    setupFiles: ["./vitest-setup-client.js"],
    reporters: ["default", "json"],
    outputFile: {
      json: "./reports/client/results.json",
    },
    coverage: {
      provider: "v8",
      reporter: ["html"],
      reportsDirectory: "./reports/client/coverage",
    },
  },
});
