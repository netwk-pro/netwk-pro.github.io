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

  // Verify test-mode allowances
  expect(cspHeader).toContain(
    "img-src 'self' data: https://px.ads.linkedin.com",
  );
  expect(cspHeader).toContain(
    "script-src 'self' 'unsafe-inline' https://snap.licdn.com",
  );

  // Ensure nonce-based policy is not mistakenly enforced
  expect(cspHeader).not.toContain("'nonce-");
});
