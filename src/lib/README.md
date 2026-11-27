<!-- =====================================================================
src/lib/README.md

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
====================================================================== -->

# `/src/lib` Overview

This directory contains all reusable **modules**, **assets**, and **constants** used across the app.
It acts as the project’s _internal library_.

---

## 📦 Importing from `#lib`

SvelteKit 3 no longer generates the `$lib` alias. This project declares a
`#lib` [package subpath import](https://nodejs.org/api/packages.html#subpath-imports)
in `package.json`, which Vite, Vitest, TypeScript, and Node resolve natively:

```json
"imports": {
  "#lib": "./src/lib/index.js",
  "#lib/*": "./src/lib/*"
}
```

Import the main export hub with `#lib`, or a specific module with its
**explicit file extension**:

```js
import { something } from '#lib';
import { detectEnvironment } from '#lib/utils/env.js';
import { Footer } from '#lib/components/layout/index.js';
```

> 💡 You don’t need relative paths like `../../../lib/...`. Subpath imports
> do not add extensions or resolve directories, so always include `.js`,
> `.svelte`, or `/index.js`.
>
> Vite's `import.meta.glob()` cannot use `#lib`; use a path relative to the
> importing file instead (see `images.js`).

---

## 📁 Directory Structure

```bash
src/lib/
├── components/ # Svelte UI components
├── img/ # Static image assets
├── images.js # Imports and re-exports images from /img/
├── index.js # Main export hub (images, constants, etc.)
└── README.md # You are here
```

---

## 🖼️ Image Imports

All image assets are re-exported via `images.js` and then made available in `src/lib/index.js`.

This allows images to be imported directly from `#lib`:

```js
import { logoPng, faviconSvg } from '#lib';
```

**Example (Svelte component):**

```svelte
<script>
  import { logoPng } from '#lib';
</script>

<img src={logoPng} alt="Network Pro Logo" />
```

If you prefer, you can still import by full path:

```js
import logoPng from '#lib/img/logo-web.png';
```

Both are valid — the re-exports simply make imports cleaner and centralized.

---

## ⚙️ Constants and Utilities

`index.js` defines and exports a `CONSTANTS` object for consistent app-wide values.
These are grouped into logical categories for easy reference.

```js
import { CONSTANTS } from '#lib';

console.log(CONSTANTS.COMPANY_INFO.APP_NAME); // "Network Pro"
```

### 🏢 COMPANY_INFO

| Key        | Description                  | Example                  |
| ---------- | ---------------------------- | ------------------------ |
| `NAME`     | Full company name            | `Network Pro Strategies` |
| `APP_NAME` | Application or branding name | `Network Pro™`           |
| `YEAR`     | Copyright / app year         | `2025, 2026`             |

### 📬 CONTACT

| Key            | Description                    | Example                     |
| -------------- | ------------------------------ | --------------------------- |
| `EMAIL`        | General support email          | `support (at) netwk.pro`    |
| `EMAIL_LINK`   | General support email (link)   | `support@netwk.pro`         |
| `SECURE`       | Secure contact address         | `contact (at) s.neteng.pro` |
| `SECURE_LINK`  | Secure contact address (link)  | `contact@s.neteng.pro`      |
| `PRIVACY`      | Privacy-related contact        | `privacy (at) netwk.pro`    |
| `PRIVACY_LINK` | Privacy-related contact (link) | `privacy@netwk.pro`         |
| `PHONE`        | Company phone number           | `(602) 428-5300`            |

### 🗂️ PAGE

| Key     | Description           | Example               |
| ------- | --------------------- | --------------------- |
| `BLANK` | Opens a new tab       | `_blank`              |
| `REL`   | Default rel attribute | `noopener noreferrer` |
| `SELF`  | Opens in same tab     | `_self`               |

> ⚠️ Do not put `target={PAGE.SELF}` on internal links. SvelteKit treats any
> link with a `target` attribute as external, which forces a full page reload
> and bypasses client-side routing. Omit `target` for internal routes.

### 🧭 NAV

| Key       | Description             | Example       |
| --------- | ----------------------- | ------------- |
| `BACKTOP` | Label for “back to top” | `Back to top` |
| `HREFTOP` | Anchor link to top      | `#top`        |

### 🌐 LINKS

| Key    | Description      | Example                  |
| ------ | ---------------- | ------------------------ |
| `HOME` | Company home URL | `https://netwk.pro`      |
| `BLOG` | Company blog URL | `https://blog.netwk.pro` |

🧠 Tip: If you add new global constants (e.g., API endpoints, metadata, etc.),
extend `CONSTANTS` here and update this table for quick reference.

---

## 🧩 Components (if applicable)

Reusable components can also be exported from this directory:

```js
import { Logo } from '#lib';
```

If you add more UI components later, re-export them from `index.js` for easy access.

---

## 🧠 Developer Notes

`#lib` is a package subpath import declared in `package.json`, not a relative
path. It points directly to `src/lib/`.

`export * from './images.js';` re-exports all image imports so you can reference them easily.

Keep asset imports centralized in `images.js` to simplify maintenance.

No need to modify imports when adding new images — just add them to `images.js`.

---

<span style="font-size: 12px; text-align: center;">

Copyright &copy; 2025, 2026  
**[Network Pro Strategies](https://netwk.pro) (Network Pro&trade;)**

Network Pro&trade;, the shield logo, and the "Locking Down Networks...&trade;" slogan are [trademarks](https://netwk.pro/legal#trademark) of Network Pro Strategies.

Licensed under **[CC BY 4.0](https://netwk.pro/legal#cc-by)** and the **[GNU GPL](https://netwk.pro/legal#gnu-gpl)**, as published by the [Free Software Foundation](https://www.fsf.org), either version 3 of the License, or (at your option) any later version.

</span>
