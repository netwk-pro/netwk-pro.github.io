<!-- ==========================================================================
src/lib/components/KeepAndroidOpenBanner.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  const storageKey = 'kao-banner-hidden';
  const dismissDays = 30;
  const targetDate = new Date('2026-09-01T00:00:00');

  let visible = $state(false);
  let remaining = $state('');

  /** @type {number | undefined} */
  let intervalId;

  onMount(() => {
    const dismissedAt = getDismissedAt();
    const dismissExpired =
      !dismissedAt ||
      Date.now() - dismissedAt > dismissDays * 24 * 60 * 60 * 1000;

    visible = dismissExpired;
    if (!visible) return;

    updateRemaining();
    intervalId = window.setInterval(updateRemaining, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  });

  function dismiss() {
    visible = false;
    window.clearInterval(intervalId);
    saveDismissedAt();
  }

  function updateRemaining() {
    const distance = targetDate.getTime() - Date.now();
    if (distance <= 0) {
      remaining = 'now';
      window.clearInterval(intervalId);
      return;
    }

    const days = Math.floor(distance / 86_400_000);
    const hours = Math.floor((distance % 86_400_000) / 3_600_000);
    const minutes = Math.floor((distance % 3_600_000) / 60_000);
    const seconds = Math.floor((distance % 60_000) / 1000);

    remaining = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  function getDismissedAt() {
    if (!browser) return 0;

    try {
      return Number(localStorage.getItem(storageKey) || 0);
    } catch {
      return 0;
    }
  }

  function saveDismissedAt() {
    if (!browser) return;

    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // Storage can be unavailable in hardened browser profiles; dismissal is best-effort.
    }
  }
</script>

{#if visible}
  <aside class="kao-banner" aria-label="Keep Android Open">
    <a
      class="kao-banner__link"
      href="https://keepandroidopen.org/"
      rel="noopener noreferrer"
      target="_blank">
      Android will become a locked-down platform in
      <span class="kao-banner__countdown">{remaining}</span>
    </a>
    <button
      class="kao-banner__close"
      type="button"
      aria-label="Close Keep Android Open banner"
      onclick={dismiss}>
      x
    </button>
  </aside>
{/if}
