/* ==========================================================================
static/disableSw.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

if (location.search.includes("nosw")) {
  window.__DISABLE_SW__ = true;
  console.warn("🧪 Service worker disabled via ?nosw flag in URL.");
}
