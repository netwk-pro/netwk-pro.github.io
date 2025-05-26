<!-- ==========================================================================
src/lib/components/foss/FossItemContent.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  /* eslint-disable svelte/no-at-html-tags */

  import FossFeatures from "$lib/components/foss/FossFeatures.svelte";
  // Import images and sanitization utility
  import { obtainiumPng, obtainiumWbp } from "$lib";
  import { sanitizeHTML } from "$lib/utils/sanitize.js";

  /** @type {string} */
  const rel = "noopener noreferrer";

  /** @type {string} */
  const obtainiumLink1 =
    "https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22fe.linksheet.nightly%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2FLinkSheet%2Fnightly%22%2C%22author%22%3A%221fexd%22%2C%22name%22%3A%22LinkSheet%20Nightly%22%2C%22preferredApkIndex%22%3A0%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22fallbackToOlderReleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22filterReleaseNotesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22verifyLatestTag%5C%22%3Afalse%2C%5C%22dontSortReleasesList%5C%22%3Afalse%2C%5C%22useLatestAssetDateAsReleaseDate%5C%22%3Afalse%2C%5C%22trackOnly%5C%22%3Afalse%2C%5C%22versionExtractionRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22matchGroupToUse%5C%22%3A%5C%22%5C%22%2C%5C%22versionDetection%5C%22%3Afalse%2C%5C%22releaseDateAsVersion%5C%22%3Afalse%2C%5C%22useVersionCodeAsOSVersion%5C%22%3Afalse%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22LinkSheet.Nightly%5C%22%2C%5C%22invertAPKFilter%5C%22%3Atrue%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22%5C%22%2C%5C%22shizukuPretendToBeGooglePlay%5C%22%3Afalse%2C%5C%22exemptFromBackgroundUpdates%5C%22%3Afalse%2C%5C%22skipUpdateNotifications%5C%22%3Afalse%2C%5C%22about%5C%22%3A%5C%22Restore%20link%20control%20on%20Android%2012%2B%5C%22%7D%22%7D";

  /** @type {string} */
  const obtainiumLink2 =
    "https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/%7B%22id%22%3A%22io.ente.photos.independent%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fente-io%2Fente%22%2C%22author%22%3A%22ente-io%22%2C%22name%22%3A%22Ente%20Photos%22%2C%22preferredApkIndex%22%3A0%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Afalse%2C%5C%22fallbackToOlderReleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22filterReleaseNotesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22verifyLatestTag%5C%22%3Afalse%2C%5C%22dontSortReleasesList%5C%22%3Atrue%2C%5C%22useLatestAssetDateAsReleaseDate%5C%22%3Afalse%2C%5C%22releaseTitleAsVersion%5C%22%3Afalse%2C%5C%22trackOnly%5C%22%3Afalse%2C%5C%22versionExtractionRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22matchGroupToUse%5C%22%3A%5C%22%5C%22%2C%5C%22versionDetection%5C%22%3Atrue%2C%5C%22releaseDateAsVersion%5C%22%3Afalse%2C%5C%22useVersionCodeAsOSVersion%5C%22%3Afalse%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22ente-photos*%5C%22%2C%5C%22invertAPKFilter%5C%22%3Afalse%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22%5C%22%2C%5C%22shizukuPretendToBeGooglePlay%5C%22%3Afalse%2C%5C%22allowInsecure%5C%22%3Afalse%2C%5C%22exemptFromBackgroundUpdates%5C%22%3Afalse%2C%5C%22skipUpdateNotifications%5C%22%3Afalse%2C%5C%22about%5C%22%3A%5C%22%5C%22%7D%22%2C%22overrideSource%22%3Anull%7D";

  /** @type {boolean} */
  export let isFirst = false;

  /** @type {any} */
  export let fossItem;

  // ✅ Debugging
  console.log(fossItem); // Check the data passed to the component

  // ✅ Sanitize on init for SSR safety
  const safeDetails = sanitizeHTML(fossItem.detailsDescription);
  const safeNotes = fossItem.notes.map(sanitizeHTML);
</script>

<!-- BEGIN FOSS ITEMS -->
<section id={fossItem.id}>
  <div class="foss-wrap">
    <table class="foss">
      <tbody>
        <tr>
          <td class="foss-cell">
            <picture>
              <source srcset={obtainiumWbp} type="image/webp" />
              <img
                decoding={isFirst ? "sync" : "async"}
                loading={isFirst ? "eager" : "lazy"}
                fetchpriority={isFirst ? "high" : "auto"}
                src={obtainiumPng}
                alt={fossItem.imgAlt}
                style="width: 50px; height: 50px" />
            </picture>
          </td>
          <td class="foss-cell">
            <h2>{fossItem.title}</h2>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>{fossItem.headline}</h3>

  <!-- Trusted + sanitized input -->
  {@html sanitizeHTML(fossItem.headlineDescription)}

  <FossFeatures features={fossItem.features} />

  <!-- Trusted + sanitized input -->
  {@html safeDetails}

  {#each safeNotes as note}
    <blockquote class="bquote">
      {@html note}
    </blockquote>
  {/each}

  &nbsp;

  <div class="linksheet">
    <!-- Special handling for LinkSheet's Obtainium link -->
    <div class="linksheet-entry">
      <a {rel} href={obtainiumLink1} target="_blank">
        <picture>
          <source srcset={obtainiumWbp} type="image/webp" />
          <img
            decoding={isFirst ? "sync" : "async"}
            loading={isFirst ? "eager" : "lazy"}
            fetchpriority={isFirst ? "high" : "auto"}
            src={obtainiumPng}
            alt="Obtainium"
            style="width: 207px; height: 80px" />
        </picture>
      </a>
    </div>

    <!-- Add existing separator class here -->
    <div class="separator"></div>

    <!-- Other links -->
    {#each fossItem.links as { label, href, imgAlt, downloadText, downloadHref, hideLabels }, i}
      <!-- Skip the first link for LinkSheet since we already handled it separately -->
      {#if !(fossItem.id === "linksheet" && i === 0)}
        <div class="linksheet-entry">
          {#if !hideLabels && label && href}
            <strong>{label}:</strong>
            <a {rel} {href} target="_blank">{href}</a>
          {/if}
        </div>
      {/if}
    {/each}
  </div>

  <div class="spacer"></div>

  <span class="small-text"><a href="#top">Back to top</a></span>
</section>
<!-- END FOSS ITEMS -->

<!-- cspell:ignore eauth -->
