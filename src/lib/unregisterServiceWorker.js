/* ==========================================================================
src/lib/unregisterServiceWorker.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Allows for manual toggling of the service worker
 * DEV USE ONLY
 * @internal
 */
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      if (registrations.length === 0) {
        console.log('🧼 No service workers to unregister.');
      } else {
        registrations.forEach((reg) => {
          console.log(`🧹 Unregistering SW: ${reg.scope}`);
          reg.unregister();
        });
      }
    });
  }
}
