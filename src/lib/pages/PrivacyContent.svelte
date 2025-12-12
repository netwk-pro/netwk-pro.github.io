<!-- ==========================================================================
src/lib/pages/PrivacyContent.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import {
    trackingPreferences,
    setOptIn,
    setOptOut,
    clearPrefs,
  } from '$lib/stores/trackingPreferences.js';
  import { CONSTANTS } from '$lib';

  const { COMPANY_INFO, CONTACT, PAGE, NAV } = CONSTANTS;

  /** @type {string} */
  const prightsLink = `${base}/privacy-rights`;

  /** @type {string} */
  const contactLink = `${base}/contact`;

  /** @type {string} */
  const pdashLink = `${base}/privacy-dashboard`;

  /** @type {string} */
  const privacyLink = 'https://docs.netwk.pro/privacy';

  /** @type {string} */
  const gpcLink = 'https://globalprivacycontrol.org/';

  /**
   * Table of Contents sections and their headings.
   * @type {{ id: string, text: string }[]}
   */
  const tocLinks = [
    { id: 'intro', text: 'Introduction' },
    { id: 'collect', text: 'Information We Collect' },
    { id: 'tracking', text: 'Web Analytics and Tracking' },
    { id: 'hcaptcha', text: 'Security & Anti-Abuse Measures (hCaptcha)' },
    { id: 'payment', text: 'Payment Information' },
    { id: 'use', text: 'Use of Information' },
    { id: 'legal', text: 'Legal Requests and Data Disclosure' },
    { id: 'security', text: 'Data Security' },
    { id: 'rights', text: 'User Rights' },
    { id: 'third-party', text: 'Third-Party Links' },
    { id: 'disclaimers', text: 'Disclaimers and Limitations' },
    { id: 'changes', text: 'Policy Changes' },
    { id: 'contact', text: 'Contact' },
  ];

  /** @type {string} */
  const effectiveDate = 'October 21, 2025';

  /** @type {string} */
  const classSmall = 'small-text';

  /** @type {boolean} */
  let optedOut;

  /** @type {boolean} */
  let optedIn;

  /** @type {string} */
  let trackingStatus;

  // Reactive assignments from the store
  $: ({ optedOut, optedIn, status: trackingStatus } = $trackingPreferences);

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
    console.log('[Tracking] Store initialized:', $trackingPreferences.status);
  });
</script>

<!-- BEGIN TITLE -->
<section id="top">
  <span class={classSmall}>
    <a
      rel={PAGE.REL}
      href="https://spdx.dev/learn/handling-license-info"
      target={PAGE.BLANK}>
      SPDX-License-Identifier
    </a>: &nbsp;<code>CC-BY-4.0 OR GPL-3.0-or-later</code>
  </span>
</section>

<section id="page-title">
  <h1>Privacy Policy</h1>
  <p>
    <strong>{COMPANY_INFO.NAME}</strong><br />
    <strong>Effective Date:</strong>
    {effectiveDate}
  </p>
</section>
<!-- END TITLE -->

&nbsp;

