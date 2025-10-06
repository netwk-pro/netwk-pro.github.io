<!-- =====================================================================
src/lib/types/README.md

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
====================================================================== -->

# Typing Policy

This directory contains JSDoc-based type definitions for reusable modules
within the Network Pro codebase. The goal is to provide meaningful IntelliSense,
editor documentation, and lightweight type safety without requiring TypeScript
conversion.

## Scope and Philosophy

- **Structured Data Only** – Typing is focused on objects that benefit from
  explicit schemas (e.g., configuration, constants, utilities).
- **Svelte Components** – Components are intentionally _not_ fully typed at this
  stage. Component auto-completion is already handled by the Svelte language
  server, and explicit typedefs would add unnecessary complexity.
- **Scalability** – Typing is modular. New typedefs can be added under
  `/src/lib/types/` as the codebase grows.
- **Documentation-Driven** – JSDoc comments serve both as type definitions and
  developer documentation. This minimizes friction while improving clarity.

## Example

```js
/** @typedef {import('./types/appConstants.js').AppConstants} AppConstants */
/** @type {AppConstants} */
export const CONSTANTS = { ... };
```

This approach balances clarity and maintainability without introducing a
TypeScript build requirement.

---

<span style="font-size: 12px; text-align: center;">

Copyright &copy; 2025  
**[Network Pro Strategies](https://netwk.pro) (Network Pro&trade;)**

Network Pro&trade;, the shield logo, and the "Locking Down Networks...&trade;" slogan are [trademarks](https://netwk.pro/license#trademark) of Network Pro Strategies.

Licensed under **[CC BY 4.0](https://netwk.pro/license#cc-by)** and the **[GNU GPL](https://netwk.pro/license#gnu-gpl)**, as published by the [Free Software Foundation](https://www.fsf.org), either version 3 of the License, or (at your option) any later version.

</span>
