<!-- ==========================================================================
src/lib/components/foss/FossItemContent.svelte

SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import FossFeatures from "$lib/components/foss/FossFeatures.svelte";
  // Import directly from $lib by way of image utility
  import { obtainiumPng, obtainiumWbp } from "$lib";

  /** @type {"noopener noreferrer"} */
  const rel = "noopener noreferrer";

  /** @type {string} */
  const obtainiumLink =
    "https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22fe.linksheet.nightly%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2FLinkSheet%2Fnightly%22%2C%22author%22%3A%221fexd%22%2C%22name%22%3A%22LinkSheet%20Nightly%22%2C%22preferredApkIndex%22%3A0%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22fallbackToOlderReleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22filterReleaseNotesByRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22verifyLatestTag%5C%22%3Afalse%2C%5C%22dontSortReleasesList%5C%22%3Afalse%2C%5C%22useLatestAssetDateAsReleaseDate%5C%22%3Afalse%2C%5C%22trackOnly%5C%22%3Afalse%2C%5C%22versionExtractionRegEx%5C%22%3A%5C%22%5C%22%2C%5C%22matchGroupToUse%5C%22%3A%5C%22%5C%22%2C%5C%22versionDetection%5C%22%3Afalse%2C%5C%22releaseDateAsVersion%5C%22%3Afalse%2C%5C%22useVersionCodeAsOSVersion%5C%22%3Afalse%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22LinkSheet.Nightly%5C%22%2C%5C%22invertAPKFilter%5C%22%3Atrue%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22%5C%22%2C%5C%22shizukuPretendToBeGooglePlay%5C%22%3Afalse%2C%5C%22exemptFromBackgroundUpdates%5C%22%3Afalse%2C%5C%22skipUpdateNotifications%5C%22%3Afalse%2C%5C%22about%5C%22%3A%5C%22Restore%20link%20control%20on%20Android%2012%2B%5C%22%7D%22%7D";

  /** @type {"async"} */
  const decoding = "async";

  /** @type {"lazy"} */
  const loading = "lazy";

  /**
   * @type {{
   *   id: string,
   *   title: string,
   *   images: {
   *     webp: string,
   *     png: string
   *   },
   *   imgAlt: string,
   *   headline: string,
   *   headlineDescription: string,
   *   detailsDescription: string,
   *   features: any[],
   *   notes: string[],
   *   links: Array<{
   *     label?: string,
   *     href?: string,
   *     imgAlt?: string,
   *     downloadText?: string,
   *     downloadHref?: string,
   *     hideLabels?: boolean
   *   }>
   * }}
   */
  export let fossItem;

  /**
   * Flag indicating if this is the first FOSS item in the list.
   * Only the first item should use eager loading.
   * @type {boolean}
   */
  export let isFirst = false;
</script>

<!-- BEGIN FOSS ITEMS -->
<section id={fossItem.id}>
  <div class="foss-wrap">
    <table class="foss">
      <tbody>
        <tr>
          <td class="foss-cell">
            <picture>
              <source srcset={fossItem.images.webp} type="image/webp" />
              <img
                decoding={isFirst ? "sync" : decoding}
                loading={isFirst ? "eager" : loading}
                fetchpriority={isFirst ? "high" : "auto"}
                src={fossItem.images.png}
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

  {@html fossItem.headlineDescription}

  <FossFeatures features={fossItem.features} />

  {@html fossItem.detailsDescription}

  {#each fossItem.notes as note}
    <blockquote class="bquote">
      {@html note}
    </blockquote>
  {/each}

  &nbsp;

  <div class="linksheet">
    <!-- Special handling for LinkSheet's Obtainium link -->
    {#if fossItem.id === "linksheet"}
      <div class="linksheet-entry">
        <a {rel} href={obtainiumLink} target="_blank">
          <picture>
            <source srcset={obtainiumWbp} type="image/webp" />
            <img
              decoding={isFirst ? "sync" : decoding}
              loading={isFirst ? "eager" : loading}
              fetchpriority={isFirst ? "high" : "auto"}
              src={obtainiumPng}
              alt="Obtainium"
              style="width: 207px; height: 80px" />
          </picture>
        </a>
        <p>
          <span style="color: #ffc627"
            ><i class="fas fa-file-arrow-down" style="margin-left: 8px;"></i
            ></span>
          <a
            {rel}
            href="https://raw.githubusercontent.com/netwk-pro/dev-sveltekit/refs/heads/master/assets/bin/linksheet.json"
            download
            type="application/json"
            style="margin-left: 8px;"
            target="_blank">
            Obtainium App Config
          </a>
        </p>
      </div>
    {/if}

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
