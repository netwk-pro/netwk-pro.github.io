<!-- =====================================================================
README.md

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
====================================================================== -->

# 🌐 Network Pro&trade; — Web Presence

> **Locking Down Networks, Unlocking Confidence&trade;**  
> _Security, Networking, Privacy — Network Pro&trade;_

&nbsp;

[![Netlify Status](https://api.netlify.com/api/v1/badges/93910633-3fdb-4bb3-a9bf-5d91ccfeebf9/deploy-status)](https://app.netlify.com/projects/networkpro-web/deploys) [![NPM Version](https://img.shields.io/npm/v/%40networkpro%2Fweb?registry_uri=https%3A%2F%2Fregistry.npmjs.com&style=flat&logo=npm&logoSize=auto&color=%23CB3837)](https://www.npmjs.com/package/@networkpro/web) [![Build and Publish to Registries](https://github.com/netwk-pro/netwk-pro.github.io/actions/workflows/build-and-publish.yml/badge.svg)](https://github.com/netwk-pro/netwk-pro.github.io/actions/workflows/build-and-publish.yml)  
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier) [![stylelint](https://img.shields.io/badge/stylelint-%23747474?style=flat&logo=stylelint&logoSize=auto&labelColor=%23263238)](https://stylelint.io/)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://github.com/netwk-pro/netwk-pro.github.io/blob/master/CODE_OF_CONDUCT.md)

<section id="top">

## 🚀 Project Overview

This GitHub repository powers the official web presence of **[Network Pro Strategies](https://netwk.pro/about)** — a privacy-first consultancy specializing in cybersecurity, network engineering, and information security. We also lead public advocacy efforts promoting digital privacy and responsible cyber policy.

Built with [SvelteKit](https://kit.svelte.dev/) and deployed via [Netlify](https://www.netlify.com/).  
[Blog](https://github.com/netwk-pro/blog) and [documentation](https://github.com/netwk-pro/docs) subsites built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) and deployed via [GitHub Pages](https://pages.github.com/).

All infrastructure and data flows are designed with **maximum transparency, self-hosting, and user privacy** in mind.

</section>

### Table of Contents

- [Changelog](#changelog)
- [Repository Structure](#structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Service Worker Utilities](#sw-utilities)
- [CSP Report Handler](#cspreport)
- [Testing](#testing)
- [Recommended Toolchain](#toolchain)
- [Tooling Configuration](#toolconfig)
- [Available Scripts](#scripts)
- [License](#license)
- [Questions](#questions)

---

<section id="changelog">

## 📝 Changelog

For a history of changes to the Network Pro&trade; Web Presence, see the **[CHANGELOG](https://github.com/netwk-pro/netwk-pro.github.io/blob/master/CHANGELOG.md)**. All notable updates are documented there.

This project follows the principles of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), though formatting and versioning may occasionally vary.

</section>

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
  ├── netlify/
  │   ├── edge-functions/
  │   │   └── csp-report.js         # Receives CSP violation reports
  ├── scripts/                      # General-purpose utility scripts
  ├── src/
  │   ├── app.html                  # Entry HTML (CSP meta, bootstrapping)
  │   ├── hooks.client.ts           # Client-side error handling
  │   ├── hooks.server.js           # Injects CSP headers and permissions policy
  │   ├── lib/                      # Components, utilities, types, styles
  │   │   ├── components/           # Svelte components
  │   │   ├── data/                 # Custom data (e.g. JSON, metadata, constants)
  │   │   └── utils/                # Helper utilities
  │   ├── routes/                   # SvelteKit pages (+page.svelte, +server.js)
  │   └── service-worker.js         # Custom PWA service worker
  ├── static/                       # Public assets served at site root
  │   ├── disableSw.js              # Service worker bypass (via ?nosw param)
  │   ├── manifest.json             # PWA metadata
  │   ├── robots.txt                # SEO: allow/disallow crawlers
  │   └── sitemap.xml               # SEO: full site map
  ├── tests/
  │   ├── e2e/                      # Playwright end-to-end tests
  │   ├── internal/                 # Internal audit/test helpers
  │   │   └── auditCoverage.test.js # Warns about untested source modules
  │   └── unit/                     # Vitest unit tests
  ├── _redirects                    # Netlify redirect rules
  ├── CHANGELOG.md                  # Chronological record of notable project changes
  ├── netlify.toml                  # Netlify configuration
  ├── package.json                  # Project manifest (scripts, deps, etc.)
  └── ...
```

&nbsp;

### 🔐 `static/pgp/` Directory Structure

This directory contains public PGP key files and their corresponding QR codes.

```bash
static/
├── pgp/
│   ├── contact@s.neteng.pro.asc       # Public key for secure email
│   ├── pgp-contact.png                # QR code (PNG) for secure email key
│   ├── pgp-contact.webp               # Optimized WebP version of the QR code
│   ├── pgp-security.png               # QR code (PNG) for security contact key
│   ├── pgp-security.webp              # WebP version of the security QR code
│   ├── pgp-support.png                # QR code (PNG) for support key
│   ├── pgp-support.webp               # WebP version of the support QR code
│   ├── security@s.neteng.pro.asc      # Public key for security contact
│   ├── support@neteng.pro.asc         # Public key for general support
└── ...
```

- `.asc` files are **excluded from service worker precaching** but served directly via the `/pgp/[key]` route.
- QR code images are **served statically** by the `/pgp` route using `<picture>` elements.
- **WebP versions** are also used in the `/pgp` route, while the `/about` route imports **dynamic equivalents** from `src/lib/img/qr`.
- This route does **not use fallback rendering**; only explicitly defined files are available and expected to resolve.
- A dynamic `[key]/+server.js` handler under `src/routes/pgp/` serves the `.asc` files with appropriate `Content-Type` and download headers.

&nbsp;

### E2E Test Structure

End-to-end tests are located in `tests/e2e/` and organized by feature or route:

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

### 📦 Environment Setup

```bash
git clone https://github.com/netwk-pro/netwk-pro.github.io.git
cd netwk-pro.github.io
cp .env.template .env
npm install
```

Edit .env to configure your environment mode:

```env
ENV_MODE=dev  # Options: dev, test, ci, preview, prod
```

> `ENV_MODE` is used for tooling and workflows — not by SvelteKit itself.  
> Use `VITE_`-prefixed env variables for runtime values.

&nbsp;

### 🧰 Local Setup Scripts

To streamline onboarding and enforce project conventions, you may use the optional helper scripts:

| File/Script                        | Description                                                                       |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| `.env.template`                    | Template for local environment variables                                          |
| `scripts/checkNode.js`             | Validates your Node.js and npm versions                                           |
| `scripts/bootstrap.local.sh` (TBD) | Interactive setup for local configuration and tooling                             |
| `.vscode/`                         | Editor recommendations compatible with [VSCodium](https://vscodium.com) / VS Code |

To get started quickly:

```bash
cp .env.template .env
npm install
```

> You can also use `bootstrap.local.sh` to automate the steps above and more (optional).  
> `ENV_MODE` controls local tooling behavior — it is not used by the app runtime directly.

&nbsp;

### 💾 Version Enforcement

To ensure consistent environments across contributors and CI systems, this project enforces specific Node.js and npm versions via the `"engines"` field in `package.json`:

```json
"engines": {
  "node": ">=22.0.0 <25",
  "npm": ">=11.0.0 <12"
}
```

Version compliance is **softly enforced** after installation via a postinstall lifecycle hook:

```bash
npm run check:node
```

This script runs `scripts/checkNode.js`, which compares your current Node.js and npm versions against the required ranges. During the install phase, it will log **warnings** for out-of-range versions but allow installation to continue. In all other contexts (manual runs, CI workflows, etc.), it will **fail** with a descriptive error if the versions are out of spec.

**_Node Version Check (snippet from `scripts/checkNode.js`)_**

```javascript
const semver = require("semver");
const { engines } = require("../package.json");

const requiredNode = engines.node;
const requiredNpm = engines.npm;
const isPostInstall = process.env.npm_lifecycle_event === "postinstall";

let hasError = false;

if (!semver.satisfies(process.version, requiredNode)) {
  const msg = `Node.js ${process.version} does not satisfy required range: ${requiredNode}`;
  isPostInstall ? console.warn(`⚠️  ${msg}`) : console.error(`❌ ${msg}`);
  if (!isPostInstall) hasError = true;
}

const npmVersion = require("child_process")
  .execSync("npm -v")
  .toString()
  .trim();

if (!semver.satisfies(npmVersion, requiredNpm)) {
  const msg = `npm ${npmVersion} does not satisfy required range: ${requiredNpm}`;
  isPostInstall ? console.warn(`⚠️  ${msg}`) : console.error(`❌ ${msg}`);
  if (!isPostInstall) hasError = true;
}

if (!hasError) {
  console.log("✅ Node and npm versions are valid.");
} else {
  process.exit(1);
}
```

For full compatibility, `.nvmrc` and `.node-version` files are provided to work seamlessly with version managers like nvm, asdf, and Volta. This ensures consistent environments across local development, CI pipelines, and deployment targets.

To manually verify your environment:

```bash
node -v     # Should fall within engines.node
npm -v      # Should fall within engines.npm
```

</section>

<sub>[Back to top](#top)</sub>

---

<section id="configuration">

## 🛡️ Configuration

This project includes custom runtime configuration files for enhancing security, error handling, and PWA functionality. These modules are used by the framework during server- and client-side lifecycle hooks.

### 🔐 `hooks.server.js`

Located at `src/hooks.server.js`, this file is responsible for injecting dynamic security headers. It includes:

- Content Security Policy (CSP) with support for relaxed directives (inline scripts allowed)
- Permissions Policy to explicitly disable unnecessary browser APIs
- X-Content-Type-Options, X-Frame-Options, and Referrer-Policy headers

> 💡 The CSP nonce feature has been disabled. Inline scripts are now allowed through the policy using the `"script-src 'self' 'unsafe-inline'"` directive. If you wish to use nonces in the future, you can re-enable them by uncommenting the relevant sections in `hooks.server.js` and modifying your inline `<script>` tags.

To re-enable nonce generation for inline scripts in the future:

1. Uncomment the nonce generation and injection logic in `hooks.server.js`.
2. Add `nonce="__cspNonce__"` to inline `<script>` blocks in `app.html` or route templates.

> 💡 The `[headers]` block in `netlify.toml` has been deprecated — all headers are now set dynamically from within SvelteKit.

&nbsp;

### 🧭 `hooks.client.ts`

Located at `src/hooks.client.ts`, this file is currently limited to handling uncaught client-side errors via the `handleError()` lifecycle hook.

Client-side PWA logic (such as handling the `beforeinstallprompt` event, checking browser compatibility, and registering the service worker) has been moved to `src/lib/registerServiceWorker.js` for better modularity and testability.

> 💡 This separation ensures that error handling is isolated from PWA lifecycle logic, making both concerns easier to maintain.

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
if (location.search.includes("nosw")) {
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
import { registerServiceWorker } from "$lib/registerServiceWorker.js";

registerServiceWorker();
```

You can optionally import unregisterServiceWorker() in a debug menu or settings panel to let users opt out of offline behavior.

</section>

<sub>[Back to top](#top)</sub>

---

<section id="cspreport">

## 📣 CSP Report Handler

To receive and inspect CSP violation reports in development or production, the repo includes a Netlify-compatible [Edge Function](https://docs.netlify.com/edge-functions/overview/) at:

```bash
netlify/edge-functions/csp-report.js
```

This Edge Function receives Content Security Policy (CSP) violation reports at `/api/csp-report` and logs relevant details to the console. High-risk violations (e.g., `script-src`, `form-action`) also trigger real-time alerts via `ntfy`. You can further integrate with logging tools, SIEM platforms, or notification systems as needed.

Make sure to include the `report-uri` directive in your CSP header:

```bash
Content-Security-Policy: ...; report-uri /api/csp-report;
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

<section id="toolchain">

## 🛠 Recommended Toolchain

To streamline development and align with project conventions, we recommend the following setup — especially for contributors without a strong existing preference.

| Tool                                                                     | Description                                               |
| ------------------------------------------------------------------------ | --------------------------------------------------------- |
| **[VSCodium](https://vscodium.com/)**                                    | Fully open-source alternative to VS Code (telemetry-free) |
| **[Prettier](https://prettier.io/)**                                     | Code formatter for JS, TS, Svelte, Markdown, etc.         |
| **[ESLint](https://eslint.org/)**                                        | JavaScript/TypeScript linter with Svelte support          |
| **[Stylelint](https://stylelint.io/)**                                   | Linting for CSS, SCSS, and inline styles in Svelte        |
| **[markdownlint](https://github.com/DavidAnson/markdownlint)**           | Markdown style checker and linter                         |
| **[markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)** | Config-based CLI linter for Markdown                      |
| **[EditorConfig](https://editorconfig.org/)**                            | Consistent line endings, spacing, and indentation         |
| **[Volta](https://volta.sh) / [nvm](https://github.com/nvm-sh/nvm)**     | Node.js version manager for consistent tooling            |

> The `.vscode/` folder includes editor recommendations compatible with **VSCodium**. These are non-enforced and optional, but align with our formatter, linter, and language server configs.

Install dev tooling:

```bash
npm install --include=dev
```

Run all format and lint checks:

```bash
npm run lint:all
npm run format
```

To auto-fix issues:

```bash
npm run lint:fix
npm run format:fix
```

</section>

<sub>[Back to top](#top)</sub>

---

<section id="toolconfig">

## ⚙️ Tooling Configuration

All linting, formatting, and version settings are defined in versioned project config files:

| File                      | Purpose                                                    |
| ------------------------- | ---------------------------------------------------------- |
| `.prettierrc`             | Prettier formatting rules                                  |
| `.prettierignore`         | Files that should be ignored by Prettier                   |
| `eslint.config.mjs`       | ESLint config with SvelteKit support                       |
| `stylelint.config.js`     | CSS/SASS/Svelte style rules                                |
| `.stylelintignore`        | Files that should be ignored by Stylelint                  |
| `.editorconfig`           | Base indentation and line ending settings                  |
| `.nvmrc`, `.node-version` | Node.js version constraints for `nvm`, `asdf`, and `Volta` |
| `.vscode/extensions.json` | Suggested extensions for VSCodium                          |
| `.vscode/settings.json`   | Default workspace settings (non-binding)                   |
| `.vscode/customData.json` | Custom CSS data for FontAwesome classes                    |
| `cspell.json`             | Custom words and exclusions for spell checking             |

These are the same rules used by CI and automation, so aligning your local setup avoids surprises later.

> Note: `.vscode/extensions.json` defines a minimal recommended dev stack for VSCodium / VS Code. These extensions are **optional but thoughtfully curated** to improve developer experience without introducing bloat.

</section>

<sub>[Back to top](#top)</sub>

---

<section id="scripts">

## 📜 Available Scripts

The following CLI commands are available via `npm run <script>` or `pnpm run <script>`.

### 🔄 Development

| Script          | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `dev`           | Start development server with Vite                                       |
| `preview`       | Preview production build locally                                         |
| `build`         | Build the project with Vite                                              |
| `dev:netlify`   | Start local dev server using Netlify Dev (emulates serverless + headers) |
| `build:netlify` | Build using Netlify CLI                                                  |
| `css:bundle`    | Bundle and minify CSS                                                    |

&nbsp;

### ✅ Pre-check / Sync

| Script        | Description                                                                         |
| ------------- | ----------------------------------------------------------------------------------- |
| `prepare`     | Run SvelteKit sync                                                                  |
| `check`       | Run SvelteKit sync and type check with `svelte-check`                               |
| `check:watch` | Watch mode for type checks                                                          |
| `check:node`  | Validate Node & npm versions match package.json `engines`                           |
| `checkout`    | Full local validation: check versions, test (incl. audit coverage), lint, typecheck |
| `verify`      | Alias for `checkout`                                                                |

&nbsp;

### 🧹 Cleanup & Maintenance

| Script    | Description                                     |
| --------- | ----------------------------------------------- |
| `delete`  | Remove build artifacts and `node_modules`       |
| `clean`   | Fully reset environment and reinstall           |
| `upgrade` | Update all dependencies via `npm-check-updates` |

&nbsp;

<!-- markdownlint-disable MD024 -->

### 🧪 Testing

<!-- markdownlint-enable MD024 -->

| Script          | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `test`          | Alias for `test:all`                                          |
| `test:all`      | Run both client and server test suites (incl. audit coverage) |
| `test:client`   | Run client tests with Vitest                                  |
| `test:server`   | Run server-side tests with Vitest                             |
| `test:watch`    | Watch mode for client tests                                   |
| `test:coverage` | Collect coverage from both client and server                  |
| `test:e2e`      | Runs E2E tests with up to 1 automatic retry on failure        |

&nbsp;

### 🧼 Linting & Formatting

| Script       | Description                             |
| ------------ | --------------------------------------- |
| `lint`       | Run ESLint on JS, MJS, and Svelte files |
| `lint:fix`   | Auto-fix ESLint issues                  |
| `lint:jsdoc` | Check JSDoc annotations                 |
| `lint:css`   | Run Stylelint on CSS and Svelte styles  |
| `lint:md`    | Lint Markdown content                   |
| `lint:all`   | Run all linters and formatting checks   |
| `format`     | Run Prettier formatting check           |
| `format:fix` | Auto-format code using Prettier         |

&nbsp;

### 💡 Lighthouse / Performance

| Script     | Description               |
| ---------- | ------------------------- |
| `lhci`     | Alias for Lighthouse CI   |
| `lhci:run` | Run Lighthouse CI autorun |

&nbsp;

### 📋 Audits / Validation

| Script           | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `audit:coverage` | Warn about untested modules in `src/` and `scripts/` |
| `head:flatten`   | Flatten headers for Netlify                          |
| `head:validate`  | Validate headers file against project config         |

&nbsp;

### 🔄 Lifecycle Hooks

| Script        | Description                         |
| ------------- | ----------------------------------- |
| `postinstall` | Ensures version check after install |

</section>

<sub>[Back to top](#top)</sub>

---

<section id="license">

## 🧾 License

This project is licensed under:

- [Creative Commons BY 4.0](https://netwk.pro/license#cc-by)

- Or optionally, [GNU GPL v3 or later](https://netwk.pro/license#gnu-gpl)

Source code, branding, and visual assets are subject to reuse and distribution terms specified on our [Legal, Copyright, and Licensing page](https://netwk.pro/license).

</section>

<sub>[Back to top](#top)</sub>

---

<section id="questions">

## 🙋‍♂️Questions?

Reach out via our [Contact Form](https://netwk.pro/contact), open an issue on this repo, or email us directly at `support (at) neteng.pro`.

</section>

<sub>[Back to top](#top)</sub>

&nbsp;

_Designed for professionals. Hardened for privacy. Built with intent._  
— **Network Pro Strategies**

---

<span style="font-size: 12px; text-align: center;">

Copyright &copy; 2025  
**[Network Pro Strategies](https://netwk.pro) (Network Pro&trade;)**

Network Pro&trade;, the shield logo, and the "Locking Down Networks&trade;" slogan are [trademarks](https://netwk.pro/license#trademark) of Network Pro Strategies.

Licensed under **[CC BY 4.0](https://netwk.pro/license#cc-by)** and the **[GNU GPL](https://netwk.pro/license#gnu-gpl)**, as published by the [Free Software Foundation](https://www.fsf.org), either version 3 of the License, or (at your option) any later version.

</span>

<!-- cspell:ignore cspreport toolconfig -->
