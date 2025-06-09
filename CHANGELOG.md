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

[Unreleased]: https://github.com/netwk-pro/netwk-pro.github.io/compare/v1.12.5...HEAD
[1.12.5]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.5
[1.12.4]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.4
[1.12.3]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.3
[1.12.1]: https://github.com/netwk-pro/netwk-pro.github.io/releases/tag/v1.12.1
