<!-- =====================================================================
CHANGELOG.md

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
====================================================================== -->

# Changelog

<!-- markdownlint-disable MD024 -->

<!-- Use sections: Added, Changed, Deprecated, Removed, Fixed, Security -->

All notable changes to this project will be documented in this file.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Version numbers use a **SemVer-inspired** `MAJOR.MINOR.PATCH` format, with
version increments reflecting both user-visible and operational impact.

---

## [Unreleased]

---

## [1.25.23] - 2026-01-04

### Changed

- Updated `README.md` to accurately reflect hosting.
- Updated timestamp in `static/.well-known/security.txt` and created a new detached signature.
- Bumped project version to `v1.25.23`.

---

## [1.25.22] - 2026-01-01

### Added

- Conditional guards to ensure artifacts, issues, and external notifications are only created when workflows run in a trusted context (non-PR runs or PRs originating from the same repository).
- Redacted, public-safe Gitleaks scan summaries in GitHub Actions step output to prevent accidental exposure of sensitive file paths or values.
- Optional installation of `jq` gated to trusted execution contexts to support future structured output (e.g., SARIF) while preserving fork safety.

### Changed

- Updated the Gitleaks secret scanning workflow to explicitly exclude Dependabot pull requests, avoiding failures caused by unavailable organization secrets in bot-triggered PRs.
- Refined workflow trust boundaries to distinguish between forked pull requests and trusted repository contexts.
- Updated `.gitignore` to stop tracking generated `.svelte-kit` files.
- Bumped project version to `v1.25.22`.
- Updated dependencies:
  - `stylelint-order` `^7.0.0` → `^7.0.1`
  - `posthog-js` `^1.310.1` → `^1.313.0`
  - `globals` `^16.5.0` → `^17.0.0`

### Removed

- Removed Mastodon verification in `src/routes/posts/+page.svelte`, as it was not functioning properly. This route will remain unverified.

### Security

- Hardened secret-handling logic in CI by preventing the use of organization-level secrets, write permissions, and external notifications in untrusted pull request contexts.
- Ensured Gitleaks license usage is restricted to safe execution paths, eliminating false-negative or false-positive failures caused by GitHub Actions secret scoping rules.
- Added transitive dependency override for `qs` to `^6.14.1`, in order to address CVE-2025-15284.

---

## [1.25.21] - 2025-12-27

### Added

- Added Mastodon verification to `src/routes/posts/+page.svelte` via `<svelte:head>`.

### Changed

- Updated intro paragraph of `README.md` to better reflect the company's current mission, focus, and messaging.
- Bumped project version to `v1.25.21`.
- Updated dependencies:
  - `@testing-library/svelte` `^5.3.0` → `^5.3.1`
  - `jsdom` `27.3.0` → `27.4.0`

---

## [1.25.20] - 2025-12-24

### Added

- Added `VERSIONING.md` to document the project’s versioning strategy.

### Changed

- Updated `.lighthouse.cjs` to utilize `https://netwk.pro` as the target.
- Removed **Services** route from `sitemap.xml` and refreshed last modified timestamps.
- Updated `README.md` to clarify the project's versioning strategy and changelog format.
- Updated `src/routes/+page.svelte` to apply `containerClass="readable"` to `<FullWidthSection>` for improved readability.
- Revised homepage and About page content (`HomeContent.svelte` and `AboutContent.svelte`) to better reflect the company’s current mission, focus, and messaging.
- Bumped project version to `v1.25.20`.

### Removed

- Removed **Services** from primary navigation (`HeaderDefault.svelte` and `HeaderHome.svelte`).
- Removed references to home implementation services from `AboutContent.svelte`.
  - This change reflects a clarified focus on internal research, education, advocacy, and selectively aligned consulting, rather than broad outward-facing service offerings.

---

## [1.25.19] - 2025-12-24

### Changed

- Updated GitHub workflows to utilize `actions/checkout@v6`, `actions/upload-artifact@v6`, and `actions/download-artifact@v7`:
  - `.github/workflows/templates/publish.template.yml`
  - `.github/workflows/backup-branch.yml`
  - `.github/workflows/build-and-publish.yml`
  - `.github/workflows/dependency-review.yml`
  - `.github/workflows/lighthouse.yml`
  - `.github/workflows/meta-check.yml`
  - `.github/workflows/playwright.yml`
  - `.github/workflows/probely-scan.yml`
  - `.github/workflows/publish-test.yml`
  - `.github/workflows/secret-scan.yml`
- Corrected `README.md` to properly state that subsites are hosted on Vercel and Netlify.
- Updated `.node-version` and `.nvmrc` to utilize **Node.js** `v24.12.0`.
- Bumped project version to `v1.25.19`.
- Updated dependencies:
  - `@eslint/js` `^9.39.1` → `^9.39.2`
  - `@testing-library/svelte` `^5.2.9` → `^5.3.0`
  - `autoprefixer` `^10.4.22` → `^10.4.23`
  - `eslint` `^9.39.1` → `^9.39.2`
  - `prettier-plugin-svelte` `^3.4.0` → `^3.4.1`
  - `svelte-check` `^4.3.4` → `^4.3.5`
  - `globby` `^16.0.0` → `^16.1.0`
  - `posthog-js` `^1.305.0` → `^1.310.1`
  - `svelte` `5.45.9` → `5.46.1`
  - `vite` `^7.2.7` → `^7.3.0`
  - `vite-tsconfig-paths` `^5.1.4` → `^6.0.3`

## Removed

- Removed `/* eslint-env vitest */` comment from `vitest-setup-client.js`, as it was causing an ESLint warning.

---

## [1.25.18] - 2025-12-11

### Changed

- Refreshed timestamp for root route in `sitemap.xml`.
- Reformatted the following files with Prettier:
  - `src/lib/README.md`
  - `src/lib/pages/LicenseContent.svelte`
  - `src/lib/pages/PrivacyContent.svelte`
  - `src/lib/pages/TermsUseContent.svelte`
- Bumped project version to `v1.25.18`.
- Updated dependencies:
  - `prettier` `3.6.2` → `3.7.4`

---

## [1.25.17] - 2025-12-11

### Added

- Added SSR boundary protection test (`tests/unit/server/internal/ssrBoundary.test.js`):
  - Detects Node-only imports (`jsdom`, `fs`, `path`, etc.) in client-visible modules.
  - Ensures imports are properly gated behind `import.meta.env.SSR`.
  - Prevents accidental SSR/client boundary violations in future code changes.
- Added support for detecting SSR-safe code paths by allowing SSR-gated dynamic imports in shared modules.

### Changed

- Refactored `src/service-worker.js` for improved consistency, clarity, and lint compatibility:
  - Removed unused function parameters (`_err`) and adjusted callback signatures to align with ESLint expectations.
  - Replaced anonymous no-op parameters with explicitly ignored placeholders using the `_` naming convention.
  - Improved async iteration patterns in asset caching logic for better readability and maintainability.
  - Updated JSDoc annotations for accuracy and improved editor support.
  - Ensured all cache operations conform to structured error-handling patterns consistent with the rest of the codebase.

- Updated `src/lib/utils/purify.js`:
  - Replaced `typeof window !== 'undefined'` guard with compile-time `import.meta.env.SSR`.
  - Ensures Vite tree-shakes `jsdom` imports from client bundles.
  - Fixed build failures caused by jsdom/cssstyle when bundled on the client.
  - Preserves existing DOMPurify caching and SSR behavior.

- Enhanced ESLint `no-unused-vars` rule in `eslint.config.mjs`:
  - Added support for ignoring unused catch parameters via `caughtErrors` and `caughtErrorsIgnorePattern`.
  - Prevented false positives on intentionally unused error variables (e.g., `_err`).
  - Expanded ignore patterns to match project coding conventions.

- Replaced `src/lib/img/qr/vcard.png` and `src/lib/img/qr/vcard.webp` with revised versions.
- Updated GitHub workflows to utilize **npm** `11.7.0`.
- Updated generator metadata in `src/app.html` to reflect **SvelteKit 2.49.2**.
- Updated `src/lib/README.md` to reflect the newly updated app constant.
- Updated contact information in `static/bin/contact.vcf`.
- Updated `CONTACT.PHONE` app constant to reflect our new phone number, (602) 428-5300.
- Removed `jsdom` from `.ncurc.cjs` `reject` list.
- Bumped project version to `v1.25.17`.
- Updated dependencies:
  - `dompurify` `^3.3.0` → `^3.3.1`
  - `posthog-js` `^1.295.0` → `^1.305.0`
  - `svelte` `5.43.12` → `5.45.9`
  - `@playwright/test` `^1.56.1` → `^1.57.0`
  - `@sveltejs/adapter-vercel` `^6.1.1` → `^6.2.0`
  - `@sveltejs/kit` `2.48.5` → `2.49.2`
  - `browserslist` `^4.28.0` → `^4.28.1`
  - `eslint-plugin-jsdoc` `^61.2.1` → `^61.5.0`
  - `eslint-plugin-svelte` `^3.13.0` → `^3.13.1`
  - `markdownlint` `^0.39.0` → `^0.40.0`
  - `markdownlint-cli2` `0.19.0` → `0.20.0`
  - `playwright` `^1.56.1` → `^1.57.0`
  - `stylelint` `^16.25.0` → `^16.26.1`
  - `svelte-eslint-parser` `^1.4.0` → `^1.4.1`
  - `vite` `^7.2.2` → `^7.2.7`
  - `jsdom` `26.1.0` → `27.3.0`

### Fixed

- Resolved client-side build failures caused by dynamic jsdom imports leaking into the Vite dependency graph.
- Resolved false positive ESLint errors for unused catch bindings in JS modules.

---

## [1.25.16] - 2025-11-18

### Changed

- Removed `vercel-insights.com` from the `disallowedHosts` list in `service-worker.js`.

### Removed

- Removed `https://vercel-insights.com` from `script-src` and `connect-src` in `hooks.server.js`.

### Notes

- **Analytics:** Reverted Vercel Analytics integration due to inline script injection requirement. Continuing with PostHog Cloud until migration to CSP-compliant Matomo is feasible.

---

## [1.25.15] - 2025-11-18

### Added

- Added `https://vercel-insights.com` to `script-src` and `connect-src` in `hooks.server.js` to allow for Vercel Analytics.

### Changed

- Added `vercel-insights.com` to the `disallowedHosts` list in `service-worker.js`, in order to prevent SW caching.
- Bumped project version to `v1.25.15`.
- Updated dependencies:
  - `svelte` `5.43.10` → `5.43.12`

---

## [1.25.14] - 2025-11-18

### Changed

- Bumped project version to `v1.25.14`.
- Updated dependencies:
  - `svelte` `5.43.7` → `5.43.10`
  - `posthog-js` `^1.293.0` → `^1.295.0`

### Security

- Added transitive dependency override for `glob` to `^11.1.0`, in order to address CVE-2025-64756.

---

## [1.25.13] - 2025-11-16

### Changed

- Updated `.markdownlint.mjs` to ignore rule `MD060`, which is overly strict and unnecessary.
- Bumped project version to `v1.25.13`.
- Updated dependencies:
  - `svelte` `5.43.6` → `5.43.7`
  - `posthog-js` `^1.292.0` → `^1.293.0`
  - `@eslint/compat` `^1.4.1` → `^2.0.0`
  - `markdownlint-cli2` `0.18.1` → `0.19.0`

### Fixed

- Resolved prototype pollution vulnerability in transitive `js-yaml` dependency via `overrides`, due to outdated `@lhci/cli` dependency on `@lhci/utils`.

---

## [1.25.12] - 2025-11-14

### Added

- Added revised **QR code** image assets for **Vcard** information:
  - `src/lib/img/qr/vcard.png`
  - `src/lib/img/qr/vcard.webp`

### Changed

- Modified `.node-version` and `.nvmrc` to utilize **Node.js** `24.11.1` (LTS).
- Updated `.ncurc.cjs` to reject updates to `markdownlint-cli2`, due to discrepancies between in-editor and CLI linting errors.
- Updated environment template (`.env.template`) to include `PUBLIC_ENV_MODE`, which is now required to build the proper environment (e.g., `dev`, `audit`, `production`).
- Updated generator metadata in `src/app.html` to reflect **SvelteKit 2.48.5**.
- Bumped project version to `v1.25.12`.
- Updated dependencies:
  - `@sveltejs/kit` `2.48.4` → `2.48.5`
  - `eslint-plugin-jsdoc` `^61.2.0` → `^61.2.1`

---

## [1.25.11] - 2025-11-12

### Added

