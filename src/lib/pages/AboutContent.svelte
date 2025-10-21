<!-- ==========================================================================
src/lib/pages/AboutContent.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { CONSTANTS, getQR, PGP_KEYS } from '$lib';
  import { base } from '$app/paths';

  // Log the base path to verify its value
  //console.log("Base path:", base);

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { COMPANY_INFO, CONTACT, PAGE } = CONSTANTS;
  const pgpKeys = PGP_KEYS.filter(
    (k) => k.id === 'pgp-support' || k.id === 'pgp-contact',
  );

  /**
   * URL to the Contact Form route, using the base path
   * @type {string}
   */
  const contactLink = `${base}/contact`;

  /**
   * URL to the Consultation route, using the base path
   * @type {string}
   */
  const consultLink = `${base}/consultation`;

  /**
   * URL to the Services route, using the base path
   * @type {string}
   */
  const servLink = `${base}/services`;

  /**
   * URL to the PGP route, using the base path
   * @type {string}
   */
  const pgpLink = `${base}/pgp`;

  /**
   * HTML attribute for async image decoding
   * @type {"async" | "sync" | "auto"}
   */
  const decoding = 'async';

  /**
   * HTML attribute for lazy loading images
   * @type {"lazy" | "eager"}
   */
  const loading = 'lazy';

  /**
   * CSS class for styled horizontal rule
   * @type {string}
   */
  const hrStyle = 'hr-styled';

  /**
   * Navigation links for the page
   * @type {Array<{
   *   label: string,
   *   href: string,
   *   target: string,
   *   text?: string
   * }>}
   */
  const navLinks = [
    {
      label: 'SPDX-License-Identifier',
      href: 'https://spdx.dev/learn/handling-license-info',
      target: PAGE.BLANK,
      text: 'CC-BY-4.0 OR GPL-3.0-or-later',
    },
    {
      label: 'Docs',
      href: 'https://docs.netwk.pro',
      target: PAGE.SELF,
    },
  ];

  /**
   * @typedef {Object} ContactAssets
   * @property {string} vcf - Path to the downloadable vCard file.
   * @property {string} [png] - PNG version of the vCard QR code.
   * @property {string} [webp] - WebP version of the vCard QR code.
   * @property {string} supportAsc - Path to the general support PGP key.
   * @property {string} contactAsc - Path to the secure contact PGP key.
   */

  /** @type {ContactAssets} */
  const contactAssets = {
    vcf: '/bin/contact.vcf',
    ...getQR('vcard'),
    supportAsc: '/pgp/support@netwk.pro.asc',
    contactAsc: '/pgp/contact@s.neteng.pro.asc',
  };

  $: supportFp = pgpKeys[0]?.fingerprint?.split(' ') ?? [];
  $: contactFp = pgpKeys[1]?.fingerprint?.split(' ') ?? [];
</script>

<!-- BEGIN TITLE -->
<section id="top">
  <span class="small-text">
    <a rel={PAGE.REL} href={navLinks[0].href} target={navLinks[0].target}>
      {navLinks[0].label}</a
    >: &nbsp;<code>{navLinks[0].text}</code>
  </span>
</section>

<section id="page-title">
  <h1>About {COMPANY_INFO.APP_NAME}&trade;</h1>
  <p>
    <strong>{COMPANY_INFO.NAME} ({COMPANY_INFO.APP_NAME}&trade;)</strong>
    <br />
    <em>Security, Networking, Privacy</em>
  </p>
</section>

<div class="spacer"></div>

<section id="subhead">
  <h2>Security That Respects You</h2>
</section>
<!-- END TITLE -->

<hr />

<!-- BEGIN ABOUT US -->
<p>
  <sup>
    <strong>Formats:</strong>&nbsp;
    <span class="visited">HTML</span> |
    <a href={navLinks[1].href} target={PAGE.BLANK}>{navLinks[1].label}</a>
  </sup>
</p>

<p>
  At <strong>{COMPANY_INFO.NAME} ({COMPANY_INFO.APP_NAME}&trade;)</strong>, we
  deliver network security and engineering, cybersecurity, and digital privacy
  consulting with clarity, credibility, and care. We believe that real security
  doesn't have to come at the cost of user autonomy, and that privacy-minded
  solutions can be both practical and powerful.
</p>

<p>
  Our approach is built on a simple principle:
  <strong>the best security is the one that fits.</strong> That means we don't
  push ideologies—we apply what works. We advocate for and implement
  <strong>free and open source solutions</strong>
  where they offer competitive functionality, control, and visibility. When proprietary
  platforms are better suited, we deploy them responsibly and securely—ensuring every
  recommendation is grounded in
  <strong>technical merit</strong>, <strong>scalability</strong>, and
  <strong>client goals</strong>.
</p>

<h3>What We Do</h3>
<p>
  As a remote-first consultancy, we support clients across industries and
  geographies with a focus on:
</p>

<ul>
  <li><strong>Network Hardening & Perimeter Defense</strong></li>
  <li><strong>Firewall Architecture & Policy Optimization</strong></li>
  <li><strong>Zero Trust Implementation</strong></li>
  <li><strong>Secure Infrastructure Design & Implementation</strong></li>
  <li><strong>Risk Reduction & Security Posture Assessment</strong></li>
</ul>

<p>
  Our consulting engagements range from tactical one-off solutions to strategic,
  long-term partnerships. Whether it's helping a business segment its internal
  network, lock down its cloud footprint, or plan scalable defenses—we deliver
  clear value, with zero fluff.
</p>

<div class="spacer"></div>

