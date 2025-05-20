/* ==========================================================================
.lighthouserc.cjs

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
      output: ["html"],
      outputPath: ".lighthouseci",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};

module.exports = config;
