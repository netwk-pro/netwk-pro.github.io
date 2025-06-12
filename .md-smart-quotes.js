/* ==========================================================================
.md-smart-quotes.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

export default {
  names: ['no-smart-quotes'],
  description: 'Disallow smart quotes (curly quotes)',
  information: new URL('https://github.com/DavidAnson/markdownlint'),
  tags: ['quotes', 'style'],
  function(params, onError) {
    const smartQuoteRegex = /[“”‘’]/g;

    params.tokens.forEach((token) => {
      if (token.type === 'inline' && smartQuoteRegex.test(token.content)) {
        const matches = [...token.content.matchAll(smartQuoteRegex)];
        matches.forEach((match) => {
          const index = match.index;
          onError({
            lineNumber: token.lineNumber,
            detail: `Smart quote (${match[0]}) detected`,
            range: [index + 1, 1],
          });
        });
      }
    });
  },
};
