# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

For tool-neutral operational guidance for automated agents (e.g., Codex, CI bots), see `AGENTS.md`.

<!-- markdownlint-disable -->

## Project Overview

This is a **SvelteKit-based web presence** for Network Pro Strategies, deployed via Vercel. The codebase emphasizes security, privacy, and maintainability, and is distributed as both a production website and an npm package (`@networkpro/web`). It includes Progressive Web App (PWA) functionality with a custom service worker, strict Content Security Policy (CSP) configuration, and comprehensive testing.

## AI Guardrails

This repository may be worked on using AI-assisted tools (e.g., Claude Code). When doing so, the following guardrails apply:

- **Do not introduce new environment modes** or alter environment-detection logic (`src/lib/utils/env.js`) without explicit human approval.
- **Do not weaken security posture**: CSP rules, analytics gating, service worker exclusions, and audit-mode behavior must not be relaxed for convenience.
- **Do not invent or assume CI/CD workflows**: Deployment behavior must match existing infrastructure (Vercel for production, Netlify for audit via branch-scoped workflow).
- **Do not add or modify analytics, telemetry, or external network calls** without confirming consent and environment gating logic.
- **Do not refactor for style or abstraction alone** if it obscures intent, security checks, or explicit control flow.
- **Do not commit secrets or sensitive data**; environment files are strictly separated by purpose.
- **Prefer explicit, readable code over "clever" optimizations**, especially in security- or environment-related paths.

If a change would materially affect security, deployment behavior, environment resolution, or privacy guarantees, **pause and ask for confirmation** before proceeding.

AI tools should treat this file (`CLAUDE.md`) as authoritative guidance and defer to existing documentation and code comments where conflicts arise.

## Allowed AI Uses

AI-assisted tools may be used in this repository for the following purposes:

- **Code comprehension and explanation**: Explaining existing logic, security controls, environment detection, or architectural decisions.
- **Incremental feature development**: Implementing new features or routes that follow established patterns and respect existing constraints.
- **Bug fixing and debugging**: Identifying defects, edge cases, or test failures and proposing targeted fixes.
- **Test creation and improvement**: Writing or extending unit tests, integration tests, and E2E tests consistent with existing testing architecture.
- **Refactoring for clarity**: Improving readability, structure, or maintainability _without altering behavior, security posture, or environment semantics_.
- **Documentation updates**: Improving README files, comments, JSDoc, and other documentation to better reflect current behavior.
- **Dependency and configuration review**: Highlighting outdated dependencies, misconfigurations, or potential risks (without making changes unilaterally).
- **Accessibility and standards compliance**: Suggesting improvements related to a11y, web standards, or best practices, subject to review.
- **Clarifying questions**: Asking for confirmation when intent, risk, or trade-offs are unclear.

AI output should be treated as **assistance, not authority**. All changes are subject to human review and approval.

## Essential Commands

### Development

```bash
npm run dev                # Start dev server
npm run dev:audit          # Dev server in audit mode (hardened CSP, no analytics)
npm run build              # Production build
npm run build:audit        # Audit build (for testing hardened CSP)
npm run preview            # Preview production build locally
```

### Testing

```bash
npm run test:all           # Run all unit tests (client + server)
npm run test:client        # Run client-side unit tests (jsdom)
npm run test:server        # Run server-side unit tests (node)
npm run test:watch         # Watch mode for client tests
npm run test:coverage      # Generate coverage reports
npm run test:e2e           # Run Playwright E2E tests (with 1 retry)
npm run lhci:run           # Run Lighthouse CI audits
```

### Linting & Formatting

```bash
npm run lint:all           # Run all linters (JS, CSS, Markdown, Prettier)
npm run lint:fix           # Auto-fix ESLint issues
npm run format:fix         # Auto-fix Prettier formatting
npm run lint:css           # Lint CSS and Svelte styles
npm run lint:md            # Lint Markdown files
```

### Pre-commit Verification

```bash
npm run checkout           # Full verification (type-check, tests, linting)
npm run verify             # Alias for checkout
```

### Single Test Execution

```bash
# Run a specific client test
npx vitest run tests/unit/client/path/to/test.test.js

# Run a specific server test
npx vitest run tests/unit/server/path/to/test.test.js

# Run a specific E2E test
npx playwright test tests/e2e/app.spec.js
```

## Architecture & Key Patterns

### Environment Management

The project uses a sophisticated multi-environment setup with behavior controlled by `ENV_MODE` and `PUBLIC_ENV_MODE`:

- **`development` / `dev`**: Local development with relaxed CSP, no analytics
- **`production` / `prod`**: Full CSP enforcement, PostHog analytics enabled, CSP reporting to production endpoint
- **`audit`**: Hardened environment for security testing—no analytics, no external connections, strict CSP
- **`test`**: CI/test mode with relaxed CSP for automation
- **`codex`**: Special mode for Claude Code development

