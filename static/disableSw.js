/* ==========================================================================
static/disableSw.js

Copyright c 2025-2026 Network Pro Strategies (Network ProT)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * @file disableSw.js
 * @description Allows for Service Worker to be disabled for debugging by appending ?nosw to the path.
 * @module static
 * @author Scott Lopez
 * @updated 2026-05-06
 */

if (location.search.includes('nosw')) {
  window.__DISABLE_SW__ = true;
  console.warn('[SW] Service worker disabled via ?nosw flag in URL.');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) =>
        Promise.all(
          registrations.map((registration) => registration.unregister()),
        ),
      )
      .then((results) => {
        console.warn('[SW] Service workers unregistered via ?nosw:', results);
      })
      .catch((err) => {
        console.warn('[SW] Service worker unregister failed via ?nosw:', err);
      });
  }

  if ('caches' in window) {
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then((results) => {
        console.warn('[SW] Caches cleared via ?nosw:', results);
      })
      .catch((err) => {
        console.warn('[SW] Cache cleanup failed via ?nosw:', err);
      });
  }
}