- `gotoDesktop(page, path)` and `gotoMobile(page, path)` helper functions to streamline viewport + navigation setup.
- `clickAndWaitForNavigation(page, locator, options)` utility for safe SPA or full-page navigation detection with optional URL pattern matching.
- `DEBUG_LOGS` flag in `helpers.js` to allow toggling of console logs for test diagnostics.
- Navigation debug logs to `getVisibleNav()` to indicate which navigation region was detected (when debugging is enabled).

### Changed

- Refactored all E2E tests to use `gotoDesktop()` and `gotoMobile()` for consistency and DRY principles.
- Replaced brittle direct `waitForNavigation()` usages with `clickAndWaitForNavigation()` helper.
- Updated mobile and desktop tests to improve consistency across specs and improve visibility assertions.

### Removed

- Legacy direct `setViewportSize()` and `page.goto()` calls from individual test blocks (now handled via `goto*()` helpers).

---

## [1.25.10] - 2025-11-12

### Changed

- Updated GitHub workflows to specify `ENV: ci` where appropriate:
  - `templates/check-codeql.template.yml`
  - `templates/publish.template.yml`
  - `auto-assign.yml`
  - `branch-backup.yml`
  - `check-security-txt-expiry.yml`
  - `dependency-review.yml`
  - `meta-check.yml`
  - `prevent-audit-merges.yml`
  - `secret-scan.yml`
- Added `@sveltejs/adapter-netlify` devDependency for smoother toggling between production and audit modes.
  - Production uses `@sveltejs/adapter-vercel` only. `@sveltejs/adapter-netlify` exists solely to support the audit environment.
- Bumped project version to `v1.25.10`.
- Updated dependencies:
  - `@testing-library/svelte` `^5.2.8` → `^5.2.9`
  - `eslint-plugin-jsdoc` `^61.1.12` → `^61.2.0`
  - `posthog-js` `^1.290.0` → `^1.292.0`

## Removed

- Removed unneeded comments in `build-and-publish.yml` workflow.

---

## [1.25.9] - 2025-11-11

### Changed

- Updated the support email address to `support@netwk.pro` in the following files:
  - `README.md`
  - `check-codeql.template.yml`
  - `publish.template.yml`
  - `contact.vcf`
- Modified `eslint.config.mjs` to include `.cjs` files when linting JavaScript.
- Bumped project version to `v1.25.9`.

## Fixed

- Modified `.github/workflows/probely-scan.yml` to accept either a 200 or 201 response.
  - Workflow was correctly triggering scan, but then failed due to receiving a 200 response rather than the 201 that was expected.

---

## [1.25.8] - 2025-11-11

### Added

- 🔐 **Branch protection rules** on `master`:
  - Enforced pull requests for all changes
  - Blocked force pushes
  - Linear history requirement
- 🚫 **CI workflow to prevent merges from `audit-netlify` to `master`**:
  - PRs originating from `audit-netlify` targeting `master` are automatically rejected
  - Triggered on `pull_request` events
  - Uses `github.event.pull_request.head.ref` for precise branch detection
- 🚀 **Netlify CI deployment** for audit-only branch:
  - Workflow `.github/workflows/deploy-audit-netlify.yml` added
  - Deploys `audit-netlify` to a separate Netlify site
  - Uses environmental variables to trigger `vite build --mode audit`
- 🌐 **`hooks.server.js` CSP hardening** for audit deployments:
  - Probely scanner detection based on UA/IP added via `isProbelyScanner()`
  - Audit-specific CSP disables analytics and CSP reporting endpoints
  - Logs detailed CSP info when in `isAudit` or `isDebug` modes
- 🛡️ Middleware improvements:
  - User-agent/IP fingerprinting for Probely DAST
  - Added logging for audit-mode scanner matches
- 🧪 Support for per-environment `.env` files (e.g. `.env.audit`)
- 🔄 Git helper scripts:
  - Added bash script to sync `audit-netlify` with latest `master`
  - Supports merge conflict resolution via VS Code diff viewer

### Changed

- Updated `.stylelintignore` to exclude `.netlify` directory
- Updated `lint:md` script to exclude the `build/` and `.netlify/` directories
- Refined `svelte.config.js` to support alternate build targets (Vercel → Netlify via adapter switch)
- Audit builds now use isolated `.env` config and a separate Netlify site token
- Bumped project version to `v1.25.8`

---

## [1.25.7] - 2025-11-11

### Added

- Introduced `src/lib/security/probely.js` helper module to detect Probely vulnerability scanner requests via normalized IP and User-Agent matching.
  - Supports case-insensitive substring matching for known Probely UA fragments (`ProbelySPDR/`, etc.).
  - IP allowlisting based on published ranges: <https://help.probely.com/en/articles/5112461/>
- Added unit test suite `tests/unit/server/lib/security/probely.test.js` to verify robustness of `isProbelyScanner()` logic against UA/IP variations and edge cases.

### Changed

- Updated `hooks.server.js` to integrate `isProbelyScanner()` as a drop-in replacement for inline Probely detection logic, improving clarity and testability.
- Contact details and motto updated in `static/.well-known/humans.txt`.
- Refreshed last modified dates in `static/sitemap.xml`.
- Minor cosmetic changes to `static/robots.txt`.
- Corrected fallback metadata in `+layout.svelte`.
- Removed inline styles from `src/lib/components/PWAInstallButton.svelte` and `src/lib/components/foss/FossFeatures.svelte`.
  - Moved styles to `src/lib/styles/css/default.css`.
  - Regenerated `global.min.css` bundle with LightningCSS.
- Minor optimizations and cleanup to several files:
  - `src/lib/components/RedirectPage.svelte`
  - `src/lib/components/layout/Footer.svelte`
  - `src/lib/pages/AboutContent.svelte`
  - `src/lib/pages/TermsConditionsContent.svelte`
  - `src/lib/pages/TermsUseContent.svelte`
  - `src/routes/contact/+page.svelte`
  - `src/routes/posts/+page.svelte`
  - `src/routes/privacy-rights/+page.svelte`
- Bumped project version to `v1.25.7`.
- Updated dependencies:
  - `autoprefixer` `^10.4.21` → `^10.4.22`
  - `browserslist` `^4.27.0` → `^4.28.0`
  - `svelte` `5.43.3` → `5.43.6`
  - `svelte-check` `^4.3.3` → `^4.3.4`
  - `posthog-js` `^1.285.1` → `^1.290.0`
  - `vite` `^7.1.12` → `^7.2.2`

---

## [1.25.6] - 2025-11-04

### Security

- Hardened `Content-Security-Policy (CSP)` in `hooks.server.js`:
  - Environment-specific policies for `production`, `audit`, `dev`, and `test`
  - Added real CSP reporting endpoint (`csp.netwk.pro`) in production
  - Report-only mode enabled in non-prod for safer diagnostics
- Added `/api/mock-csp` endpoint to capture and log CSP violation reports in non-prod environments

### Changed

- Updated `README.md` with detailed explanation of the CSP enforcement strategy and future nonce-based roadmap
- Moved inline styles from `Badges.svelte` and `Logo.svelte` to external stylesheet (`default.css`)
- Regenerated `global.min.css` using LightningCSS to reflect updated external styles
- Bumped project version to `v1.25.6`
- Updated dependencies:
  - `@eslint/js` `^9.39.0` → `^9.39.1`
  - `eslint` `^9.39.0` → `^9.39.1`
  - `eslint-plugin-jsdoc` `^61.1.11` → `^61.1.12`
  - `svelte` `5.43.2` → `5.43.3`
  - `posthog-js` `^1.284.0` → `^1.285.1`

### Fixed

- Updated `probely-scan.yml` GitHub workflow to utilize the correct API endpoint and cURL requests.

---

## [1.25.5] - 2025-11-03

### Added

