/* ==========================================================================
playwright.config.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================= */

// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "*.spec.js",

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  /* Shared settings for all projects */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:5173",

    /* Collect trace when retrying the failed test. */
    trace: "on-first-retry",
  },

  /* Configure projects */
  projects: [
    // Desktop Browsers
    {
      name: "chromium",
      use: {
        browserName: "chromium", // Use Chromium browser
        headless: true, // Enable true headless mode
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"], // Use default Firefox settings
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"], // Use default WebKit settings
      },
    },

    // Mobile Browsers
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Galaxy S9+"], // Use the Galaxy S9+ device profile
        headless: true, // Enable true headless mode
      },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 14"], // Use the iPhone 14 device profile
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
