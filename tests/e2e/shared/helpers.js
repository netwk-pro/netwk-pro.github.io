/* ==========================================================================
tests/e2e/shared/helpers.js

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file helpers.js
 * @description Stores commonly used functions for importing into E2E tests.
 * @module tests/e2e/shared
 * @author Scott Lopez
 * @updated 2025-11-12
 */

import { expect } from '@playwright/test';

const DEBUG_LOGS = false; // set to true to enable console logs

/**
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<void>}
 * @description Sets desktop viewport and allows layout to settle.
 */
export async function setDesktopView(page) {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.waitForTimeout(1500); // Known-stable stabilization delay
}

/**
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<void>}
 */
export async function setMobileView(page) {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(1500);
}

/**
 * Navigate with desktop viewport + initial DOM load.
 * @param {import('@playwright/test').Page} page
 * @param {string} path
 */
export async function gotoDesktop(page, path = '/') {
  await setDesktopView(page);
  await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 60000 });
}

/**
 * Navigate with mobile viewport + initial DOM load.
 * @param {import('@playwright/test').Page} page
 * @param {string} path
 */
export async function gotoMobile(page, path = '/') {
  await setMobileView(page);
  await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 60000 });
}

/**
 * Returns the visible navigation region.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<import('@playwright/test').Locator>}
 */
export async function getVisibleNav(page) {
  const navHome = page.getByRole('navigation', { name: 'Homepage navigation' });
  const navMain = page.getByRole('navigation', { name: 'Main navigation' });

  const timeout = 5000;

  if (await navHome.isVisible({ timeout }).catch(() => false)) {
    if (DEBUG_LOGS) console.log('✅ Detected visible nav: Homepage navigation');
    return navHome;
  }

  if (await navMain.isVisible({ timeout }).catch(() => false)) {
    if (DEBUG_LOGS) console.log('✅ Detected visible nav: Main navigation');
    return navMain;
  }

  throw new Error('❌ No visible navigation element found within timeout.');
}

/**
 * @param {import('@playwright/test').Page} page
 * @returns {import('@playwright/test').Locator}
 */
export function getFooter(page) {
  return page.locator('footer');
}

/**
 * Clicks a locator and waits for a URL change (SPA-safe).
 * This avoids relying on navigation lifecycle events (load/domcontentloaded),
 * which can be flaky or aborted in SPA routing (notably in Firefox).
 *
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Locator} locator
 * @param {{ urlPattern?: RegExp, timeout?: number }} [options]
 * @returns {Promise<void>}
 */
export async function clickAndWaitForNavigation(page, locator, options = {}) {
  const { urlPattern = /\/.*/, timeout = 60000 } = options;

  await locator.scrollIntoViewIfNeeded();
  await locator.waitFor({ state: 'visible', timeout });

  const previousURL = page.url();

  await locator.click();

  // SPA-stable URL wait (polling) — does not depend on navigation lifecycle
  await expect(page).toHaveURL(urlPattern, { timeout });

  const newURL = page.url();
  console.log(`✅ Navigation from ${previousURL} → ${newURL}`);
}
