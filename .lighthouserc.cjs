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
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "service-worker": ["error", { minScore: 1 }],
        "installable-manifest": ["error", { minScore: 1 }],
        "maskable-icon": "off",
        "splash-screen": "off",
        viewport: "off",
        "content-width": "off",
        "themed-omnibox": "off",
        // Disable general categories you don't care about
        "errors-in-console": "off",
        "inspector-issues": "off",
        "link-in-text-block": "off",
        "third-party-cookies": "off",
        "target-size": "off",
        "first-contentful-paint": "off",
        interactive: "off",
        "largest-contentful-paint": "off",
        "uses-long-cache-ttl": "off",
      },
    },
    output: ["html"],
    outputPath: ".lighthouseci",
  },
};

module.exports = config;