- Introduced `static/b173de6c44c144c1b186841b88d51c67.txt` for use with [IndexNow](https://www.indexnow.org) and Bing Webmaster Tools.

### Changed

- Bumped project version to `v1.25.5`.

### Fixed

- Corrected the URLs for the HTML versions of the licenses in `static/sitemap.xml`.

---

## [1.25.4] - 2025-11-03

### Added

- `detectEnvironment()` now returns:
  - `isDebug` boolean (true if `isDev` or `isTest`)
  - `isLocalhost` (optional, in browser contexts)
- Support for `PUBLIC_POSTHOG_PROJECT_KEY` using `import.meta.env`
- Dynamic PostHog initialization (`initPostHog`) now uses env-based key injection
- vite.config.js:
  - `envPrefix: ['PUBLIC_']` added to expose public vars to client
  - Console banner for `ENV_MODE`, `PUBLIC_ENV_MODE`, and audit-mode warning
- CSP debug logs gated behind `isDebug` and server-only context
- `.env.production` support via `--mode=production` guidance
- Conditional `minify` flag for `lightningcssPlugin` based on `mode` (`production` or `audit`)

### Changed

- Environment detection (`env.js`) now respects hostname overrides and normalizes fallback logic for SSR/client consistency
- Logs in `hooks.server.js` and PostHog analytics client are now gated by `isDebug` to avoid unnecessary noise in production
- Better logging structure for PostHog initialization, including full `import.meta.env` dump in debug mode
- Bumped project version to `v1.25.4`

### Fixed

- Broken or undefined env var behavior due to missing `envPrefix` in `vite.config.js`
- Client-only `import.meta.env.PUBLIC_*` variables incorrectly resolving as `undefined` in production builds
- CSP not reflecting audit context due to host-based detection mismatch

### Developer Notes

- `.env.production` is **now required** for full environment variable injection during `npm run build --mode=production` or Vercel deployments.
  - Without it, `PUBLIC_` variables (e.g. `PUBLIC_POSTHOG_PROJECT_KEY`) may resolve as undefined in the client bundle.
  - Local builds can still fall back to `.env` or `.env.development` by default.

---

## [1.25.3] - 2025-11-03

### Changed

- Updated `posthog.js` to display environmental context logs only in development and testing environments.
- Bumped project version to `v1.25.3`.

### Removed

- Removed **Branch Guard** workflow (`.github/workflows/branch-guard.yml`), as it was resulting in mostly false positives.

---

## [1.25.2] - 2025-11-03

### Changed

- **Unified Environment Detection (`env.js`)**
  - Added support for server-side hostname injection via optional `hostOverride` parameter.
  - Enables accurate audit environment detection on both server (`hooks.server.js`) and client.
  - Logs the resolved environment and host when executed on the server.
  - Maintains safe fallback behavior for client-only usage.

- **CSP Handling (`hooks.server.js`)**
  - Replaced reliance on `window.location` (unavailable on server) with `event.url.hostname` for host detection.
  - Now correctly applies hardened audit-mode CSP in deployments matching `*.audit.netwk.pro`.
  - Improved logging for audit/test/prod environment resolution during server request lifecycle.

- **Build Diagnostics (`vite.config.js`)**
  - Added `stderr` output for `audit` mode builds to ensure visibility in CI logs.
  - Displays a prominent `🔒 Audit Mode Detected` tag during Vercel and local builds.
  - Continues to log `ENV_MODE`, `PUBLIC_ENV_MODE`, and `NODE_ENV` for build-time inspection.

- Bumped project version to `v1.25.2`.

---

## [1.25.1] - 2025-11-02

### Added

- Introduced new **environment diagnostics endpoint** at `src/routes/api/env-check/+server.js`.
  - Returns resolved build and runtime environment data for verification.
  - Useful for confirming `ENV_MODE` / `PUBLIC_ENV_MODE` propagation on Vercel builds.
  - Helps troubleshoot environment mismatches between build-time and client-side contexts.

### Changed

- **vite.config.js**
  - Enhanced configuration to log build mode and environment variables during bundling.
  - Prints `mode`, `ENV_MODE`, `PUBLIC_ENV_MODE`, and `NODE_ENV` to aid CI/CD debugging.
  - Uses color-coded console output for clear visibility in build logs.
- **env.js**
  - Simplified and stabilized environment detection logic for better cross-environment consistency.
  - Removed redundant imports and corrected handling of static vs dynamic `BUILD_ENV_MODE`.
  - Improved comments and type annotations for maintainability and IDE autocompletion.
- Bumped project version to `v1.25.1`.

### Developer Experience

- Build logs now clearly display environment information before bundling.
- `env-check` API endpoint provides real-time environment inspection without rebuilding.

---

## [1.25.0] - 2025-11-02

### Added

- Introduced unified environment detection utility (`src/lib/utils/env.js`) with full **JSDoc typing**.
  - Normalizes `process.env` and `import.meta.env` usage across SSR (Node) and client contexts.
  - Safely handles browser environments where `process` is undefined.
  - Provides standardized flags for:
    - `isDev`, `isProd`, `isAudit`, `isCI`, and `isTest`
  - Enables consistent environment checks across analytics, CSP, and runtime logic.

- Added hybrid **environment + host-based analytics guard** in `src/lib/stores/posthog.js`.
  - Automatically disables PostHog tracking in `audit` mode or when hostname matches `*.audit.netwk.pro`.
  - Prevents analytics initialization during development and test contexts.
  - Uses the shared `detectEnvironment()` utility for centralized logic.
  - Improves runtime logging for environment-specific behavior.

### Changed

- Updated `hooks.server.js` to include a dedicated **audit environment block** for Content Security Policy (CSP).
  - Hardened audit CSP by removing all analytics-related sources (`posthog.com`, `posthog-assets.com`).
  - Redirects CSP violation reporting to the mock endpoint (`/api/mock-csp`) in audit mode.
  - Preserves full HSTS and other production security headers for audit deployments.
  - Added clear separation between `test`, `audit`, and `prod` security policies.
  - Improved console debugging for environment detection (`NODE_ENV`, `ENV_MODE`).

- Refactored **environment detection logic** for improved reliability across client and server contexts.
  - Added unified environment resolver at `src/lib/utils/env.js` to standardize detection for `dev`, `prod`, `audit`, `ci`, and `test` modes.
  - Ensures consistent handling of both `process.env.*` (Node/SSR) and `import.meta.env.*` (Vite/client) variables.
  - Prevents mismatched behavior between browser-side analytics (`posthog.js`) and server-side policies (`hooks.server.js`).
  - Automatically falls back to `'unknown'` if no explicit mode is set, avoiding build-time exceptions.

- Refactored **Branch Guard** workflow (`.github/workflows/branch-guard.yml`) for improved accuracy and reduced noise.
  - Adjusted detection logic to **ignore merge commits**, Dependabot updates, and automated actions.
  - Ensures workflow warnings are shown **only for true direct commits** to protected branches (`master`, `main`).
  - Simplified step output and summary formatting for clearer reporting in the Actions log and job summary.
  - Maintains lightweight permissions (`contents: read`) and executes entirely without repository writes.
  - Improves reliability of branch protection monitoring without affecting CI or merge operations.
- Bumped project version to `v1.25.0`.

### Fixed

- Resolved client-side crash in browser environments caused by `process.env` being undefined.
  - Implemented defensive checks in `env.js` for `process` availability.
  - Eliminated reference errors during client-side initialization of analytics.

### Developer Experience

- Simplified future configuration by consolidating environment checks into a single typed utility.
- Improved maintainability and Vercel compatibility by ensuring `.env.audit` and `PUBLIC_ENV_MODE` variables propagate correctly to both client and server environments.

### Developer Notes

- When deploying audit builds, ensure Vercel environment variables include:

```bash
ENV_MODE=audit
PUBLIC_ENV_MODE=audit
```

This enables analytics filtering and CSP hardening for the audit environment.

- Audit deployments retain full HTTPS and security headers but omit telemetry and external CSP reporting.

---

## [1.24.5]

### Added

- Introduced **Branch Guard workflow** (`.github/workflows/branch-guard.yml`) to automatically enforce branch protection policies.
  - Ensures consistent branch naming conventions.
  - Blocks direct pushes to protected branches (e.g., `master`, `main`, and `release/*`).
  - Provides early validation for pull requests and feature branches to maintain repository integrity.
- Introduced comprehensive pre-push checks for code consistency and style compliance.
  - Added optional `simple-git-hooks` configuration to automate local linting before commits or pushes.
  - Implemented `lint:all` script using `npm-run-all` for efficient, parallel execution of linters.
  - Ensures **ESLint**, **Stylelint**, **Markdownlint**, and **Prettier** all run before code is committed, improving codebase hygiene and preventing formatting drift.
  - Designed for **developer-side speed and reliability**, running linters in parallel while deferring `format` (Prettier) until after lint checks complete for safety.
- Added **hybrid linting configuration**:
  - Parallel execution for static lint tasks (`eslint`, `stylelint`, `markdownlint`).
  - Sequential Prettier formatting step for deterministic, race-free execution.

### Changed

- Reorganized local linting commands for clarity and consistency, consolidating redundant sequential scripts into the `lint:all` aggregator.
- Improved developer experience with faster pre-push validations and clearer script naming conventions.
- Bumped project version to `v1.24.5`.

### Developer Experience

- Enhanced local development workflow by introducing **fast, parallel linting** and **optional pre-commit hooks**, reducing turnaround time for style and quality checks.
- Simplified npm scripts for readability and maintainability by adopting `npm-run-all` as the central task runner.

### Notes

- For instructions on installing and configuring the new dependencies, please see the **[Editor Configuration](https://github.com/netwk-pro/netwk-pro.github.io/wiki/Editor-Configuration#automation)** section of the [Wiki](https://github.com/netwk-pro/netwk-pro.github.io/wiki).

> **Note:** Version `1.24.4` was merged but not tagged or released.  
> Subsequent updates are reflected in `v1.24.5` and later.

---

## [1.24.4]

### Documentation

- Added a **Continuous Security & Dependency Checks** section to `README.md`, outlining the automated vulnerability and dependency analysis integrated into CI/CD workflows.

### Added

- Introduced **non-blocking** `npm audit` **step** in the `build-and-publish.yml` workflow to automatically detect known vulnerabilities during dependency installation.
- Introduced **[Probely](https://probely.com/) Dynamic Application Security Testing (DAST)** integration via a new GitHub Actions workflow at `.github/workflows/probely-scan.yml`.
  - Executes **weekly automated scans** of the `audit.netwk.pro` environment every Tuesday at 09:00 UTC.
  - Authenticates securely using a scoped **API key** stored in GitHub Secrets (`PROBELY_API_KEY`).
  - Polls the Probely API for scan completion and retrieves the full **HTML vulnerability report**.
  - Uploads reports as workflow **artifacts** for maintainers to review.
  - Includes a 60-minute timeout and supports manual triggering via `workflow_dispatch`.
  - Configured for **read-only testing** against non-production environments to safely identify potential web and API vulnerabilities.
  - Future updates will introduce automated issue creation and alerting for high-severity findings.

### Changed

- Updated `static/robots.txt` to exclude redirect routes and sensitive/internal endpoints (e.g., `/api`, `/relay-*`, `/consultation`, `/contact`, `/status`, etc.) from automated crawlers and vulnerability scanners.
- Bumped project version to `v1.24.4`.

### Security

- Enhanced continuous security coverage through the addition of **Probely DAST** for dynamic web and API vulnerability testing.
- Maintained and improved **GitLeaks** secret scanning across pull requests and scheduled full-history scans.
- Together, these workflows now provide full-spectrum coverage across **SAST** (static analysis) and **DAST** (dynamic analysis) layers within the CI/CD pipeline.

---

## [1.24.3]

### Changed

- Bumped project version to `v1.24.3`.
- Updated `.github/workflows/secret-scan.yml` to utilize a unique `CODEQL_ACTION_ANALYSIS_KEY` to avoid conflicts with CodeQL.
- Updated `static/robots.txt` to disallow crawling of the `/api` route.

### Fixed

- Corrected naming of `static/7cbb39ce-750b-43da-83b8-8980e5554d4d.txt`.

---

## [1.24.2]

### Added

- Introduced new text file to prove ownership of the domain for **[Probely](https://probely.com/) DAST scans** in `static/`.

### Changed

- Bumped project version to `v1.24.2`.
- Updated `author.url` in `package.json` to reflect updated bio site, now located at [bio.netwk.pro](https://bio.netwk.pro).

---

## [1.24.1]

### Changed

- Bumped project version to `v1.24.1`.
- Updated **GitLeaks workflow** (`.github/workflows/secret-scan.yml`):
  - Reworked Gitleaks step to use official environment variables (`GITLEAKS_REPORT_PATH`, `GITLEAKS_LICENSE`) for compatibility with `gitleaks/gitleaks-action@v2`.
  - Added explicit handling for runs with no detected secrets (skips JSON parsing when no report is generated).
  - Improved summary step output with clear “No leaks detected” message and reduced false warnings.
  - Ensured consistent artifact uploads and safer fork-handling conditions.
- Lighthouse now points to the new audit version of the site at [audit.netwk.pro](https://audit.netwk.pro).

---

## [1.24.0]

### Added

- Introduced [GitLeaks](https://github.com/gitleaks/gitleaks-action) secret scan CI action as `.github/workflows/secret-scan.yml`.
- Introduced two-phase scan strategy:
  - **Pull Request scans** to detect secrets before merge.
  - **Nightly scheduled scans** (`cron: "0 4 * * *"`) for full-history coverage.
- Added **artifact upload** for the `gitleaks-report.json` file, allowing maintainers to download complete results from the Actions UI.
- Implemented **public-safe summary output** in `$GITHUB_STEP_SUMMARY`:
  - Displays secret descriptions only.
  - Redacts file paths and other sensitive details.
  - Provides a concise, readable summary of findings.
- Added **GitHub Issue creation step** to automatically open a security issue when leaks are detected.
- Integrated optional **ntfy.sh notifications** for real-time alerting on secret leaks.
- Implemented **fork-safety guards** to prevent workflows triggered from untrusted forks from:
  - Accessing organization secrets (license keys, ntfy topic).
  - Uploading artifacts or creating issues.
- Added descriptive comments and logical layer separation:
  - **Layer 1 – Output Redaction**
  - **Layer 2 – Secret / Fork Handling**

### Changed

- Bumped project version to `v1.23.1`.
- Updated `.node-version` and `.nvmrc` to utilize **Node.js** `24.11.0` (LTS).
- Updated CI workflows to utilize `node-version: 24`:
  - `build-and-publish.yml`
  - `lighthouse.yml`
  - `meta-check.yml`
  - `playwright.yml`
  - `publish-test.yml`
  - `templates/publish.template.yml`
- Updated dependencies:
  - `@eslint/js` `^9.38.0` → `^9.39.0`
  - `eslint` `^9.38.0` → `^9.39.0`
  - `globals` `^16.4.0` → `^16.5.0`
  - `posthog-js` `^1.282.0` → `^1.284.0`

### Security

- Added **automated SAST scanning** via GitLeaks to prevent secrets and credentials from being committed.
- Implemented **security event reporting** via GitHub’s Code Scanning interface (SARIF upload supported).
- Configured **automated notifications** for detected leaks via GitHub Issues and optional ntfy alerts.

---

## [1.23.0] - 2025-10-30

### Documentation

- Updated `src/lib/README.md` to reflect newly added app constants.

### Changed

- Refactored all route files to use named imports from `$lib/components` and `$lib/pages` barrel modules, replacing individual `.svelte` imports for improved consistency and maintainability.
- Changed `COMPANY_INFO.APP_NAME` constant to `Network Pro™` in `src/lib/index.js`.
  - Removed unnecessary `&trade;` symbol from files that utilize the app constant.
- Changed `/license` and `/foss-spotlight` routes to `/legal` and `/foss`, respectively, for more intuitive navigation.
  - Updated all references to the new routes, `/legal` and `/foss`.
  - Updated `vercel.json` to redirect `/license` to `/legal`, and `/foss-spotlight` to `/foss`.
- Refactored Playwright helper utilities to modern standards:
  - Replaced deprecated `page.waitForNavigation()` with `waitForURL()` and `waitForLoadState()` in `clickAndWaitForNavigation()` for improved SPA and full-page navigation reliability.
  - Simplified logic and removed unsupported `lastResponse()` usage.
  - Improved test stability for mobile navigation (especially in CI environments).
- Modified `tests/unit/server/meta.test.js` to match on `Locking Down Networks`, rather than `Network Pro`, which is now dynamically attached.
- Refreshed **Last Modified** timestamps in `static/sitemap.xml`.
- Updated `.node-version` and `.nvmrc` to utilize **Node.js** `22.21.1` (LTS).
- Updated generator metadata in `src/app.html` to reflect **SvelteKit 2.48.4**.
- Bumped project version to `v1.23.0`.
- Updated dependencies:
  - `@sveltejs/kit` `2.48.3` → `2.48.4`
  - `svelte` `5.43.0` → `5.43.2`
  - `eslint-plugin-svelte` `^3.12.5` → `^3.13.0`

- Refactored metadata and SEO handling for consistency and maintainability:
  - Centralized all `<meta>` and `<title>` management in `src/lib/components/MetaTags.svelte`.
  - Removed redundant per-page `<svelte:head>` entries and `MetaTags` imports in individual `+page.svelte` files.
  - Added dynamic canonical URL generation using route `pathname` from `+layout.js`.
  - Implemented automatic title and description suffixing:
    - Titles now end with `— Network Pro™`.
    - Descriptions now end with `| Security, Networking, Privacy — Network Pro Strategies`.
  - Cleaned up fallback values (`defaultTitle`, `defaultDescription`, `defaultMeta`) to prevent redundant branding text.
  - Adjusted layout structure to ensure correct canonical and OpenGraph metadata per route.

- Updated `src/app.html`:
  - Removed duplicate document sections and placeholder meta tags.
  - Verified correct `%sveltekit.head%` placement for dynamic head injection.
  - Moved static PWA-related metadata (e.g., `<meta name="theme-color">`) into `app.html`.
  - Retained dynamic icons and preload links for cache-busted assets via `+layout.svelte`.

### Security

- Added transitive dependency overrides to address reported vulnerabilities:
  - `tar@7.5.1` → `tar@7.5.2` (fixes CVE-2025-64118: race condition/uninitialized memory exposure).
- Confirmed overrides applied correctly via `npm ls` and `npm explain`.

---

## [1.22.2] - 2025-10-29

### Documentation

- Rewrote `CONTRIBUTING.md` to accurately describe the modern SvelteKit contribution workflow.
  - Updated guidelines for branch naming, code style, and pull request submission.
  - Removed outdated references to Webpack and `build/` artifacts.
- Moved `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` to the organization’s `.github` repository to centralize contribution and conduct policies across all projects.

### Added

- Introduced `vite-plugin-devtools-json` as a new `devDependency` to improve DevTools and JSON inspection support.
  - Added plugin configuration in `vite.config.js`.
- Added `.ncurc.json` configuration to define rules for `npm-check-updates`, preventing automatic upgrades of version-linked packages such as `vitest` and `@vitest/coverage-v8`.
- Added the term `ncurc` to `cspell.json` to prevent false-positive spell-check warnings.

### Changed

- Updated GitHub workflows to utilize `actions/upload-artifact@v5` and `actions/setup-node@v6`:
  - `templates/publish.template.yml`
  - `build-and-publish.yml`
  - `lighthouse.yml`
  - `meta-check.yml`
  - `playwright.yml`
  - `publish-test.yml`
- Improved **Svelte 5** / Rune compatibility in `vitest.config.client.js`:
  - Added `optimizeDeps.include` configuration to ensure `.svelte` files are properly transformed during testing, and to align with **Vitest 4.x** and future **Vite 6** compatibility.
  - Prevents `rune_outside_svelte` errors and prepares for future **Vitest 4.x** updates.
- Updated generator metadata in `src/app.html` to reflect **SvelteKit 2.48.3**.
- Modified `.node-version` and `.nvmrc` to reflect **Node.js** version `22.21.0` (LTS).
- Bumped project version to `v1.22.2`.
- Updated dependencies:
  - `@eslint/compat` `^1.4.0` → `^1.4.1`
  - `@sveltejs/adapter-vercel` `^6.0.0` → `^6.1.1`
  - `@sveltejs/kit` `2.47.2` → `2.48.3`
  - `browserslist` `^4.26.3` → `^4.27.0`
  - `eslint-plugin-jsdoc` `^61.1.5` → `^61.1.11`
  - `posthog-js` `^1.278.0` → `^1.282.0`
  - `svelte` `5.41.1` → `5.43.0`
  - `vite` `^7.1.11` → `^7.1.12`

---

## [1.22.1] - 2025-10-21

### Documentation

- Updated directory structure and **static/pgp** section of `README.md`.

### Changed

- Bumped project version to `v1.22.1`.
- Updated the text and layout of `AboutContent.svelte`.
- Added a link to the privacy email address in `PrivacyContent.svelte` and `PrivacyDashboard.svelte` for easier access.
- Updated the text of `ServicesContent.svelte`.
- Increased default Playwright test timeouts for navigation-sensitive suites (Desktop and Mobile) to improve stability under CI latency conditions.
- Implemented `Promise.all()` pattern for combined click and navigation waits, reducing flakiness in route transition tests.
- Updated the `about` link navigation tests in both Desktop and Mobile scenarios to include:
  - Explicit `page.waitForLoadState('domcontentloaded')` calls before assertions.
  - Extended per-suite timeouts (`90s`) using `test.setTimeout(90000)` for reliability on slower environments.
  - Added fallback `waitForURL('\*\*/about', { timeout: 60000 })` to ensure deterministic routing checks.
- Adjusted test structure for consistency across device profiles and browsers.
- Verified local runs remain performant while increasing tolerance for **CI network latency**.

### Fixed

- Corrected `TermsUseContent.svelte` to reflect hosting by Vercel, not Netlify.
- Corrected license identifier syntax on the following pages:
  - `AboutContent.svelte`
  - `FossContent.svelte`
  - `LicenseContent.svelte`
  - `PrivacyContent.svelte`
  - `PrivacyDashboard.svelte`
  - `ServicesContent.svelte`
  - `TermsConditionsContent.svelte`
  - `TermsUseContent.svelte`

---

## [1.22.0] - 2025-10-20

### Added

- Introduced **dynamic QR code image imports** using `import.meta.glob` in `src/lib/images.js`.
- Implemented new `getQR()` helper function for streamlined QR lookups.
- Added `QR_IMAGES` registry for centralized QR asset management.
- Created dedicated PGP key data module (`src/lib/data/pgpKeys.js`) with dynamic QR bindings.
- Added new app constants (`EMAIL_LINK`, `SECURE_LINK`, `PRIVACY_LINK`) to:
  - `src/lib/index.js`
  - `src/lib/types/appConstants.js`
- Re-exported `src/lib/data/pgpKeys.js` from `src/lib/index.js`.
- Added favicon and manifest entry for `icon-about.png`.
- Introduced updated **contact assets block** in `AboutContent.svelte` with enhanced typing.
- Exported `src/lib/img/powered-by-proton.svg` from `src/lib/images.js`.
- Added missing JSDoc annotation to `src/lib/data/fossData.js`.
- Added updated PGP key for `support@netwk.pro` (previously `support@neteng.pro`).

### Changed

- Bumped project version to `v1.22.0`.
- Updated generator metadata in `src/app.html` to reflect **SvelteKit 2.47.2**.
- Refactored **PGPContent.svelte** to use the `getQR()` helper and dynamic QR registry.
- Refactored **AboutContent.svelte** to use the centralized `PGP_KEYS` dataset and app constants.
- Split PGP key fingerprints into two lines for improved readability.
- Enhanced **images.js** with support for eager QR image imports.
- Replaced static PGP imports with automated dynamic resolution.
- Updated **manifest.json** to reference the new app icon.
- Revised layout and text consistency for PGP and contact sections in **AboutContent.svelte**.
- Updated type definitions in `src/lib/types/appConstants.js` for `CONTACT` constants.
- Cleaned up unused imports and improved inline JSDoc typings throughout the app.
- Updated asset references in `IGNORE_PATHS` and `REQUIRED_ASSETS` in `src/service-worker.js`.
- Added spacing adjustments to the tagline in **Logo.svelte**.
- Updated **HeaderDefault.svelte** to reference the global constant for the **Blog** link.
- Revised text and app constant usage in **HomeContent.svelte**.
- Updated the contact section and **Effective Date** in **ServicesContent.svelte**.
- Rebuilt `src/lib/styles/global.min.css` using **LightningCSS**.
- Refreshed `_Last Modified_` timestamps in `static/sitemap.xml`.

### Fixed

- Fixed SSR error caused by missing `getQR` reference during page load.
- Corrected destructuring of `CONTACT` constants during SSR initialization.
- Fixed fingerprint rendering fallback when fingerprint type was non-array.
- Adjusted QR image alignment and eager/lazy decoding behavior.

### Removed

- Deleted outdated static assets from `static/pgp`, replaced with dynamically loaded QR images.
- Removed redundant manual image imports from legacy sections of `images.js`.
- Removed unnecessary comment block from the `<head>` section of `src/app.html`.
- Removed `font-weight: bold` property from the `.fingerprint` CSS class in `src/lib/styles/css/default.css`.

### 🧩 Technical Notes

- Updated `vite` from `v7.1.10` → `v7.1.11` to address **CVE-2025-62522**.
- Updated dependencies for SvelteKit `2.47.2` compatibility:
  - `@sveltejs/kit`, `svelte`, `vite`, and `eslint`-related plugins.
- Cleaned up build cache and service worker registration logic in `src/service-worker.js`.

---

## [1.21.1] - 2025-10-17

### Added

- Introduced universal relay mock handler at `src/routes/relay-[slug]/[...catchall]/+server.js` to consolidate test-only endpoints such as `flags`, `config`, and `config.js`.
- Added fallback support for `GET`, `HEAD`, and `OPTIONS` methods within the catchall relay handler.

### Changed

- Bumped project version to `v1.21.1`.
- Standardized header in various files:
  - `.editorconfig`
  - `.env.template`
  - `.gitattributes`
  - `.gitignore`
  - `.prettierignore`
  - `.stylelintignore`

### Removed

- Deleted unneeded comments in `stylelint.config.js` and `.markdownlint.mjs`.

---

## [1.21.0] - 2025-10-17

### Added

- Introduced modular analytics initializer at `src/lib/utils/initAnalytics.js` to handle PostHog tracking, asset preloading, and cleanup logic.

### Changed

- Bumped project version to `v1.21.0`.
- Added `pageleave` to `cspell.json` to support custom PostHog events.
- Expanded `lint` script in `package.json` to include `.cjs` files.
- Updated `src/service-worker.js` to correctly exclude `security.txt.sig` from caching.
- Refactored `+layout.svelte` to use the new `initAnalytics.js` utility for cleaner side-effect management.
- Updated fallback meta description logic in both `+layout.svelte` and `+layout.js`.
- Adjusted `"purpose"` value in `static/manifest.json` from `"any maskable"` to `"maskable"` for improved PWA icon support.
- Increased spacing before contact info in `src/lib/pages/HomeContent.svelte`.
- Enhanced `registerServiceWorker.js` to skip SW registration in Firefox during development, preventing known `/@fs/` path evaluation errors.
- Integrated automatic cleanup of existing service workers in `registerServiceWorker.js` when running in Firefox + dev mode.
- Improved logging clarity in `registerServiceWorker.js` to better distinguish SW lifecycle behavior by environment.
- Updated `unregisterServiceWorker.js` to include scoped SW logging when unregistering.
- Refactored `posthog.js` to add conditional guards for suppressing noisy analytics errors in development mode.

---

## [1.20.0] - 2025-10-17

### Added

- Implemented new **Services** route at `/services`:
  - Created `src/routes/services/+page.server.js` and `src/routes/services/+page.svelte`.
  - Added full Services content in `src/lib/pages/ServicesContent.svelte`.
  - Introduced **Services Summary Table** component (`src/lib/components/ServiceSummaryTable.svelte`).
- Added corresponding CSS for Services route in `src/lib/styles/css/default.css`.
- Added PostHog Cloud proxy rewrites to `vercel.json` for analytics endpoint.
- Added new terms to `cspell.json`: `hcaptcha`, `serv`, and `tshoot`.
- Updated CI workflows to use **npm v11.6.2** and added `packages: write` permission with `GITHUB_TOKEN` for GPR publishing:
  - `.github/workflows/build-and-publish.yml`
  - `.github/workflows/publish-test.yml`
  - `.github/workflows/templates/publish.template.yml`
- Updated `.github/workflows/meta-check.yml` to explicitly use the `ubuntu-24.04` runner.

### Changed

- Bumped project version to `v1.20.0`.
- Updated generator metadata in `src/app.html` to reflect `SvelteKit 2.47.1`.
- Updated `HeaderDefault.svelte` and `HeaderHome.svelte` to include a "Services" section in navigation.
- Rebuilt `src/lib/styles/global.min.css` using **LightningCSS**.
- Updated content in:
  - `src/lib/pages/AboutContent.svelte` – added contact info and consultation link.
  - `src/lib/pages/HomeContent.svelte` – added company contact info.
  - `src/lib/pages/PrivacyContent.svelte` – added new _Security & Anti-Abuse Measures (hCaptcha)_ section.
  - `src/lib/pages/LicenseContent.svelte` – relocated internal comment.
- Modified import handling for `RedirectPage` in `src/routes/consultation/+page.svelte`.
- Updated `src/hooks.server.js`:
  - Corrected `isTestEnvironment` constant.
  - Relaxed CSP rules for development mode to support local PostHog proxy.
- Updated `static/sitemap.xml` to include the `/services` route and refresh _Last Modified_ timestamps.
- Updated author metadata (`@author`)
  from **SunDevil311** → **Scott Lopez** across all relevant JS files, including scripts, libs, and tests.
- Updated dependencies:
  - `dompurify` `^3.2.7` → `^3.3.0`
  - `posthog-js` `^1.271.0` → `^1.276.0`
  - `semver` `^7.7.2` → `^7.7.3`
  - `svelte` `^5.39.9` → `^5.40.2`
  - `@eslint/js` `^9.37.0` → `^9.38.0`
  - `@playwright/test` `^1.55.1` → `^1.56.1`
  - `@sveltejs/adapter-vercel` `^5.10.3` → `^6.0.0`
  - `@sveltejs/kit` `2.44.0` → `2.47.1`
  - `eslint` `^9.37.0` → `^9.38.0`
  - `eslint-plugin-jsdoc` `^60.8.2` → `^61.1.4`
  - `markdownlint` `^0.38.0` → `^0.39.0`
  - `playwright` `^1.55.1` → `^1.56.1`
  - `svelte-check` `^4.3.2` → `^4.3.3`
  - `vite` `^7.1.9` → `^7.1.10`

### Removed

- Deleted redundant comment from `src/routes/layout.svelte`.

### 🧩 Technical Notes

<!-- markdownlint-disable MD036 -->

**PostHog Proxy and CSP Adjustments**

- Introduced `/relay-MSR0` reverse proxy via **Vercel rewrites** to route PostHog analytics traffic through the site origin, improving privacy compliance and avoiding CORS preflight requests.
- Updated `vercel.json` accordingly to map:
  - `/relay-MSR0/static/(.*)` → `https://us-assets.i.posthog.com/static/$1`
  - `/relay-MSR0/(.*)` → `https://us.i.posthog.com/$1`
- Adjusted Content Security Policy (CSP) in `src/hooks.server.js`:
  - Removed explicit `/relay-MSR0` source from `connect-src` (invalid in CSP).
  - `'self'` now implicitly allows `/relay-MSR0` requests on the same origin.
  - Development CSP remains more permissive (`unsafe-inline`, `unsafe-eval`, `localhost:*`) for compatibility with PostHog local testing.

**Miscellaneous**

- Confirmed `initPostHog()` dynamic import strategy prevents SSR evaluation errors.
- Verified service worker (`service-worker.js`) continues caching non-PostHog requests correctly.
- Verified `Strict-Transport-Security` and other headers remain unaffected by proxy rewrite behavior.

<!-- markdownlint-enable MD036 -->

---

## [1.19.0] - 2025-10-06

### Added

- **`src/lib/components/index.js`**, **`src/lib/components/foss/index.js`**, **`src/lib/components/layout/index.js`**
  - Introduced explicit component export modules to improve import consistency across the library.
  - Added wildcard exports in `src/lib/index.js` for these component modules, enabling `$lib/components/...` shorthand imports.
- **`tests/unit/client/lib/PWAInstallButton.test.js`**
  - Added focused unit tests for `PWAInstallButton.svelte` verifying install-event handling and user-prompt logic using `Vitest` and `@testing-library/svelte`.
- **`src/lib/README.md`**, **`src/lib/types/README.md`**
  - Added contextual documentation for the library and type definition directories.
  - Clarifies module structure, export hierarchy, and intended usage for contributors.

### Changed

- Bumped project version to `v1.19.0`.
- Updated `src/lib/pages/AboutContent.svelte` with new services
- Added DOM and animation mocks (`window.matchMedia`, `Element.prototype.animate`) to `vitest-setup-client.js` to stabilize component transition tests.
- Updated `src/lib/index.js` to export all component and utility submodules explicitly, replacing previous implicit import behavior.
- Centralized page-level component exports in `src/lib/pages/index.js` for consistent import structure.
- Updated `src/routes/+layout.svelte` to import objects from submodules, instead of by their explicit alias
- Minor alignment in `src/routes/+page.svelte` and `src/routes/links/+page.svelte` with updated component imports
- Moved inline CSS fom `src/lib/components/FullWidthSection.svelte` into `src/lib/styles/css/default.css`
- Generated an updated `src/lib/styles/global.min.css` file with LightningCSS
- Updated `.gitignore` to remove duplicate `.vercel` entry
- Updated last modified dates in `static/sitemap.xml`
- Updated dependencies:
  - `eslint-plugin-jsdoc` `^60.8.1` → `^60.8.2`
  - `posthog-js` `^1.270.1` → `^1.271.0`
  - `svelte` `5.39.8` → `5.39.9`

---

## [1.18.5] - 2025-10-05

### Added

- Added Vercel CLI scripts to `package.json`, including `dev:vercel` and `build:vercel`.

### Changed

- Bumped project version to `v1.18.5`.
- Updated generator metadata in `app.html` to reflect `SvelteKit 2.44.0`.
- Added `scripts/testRedirects.js` to `.gitignore`.
- Cleaned up header in `jsconfig.template.jsonc`.
- Updated **Repository Structure** section in `README.md`.
- Restructured `CHANGELOG.md` such that sections are presented in alphabetical order.
- Corrected JSDoc annotations in `static/disableSw.js`.
- Updated dependencies:
  - `@sveltejs/kit` `2.43.8` → `2.44.0`
  - `eslint-plugin-jsdoc` `^60.8.0` → `^60.8.1`

### Documentation

- Revised **Repository Structure** to accurately reflect the folders under `/tests`.

### Removed

- Removed all references to Netlify and all Netlify-specific scripts from `package.json`.
- Removed `test:redirects` script from `package.json`.
- The `testRedirects.js` script has been removed from version control, as it is no longer needed to test Netlify redirects.

---

## [1.18.4] - 2025-10-04

### Changes

- Bumped project version to `v1.18.4`.
- Updated **npm** to `v11.6.1` in CI workflows:
  - `.github/workflows/build-and-publish.yml`
  - `.github/workflows/lighthouse.yml`
  - `.github/workflows/playwright.yml`
  - `.github/workflows/publish-test.yml`
  - `.github/workflows/templates/publish.template.yml`
- Updated **Repository Structure** section in `README.md`.
- Updated dependencies:
  - `@eslint/js` `^9.36.0` → `^9.37.0`
  - `@sveltejs/adapter-vercel` `^5.10.2` → `^5.10.3`
  - `@sveltejs/kit` `2.43.5` → `2.43.8`
  - `@testing-library/jest-dom` `^6.8.0` → `^6.9.1`
  - `browserslist` `^4.26.2` → `^4.26.3`
  - `eslint` `^9.36.0` → `^9.37.0`
  - `eslint-plugin-jsdoc` `^60.4.1` → `^60.8.0`
  - `lightningcss` `^1.30.1` → `^1.30.2`
  - `posthog-js` `^1.268.6` → `^1.270.1`
  - `stylelint` `^16.24.0` → `^16.25.0`
  - `svelte` `5.39.6` → `5.39.8`
  - `typescript` `^5.9.2` → `^5.9.3`
  - `vite` `^7.1.7` → `^7.1.9`

### Documentation

- Updated **Repository Structure** to reflect current environment and files.

---

## [1.18.3] - 2025-09-27

### Changed

- Bumped version to `v1.18.3`.
- Updated `README.md` to reflect hosting by Vercel.
- Standardized header in the following files:
  - `.editorconfig`
  - `.gitattributes`
  - `.gitignore`
  - `.prettierignore`
  - `.stylelintignore`
  - `CHANGELOG.template.md`

---

## [1.18.2] - 2025-09-27

### Changed

- Bumped version to `v1.18.2`.
- Replaced Netlify badge with Vercel badge in `README.md`.

---

## [1.18.1] - 2025-09-27

### Changed

- Bumped version to `v1.18.1`.
- Removed `www` redirect from `vercel.json`.

### Notes

- Instead of an app redirect, the `www` subdomain is now set up with a CNAME record

---

## [1.18.0] - 2025-09-27

### Changed

- Bumped version to `v1.18.0`.
- Updated Node.js version in `.node-version` and `.nvmrc` to `22.20.0` for compatibility with Vercel.
- Updated CI workflows to utilize `node-version: 22`:
  - `build-and-publish.yml`
  - `lighthouse.yml`
  - `meta-check.yml`
  - `playwright.yml`
  - `publish-test.yml`
  - `templates/publish.template.yml`
- Migrated hosting and serverless functions from **Netlify** to **Vercel**.
- Updated deployment configuration to use `@sveltejs/adapter-vercel` in place of
  `@sveltejs/adapter-netlify`.
- Cleaned up Netlify-specific files and settings:
  - Removed `netlify.toml` and Netlify plugin configuration.
  - Removed unused SMTP-related environment variables (`SMTP_*`, `MAIL_ENABLED`,
    `NOTIFY_EMAIL`).
  - Replaced `_redirects` with Vercel-managed redirects and rewrites in
    `vercel.json`.
- Updated environment configuration to define `ENV_MODE` within Vercel project
  settings.
- Adjusted `engines.npm` requirement in `package.json` from `>=11.0.0 <12` to `>=10.0.0 <12` for compatibility with Vercel.

### Removed

- Deleted `netlify.toml` and `_redirects`.
- Removed `vercel.json` from `.gitignore`.

---

## [1.17.2] - 2025-09-27

### Changed

- Bumped version to `v1.17.2`.
- Updated generator metadata in `app.html` to reflect `SvelteKit 2.43.5`.
- Updated Node.js version in `.node-version` and `.nvmrc` to `24.9.0`.
- Updated `actions/checkout`, `actions/setup-node`, and `actions/download-artifact` in the following files in `.github/workflows`:
  - `templates/publish.template.yml`
  - `backup-branch.yml`
  - `build-and-publish.yml`
  - `check-security-txt-expiry.yml`
  - `dependency-review.yml`
  - `lighthouse.yml`
  - `playwright.yml`
  - `publish-test.yml`
- Updated JSDoc linting step and `sed` syntax in the following workflows:
  - `templates/publish.template.yml`
  - `publish-test.yml`
- Upgraded dependencies:
  - `@eslint/compat` `^1.3.2` → `^1.4.0`
  - `@eslint/js` `^9.35.0` → `^9.36.0`
  - `@playwright/test` `^1.55.0` → `^1.55.1`
  - `@sveltejs/kit` `2.42.1` → `2.43.5`
  - `@sveltejs/vite-plugin-svelte` `^6.2.0` → `^6.2.1`
  - `eslint` `^9.35.0` → `^9.36.0`
  - `eslint-plugin-jsdoc` `^58.1.1` → `^60.4.1`
  - `eslint-plugin-svelte` `^3.12.3` → `^3.12.4`
  - `playwright` `^1.55.0` → `^1.55.1`
  - `posthog-js` `^1.266.0` → `^1.268.6`
  - `svelte` `5.39.1` → `5.39.6`
  - `svelte-check` `^4.3.1` → `^4.3.2`
  - `svelte-eslint-parser` `^1.3.2` → `^1.3.3`

---

## [1.17.1] - 2025-09-17

### Changed

- Bumped version to `v1.17.1`.

### Security

- Patched transitive vulnerabilities by pinning dependencies via `overrides`:
  - Forced `tmp` to `>=0.2.4` (resolves CVE-2025-54798 reported via `@lhci/cli`).
  - Forced `cookie` to `^1.0.0` (used by `@sveltejs/kit` and `@lhci/cli`).

---

## [1.17.0] - 2025-09-17

### Added

- New `meta-check.yml` GitHub Actions workflow to validate `<title>` and `<meta>` descriptions using Vitest.
  - Runs separately from Playwright to avoid hydration timing issues.
  - Ensures SEO metadata is tested in CI without blocking other jobs.
- New `meta.test.js` file in `tests/unit/meta` for testing in CI.
- New `meta.test.js` file in `tests/unit/server` for local testing.

### Changed

- Bumped version to `v1.17.0`.
- Cleaned up Playwright E2E tests:
  - Removed brittle `toHaveTitle` assertions causing CI failures.
  - Standardized footer checks to use helper function.
  - Improved test readability and consistency in `app.spec.js` and `mobile.spec.js`.
- Updated generator metadata in `app.html` to reflect `SvelteKit 2.42.1`.
- Updated Node.js version in `.node-version` and `.nvmrc` to `24.8.0`.
- Updated CSP endpoint section and footer in `README.md`.
- Updated JSDoc linting step and `sed` syntax in `build-and-publish.yml` workflow.
- Updated `npm` version to `11.6.0` in GitHub Actions workflow files:
  - `build-and-publish.yml`
  - `lighthouse.yml`
  - `playwright.yml`
  - `publish-test.yml`
  - `templates/publish.template.yml`
- Upgraded dependencies:
  - `@eslint/compat` `^1.3.1` → `^1.3.2`
  - `@eslint/js` `^9.32.0` → `^9.35.0`
  - `@playwright/test` `^1.54.1` → `^1.55.0`
  - `@sveltejs/adapter-netlify` `^5.1.0` → `^5.2.3`
  - `@sveltejs/kit` `2.27.0` → `2.42.1`
  - `@sveltejs/vite-plugin-svelte` `^6.1.0` → `^6.2.0`
  - `@testing-library/jest-dom` `^6.6.4` → `^6.8.0`
  - `browserslist` `^4.25.1` → `^4.26.2`
  - `dompurify` `^3.2.6` → `^3.2.7`
  - `eslint` `^9.32.0` → `^9.35.0`
  - `eslint-plugin-jsdoc` `^52.0.2` → `^58.1.1`
  - `eslint-plugin-svelte` `^3.11.0` → `^3.12.3`
  - `globals` `^16.3.0` → `^16.4.0`
  - `playwright` `^1.54.1` → `^1.55.0`
  - `posthog-js` `^1.258.4` → `^1.266.0`
  - `stylelint` `^16.23.0` → `^16.24.0`
  - `svelte` `5.37.2` → `5.39.1`
  - `svelte-check` `^4.3.0` → `^4.3.1`
  - `svelte-eslint-parser` `^1.3.0` → `^1.3.2`
  - `vite` `^7.0.6` → `^7.1.5`

### Documentation

- Clarified CSP reporting setup in `README.md`:
  - Explained relationship with external CSP reporting endpoint (`csp-endpoint` repo).
  - Documented use of both `report-uri` (legacy) and `report-to` (modern, recommended).
  - Added example headers including `Report-To` definition.

### Removed

- Deleted `src/routes/example.svx`, which was unused and unneeded.
- Removed `mdsvex` from package.json, as it is unlikely to be used.

### Security

- Updated dependencies to address known vulnerabilities (notably `@sveltejs/kit`, `vite`, and related plugins).

### Notes

- Pinned `jsdom` to `26.1.0` due to build incompatibility in `27.x` (`cssstyle` parsing error with Vite/Rollup).

---

## [1.16.0] - 2025-07-31

### Added

- Added `CODE_OF_CONDUCT.md` and `CONTRIBUTING.md` to project root to provide instructions for contributing.

### Changed

- Bumped version to `v1.16.0`.
- Updated generator metadata in `app.html` to reflect `SvelteKit 2.27.0`.
- Added `vercel.json` to `.gitignore`.
- Added additional rule overrides to `stylelint.config.js` to suppress unnecessarily strict linting errors
  - The errors were corrected and the rule overrides are currently commented out
- Updated `npm` to `11.5.2` in the following files in `.github/workflows`
  - `build-and-publish.yml`
  - `lighthouse.yml`
  - `playwright.yml`
  - `publish-test.ml`
  - `templates/publish.template.yml`
- Upgraded dependencies:
  - `@eslint/js` `^9.31.0` → `^9.32.0`
  - `@sveltejs/kit` `2.25.1` → `2.27.0`
  - `@testing-library/jest-dom` `^6.6.3` → `^6.6.4`
  - `eslint` `^9.31.0` → `^9.32.0`
  - `eslint-plugin-jsdoc` `^51.4.1` → `^52.0.2`
  - `posthog-js` `^1.257.0` → `^1.258.4`
  - `stylelint` `^16.22.0` → `^16.23.0`
  - `stylelint-config-recommended` `^16.0.0` → `^17.0.0`
  - `svelte` `5.36.12` → `5.37.2`
  - `typescript` `^5.8.3` → `^5.9.2`
  - `vite` `^7.0.5` → `^7.0.6`

### Fixed

- Corrected deprecated CSS usage throughout the project in the following files:
  - `src/lib/components/Badges.svelte`
  - `src/lib/components/Logo.svelte`
  - `src/lib/components/layout/Footer.svelte`
  - `src/lib/pages/LicenseContent.svelte`
  - `src/lib/styles/css/default.css`
  - `src/lib/styles/css/styles.css`
  - `src/routes/consultation/+page.svelte`
- Generated new `global.min.css` stylesheet with LightningCSS.
- Resolved `svelte-check` type error in `PGP key download endpoint` by replacing Node.js `Buffer` with a standards-compliant `Uint8Array` in the `Response()` constructor.

---

## [1.15.4] - 2025-07-20

### Changed

- Bumped version to `v1.15.4`
- **Updated "Copy SMS Code - OTP Helper" entry** in `src/lib/data/fossData.js` to maintain visual consistency with previous "FOSS Spotlight" entries

---

## [1.15.3] - 2025-07-20

### Added

- New FOSS Spotlight entry: **Copy SMS Code – OTP Helper**
- Added `otp-helper.png` and `otp-helper.webp` to `src/img/posts`
- Imported image assets via `images.js` as `otphelpPng` and `otphelpWbp`

### Changed

- **Bumped version** to `v1.15.3`
- **Updated Node.js version** to `v24.4.1` in `.node-version` and `.nvmrc`
- **Updated generator metadata** in `app.html` to reflect `SvelteKit 2.25.1`
- **Updated "Last Updated"** timestamp on FOSS Spotlight to `2025-07-20`
- **Updated `sitemap.xml`** with current post dates

- **Upgraded dependencies**:
  - `@sveltejs/adapter-netlify` from `^5.0.2` to `^5.1.0`
  - `@sveltejs/kit` from `2.22.5` to `2.25.1`
  - `@sveltejs/vite-plugin-svelte` from `^6.0.0` to `^6.1.0`
  - `eslint-config-prettier` from `^10.1.5` to `^10.1.8`
  - `eslint-plugin-jsdoc` from `^51.3.4` to `^51.4.1`
  - `eslint-plugin-svelte` from `^3.10.1` to `^3.11.0`
  - `stylelint` from `^16.21.1` to `^16.22.0`
  - `svelte` from `5.35.6` to `5.36.12`
  - `svelte-check` from `^4.2.2` to `^4.3.0`
  - `svelte-eslint-parser` from `^1.2.0` to `^1.3.0`
  - `vite` from `^7.0.4` to `^7.0.5`

---

## [1.15.2] - 2025-07-12

### Added

- Added `Disallow` directives to `static/robots.txt` for stub routes:
  - `/consultation`
  - `/links`
  - `/posts`

### Changed

- Updated `README.md` to reflect the updated directory structure after removing the `netlify/` directory.

---

## [1.15.1] - 2025-07-12

### Added

- Added `Report-To` header in `src/hooks.server.js` to support modern CSP reporting

### Changed

- Bumped project version to `1.15.1`
- Updated CSP report URL in `src/hooks.server.js` to use external endpoint
- Updated `sitemap.xml` to reflect latest site structure
- Updated `.node-version` and `.nvmrc` to `v24.4.0`
- Cleaned up `netlify.toml`:
  - Removed `[[edge_functions]]` block
  - Confirmed `ENV_MODE` remains for internal tooling
- Updated to latest versions:
  - `@eslint/js` to `^9.31.0`
  - `@playwright/test` to `^1.54.1`
  - `@sveltejs/kit` to `2.22.5`
  - `@sveltejs/vite-plugin-svelte` to `6.0.0`
  - `eslint` to `^9.31.0`
  - `eslint-plugin-jsdoc` to `^51.3.4`
  - `playwright` to `^1.54.1`
  - `posthog-js` to `^1.257.0`
  - `stylelint` to `^16.21.1`
  - `svelte` to `5.35.6`
  - `vite` to `7.0.4`

### Removed

- Deleted `/netlify/edge-functions/` and `csp-report.js` (CSP report handling is now in its own project)
- Removed `tests/unit/server/csp-report.test.js` from project, as CSP endpoint has been relocated

---

## [1.15.0] - 2025-07-01

### Added

- `redirect.js` utility to handle browser-aware redirects with fallback logic for Firefox.
- Unit test for `redirect.js` under `tests/unit/client/lib/utils/redirect.test.js`.
- `/consultation` redirect route to `utm.js` UTM-tracking logic.
- Redirect from `/foss` to `/foss-spotlight` in `_redirects`.
- `scripts/testRedirect.js` to verify Netlify/SvelteKit trailing slash redirect behavior.
- `test:redirects` script in package.json to trigger `scripts/testRedirects.js`
- Logic to suppress `rel="noopener noreferrer"` on internal redirects in `HeaderHome.svelte` and `HeaderDefault.svelte`
- `redirect` flag to navigation metadata to distinguish internal redirect behavior in `HeaderHome.svelte` and `HeaderDefault.svelte`

### Changed

- Bumped version to **v1.15.0**
- Restructured unit tests:
  - Moved `purify.test.js` to `tests/unit/client/lib/utils/`
  - Moved `utm.test.js` to `tests/unit/client/lib/utils/`
  - Moved `unregisterServiceWorker.test.js` to `tests/unit/client/lib/utils/`
  - Moved `page.svelte.test.js` to `tests/unit/client/routes/`
  - Moved `checkEnv.test.js`, `checkVersions.test.js`, and `csp-report.test.js` to `tests/unit/server/`
  - Moved `auditCoverage.test.js` to `tests/unit/server/internal/`
- Refactored `_redirects` file:
  - Removed trailing slashes to match SvelteKit/Netlify conventions.
- Updated `RedirectPage.svelte` to use `redirectWithBrowserAwareness()` for better cross-browser redirect behavior.
- Refactored all relevant `+page.svelte` files to remove local redirect timeouts and centralize logic in `RedirectPage`.
- Updated `vitest.config.client.js` and `vitest.config.server.js` to:
  - Reflect new directory structure
  - Properly assign `jsdom` for client-side tests and `node` for server-side tests
- `/consultation`, `/contact`, `/links`, `/posts`, and `/privacy-rights` `+page.svelte` files updated to capture UTM parameters in a privacy-preserving manner.
- Moved inline styles from `RedirectPage.svelte` to `src/lib/styles/css/default.css`, including `@keyframes spin` animation used by `.loading-spinner`
- Removed unnecessary `rel` attribute from internal links in `AboutContent.svelte`, `LicenseContent.svelte`, and `PrivacyDashboard.svelte`
- Updated project README with revised directory structure reflecting separate client/server test folders.
- Upgraded dependencies:
  - `globals` `^16.2.0` → `^16.3.0`

### Fixed

- Firefox-specific issue where delayed `window.location.replace()` triggered a new tab instead of redirecting in the same window — now handled by bypassing the delay in Firefox.
- Prevented server-context tests from breaking due to `window` usage by scoping them to client-only environments.

## Removed

- `head:flatten` and `head:validate` scripts in package.json, as the `_headers` file has been deprecated

---

## [1.14.3] - 2025-06-30

### Added

- Manual event capture for redirect pages using PostHog, with automatic UTM parameter extraction
- Utility function `getUTMParams` for parsing UTM query values from URLs
- `trackingEnabled` named export from `trackingPreferences.js` for cleaner consumption

### Changed

- Bumped version to **v1.14.3**
- Refactored redirect logic in multiple pages to integrate UTM-aware analytics
- All redirect pages now consistently open in a new browser tab using `<a>` fallback
- Enhanced `utm.js` logic to support campaign identification for `/contact`, `/links`, `/posts`, and `/privacy-rights`
- Updated `generator` metadata in `app.html` to `SvelteKit 2.22.2`
- Modified `HomeContent.svelte` to use app constant for blog link
- Removed inline styles from redirect pages and integrated them into the main stylesheet
- Renamed "Data Sharing" section in Privacy Policy to "Legal Requests and Data Disclosure"
- Expanded the above section to strengthen users' legal rights and privacy protections
- Updated Privacy Policy effective date to June 30, 2025

### Fixed

- Reinstated filtering logic in `csp-report.js` to suppress low-value or noisy CSP violations
- Resolved `ReferenceError` in `utm.test.js` by reordering mocked imports for `$app/environment` and `$app/stores` to comply with Vitest's hoisting behavior

---

## [1.14.2] - 2025-06-30

### Added

- Added Node.js and npm environment checks to `build-and-publish.yml`.
- Added `.github/workflows/templates/publish.template.yml` for reuse in other org repos.
- JSDoc linting now outputs violation details for better visibility during CI checks

### Changed

- Version bumped to **v1.14.2**
- Corrected naming of `check-security-txt-expiry.yml`
- Updated Node version reference in `.node-version` and `.nvmrc` to `24.3.0`
- Aligned environment context (`ENV_MODE: ci`) in `check-codeql` workflow to match `build-and-publish.yml` standardization
- Updated Node to `24` and npm to `11.4.2` across multiple workflows (`build-and-publish.yml`, `lighthouse.yml`, `playwright.yml`, and `publish-test.yml`) for version alignment
- Upgraded dependencies:
  - `@eslint/compat` ^1.3.0 → ^1.3.1
  - `@eslint/js` ^9.29.0 → ^9.30.0
  - `@lhci/cli` ^0.15.0 → ^0.15.1
  - `@playwright/test` ^1.53.0 → ^1.53.2
  - `@sveltejs/kit` 2.21.5 → 2.22.2
  - `@vitest/coverage-v8` ^3.2.3 → ^3.2.4
  - `browserslist` ^4.25.0 → ^4.25.1
  - `eslint` ^9.29.0 → ^9.30.0
  - `eslint-plugin-jsdoc` ^51.0.1 → ^51.3.1
  - `eslint-plugin-svelte` ^3.9.2 → ^3.10.1
  - `playwright` ^1.53.0 → ^1.53.2
  - `posthog-js` ^1.253.4 → ^1.256.0
  - `prettier` ^3.5.3 → ^3.6.2
  - `stylelint` ^16.20.0 → ^16.21.0
  - `svelte` 5.34.3 → 5.34.9
  - `svelte-check` ^4.2.1 → ^4.2.2
  - `vitest` ^3.2.3 → ^3.2.4

### Fixed

- Updated `check-security-txt-expiry.yml` to use correct path for `security.txt` (now looks in `static/.well-known/`)

---

## [1.14.1] - 2025-06-16

### Added

- Introduced `.github/workflows/publish-test.yml`, a standalone workflow to safely simulate `npm publish` without publishing.
- Added commands to display Node.js and npm versions for visibility and troubleshooting in all relevant jobs.

### Changed

- Updated Node.js engine to `24` to match the specified engine constraints in `package.json`.
- Reordered `npm ci` step to follow Node.js and npm setup to prevent version mismatches during simulation steps.
- Refactored `build-and-publish.yml` to use `git archive` for artifact preparation and aligned it with a tested publishing flow.
- Removed `.npmrc` token-based authentication in favor of environment secrets to avoid credential conflicts.

---

## [1.14.0] - 2025-06-16

### Changed

- Commented out registry and auth lines in `.npmrc`, retaining only `engine-strict=true` to streamline CI token handling and prevent conflicts

### Reverted

- Temporarily reverted `build-and-publish.yml` to prior, working workflow to confirm publish capability before attempting archive-based improvements

---

## [1.13.8] - 2025-06-16

### Added

- Added `cryptomator.png` and `cryptomator.webp` images for use in the FOSS Spotlight route
- Imported assets via image utility (`src/lib/images.js`) as `cryptomPng` and `cryptomWbp`
- Introduced `cryptomator` entry to `fossData.js`
- Added `COMMIT_GUIDE.md` to help standardize commit message formatting across contributions

### Changed

- Updated `build-and-publish.yml` to use an allowlist-based upload approach, explicitly including root-level files and directories (`.github/`, `.vscode/`, `netlify/`, `scripts/`, `src/`, `static/`, and `tests/`)
- Updated meta `author` field in `app.html` to `Scott Lopez`
- Version bumped to **v1.13.8**
- Upgraded dependencies:
  - `postcss` updated from `^8.5.5` → `^8.5.6`
  - `posthog-js` updated from `^1.252.1` → `^1.253.4`

---

## [1.13.7] - 2025-06-15

### Changed

- Added pre-publish steps in `build-and-publish.yml` to recursively list all files and top-level directory contents for auditing
- Version bumped to **v1.13.7**

---

## [1.13.6] - 2025-06-15

### Added

- Introduced `.github/workflows/check-codeql.yml` reusable workflow to validate successful CodeQL analysis during CI
- Added `.github/workflows/templates/check-codeql.template.yml` for documentation and workflow templating purposes

### Changed

- Replaced inline `check-codeql` job in `.github/workflows/build-and-publish.yml` with call to reusable workflow
- Updated `.node-version` and `.nvmrc` from `24.1.0` → `24.2.0` to reflect upgraded Node.js binary
- Replaced `ℹ️` symbol with `🛈` in `bootstrap.local.sh` to improve clarity in terminals
- Version bumped to **v1.13.6**
- Upgraded dependencies:
  - `posthog-js` updated from `1.252.0` → `1.252.1`

---

## [1.13.5] - 2025-06-14

### Added

- Introduced `links/` and `posts/` redirect routes for improved navigation and backward compatibility
- Added `proton-img` and `qrcode-img` utility classes to global stylesheet to eliminate inline styles in `PGPContent.svelte`
- Set `decoding="sync"` and `loading="eager"` on the first QR code image and the Proton Mail badge to improve perceived load performance and visual smoothness
- Added `rel="noopener noreferrer"` support to `RedirectPage.svelte`, now used by the new `/links` and `/posts` routes
- Revised `obtainium-img` class in stylesheets to improve Obtainium image rendering on mobile and enhance overall clarity
- Added a new `scripts/bootstrap.local.sh` script to streamline local development setup, including OS detection and Playwright dependencies
- Added a new “Environment Requirements” Wiki page to consolidate Node version constraints, setup instructions, and local dev tooling guidance
- Replaced the detailed "Getting Started" section in `README.md` with a concise reference to the Wiki and a minimal quickstart snippet

### Changed

- Promoted Node.js and npm version enforcement details from README to the Wiki for centralized documentation
- Removed low-priority CSP report filtering in `csp-report.js` to allow all violations to be logged and reviewed
- Reordered CSS rules to resolve `no-descending-specificity` warnings triggered by focus selectors
- Updated `HeaderHome.svelte` and `HeaderDefault.svelte` to use `PAGE.SELF` and `PAGE.BLANK` constants for target behavior
- Updated `AboutContent.svelte` to use application constant instead of hardcoded value
- Removed unused `COMPANY_INFO` destructured constant from `PGPContent.svelte`
- Upgraded dependencies:
  - `svelte` updated from `5.34.1` → `5.34.3`
- Fixed schema warning in GitHub issue template by replacing `assignees: []` with `assignees: SunDevil311`
- Version bumped to **v1.13.5**

### Fixed

- Restored consistent `:visited` link color by forcing `color: #cba557 !important` across all visited interaction states
- Prevented gold-on-gold text issue when focusing visited links
- Rolled back enhanced `:focus-visible` styles to resolve flicker and override conflicts during fast navigation

### Removed

- Removed unneeded demo unit test (`demo.test.js`) from `tests/unit`

---

## [1.13.4] - 2025-06-13

### Changed

- Version bumped to **v1.13.4**
- Replaced legacy detached signature file `security.txt.asc` with a new `security.txt.sig` format for consistency and clarity

---

## [1.13.3] - 2025-06-13

### Changed

- Upgraded dependencies:
  - `@eslint/js` updated from `^9.28.0` → `^9.29.0`
  - `@sveltejs/kit` updated from `2.21.4` → `2.21.5`
  - `eslint` updated from `^9.28.0` → `^9.29.0`
- Updated `generator` meta tag in `app.html` to reflect `SvelteKit 2.21.5`
- Added note to `.well-known/security.txt` clarifying detached signature availability
- Replaced "Recommended Toolchain," "Tooling Configuration," and "Available Scripts" sections in `README.md` with a new “Development Reference” section linking to the Wiki
- Removed `static/styles/` directory, as the stylesheets are now dynamically imported
- Removed stylesheets from `static/styles` from the Service Worker cache configuration
- Removed `scripts/flattenHeaders.js` and `scripts/validateHeader.js`, which were originally designed for the deprecated `_headers` file
- Version bumped to **v1.13.3**

---

## [1.13.2] - 2025-06-12

### Changed

- Version bumped to v1.13.2
- Updated `a:visited` color to `#cba557` for improved contrast and aesthetics
- Refined `a:active` color to `#e0b000` for clearer interaction feedback
- Confirmed all link colors meet WCAG AA contrast standards against `#191919` background

---

## [1.13.1] - 2025-06-12

### Added

- Modularized `ObtainiumBlock.svelte` component for cleaner integration in `FossItemContent.svelte`
- `heliboard.json` Obtainium configuration file for download
- Dark mode-compatible styling for Obtainium blocks in the main stylesheet

### Changed

- Version bumped to **v1.13.1**
- Removed unnecessary PostHog preload script from `app.html`
- Removed `script-src-elem 'self' 'unsafe-inline'` from CSP policy
- Replaced existing Obtainium images with optimized versions
- Revised `<title>` metadata for the root route
- Commented out debugging `console.log` statements in the following files:
  - `Badges.svelte`
  - `LegalNav.svelte`
  - `MetaTags.svelte`
  - `Footer.svelte`
  - `FossItemContent.svelte`
  - `FossContent.svelte`
  - `HomeContent.svelte`
  - `LicenseContent.svelte`
  - `TermsConditionsContent.svelte`
- Revised type definitions in `src/lib/types/fossTypes.js`
  - Added optional `obtainium` property to `FossItem`
  - Removed unused `hideLabels` property
- Refactored `FossItemContent.svelte` to better support and display Obtainium download links and metadata
- Updated `README.md` to reflect the correct location of the `static/pgp/` directory
- Revised the `hooks.server.js` section in `README.md` to improve accuracy and reflect current CSP behavior
- Updated `tests/e2e/app.spec.js` to assert the correct title for the root route
- Upgraded dependencies:
  - `posthog-js` `^1.250.2` → `^1.252.0`
  - `eslint-plugin-jsdoc` `^50.8.0` → `^51.0.1`

---

## [1.13.0] - 2025-06-11

### Added

- Introduced `/pgp` route to publish OpenPGP contact information, download links, and QR codes
- Added `.well-known/humans.txt` to document project authorship
- Added `.well-known/security.txt` to define the official security contact and vulnerability disclosure policy
- Linked OpenPGP keys to external directories for validation (e.g. keys.openpgp.org)
- Added new GitHub Actions workflow: `check-security-txt-expiry.yml` to monitor `security.txt` expiration

### Changed

- Enforced `"singleQuote": true` in `.prettierrc` and formatted the codebase using Prettier
- Updated `src/service-worker.js` to exclude `security.txt.asc` from caching
- CSP policy updated to allow `clipboard-write` for improved UX on PGP fingerprint buttons
- Clarified that addresses under the `s.neteng.pro` domain are powered by Proton Mail and support native E2EE
- Revised `SECURITY.md` and `security.txt` with accurate Proton Mail usage notes and PGP policy references

### Removed

- Legacy reference to a "coming soon" PGP section in `SECURITY.md` (now live and linked)

---

## [1.12.9] - 2025-06-11

### Added

- Added `check-security-txt-expiry.yml` workflow to check `.well-known/security.txt` expiration and warn if close to expiring
- Added `humans.txt` and `security.txt` to `.well-known/` directory
- Added `src/lib/components/CodeBlock.svelte` component for improved inline formatting control
- Updated sitemap.xml to include `.well-known/` routes and the `/pgp` route
- Added link to OpenPGP results for `security@s.neteng.pro` on the `/pgp` route
- Added support for copy-to-clipboard feedback on PGP fingerprint buttons
- Added detached signature (`security.txt.asc`) for `.well-known/security.txt`, signed with the `security@s.neteng.pro` PGP key

### Changed

- Version bump to `v1.12.9` in `package.json`
- Corrected the name of `dnt-policy.txt` from `dnt-policy-1.0.txt`
- Updated `src/service-worker.js` to:
  - Reflect correct `.well-known/dnt-policy.txt` reference
  - Exclude `.well-known/security.txt.asc` from caching
- Applied line breaks to comment header in `jsconfig.template.jsonc` to fix formatting
- Minor revision to spreadsheet display and fingerprint formatting for improved mobile responsiveness
- Revised `.github/SECURITY.md`:
  - Removed note about “PGP section coming soon to the wiki” (now live)
  - Clarified Proton Mail use for `s.neteng.pro` addresses, while preserving support guidance for others
  - Streamlined vulnerability reporting section for clarity and correctness
- Updated Content Security Policy (CSP) header to allow `clipboard-write` permission
- Added Proton Mail usage note to `/pgp` route UI for `s.neteng.pro` domain only
- Added equivalent Proton Mail usage comment to `.well-known/security.txt`
- Upgraded dependencies:
  - `@eslint/compat` `^1.2.9` → `^1.3.0`
  - `eslint-plugin-jsdoc` `^50.7.1` → `^50.8.0`
  - `postcss` `^8.5.4` → `^8.5.5`
  - `posthog-js` `^1.250.1` → `^1.250.2`
  - `svelte` `5.33.19` → `5.34.1`

---

## [1.12.8] - 2025-06-11

### Added

- Created `/pgp` route with `+page.svelte`, `+page.server.js`, and supporting structure.
- Added `src/lib/pages/PGPContent.svelte` for rendering PGP key information.
- Dynamic routing with `src/routes/pgp/[key]/+server.js` for serving `.asc` files with correct MIME type (`application/pgp-keys`).
- Support for serving QR code images statically in `/pgp` and dynamically in `/about`.
- Added WebP versions of QR code images in `static/pgp/` and `src/lib/img/qr/`.
- Set up dynamic import for QR images in `/about` route via `src/lib/images.js`.
- Enhanced accessibility styles for focus-visible states on links.
- Improved copy-to-clipboard buttons for PGP fingerprints.
- Defined `ContactAssets` typedef and expanded `pgpKeys` data structure for strict typing.
- README updated with new section: `static/pgp/` Directory Structure.

### Changed

- Modified `/about` route to reference `/pgp` and use dynamic WebP images for PGP keys.
- Adjusted `src/lib/meta.js` to include metadata for the `/pgp` route.
- Canonical links in `static/bin/CC-BY-4.0.html` and `static/bin/COPYING.html` updated to reflect new paths.
- Service worker updated to exclude `.asc` files in `/pgp`, while continuing to cache QR image assets.
- Moved license and binary files from `static/assets` to `static/bin`.
- File paths updated on the `/license` route to reflect the new `/bin/license` location.
- Updated sitemap.xml.
- Updated `.prettierignore` to ignore `static/bin/license`.
- Updated LinkSheet download in `FossItemContent.svelte` to reference `bin/linksheet.json`.
- Added dynamic `lsheetDl` constant in `fossData.js`.
- Updated `TermsConditionsContent.svelte` to point to `bin/consulting-terms.pdf`.
- Updated `LicenseContent.svelte` to:
  - View HTML license file.
  - Use `download` attribute for all other formats.
- Updated `generator` meta tag to reflect `SvelteKit 2.21.4`
- Upgraded dependencies:
  - `@playwright/test` updated from `^1.52.0` → `^1.53.0`
  - `@sveltejs/kit` updated from `2.21.3` → `2.21.4`
  - `eslint-plugin-svelte` updated from `^3.9.1` → `^3.9.2`
  - `playwright` updated from `^1.52.0` → `^1.53.0`
  - `posthog-js` updated from `^1.249.5` → `^1.250.1`
  - `svelte` updated from `5.33.18` → `5.33.19`

### Fixed

- Resolved TypeScript and JSDoc typing errors in `AboutContent.svelte` and `PGPContent.svelte`.
- Verified fallback behavior on `/pgp/[key]` for unknown files:
  - `.asc` files return "File not found".
  - All others fall through to 404.
- Adjusted `function copy(text)` with explicit JSDoc type for parameter.
- Removed stale references to deleted assets in service worker config.

---

## [1.12.7] - 2025-06-09

### Changed

- Permissions in `playwright.yml` reduced to `contents: read` to align with least-privilege practices.
- Renamed "Upload Playwright Report" step for clarity and naming consistency.
- Patch version bumped to **v1.12.7** to reflect post-tag changes.

### Security

- Explicit `GITHUB_TOKEN` permissions added to `.github/workflows/build-and-publish.yml` to satisfy GitHub policy while preserving least-privilege.
- Reviewed and reduced permissions in `playwright.yml` to `contents: read` as no elevated scopes are currently required.
- Confirmed `auto-assign.yml` uses appropriate scopes for issue/PR auto-assignment (`issues: write`, `pull-requests: write`, `contents: read`).
- Validated that `dependency-review.yml` and `backup-branch.yml` are properly scoped; no changes required.

---

## [1.12.6] - 2025-06-09

### Added

- Enabled non-blocking Lighthouse CI budget assertions to track performance/resource regressions without blocking the build.
- Added GitHub Actions step to annotate PRs with budget-related audit failures and post a markdown summary comment.
- Introduced a dedicated `Authenticate GitHub CLI` step in the Lighthouse workflow to ensure proper auth for comment posting.
- Added `/legal`, `/legal/`, and `/legal/*` redirects to Netlify `_redirects` file, pointing to `/license`.
- Added `/privacy-policy/` and `/privacy-policy/*` redirects to match existing `/privacy-policy` route.
- Created `scripts/openReport.js`, a cross-platform Node.js utility for opening HTML coverage reports for client and server test runs. Executed via `coverage:client` and `coverage:server` scripts in `package.json`.
- Added `coverage:client`, `coverage:server`, and `coverage:open` scripts to `package.json` to simplify access to generated test coverage reports from the CLI.

### Changed

- Bumped patch version to `v1.12.6`.
- Updated Lighthouse CI workflow to upload the entire `.lighthouseci/` directory as a single artifact instead of renaming individual files.
- Updated ESLint config (`eslint.config.mjs`) to ignore `**/playwright-report/**` and `**/test-results/**`.
- Updated `lint:md` script in `package.json` to exclude `playwright-report/` and `test-results/` from markdownlint.
- Added `playwright-report/` and `test-results/` to `.stylelintignore` to suppress stylelint noise on generated reports.
- Upgraded `@lhci/cli` from `v0.14.0` to `v0.15.0`.
- Upgraded `@vitest/coverage-v8` from `v3.2.2` to `v3.2.3`.
- Upgraded `posthog-js` from `v1.249.4` to `v1.249.5`.
- Upgraded `vitest` from `v3.2.2` to `v3.2.3`.

### Documentation

- Updated `README.md` with improved context and phrasing around the CHANGELOG reference.
- Added `CHANGELOG.md` to the documented project structure with a descriptive label:

  ```markdown
  ├── CHANGELOG.md # Chronological record of notable project changes
  ```

### Fixed

- Updated Lighthouse CI annotation step to explicitly select only valid Lighthouse report files (e.g., `*.report.json`, `lhr-*.json`) and ignore `assertion-results.json`, which caused `jq` parsing errors during CI runs.
- Scoped Lighthouse assertions in `.lighthouserc.cjs` to `resource-summary` only, preventing unwanted failures from default performance audits.
- Resolved malformed PR comment formatting in the Lighthouse GitHub Actions workflow by replacing Markdown tables with plain-text bullet lists.

### Notes

- Confirmed that `Authenticate GitHub CLI` is not needed in `build-and-publish.yml`, as only the `check-codeql` job uses the GitHub CLI and is already authenticated.
- Verified that `scripts/openReport.js` does not require unit testing, as it performs side-effect-only CLI actions. Linting and manual testing are sufficient.

---

## [1.12.5] - 2025-06-08

### Added

- Added `squircle` section to `src/lib/data/fossData.js`.
- Added Squircle CE images to `src/lib/img/` and imported them via the image utility (`src/lib/images.js`).

### Changed

- Quoted `name` and `steps.name` fields in `auto-assign.yml` and `dependency-review.yml` to prevent potential YAML parsing issues.
- Replaced `GITHUB_TOKEN` with `NWPRO_GPR` in the `build-and-publish.yml` workflow.
- Upgraded `svelte` to `v5.33.18` and `@sveltejs/kit` to `v2.21.3`.
- Updated the `generator` meta tag in `app.html` to reflect the new `@sveltejs/kit` version.
- Updated "Last Updated" date in `FossContent.svelte` to reflect the Squircle CE post addition.
- Revised page modification dates in `sitemap.xml` for FOSS Spotlight, Privacy Policy, and Legal, Licensing, and Copyright.

### Removed

- Removed unused `GITHUB_TOKEN` permissions from `build-and-publish.yml`.
- Removed the unnecessary "Authenticate GitHub CLI" step from `build-and-publish.yml`.

---

## [1.12.4] - 2025-06-05

### Added

- Introduced `.md-smart-quotes.js` script for use with markdownlint to flag "smart quotes" in Markdown files.

### Changed

- Cleaned up `IGNORE_PATHS` in `src/service-worker.js`: removed the `static/docs/` entry, as the directory no longer exists.
- Upgraded development dependencies:
  - `@vitest/coverage-v8`
  - `posthog-js`
  - `vitest`
- Corrected the "Effective Date" in `LICENSE.md`.
- Refactored `.markdownlint.jsonc` into `.markdownlint.mjs` to support the custom linting script.

### Removed

- Removed the entire `static/docs/` directory; its contents have been migrated to the [Wiki](https://github.com/netwk-pro/netwk-pro.github.io/wiki).

---

## [1.12.3] - 2025-06-04

### Added

- `static/docs/pgp.md`, `pgp-win.md`, and `pgp-email.md` added for reference.  
  These files have been temporarily stored until they can be migrated to the wiki.

### Changed

- Added the new Markdown files in `static/docs` to the `service-worker.js` cache ignore list.

---

## 1.12.2 – 2025-06-04

### Changed

- `LicenseContent` component updated to reflect the correct "Effective Date."

---

## [1.12.1] – 2025-06-04

### Added

- Standardized issue templates and contact links in `.github/ISSUE_TEMPLATE/config.yml` for consistent triage experience across repositories.
- Shared health files (`SUPPORT.md`, `CONTRIBUTING.md`, `SECURITY.md`) retained in `.github` for fallback visibility.
- Centralized issue submission and triage via main repository (`netwk-pro.github.io`) for all public projects.

### Changed

- Updated `.github` structure to delegate issue creation to the main repository only, simplifying user flow and internal tracking.
- Reorganized public repositories to override the default `.github` issue config selectively as needed.

### Removed

- Removed unused local issue templates from `.github` to prevent template duplication in dependent repositories.

---

## [1.12.0] – 2025-06-04

### Added

- Initial scaffolding for tracking preferences store using SvelteKit writable stores.
- `PrivacyDashboard` and `PrivacyContent` components updated to bind to the reactive tracking store.
- Derived store for automatic re-consent prompts (`remindUserToReconsent`).
- Consent cookie logic added for first-time and returning users.
- First iteration of PostHog integration.
- `sr-only` utility class added to `global.min.css` for accessibility improvements.
- Support disclaimer added to Legal, Copyright,
  and Licensing section.
- Privacy dashboard UI elements and opt-in interface.

### Changed

- Migrated tracking preference logic from `utils/privacy.js` and `utils/trackingCookies.js` to a store-based architecture.
- Updated `posthog.js` to consume new `trackingPreferences` store.
- Improved inline documentation for Netlify `adapter-edge` settings.

### Removed

- Deprecated `shouldTrackUser()` logic and legacy cookie checks.

---

<!-- Link references -->

[Unreleased]: https://github.com/netwk-pro/netwk-pro.github.io/compare/v1.25.23...HEAD
[1.25.23]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.23
[1.25.22]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.22
[1.25.21]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.21
[1.25.20]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.20
[1.25.19]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.19
[1.25.18]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.18
[1.25.17]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.17
[1.25.16]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.16
[1.25.15]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.15
[1.25.14]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.14
[1.25.13]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.13
[1.25.12]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.12
[1.25.11]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.11
[1.25.10]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.10
[1.25.9]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.9
[1.25.8]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.8
[1.25.7]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.7
[1.25.6]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.6
[1.25.5]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.5
[1.25.4]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.4
[1.25.3]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.3
[1.25.2]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.2
[1.25.1]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.1
[1.25.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.25.0
[1.24.5]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.24.5
[1.24.4]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.24.4
[1.24.3]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.24.3
[1.24.2]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.24.2
[1.24.1]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.24.1
[1.24.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.24.0
[1.23.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.23.0
[1.22.2]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.22.2
[1.22.1]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.22.1
[1.22.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.22.0
[1.21.1]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.21.1
[1.21.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.21.0
[1.20.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.20.0
[1.19.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.19.0
[1.18.5]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.18.5
[1.18.4]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.18.4
[1.18.3]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.18.3
[1.18.2]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.18.2
[1.18.1]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.18.1
[1.18.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.18.0
[1.17.2]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.17.2
[1.17.1]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.17.1
[1.17.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.17.0
[1.16.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.16.0
[1.15.4]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.15.4
[1.15.3]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.15.3
[1.15.2]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.15.2
[1.15.1]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.15.1
[1.15.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.15.0
[1.14.2]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.14.2
[1.14.1]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.14.1
[1.14.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.14.0
[1.13.8]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.13.8
[1.13.7]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.13.7
[1.13.6]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.13.6
[1.13.5]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.13.5
[1.13.4]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.13.4
[1.13.3]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.13.3
[1.13.2]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.13.2
[1.13.1]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.13.1
[1.13.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.13.0
[1.12.9]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.9
[1.12.8]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.8
[1.12.7]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.7
[1.12.6]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.6
[1.12.5]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.5
[1.12.4]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.4
[1.12.3]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.3
[1.12.1]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.1
[1.12.0]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.0

<!-- cspell:ignore qrcode cryptom otphelp domcontentloaded -->
