/* ==========================================================================
.markdownlint.mjs

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import noSmartQuotes from './.md-smart-quotes.js';

export default {
  // Enable all default rules, then override below
  default: true,

  // Custom rule: disallow curly (smart) quotes
  customRules: [noSmartQuotes],

  // Rule exceptions
  MD060: false, // Pointless style enforcement — doesn't affect render output
  MD041: false, // First line in file should be a top-level header
  MD033: false, // Allow inline HTML
  MD013: false, // Ignore line length

  // Additional parser options
  options: {
    frontMatter: '^---\\n[\\s\\S]*?\\n---', // YAML front matter regex
  },

  // Rule-specific configurations
  MD007: { indent: 2 }, // Set consistent unordered list indentation (e.g., 2 spaces)
  MD029: { style: 'ordered' }, // Enforce consistent ordered list numbering
};
