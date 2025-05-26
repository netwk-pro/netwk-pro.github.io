/* ==========================================================================
tests/e2e/cspScripts.spec.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { test } from "@playwright/test";

test("diagnostic: list all <script> tags on page", async ({ page }) => {
  await page.goto("/");

  const scripts = await page.$$eval("script", (tags) =>
    tags.map((tag) => ({
      src: tag.src || "[inline]",
      type: tag.type || "default",
      hasNonce: tag.hasAttribute("nonce"),
    })),
  );

  console.log("🧪 Script tag summary:", scripts);
});
