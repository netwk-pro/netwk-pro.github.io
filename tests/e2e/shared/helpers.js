/* ==========================================================================
tests/e2e/shared/helpers.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file helpers.js
 * @description Stores commonly used functions for importing into E2E tests.
 * @module tests/e2e/shared
 * @author Scott Lopez
 * @updated 2025-05-29
 */

/**
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @returns {Promise<void>}
 * @description Sets standard desktop viewport and waits for animations.
 */
export async function setDesktopView(page) {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.waitForTimeout(1500);
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
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @returns {Promise<import('@playwright/test').Locator>} - A visible navigation locator.
 * @throws {Error} If no visible navigation is found.
 */
export async function getVisibleNav(page) {
  const navHome = page.getByRole('navigation', { name: 'Homepage navigation' });
  const navMain = page.getByRole('navigation', { name: 'Main navigation' });

  if (await navHome.isVisible()) return navHome;
  if (await navMain.isVisible()) return navMain;

  throw new Error('No visible navigation element found.');
}

/**
 * @param {import('@playwright/test').Page} page
 * @returns {import('@playwright/test').Locator}
 */
export function getFooter(page) {
  return page.locator('footer');
}
