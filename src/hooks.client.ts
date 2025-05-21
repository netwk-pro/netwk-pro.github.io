/* ==========================================================================
src/hooks.client.ts

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent default install prompt
  e.preventDefault();

  // Re-dispatch as a custom event so your component can respond
  window.dispatchEvent(new CustomEvent("pwa-install-available", { detail: e }));
});

export {};
