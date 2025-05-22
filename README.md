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
├── src/
│   ├── lib/             # Reusable components, styles, utilities
│   ├── routes/          # SvelteKit routes (+page.svelte, +page.server.js)
│   ├── hooks.client.ts  # Client-only lifecycle hooks (e.g., SW control)
│   └── app.html         # SvelteKit entry HTML with CSP/meta/bootstrap
├── tests/               # Vitest test suites
├── public/              # Static assets served at root
├── netlify.toml         # Netlify configuration
├── .github/             # CI workflows and automation
└── ...
```

&nbsp;

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

> ENV*MODE is used for tooling and workflows — not by SvelteKit itself.  
> Use VITE*-prefixed env variables for runtime values.

&nbsp;

### 📐 Node.js Version Management

This repo uses .nvmrc and .node-version for version consistency with tools like:

- nvm
- asdf
- Volta
- GitHub Actions

```bash
node -v     # Should match "engines" in package.json
npm -v
```

&nbsp;

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

## 🙋‍♂️ Questions?

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
