/* ==========================================================================
.lighthouserc.cjs

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

module.exports = {
  ci: {
    collect: {
      url: ["https://netwk.pro"],
      numberOfRuns: 1,
      settings: {
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
        disableFullPageScreenshot: true, // Optional: stabilizes viewer
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./.lighthouseci",
      reporter: ["html", "json"],
    },
  },
};
