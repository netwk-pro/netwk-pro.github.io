<!-- ==========================================================================
src/routes/pgp/+page.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import {
    Badges,
    FullWidthSection,
    LegalNav,
    SocialMedia,
  } from '$lib/components';
  import { PGPContent } from '$lib/pages';
</script>

<section id="about">
  <FullWidthSection containerClass="readable">
    <!-- BEGIN MAIN CONTENT -->
    <section id="main-content">
      <PGPContent />
    </section>
    <!-- END MAIN CONTENT -->

    <div class="spacer"></div>

    <!-- SOCIAL MEDIA -->
    <section id="social-media">
      <SocialMedia />
    </section>

    <hr />

    <div class="spacer"></div>

    <!-- LEGAL NAVIGATION -->
    <section id="legal-nav">
      <LegalNav />
    </section>

    <div class="spacer"></div>

    <!-- BADGES -->
    <section id="badges">
      <Badges />
    </section>
  </FullWidthSection>
</section>
