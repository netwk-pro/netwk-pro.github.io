/* ==========================================================================
src/lib/registerServiceWorker.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

/**
 * Registers the service worker and handles update lifecycle, install prompt, and
 * browser/environment compatibility checks. This supports offline usage and PWA behavior.
 */
export function registerServiceWorker() {
  const disableSW = window?.__DISABLE_SW__ || false;

  if (disableSW) {
    console.warn("⚠️ Service Worker registration disabled via diagnostic mode.");
    return;
  }

  if ('serviceWorker' in navigator) {
    // Skip registration in Firefox during development
    const isFirefox = navigator.userAgent.includes('Firefox');
    const isDevelopment =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (isFirefox && isDevelopment) {
      console.log('Service Worker registration skipped in Firefox development mode');
      return;
    }

    // Wait until after full page load for performance optimization
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);

          // Track installation of a new service worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('New service worker installing...');

            if (!newWorker) return;

            let updatePrompted = false;

            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller &&
                !updatePrompted
              ) {
                updatePrompted = true;

                // Custom prompt: ask user to reload for latest content
                if (confirm('New content is available. Reload to update?')) {
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });

      // Ensure the page reloads automatically when the new service worker takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });

      // Optional PWA install prompt logic
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('pwa-install-available', {
          detail: /** @type {BeforeInstallPromptEvent} */ (e)
        }));
      });
    });
  }
}
