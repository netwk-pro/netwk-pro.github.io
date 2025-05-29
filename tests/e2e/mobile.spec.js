/* ==========================================================================
tests/e2e/mobile.spec.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file mobile.spec.js
 * @description Runs Playwright E2E tests with mobile assertions.
 * @module tests/e2e
 * @author SunDevil311
 * @updated 2025-05-29
 */

import { expect, test } from "@playwright/test";
import { getFooter, getVisibleNav, setMobileView } from "./shared/helpers.js";

// Mobile viewport smoke tests for the root route
test.describe("Mobile Tests", () => {
  test("should display the main description text on mobile", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") test.skip();

    await setMobileView(page);
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded", { timeout: 60000 });

    const description = page.locator(
      'div.index-title1:has-text("Locking Down Networks")',
    );
    await expect(description).toBeVisible();
  });

  test("should display main content correctly on mobile", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") test.skip();

    await setMobileView(page);
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded", { timeout: 60000 });

    const mainHeading = page.locator("h1, h2");
    await expect(mainHeading).toBeVisible();
  });

  test("should ensure the 'about' link is clickable on mobile", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") test.skip();

    await setMobileView(page);
    await page.goto("/");

    const nav = await getVisibleNav(page);
    const aboutLink = nav.getByRole("link", { name: "about" });
    await expect(aboutLink).toBeVisible({ timeout: 60000 });

    await aboutLink.click();
    await expect(page).toHaveURL(/\/about/);
  });

  test("should display the footer on /about (mobile)", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") test.skip();

    await setMobileView(page);
    await page.goto("/about");

    const footer = getFooter(page);
    await expect(footer).toBeVisible();
  });
});

// cspell:ignore domcontentloaded
