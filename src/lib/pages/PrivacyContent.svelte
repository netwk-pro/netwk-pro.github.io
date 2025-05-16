<!-- ==========================================================================
src/lib/pages/PrivacyContent.svelte

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { base } from "$app/paths";

  // Log the base path to verify its value
  //console.log("Base path:", base);

  /**
   * URL to the Privacy Rights Request Form redirect route, using the base path
   * @type {string}
   */
  const prightsLink = `${base}/privacy-rights`;

  /**
   * URL to the privacy policy in Markdown format
   * @type {string}
   */
  const privacyLink = "https://netwk.pro/docs/privacy";

  /**
   * Table of Contents Links
   * @type {{ id: string, text: string }[]}
   */
  const tocLinks = [
    { id: "intro", text: "Introduction" },
    { id: "collect", text: "Information We Collect" },
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

  /**
   * Contact Information
   * @type {{ company: string, email: string, phone: string, effectiveDate: string }}
   */
  const contactInfo = {
    company: "Network Pro Strategies",
    email: "support (at) neteng.pro",
    phone: "(623) 252-4350",
    effectiveDate: "May 8, 2025",
  };

  /**
   * Constants used throughout the component for consistent styling and behavior
   * @type {{
   *   classSmall: string,
   *   rel: string,
   *   backTop: string,
   *   hrefTop: string,
   *   targetSelf: string,
   *   targetBlank: string
   * }}
   */
  const constants = {
    classSmall: "small-text",
    rel: "noopener noreferrer",
    backTop: "Back to top",
    hrefTop: "#top",
    targetSelf: "_self",
    targetBlank: "_blank",
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
    </a>
    : &nbsp;<code>CC-BY-4.0 OR GPL-3.0-or-later</code>
  </span>
</section>

<section id="page-title">
  <h1>Privacy Policy</h1>
  <p>
    <strong>{contactInfo.company}</strong><br />
    <strong>Effective Date:</strong>
    {contactInfo.effectiveDate}
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
      <a href={privacyLink} target={constants.targetSelf}> Markdown </a>
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
            rel={constants.rel}
            href="https://www.azleg.gov/arstitle"
            target={constants.targetBlank}>
            Arizona Revised Statutes
          </a>
        </strong> (A.R.S. §§ 18-551, 18-552).
      </p>
    {:else if link.id === "collect"}
      <ul>
        <li
          ><strong>Personal Identifiers</strong> (e.g., name, email, phone number)</li>
        <li><strong>Business and Professional Information</strong></li>
        <li
          ><strong>Device/Technical Information</strong> (e.g., IP address, browser
          type, access logs)</li>
        <li
          ><strong>Client-Submitted Content</strong> related to our services</li>
      </ul>
    {:else if link.id === "payment"}
      <p>
        When processing payments, we may collect credit card details and billing
        contact information. All credit card data is encrypted via TLS and
        shared only with PCI-compliant processors.
        <strong
          >Data is purged within 90 days post-verification of payment.</strong>
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
        <li
          ><strong>With Service Providers:</strong> Information is shared with trusted
          third-party vendors.</li>
        <li
          ><strong>Legal Compliance:</strong> Disclosed as required by law or court
          order.</li>
        <li
          ><strong>Business Transfers:</strong> Transferred in case of mergers or
          acquisitions.</li>
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
      <p><strong>Your Rights and Choices</strong></p>
      <ul>
        <li
          ><strong>Access, update, or delete</strong> your personal information.</li>
        <li
          ><strong>Restrict or object to processing</strong> under certain conditions.</li>
        <li><strong>Opt out of direct marketing</strong></li>
      </ul>
      <p>
        To exercise these rights, please use our <a
          rel={constants.rel}
          href={prightsLink}
          target={constants.targetBlank}>Privacy Rights Request Form</a>
        or email us at <code>{contactInfo.email}</code>.
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
        content. Consulting services are governed by separate contracts.
      </p>
    {:else if link.id === "changes"}
      <p>
        We may update this policy periodically. Changes are effective upon
        posting.
      </p>
    {:else if link.id === "contact"}
      <p>For questions, contact:</p>
      <p>
        <strong>{contactInfo.company}</strong><br />
        📧 Email: <code>{contactInfo.email}</code><br />
        📞 Phone: {contactInfo.phone}
      </p>
    {/if}

    <!-- Back to Top Link -->
    <span class={constants.classSmall}>
      <a href={constants.hrefTop}>{constants.backTop}</a>
    </span>
  </section>
{/each}
<!-- END POLICY SECTIONS -->
<!-- END PRIVACY POLICY -->
