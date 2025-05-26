/* ==========================================================================
tests/e2e/mobile.spec.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { expect, test } from "@playwright/test";

test.describe("Mobile Tests", () => {
  // Skip WebKit for mobile tests if it's problematic
  test("should display the main description text on mobile", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") {
      test.skip(); // Skip WebKit if it's problematic
    }

    await page.setViewportSize({ width: 375, height: 667 }); // Mobile size (e.g., iPhone 6)

    // Add a small timeout before navigating to the page
    await page.waitForTimeout(1500); // Wait for 1.5 seconds

    await page.goto("/");

    // Wait for the page to load and for the title element to be available
    await page.waitForLoadState("domcontentloaded", { timeout: 60000 });
    await page.waitForSelector(
      'div.index-title1:has-text("Locking Down Networks")',
      { timeout: 60000 },
    );

    // Assert that the correct text is found inside the <div>
    const description = page.locator(
      'div.index-title1:has-text("Locking Down Networks")',
    );
    await expect(description).toBeVisible();
  });

  test("should display main content correctly on mobile", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") {
      test.skip(); // Skip WebKit if it's problematic
    }

    await page.setViewportSize({ width: 375, height: 667 }); // Mobile size

    // Add a small timeout before navigating to the page
    await page.waitForTimeout(1500); // Wait for 1.5 seconds

    await page.goto("/");

    // Wait for the page to load
    await page.waitForLoadState("domcontentloaded", { timeout: 60000 });

    // Check that the main heading is visible on mobile
    const mainHeading = page.locator("h1, h2");
    await expect(mainHeading).toBeVisible();
  });

  test("should ensure the 'about' link is clickable on mobile", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") {
      test.skip(); // Skip WebKit if it's problematic
    }

    await page.setViewportSize({ width: 375, height: 667 }); // Mobile size

    // Add a small timeout before navigating to the page
    await page.waitForTimeout(1500); // Wait for 1.5 seconds

    await page.goto("/");

    // Wait for the page to load
    await page.waitForLoadState("domcontentloaded", { timeout: 60000 });

    // Ensure the "about" link is visible and clickable
    const aboutLink = page.locator("a", { hasText: "about" });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Assert that it navigates to the correct route
    await expect(page).toHaveURL(/\/about/);
  });
});

// cspell:ignore domcontentloaded
