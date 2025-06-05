# Tracking Preferences & Privacy Signals

<!-- markdownlint-disable MD018 -->

## Overview

This document explains how Network Pro handles analytics tracking in a privacy-aware, user-consented, and standards-compliant manner. It covers:

- Tracking preference storage (cookies)
- Browser signals (DNT and GPC)
- Reconsent logic
- Reactive store architecture

### 🔐 Principles

- **Privacy by default**: Tracking is disabled when browser signals indicate user preference (DNT/GPC).
- **Explicit consent**: Users may opt-in or opt-out manually, overriding signals.
- **Persistent choice**: Consent state is remembered via first-party cookies.
- **Transparency**: The tracking status is shown to users in the UI.

### 🧠 Architecture Summary

- **Store**: `src/lib/stores/trackingPreferences.js`
  - Consolidates logic for cookie preferences, browser signals, and consent state.
  - SSR-safe, reactive, and fully declarative.
- **Deprecated**:
  - `utils/privacy.js` → replaced by derived store logic.
  - `utils/trackingCookies.js` → merged into the store with SSR-safe cookie APIs.

### Reactive State

| Store                   | Type                      | Description                                                             |
| ----------------------- | ------------------------- | ----------------------------------------------------------------------- |
| `trackingPreferences`   | `Readable<TrackingState>` | Contains current tracking metadata (opt-in/out, DNT, GPC, status, etc). |
| `trackingEnabled`       | `Writable<boolean>`       | Exposed to toggle or query PostHog tracking state reactively.           |
| `remindUserToReconsent` | `Readable<boolean>`       | Indicates whether a consent renewal prompt should be shown.             |
| `showReminder`          | `Writable<boolean>`       | Used by PostHog to conditionally display a reminder or banner.          |

### ⏳ Reconsent Logic

The derived store `remindUserToReconsent` evaluates whether a user should be reminded to re-consent to tracking.

It checks for:

- Manual opt-in or opt-out
- A valid `tracking_consent_timestamp` cookie
- Whether 6+ months have elapsed since that timestamp

### ⚙️ Developer Notes

- Changes to tracking preferences update cookies and reactive state
- Reconsent timestamp is written/cleared via store utility functions
- Use `$trackingPreferences` and `remindUserToReconsent` wherever reactive values are needed

### 💡 Related Components

| File                            | Purpose                                                                          |
| ------------------------------- | -------------------------------------------------------------------------------- |
| `+layout.svelte`                | Initializes PostHog client and service worker; references `trackingPreferences`. |
| `PrivacyDashboard.svelte`       | UI control panel for opt-in/out toggles and consent status display.              |
| `PrivacyContent.svelte`         | Informational content rendered in modals, footers, and standalone pages.         |
| `stores/trackingPreferences.js` | Primary source of truth; tracks and derives tracking state.                      |
| `stores/posthog.js`             | Encapsulates privacy-safe analytics setup and event capture logic.               |
