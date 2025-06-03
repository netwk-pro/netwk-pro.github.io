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
  import { CONSTANTS } from "$lib";

  // Log the base path to verify its value
  //console.log("Base path:", base);

  console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { CONTACT, PAGE, NAV } = CONSTANTS;

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

  /** @type {string} */
  const classSmall = "small-text";

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
  <span class={classSmall}>
    <a
      rel={PAGE.REL}
      href="https://spdx.dev/learn/handling-license-info"
      target={PAGE.BLANK}>
      SPDX License Identifier
    </a>: &nbsp;<code>CC-BY-4.0 OR GPL-3.0-or-later</code>
  </span>
</section>

<h1>Privacy Dashboard</h1>

<div class={spaceStyle}></div>

<h2>Take Control of Your Data</h2>

<nav class="tracking-nav">
  <ul>
    <li><a href="#tracking" target={PAGE.SELF}>Tracking Preferences</a></li>
    <li><a href="#rights" target={PAGE.SELF}>Your Rights and Choices</a></li>
  </ul>
</nav>

<p class="bquote">
  For full details, please see our <a href={privacyPolicy} target={PAGE.SELF}
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
        rel={PAGE.REL}
        href="https://globalprivacycontrol.org/"
        target={PAGE.BLANK}>“Global Privacy Control” (GPC / Sec-GPC)</a> signal.</strong>
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

<span class={classSmall}>
  <a href={NAV.HREFTOP} target={PAGE.SELF}>{NAV.BACKTOP}</a>
</span>

<div class={spaceStyle}></div>

<hr class="hr-styled" />

<div class={spaceStyle}></div>

<section id="rights">
  <h3>Your Rights and Choices</h3>

  <p
    ><em>We do not sell your personal information under any circumstances.</em
    ></p>
  <p>
    However, under applicable state, federal, and international privacy laws,
    you may have the right to:
  </p>

  <ul>
    <li>
      <strong>Access, correct, or delete</strong> your personal information, subject
      to legal and contractual limitations;
    </li>
    <li>
      <strong
        >Restrict or object to the processing of your personal data</strong> in certain
      circumstances, as permitted by law;
    </li>
    <li><strong>Opt out</strong> of direct marketing communications.</li>
  </ul>

  <p>
    Although these rights are specifically granted to residents of California
    and the European Union under laws such as the <a
      rel={PAGE.REL}
      href="https://oag.ca.gov/privacy/ccpa"
      target={PAGE.BLANK}>California Consumer Privacy Act (CCPA)</a
    >, the California Privacy Rights Act (CPRA), and the
    <a rel={PAGE.REL} href="https://gdpr.eu/what-is-gdpr/" target={PAGE.BLANK}
      >EU General Data Protection Regulation (GDPR)</a
    >, we voluntarily extend these rights to all users, regardless of residency.
  </p>
  <p>
    To exercise any of these rights, you may submit a request through our <a
      rel={PAGE.REL}
      href={prightsLink}
      target={PAGE.BLANK}>Privacy Rights Request Form</a
    >. Alternatively, you can email us at
    <strong>{CONTACT.PRIVACY}</strong>
    with the subject line: "<strong>Privacy Rights Preferences</strong>".
  </p>
</section>

<span class={classSmall}>
  <a href={NAV.HREFTOP} target={PAGE.SELF}>{NAV.BACKTOP}</a>
</span>

<!-- cspell:ignore prefs prights -->
