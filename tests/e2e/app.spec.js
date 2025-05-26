/* ==========================================================================
tests/e2e/app.spec.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { expect, test } from "@playwright/test";

test.describe("Desktop Tests", () => {
  // Simplified Test for Title on Desktop
  test("should load successfully with the correct title", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") {
      test.skip(); // Skip WebKit if it's problematic
    }

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Wait for the title to be properly set (with extended timeout)
    await page.waitForSelector("title", { timeout: 30000 });

    // Assert that the title matches
    await expect(page).toHaveTitle(/Locking Down Networks/);
  });

  // Simplified Test for Navigation Bar
  test("should display the navigation bar and 'about' link", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Ensure the navigation bar is visible
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();

    // Check for 'about' route in the navigation
    const aboutLink = nav.locator("a", { hasText: "about" });
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveAttribute("href", "/about"); // Ensure it points to the correct route
  });

  // Simplified Footer Visibility Test
  test("should display the footer correctly", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Check that the footer is visible
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  // Simplified Test for Clickable Links (e.g., 'about' link)
  test("should ensure the 'about' link is clickable", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Ensure the "about" link is visible and clickable
    const aboutLink = page.locator("a", { hasText: "about" });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Assert that it navigates to the correct route
    await expect(page).toHaveURL(/\/about/);
  });
});

test.describe("Mobile Tests", () => {
  // Test for correct title on mobile
  test("should load successfully with the correct title on mobile", async ({
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

    // Assert that the title matches
    await expect(page).toHaveTitle(/Locking Down Networks/);
  });

  // Test for mobile content visibility
  test("should display main content correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile size
    await page.goto("/");

    // Check that the main heading is visible on mobile
    const mainHeading = page.locator("h1, h2");
    await expect(mainHeading).toBeVisible();
  });
});
