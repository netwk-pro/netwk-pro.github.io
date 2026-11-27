<!-- =====================================================================
.github/ACTIONS.md

Copyright © 2025-2026 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
====================================================================== -->

# GitHub Actions Dependencies

An inventory of every action, reusable workflow, tool, and external service
referenced by the workflows in `.github/workflows/` and
`.github/workflows/templates/`.

Last generated: 2026-11-26

## Marketplace Actions

| Action                                | Used in                                                                                                                                                                                                                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `actions/checkout@v7`                 | `backup-branch.yml`, `build-and-publish.yml`, `check-security-txt-expiry.yml`, `dependency-review.yml`, `deploy-audit-netlify.yml`, `lighthouse.yml`, `meta-check.yml`, `playwright.yml`, `publish-test.yml`, `secret-scan.yml`, `validate-lockfile.yml`, `templates/publish.template.yml` |
| `actions/setup-node@v7`               | `build-and-publish.yml`, `deploy-audit-netlify.yml`, `lighthouse.yml`, `meta-check.yml`, `playwright.yml`, `publish-test.yml`, `validate-lockfile.yml`, `templates/publish.template.yml`                                                                                                   |
| `actions/upload-artifact@v7`          | `build-and-publish.yml`, `lighthouse.yml`, `playwright.yml`, `probely-scan.yml`, `publish-test.yml`, `secret-scan.yml`, `templates/publish.template.yml`                                                                                                                                   |
| `actions/download-artifact@v8`        | `build-and-publish.yml`, `publish-test.yml`, `templates/publish.template.yml`                                                                                                                                                                                                              |
| `actions/dependency-review-action@v5` | `dependency-review.yml`                                                                                                                                                                                                                                                                    |
| `actions/github-script@v9`            | `secret-scan.yml`                                                                                                                                                                                                                                                                          |
| `gitleaks/gitleaks-action@v3`         | `secret-scan.yml`                                                                                                                                                                                                                                                                          |
| `pozil/auto-assign-issue@v4`          | `auto-assign.yml`                                                                                                                                                                                                                                                                          |

## Local Reusable Workflows

| Workflow                               | Called from                                                                   |
| -------------------------------------- | ----------------------------------------------------------------------------- |
| `./.github/workflows/check-codeql.yml` | `build-and-publish.yml`, `publish-test.yml`, `templates/publish.template.yml` |

## Tools Installed or Invoked in `run:` Steps

| Tool                   | How it is obtained                                          | Used in                                                                                                                                                                                  |
| ---------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm `12.2.3`           | `npm install -g npm@12.2.3`                                 | `build-and-publish.yml`, `deploy-audit-netlify.yml`, `lighthouse.yml`, `meta-check.yml`, `playwright.yml`, `publish-test.yml`, `validate-lockfile.yml`, `templates/publish.template.yml` |
| `@lhci/cli`            | `npx` (no version pinned in the workflow)                   | `lighthouse.yml`                                                                                                                                                                         |
| Playwright             | `npx playwright install --with-deps`, `npx playwright test` | `playwright.yml`                                                                                                                                                                         |
| Vitest                 | `npx vitest run`                                            | `meta-check.yml`                                                                                                                                                                         |
| Google Chrome (stable) | `wget` from `dl.google.com`, then `apt install`             | `lighthouse.yml`                                                                                                                                                                         |
| GitHub CLI (`gh`)      | Preinstalled on the runner                                  | `check-codeql.yml`, `lighthouse.yml`, `templates/check-codeql.template.yml`                                                                                                              |
| `jq`                   | `sudo apt-get install -y jq`                                | `build-and-publish.yml`, `publish-test.yml`, `secret-scan.yml`, `templates/publish.template.yml`                                                                                         |
| `curl`                 | Preinstalled on the runner                                  | `probely-scan.yml`, `secret-scan.yml`                                                                                                                                                    |
| `git`                  | Preinstalled on the runner                                  | `backup-branch.yml`                                                                                                                                                                      |

## Node.js Versions

Set through the `node-version` input of `actions/setup-node`.

| Version | Used in                                                                                                                                                                                  |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 26      | `build-and-publish.yml`, `deploy-audit-netlify.yml`, `lighthouse.yml`, `meta-check.yml`, `playwright.yml`, `publish-test.yml`, `validate-lockfile.yml`, `templates/publish.template.yml` |

## External Services Called from `run:` Steps

| Endpoint                  | Used in            |
| ------------------------- | ------------------ |
| `https://api.probely.com` | `probely-scan.yml` |
| `https://ntfy.neteng.pro` | `secret-scan.yml`  |
| `https://dl.google.com`   | `lighthouse.yml`   |

## Package Registries

Set through the `registry-url` input of `actions/setup-node` for publishing.

| Registry                      | Used in                                                                       |
| ----------------------------- | ----------------------------------------------------------------------------- |
| `https://registry.npmjs.org/` | `build-and-publish.yml`, `publish-test.yml`, `templates/publish.template.yml` |
| `https://npm.pkg.github.com/` | `build-and-publish.yml`, `publish-test.yml`, `templates/publish.template.yml` |

## GitHub Platform Services

| Service                                                               | Used in                                                   |
| --------------------------------------------------------------------- | --------------------------------------------------------- |
| Code scanning (`CodeQL` workflow results, queried with `gh run list`) | `check-codeql.yml`, `templates/check-codeql.template.yml` |
| Dependency graph (dependency review)                                  | `dependency-review.yml`                                   |

## Repository Secrets

`GITHUB_TOKEN` is provided automatically. The following must be configured in
the repository settings.

| Secret                                 | Purpose                            | Used in            |
| -------------------------------------- | ---------------------------------- | ------------------ |
| `PROBELY_API_KEY`, `PROBELY_TARGET_ID` | Probely scan API access and target | `probely-scan.yml` |
| `GITLEAKS_LICENSE`                     | Gitleaks action license key        | `secret-scan.yml`  |
| `NTFY_TOPIC`                           | ntfy topic for secret-scan alerts  | `secret-scan.yml`  |

## Runner Images

| Image          | Used in  |
| -------------- | -------- |
| `ubuntu-24.04` | All jobs |
