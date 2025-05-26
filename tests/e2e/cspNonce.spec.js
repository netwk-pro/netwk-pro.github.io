/* ==========================================================================
tests/e2e/cspNonce.spec.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { expect, test } from "@playwright/test";

test("script tag does not include nonce when CSP nonce injection is disabled", async ({
  page,
}) => {
  await page.goto("/");

  // Select <script> tags with a nonce attribute
  const scriptWithNonce = await page.$("script[nonce]");

  // Check if any script tag has a nonce attribute
  expect(scriptWithNonce).toBeNull();
});
