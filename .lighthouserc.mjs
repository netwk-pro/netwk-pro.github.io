/* ==========================================================================
.lighthouserc.mjs

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/** @type {import('lighthouse').Config} */
const config = {
  ci: {
    collect: {
      url: ["https://netwk.pro"],
      settings: {
        onlyCategories: ["pwa"],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
    // Save local reports in both HTML and JSON
    output: ["html", "json"],
    outputPath: ".lighthouseci",
  },
};

export default config;
