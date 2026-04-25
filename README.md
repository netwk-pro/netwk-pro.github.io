<!-- =====================================================================
README.md

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
====================================================================== -->

# 🌐 Network Pro&trade; — Web Presence

> **Locking Down Networks, Unlocking Confidence&trade;**  
> _Security, Networking, Privacy — Network Pro&trade;_

&nbsp;

[![Vercel](https://img.shields.io/github/deployments/netwk-pro/netwk-pro.github.io/Production?label=vercel&logo=vercel 'Vercel')](https://vercel.com) [![NPM Version](https://img.shields.io/npm/v/%40networkpro%2Fweb?registry_uri=https%3A%2F%2Fregistry.npmjs.com&style=flat&logo=npm&logoSize=auto&color=%23CB3837 'NPM Version')](https://www.npmjs.com/package/@networkpro/web) [![Build and Publish to Registries](https://github.com/netwk-pro/netwk-pro.github.io/actions/workflows/build-and-publish.yml/badge.svg 'Build and Publish to Registries')](https://github.com/netwk-pro/netwk-pro.github.io/actions/workflows/build-and-publish.yml)  
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat 'Code Style: Prettier')](https://github.com/prettier/prettier) [![stylelint](https://img.shields.io/badge/stylelint-%23747474?style=flat&logo=stylelint&logoSize=auto&labelColor=%23263238 'stylelint')](https://stylelint.io/)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg 'Contributor Covenant')](https://github.com/netwk-pro/netwk-pro.github.io/blob/master/CODE_OF_CONDUCT.md)

<section id="top">

## 🚀 Project Overview

This GitHub repository powers the official web presence of **[Network Pro Strategies](https://netwk.pro/about)** — a research- and infrastructure-focused technology initiative working across cybersecurity, digital systems, and privacy. Our work spans applied research and development, experimental infrastructure, educational tools and publications, and public advocacy for security- and privacy-respecting technology.

### Technology Stack

Built with [Svelte 5](https://svelte.dev/) and [SvelteKit](https://svelte.dev/docs/kit/), deployed primarily on [Vercel](https://vercel.com/), with a separate hardened audit environment on [Netlify](https://www.netlify.com/).

[Blog](https://github.com/netwk-pro/blog) and [documentation](https://github.com/netwk-pro/docs) subsites built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) and deployed via [Vercel](https://vercel.com/).

All infrastructure and data flows are designed with **maximum transparency, self-hosting, and user privacy** in mind.

</section>

### Table of Contents

- [Template & Distribution Intent](#distribution)
- [Changelog](#changelog)
- [Repository Structure](#structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Security & Dependency Checks](#security)
- [Service Worker Utilities](#sw-utilities)
- [Debug Mode](#debug)
- [CSP Report Handler](#cspreport)
- [Testing](#testing)
- [Development Reference](#reference)
- [License](#license)
- [Questions](#questions)

---

<section id="distribution">

## 📦 Template & Distribution Intent

This repository serves multiple purposes:

- It powers the official **Network Pro™ web presence**
- It is distributed via **npm** and **GitHub Package Registry**
- It is intentionally designed to function as a **reference implementation and starter template** for SvelteKit projects that emphasize security, documentation, and maintainability

As a result, this codebase is treated as a **continuously maintained software project**, rather than a static website snapshot.

### Copyright & Header Conventions

Source code and configuration files in this repository use **copyright year ranges** (e.g. `© 2025–2026`) to reflect ongoing development over time. This approach aligns with common practice in actively maintained software projects and templates.

User-facing content (such as pages, documentation, and rendered site output) may derive effective copyright years dynamically at runtime to more accurately reflect publication and revision timelines.

These conventions are intentional and aim to balance legal clarity, maintainability, and practical reuse for downstream consumers of this project.

</section>

---

<section id="changelog">

## 📝 Changelog

For a history of changes to the Network Pro&trade; Web Presence, see the **[CHANGELOG](https://github.com/netwk-pro/netwk-pro.github.io/blob/master/CHANGELOG.md)**. All notable updates are documented there.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Version numbers use a **SemVer-inspired** `MAJOR.MINOR.PATCH` format, with
version increments reflecting both user-visible and operational impact.

</section>

<sub>[Back to top](#top)</sub>

---

<section id="structure">

## 📁 Repository Structure

```bash
  .
  ├── .github/
  │   └── workflows/                # CI workflows (e.g. test, deploy)
  ├── .vscode/
  │   ├── customData.json           # Custom CSS IntelliSense (e.g. FontAwesome)
  │   ├── extensions.json           # Recommended VS Code / VSCodium extensions
  │   ├── extensions.jsonc          # Commented version of extensions.json
  │   └── settings.json             # Workspace settings
  ├── scripts/                      # General-purpose utility scripts
  ├── src/
  │   ├── lib/                      # Components, utilities, types, styles
  │   │   ├── components/           # Svelte components
  │   │   ├── data/                 # Custom data (e.g. JSON, metadata, constants)
  │   │   └── utils/                # Helper utilities
  │   ├── routes/                   # SvelteKit pages (+page.svelte, +server.js)
  │   ├── app.html                  # Entry HTML template and bootstrapping
  │   ├── hooks.client.ts           # Client-side error handling
  │   ├── hooks.server.js           # Request-time security headers and diagnostics
  │   └── service-worker.js         # Custom PWA service worker
  ├── static/                       # Public assets served at site root
  │   ├── pgp/                      # PGP keys
  │   ├── disableSw.js              # Service worker bypass (via ?nosw param)
  │   ├── manifest.json             # PWA metadata
  │   ├── robots.txt                # SEO: allow/disallow crawlers
  │   └── sitemap.xml               # SEO: full site map
  ├── tests/
  │   ├── e2e/                        # Playwright end-to-end tests
  │   ├── meta/                       # Metadata end-to-end CI tests
  │   └── unit/                       # Vitest unit tests
  │       ├── client/                 # Client-side (jsdom) unit tests
  │       ├── server/                 # Server-side (node) unit tests
  │       │   └── internal/           # Internal audit/test helpers
  │       │       └── auditCoverage.test.js  # Warns about untested source modules
  ├── CHANGELOG.md                  # Chronological record of notable project changes
  ├── vercel.json                   # Vercel configuration
  ├── package.json                  # Project manifest (scripts, deps, etc.)
  └── ...
```

&nbsp;

### 🔐 `static/pgp/` Directory Structure

This directory contains public PGP key files. Their corresponding QR code images are now loaded dynamically from `src/lib/img/qr`. A dynamic QR code import utility in `src/lib/images.js` allows these files to be imported directly from `$lib`.

```bash
static/
├── pgp/
│   ├── contact@s.neteng.pro.asc       # Public key for secure email
│   ├── security@s.neteng.pro.asc      # Public key for security contact
│   ├── support@netwk.pro.asc          # Public key for general support
└── ...
```

- `.asc` files are **excluded from service worker precaching** but served directly via the `/pgp/[key]` route.
- QR code images—including WebP and PNG versions—are **served dynamically** from `src/lib/img/qr` using `<picture>` elements.
- This route does **not use fallback rendering**; only explicitly defined files are available and expected to resolve.
- A dynamic `[key]/+server.js` handler under `src/routes/pgp/` serves the `.asc` files with appropriate `Content-Type` and download headers.

&nbsp;

### E2E Test Structure

End-to-end tests are located in `tests/e2e/` and organized by feature or route:

> **Note:** WebKit/Safari E2E coverage is currently not part of the default Playwright matrix. Previous attempts to enable it produced unstable failures; revisit with a dedicated macOS/WebKit stabilization pass if Safari coverage becomes a release requirement.

```bash
tests/
├── e2e/
│   ├── app.spec.js       # Desktop and mobile route tests
│   ├── mobile.spec.js    # Mobile-specific assertions
│   └── shared/
│       └── helpers.js    # Shared test utilities (e.g., getFooter, setDesktopView, setMobileView)
└── ...
```

</section>

<sub>[Back to top](#top)</sub>

---

<section id="getting-started">

## 🛠 Getting Started

For full setup guidance, including environment setup, version enforcement, and local tooling, refer to the 📚 [Environment Requirements Wiki](https://github.com/netwk-pro/netwk-pro.github.io/wiki/Environment-Requirements).

```bash
git clone https://github.com/netwk-pro/netwk-pro.github.io.git
cd netwk-pro.github.io
cp .env.template .env
npm install
npx playwright install
```

</section>

<sub>[Back to top](#top)</sub>

---

<section id="configuration">

## 🛡️ Configuration

This project includes custom runtime configuration files for enhancing security, error handling, and PWA functionality. These modules are used by the framework during server- and client-side lifecycle hooks.

### 🔐 Security Headers and CSP

Security headers are split between SvelteKit configuration and request-time server hooks:

- `svelte.config.js` defines `kit.csp` with environment-based directives:
  - **Production/Audit**: Enforced, hardened CSP
  - **Test/Dev**: Uses `Content-Security-Policy-Report-Only` for safe diagnostics
- `src/hooks.server.js` adds request-time headers and diagnostics:
  - `Report-To` metadata for production CSP reporting
  - Probely scanner diagnostics in audit mode
  - Audit-hostname mismatch warnings when `PUBLIC_ENV_MODE` is not `audit`
- Standard HTTP security headers are also set in `src/hooks.server.js`:
  - `Permissions-Policy`
  - `X-Content-Type-Options`
  - `X-Frame-Options`
  - `Referrer-Policy`
  - `Strict-Transport-Security` (in non-test environments)

---

### ⚙️ CSP Behavior by Environment

| Environment  | Header                                | Analytics Enabled | CSP Reporting |
| ------------ | ------------------------------------- | ----------------- | ------------- |
| `production` | `Content-Security-Policy`             | ✅ Yes            | ✅ Yes        |
| `audit`      | `Content-Security-Policy`             | ❌ No             | ❌ No         |
| `dev`        | `Content-Security-Policy-Report-Only` | ❌ No             | ✅ Yes (mock) |
| `test`       | `Content-Security-Policy-Report-Only` | ❌ No             | ✅ Yes (mock) |

---

### 🧪 Reporting & Debugging

- In **dev/test environments**, CSP headers are set to `report-only` mode.
- Violations are POSTed to `/api/mock-csp`, which logs reports to the console.
- In **production**, violations are sent to a real CSP collection endpoint (`https://csp.netwk.pro/.netlify/functions/csp-report`).
- CSP selection is made at build/config time from `PUBLIC_ENV_MODE`, Vite mode, and local command fallbacks.
- Requests for `audit.netwk.pro` are logged as diagnostics if the build was not produced with `PUBLIC_ENV_MODE=audit`.

---

### ⚠️ Current Trade-Off

> SvelteKit manages CSP hashes/nonces for framework-generated inline scripts. The current policy still allows `'unsafe-inline'` for styles because Svelte transitions can generate inline styles at runtime. The temporary Keep Android Open banner is allowed by host and by a specific inline helper-script hash.

---

### 📈 Future Improvements (Strict CSP Plan)

To move toward a strict, nonce-based CSP:

1. Keep CSP policy construction in `svelte.config.js` so SvelteKit can manage framework hashes/nonces.
2. Remove third-party inline-script hash allowances when the related integrations are removed or replaced.
3. Confirm **PostHog** or future analytics platforms support nonced or external scripts/stylesheets.
4. Review and refactor any components that rely on dynamic `style=` or `<style>` blocks without support for CSP nonces.
5. Move third-party scripts out of inline `<script>` tags where possible

> ℹ️ Nonce-based CSP remains a long-term goal for dynamic pages, but prerendered pages use hashes. A fully strict policy still requires cooperation from third-party scripts and style-generating runtime behavior.

&nbsp;

### 🧭 `hooks.client.ts`

Located at `src/hooks.client.ts`, this file is currently limited to handling uncaught client-side errors via the `handleError()` lifecycle hook.

Client-side PWA logic (such as handling the `beforeinstallprompt` event, checking browser compatibility, and registering the service worker) has been moved to `src/lib/registerServiceWorker.js` for better modularity and testability.

> 💡 This separation ensures that error handling is isolated from PWA lifecycle logic, making both concerns easier to maintain.

</section>

<sub>[Back to top](#top)</sub>

---

<section id="security">

## 🧩 Continuous Security & Dependency Checks

Network Pro&trade; automatically performs dependency and vulnerability checks as part of its CI/CD pipeline:

- **GitLeaks Secret Scanning** — detects potential secrets and credentials in commits, pull requests, and full-history scans.
- **CodeQL Analysis** — runs static code scanning to detect code-level vulnerabilities.
- **Probely DAST Scans** — executes weekly external scans on the audit deployment (`audit.netwk.pro`) to identify web application vulnerabilities.
- **npm Audit** — runs during the build phase to detect known vulnerabilities in installed dependencies (`npm audit --audit-level=moderate`).
- **Dependabot** — automatically monitors and updates outdated dependencies via pull requests.
- **ESLint, Prettier, etc. (Local)** — enforces code quality and consistency during local development before commits.

Each tool is configured to run in a safe, non-production environment to ensure reliability and protect sensitive data.

</section>

<sub>[Back to top](#top)</sub>

---

<section id="sw-utilities">

## ⚙️ Service Worker Utilities

This project includes modular service worker management to support PWA functionality, update lifecycles, and debugging workflows.

### ✅ `registerServiceWorker.js`

Located at `src/lib/registerServiceWorker.js`, this module handles:

- **Service worker registration** (`service-worker.js`)
- **Update lifecycle**: prompts users when new content is available
- **Cache hygiene**: removes unexpected caches not prefixed with `cache-`
- **Install prompt support**: dispatches a `pwa-install-available` event for custom handling
- **Firefox compatibility**: skips registration in Firefox during localhost development

This function is typically called during client boot from `+layout.svelte` or another root-level component.

> ℹ️ The service worker will not register if the `?nosw` flag is present or if `window.__DISABLE_SW__` is set (see below).

&nbsp;

### 🧹 `unregisterServiceWorker.js`

Located at `src/lib/unregisterServiceWorker.js`, this utility allows for manual deactivation of service workers during debugging or user opt-out flows.

It unregisters **all active service worker registrations** and logs the result.

&nbsp;

### 🚫 `disableSw.js`

Located at `static/disableSw.js`, this file sets a global flag if the URL contains the `?nosw` query parameter:

```js
if (location.search.includes('nosw')) {
  window.__DISABLE_SW__ = true;
}
```

This flag is used by `registerServiceWorker.js` to bypass registration. It's helpful for testing environments, browser compatibility checks, or simulating first-load conditions without service worker interference.

To use:

```bash
https://netwk.pro/?nosw
```

> 💡 `disableSw.js` is loaded via a `<script>` tag in `app.html` from the `static` directory. This ensures the `__DISABLE_SW__` flag is set before any service worker logic runs.

&nbsp;

#### 🔧 Example Usage

To register the service worker conditionally, call the function from client code:

```js
import { registerServiceWorker } from '$lib/registerServiceWorker.js';

registerServiceWorker();
```

You can optionally import unregisterServiceWorker() in a debug menu or settings panel to let users opt out of offline behavior.

</section>

<sub>[Back to top](#top)</sub>

---

<section id="debug">

## `?debug=true` Query Parameter

Appending `?debug=true` to the URL enables debug logs in the browser console, even in production builds. This is useful for confirming:

- The current runtime environment (`development` vs. `production`)
- Query parameter parsing behavior
- Whether certain client-side features are properly initialized

```bash
https://netwk.pro/?debug=true
```

> 💡 This flag does not persist across navigation or reloads. It simply triggers console logs during initial mount to aid in troubleshooting and QA.

</section>

---

<section id="cspreport">

## 📣 CSP Report Handler

This project integrates with a dedicated CSP reporting endpoint, implemented as a [Netlify Edge Function](https://docs.netlify.com/edge-functions/overview/) and hosted separately at:

- <https://csp.netwk.pro/.netlify/functions/csp-report>
- Source: [netwk-pro/csp-endpoint](https://github.com/netwk-pro/csp-endpoint)

The endpoint receives Content Security Policy (CSP) violation reports and logs details for inspection. High-risk violations (e.g., `script-src`, `form-action`) also trigger real-time alerts via [`ntfy`](https://ntfy.sh/). You can extend this further by integrating with SIEM platforms, logging tools, or notification systems.

### Usage

To enable reporting, make sure your CSP policy includes both the legacy `report-uri` and the modern `report-to` directives.  
This project configures those directives in `svelte.config.js` for production CSP, while `src/hooks.server.js` adds the required `Report-To` response header:

```http
# Example response headers
Content-Security-Policy: ...; report-uri https://csp.netwk.pro/.netlify/functions/csp-report; report-to csp-endpoint;

Report-To: {
  "group": "csp-endpoint",
  "max_age": 10886400,
  "endpoints": [
    { "url": "https://csp.netwk.pro/.netlify/functions/csp-report" }
  ],
  "include_subdomains": true
}
```

</section>

<sub>[Back to top](#top)</sub>

---

<section id="testing">

## 🧪 Testing

This project uses a mix of automated performance, accessibility, and end-to-end testing tools to maintain quality across environments and deployments.

| Tool                                                         | Purpose                                              | Usage Context       |
| ------------------------------------------------------------ | ---------------------------------------------------- | ------------------- |
| [`@playwright/test`](https://playwright.dev/docs/test-intro) | End-to-end testing framework with browser automation | Local + CI          |
| [`@lhci/cli`](https://github.com/GoogleChrome/lighthouse-ci) | Lighthouse CI — automated performance audits         | CI (optional local) |
| [`lighthouse`](https://github.com/GoogleChrome/lighthouse)   | Manual/scripted Lighthouse runs via CLI              | Local (global)      |

> **Note:** `lighthouse` is intended to be installed globally (`npm i -g lighthouse`) or run via the `lighthouse` npm script, which uses the locally installed binary if available. You can also run Lighthouse through Chrome DevTools manually if preferred.

<!-- markdownlint-disable MD028 -->

> CI uses Chrome for Lighthouse audits. For local experimentation, you may run Lighthouse manually using [Brave](https://brave.com), which can reveal differences related to privacy features or tracking protection.

<!-- markdownlint-enable MD028 -->

&nbsp;

### Testing Configuration Files

| File                   | Description                                                              | Usage Context |
| ---------------------- | ------------------------------------------------------------------------ | ------------- |
| `playwright.config.js` | Configures Playwright test environment (browsers, timeouts, base URL)    | Local + CI    |
| `.lighthouserc.cjs`    | Lighthouse CI config for defining audit targets, budgets, and assertions | CI            |

&nbsp;

### E2E Setup

Playwright is included in `devDependencies` and installed automatically with:

```bash
npm install
```

To install browser dependencies (required once):

```bash
npx playwright install
```

> This downloads the browser binaries (Chromium, Firefox, WebKit) used for testing. You only need to run this once per machine or after a fresh clone.

&nbsp;

### Running Tests

Local testing via Vitest and Playwright:

```bash
npm run test:client     # Run client-side unit tests with Vitest
npm run test:server     # Run server-side unit tests with Vitest
npm run test:all        # Run full test suite
npm run test:watch      # Watch mode for client tests
npm run test:coverage   # Collect code coverage reports
npm run test:e2e        # Runs Playwright E2E tests (with one retry on failure)
```

<!-- markdownlint-disable MD028 -->

> The unit test suite includes a coverage audit (`auditCoverage.test.js`) that warns when source files in `src/` or `scripts/` do not have corresponding unit tests. This helps track test completeness without failing CI.

> Playwright will retry failed tests once `(--retries=1)` to reduce false negatives from transient flakiness (network, render delay, etc.).

<!-- markdownlint-enable MD028 -->

Audit your app using Lighthouse:

```bash
# Run Lighthouse CI (via @lhci/cli) using the current build
npm run lhci:run
```

Manual auditing with Lighthouse (e.g., via Brave or Chrome):

```bash
# Install globally (if not already installed)
npm install -g lighthouse

# Run Lighthouse manually against a deployed site
lighthouse https://netwk.pro --view
```

You can also audit locally using Chrome DevTools → Lighthouse tab for on-the-fly testing and preview reports.

> The repo uses `@lhci/cli` for CI-based audits. It is installed as a dev dependency and does not require a global install.

<!-- markdownlint-disable MD028 -->

> To trace the exact Chrome version and audit timestamp used in CI:
>
> ```bash
> cat .lighthouseci/chrome-version.txt
> ```

<!-- markdownlint-disable MD028 -->

</section>

<sub>[Back to top](#top)</sub>

---

<section id="reference">

## 🧰 Development Reference

Tooling setup, configuration files, and CLI scripts have been moved to the [project Wiki](https://github.com/netwk-pro/netwk-pro.github.io/wiki) for easier maintenance and discoverability.

Refer to the Wiki for:

- Recommended toolchain
- Configuration file overview
- CLI script usage and automation

</section>

<sub>[Back to top](#top)</sub>

---

<section id="license">

## 🧾 License

This project is licensed under:

- [Creative Commons BY 4.0](https://netwk.pro/legal#cc-by)

- Or optionally, [GNU GPL v3 or later](https://netwk.pro/legal#gnu-gpl)

Source code, branding, and visual assets are subject to reuse and distribution terms specified on our [Legal, Copyright, and Licensing page](https://netwk.pro/legal).

</section>

<sub>[Back to top](#top)</sub>

---

<section id="questions">

## 🙋‍♂️Questions?

Reach out via our [Contact Form](https://netwk.pro/contact), open an issue on this repo, or email us directly at `support (at) netwk.pro`.

</section>

<sub>[Back to top](#top)</sub>

&nbsp;

_Designed for professionals. Hardened for privacy. Built with intent._  
— **Network Pro Strategies**

---

<span style="font-size: 12px; text-align: center;">

Copyright &copy; 2025, 2026  
**[Network Pro Strategies, LLC](https://netwk.pro) (Network Pro&trade;)**

Network Pro&trade;, the shield logo, and the "Locking Down Networks...&trade;" slogan are [trademarks](https://netwk.pro/legal#trademark) of Network Pro Strategies.

Licensed under **[CC BY 4.0](https://netwk.pro/legal#cc-by)** and the **[GNU GPL](https://netwk.pro/legal#gnu-gpl)**, as published by the [Free Software Foundation](https://www.fsf.org), either version 3 of the License, or (at your option) any later version.

</span>

<!-- cspell:ignore cspreport toolconfig -->
