<!-- ==========================================================================
src/lib/pages/HomeContent.svelte

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from "$app/paths";

  // Log the base path to verify its value
  console.log("Base path:", base);

  /**
   * URL to the FOSS Spotlight page, using the base path
   * @type {string}
   */
  const spotlightLink = `${base}/foss-spotlight`;

  /**
   * URL to the external blog
   * @type {string}
   */
  const blogLink = "https://blog.netwk.pro";

  /**
   * CSS class for the index headings.
   * @type {string}
   */
  const classIndex = "index3";

  /**
   * CSS class for centered text.
   * @type {string}
   */
  const classCenter = "center-text";

  /**
   * CSS class for large centered text.
   * @type {string}
   */
  const classLarge = "large-text-center";

  /**
   * Relation attribute for external links.
   * @type {string}
   */
  const rel = "noopener noreferrer";

  /**
   * Target attribute to open links in a new tab.
   * @type {string}
   */
  const targetBlank = "_blank";

  /**
   * Target attribute to open links in the same tab.
   * @type {string}
   */
  const targetSelf = "_self";
</script>

<!-- BEGIN HOME CONTENT -->
<h3 class={classIndex}>🔒 Practical Cybersecurity. Trusted Expertise.</h3>

<p class={classCenter}>
  At <strong>Network Pro&trade;</strong>, we specialize in network security,
  cybersecurity, and digital privacy consulting that meets today's real-world
  demands. Our remote-first approach combines technical depth with practical
  solutions—leveraging a strategic mix of open source and proprietary
  technologies based on performance, scalability, and trustworthiness.
</p>

<p class={classCenter}>
  From secure network design to cloud infrastructure and perimeter defense, we
  help organizations build stronger, smarter security postures—without
  compromising flexibility or transparency.
</p>

<p class={classCenter}>
  📡
  <em>
    <strong>Stay informed:</strong> Follow our
    <a href={blogLink} target={targetSelf}>blog</a>
    and social channels for actionable insights, implementation guides, and the latest
    cybersecurity developments.
  </em>
</p>

&nbsp;

<h3 class={classIndex}>Featured</h3>

<p class={classLarge}>
  <strong>
    <a href={blogLink} target={targetSelf}>Network Pro Blog</a>
  </strong>
</p>

<p class={classLarge}>
  <strong>
    <a href={spotlightLink} target={targetSelf}>FOSS Spotlight</a>
  </strong>
</p>

&nbsp;

<p class={classCenter}>
  <em>
    Join us on
    <a {rel} href="https://discord.neteng.pro" target={targetBlank}>Discord</a>
    or in
    <a
      {rel}
      href="https://github.com/netwk-pro/netwk-pro.github.io/discussions"
      target={targetBlank}>GitHub Discussions</a>
    !
  </em>
</p>
<!-- END HOME CONTENT -->
