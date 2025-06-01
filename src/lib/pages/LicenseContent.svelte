<!-- ==========================================================================
src/lib/pages/LicenseContent.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<!-- cspell:ignore lmaterial lterms dlnotes -->

<script>
  import { base } from "$app/paths";
  import { ccSvg, bySvg } from "$lib";

  // Log the base path to verify its value
  //console.log("Base path:", base);

  /**
   * URLs using the base path
   * @type {string}
   */
  const homeLink = base || "/";
  const contactLink = `${base}/contact`;

  /**
   * Icons for Creative Commons
   * @type {string}
   */
  const ccSrc = ccSvg;
  const bySrc = bySvg;

  /**
   * URL to the internal MkDocs documentation
   * @type {string}
   */
  const legalLink = "https://docs.netwk.pro/legal";

  /**
   * Table of Contents Links
   * @type {{ id: string, text: string }[]}
   */
  const tocLinks = [
    { id: "copyright", text: "Copyright" },
    { id: "trademark", text: "Trademark Ownership" },
    { id: "branding", text: "Restrictions on Branding and Graphics" },
    { id: "lmaterial", text: "Licensed Material Definition" },
    { id: "lterms", text: "License Terms" },
    { id: "dlnotes", text: "Dual Licensing Notes" },
    { id: "cc-by", text: "Creative Commons License (CC BY 4.0)" },
    { id: "gnu-gpl", text: "GNU General Public License (GPL)" },
    { id: "third-party", text: "Third-Party Code and Licenses" },
    { id: "prohibited-uses", text: "Prohibited Uses" },
    { id: "disclaimer", text: "Modifications and Liability Disclaimer" },
    { id: "authoritative", text: "Authoritative Version Clause" },
    { id: "revisions", text: "Revisions" },
    { id: "contact", text: "Contact" },
  ];

  /**
   * Constants for reusable content
   * @type {{ company: string, effectiveDate: string, classSmall: string, rel: string, hrefTop: string, targetBlank: string, targetSelf: string }}
   */
  const constants = {
    company: "Network Pro Strategies",
    effectiveDate: "May 28, 2025",
    classSmall: "small-text",
    rel: "noopener noreferrer",
    hrefTop: "#top",
    targetBlank: "_blank",
    targetSelf: "_self",
  };
</script>

<!-- BEGIN TITLE -->
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

<section id="page-title">
  <h1>Legal, Copyright, and Licensing</h1>
  <p>
    <strong>{constants.company}</strong><br />
    <strong>Effective Date:</strong>
    {constants.effectiveDate}
  </p>
</section>
<!-- END TITLE -->

&nbsp;

<!-- BEGIN LEGAL, LICENSING, AND COPYRIGHT -->
<nav id="toc">
  <h3>Table of Contents</h3>
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
      <a href={legalLink} target={constants.targetSelf}>Docs</a>
    </sup>
  </p>
</section>

