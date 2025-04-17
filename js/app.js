/*
  js/app.js

  SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
  This file is part of Network Pro.
*/

import { stringify } from "safe-stable-stringify";

/**
 * Sanitizes data for safe logging
 * @param {any} data - The data to sanitize
 * @returns {string} Sanitized string safe for logging
 */
export const sanitizeLogData = (data) => {
  if (data === null || data === undefined) {
    return "";
  }
  try {
    // If the data is an object, safely stringify it with depth limit
    const stringData =
      typeof data === "object" ? stringify(data, null, 2) : String(data);

    // Remove potentially dangerous characters
    return stringData
      .replace(/[\n\r\t]/g, " ") // Replace newlines and tabs with spaces
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim();
  } catch (error) {
    console.error("Error sanitizing log data:", error);

    if (error instanceof TypeError) {
      return "[Unable to sanitize log data: Invalid data type]";
    } else if (error instanceof RangeError) {
      return "[Unable to sanitize log data: Data exceeds size limits]";
    } else {
      return "[Unable to sanitize log data: " + error.message + "]";
    }
  }
};

// Service Worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.mjs")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// Polyfill for 'self' to ensure it is defined
(function (global) {
  const self = global.self || global;
  // Safely log the data
  console.log("Self context:", sanitizeLogData(self));
})(globalThis);
