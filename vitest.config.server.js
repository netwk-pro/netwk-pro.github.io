/* =========================================================================
vitest.config.server.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
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
    include: ["tests/unit/**/*.test.{js,mjs}"],
    exclude: ["tests/unit/**/*.svelte.test.{js,mjs}"],
    reporters: ["default", "json"],
    testTimeout: 10000,
    outputFile: {
      json: "./reports/server/results.json",
    },
    coverage: {
      provider: "v8",
      reporter: ["html"],
      reportsDirectory: "./reports/server/coverage",
    },
  },
  define: {
    __APP_NAME__: JSON.stringify("Network Pro"),
    __COPYRIGHT_YEAR__: JSON.stringify("2025"),
    __COMPANY__: JSON.stringify("Network Pro Strategies"),
    __CONTACT_EMAIL__: JSON.stringify("support (at) neteng.pro"),
    __SECURE_EMAIL__: JSON.stringify("contact (at) s.neteng.pro"),
    __PRIVACY_EMAIL__: JSON.stringify("privacy (at) netwk.pro"),
    __PHONE__: JSON.stringify("(623) 252-4350"),
  },
});
