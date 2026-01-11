<!-- ==========================================================================
src/lib/components/foss/ObtainiumBlock.svelte

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<!-- Encapsulated UI block for Obtainium deep-link + manual config download. -->

<script>
  /// <reference path="$lib/types/fossTypes.js" />
  /** @type {{ href: string; download: string; label: string; isFirst?: boolean }} */
  export let obtainium;
  export let isFirst = false;

  import { obtainiumPng, obtainiumWbp } from '$lib';
  import { CONSTANTS } from '$lib';

  const { PAGE } = CONSTANTS;

  /** @type {"async"} */
  const decoding = 'async';

  /** @type {"lazy"} */
  const loading = 'lazy';
</script>

<div class="linksheet-entry">
  <p class="obtainium-direct-label">Open directly in Obtainium:</p>

  <a
    rel={PAGE.REL}
    href={obtainium.href}
    target={PAGE.BLANK}
    aria-label="Open this app in Obtainium">
    <picture>
      <source srcset={obtainiumWbp} type="image/webp" />
      <img
        decoding={isFirst ? 'sync' : decoding}
        loading={isFirst ? 'eager' : loading}
        fetchpriority={isFirst ? 'high' : 'auto'}
        src={obtainiumPng}
        alt="Obtainium"
        class="obtainium-img" />
    </picture>
  </a>

  <p class="obtainium-manual-label">Download and import manually:</p>

  <p>
    <span class="obtainium-fa-down">
      <i class="fas fa-file-arrow-down"></i>
    </span>
    <a
      href={obtainium.download}
      type="application/json"
      download
      class="obtainium-margin"
      target={PAGE.BLANK}>
      {obtainium.label}
    </a>
  </p>
</div>
