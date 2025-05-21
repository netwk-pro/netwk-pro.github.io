/* ==========================================================================
tests/mobile.spec.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

// @ts-check
import { expect, test } from "@playwright/test";

test.describe("Mobile Responsiveness", () => {
  test("should display main content correctly on mobile", async ({ page }) => {
    // Simulate a mobile device
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // Wait for the correct title to appear (CSP-safe)
    await expect(page).toHaveTitle(/Locking Down Networks/);

    // Verify the main heading is visible
    const mainHeading = page.locator("h2");
    await expect(mainHeading).toHaveText(/Security \| Networking \| Privacy/);

    // Check that the layout adjusts properly
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();
  });

  test("should ensure no overlapping content on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // Wait for the correct title to appear (CSP-safe)
    await expect(page).toHaveTitle(/Locking Down Networks/);

    // Check that there are no overlapping elements
    const body = await page.locator("body").boundingBox();
    const header = await page.locator("header").boundingBox();

    if (body && header) {
      expect(header.y + header.height).toBeLessThanOrEqual(body.height);
    }
  });

  test("should ensure links are tappable", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    // Wait for the correct title to appear (CSP-safe)
    await expect(page).toHaveTitle(/Locking Down Networks/);

    // Check the "about" link is tappable and visible
    const aboutLink = page.locator("a", { hasText: "about" });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about/);
  });
});