<!-- POLICY SECTIONS -->
{#each tocLinks as link, i}
  <section id={link.id}>
    <h2>{i + 1}. {link.text}</h2>

    {#if link.id === "copyright"}
      <p>
        All content—including text, software, logos, graphics, documentation,
        and other materials—provided by
        <strong>{constants.company}</strong> (“Network Pro”, “Company”, “Licensor”)
        is protected by U.S. and international copyright laws.
      </p>
      <p>
        Copyright &copy; 2025
        <strong>
          <a href={homeLink} target={constants.targetBlank}>
            Network Pro Strategies
          </a>
        </strong>
        (Network Pro&trade;)
      </p>
    {:else if link.id === "trademark"}
      <p>The following trademarks are the exclusive property of the Company:</p>
      <ul>
        <li><strong>Brand Name:</strong> Network Pro&trade;</li>
        <li><strong>Domain Names:</strong> netwk.pro, neteng.pro, neteng.cc</li>
        <li
          ><strong>Logo:</strong> The shield logo displayed on our homepage</li>
        <li
          ><strong>Slogan:</strong> "Locking Down Networks, Unlocking Confidence&trade;"</li>
      </ul>
      <p
        >Unauthorized use—including use likely to cause confusion,
        misrepresentation, or disparagement—is strictly prohibited.</p>
    {:else if link.id === "branding"}
      <p>
        Licensing under CC BY 4.0 or the GNU GPL <strong
          >expressly excludes</strong> any rights to use the Company's trademarks,
        trade dress, logos, visual branding, or other proprietary identifiers.
      </p>
      <p>
        <strong
          >Such elements are not part of the Licensed Material and remain the
          exclusive property of the Company.</strong>
        Any use of these elements—including within derivative works or promotional
        content—requires the Company's
        <strong>prior written consent</strong>.
      </p>
    {:else if link.id === "lmaterial"}
      <p>
        “Licensed Material” refers solely to the publicly available code and
        documentation distributed through the Company's open repositories and
        websites. It expressly excludes all third-party content, proprietary
        brand assets (including logos, trademarks, and visual designs), and any
        internal or commercial backend systems.
      </p>
      <p>
        For clarity, the Company itself is not licensed under, nor subject to,
        the terms of the open-source or content licenses described in this
        document.
      </p>
    {:else if link.id === "lterms"}
      <p>This work is dual-licensed under:</p>
      <ul>
        <li>
          <a href="#cc-by"
            >Creative Commons Attribution 4.0 International (CC BY 4.0)</a>
        </li>
        <li>
          <a href="#gnu-gpl"
            >GNU General Public License v3.0 or later (GNU GPL)</a>
        </li>
      </ul>
    {:else if link.id === "dlnotes"}
      <ul>
        <li>
          You may choose to use the work under either license, or both where
          appropriate.
        </li>
        <li>
          See Creative Commons FAQ:
          <a
            rel={constants.rel}
            href="https://creativecommons.org/faq/#can-i-enter-into-separate-or-supplemental-agreements-with-users-of-my-work"
            target={constants.targetBlank}>
            Separate agreements
          </a>
        </li>
        <li>
          See GPL compatibility:
          <a
            rel={constants.rel}
            href="https://www.gnu.org/licenses/gpl-faq.html#WhatDoesCompatMean"
            target={constants.targetBlank}>
            GPL FAQ
          </a>
        </li>
      </ul>
    {:else if link.id === "cc-by"}
      <p class={constants.classSmall}>
        Download:
        <a
          href="/assets/license/CC-BY-4.0.html"
          download
          target={constants.targetBlank}>HTML</a>
        |
        <a
          href="/assets/license/CC-BY-4.0.md"
          download
          target={constants.targetBlank}>Markdown</a>
        |
        <a
          href="/assets/license/CC-BY-4.0.txt"
          download
          target={constants.targetBlank}>Text</a>
        |
        <a
          href="/assets/license/CC-BY-4.0-rdfa.xml"
          download
          target={constants.targetBlank}>RDFa</a>
        |
        <a
          href="/assets/license/CC-BY-4.0.xml"
          download
          target={constants.targetBlank}>XMP</a>
      </p>

      <p>
        Network Pro&trade; (the "Licensed Material") is licensed under
        <strong>Creative Commons Attribution 4.0 International</strong> (CC BY
        4.0)
        <a
          rel={constants.rel}
          href="https://creativecommons.org/licenses/by/4.0/"
          target={constants.targetBlank}>
          <img
            decoding="async"
            loading="lazy"
            style="
              display: inline-block;
              height: 18px !important;
              margin-left: 3px;
              text-decoration: none;
              vertical-align: text-bottom;
            "
            src={ccSrc}
            alt="Creative Commons BY" />
        </a>
        <a
          rel={constants.rel}
          href="https://creativecommons.org/licenses/by/4.0/"
          target={constants.targetBlank}>
          <img
            decoding="async"
            loading="lazy"
            style="
              display: inline-block;
              height: 18px !important;
              margin-left: 3px;
              text-decoration: none;
              vertical-align: text-bottom;
            "
            src={bySrc}
            alt="Creative Commons BY" />
        </a>.
      </p>

      <p>
        Per the terms of the License, you are free to distribute, remix, adapt,
        and build upon the Licensed Material for any purpose, even commercially.
        You must give appropriate credit, provide a link to the License, and
        indicate if changes were made.
      </p>

      <p>
        Permissions beyond the scope of this License—or instead of those
        permitted by this License—may be available as further defined within
        this document.
      </p>

      <code class="block">
        <p>
          SPDX Reference:<br />
          <a
            rel={constants.rel}
            href="https://spdx.org/licenses/CC-BY-4.0.html"
            target={constants.targetBlank}>
            https://spdx.org/licenses/CC-BY-4.0.html
          </a>
        </p>

        <p>
          Canonical URL:<br />
          <a
            rel={constants.rel}
            href="https://creativecommons.org/licenses/by/4.0/"
            target={constants.targetBlank}>
            https://creativecommons.org/licenses/by/4.0/
          </a>
        </p>
      </code>
    {:else if link.id === "gnu-gpl"}
      <p class={constants.classSmall}>
        Download:
        <a
          href="/assets/license/COPYING.html"
          download
          target={constants.targetBlank}>HTML</a>
        |
        <a
          href="/assets/license/COPYING.md"
          download
          target={constants.targetBlank}>Markdown</a>
        |
        <a
          href="/assets/license/COPYING.txt"
          download
          target={constants.targetBlank}>Text</a>
        |
        <a
          href="/assets/license/COPYING-rdfa.xml"
          download
          target={constants.targetBlank}>RDFa</a>
        |
        <a
          href="/assets/license/COPYING.odt"
          download
          target={constants.targetBlank}>ODT</a>
      </p>

      <p>
        Network Pro&trade; is free software: you can redistribute it and/or
        modify it under the terms of the
        <strong>GNU General Public License</strong> (GNU GPL) as published by
        the
        <a
          rel={constants.rel}
          href="https://fsf.org"
          target={constants.targetBlank}>Free Software Foundation</a
        >, either version 3 of the License, or (at your option) any later
        version.
      </p>

      <p>
        You should have received a copy of the GNU General Public License along
        with this material. If not, see &lt;
        <a
          rel={constants.rel}
          href="https://www.gnu.org/licenses"
          target={constants.targetBlank}>https://www.gnu.org/licenses/</a
        >&gt;.
      </p>

      <code class="block">
        <p>
          SPDX Reference:<br />
          <a
            rel={constants.rel}
            href="https://spdx.org/licenses/GPL-3.0-or-later.html"
            target={constants.targetBlank}>
            https://spdx.org/licenses/GPL-3.0-or-later.html
          </a>
        </p>

        <p>
          Canonical URL:<br />
          <a
            rel={constants.rel}
            href="https://www.gnu.org/licenses/gpl-3.0.html"
            target={constants.targetBlank}>
            https://gnu.org/licenses/gpl-3.0.html
          </a>
        </p>
      </code>
    {:else if link.id === "third-party"}
      <p>
        Some components of the Licensed Material may include or interface with
        third-party libraries, frameworks, or assets.
        <strong>
          Each third-party component is governed solely by its own license terms
        </strong>
        and is expressly excluded from the scope of this document.
      </p>

      <p>
        The inclusion, reference, or linking of any third-party content
        <strong>
          does not constitute endorsement, approval, or warranty
        </strong>
        by the Company.
      </p>

      <p>
        <strong>It is the user's responsibility</strong> to review, understand, and
        comply with all applicable third-party licenses before use, modification,
        or distribution.
      </p>
    {:else if link.id === "prohibited-uses"}
      <p>
        <strong>
          The following activities are strictly prohibited and may constitute
          infringement or unfair competition under applicable law, unless
          explicitly authorized in writing by the Company:
        </strong>
      </p>

      <ul>
        <li>
          Use of any Company trademarks, logos, domain names, slogans, or brand
          identifiers
        </li>
        <li>
          Any representation—explicit or implied—suggesting endorsement,
          affiliation, or partnership with the Company
        </li>
        <li>
          Misuse, misappropriation, or unauthorized use of any intellectual
          property owned by the Company
        </li>
        <li>
          Incorporation of any Company branding or protected identifiers into
          derivative works or redistributed content
        </li>
      </ul>
    {:else if link.id === "disclaimer"}
      <p>
        Modifications, redistribution, or any use of the Licensed Material are
        performed entirely at your own risk.
      </p>

      <blockquote>
        <strong>
          THE LICENSED MATERIAL IS PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT
          ANY EXPRESS OR IMPLIED WARRANTIES. TO THE MAXIMUM EXTENT PERMITTED BY
          LAW, THE COMPANY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED
          TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, NON-INFRINGEMENT, AND ACCURACY.
        </strong>
      </blockquote>

      <p>
        <strong>
          The Company shall not be liable for any direct, indirect, incidental,
          consequential, special, exemplary, or punitive damages arising from or
          related to the use, reproduction, modification, or distribution of the
          Licensed Material
        </strong>
        —including, without limitation, any claims or disputes brought by third parties,
        whether in contract, tort, or otherwise.
      </p>
    {:else if link.id === "authoritative"}
      <p>
        In the event of any discrepancy between different versions, formats, or
        distributions of any legal document issued by the Company—including but
        not limited to license terms, policies, notices, or agreements—the
        version published on the Company's primary website at <a
          rel={constants.rel}
          href={homeLink}
          target={constants.targetSelf}>https://netwk.pro</a>
        shall be deemed the official and controlling version.
      </p>

      <p>
        It is your responsibility to review the most current version of any
        applicable legal document before relying on its contents. Continued use
        of the Company's materials, services, or Licensed Material constitutes
        acceptance of the most current version then in effect.
      </p>
    {:else if link.id === "revisions"}
      <p>
        This legal page may be updated to comply with legal or operational
        changes. The current effective date is listed at the top of this
        document.
      </p>
    {:else if link.id === "contact"}
      <p>
        The Company can be contacted via our
        <a rel={constants.rel} href={contactLink} target={constants.targetBlank}
          >contact form</a>
        or by email at:<br />
        📧 <code>contact (at) s.neteng.pro</code>
      </p>
    {/if}

    <span class={constants.classSmall}>
      <a href={constants.hrefTop}>Back to top</a>
    </span>
  </section>
{/each}
<!-- END POLICY SECTIONS -->
<!-- END LEGAL, LICENSING, AND COPYRIGHT -->
