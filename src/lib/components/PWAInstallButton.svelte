<!-- ==========================================================================
src/lib/components/PWAInstallButton.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let show = false;

  /** @type {BeforeInstallPromptEvent | null} */
  let deferredPrompt = null;

  onMount(() => {
    /**
     * @param {Event} e
     */
    function handleInstallPrompt(e) {
      /** @type {CustomEvent<BeforeInstallPromptEvent>} */
      const customEvent = /** @type {CustomEvent} */ (e);
      deferredPrompt = customEvent.detail;
      show = true;
    }

    window.addEventListener('pwa-install-available', handleInstallPrompt);

    return () => {
      window.removeEventListener('pwa-install-available', handleInstallPrompt);
    };
  });

  async function promptInstall() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to PWA install prompt: ${outcome}`);

    show = false;
    deferredPrompt = null;
  }
</script>

{#if show}
  <button
    id="pwa-install"
    class="pwa-install-button"
    on:click={promptInstall}
    transition:fade={{ duration: 600 }}>
    Install App
  </button>
{/if}
