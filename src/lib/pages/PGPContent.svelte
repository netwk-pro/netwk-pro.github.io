<!-- ==========================================================================
src/lib/pages/PGPContent.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { CONSTANTS, protonPower, getQR, PGP_KEYS as keys } from '$lib';
  import { CodeBlock } from '$lib/components';
  import { base } from '$app/paths';

  // Log the base path to verify its value
  //console.log("Base path:", base);

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { CONTACT, PAGE } = CONSTANTS;

  /**
   * Tracks which PGP key's fingerprint was last copied.
   * @type {string | null}
   */
  let copiedKey = null;

  /**
   * Copies the fingerprint of a given PGP key and shows temporary feedback.
   * @param {{ fingerprint: string, email: string }} key - The PGP key object
   */
  function handleCopy(key) {
    copy(key.fingerprint);
    copiedKey = key.email;
    setTimeout(() => {
      if (copiedKey === key.email) copiedKey = null;
    }, 2000);
  }

  /**
   * Writes a string to the clipboard.
   * @param {string} text - The text to copy to the clipboard
   */
  function copy(text) {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error('Clipboard copy failed:', err);
    });
  }
</script>

<h1>🔐 Public PGP Keys</h1>
<p>
  Below are our public encryption keys. Use them to securely send email or
  verify signed messages.
</p>
<p>
  <img
    src={protonPower}
    alt="Powered by Proton"
    class="proton-img"
    loading="eager"
    decoding="sync" />
</p>
<p class="bquote">
  NOTE: Addresses under the <strong>s.neteng.pro</strong> domain are powered by Proton
  Mail to ensure strong end-to-end privacy protections.
</p>

{#each keys as key, i}
  <section class="pgp-entry" aria-labelledby={`pgp-${key.id}`}>
    <div class="pgp-text">
      <h2 id={`pgp-${key.id}`}>{key.name}</h2>
      <h3>
        &lt;
        {#if key.opgp}
          <a rel={PAGE.REL} href={key.opgp} target={PAGE.BLANK}>
            {key.email}
          </a>
        {:else}
          {key.email}
        {/if}
        &gt;
      </h3>
      <CodeBlock text={key.fingerprint} />
      <p>
        <button
          type="button"
          on:click={() => handleCopy(key)}
          aria-label={`Copy PGP fingerprint for ${key.name}`}
          title="Copy fingerprint to clipboard">
          {copiedKey === key.email ? 'Copied!' : 'Copy fingerprint'}
        </button>
      </p>
      <p>
        <a
          href={key.file}
          download
          aria-label={`Download PGP key for ${key.name}`}
          title="Download PGP key">
          Download Key
        </a>
      </p>
    </div>
    <div class="pgp-qr">
      <picture>
        {#if key.webp}
          <source srcset={key.webp} type="image/webp" />
        {/if}
        {#if key.png}
          <img
            src={key.png}
            alt={`QR code for ${key.email}`}
            class="pgp-image"
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding={i === 0 ? 'sync' : 'async'} />
        {:else}
          <p>QR image missing for {key.id}</p>
        {/if}
      </picture>
    </div>
  </section>
{/each}

<!-- cspell:ignore ebdc -->
