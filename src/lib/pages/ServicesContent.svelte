<!-- ==========================================================================
src/lib/pages/ServicesContent.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
=========================================================================== -->

<script>
  import { base } from '$app/paths';
  import { CONSTANTS } from '$lib';
  import { ServiceSummaryTable } from '$lib/components';

  // Log the base path to verify its value
  //console.log("Base path:", base);

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { COMPANY_INFO, CONTACT, PAGE, LINKS, NAV } = CONSTANTS;

  /**
   * URLs using the base path
   * @type {string}
   */
  const contactLink = `${base}/contact`;
  const consultLink = `${base}/consultation`;

  /**
   * Table of Contents Links
   * @type {{ id: string, text: string }[]}
   */
  const tocLinks = [
    { id: 'modem', text: 'Home Modem Setup - $99.99' },
    { id: 'basic', text: 'Basic Router Setup - $99.99' },
    { id: 'wifi', text: 'Wi-Fi and Wireless Networking Setup - $149.99' },
    { id: 'tshoot', text: 'Network Troubleshooting - $49.99+' },
    { id: 'security', text: 'Network Security Review - $79.99' },
    { id: 'device', text: 'Add a Wi-Fi Device - $34.99' },
    { id: 'print', text: 'Add or Configure a Printer - $74.99' },
  ];

  /**
   * Constants for reusable content
   * @type {{ effectiveDate: string, classSmall: string }}
   */
  const constants = {
    effectiveDate: 'October 21, 2025',
    classSmall: 'small-text',
  };
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
  <h1>On-Site Services</h1>
  <p>
    <strong>{COMPANY_INFO.NAME}</strong><br />
    <strong>Effective Date:</strong>
    {constants.effectiveDate}
  </p>
</section>
<!-- END TITLE -->

<!-- BEGIN SERVICES -->

<ServiceSummaryTable />

<div class="spacer"></div>

<p> </p>

<p>
  If you're a business seeking similar on-site solutions, we've got you covered!
  We offer tailored services to meet the unique needs of commercial clients as
  well. Simply <a href={consultLink} target={PAGE.BLANK}
    >schedule a free, initial consultation</a>
  or <a href={contactLink} target={PAGE.BLANK}>contact us directly</a> — we'd be
  happy to discuss how {COMPANY_INFO.APP_NAME}&trade; can support your business
  on-site.
</p>

<p>
  <strong>{COMPANY_INFO.NAME}</strong><br />
  📞 Phone: {CONTACT.PHONE}<br />
  📧 General Inquiries:
  <a href={`mailto:${CONTACT.EMAIL_LINK}`} target={PAGE.BLANK}
    >{CONTACT.EMAIL_LINK}</a
  ><br />
</p>

<div class="spacer"></div>

<hr />

