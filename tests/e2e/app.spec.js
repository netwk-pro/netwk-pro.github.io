/* ==========================================================================
tests/e2e/app.spec.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file app.spec.js
 * @description Runs Playwright E2E tests with desktop and root route assertions.
 * @module tests/e2e
 * @author SunDevil311
 * @updated 2025-05-29
 */

import { expect, test } from '@playwright/test';
import {
  getFooter,
  getVisibleNav,
  setDesktopView,
  setMobileView,
} from './shared/helpers.js';

// Root route should load successfully with the correct title
test.describe('Desktop Tests', () => {
  test('should load successfully with the correct title', async ({
    page,
    browserName,
  }) => {
    if (browserName === 'webkit') test.skip();

    await setDesktopView(page);
    await page.goto('/');
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveTitle(/Locking Down Networks/);
  });

  // Root route should display nav bar and about link
  test("should display the navigation bar and 'about' link", async ({
    page,
  }) => {
    await setDesktopView(page);
    await page.goto('/');

    const nav = await getVisibleNav(page);

    const aboutLink = nav.getByRole('link', { name: 'about' });
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveAttribute('href', '/about');
  });

  // Root route should display the footer properly
  test('should display the footer correctly', async ({ page }) => {
    await setDesktopView(page);
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  // About route should display the footer properly
  test("should render the 'about' page with footer visible", async ({
    page,
  }) => {
    await setDesktopView(page);
    await page.goto('/about');

    const footer = getFooter(page);
    await expect(footer).toBeVisible();
  });

  // Root route should have a clickable "about" link
  test("should ensure the 'about' link is clickable", async ({ page }) => {
    await setDesktopView(page);
    await page.goto('/');

    const nav = await getVisibleNav(page);

    const aboutLink = nav.getByRole('link', { name: 'about' });
    await expect(aboutLink).toBeVisible({ timeout: 60000 });
    await aboutLink.click();

    await page.waitForURL('/about', { timeout: 60000 });
    await expect(page).toHaveURL(/\/about/);
  });
}); // End Desktop Tests

// Root route should load successfully with the correct title (mobile)
test.describe('Mobile Tests', () => {
  test('should load successfully with the correct title on mobile', async ({
    page,
    browserName,
  }) => {
    if (browserName === 'webkit') test.skip();

    await setMobileView(page);
    await page.goto('/');
    await page.waitForLoadState('load', { timeout: 60000 });
    await expect(page).toHaveTitle(/Locking Down Networks/);
  });

  // Root route should display headings properly on mobile
  test('should display main content correctly on mobile', async ({ page }) => {
    await setMobileView(page);
    await page.goto('/');

    const mainHeading = page.locator('h1, h2');
    await expect(mainHeading).toBeVisible();
  });
});
