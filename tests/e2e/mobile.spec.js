/* ==========================================================================
tests/e2e/mobile.spec.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

// @ts-check
import { expect, test } from "@playwright/test";

test.describe("Mobile Responsiveness", () => {
  // Test for correct title on mobile
  test("should display main content correctly on mobile", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") {
      test.skip(); // Skip WebKit if it's problematic
    }

    await page.setViewportSize({ width: 375, height: 667 }); // Mobile size (e.g., iPhone 6)
    await page.goto("/");

    // Wait for the title to be properly set (with extended timeout)
    await page.waitForSelector("title", { timeout: 30000 });

    // Assert the title matches
    await expect(page).toHaveTitle(/Locking Down Networks/);

    // Verify the main heading is visible
    const mainHeading = page.locator("h2");
    await expect(mainHeading).toBeVisible();
  });

  // Test for no overlapping content on mobile
  test("should ensure no overlapping content on mobile", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") {
      test.skip(); // Skip WebKit if it's problematic
    }

    await page.setViewportSize({ width: 375, height: 667 }); // Mobile size
    await page.goto("/");

    // Wait for the title to be properly set (with extended timeout)
    await page.waitForSelector("title", { timeout: 30000 });

    // Check that there are no overlapping elements
    const body = await page.locator("body").boundingBox();
    const header = await page.locator("header").boundingBox();

    if (body && header) {
      expect(header.y + header.height).toBeLessThanOrEqual(body.height);
    }
  });

  // Test for tappable links on mobile
  test("should ensure links are tappable on mobile", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") {
      test.skip(); // Skip WebKit if it's problematic
    }

    await page.setViewportSize({ width: 375, height: 667 }); // Mobile size
    await page.goto("/");

    // Wait for the title to be properly set (with extended timeout)
    await page.waitForSelector("title", { timeout: 30000 });

    // Ensure the "about" link is visible and clickable
    const aboutLink = page.locator("a", { hasText: "about" });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Assert that it navigates to the correct route
    await expect(page).toHaveURL(/\/about/);
  });
});
