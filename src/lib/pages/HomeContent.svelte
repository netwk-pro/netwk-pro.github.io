<!-- ==========================================================================
src/lib/pages/HomeContent.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from '$app/paths';
  import { CONSTANTS } from '$lib';

  // Log the base path to verify its value
  //console.log("Base path:", base);

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { COMPANY_INFO, CONTACT, LINKS, PAGE, NAV } = CONSTANTS;

  /**
   * URL to the FOSS Spotlight page, using the base path
   * @type {string}
   */
  const spotlightLink = `${base}/foss`;

  /**
   * CSS class for the index headings.
   * @type {string}
   */
  const classIndex = 'index3';

  /**
   * CSS class for centered text.
   * @type {string}
   */
  const classCenter = 'center-text';

  /**
   * CSS class for large centered text.
   * @type {string}
   */
  const classLarge = 'large-text-center';
</script>

<!-- BEGIN HOME CONTENT -->
<h3 class={classIndex}>🔐 Security, with Intent</h3>

<p class={classCenter}>
  At <strong>{COMPANY_INFO.NAME}</strong>, we advance practical cybersecurity,
  resilient infrastructure, and digital privacy through hands-on research,
  real-world engineering, education, and advocacy.
</p>

<p class={classCenter}>
  Our work centers on understanding how systems behave in practice—building,
  testing, and operating secure environments to surface insights that are
  grounded in reality, not ideology. We believe effective security respects
  autonomy, scales responsibly, and is designed with purpose.
</p>

<p class={classCenter}>
  A core part of our mission is education and awareness. Through published
  research, technical writing, and community-focused content, we aim to make
  security and privacy concepts more accessible, transparent, and actionable for
  both technical and non-technical audiences.
</p>

<p class={classCenter}>
  Where there is strong alignment, we also apply this work through <strong
    >limited, selective consulting engagements</strong
  >, offering focused expertise in network security, infrastructure design, and
  privacy engineering.
</p>

<div class="spacer"></div>

<p class={classCenter}>
  📡 <strong>Stay informed</strong>.<br />
  <em>
    Follow our
    <a href={LINKS.BLOG} target={PAGE.SELF}>work</a> for research findings, practical
    guidance, and perspectives on security, infrastructure, and digital privacy—shared
    openly and grounded in real-world experience.
  </em>
</p>

&nbsp;

<h3 class="index4">Featured</h3>

<p class={classLarge}>
  <strong>
    <a href={LINKS.BLOG} target={PAGE.SELF}>{COMPANY_INFO.APP_NAME} Blog</a>
  </strong>
</p>

<p class={classLarge}>
  <strong>
    <a href={spotlightLink} target={PAGE.SELF}>FOSS Spotlight</a>
  </strong>
</p>

&nbsp;

<p class={classCenter}>
  <em>
    Join us on
    <a rel={PAGE.REL} href="https://discord.neteng.pro" target={PAGE.BLANK}
      >Discord</a>
    or in
    <a
      rel={PAGE.REL}
      href="https://github.com/netwk-pro/netwk-pro.github.io/discussions"
      target={PAGE.BLANK}>GitHub Discussions</a
    >!
  </em>
</p>
<!-- END HOME CONTENT -->
