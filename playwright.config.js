/* ==========================================================================
playwright.config.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '*.spec.js',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all projects */
  use: {
    baseURL: 'http://localhost:4173', // Update to use preview server URL
    trace: 'on-first-retry',
    timeout: 60000, // Default action timeout of 60 seconds for each step
    navigationTimeout: 60000, // Timeout for navigation operations
  },

  /* Configure projects */
  projects: [
    // Desktop Browsers
    {
      name: 'chromium',
      use: {
        browserName: 'chromium', // Use Chromium browser
        headless: true, // Enable true headless mode
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'], // Use default Firefox settings
      },
    },
    // FIXME: Webkit and Safari consistently failing, disabled for now
    //    {
    //      name: "webkit",
    //      use: {
    //        ...devices["Desktop Safari"], // Use default WebKit settings
    //      },
    //    },

    // Mobile Browsers
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Galaxy S9+'], // Use the Galaxy S9+ device profile
        headless: true, // Enable true headless mode
      },
    },
    // FIXME: Webkit and Safari consistently failing, disabled for now
    //    {
    //      name: "Mobile Safari",
    //      use: {
    //        ...devices["iPhone 14"], // Use the iPhone 14 device profile
    //      },
    //    },
  ],

  /* Run your local preview server before starting the tests */
  webServer: {
    command: 'npm run preview', // Use preview server
    url: 'http://localhost:4173', // Match the preview server URL
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000, // wait up to 60 seconds for preview to be ready
  },
});
