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

This project attempts to follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), though versioning and formatting may vary.

---

## [Unreleased]

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

### Changed

- Updated Node.js engine to `24` to match the specified engine constraints in `package.json`.
- Reordered `npm ci` step to follow Node.js and npm setup to prevent version mismatches during simulation steps.
- Refactored `build-and-publish.yml` to use `git archive` for artifact preparation and aligned it with a tested publishing flow.
- Removed `.npmrc` token-based authentication in favor of environment secrets to avoid credential conflicts.

### Added

- Introduced `.github/workflows/publish-test.yml`, a standalone workflow to safely simulate `npm publish` without publishing.
- Added commands to display Node.js and npm versions for visibility and troubleshooting in all relevant jobs.

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

### Fixed

- Updated Lighthouse CI annotation step to explicitly select only valid Lighthouse report files (e.g., `*.report.json`, `lhr-*.json`) and ignore `assertion-results.json`, which caused `jq` parsing errors during CI runs.
- Scoped Lighthouse assertions in `.lighthouserc.cjs` to `resource-summary` only, preventing unwanted failures from default performance audits.
- Resolved malformed PR comment formatting in the Lighthouse GitHub Actions workflow by replacing Markdown tables with plain-text bullet lists.

### Docs

- Updated `README.md` with improved context and phrasing around the CHANGELOG reference.
- Added `CHANGELOG.md` to the documented project structure with a descriptive label:

  ```markdown
  ├── CHANGELOG.md # Chronological record of notable project changes
  ```

### Misc

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

## 1.12.0 – 2025-06-04

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

[Unreleased]: https://github.com/netwk-pro/netwk-pro.github.io/compare/v1.15.4...HEAD
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

<!-- cspell:ignore qrcode cryptom otphelp -->
