/* ==========================================================================
scripts/testRedirects.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file testRedirects.js
 * @description Tests Netlify redirects against actual endpoints to verify
 * trailing-slash behavior.
 *
 * @module scripts/
 * @author SunDevil311
 * @updated 2025-07-01
 */

import https from 'https';
import { URL } from 'url';

/**
 * @typedef {object} RedirectTest
 * @property {string} from - The source URL to test.
 * @property {string} to - The expected destination URL.
 */

/** @type {RedirectTest[]} */
const urls = [
  { from: 'https://netwk.pro/privacy-policy', to: 'https://netwk.pro/privacy' },
  {
    from: 'https://netwk.pro/privacy-policy/',
    to: 'https://netwk.pro/privacy',
  },
  { from: 'https://netwk.pro/foss', to: 'https://netwk.pro/foss-spotlight' },
  { from: 'https://netwk.pro/foss/', to: 'https://netwk.pro/foss-spotlight' },
  {
    from: 'https://www.netwk.pro/foss',
    to: 'https://netwk.pro/foss-spotlight',
  },
];

/**
 * Tests a single redirect by making a GET request and checking the status code and location header.
 * @param {RedirectTest} redirect - The redirect configuration to test.
 * @returns {Promise<boolean>} - Resolves to true if the redirect is correct, false otherwise.
 */
function testRedirect({ from, to }) {
  return new Promise((resolve) => {
    const req = https.request(new URL(from), { method: 'GET' }, (res) => {
      const location = res.headers.location;
      const expectedPath = new URL(to).pathname;

      if (res.statusCode === 301 && location === expectedPath) {
        console.log(`✅ ${from} → ${location}`);
        resolve(true);
      } else {
        console.error(
          `❌ ${from} → Expected 301 to ${expectedPath}, got ${res.statusCode} to ${location}`,
        );
        resolve(false);
      }
    });

    req.on('error', (err) => {
      console.error(`❌ ${from} → Network error: ${err.message}`);
      resolve(false);
    });

    req.end();
  });
}

/**
 * Runs all redirect tests and exits the process with a status code reflecting success or failure.
 * @returns {Promise<void>}
 */
const runTests = async () => {
  const results = await Promise.all(urls.map(testRedirect));
  const failed = results.filter((r) => !r).length;
  process.exit(failed > 0 ? 1 : 0);
};

runTests();