**Critical**: Environment detection happens in two places:

1. **Build-time**: Via `import.meta.env.MODE` or `PUBLIC_ENV_MODE` (baked into bundle)
2. **Runtime**: Via hostname detection in `src/lib/utils/env.js` (e.g., `audit.netwk.pro` triggers audit mode)

The `detectEnvironment()` function in `src/lib/utils/env.js` unifies this logic and is used throughout the app.

### Content Security Policy (CSP)

CSP headers are dynamically generated in `src/hooks.server.js` based on environment:

- **Production**: Strict CSP with `Content-Security-Policy` header, real CSP reporting endpoint
- **Audit**: Hardened CSP with no analytics domains, no CSP reporting
- **Dev/Test**: Report-only mode (`Content-Security-Policy-Report-Only`) for debugging

**Current Trade-off**: The CSP allows `unsafe-inline` for scripts and styles due to PostHog and SvelteKit limitations. Moving to nonce-based CSP is a documented future goal (see README.md).

**Probely Scanner Allowlisting**: The `hooks.server.js` includes logic to detect and bypass security checks for Probely DAST scanners using `isProbelyScanner()` from `src/lib/security/probely.js`.

### Service Worker & PWA

The service worker is defined in `src/service-worker.js` and handles:

- Precaching of build artifacts and static files
- Runtime caching strategies (cache-first, network-first)
- Analytics domain blocking (PostHog never cached)
- Cache versioning and cleanup

**Registration**: `src/lib/registerServiceWorker.js` handles:

- SW registration and update lifecycle
- Cache cleanup (removes non-prefixed caches)
- Install prompt support (`beforeinstallprompt` event)
- Firefox localhost compatibility skip
- `?nosw` query parameter bypass via `static/disableSw.js`

### Route Structure

- **`+page.svelte`**: Page component
- **`+page.server.js`**: Server-side page load (metadata, redirects)
- **`+layout.svelte`**: Root layout with analytics init, MetaTags, header/footer
- **`+layout.js`**: Client-side layout load (pathname detection)
- **`+server.js`**: API endpoints (e.g., `/api/mock-csp`, `/pgp/[key]`)

**Special Routes**:

- `/pgp/[key]/+server.js`: Dynamic PGP key serving with proper Content-Type headers
- `/api/mock-csp/+server.js`: Mock CSP violation reporting endpoint for dev/test
- `/relay-[slug]/[...catchall]/+server.js`: Dynamic redirect handler

### Component Organization

```
src/lib/
├── components/         # Reusable Svelte components
│   ├── layout/        # Header, Footer
│   └── foss/          # FOSS-specific components
├── pages/             # Page-specific content components (e.g., AboutContent.svelte)
├── data/              # Static data (fossData.js, pgpKeys.js)
├── stores/            # Svelte stores (posthog.js, trackingPreferences.js)
├── utils/             # Helper utilities (env.js, utm.js, purify.js)
├── types/             # Type definitions and constants
├── styles/            # Global CSS
└── security/          # Security utilities (probely.js)
```

**Import Pattern**: Use `$lib` alias for all internal imports (configured in `jsconfig.json` via `vite-tsconfig-paths`).

### Analytics & Tracking

PostHog is initialized in `src/lib/stores/posthog.js` and conditionally loaded based on:

- Environment (disabled in audit, test, dev)
- User consent (tracked in `trackingPreferences.js` store)
- Browser support

**Key Functions**:

- `initPostHog()`: Initializes PostHog with consent checking
- `capture(event)`: Wrapper for PostHog event capture
- `showReminder`: Svelte store for tracking consent banner state

Analytics initialization happens in `src/lib/utils/initAnalytics.js`, called from `+layout.svelte`.

### Testing Architecture

**Unit Tests**: Split into client (jsdom) and server (node) contexts with separate Vitest configs:

- `tests/unit/client/`: Browser-environment tests (components, client utils)
- `tests/unit/server/`: Node-environment tests (server utils, API endpoints)
- `tests/unit/server/internal/auditCoverage.test.js`: Warns about untested source files

**E2E Tests**: Playwright tests in `tests/e2e/`:

- `app.spec.js`: Desktop and mobile route tests
- `mobile.spec.js`: Mobile-specific assertions
- `shared/helpers.js`: Shared test utilities (viewport helpers, element getters)

