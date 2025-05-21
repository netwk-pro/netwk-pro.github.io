/* =========================================================================
vitest.config.server.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { sveltekit } from "@sveltejs/kit/vite";
import lightningcssPlugin from "vite-plugin-lightningcss";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    sveltekit(),
    lightningcssPlugin({
      minify: process.env.NODE_ENV === "production",
      pruneUnusedFontFaceRules: true,
      pruneUnusedKeyframes: true,
      removeUnusedFontFaces: true,
    }),
  ],
  test: {
    name: "server",
    environment: "node",
    include: ["tests/unit/**/*.{test}.{js,mjs}"],
    exclude: ["tests/unit/**/*.svelte.{test}.{js,mjs}"],
    reporters: ["default", "json"],
    outputFile: {
      json: "./reports/server/results.json",
    },
    coverage: {
      provider: "v8",
      reporter: ["html"],
      reportsDirectory: "./reports/server/coverage",
    },
  },
});
