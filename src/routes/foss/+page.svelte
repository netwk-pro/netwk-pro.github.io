<!-- ==========================================================================
src/routes/foss/+page.svelte

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
  import { FossContent } from '$lib/pages';
</script>

<section id="license">
  <FullWidthSection>
    <!-- BEGIN FOSS SPOTLIGHT -->
    <section id="main-content">
      <FossContent />
    </section>
    <!-- END FOSS SPOTLIGHT -->

    <div class="spacer"></div>

    <!-- BEGIN SOCIAL MEDIA -->
    <section id="social-media">
      <SocialMedia />
    </section>
    <!-- END SOCIAL MEDIA -->

    <hr />

    <div class="spacer"></div>

    <!-- BEGIN LEGAL -->
    <section id="legal-nav">
      <LegalNav />
    </section>
    <!-- END LEGAL -->

    <div class="spacer"></div>

    <!-- BEGIN BADGES -->
    <section id="badges">
      <Badges />
    </section>
  </FullWidthSection>
</section>
