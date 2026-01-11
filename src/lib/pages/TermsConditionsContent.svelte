<!-- ==========================================================================
src/lib/pages/TermsConditionsContent.svelte

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

  const { COMPANY_INFO, PAGE, NAV } = CONSTANTS;

  /**
   * URL to Terms of Use page, using the base path
   * @type {string}
   */
  const termsLink = `${base}/terms-of-use`;

  /**
   * Markdown version of the Terms and Conditions document
   * @type {string}
   */
  const tandcLink = 'https://docs.netwk.pro/terms-conditions';

  /**
   * Common constants used throughout the component
   * @type {{
   *   effectiveDate: string,
   *   classSmall: string,
   * }}
   */
  const constants = {
    effectiveDate: 'May 8, 2025',
    classSmall: 'small-text',
  };

  /**
   * Table of Contents links for the terms sections
   * @type {Array<{id: string, text: string}>}
   */
  const tocLinks = [
    { id: 'intro', text: 'Introduction' },
    { id: 'scope', text: 'Scope of Services' },
    { id: 'warranties', text: 'Disclaimer of Warranties' },
    { id: 'risk', text: 'Assumption of Risk' },
    { id: 'liability', text: 'Limitation of Liability' },
    { id: 'indemnify', text: 'Indemnification' },
    { id: 'client', text: 'Client Responsibilities' },
    { id: 'law', text: 'Governing Law and Jurisdiction' },
    { id: 'accept', text: 'Acceptance of Terms' },
    { id: 'exceptions', text: 'Exceptions and Negotiations' },
    { id: 'changes', text: 'Changes to These Terms' },
  ];
</script>

<!-- BEGIN TITLE -->
<section id="top">
  <span class={constants.classSmall}>
    <a
      rel={PAGE.REL}
      href="https://spdx.dev/learn/handling-license-info"
      target={PAGE.BLANK}>
      SPDX-License-Identifier
    </a>: &nbsp;<code>CC-BY-4.0 OR GPL-3.0-or-later</code>
  </span>
</section>

<section id="page-title">
  <h1>Consulting Terms and Conditions</h1>
  <p>
    <strong>{COMPANY_INFO.NAME}<br />Effective Date:</strong>
    {constants.effectiveDate}
  </p>
</section>
<!-- END TITLE -->

&nbsp;

