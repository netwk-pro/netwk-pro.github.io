/* ==========================================================================
tests/e2e/app.spec.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

import { expect, test } from "@playwright/test";

test.describe("Desktop Tests", () => {
  test("should load successfully with the correct title", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") test.skip();

    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(1500);
    await page.goto("/");
    await page.waitForLoadState("load", { timeout: 60000 });
    await expect(page).toHaveTitle(/Locking Down Networks/);
  });

  test("should display the navigation bar and 'about' link", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(1500);
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Homepage navigation" });
    await expect(nav).toBeVisible();

    const aboutLink = nav.getByRole("link", { name: "about" });
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveAttribute("href", "/about");
  });

  test("should display the footer correctly", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(1500);
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("should ensure the 'about' link is clickable", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Homepage navigation" });
    await expect(nav).toBeVisible({ timeout: 60000 });

    const aboutLink = nav.getByRole("link", { name: "about" });
    await expect(aboutLink).toBeVisible({ timeout: 60000 });
    await aboutLink.click();

    await page.waitForURL("/about", { timeout: 60000 });
    await expect(page).toHaveURL(/\/about/);
  });
}); // End Desktop Tests

test.describe("Mobile Tests", () => {
  test("should load successfully with the correct title on mobile", async ({
    page,
    browserName,
  }) => {
    if (browserName === "webkit") test.skip();

    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1500);
    await page.goto("/");
    await page.waitForLoadState("load", { timeout: 60000 });
    await expect(page).toHaveTitle(/Locking Down Networks/);
  });

  test("should display main content correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1500);
    await page.goto("/");

    const mainHeading = page.locator("h1, h2");
    await expect(mainHeading).toBeVisible();
  });
});
