<!-- =====================================================================
VERSIONING.md

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
====================================================================== -->

# Versioning Policy

This project uses a **SemVer-inspired versioning scheme** based on the
`MAJOR.MINOR.PATCH` format.

Version numbers are intended to communicate the **impact of a change** rather
than strict compliance with the Semantic Versioning specification. In addition
to user-facing changes, version increments may reflect infrastructure, hosting,
or operational changes relevant to maintainers.

## Version Number Meaning

### MAJOR (`X.0.0`)

Incremented when changes introduce **user-visible incompatibilities**, such as:

- URL or navigation structure changes
- Removal or renaming of major sections
- Changes that break existing links or bookmarks
- Changes to access, availability, or licensing

### MINOR (`1.X.0`)

Incremented for **backward-compatible but significant changes**, including:

- Hosting platform migrations (e.g. Netlify → Vercel)
- Build or deployment pipeline changes
- Security header or CSP delivery changes
- Changes that may affect maintainers or operators, but not readers
- New features or content additions that do not break existing usage

### PATCH (`1.1.X`)

Incremented for **backward-compatible, low-impact changes**, such as:

- Content edits or corrections
- Dependency updates
- Tooling updates that do not alter build behavior
- Internal refactoring or cleanup

## Notes

- Infrastructure or platform changes may be considered “breaking” from a
  maintainer perspective, but do not automatically imply a MAJOR version bump.
- Version numbers are intended to communicate **impact**, not just change.
- Detailed migration or operational notes are documented in the changelog when
  relevant.
