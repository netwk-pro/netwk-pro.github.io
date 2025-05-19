/* ==========================================================================
.lighthouserc.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

module.exports = {
  ci: {
    collect: {
      staticDistDir: "./build", // optional if running against local static site
      url: ["https://netwk.pro"], // you can add more pages later
      startServerCommand: "npm run preview", // optional for local runs
      settings: {
        onlyCategories: ["pwa"],
        emulatedFormFactor: "mobile",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "categories:pwa": ["warn", { minScore: 0.9 }],
        // optional: prevent regressions in installability, etc.
        "service-worker": "warn",
        "installable-manifest": "warn",
      },
    },
  },
};
