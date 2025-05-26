/* ==========================================================================
tests/e2e/cspHeader.spec.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { expect, test } from "@playwright/test";

test("CSP header includes relaxed directives in test mode", async ({
  page,
}) => {
  const response = await page.goto("/");

  // Fetch the response headers
  const cspHeader = response.headers()["content-security-policy"];
  console.log("🚨 CSP Header:", cspHeader); // ✅ DEBUG: Confirm test-mode CSP

  expect(cspHeader).toBeDefined();

  // Verify test-mode allowances (adjusted for your current CSP without LinkedIn)
  expect(cspHeader).toContain("img-src 'self' data:;"); // Allow images from self and data URIs
  expect(cspHeader).toContain("script-src 'self' 'unsafe-inline';"); // Allow inline scripts

  // Ensure nonce-based policy is not mistakenly enforced
  expect(cspHeader).not.toContain("'nonce-");
});
