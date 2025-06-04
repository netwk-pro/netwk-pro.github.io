/* =========================================================================
vite.config.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import lightningcssPlugin from "vite-plugin-lightningcss";
import tsconfigPaths from "vite-tsconfig-paths"; // NEW: tsconfig/jsconfig alias support

export default defineConfig({
  plugins: [
    tsconfigPaths(), // Insert before sveltekit()
    sveltekit(),
    lightningcssPlugin({
      minify: process.env.NODE_ENV === "production",
      pruneUnusedFontFaceRules: true,
      pruneUnusedKeyframes: true,
      removeUnusedFontFaces: true,
    }),
  ],
});
