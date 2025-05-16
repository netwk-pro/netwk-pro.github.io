/* ==========================================================================
src/app.spec.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

// @ts-check
import { expect, test } from "@playwright/test";

test.describe("Desktop Tests", () => {
  // Test for correct title on desktop with partial match
  test("should load successfully with the correct title", async ({ page }) => {
    // Simulate a desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Wait for the title to be updated (not `%sveltekit.title%`)
    await page.waitForFunction(() => document.title !== "%sveltekit.title%");

    // Verify the page title contains the expected partial match
    const title = await page.title();
    expect(title).toContain("Locking Down Networks, Unlocking Confidence");
  });

  // Test for navigation bar visibility and "about" route
  test("should display the navigation bar with an 'about' route", async ({
    page,
  }) => {
    // Simulate a desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Check that the navigation bar is visible
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();

    // Check for the "about" route in the navigation bar
    const aboutLink = nav.locator("a", { hasText: "about" });
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveAttribute("href", "/about"); // Ensure it points to the correct route
  });

  // Test for footer visibility on desktop
  test("should display the footer correctly", async ({ page }) => {
    // Simulate a desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Verify the footer is visible
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  // Test for clickable links on desktop
  test("should ensure links are clickable", async ({ page }) => {
    // Simulate a desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Check the "about" link is visible and clickable
    const aboutLink = page.locator("a", { hasText: "about" });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about/);
  });
});
