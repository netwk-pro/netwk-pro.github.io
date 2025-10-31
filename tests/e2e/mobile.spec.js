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
 * @updated 2025-10-21
 */

import { expect, test } from '@playwright/test';
import {
  clickAndWaitForNavigation,
  getFooter,
  getVisibleNav,
  setMobileView,
} from './shared/helpers.js';

// ---------------------------------------------------------------------------
// 📱 Mobile viewport smoke tests
// ---------------------------------------------------------------------------

test.describe('Mobile Tests', () => {
  // Increase timeout for all mobile tests
  test.setTimeout(90_000);

  // -------------------------------------------------------------------------
  // 🧱 Test 1: Main description text
  // -------------------------------------------------------------------------
  test('should display the main description text on mobile', async ({
    page,
    browserName,
  }) => {
    if (browserName === 'webkit') test.skip();

    await setMobileView(page);
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded', { timeout: 60_000 });

    const description = page.locator(
      'div.index-title1:has-text("Locking Down Networks")',
    );
    await expect(description).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // 🧱 Test 2: Main content
  // -------------------------------------------------------------------------
  test('should display main content correctly on mobile', async ({
    page,
    browserName,
  }) => {
    if (browserName === 'webkit') test.skip();

    await setMobileView(page);
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded', { timeout: 60_000 });

    const mainHeading = page.locator('h1, h2');
    await expect(mainHeading).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // 🧱 Test 3: "About" link navigation
  // -------------------------------------------------------------------------
  test("should ensure the 'about' link is clickable on mobile", async ({
    page,
    browserName,
  }) => {
    if (browserName === 'webkit') test.skip();

    await setMobileView(page);
    await page.goto('/', { waitUntil: 'networkidle' });

    const nav = await getVisibleNav(page);

    // Ensure the link exists before interacting
    await page.waitForSelector('a[href="/about"]', { timeout: 10_000 });
    const aboutLink = nav.getByRole('link', { name: 'about' });

    // Use the safe navigation helper
    await clickAndWaitForNavigation(page, aboutLink, {
      urlPattern: /\/about/,
      timeout: 60_000,
    });
  });

  // -------------------------------------------------------------------------
  // 🧱 Test 4: Footer presence on /about
  // -------------------------------------------------------------------------
  test('should display the footer on /about (mobile)', async ({
    page,
    browserName,
  }) => {
    if (browserName === 'webkit') test.skip();

    await setMobileView(page);
    await page.goto('/about');

    const footer = getFooter(page);
    await expect(footer).toBeVisible();
  });
});

// cspell:ignore domcontentloaded networkidle