<!-- BEGIN TERMS AND CONDITIONS -->
<nav id="toc">
  <h2>Table of Contents</h2>
  <ol>
    {#each tocLinks as link}
      <li><a href={'#' + link.id}>{link.text}</a></li>
    {/each}
  </ol>
</nav>

<p class="bquote">
  These Terms and Conditions apply exclusively to the provision of our
  consulting and implementation services. For all other uses of our website and
  associated platforms, please refer to the applicable
  <a href={termsLink} target={PAGE.SELF}> Website Terms of Use </a>.
</p>

<hr />

<section id="formats">
  <p>
    <sup>
      <strong>Formats Available:</strong> &nbsp;<span class="visited"
        >HTML</span>
      |
      <a href={tandcLink} target={PAGE.SELF}>Docs</a>
      |
      <a href="/bin/consulting-terms.pdf" download target={PAGE.BLANK}>
        PDF <span class="fas fa-file-arrow-down"></span>
      </a>
    </sup>
  </p>
</section>

{#each tocLinks as link, i}
  <section id={link.id}>
    <h2>{i + 1}. {link.text}</h2>

    {#if link.id === 'intro'}
      <p>
        By engaging with the information security, network security,
        cybersecurity, and digital privacy consulting and implementation
        services provided by {COMPANY_INFO.NAME} ("Company," "we," "us," or "our"),
        you ("Client") agree to be bound by these Terms and Conditions ("Terms").
        <strong>
          These Terms govern all engagements except where explicitly superseded
          by a separate written agreement or Statement of Work (SOW).
        </strong>
        If you do not agree to these Terms, please do not engage our services.
      </p>
    {:else if link.id === 'scope'}
      <p>
        These Terms apply to all consulting and implementation services offered
        by the Company, including but not limited to assessment, planning, risk
        analysis, technical implementation, and configuration of third-party
        cybersecurity tools and systems. Services may be delivered in-person,
        remotely, or via digital communication platforms.
        <strong>
          All deliverables and timelines will be governed by individual SOWs
          when applicable.
        </strong>
      </p>
    {:else if link.id === 'warranties'}
      <p>
        All services are provided "as is" and "as available" without warranties
        of any kind, whether express, implied, statutory, or otherwise. The
        Company expressly disclaims all implied warranties, including but not
        limited to merchantability, fitness for a particular purpose, and
        non-infringement. We do not warrant that our services or recommendations
        will detect or prevent all security threats or achieve legal or
        regulatory compliance unless specifically agreed in writing.
      </p>
    {:else if link.id === 'risk'}
      <p>
        Client acknowledges that cybersecurity and privacy-related services
        inherently involve risk. The Company does not guarantee uninterrupted
        service, error-free implementation, or complete immunity from breaches
        or attacks. Client assumes full responsibility for decisions based on
        our recommendations and agrees to maintain appropriate internal controls
        and backup protocols.
      </p>
    {:else if link.id === 'liability'}
      <p>
        To the maximum extent permitted by law, the Company shall not be liable
        for any indirect, incidental, consequential, special, or punitive
        damages, including without limitation loss of profits, data, business
        interruption, or reputational harm, arising from or related to the use
        or performance of the services, even if advised of the possibility of
        such damages. Direct damages, if any, shall be limited to the amount
        paid by Client for the specific services giving rise to the claim.
      </p>
    {:else if link.id === 'indemnify'}
      <p>
        Client agrees to indemnify, defend, and hold harmless the Company, its
        officers, employees, contractors, and affiliates from and against any
        claims, damages, liabilities, losses, and expenses (including reasonable
        legal fees) arising out of or related to (i) Client's misuse of the
        services, (ii) misconfiguration of systems by Client, or (iii)
        third-party claims related to services rendered under these Terms.
      </p>
    {:else if link.id === 'client'}
      <p>
        <strong>
          Client shall provide valid, secure, and licensed infrastructure,
          access credentials, and third-party tools necessary for service
          delivery.
        </strong>
        The Company shall operate exclusively within client-owned or designated environments
        and shall not independently host, process, or store client data. Compliance
        with any regulatory frameworks (e.g., HIPAA, GDPR, PCI-DSS) is the sole responsibility
        of the Client unless explicitly agreed otherwise in a separate written agreement.
      </p>
    {:else if link.id === 'law'}
      <p>
        These Terms shall be governed by and construed under the laws of the
        State of Arizona and applicable U.S. federal laws. Any disputes shall be
        resolved exclusively in the state or federal courts located in Maricopa
        County, Arizona, and both parties consent to such jurisdiction and
        venue.
      </p>
    {:else if link.id === 'accept'}
      <p>
        Engagement with the Company's services constitutes acceptance of these
        Terms. Continued use of services after any updates indicates continued
        acceptance. These Terms are effective unless and until terminated or
        modified in writing by mutual agreement.
      </p>
    {:else if link.id === 'exceptions'}
      <p>
        <strong>
          The Company is open to negotiating specific terms upon mutual
          agreement.
        </strong>
        Exceptions to these Terms must be documented in writing and signed by both
        parties. Flexibility may be offered provided such changes do not impose undue
        liability or regulatory obligations on the Company.
      </p>
    {:else if link.id === 'changes'}
      <p>
        The Company reserves the right to revise these Terms at any time.
        Updated versions will be posted on our website or delivered via direct
        notice. Clients are responsible for reviewing Terms periodically for
        updates.
      </p>
    {/if}

    <span class={constants.classSmall}
      ><a href={NAV.HREFTOP}>{NAV.BACKTOP}</a></span>
  </section>
{/each}
<!-- END TERMS AND CONDITIONS -->

<!-- cspell:ignore tandc -->
