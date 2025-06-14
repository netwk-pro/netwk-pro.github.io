<!-- ==========================================================================
src/lib/pages/PGPContent.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import { base } from '$app/paths';
  import { CONSTANTS } from '$lib';

  // Log the base path to verify its value
  //console.log("Base path:", base);

  //console.log(CONSTANTS.COMPANY_INFO.APP_NAME);

  const { PAGE } = CONSTANTS;

  const keys = [
    {
      name: 'General Contact & Support',
      email: 'support (at) neteng.pro',
      fingerprint: '6590 B992 E2E3 EFF1 2738 7BCE 2AF0 93E9 DEC6 1BA0',
      opgp: 'https://keys.openpgp.org/search?q=support%40neteng.pro',
      file: '/pgp/support@neteng.pro.asc',
      img: 'pgp-support',
    },
    {
      name: 'Secure Email',
      email: 'contact (at) s.neteng.pro',
      fingerprint: 'DF11 8BAA 6C2D 9DCD EBDC 2DDC F993 7349 9495 F957',
      opgp: 'https://keys.openpgp.org/search?q=contact%40s.neteng.pro',
      file: '/pgp/contact@s.neteng.pro.asc',
      img: 'pgp-contact',
    },
    {
      name: 'Security Contact',
      email: 'security (at) s.neteng.pro',
      fingerprint: 'B7FE 1D4E 6CAB 3E71 4A9F DF6E 48CB 7290 C00D 0DA5',
      opgp: 'https://keys.openpgp.org/search?q=security%40s.neteng.pro',
      file: '/pgp/security@s.neteng.pro.asc',
      img: 'pgp-security',
    },
  ];

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
    src="/img/powered-by-proton.svg"
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
  <section class="pgp-entry" aria-labelledby={`pgp-${key.img}`}>
    <div class="pgp-text">
      <h2 id={`pgp-${key.img}`}>{key.name}</h2>
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
        <source srcset={`/pgp/${key.img}.webp`} type="image/webp" />
        <img
          src={`/pgp/${key.img}.png`}
          alt={`QR code for ${key.email}`}
          class="pgp-image"
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding={i === 0 ? 'sync' : 'async'} />
      </picture>
    </div>
  </section>
{/each}

<!-- cspell:ignore ebdc -->
