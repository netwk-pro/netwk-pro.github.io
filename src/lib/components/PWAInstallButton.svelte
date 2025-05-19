<!-- ==========================================================================
src/lib/components/PWAInstallButton.svelte

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  let show = false;
  /** @type {BeforeInstallPromptEvent | null} */
  let deferredPrompt = null;

  onMount(() => {
    window.addEventListener("pwa-install-available", (e) => {
      deferredPrompt = /** @type {BeforeInstallPromptEvent} */ (e.detail);
      show = true;
    });
  });

  async function handleClick() {
    if (!deferredPrompt) return;

    show = false;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to PWA install prompt: ${outcome}`);
    deferredPrompt = null;
  }
</script>

{#if show}
  <button
    class="pwa-install-button"
    on:click={handleClick}
    transition:fade={{ duration: 500 }}>
    📲 Install Network Pro
  </button>
{/if}

<style>
  .pwa-install-button {
    display: inline-block;
    padding: 0.75rem 1.25rem;
    margin: 1rem auto;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    text-align: center;
    background-color: #ffc627;
    transition: background-color 0.2s ease-in-out;
    border-radius: 6px;
    cursor: pointer;
  }

  .pwa-install-button:hover {
    background-color: #e0b300;
  }
</style>
