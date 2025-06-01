<!-- ==========================================================================
src/lib/pages/TestCsp.svelte

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<script>
  import { onMount } from "svelte";

  onMount(() => {
    const script = document.createElement("script");
    script.src = "https://evil.example.com/does-not-exist.js";
    document.body.appendChild(script);
  });
</script>

<h1>CSP Violation Test</h1>

<p style="font-weight: bold; color: red;">
  ⚠️ This page intentionally loads a disallowed external script to trigger a CSP
  violation.
</p>
