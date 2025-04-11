/* =========================================================================
stylelint.config.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-alphabetical-order",
  ],
  rules: {
    "property-no-vendor-prefix": null,
    "selector-no-vendor-prefix": null,
    "selector-pseudo-element-colon-notation": [
      "double",
      {
        severity: "warning",
      },
    ],
    "media-feature-name-no-vendor-prefix": null,
    "font-family-no-duplicate-names": [
      true,
      {
        ignoreFontFamilyNames: ["monospace"],
      },
    ],
  },
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
};
