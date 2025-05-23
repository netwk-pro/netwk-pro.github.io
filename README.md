<!-- =====================================================================
README.md

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
====================================================================== -->

# 🌐 Network Pro — Web Presence

> **Locking Down Networks, Unlocking Confidence™**  
> _Security, Networking, Privacy — Network Pro™_

&nbsp;

[![Netlify Status](https://api.netlify.com/api/v1/badges/93910633-3fdb-4bb3-a9bf-5d91ccfeebf9/deploy-status)](https://app.netlify.com/projects/networkpro-web/deploys) [![NPM Version](https://img.shields.io/npm/v/%40networkpro%2Fweb?registry_uri=https%3A%2F%2Fregistry.npmjs.com&style=flat&logo=npm&logoSize=auto&color=%23CB3837)](https://www.npmjs.com/package/@networkpro/web) [![Build and Publish to Registries](https://github.com/netwk-pro/netwk-pro.github.io/actions/workflows/build-and-publish.yml/badge.svg)](https://github.com/netwk-pro/netwk-pro.github.io/actions/workflows/build-and-publish.yml)  
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier) [![stylelint](https://img.shields.io/badge/stylelint-%23747474?style=flat&logo=stylelint&logoSize=auto&labelColor=%23263238)](https://stylelint.io/)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://github.com/netwk-pro/netwk-pro.github.io/blob/master/CODE_OF_CONDUCT.md)

## 🚀 Project Overview

This is the official web presence for **[Network Pro Strategies](https://netwk.pro/about)**, a privacy-forward consultancy specializing in network engineering, information security, and public advocacy focused on cybersecurity and digital privacy.

Built with [SvelteKit](https://kit.svelte.dev/) and deployed via [Netlify](https://www.netlify.com/).  
Blog and documentation subsites built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) and deployed via [GitHub Pages](https://pages.github.com/).

All infrastructure and data flows are designed with **maximum transparency, self-hosting, and user privacy** in mind.

### 📁 Repository Structure

```bash
.
├── .github/workflows     # CI workflows and automation
├── .vscode/              # Recommended VS Code settings, extensions
├── scripts/              # Utility scripts
├── src/
│   ├── lib/              # Reusable components, styles, utilities
│   ├── routes/           # SvelteKit routes (+page.svelte, +page.server.js)
│   ├── hooks.client.ts   # Client-only lifecycle hooks (e.g., SW control)
│   ├── app.html          # SvelteKit entry HTML with CSP/meta/bootentry
│   └── service-worker.js # Custom Service Worker
├── static/               # Static assets served at root
├── tests/
│   ├── e2e/              # End-to-end Playwright tests
│   └── unit/             # Vite unit tests
├── netlify.toml          # Netlify configuration
└── ...
```

---

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

#### **Version Enforcement**

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

**_Node Version Check (snippet from scripts/checkNode.js)_**

```js
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

For full compatibility, .nvmrc and .node-version files are provided to work seamlessly with version managers like nvm, asdf, and Volta. This ensures consistent environments across local development, CI pipelines, and deployment targets.

To manually verify your environment:

```bash
node -v     # Should fall within engines.node
npm -v      # Should fall within engines.npm
```

---

### 🛠 Recommended Toolchain

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
| **Volta / nvm**                                                          | Node.js version manager for consistent tooling            |

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

---

### ⚙️ Tooling Configuration

All linting, formatting, and version settings are defined in versioned project config files:

| File                      | Purpose                                                    |
| ------------------------- | ---------------------------------------------------------- |
| `.prettierrc`             | Prettier formatting rules                                  |
| `eslint.config.mjs`       | ESLint config with SvelteKit support                       |
| `stylelint.config.js`       | CSS/SASS/Svelte style rules                                |
| `.editorconfig`           | Base indentation and line ending settings                  |
| `.nvmrc`, `.node-version` | Node.js version constraints for `nvm`, `asdf`, and `Volta` |
| `.vscode/extensions.json` | Suggested extensions for VSCodium                          |
| `.vscode/settings.json`   | Default workspace settings (non-binding)                   |

These are the same rules used by CI and automation, so aligning your local setup avoids surprises later.

---

## 📜 Available Scripts

The following CLI commands are available via `npm run <script>` or `pnpm run <script>`.

### 🔄 Development

| Script          | Description                        |
| --------------- | ---------------------------------- |
| `dev`           | Start development server with Vite |
| `preview`       | Preview production build locally   |
| `build`         | Build the project with Vite        |
| `build:netlify` | Build using Netlify CLI            |
| `css:bundle`    | Bundle and minify CSS              |

---

### ✅ Pre-check / Sync

| Script        | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `prepare`     | Run SvelteKit sync                                           |
| `check`       | Run SvelteKit sync and type check with `svelte-check`        |
| `check:watch` | Watch mode for type checks                                   |
| `check:node`  | Validate Node & NPM versions match package.json `engines`    |
| `checkout`    | Full local validation: check versions, test, lint, typecheck |
| `verify`      | Alias for `checkout`                                         |

---

### 🧹 Cleanup & Maintenance

| Script    | Description                                     |
| --------- | ----------------------------------------------- |
| `delete`  | Remove build artifacts and `node_modules`       |
| `clean`   | Fully reset environment and reinstall           |
| `upgrade` | Update all dependencies via `npm-check-updates` |

---

### 🧪 Testing

| Script          | Description                                  |
| --------------- | -------------------------------------------- |
| `test`          | Alias for `test:all`                         |
| `test:all`      | Run both client and server test suites       |
| `test:client`   | Run client tests with Vitest                 |
| `test:server`   | Run server-side tests with Vitest            |
| `test:watch`    | Watch mode for client tests                  |
| `test:coverage` | Collect coverage from both client and server |

---

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

---

### 💡 Lighthouse / Performance

| Script             | Description                                     |
| ------------------ | ----------------------------------------------- |
| `lhci`             | Alias for Lighthouse CI                         |
| `lighthouse`       | Run local Lighthouse test and launch viewer     |
| `lighthouse:local` | Build site, preview, and run Lighthouse locally |
| `lhci:run`         | Run Lighthouse CI autorun                       |

---

### 📋 Audits / Validation

| Script          | Description                                  |
| --------------- | -------------------------------------------- |
| `audit:scripts` | Check for untested utility scripts           |
| `head:flatten`  | Flatten headers for Netlify                  |
| `head:validate` | Validate headers file against project config |

---

### 🔄 Lifecycle Hooks

| Script        | Description                         |
| ------------- | ----------------------------------- |
| `postinstall` | Ensures version check after install |

&nbsp;

---

## 🧾 License

This project is licensed under:

- [Creative Commons BY 4.0](https://netwk.pro/license#cc-by)

- Or optionally, [GNU GPL v3 or later](https://netwk.pro/license#gnu-gpl)

Source code, branding, and visual assets are subject to reuse and distribution terms specified on our [Legal, Copyright, and Licensing page](https://netwk.pro/license).

&nbsp;

## 🙋‍♂️Questions?

Reach out via [netwk.pro/contact](https://netwk.pro/contact), open an issue on this repo, or email us directly at `contact (at) s.neteng.pro`.

&nbsp;

_Designed for professionals. Hardened for privacy. Built with intent._  
— **Network Pro Strategies**

---

<div style="font-size: 12px; text-align: center;">

Copyright &copy; 2025  
**[Network Pro Strategies](https://netwk.pro) (Network Pro&trade;)**

Network Pro&trade;, the shield logo, and the "Locking Down Networks&trade;" slogan are [trademarks](https://netwk.pro/license#trademark) of Network Pro Strategies.

Licensed under **[CC BY 4.0](https://netwk.pro/license#cc-by)** and the **[GNU GPL](https://netwk.pro/license#gnu-gpl)**, as published by the [Free Software Foundation](https://www.fsf.org), either version 3 of the License, or (at your option) any later version.

</div>
