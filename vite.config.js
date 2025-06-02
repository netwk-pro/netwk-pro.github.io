/* =========================================================================
vite.config.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import lightningcssPlugin from "vite-plugin-lightningcss";

export default defineConfig({
  plugins: [
    sveltekit(),
    lightningcssPlugin({
      minify: process.env.NODE_ENV === "production",
      pruneUnusedFontFaceRules: true,
      pruneUnusedKeyframes: true,
      removeUnusedFontFaces: true,
      // Enables nesting support in Lightning CSS
      //drafts: {
      //  nesting: true
      //}
    }),
  ],
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
