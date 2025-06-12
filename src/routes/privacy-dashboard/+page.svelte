<!-- ==========================================================================
src/routes/privacy-dashboard/+page.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import Badges from '$lib/components/Badges.svelte';
  import FullWidthSection from '$lib/components/FullWidthSection.svelte';
  import PrivacyDashboard from '$lib/pages/PrivacyDashboard.svelte';
  import LegalNav from '$lib/components/LegalNav.svelte';
  import SocialMedia from '$lib/components/SocialMedia.svelte';
  import MetaTags from '$lib/components/MetaTags.svelte';

  /**
   * @type {string}
   * Style class for the horizontal rule element.
   */
  const hrStyle = 'hr-styled';

  /**
   * @type {string}
   * Style class for the div element.
   */
  const spaceStyle = 'spacer';

  export let data;
</script>

<MetaTags title={data.meta.title} description={data.meta.description} />

<link rel="canonical" href="https://netwk.pro/privacy-dashboard" />

<section id="privacy">
  <FullWidthSection containerClass="readable">
    <!-- BEGIN PRIVACY DASHBOARD -->
    <section id="main-content">
      <PrivacyDashboard />
    </section>
    <!-- END PRIVACY DASHBOARD -->

    <div class={spaceStyle}></div>

    <!-- BEGIN SOCIAL MEDIA -->
    <section id="social-media">
      <SocialMedia />
    </section>
    <!-- END SOCIAL MEDIA -->

    <hr />

    <div class={spaceStyle}></div>

    <!-- BEGIN LEGAL -->
    <section id="legal-nav">
      <LegalNav />
    </section>
    <!-- END LEGAL -->

    <div class={spaceStyle}></div>

    <!-- BEGIN BADGES -->
    <section id="badges">
      <Badges />
    </section>
  </FullWidthSection>
</section>
