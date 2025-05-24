# 🧩 Recommended VS Code Extensions

To streamline development and align with project conventions, we recommend the following [VSCodium](https://vscodium.com/) and [Visual Studio Code](https://code.visualstudio.com/) (VS Code) extensions. These tools enhance productivity, enforce code quality, and ensure consistency across the codebase.

> Note: While these extensions are optional, they are thoughtfully curated to complement our development workflow.

<!-- cspell:disable -->

| Extension Name            | Identifier                              | Description                                                                 |
| ------------------------- | --------------------------------------- | --------------------------------------------------------------------------- |
| Prettier - Code formatter | `esbenp.prettier-vscode`                | Formats code consistently across various languages.                         |
| ESLint                    | `dbaeumer.vscode-eslint`                | Integrates ESLint into VS Code for JavaScript and TypeScript linting.       |
| Stylelint                 | `stylelint.vscode-stylelint`            | Lints CSS/SCSS and enforces consistent styling conventions.                 |
| Markdownlint              | `DavidAnson.vscode-markdownlint`        | Provides linting and style checking for Markdown files.                     |
| EditorConfig for VS Code  | `EditorConfig.EditorConfig`             | Maintains consistent coding styles between different editors and IDEs.      |
| Svelte for VS Code        | `svelte.svelte-vscode`                  | Offers syntax highlighting, code completion, and error checking for Svelte. |
| Code Spell Checker        | `streetsidesoftware.code-spell-checker` | Inline spell checking (comments, Markdown, etc.)                            |

## 🛠 Installation

To install these extensions, you can use the following command in your terminal:

```bash
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension stylelint.vscode-stylelint
code --install-extension DavidAnson.vscode-markdownlint
code --install-extension EditorConfig.EditorConfig
code --install-extension svelte.svelte-vscode
code --install-extension volta.volta
code --install-extension eamodio.gitlens
code --install-extension github.vscode-pull-request-github
```

<!-- cspell:enable -->

Alternatively, you can search for each extension by name in [Open VSX Registry](https://open-vsx.org/) and/or the [VS Code Extensions Marketplace](https://marketplace.visualstudio.com/vscode) and install them individually.

## 📁 Workspace Recommendations

Our repository includes a `.vscode/extensions.json` file that specifies these recommended extensions. When you open the project in VS Code, you'll be prompted to install any missing recommended extensions. This ensures a consistent development environment across all contributors.

## 🔧 Configuration

The `.vscode/settings.json` file in the repository contains workspace-specific settings that align with our coding standards and practices. These settings include formatter configurations, linting rules, and other preferences to maintain code quality and consistency.

---

<div style="font-size: 12px; text-align: center;">

Copyright &copy; 2025  
**[Network Pro Strategies](https://netwk.pro) (Network Pro&trade;)**

Network Pro&trade;, the shield logo, and the "Locking Down Networks&trade;" slogan are [trademarks](https://netwk.pro/license#trademark) of Network Pro Strategies.

Licensed under **[CC BY 4.0](https://netwk.pro/license#cc-by)** and the **[GNU GPL](https://netwk.pro/license#gnu-gpl)**, as published by the [Free Software Foundation](https://www.fsf.org), either version 3 of the License, or (at your option) any later version.

</div>
