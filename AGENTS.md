<!-- =====================================================================
AGENTS.md

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
====================================================================== -->

# AGENTS.md

This file defines **operational guidance for automated agents** (e.g., Codex,
Claude Code, CI bots) working in this repository. It is intentionally
tool-neutral.

For deeper project context, architecture notes, and AI-specific guidance, see
`CLAUDE.md`.

---

## Purpose

Agents are welcome here to accelerate development, testing, and maintenance —
**without compromising security, privacy, or deployment correctness**.

This repo has intentionally strict security controls (CSP, audit mode behavior,
analytics gating) and a multi-environment deployment model. Agents must treat
these as **invariants** unless a human explicitly approves changes.

## Agent workflow (persona)

- Prefer minimal diffs; avoid sweeping refactors unless requested.
- Be explicit about tradeoffs and risks; don’t guess about CI/deploy behavior.
- For version-sensitive third-party behavior, verify against current documentation
  rather than relying solely on model memory.
- Preserve behavior by default; if a change alters behavior, call it out explicitly.
- Preserve invariants: env detection, CSP, audit-mode guarantees, analytics gating.
- If unsure, ask a single targeted question or leave a TODO rather than inventing.
- Optimize for reproducibility: commands that work locally and in CI.

## Svelte MCP Server

Agents may use the Svelte MCP server for current Svelte 5 and SvelteKit
documentation, implementation guidance, and code validation.

### Available Svelte MCP Tools

#### 1. `list-sections`

Use this when documentation lookup is needed and the relevant documentation
section is not already known.

Do not call `list-sections` automatically for every Svelte-related task if the
task can be completed directly from repository context or if the relevant
documentation path is already known.

#### 2. `get-documentation`

Use this to retrieve the documentation sections relevant to the task.

When documentation lookup is required:

1. Identify the relevant sections using `list-sections` when necessary.
2. Review section titles and `use_cases`.
3. Fetch the specific documentation sections needed for the task.

Prefer current Svelte MCP documentation over remembered framework behavior when
working with version-sensitive Svelte or SvelteKit APIs.

#### 3. `svelte-autofixer`

Use this whenever creating or materially modifying Svelte component code.

Run the tool before considering Svelte code complete, and address relevant
issues or suggestions it reports.

Do not repeatedly invoke it when no Svelte code has changed since the previous
clean result.

#### 4. `playground-link`

Use this only when a standalone Svelte Playground would materially help the
user.

Do not generate a playground link when:

- code has already been written directly to project files, or
- the user has not asked for or indicated a need for a standalone reproduction.

If a playground would be useful, offer it after the implementation is complete.

## Context7 Documentation Lookup

Agents may use Context7 to retrieve current, version-specific documentation for
third-party libraries, frameworks, CLIs, build tools, and development platforms.

Use Context7 when:

- Current or version-specific behavior may affect the implementation.
- Working with recently changed APIs, configuration formats, or CLI options.
- Performing major-version migrations or dependency upgrades.
- Verifying exact function signatures, configuration keys, command-line flags,
  deprecations, or replacement APIs.
- The repository's installed dependency version may differ from the agent's
  remembered/default knowledge.
- A task depends on fast-moving tooling such as Vite, Vitest, ESLint, npm,
  GitHub Actions, Playwright, or similar ecosystems.

Prefer authoritative upstream documentation retrieved through Context7 over
remembered API behavior when the two may differ.

Do NOT use Context7 merely for:

- Generic programming concepts.
- Stable language syntax or standard-library behavior.
- Repository-local implementation details that can be determined directly from
  the codebase.
- Questions already answered conclusively by the repository's committed
  documentation or configuration.

When dependency behavior is version-sensitive, first inspect the repository's
actual dependency/version constraints (for example `package.json`,
`package-lock.json`, or tool configuration), then query Context7 for documentation
relevant to that version.

If Context7 documentation conflicts with the repository's current implementation,
do not silently rewrite the implementation. Call out the discrepancy and preserve
existing behavior unless the task explicitly requires a migration or correction.

## Quick Commands

Use these commands as the “happy path” for local and CI-like validation:

### Development

- `npm run dev` — start dev server
- `npm run dev:audit` — dev server in audit mode (hardened CSP, no analytics)
- `npm run preview` — preview production build locally

### Build

- `npm run build` — production build
- `npm run build:audit` — audit build (hardened CSP)

### Agent / Codex

