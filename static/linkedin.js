/* ==========================================================================
static/linkedin.js

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== */

// Wait for window load event for optimal performance
window.addEventListener("load", function () {
  // LinkedIn Partner ID
  window._linkedin_partner_id = "7223748";
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(window._linkedin_partner_id);

  // Initialize lintrk if not already initialized
  if (!window.lintrk) {
    window.lintrk = function (a, b) {
      window.lintrk.q.push([a, b]);
    };
    window.lintrk.q = [];
  }

  // Create and insert LinkedIn Insight script
  var s = document.getElementsByTagName("script")[0];
  var b = document.createElement("script");
  b.type = "text/javascript";
  b.async = true;
  b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  s.parentNode.insertBefore(b, s);
});

// cspell:ignore lintrk
