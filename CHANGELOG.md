# Changelog

<!-- markdownlint-disable MD024 -->

All notable changes to this project will be documented in this file.

This project attempts to follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), though versioning and formatting may vary.

---

## [Unreleased]

---

## [1.12.2] – 2025-06-04

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
