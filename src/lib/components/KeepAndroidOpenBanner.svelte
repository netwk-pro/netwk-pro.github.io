<!-- ==========================================================================
src/lib/components/KeepAndroidOpenBanner.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { onMount } from 'svelte';

  const targetDate = new Date('2027-01-01T00:00:00');

  let remaining = $state(getRemaining());

  /** @type {number | undefined} */
  let intervalId;

  onMount(() => {
    if (targetDate.getTime() <= Date.now()) return;

    intervalId = window.setInterval(updateRemaining, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  });

  function updateRemaining() {
    remaining = getRemaining();
    if (remaining === 'now') window.clearInterval(intervalId);
  }

  function getRemaining() {
    const distance = targetDate.getTime() - Date.now();
    if (distance <= 0) return 'now';

    const days = Math.floor(distance / 86_400_000);
    const hours = Math.floor((distance % 86_400_000) / 3_600_000);
    const minutes = Math.floor((distance % 3_600_000) / 60_000);
    const seconds = Math.floor((distance % 60_000) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
</script>

<aside class="kao-banner" aria-label="Keep Android Open">
  <a
    class="kao-banner__link"
    href="https://keepandroidopen.org/"
    rel="noopener noreferrer"
    target="_blank">
    Android will become a locked-down platform in
    <span class="kao-banner__countdown">{remaining}</span>
  </a>
</aside>
