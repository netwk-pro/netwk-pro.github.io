/* ==========================================================================
src/lib/registerServiceWorker.js

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    // Skip registration in Firefox during development
    const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;
    const isDevelopment = window.location.hostname === 'localhost' ||
                         window.location.hostname === '127.0.0.1';

    if (isFirefox && isDevelopment) {
      console.log('Service Worker registration skipped in Firefox development mode');
      return;
    }

    // Wait until after the page fully loads for better performance
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);

          // Track installation of new service worker
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

                // Custom prompt: reload to update
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

      // Ensure page reloads when new service worker takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  }
}
