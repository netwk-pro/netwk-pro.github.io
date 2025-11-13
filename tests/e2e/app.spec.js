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
 * @author Scott Lopez
 * @updated 2025-11-12
 */

import { expect, test } from '@playwright/test';
import {
  clickAndWaitForNavigation,
  getFooter,
  getVisibleNav,
  gotoDesktop,
  gotoMobile,
} from './shared/helpers.js';

// Root route should display nav bar and about link
test.describe('Desktop Tests', () => {
  test.setTimeout(90_000); // increase timeout for all desktop tests

  test("should display the navigation bar and 'about' link", async ({
    page,
  }) => {
    await gotoDesktop(page);

    const nav = await getVisibleNav(page);

    const aboutLink = nav.getByRole('link', { name: 'about' });
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toHaveAttribute('href', '/about');
  });

  // Root route should display the footer properly
  test('should display the footer correctly', async ({ page }) => {
    await gotoDesktop(page);

    const footer = getFooter(page);
    await expect(footer).toBeVisible();
  });

  // About route should display the footer properly
  test("should render the 'about' page with footer visible", async ({
    page,
  }) => {
    await gotoDesktop(page, '/about');

    const footer = getFooter(page);
    await expect(footer).toBeVisible();
  });

  // Root route should have a clickable "about" link
  test("should ensure the 'about' link is clickable", async ({ page }) => {
    await gotoDesktop(page);

    const nav = await getVisibleNav(page);
    const aboutLink = nav.getByRole('link', { name: 'about' });

    await clickAndWaitForNavigation(page, aboutLink, {
      urlPattern: /\/about/,
      timeout: 60000,
    });

    await expect(page).toHaveURL(/\/about/);
  });
}); // End Desktop Tests

// Root route should display headings properly on mobile
test.describe('Mobile Tests', () => {
  test('should display main content correctly on mobile', async ({ page }) => {
    await gotoMobile(page);

    // Ensure main headline is present on mobile
    const h2 = page.locator('h2.index-title2');
    await expect(h2).toContainText(/security/i);
  });
});
