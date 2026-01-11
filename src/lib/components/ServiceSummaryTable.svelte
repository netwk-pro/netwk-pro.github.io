<!-- ==========================================================================
src/lib/components/ServiceSummaryTable.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { onMount } from 'svelte';

  let activeService = '';

  // Detect which hash (anchor) is active
  onMount(() => {
    // Set initial hash (e.g. when user loads /services#wifi)
    activeService = window.location.hash.replace('#', '');

    // Update on hash change
    const handleHashChange = () => {
      activeService = window.location.hash.replace('#', '');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  });

  // Keep only this services array (your actual data)
  export let services = [
    {
      id: 'modem',
      name: 'Home Modem Setup',
      price: '$99.99',
      duration: '45–60 min',
      summary:
        'Activate and secure your modem, verify connectivity and speeds.',
    },
    {
      id: 'basic',
      name: 'Basic Router Setup',
      price: '$99.99',
      duration: '60–75 min',
      summary: 'Configure wired routing, DHCP, and security for LAN devices.',
    },
    {
      id: 'wifi',
      name: 'Wi-Fi & Wireless Network Setup',
      price: '$149.99',
      duration: '75–90 min',
      summary: 'Establish reliable Wi-Fi coverage and secure wireless access.',
    },
    {
      id: 'tshoot',
      name: 'Network Troubleshooting',
      price: 'from $49.99',
      duration: '30-min diagnostic + hourly',
      summary: 'Identify and resolve connectivity or performance issues.',
    },
    {
      id: 'security',
      name: 'Network Security Review',
      price: '$79.99',
      duration: '60–75 min',
      summary:
        'Harden router and Wi-Fi configurations, eliminate vulnerabilities.',
    },
    {
      id: 'device',
      name: 'Add a Wi-Fi Device',
      price: '$34.99',
      duration: '15–30 min',
      summary: 'Connect and verify new wireless devices on your home network.',
    },
    {
      id: 'print',
      name: 'Add or Configure a Printer',
      price: '$74.99',
      duration: '45–60 min',
      summary: 'Install and configure printers for network and device access.',
    },
  ];
</script>

<section id="service-summary">
  <h2>Service Summary</h2>
  <p>
    Quickly compare our range of on-site services designed primarily for
    individual consumers. Each offering is crafted for convenience, reliability,
    and top-tier support.<br />
    Each item links to a detailed description below.
  </p>

  <table class="service-table">
    <thead>
      <tr>
        <th>Service</th>
        <th>Price</th>
        <th>Estimated Time</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each services as svc}
        <tr class:selected={svc.id === activeService}>
          <td><a href={'#' + svc.id}>{svc.name}</a></td>
          <td>{svc.price}</td>
          <td>{svc.duration}</td>
          <td>{svc.summary}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
