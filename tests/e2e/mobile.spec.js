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
 * @author Scott Lopez
 * @updated 2025-11-12
 */

import { expect, test } from '@playwright/test';
import {
  clickAndWaitForNavigation,
  getFooter,
  getVisibleNav,
  gotoMobile,
} from './shared/helpers.js';

// ---------------------------------------------------------------------------
// 📱 Mobile viewport smoke tests
// ---------------------------------------------------------------------------

test.describe('Mobile Tests', () => {
  test.setTimeout(90_000);

  test.beforeEach(({ browserName }) => {
    if (browserName === 'webkit')
      test.skip('Skipping WebKit: manual validation only');
  });

  // -------------------------------------------------------------------------
  // 🧱 Test 1: Main description text
  // -------------------------------------------------------------------------
  test('should display the main description text on mobile', async ({
    page,
  }) => {
    await gotoMobile(page);

    const description = page.locator(
      'div.index-title1:has-text("Locking Down Networks")',
    );
    await expect(description).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // 🧱 Test 2: Main content
  // -------------------------------------------------------------------------
  test('should display main content correctly on mobile', async ({ page }) => {
    await gotoMobile(page);

    const mainHeading = page.locator('h2.index-title2');
    await expect(mainHeading).toContainText(/security/i);
  });

  // -------------------------------------------------------------------------
  // 🧱 Test 3: "About" link navigation
  // -------------------------------------------------------------------------
  test("should ensure the 'about' link is clickable on mobile", async ({
    page,
  }) => {
    await gotoMobile(page);

    const nav = await getVisibleNav(page);
    const aboutLink = nav.getByRole('link', { name: 'about' });

    await clickAndWaitForNavigation(page, aboutLink, {
      urlPattern: /\/about/,
      timeout: 60_000,
    });

    await expect(page).toHaveURL(/\/about/);
  });

  // -------------------------------------------------------------------------
  // 🧱 Test 4: Footer presence on /about
  // -------------------------------------------------------------------------
  test('should display the footer on /about (mobile)', async ({ page }) => {
    await gotoMobile(page, '/about');

    const footer = getFooter(page);
    await expect(footer).toBeVisible();
  });
});