**Coverage Audit**: The project includes a coverage audit that warns (but doesn't fail) when source files lack corresponding unit tests.

## Configuration Files

- **`svelte.config.js`**: SvelteKit config with Vercel adapter, prerender error handling
- **`vite.config.js`**: Vite config with SvelteKit, LightningCSS, devtools-json plugins
- **`vitest.config.client.js`**: Client-side unit test config (jsdom environment)
- **`vitest.config.server.js`**: Server-side unit test config (node environment)
- **`playwright.config.js`**: E2E test config (Chromium, Firefox, WebKit)
- **`.lighthouserc.cjs`**: Lighthouse CI audit configuration
- **`postcss.config.cjs`**: PostCSS with autoprefixer
- **`vercel.json`**: Vercel deployment config

## Development Workflows

### Adding a New Route

1. Create `src/routes/your-route/+page.svelte`
2. Create `src/routes/your-route/+page.server.js` for metadata:
   ```javascript
   export function load() {
     return {
       meta: {
         title: 'Your Page Title',
         description: 'Your page description',
       },
     };
   }
   ```
3. Add corresponding E2E test in `tests/e2e/app.spec.js`
4. Update sitemap at `static/sitemap.xml` if needed

### Adding a New Component

1. Create component in `src/lib/components/YourComponent.svelte`
2. Export from `src/lib/components/index.js` if it's shared
3. Add unit test in `tests/unit/client/components/YourComponent.test.js`
4. Use `$lib/components` alias for imports

### Modifying CSP

1. Edit `src/hooks.server.js` and update `cspDirectives` array
2. Test in audit mode: `npm run dev:audit`
3. Check CSP violations in browser console or `/api/mock-csp` logs
4. Update tests if needed

### Adding Analytics Events

1. Import `capture` from `$lib/stores/posthog`
2. Call `capture('event_name', { properties })` in client-side code
3. Events are automatically gated by consent and environment checks

## Important Constraints

### Security Considerations

- **Never commit sensitive data**: Use `.env` for local secrets, never `.env.template`
- **CSP compliance**: All inline scripts/styles must work with `unsafe-inline` or be refactored for nonces
- **Service worker**: Analytics domains (PostHog) are explicitly excluded from SW caching
- **PGP keys**: `.asc` files in `static/pgp/` are served directly, not precached

### Code Quality Standards

- **No emojis** in commit messages or code comments unless explicitly requested
- **Copyright headers** required on all source files
- **ESLint + Prettier** enforced via pre-commit hooks
- **Stylelint** for CSS/Svelte style validation
- **JSDoc** required for exported functions

### Build Requirements

- **Node.js**: >= 22.0.0, < 25
- **npm**: >= 10.0.0, < 12
- Enforced via `engines` in `package.json` and `scripts/checkNode.js`

### Testing Requirements

- Unit tests should use appropriate environment (client vs. server)
- E2E tests automatically retry once to reduce flakiness
- Coverage audit warns about untested files but doesn't fail CI

## Common Gotchas

1. **Service Worker Caching**: Use `?nosw` query param to bypass SW for testing
2. **Environment Detection**: Remember that `audit.netwk.pro` hostname overrides build mode
3. **CSP Violations**: Check browser console in dev mode; violations are logged to `/api/mock-csp`
4. **PostHog Initialization**: Happens asynchronously; use `$isInitialized` store to check status
5. **Static Asset Imports**: Use Vite's `import` syntax (e.g., `import logo from '$lib/img/logo.png'`)
6. **Prerendering**: Some routes are prerendered at build time; check `svelte.config.js` error handlers

## Debugging Tips

- **Enable debug mode**: Add `?debug=true` to URL for verbose console logs
- **Disable service worker**: Add `?nosw` to URL to bypass SW caching
- **Check environment**: Use `detectEnvironment()` in any file to see current env flags
- **View CSP violations**: Check `/api/mock-csp` endpoint logs in dev mode
- **Playwright UI mode**: Run `npx playwright test --ui` for interactive debugging

## Deployment Environments

- **Production**
  - URL: `https://netwk.pro`
  - Hosting: **Vercel**
  - Deployment model: Automatic builds and deployments triggered by merges to `master`
  - CI: Managed by Vercel (not GitHub Actions)

- **Audit**
  - URL: `https://audit.netwk.pro`
  - Hosting: **Netlify**
  - Purpose: Hardened security environment (strict CSP, no analytics, no external reporting)
  - Deployment model:
    - Built and deployed via a GitHub Actions workflow
    - Workflow file: `.github/workflows/deploy-audit-netlify.yml`
    - Workflow exists **only on the `audit-netlify` branch**
    - Deployments are intentionally decoupled from production

- **Preview**
  - Hosting: Vercel
  - Trigger: Pull requests and non-`master` branches
  - Purpose: Ephemeral previews for review and testing

**Note**: There is no single CI/CD pipeline shared by all environments. Production relies on Vercel’s native build system, while the audit environment uses a dedicated, branch-scoped GitHub Actions workflow.

<!-- cspell:ignore prerender precached Prerendering prerendered -->
