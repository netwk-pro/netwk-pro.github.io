<!-- ==========================================================================
src/lib/pages/AboutContent.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import {
    pgpContactPng,
    pgpContactWbp,
    pgpSupportPng,
    pgpSupportWbp,
    vcfPng,
    vcfWbp,
  } from '$lib';
  import { base } from '$app/paths';
  import { CONSTANTS } from '$lib';

  // Log the base path to verify its value
  //console.log("Base path:", base);

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { COMPANY_INFO, PAGE } = CONSTANTS;

  /**
   * URL to the Contact Form route, using the base path
   * @type {string}
   */
  const contactLink = `${base}/contact`;

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
      label: 'SPDX License Identifier',
      href: 'https://spdx.dev/learn/handling-license-info',
      target: '_blank',
      text: 'CC-BY-4.0 OR GPL-3.0-or-later',
    },
    {
      label: 'Docs',
      href: 'https://docs.netwk.pro',
      target: '_self',
    },
  ];

  /**
   * PGP key information for contact emails
   * @type {Array<{
   *   label: string,
   *   qrSrc: string,
   *   qrWbp: string,
   *   keySearch: string,
   *   fingerprint: string[]
   * }>}
   */
  const pgpKeys = [
    {
      label: 'support@neteng.pro',
      qrSrc: pgpSupportPng,
      qrWbp: pgpSupportWbp,
      keySearch: 'https://keys.openpgp.org/search?q=support%40neteng.pro',
      fingerprint: ['6590B992E2E3EFF12738', '7BCE2AF093E9DEC61BA0'],
    },
    {
      label: 'contact@s.neteng.pro',
      qrSrc: pgpContactPng,
      qrWbp: pgpContactWbp,
      keySearch: 'https://keys.openpgp.org/search?q=contact%40s.neteng.pro',
      fingerprint: ['DF118BAA6C2D9DCDEBDC', '2DDCF99373499495F957'],
    },
  ];

  /**
   * @typedef {Object} ContactAssets
   * @property {string} vcf
   * @property {string} qrSrc
   * @property {string} qrWbp
   * @property {string} supportAsc
   * @property {string} contactAsc
   */

  /** @type {ContactAssets} */
  const contactAssets = {
    vcf: '/bin/contact.vcf',
    qrSrc: vcfPng,
    qrWbp: vcfWbp,
    supportAsc: '/pgp/support@neteng.pro.asc',
    contactAsc: '/pgp/contact@s.neteng.pro.asc',
  };
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
    <em>Remote-First Cybersecurity & Privacy Consulting</em>
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
  deliver network security, cybersecurity, and digital privacy consulting with
  clarity, credibility, and care. We believe that real security doesn't have to
  come at the cost of user autonomy, and that privacy-minded solutions can be
  both practical and powerful.
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
  <li><strong>Cloud Security & Zero Trust Implementation</strong></li>
  <li><strong>Secure Infrastructure Design & Implementation</strong></li>
  <li><strong>Risk Reduction & Security Posture Assessment</strong></li>
</ul>

<p>
  Our consulting engagements range from tactical one-off solutions to strategic,
  long-term partnerships. Whether it's helping a business segment its internal
  network, lock down its cloud footprint, or plan scalable defenses—we deliver
  clear value, with zero fluff.
</p>

<p>
  We also believe education is a core pillar of real-world security. That's why
  we invest in raising awareness—across both technical and general audiences—on
  best practices in digital privacy, secure design, and threat mitigation.
</p>

<p>
  <strong
    >{COMPANY_INFO.APP_NAME}&trade; exists to bring strong, thoughtful security
    to organizations that value integrity—without sacrificing agility or trust.</strong>
  We don't just secure infrastructure. We secure confidence.
</p>

<div class="spacer"></div>

<p>
  <a href={contactLink} target={PAGE.BLANK}>Let's connect</a>
  to discuss how we can help secure and strengthen your business today.
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
      <!-- Row 0 (First row) remains unchanged -->
      <tr>
        <td class="pgp-col1">
          <picture>
            <source srcset={pgpKeys[0].qrWbp} type="image/webp" />
            <img
              {decoding}
              {loading}
              src={pgpKeys[0].qrSrc}
              class="pgp-image"
              alt={`PGP Key - ${pgpKeys[0].label}`} />
          </picture>
        </td>
        <td class="pgp-col2">
          <a rel={PAGE.REL} href={pgpKeys[0].keySearch} target={PAGE.BLANK}>
            <strong>{pgpKeys[0].label}</strong>
          </a>
          <p
            ><strong
              ><a
                href={contactAssets.supportAsc}
                type="application/pgp-keys"
                download
                target={PAGE.BLANK}
                >asc &nbsp;<span class="fas fa-file-arrow-down"></span></a
              ></strong>
          </p>
          <p
            >Fingerprint:<br />
            <span class="fingerprint">
              {pgpKeys[0].fingerprint.join('\n')}
            </span>
          </p>
        </td>
      </tr>

      <!-- Row 1 (Second row) has its columns swapped -->
      <tr>
        <td class="pgp-col1">
          <a rel={PAGE.REL} href={pgpKeys[1].keySearch} target={PAGE.BLANK}>
            <strong>{pgpKeys[1].label}</strong>
          </a>
          <p>
            <strong
              ><a
                href={contactAssets.contactAsc}
                type="application/pgp-keys"
                download
                target={PAGE.BLANK}
                >asc &nbsp;<span class="fas fa-file-arrow-down"></span></a
              ></strong>
          </p>
          <p
            >Fingerprint:<br />
            <span class="fingerprint">
              {pgpKeys[1].fingerprint.join('\n')}
            </span>
          </p>
        </td>
        <td class="pgp-col2">
          <picture>
            <source srcset={pgpKeys[1].qrWbp} type="image/webp" />
            <img
              {decoding}
              {loading}
              src={pgpKeys[1].qrSrc}
              class="pgp-image"
              alt={`PGP Key - ${pgpKeys[1].label}`} />
          </picture>
        </td>
      </tr>

      <!-- Row 2 (Third row) remains unchanged -->
      <tr>
        <td class="pgp-col1">
          <picture>
            <source srcset={contactAssets.qrWbp} type="image/webp" />
            <img
              {decoding}
              {loading}
              src={contactAssets.qrSrc}
              class="pgp-image"
              alt="vCard" />
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
