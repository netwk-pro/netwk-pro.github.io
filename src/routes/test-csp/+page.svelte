<script>
  import { onMount } from "svelte";

  onMount(() => {
    const script = document.createElement("script");
    script.src = "https://evil.example.com/nonExistent.js";
    document.body.appendChild(script);
  });
</script>

<h1>CSP Violation Test</h1>

<p style="font-weight: bold; color: red;">
  ⚠️ This page intentionally violates the site's Content Security Policy for
  testing purposes.
</p>
