<!-- ==========================================================================
src/lib/pages/PrivacyContent.svelte

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

  const { COMPANY_INFO, CONTACT, PAGE, NAV } = CONSTANTS;

  /**
   * URL to the Privacy Rights Request Form redirect route, using the base path
   * URL to the Contact Form redirect route, using the base path
   * URL to the Privacy Dashboard using the base path
   * @type {string}
   */
  const prightsLink = `${base}/privacy-rights`;
  const contactLink = `${base}/contact`;
  const pdashLink = `${base}/privacy-dashboard`;

  /**
   * URL to the privacy policy in Markdown format
   * External URL to the GPC website
   * @type {string}
   */
  const privacyLink = "https://docs.netwk.pro/privacy";
  const gpcLink = "https://globalprivacycontrol.org/";

  /**
   * Table of Contents Links
   * @type {{ id: string, text: string }[]}
   */
  const tocLinks = [
    { id: "intro", text: "Introduction" },
    { id: "collect", text: "Information We Collect" },
    { id: "tracking", text: "Web Analytics and Tracking" },
    { id: "payment", text: "Payment Information" },
    { id: "use", text: "Use of Information" },
    { id: "sharing", text: "Data Sharing" },
    { id: "security", text: "Data Security" },
    { id: "rights", text: "User Rights" },
    { id: "third-party", text: "Third-Party Links" },
    { id: "disclaimers", text: "Disclaimers and Limitations" },
    { id: "changes", text: "Policy Changes" },
    { id: "contact", text: "Contact" },
  ];

  /** @type {string} */
  const effectiveDate = "June 2, 2025";

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

<!-- BEGIN TITLE -->
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
      <li><a href={"#" + link.id}>{link.text}</a></li>
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
    {#if link.id === "intro"}
      <p>
        Network Pro Strategies ("Company," "we," "us," or "our") is committed to
        protecting the privacy of clients and website visitors. This Privacy
        Policy outlines how we collect, use, and safeguard your information when
        you interact with our website or services, consistent with applicable
        U.S. federal law and Arizona law, including Title 18, Chapter 5, Article
        4 of the
        <strong>
          <a
            rel={PAGE.REL}
            href="https://www.azleg.gov/arstitle"
            target={PAGE.BLANK}>
            Arizona Revised Statutes
          </a>
        </strong> (A.R.S. §§ 18-551, 18-552).
      </p>
    {:else if link.id === "collect"}
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
    {:else if link.id === "tracking"}
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
          until you change your preference.</strong> Your selection will persist
        until manually updated.
      </p>
      <p class="emphasis">
        For convenient access, you can manage these settings through our <a
          href={pdashLink}
          target={PAGE.SELF}>Privacy Dashboard</a
        >.
      </p>

      <div class="spacer"></div>

      <h3>Tracking Preferences</h3>
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
            toggleOptIn(/** @type {HTMLInputElement} */ (e.target).checked)} />
        <strong>&nbsp;Enable analytics tracking (opt-in)</strong>
      </label>

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
    {:else if link.id === "payment"}
      <p>
        When processing payments, we may collect credit card details and billing
        contact information. All credit card data is encrypted via TLS and
        shared only with PCI-compliant processors.
      </p>
    {:else if link.id === "use"}
      <p>Information is used to:</p>
      <ul>
        <li><strong>Provide and improve services</strong></li>
        <li><strong>Respond to inquiries and fulfill contracts</strong></li>
        <li><strong>Conduct analytics and enhance user experience</strong></li>
        <li><strong>Ensure legal and regulatory compliance</strong></li>
      </ul>
    {:else if link.id === "sharing"}
      <p>
        We do not sell personal information. However, we may share personal and
        business information under the following circumstances:
      </p>
      <ul>
        <li>
          <strong>With Service Providers:</strong> We may share your information
          with carefully selected third-party vendors. These providers support
          essential aspects of our operations&mdash;including, but not limited
          to, payment processing, data analytics, and customer support services.
          All such partnerships are structured to uphold our core principles of
          <em>transparency, self-hosting, and prioritizing user privacy</em> across
          all infrastructure and data flows.
        </li>
        <li>
          <strong>Legal Compliance:</strong> We may disclose information if required
          to do so by applicable law, regulation, legal process, or enforceable governmental
          request, including subpoenas or court orders.
        </li>
        <li>
          <strong>Business Transfers:</strong> In connection with a merger, acquisition,
          asset sale, or similar corporate transaction, we may disclose or transfer
          personal information, provided that reasonable steps are taken to ensure
          continued confidentiality and compliance with applicable privacy laws.
        </li>
      </ul>
    {:else if link.id === "security"}
      <p>
        We implement industry-standard security measures to protect your data.
        However, no method of transmission over the Internet or electronic
        storage is completely secure, and we cannot guarantee absolute security.
        In compliance with <strong>A.R.S. § 18-552</strong>, we will notify
        affected individuals in the event of a data breach involving personal
        information.
      </p>
    {:else if link.id === "rights"}
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
          <strong>Access, correct, or delete</strong> your personal information,
          subject to legal and contractual limitations;
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
          rel={PAGE.REL}
          href={prightsLink}
          target={PAGE.BLANK}>Privacy Rights Request Form</a
        >. Alternatively, you can email us at
        <strong>{CONTACT.PRIVACY}</strong>
        with the subject line: "<strong>Privacy Rights Preferences</strong>".
      </p>
    {:else if link.id === "third-party"}
      <p>
        Our site may contain links to third-party sites. We are not responsible
        for their privacy practices.
      </p>
    {:else if link.id === "disclaimers"}
      <p>
        Network Pro Strategies offers informational content as a public service.
        No warranties are made regarding the accuracy or completeness of such
        content. Consulting services are governed by separate contracts. We
        disclaim liability for third-party services integrated or referenced.
      </p>
    {:else if link.id === "changes"}
      <p>
        We may update this policy periodically. Changes are effective upon
        posting.
      </p>
    {:else if link.id === "contact"}
      <p>
        For questions, please utilize our <a
          rel={PAGE.REL}
          href={contactLink}
          target={PAGE.SELF}>Contact Form</a> or contact us directly:
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
