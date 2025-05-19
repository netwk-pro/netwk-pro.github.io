<!-- ==========================================================================
src/lib/components/PWAInstallButton.svelte

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let show = false;

  /** @type {BeforeInstallPromptEvent | null} */
  let deferredPrompt = null;

  /**
   * @typedef {CustomEvent<BeforeInstallPromptEvent>} PWAInstallAvailableEvent
   */

  onMount(() => {
    /**
     * Listen for the custom event fired by registerServiceWorker.js
     * to enable a custom install experience.
     *
     * TypeScript / svelte-check does not recognize custom events by default,
     * so we cast the base Event to CustomEvent manually.
     */
    window.addEventListener(
      "pwa-install-available",
      (/** @type {Event} */ e) => {
        const customEvent = /** @type {PWAInstallAvailableEvent} */ (e);
        deferredPrompt = customEvent.detail;
        show = true;
      },
    );
  });

  /**
   * Trigger the native install prompt and handle user response
   */
  async function promptInstall() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to PWA install prompt: ${outcome}`);

    // Always hide the button after interaction
    show = false;
    deferredPrompt = null;
  }
</script>

{#if show}
  <button
    id="pwa-install"
    class="install-button"
    on:click={promptInstall}
    transition:fade={{ duration: 300 }}>
    Install App
  </button>
{/if}

<style>
  .install-button {
    padding: 0.5rem 1rem;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    background-color: #ffc627;
    transition: background-color 0.2s ease-in-out;
    border-radius: 6px;
    cursor: pointer;
    font-family: inherit;
    margin-top: 1rem;
  }

  .install-button:hover {
    background-color: #e6b300;
  }

  .install-button:focus {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
</style>
