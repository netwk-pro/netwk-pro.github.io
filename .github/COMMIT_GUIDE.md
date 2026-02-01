<!-- =====================================================================
.github/COMMIT_GUIDE.md

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
====================================================================== -->

# Commit Message Guide

To maintain clarity and consistency, use one of the following commit types when writing messages. Keep them short and focused — the `CHANGELOG.md` remains the source of truth for full details.

## Commit Types

| Type        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `feat:`     | A new feature or enhancement                                 |
| `fix:`      | A bug fix                                                    |
| `chore:`    | Tooling, build scripts, release prep, or other meta changes  |
| `docs:`     | Documentation-only changes                                   |
| `style:`    | Formatting or stylistic changes that don't affect behavior   |
| `refactor:` | Code changes that restructure without changing functionality |
| `test:`     | Adding or updating tests                                     |

## Examples

- `feat: add cryptomator entry to FOSS spotlight`
- `fix: correct author metadata in app.html`
- `chore: prepare v1.13.8 release`
- `docs: update changelog for v1.13.8`
- `style: clean up indentation in layout.svelte`
- `refactor: split utility functions from helpers.js`
- `test: add unit tests for buildPath util`

---

Stick to one type per commit when possible. For mixed changes, pick the most meaningful one.

Consistency helps, but don’t overthink it — use what makes sense.
