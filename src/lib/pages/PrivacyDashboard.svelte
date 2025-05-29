<!-- ==========================================================================
src/lib/pages/PrivacyDashboard.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { getTrackingPreferences } from "$lib/utils/trackingStatus.js";
  /** @type {(type: 'enable' | 'disable') => void} */
  import {
    setTrackingPreference,
    clearTrackingPreferences,
  } from "$lib/utils/trackingCookies.js";

  /**
   * @type {string}
   * Style class for the div element.
   */
  const spaceStyle = "spacer";

  /**
   * URL to the full Privacy Policy using the base path
   * @type {string}
   */
  const privacyPolicy = `${base}/privacy`;
  const prightsLink = `${base}/privacy-rights`;

  /**
   * Constants used throughout the component for consistent styling and behavior
   * @type {{
   *   classSmall: string,
   *   rel: string,
   *   backTop: string,
   *   hrefTop: string,
   *   targetSelf: string,
   *   targetBlank: string
   * }}
   */
  const constants = {
    classSmall: "small-text",
    rel: "noopener noreferrer",
    backTop: "Back to top",
    hrefTop: "#top",
    targetSelf: "_self",
    targetBlank: "_blank",
  };

  let optedOut = false;
  let optedIn = false;
  let trackingStatus = "";

  onMount(() => {
    const prefs = getTrackingPreferences();
    optedOut = prefs.optedOut;
    optedIn = prefs.optedIn;
    trackingStatus = prefs.status;
    console.log("[Tracking] Status:", trackingStatus);
  });

  /**
   * Toggle tracking opt-out.
   * @param {boolean} value
   */
  function toggleTracking(value) {
    optedOut = value;
    if (optedOut) {
      console.log("[Tracking] User opted out");
      setTrackingPreference("disable");
    } else {
      console.log("[Tracking] User cleared opt-out");
      clearTrackingPreferences();
    }
  }

  /**
   * Toggle tracking opt-in.
   * @param {boolean} value
   */
  function toggleOptIn(value) {
    optedIn = value;
    if (optedIn) {
      console.log("[Tracking] User opted in");
      setTrackingPreference("enable");
    } else {
      console.log("[Tracking] User cleared opt-in");
      clearTrackingPreferences();
    }
  }
</script>

<section id="top">
  <span class={constants.classSmall}>
    <a
      rel={constants.rel}
      href="https://spdx.dev/learn/handling-license-info"
      target={constants.targetBlank}>
      SPDX License Identifier
    </a>: &nbsp;<code>CC-BY-4.0 OR GPL-3.0-or-later</code>
  </span>
</section>

<h1>Privacy Dashboard</h1>

<div class={spaceStyle}></div>

<h2>Take Control of Your Data</h2>

<nav class="tracking-nav">
  <ul>
    <li
      ><a href="#tracking" target={constants.targetSelf}>Tracking Preferences</a
      ></li>
    <li
      ><a href="#rights" target={constants.targetSelf}
        >Your Rights and Choices</a
      ></li>
  </ul>
</nav>

<p class="bquote">
  For full details, please see our <a href={privacyPolicy} target="_self"
    >Privacy Policy</a
  >.
</p>

<div class={spaceStyle}></div>

<hr />

<div class={spaceStyle}></div>

<section id="tracking">
  <h3>Tracking Preferences</h3>

  <p>
    <strong
      >Analytics tracking is automatically disabled when a user's browser sends
      a “Do Not Track” (DNT) or <a
        rel={constants.rel}
        href="https://globalprivacycontrol.org/"
        target={constants.targetBlank}
        >“Global Privacy Control” (GPC / Sec-GPC)</a> signal.</strong>
    No further action is required—your browser settings are honored by default.
  </p>

  <p>
    You can view your current tracking status below, along with manual opt-out
    and opt-in settings stored as browser cookies. These settings override any
    Do Not Track (DNT) or Global Privacy Control (GPC) signals. <strong
      >If you opt out, analytics tracking via PostHog is disabled entirely until
      you change your preference.</strong> Your selection will persist until manually
    updated.
  </p>

  &nbsp;

  <p id="tracking-status" aria-live="polite">
    <strong>Tracking Status:</strong>
    {trackingStatus}
  </p>

  <!-- Opt-out checkbox -->
  <label>
    <input
      type="checkbox"
      checked={optedOut}
      disabled={optedIn}
      aria-describedby="tracking-status"
      on:change={(e) =>
        toggleTracking(/** @type {HTMLInputElement} */ (e.target).checked)} />
    <strong>&nbsp;Disable analytics tracking (opt-out)</strong>
  </label>

  <br />

  <!-- Opt-in checkbox -->
  <label>
    <input
      type="checkbox"
      checked={optedIn}
      disabled={optedOut}
      aria-describedby="tracking-status"
      on:change={(e) =>
        toggleOptIn(/** @type {HTMLInputElement} */ (e.target).checked)} />
    <strong>&nbsp;Enable analytics tracking (opt-in)</strong>
  </label>

  <div class={spaceStyle}></div>

  <p>
    Analytics are used to understand how the site is used. No personally
    identifiable information is tracked.
  </p>
</section>

<span class={constants.classSmall}>
  <a href={constants.hrefTop} target={constants.targetSelf}
    >{constants.backTop}</a>
</span>

<div class={spaceStyle}></div>

<hr class="hr-styled" />

<div class={spaceStyle}></div>

<section id="rights">
  <h3>Your Rights and Choices</h3>

  <p> Under applicable state and federal law, you may have rights to: </p>

  <ul>
    <li
      ><strong>Access, update, or delete</strong> your personal information, subject
      to legal and contractual limitations.</li>
    <li
      ><strong>Restrict or object to processing</strong> under certain conditions,
      as permitted by law.</li>
    <li><strong>Opt out of direct marketing</strong></li>
  </ul>

  <p>
    To exercise these rights, please use our <a
      rel={constants.rel}
      href={prightsLink}
      target={constants.targetBlank}>Privacy Rights Request Form</a>
    or email us at <code>contact (at) s.neteng.pro</code>.
  </p>
</section>

<span class={constants.classSmall}>
  <a href={constants.hrefTop} target={constants.targetSelf}
    >{constants.backTop}</a>
</span>

<!-- cspell:ignore prefs prights -->
