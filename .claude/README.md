<!-- =====================================================================
.claude/README.md

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
====================================================================== -->

# AI Tooling

This project ships Svelte-focused AI tooling for **[Claude Code](https://claude.com/claude-code)** and compatible
agents.

Please refer to the [official Svelte instructions](https://svelte.dev/docs/ai/overview) for the appropriate use of these tools with your agent.

The Svelte MCP server is provided through the Claude Code plugin. If you use
another agent, add the server by following Svelte's
[local setup guide](https://svelte.dev/docs/ai/local-setup).

| Component     | Location                                                                   | Purpose                                                                                      |
| ------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Instructions  | [`AGENTS.md`](../AGENTS.md), [`CLAUDE.md`](../CLAUDE.md)                   | Project rules and guardrails for agents                                                      |
| Svelte plugin | [`settings.json`](./settings.json)                                         | Enables the `svelte@svelte` Claude Code plugin (Svelte MCP server, skills, and editor agent) |
| Skill         | [`svelte-code-writer`](./skills/svelte-code-writer/SKILL.md)               | Svelte docs lookup and code analysis via CLI                                                 |
| Skill         | [`svelte-core-bestpractices`](./skills/svelte-core-bestpractices/SKILL.md) | Guidance for writing modern, idiomatic Svelte code                                           |

## Attribution

The `svelte-code-writer` and `svelte-core-bestpractices` skills in
[`skills/`](./skills/) are from
[sveltejs/ai-tools](https://github.com/sveltejs/ai-tools), Copyright © 2026
[Svelte Contributors](https://github.com/sveltejs/ai-tools/graphs/contributors),
and are redistributed under the MIT License. The full license text is in
[`skills/LICENSE`](./skills/LICENSE).

### Modifications

The skills have been slightly modified from the upstream versions in
[`plugins/claude/svelte/skills`](https://github.com/sveltejs/ai-tools/tree/main/plugins/claude/svelte/skills).
SvelteKit 3 no longer reads `svelte.config.js`, so the instructions for enabling
`experimental.async` now point to the `sveltekit()` plugin in `vite.config.js`:

- [`svelte-core-bestpractices/SKILL.md`](./skills/svelte-core-bestpractices/SKILL.md)
  (Async Svelte): the option is enabled in the `sveltekit()` plugin's
  `compilerOptions` in `vite.config.js`, replacing "in the plugin options in
  `vite.config.js` or in the `svelte.config.js`".
- [`svelte-core-bestpractices/references/await-expressions.md`](./skills/svelte-core-bestpractices/references/await-expressions.md):
  the text says "usually the `sveltekit()` plugin in `vite.config.js`" instead
  of "usually `svelte.config.js`", and the example configures
  `compilerOptions.experimental.async` through `sveltekit()` in
  `vite.config.js` instead of exporting it from `svelte.config.js`.

No other skill files differ from upstream.

---

## Disclaimer

Network Pro Strategies is not affiliated with, endorsed by, or sponsored by
Anthropic or the [Svelte project](https://github.com/sveltejs/svelte). Claude
and Claude Code are trademarks of Anthropic, PBC. Svelte and SvelteKit are the
property of their respective owners. All other trademarks belong to their
respective holders.

The third-party skills, plugins, and MCP servers listed above are provided
by their maintainers under their own licenses and terms. They are referenced
here for convenience only and are provided "as is," without warranty of any
kind.

AI-generated output may be inaccurate, incomplete, or insecure. Contributors
are responsible for reviewing, testing, and validating all AI-assisted
changes before submitting them. See [`AGENTS.md`](../AGENTS.md) for the
project's guardrails.

---

Copyright &copy; 2025, 2026  
**[Network Pro Strategies, LLC](https://netwk.pro) (Network Pro&trade;)**

Network Pro&trade;, the shield logo, and the "Locking Down Networks...&trade;" slogan are [trademarks](https://netwk.pro/legal#trademark) of Network Pro Strategies, LLC.

Licensed under **[CC BY 4.0](https://netwk.pro/legal#cc-by)** and the **[GNU GPL](https://netwk.pro/legal#gnu-gpl)**, as published by the [Free Software Foundation](https://www.fsf.org), either version 3 of the License, or (at your option) any later version.

<!-- cspell:ignore bestpractices -->