- `npm run dev:codex` — production-like dev mode with agent context enabled
- `npm run build:codex` — production-like build with agent context enabled

### Tests

- `npm run test:all` — unit tests (client + server)
- `npm run test:e2e` — Playwright E2E tests (with 1 retry)
- `npm run lhci:run` — Lighthouse CI audits

### Lint / Format

- `npm run lint:all`
- `npm run lint:fix`
- `npm run format:fix`

### Full Verification

- `npm run checkout` (alias: `npm run verify`)

## Guardrails (Strict, but Practical)

### Environment and security invariants

Agents MUST NOT change the following without explicit human approval:

- **Environment detection logic** (notably `src/lib/utils/env.js`) or introduce
  new environment modes.
- **Content Security Policy** generation/behavior (`svelte.config.js` `kit.csp`
  plus related `src/hooks.server.js` reporting headers) in a way that weakens
  enforcement.
- **Audit-mode guarantees**: audit must remain hardened (no analytics, no
  external reporting, strict CSP).
- **Analytics gating**: tracking must remain consent-based and
  environment-aware.
- **Service worker exclusions**: analytics domains must not be cached; SW bypass
  behavior must remain intact.

If a task requires modifying the behavior or security properties of any of the
above, stop and ask for confirmation.

### Deployment and CI/CD accuracy

Agents MUST NOT invent deployment behavior. The current model is:

- **Production**: Vercel builds/deploys on merges to `master` (Vercel-managed).
- **Audit**: Netlify deploy driven by a branch-scoped GitHub Actions workflow
  (`audit-netlify` branch only).

If a change would affect build/deploy behavior, document assumptions and ask for
confirmation.

If referencing a workflow/config, point to the exact file path and branch it lives on.

### Secrets and sensitive data

- Do **not** commit secrets, tokens, keys, or credentials.
- `.env*` files must remain purpose-separated. Only non-sensitive, commit-safe
  env files belong in git.
- If secrets are required for a task, request them via the tool’s secret
  mechanism and use placeholders in committed files.

## Allowed Agent Work

Agents MAY do the following without additional approval (assuming guardrails are
respected):

- Explain code and architecture; summarize behavior and risks.
- Implement **incremental** features or routes that follow existing patterns.
- Fix bugs and reduce flakiness in tests using minimal, targeted changes.
  - For SPA E2E tests, prefer URL polling + page-ready assertions over navigation lifecycle waits.
- Add/extend unit tests or E2E tests consistent with current test architecture.
- Refactor for clarity **without changing behavior** (especially in security/env
  paths).
- Improve documentation, comments, and JSDoc.
- Propose dependency updates, with a short rationale, expected impact, and
  documentation-backed notes for breaking or version-sensitive changes.

## Sensitive Areas (Ask Before Major Changes)

These areas are high-impact. Changes that are not already prohibited by the
guardrails above require extra care and may require a quick human check:

- `src/lib/utils/env.js` (environment resolution)
- `svelte.config.js` (`kit.csp`, adapters, build-time mode handling)
- `src/hooks.server.js` (request-time security headers / diagnostics)
- `src/service-worker.js` and SW registration logic
- `src/lib/stores/posthog.js` and analytics init/gating
- Auth, redirects, proxy/relay routes under `src/routes/relay-*`
- Build tooling (`vite.config.js`, CI workflows, deploy scripts)

When editing these, prefer:

- minimal diffs
- explicit control flow
- comments describing intent and risk

## What “Done” Means for Agent Work

Before claiming a task is complete, agents should:

1. Ensure changes are minimal and aligned with existing patterns.
2. Run (or at least recommend running) appropriate checks:
   - `npm run lint:all`
   - `npm run test:all`
   - `npm run test:e2e` (if UI/routes are affected)
   - `npm run build` (if build/runtime behavior is affected)
3. Include a short summary:
   - what changed
   - why it changed
   - risk/impact (especially CSP/env/analytics)
   - any follow-ups or TODOs

If tests are flaky, call it out explicitly and propose stabilization steps
rather than masking failures.

## Notes for Cloud / Ephemeral Runners

Many agents run in ephemeral environments. To keep builds reproducible:

- Do not assume local files exist unless they are committed.
- Prefer deterministic commands (`npm ci` when appropriate to lockfile policy).
- Avoid relying on interactive prompts.
- If environment variables are required, document them and provide safe defaults
  where possible.

## References

- `CLAUDE.md` — authoritative AI guidance and deeper repository context.
