<!-- ==========================================================================
src/lib/pages/AboutContent.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
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
  //const consultLink = `${base}/consultation`;

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
  <h1>About {COMPANY_INFO.APP_NAME}</h1>
  <p>
    <strong>{COMPANY_INFO.NAME} ({COMPANY_INFO.APP_NAME})</strong>
    <br />
    <em>Security, Networking, Privacy</em>
  </p>
</section>

<div class="spacer"></div>

<section id="subhead">
  <h2>Security, with Intent</h2>
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
  At <strong>{COMPANY_INFO.NAME} ({COMPANY_INFO.APP_NAME})</strong>, our work
  centers on advancing practical security, infrastructure resilience, and
  digital privacy through research, development, education, and advocacy.
</p>

<p>
  We design, operate, and study real-world systems with a focus on understanding
  how security works in practice—not just in theory. Our goal is to produce
  clear, credible guidance and tools that respect user autonomy, scale
  responsibly, and reflect the realities of modern infrastructure.
</p>

<p>
  Where appropriate, we also apply this work through limited consulting
  engagements, offering focused expertise in network security, cybersecurity,
  and privacy engineering for organizations seeking intentional, well-reasoned
  solutions.
</p>

<h3>What We Do</h3>

<p>
  {COMPANY_INFO.APP_NAME} is focused on internal research, development, education,
  and advocacy in the areas of network security, infrastructure design, and digital
  privacy.
</p>

<p>
  Our work centers on building and operating real-world systems, conducting
  exploratory and applied research, developing proof-of-concept environments,
  and publishing practical insights drawn from hands-on experience. These
  efforts inform the tools, guidance, and educational content we share with the
  broader community.
</p>

<p>
  We also offer <strong
    >limited consulting on a selective, case-by-case basis</strong
  >, typically aligned with our research focus areas, including:
</p>

<ul>
  <li>Network Hardening & Perimeter Defense</li>
  <li>Firewall Architecture & Policy Optimization</li>
  <li>Zero Trust Design Principles</li>
  <li>Secure Infrastructure Architecture</li>
  <li>Risk Reduction & Security Posture Assessment</li>
</ul>

<p>
  Rather than operating as a traditional consultancy, our engagement model
  prioritizes depth, intent, and alignment. Consulting work is approached as an
  extension of our internal projects and research—not as a volume-driven service
  offering.
</p>

<p>
  At Network Pro™, we believe strong security comes from understanding systems
  deeply, communicating clearly, and designing with purpose. Our goal is not
  scale for its own sake, but meaningful work that advances security practice,
  privacy awareness, and resilient infrastructure.
</p>

<div class="spacer"></div>

<p>
  Interested in our work or exploring a potential collaboration? <a
    href={contactLink}
    target={PAGE.BLANK}>Let's connect</a
  >.
</p>

<p>
  <strong>Network Pro Strategies, LLC</strong><br />
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

<hr class="hr-styled" />

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