<p>
  Additionally, {COMPANY_INFO.APP_NAME}&trade; provides
  <a href={servLink} target={PAGE.SELF}>on-site services</a>
  in the Greater Phoenix Metropolitan Area (Maricopa County, AZ). Our
  <a href={servLink} target={PAGE.SELF}>on-site services</a> are available to both
  consumers and businesses. In addition to consulting, we offer the following services:
</p>

<ul>
  <li><strong>Home Modem Setup</strong></li>
  <li><strong>Basic Router Setup</strong></li>
  <li><strong>Wi-Fi and Wireless Networking Setup</strong></li>
  <li><strong>Network Troubleshooting</strong></li>
  <li><strong>Network Security Review</strong></li>
  <li><strong>Add a Wi-Fi Device</strong></li>
  <li><strong>Add or Configure a Printer</strong></li>
</ul>

<div class="spacer"></div>

<p>
  We also believe education is a core pillar of real-world security. That's why
  we invest in raising awareness—across both technical and general audiences—on
  best practices in digital privacy, secure design, and threat mitigation.
</p>

<p>
  At {COMPANY_INFO.APP_NAME}&trade;, we deliver robust, intentional solutions
  for individuals and organizations that prioritize integrity — without
  compromising agility or trust. We don't just protect infrastructure. We
  protect peace of mind.
</p>

<p>
  Ready to take the next step? <a href={contactLink} target={PAGE.BLANK}
    >Let's connect</a>
  to explore how we can help fortify your home or business.
  <a href={consultLink} target={PAGE.BLANK}
    >Schedule a free, initial consultation</a> today and discover what's possible.
</p>

<p>
  <strong>{COMPANY_INFO.NAME}</strong><br />
  📞 Phone: {CONTACT.PHONE}<br />
  📧 General Inquiries:
  <a href={`mailto:${CONTACT.EMAIL_LINK}`} target={PAGE.BLANK}>
    {CONTACT.EMAIL_LINK}
  </a><br />
  🔐 Secure Email:
  <a href={`mailto:${CONTACT.SECURE_LINK}`} target={PAGE.BLANK}>
    {CONTACT.SECURE_LINK}
  </a>
</p>

<div class="spacer"></div>

<hr class={hrStyle} />

<div class="spacer"></div>

<p>
  You can find our PGP keys and a downloadable vCard with contact information
  below. For a complete list of public keys, visit the <a
    href={pgpLink}
    target={PAGE.SELF}>dedicated PGP page</a
  >.
</p>

<!-- BEGIN PGP KEYS -->
<div class="pgp-wrap">
  <table class="pgp">
    <tbody>
      <!-- Row 0 (Support) -->
      <tr>
        <td class="pgp-col1">
          <picture>
            <source srcset={pgpKeys[0].webp} type="image/webp" />
            <img
              {decoding}
              {loading}
              src={pgpKeys[0].png}
              class="pgp-image"
              alt={`QR code for ${pgpKeys[0].email}`} />
          </picture>
        </td>
        <td class="pgp-col2">
          <p>
            <strong
              ><a rel={PAGE.REL} href={pgpKeys[0].opgp} target={PAGE.BLANK}>
                {pgpKeys[0].email}
              </a></strong>
          </p>
          <p>
            <a
              href={pgpKeys[0].file}
              type="application/pgp-keys"
              download
              target={PAGE.BLANK}>
              asc &nbsp;<span class="fas fa-file-arrow-down"></span>
            </a>
          </p>
          <p>
            <strong>Fingerprint:</strong><br />
            {#if supportFp.length}
              <span class="fingerprint">
                {supportFp.slice(0, supportFp.length / 2).join(' ')}<br />
                {supportFp.slice(supportFp.length / 2).join(' ')}
              </span>
            {/if}
          </p>
        </td>
      </tr>

      <!-- Row 1 (Secure Contact) -->
      <tr>
        <td class="pgp-col1">
          <p>
            <strong
              ><a rel={PAGE.REL} href={pgpKeys[1].opgp} target={PAGE.BLANK}>
                {pgpKeys[1].email}
              </a></strong>
          </p>
          <p>
            <a
              href={pgpKeys[1].file}
              type="application/pgp-keys"
              download
              target={PAGE.BLANK}>
              asc &nbsp;<span class="fas fa-file-arrow-down"></span>
            </a>
          </p>
          <p>
            <strong>Fingerprint:</strong><br />
            {#if contactFp.length}
              <span class="fingerprint">
                {contactFp.slice(0, contactFp.length / 2).join(' ')}<br />
                {contactFp.slice(contactFp.length / 2).join(' ')}
              </span>
            {/if}
          </p>
        </td>
        <td class="pgp-col2">
          <picture>
            <source srcset={pgpKeys[1].webp} type="image/webp" />
            <img
              {decoding}
              {loading}
              src={pgpKeys[1].png}
              class="pgp-image"
              alt={`QR code for ${pgpKeys[1].email}`} />
          </picture>
        </td>
      </tr>

      <!-- Row 2 (Third row) remains unchanged -->
      <tr>
        <td class="pgp-col1">
          <picture>
            {#if contactAssets.webp}
              <source srcset={contactAssets.webp} type="image/webp" />
            {/if}
            {#if contactAssets.png}
              <img
                {decoding}
                {loading}
                src={contactAssets.png}
                class="pgp-image"
                alt="vCard" />
            {/if}
          </picture>
        </td>
        <td class="pgp-col2">
          <strong>vCard</strong>
          <p>
            <a
              href={contactAssets.vcf}
              type="text/vcard"
              download
              target={PAGE.BLANK}>
              <strong
                >vcf &nbsp;<span class="fas fa-file-arrow-down"></span></strong>
            </a>
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<!-- END PGP KEYS -->
<!-- END ABOUT US -->
