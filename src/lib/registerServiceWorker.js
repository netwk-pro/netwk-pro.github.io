/* ==========================================================================
src/lib/registerServiceWorker.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

// cspell:ignore nosw beforeinstallprompt

/**
 * Registers the service worker and handles update lifecycle, install prompt,
 * and browser/environment compatibility checks. This supports offline usage
 * and PWA behavior.
 */
export function registerServiceWorker() {
  const disableSW = window?.__DISABLE_SW__ || location.search.includes('nosw');

  if (disableSW) {
    console.warn('⚠️ Service Worker registration disabled via diagnostic mode.');

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((reg) =>
          reg.unregister().then((success) => {
            console.log('🧹 SW unregistered from registerServiceWorker.js:', success);
          })
        );
      });
    }

    return;
  }

  if ('serviceWorker' in navigator) {
    const isFirefox = navigator.userAgent.includes('Firefox');
    const isDevelopment =
      location.hostname === 'localhost' || location.hostname === '127.0.0.1';

    if (isFirefox && isDevelopment) {
      console.log('🛑 SW registration skipped in Firefox development mode');
      return;
    }

    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service-worker.js')
        .then((registration) => {
          console.log('✅ Service Worker registered with scope:', registration.scope);

          // 🧼 Manual cleanup of unexpected caches
          caches.keys().then((keys) => {
            keys.forEach((key) => {
              if (!key.startsWith('cache-')) {
                console.log('🧹 Deleting unexpected cache:', key);
                caches.delete(key);
              }
            });
          });

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('[SW-CLIENT] New service worker installing...');

            if (!newWorker) return;

            let updatePrompted = false;

            newWorker.addEventListener('statechange', () => {
              console.log('[SW-CLIENT] New worker state:', newWorker.state);

              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller &&
                !updatePrompted
              ) {
                updatePrompted = true;
                console.log('[SW-CLIENT] New SW installed. Prompting user to reload.');
                if (confirm('New content is available. Reload to update?')) {
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
        });

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[SW-CLIENT] Controller changed.');
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });

      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        window.dispatchEvent(
          new CustomEvent('pwa-install-available', {
            detail: /** @type {BeforeInstallPromptEvent} */ (e),
          }),
        );
      });
    });
  }
}