<!-- BEGIN PRIVACY POLICY -->
<h3>Table of Contents</h3>
<nav id="toc">
  <ol>
    {#each tocLinks as link}
      <li><a href={'#' + link.id}>{link.text}</a></li>
    {/each}
  </ol>
</nav>

<hr />

<section id="formats">
  <p>
    <sup>
      <strong>Formats Available:</strong> &nbsp;<span class="visited"
        >HTML</span>
      |
      <a href={privacyLink} target={PAGE.SELF}>Docs</a>
    </sup>
  </p>
</section>

<!-- POLICY SECTIONS -->
{#each tocLinks as link, i}
  <section id={link.id}>
    <h2>{i + 1}. {link.text}</h2>

    <!-- Dynamic Content for Each Section -->
    {#if link.id === 'intro'}
      <p>
        {COMPANY_INFO.NAME} ("Company," "we," "us," or "our") is committed to protecting
        the privacy of clients and website visitors. This Privacy Policy outlines
        how we collect, use, and safeguard your information when you interact with
        our website or services, consistent with applicable U.S. federal law and Arizona
        law, including Title 18, Chapter 5, Article 4 of the
        <strong>
          <a
            rel={PAGE.REL}
            href="https://www.azleg.gov/arstitle"
            target={PAGE.BLANK}>
            Arizona Revised Statutes
          </a>
        </strong> (A.R.S. §§ 18-551, 18-552).
      </p>
    {:else if link.id === 'collect'}
      <ul>
        <li>
          <strong>Personal Identifiers</strong> (e.g., name, email, phone number)
        </li>
        <li>
          <strong>Business and Professional Information</strong>
        </li>
        <li>
          <strong>Device/Technical Information</strong> (e.g., IP address, browser
          type, access logs)
        </li>
        <li>
          <strong>Client-Submitted Content</strong> related to our services
        </li>
      </ul>
    {:else if link.id === 'tracking'}
      <p>
        To better understand visitor behavior and optimize website
        functionality, we use <strong>PostHog Cloud</strong>, a hosted version
        of the open-source PostHog analytics platform. This tool helps us
        evaluate site performance and user engagement through the collection of
        non-personally identifiable technical data.
      </p>
      <p> PostHog Cloud may collect and process information such as: </p>
      <ul>
        <li>Pages visited and navigation behavior</li>
        <li>Device type, browser version, and operating system</li>
        <li>
          Time spent on pages and interaction events (e.g., clicks, scrolls)
        </li>
        <li>Referral URLs and outbound link activity</li>
        <li>General geolocation (approximate, based on IP address)</li>
      </ul>
      <p>
        We configure PostHog to prioritize user privacy. <strong
          >Analytics tracking is automatically disabled when a user's browser
          sends a "Do Not Track" (DNT) or <a
            rel={PAGE.REL}
            href={gpcLink}
            target={PAGE.BLANK}>"Global Privacy Control" (GPC / Sec-GPC)</a> signal.</strong>
        No further action is required—your browser settings are honored by default.
      </p>
      <p>
        You can view your current tracking status below, along with manual
        opt-out and opt-in settings stored as browser cookies. These settings
        override any Do Not Track (DNT) or Global Privacy Control (GPC) signals. <strong
          >If you opt out, analytics tracking via PostHog is disabled entirely
          until you change your preference.</strong> Your selection will persist until
        manually updated.
      </p>
      <p class="emphasis">
        For convenient access, you can manage these settings through our <a
          href={pdashLink}
          target={PAGE.SELF}>Privacy Dashboard</a
        >.
      </p>

      <div class="spacer"></div>

      <h3>Tracking Preferences</h3>

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
            on:change={(e) =>
              toggleTracking(
                /** @type {HTMLInputElement} */ (e.target).checked,
              )} />
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
              toggleOptIn(
                /** @type {HTMLInputElement} */ (e.target).checked,
              )} />
          <strong>&nbsp;Enable analytics tracking (opt-in)</strong>
        </label>
      </fieldset>

      <div class="spacer"></div>

      <p>
        PostHog Cloud is a third-party service, but we deploy it in a
        privacy-conscious manner that avoids intrusive profiling and aligns with
        data protection best practices. For more information, please refer to <a
          rel={PAGE.REL}
          href="https://posthog.com/privacy"
          target={PAGE.BLANK}>PostHog's Privacy Policy</a
        >.
      </p>
      <p>
        In addition to analytics tools, we also use security measures to protect
        our site from spam and abuse.
      </p>
    {:else if link.id === 'hcaptcha'}
      <p>
        We use the hCaptcha security service on certain forms and interactive
        features to protect our website from spam and automated abuse. When
        hCaptcha is active, it may collect information such as your IP address,
        browser characteristics, and user interaction data (for example, mouse
        movements or keystrokes) to distinguish human visitors from bots.
      </p>
      <p>
        This information is sent to Intuition Machines, Inc., the provider of
        hCaptcha, and is processed in accordance with their <a
          rel={PAGE.REL}
          href="https://www.hcaptcha.com/privacy"
          target={PAGE.BLANK}>Privacy Policy</a>
        and
        <a
          rel={PAGE.REL}
          href="https://www.hcaptcha.com/terms"
          target={PAGE.BLANK}>Terms of Service</a
        >.
      </p>
      <p>
        The use of hCaptcha is necessary to maintain the security, integrity,
        and availability of our services.
      </p>
    {:else if link.id === 'payment'}
      <p>
        When processing payments, we may collect credit card details and billing
        contact information. All credit card data is encrypted via TLS and
        shared only with PCI-compliant processors.
      </p>
    {:else if link.id === 'use'}
      <p>Information is used to:</p>
      <ul>
        <li><strong>Provide and improve services</strong></li>
        <li><strong>Respond to inquiries and fulfill contracts</strong></li>
        <li><strong>Conduct analytics and enhance user experience</strong></li>
        <li><strong>Ensure legal and regulatory compliance</strong></li>
      </ul>
    {:else if link.id === 'legal'}
      <p>
        We do not sell personal or business information. We disclose such data
        only when required by law, and under limited, clearly defined
        circumstances:
      </p>
      <ul>
        <li>
          <strong>Legal Compliance</strong>: We may disclose information in
          response to a valid legal process—such as a subpoena, court order, or
          other binding legal request issued under applicable law. We do not
          voluntarily provide user data to government entities or third parties
          without a legal obligation to do so.
        </li>
        <li>
          <strong>Review and Notice</strong>: Each request for user data is
          reviewed to ensure it is lawful, specific, and properly served. Unless
          prohibited by law, we will notify affected users before disclosing any
          information.
        </li>
        <li>
          <strong>Service Providers</strong>: We may share personal or business
          information with trusted third-party vendors who support essential
          business functions (e.g., payment processing, analytics, customer
          support). All such partnerships are governed by strict data protection
          terms and structured to uphold our core principles of
          <em>transparency and user privacy</em>.
        </li>
        <li>
          <strong>Business Transfers</strong>: In the event of a merger,
          acquisition, or sale of assets, personal and business information may
          be transferred
          <em>only if the receiving party provides written assurances</em> that: (a)
          the information will not be sold or misused, (b) it will be handled in a
          manner consistent with our privacy commitments, and (c) appropriate technical
          and contractual safeguards are in place to protect it.
        </li>
      </ul>
      <p>
        Our policy is to require proper legal documentation and to scrutinize
        all requests on a case-by-case basis. Outside these clearly defined
        situations, we do not share, sell, or otherwise provide access to user
        information.
      </p>
    {:else if link.id === 'security'}
      <p>
        We implement industry-standard security measures to protect your data.
        However, no method of transmission over the Internet or electronic
        storage is completely secure, and we cannot guarantee absolute security.
        In compliance with <strong>A.R.S. § 18-552</strong>, we will notify
        affected individuals in the event of a data breach involving personal
        information.
      </p>
    {:else if link.id === 'rights'}
      <h3>Your Rights and Choices</h3>

      <p
        ><em
          >We do not sell your personal information under any circumstances.</em
        ></p>
      <p>
        However, under applicable state, federal, and international privacy
        laws, you may have the right to:
      </p>

      <ul>
        <li>
          <strong>Access, correct, or delete</strong> your personal information, subject
          to legal and contractual limitations;
        </li>
        <li>
          <strong
            >Restrict or object to the processing of your personal data</strong>
          in certain circumstances, as permitted by law;
        </li>
        <li><strong>Opt out</strong> of direct marketing communications.</li>
      </ul>

      <p>
        Although these rights are specifically granted to residents of
        California and the European Union under laws such as the <a
          rel={PAGE.REL}
          href="https://oag.ca.gov/privacy/ccpa"
          target={PAGE.BLANK}>California Consumer Privacy Act (CCPA)</a
        >, the California Privacy Rights Act (CPRA), and the
        <a
          rel={PAGE.REL}
          href="https://gdpr.eu/what-is-gdpr/"
          target={PAGE.BLANK}>EU General Data Protection Regulation (GDPR)</a
        >, we voluntarily extend these rights to all users, regardless of
        residency.
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
    {:else if link.id === 'third-party'}
      <p>
        Our site may contain links to third-party sites. We are not responsible
        for their privacy practices.
      </p>
    {:else if link.id === 'disclaimers'}
      <p>
        {COMPANY_INFO.NAME} offers informational content as a public service. No warranties
        are made regarding the accuracy or completeness of such content. Consulting
        services are governed by separate contracts. We disclaim liability for third-party
        services integrated or referenced.
      </p>
    {:else if link.id === 'changes'}
      <p>
        We may update this policy periodically. Changes are effective upon
        posting.
      </p>
    {:else if link.id === 'contact'}
      <p>
        For questions, please utilize our <a
          href={contactLink}
          target={PAGE.BLANK}>Contact Form</a> or contact us directly:
      </p>
      <p>
        <strong>{COMPANY_INFO.NAME}</strong><br />
        📧 General Inquiries: {CONTACT.EMAIL}<br />
        🔐 Secure Email: {CONTACT.SECURE}<br />
        📞 Phone: {CONTACT.PHONE}
      </p>
    {/if}

    <!-- Back to Top Link -->
    <span class={classSmall}>
      <a href={NAV.HREFTOP}>{NAV.BACKTOP}</a>
    </span>
  </section>
{/each}
<!-- END POLICY SECTIONS -->
<!-- END PRIVACY POLICY -->

<!-- cspell:ignore prights prefs pdash -->
