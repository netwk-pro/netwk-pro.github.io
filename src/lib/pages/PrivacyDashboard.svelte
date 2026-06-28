<!-- ==========================================================================
src/lib/pages/PrivacyDashboard.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { resolve } from '$app/paths';
  import { onMount } from 'svelte';

  import {
    trackingPreferences,
    setOptIn,
    setOptOut,
    clearPrefs,
  } from '$lib/stores/trackingPreferences.js';

  import { CONSTANTS } from '$lib';

  const { CONTACT, PAGE, NAV } = CONSTANTS;

  /** @type {string} */
  const privacyPolicy = resolve('/privacy', {});

  /** @type {string} */
  const prightsLink = resolve('/privacy-rights', {});

  /** @type {string} */
  const trackingLink = resolve('/privacy-dashboard#tracking', {});

  /** @type {string} */
  const rightsLink = resolve('/privacy-dashboard#rights', {});

  /** @type {string} */
  const topLink = resolve('/privacy-dashboard#top', {});

  /** @type {boolean} */
  let optedOut = $derived($trackingPreferences.optedOut);

  /** @type {boolean} */
  let optedIn = $derived($trackingPreferences.optedIn);

  /** @type {string} */
  let trackingStatus = $derived($trackingPreferences.status);

  /**
   * Toggle tracking opt-out setting.
   * @param {boolean} value
   */
  function toggleTracking(value) {
    if (value) {
      console.log('[Tracking] User opted out');
      setOptOut();
    } else {
      console.log('[Tracking] User cleared opt-out');
      clearPrefs();
    }
  }

  /**
   * Toggle tracking opt-in setting.
   * @param {boolean} value
   */
  function toggleOptIn(value) {
    if (value) {
      console.log('[Tracking] User opted in');
      setOptIn();
    } else {
      console.log('[Tracking] User cleared opt-in');
      clearPrefs();
    }
  }

  onMount(() => {
    console.log(
      '[PrivacyDashboard] Tracking status:',
      $trackingPreferences.status,
    );
  });
</script>

<section id="top">
  <span class="small-text">
    <a
      rel={PAGE.REL}
      href="https://spdx.dev/learn/handling-license-info"
      target={PAGE.BLANK}>
      SPDX-License-Identifier
    </a>: &nbsp;<code>CC-BY-4.0 OR GPL-3.0-or-later</code>
  </span>
</section>

<h1>Privacy Dashboard</h1>

<div class="spacer"></div>

<h2>Take Control of Your Data</h2>

<nav class="tracking-nav">
  <ul>
    <li><a href={trackingLink} target={PAGE.SELF}>Tracking Preferences</a></li>
    <li><a href={rightsLink} target={PAGE.SELF}>Your Rights and Choices</a></li>
  </ul>
</nav>

<p class="bquote">
  For full details, please see our <a href={privacyPolicy} target={PAGE.SELF}
    >Privacy Policy</a
  >.
</p>

<div class="spacer"></div>

<hr />

<div class="spacer"></div>

<section id="tracking">
  <h3>Tracking Preferences</h3>

  <p>
    <strong
      >Analytics tracking is automatically disabled when a user's browser sends
      a "Do Not Track" (DNT) or <a
        rel={PAGE.REL}
        href="https://globalprivacycontrol.org/"
        target={PAGE.BLANK}>"Global Privacy Control" (GPC / Sec-GPC)</a> signal.</strong>
    No further action is required—your browser settings are honored by default.
  </p>

  <p>
    You can view your current tracking status below, along with manual opt-out
    and opt-in settings stored as browser cookies. These settings override any
    Do Not Track (DNT) or Global Privacy Control (GPC) signals. <strong
      >If you opt out, Matomo analytics tracking remains disabled.</strong> Your selection
    will persist until manually updated.
  </p>

  &nbsp;

  {#if trackingStatus && trackingStatus !== '⏳ Checking tracking preferences...'}
    <p id="tracking-status" aria-live="polite">
      <strong>Tracking Status:</strong>
      {trackingStatus}
    </p>
  {:else}
    <p id="tracking-status" aria-live="polite">
      <strong>Tracking Status:</strong> <em>Loading…</em>
    </p>
  {/if}

  <fieldset>
    <legend class="sr-only">Tracking Preference Controls</legend>

    <!-- Opt-out checkbox -->
    <label>
      <input
        type="checkbox"
        checked={optedOut}
        disabled={optedIn}
        aria-describedby="tracking-status"
        onchange={(e) =>
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
        onchange={(e) =>
          toggleOptIn(/** @type {HTMLInputElement} */ (e.target).checked)} />
      <strong>&nbsp;Enable analytics tracking (opt-in)</strong>
    </label>
  </fieldset>

  <div class="spacer"></div>

  <p>
    Analytics are collected through our Matomo instance only when tracking is
    enabled. When enabled, Matomo may receive pageview and limited event
    analytics, but we do not use it to identify individual users. IP addresses
    are partially masked before storage.
  </p>
</section>

<span class="small-text">
  <a href={topLink} target={PAGE.SELF}>{NAV.BACKTOP}</a>
</span>

<div class="spacer"></div>

<hr class="hr-styled" />

<div class="spacer"></div>

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
      href={prightsLink}
      target={PAGE.BLANK}>Privacy Rights Request Form</a
    >. Alternatively, you can email us at
    <strong
      ><a href={`mailto:${CONTACT.PRIVACY_LINK}`} target={PAGE.BLANK}
        >{CONTACT.PRIVACY_LINK}</a
      ></strong>
    with the subject line: "<strong>Privacy Rights Preferences</strong>".
  </p>
</section>

<span class="small-text">
  <a href={topLink} target={PAGE.SELF}>{NAV.BACKTOP}</a>
</span>

<!-- cspell:ignore prefs prights -->