{#each tocLinks as link, i}
  <section id={link.id}>
    <h2>{link.text}</h2>

    {#if link.id === 'modem'}
      <p>
        We'll connect and activate your compatible cable or fiber modem, confirm
        the signal and service link are stable, and verify your internet speeds
        after activation.<br />
        Our technician will ensure your modem is configured securely, confirm proper
        communication with your provider, and provide a short performance summary.
      </p>
      <p>
        <em
          >(Line quality and outside wiring are the responsibility of your
          internet provider. This service does not include network or additional
          hardware setup, configuration, repair, or troubleshooting. Wire runs,
          terminations, and shared device functionality are excluded. Additional
          travel charges may apply beyond standard coverage areas. Installation
          services are non-refundable once completed.)</em>
      </p>

      <ul>
        <li
          ><strong>Physical Setup & Activation</strong>
          <ul>
            <li>Connect modem to existing ISP line</li>
            <li>Verify power, link, and WAN light status</li>
            <li>Assist with ISP activation or self-install portal</li>
          </ul>
        </li>
        <li
          ><strong>Configuration & Optimization</strong>
          <ul>
            <li>Access modem GUI and update firmware</li>
            <li>Change admin credentials for security</li>
            <li>Configure bridge or router mode if required</li>
          </ul>
        </li>
        <li
          ><strong>Verification & Documentation</strong>
          <ul>
            <li>Run baseline speed and latency tests</li>
            <li>Verify public IP and DNS resolution</li>
            <li>Provide post-install summary</li>
          </ul>
        </li>
        <li
          ><strong>Optional Add-Ons</strong>
          <ul>
            <li>Connect and configure wired or Wi-Fi router</li>
            <li>Assist with SSID, guest network, and device setup</li>
            <li>Provide customer education and best practices</li>
          </ul>
        </li>
      </ul>
    {:else if link.id === 'basic'}
      <p>
        We'll set up and connect your wired network router to ensure stable
        connectivity, proper LAN configuration, and optimized performance across
        your devices.<br />
        Our technician will verify link integrity, confirm routing and DHCP functionality,
        and make sure your wired devices can access the internet reliably.
      </p>

      <p>
        <em>
          (Line quality and outside wiring are the responsibility of your
          internet provider. This service does not include Wi-Fi configuration,
          wireless troubleshooting, or advanced network setup. Wire runs,
          terminations, and shared device functionality are excluded. Additional
          travel charges may apply beyond standard coverage areas. Installation
          services are non-refundable once completed.)
        </em>
      </p>

      <ul>
        <li>
          <strong>Physical Setup & Connection</strong>
          <ul>
            <li>Connect router to modem or upstream network device</li>
            <li>Verify power, link, and Ethernet activity status</li>
            <li>Connect up to four wired client devices</li>
          </ul>
        </li>

        <li>
          <strong>Configuration & Optimization</strong>
          <ul>
            <li>Access router admin interface and check firmware version</li>
            <li>Update firmware if available and supported</li>
            <li>Change default admin credentials and secure local access</li>
            <li>Configure LAN IP range and DHCP settings</li>
          </ul>
        </li>

        <li>
          <strong>Verification & Documentation</strong>
          <ul>
            <li>Confirm internet access and routing functionality</li>
            <li>Test connectivity to each connected device</li>
            <li>Provide post-setup performance and security summary</li>
          </ul>
        </li>

        <li>
          <strong>Optional Add-Ons</strong>
          <ul>
            <li>Set up Wi-Fi router or mesh system</li>
            <li>Configure static IP, DNS, or port forwarding rules</li>
            <li>Provide network diagram or configuration backup</li>
          </ul>
        </li>
      </ul>
    {:else if link.id === 'wifi'}
      <p>
        We'll set up and configure your wireless network to ensure secure,
        reliable, and optimized Wi-Fi coverage throughout your home or office.<br />
        Our technician will connect and position your access point or router, establish
        secure wireless credentials, and verify signal strength and device connectivity.
      </p>

      <p>
        <em>
          (Line quality and outside wiring are the responsibility of your
          internet provider. This service does not include advanced network
          design, infrastructure cabling, or mesh node installation unless
          specified. Wall runs, device repairs, and shared file or print
          services are excluded. Additional travel charges may apply beyond
          standard coverage areas. Installation services are non-refundable once
          completed.)
        </em>
      </p>

      <ul>
        <li>
          <strong>Physical Setup & Connection</strong>
          <ul>
            <li
              >Connect wireless router or access point to modem or network
              switch</li>
            <li>Verify power, WAN, and wireless activity indicators</li>
            <li>Position router or access point for optimal signal coverage</li>
          </ul>
        </li>

        <li>
          <strong>Configuration & Optimization</strong>
          <ul>
            <li>Access router or access point management interface</li>
            <li>Update firmware and adjust transmit power if applicable</li>
            <li>Create or change SSID and secure with WPA2/WPA3 encryption</li>
            <li
              >Set up guest network and parental or access controls as requested</li>
          </ul>
        </li>

        <li>
          <strong>Verification & Documentation</strong>
          <ul>
            <li>Test Wi-Fi connectivity on multiple devices</li>
            <li>Confirm internet access and expected throughput</li>
            <li>Measure and document signal strength in key locations</li>
            <li>Provide post-setup summary and optimization recommendations</li>
          </ul>
        </li>

        <li>
          <strong>Optional Add-Ons</strong>
          <ul>
            <li>Extend coverage with additional access points or mesh nodes</li>
            <li>Assist with smart home or IoT device integration</li>
            <li>Provide on-site Wi-Fi optimization or interference analysis</li>
          </ul>
        </li>
      </ul>
    {:else if link.id === 'tshoot'}
      <p>
        <strong>Pricing:</strong> $49.99 + (includes initial 30-minute
        diagnostic)<br />
        <strong>Hourly rate:</strong> $79/hour thereafter
      </p>

      <p>
        Experiencing slow Wi-Fi, dropped connections, or devices that won't stay
        online? Our technician will diagnose and resolve connectivity issues
        with your home or small-office network, ensuring stable, optimized
        performance across your devices.
      </p>

      <p>
        This service focuses on diagnosing and resolving network-layer
        connectivity problems, not general PC repair. Supported platforms
        include Windows&nbsp;7 and later (Windows&nbsp;10/11 recommended),
        macOS, iOS, and Android. Legacy systems are supported on a best-effort
        basis.
      </p>

      <p>
        <em>
          (Excludes hardware repair, operating system or driver installation,
          and malware removal. Additional hourly charges may apply beyond the
          initial 30-minute diagnostic period. Line quality and outside wiring
          remain the responsibility of your internet provider.)
        </em>
      </p>

      <ul>
        <li>
          <strong>Diagnosis &amp; Verification</strong>
          <ul>
            <li>Test modem, router, and connected devices</li>
            <li>Verify LAN/WAN connectivity and signal quality</li>
            <li>Check for DHCP, IP, and DNS conflicts</li>
          </ul>
        </li>
        <li>
          <strong>Resolution &amp; Optimization</strong>
          <ul>
            <li>Reconfigure router or device settings as needed</li>
            <li>Optimize Wi-Fi channels and coverage</li>
            <li>Assist with ISP escalation if signal issues are detected</li>
          </ul>
        </li>
        <li>
          <strong>Verification &amp; Documentation</strong>
          <ul>
            <li>Confirm stable connectivity and device access</li>
            <li>Provide a brief summary of findings and recommendations</li>
          </ul>
        </li>
        <li>
          <strong>Limitations</strong>
          <ul>
            <li
              >Excludes hardware repair, driver installation, and malware
              removal</li>
            <li
              >Legacy systems (Windows&nbsp;7—8.1) supported on a best-effort
              basis</li>
            <li
              >Additional hourly charges apply beyond the first 30&nbsp;minutes</li>
          </ul>
        </li>
      </ul>
    {:else if link.id === 'security'}
      <p>
        <strong>Pricing:</strong> $79.99 (standard consumer routers;
        approximately 60–75 minutes)<br />
        <strong>Additional time:</strong> $49/hour for advanced customization, multi-router
        setups, or extended security configuration
      </p>

      <p>
        We'll perform a complete review of your home network's security posture,
        focusing on your router, wireless access points, and connected devices.
        Our technician will check for insecure configurations, weak encryption,
        or outdated firmware, and implement security best practices to help
        safeguard your home and personal data.
      </p>

      <p>
        <em>
          (This service does not include repairs or full system reconfiguration
          outside basic router and network settings. Hardware or software
          replacements, device-specific vulnerability remediation, or advanced
          penetration testing are not included. Additional travel charges may
          apply beyond standard coverage areas. Installation and configuration
          services are non-refundable once completed.)
        </em>
      </p>

      <ul>
        <li>
          <strong>Network & Device Assessment</strong>
          <ul>
            <li>Inspect router and Wi-Fi security settings</li>
            <li>Confirm WPA2/WPA3 encryption is enabled</li>
            <li>Identify devices with insecure or default credentials</li>
          </ul>
        </li>

        <li>
          <strong>Configuration & Hardening</strong>
          <ul>
            <li>Change default admin passwords and SSIDs if necessary</li>
            <li
              >Ensure remote management, WPS, and UPnP are properly disabled</li>
            <li>Recommend guest and IoT network separation</li>
          </ul>
        </li>

        <li>
          <strong>Verification & Recommendations</strong>
          <ul>
            <li
              >Check for open ports, file shares, or other exposed services</li>
            <li>Confirm firmware versions and advise on available updates</li>
            <li
              >Provide a written summary with security improvement suggestions</li>
          </ul>
        </li>

        <li>
          <strong>Optional Add-Ons</strong>
          <ul>
            <li
              >Set up guest or IoT VLANs (if router supports VLAN segmentation)</li>
            <li
              >Install and configure network monitoring or parental control
              tools</li>
            <li>Assist with secure remote access (VPN or WireGuard setup)</li>
          </ul>
        </li>
      </ul>
    {:else if link.id === 'device'}
      <p>
        <strong>Pricing:</strong> $34.99 (includes connection and verification
        for one device)<br />
        <strong>Additional devices:</strong> $19.99 each (excluding printers)
      </p>

      <p>
        We'll connect your new wireless device—such as a smart TV, streaming
        player, game console, or IoT accessory—to your home Wi-Fi network and
        verify connectivity. Our technician will ensure the device connects
        securely and confirm internet access and app functionality where
        applicable.
      </p>

      <p>
        <em>
          (Service excludes network or router reconfiguration, printer setup, or
          troubleshooting of incompatible devices. Additional travel charges may
          apply beyond standard coverage areas. Installation and connection
          services are non-refundable once completed.)
        </em>
      </p>

      <ul>
        <li
          ><strong>Device Connection & Setup</strong>
          <ul>
            <li>Connect new device to existing Wi-Fi network</li>
            <li>Verify signal strength and connectivity</li>
            <li>Test online access or app functionality</li>
          </ul>
        </li>

        <li
          ><strong>Configuration & Optimization</strong>
          <ul>
            <li>Adjust network settings if necessary for secure connection</li>
            <li
              >Ensure WPA2/WPA3 compatibility and disable insecure features</li>
            <li>Provide basic orientation for operation or app setup</li>
          </ul>
        </li>

        <li
          ><strong>Optional Add-Ons</strong>
          <ul>
            <li
              >Connect additional devices ($19.99 each, excluding printers)</li>
            <li>Set up parental controls or device access restrictions</li>
            <li>Assist with smart home or voice assistant integration</li>
          </ul>
        </li>
      </ul>
    {:else if link.id === 'print'}
      <p>
        <strong>Pricing:</strong> $74.99 (includes installation and
        configuration for one printer)<br />
        <strong>Additional devices:</strong> $19.99 each (for printer setup on extra
        computers or mobile devices)
      </p>

      <p>
        We'll install and configure your wired or wireless printer for use on
        your home network, verify that it prints correctly, and connect it to
        your computers or mobile devices. Our technician will ensure the printer
        is properly connected, configured, and accessible from your preferred
        devices.
      </p>

      <p>
        <em>
          (This service includes setup and connection of a single printer. It
          does not include in-depth troubleshooting of hardware faults, print
          driver conflicts, or advanced network security configuration. For
          extended security auditing or multi-device configuration, please refer
          to our <a href="#security">Network Security Review</a> service. Additional
          travel charges may apply beyond standard coverage areas. Installation and
          configuration services are non-refundable once completed.)
        </em>
      </p>

      <ul>
        <li
          ><strong>Printer Setup & Connection</strong>
          <ul>
            <li>Unpack, position, and power on the printer</li>
            <li>Connect via Wi-Fi, Ethernet, or USB</li>
            <li>Join printer to existing wireless network (if applicable)</li>
          </ul>
        </li>

        <li
          ><strong>Configuration & Verification</strong>
          <ul>
            <li>Install and configure necessary printer software or drivers</li>
            <li>Perform a test print to verify connectivity</li>
            <li
              >Confirm wireless printing functionality from supported devices</li>
          </ul>
        </li>

        <li
          ><strong>Optional Add-Ons</strong>
          <ul>
            <li
              >Connect additional computers or mobile devices ($19.99 each)</li>
            <li>Configure scan-to-email or cloud printing features</li>
            <li
              >Secure wireless printer setup (via <a href="#security"
                >Network Security Review</a
              >)</li>
          </ul>
        </li>
      </ul>
    {/if}

    <span class={constants.classSmall}>
      <a href={NAV.HREFTOP}>{NAV.BACKTOP}</a>
    </span>

    <div class="spacer"></div>

    {#if i < tocLinks.length - 1}
      <hr />
    {/if}
  </section>
{/each}
<!-- END SERVICES -->
