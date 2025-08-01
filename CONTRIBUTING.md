<!-- =========================================================================
CONTRIBUTING.md

Copyright © 2025 Network Pro Strategies (Network Pro™)
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<a name="top"></a>

[SPDX-License-Identifier](https://spdx.dev/learn/handling-license-info/):
`CC-BY-4.0 OR GPL-3.0-or-later`

# 🤝 Contributing to Network Pro Strategies

**Network Pro Strategies**  
**Effective Date:** July 31, 2025

&nbsp;

Thanks for your interest in improving **Network Pro Strategies** (Network Pro™)! We're always looking for collaborators and contributors of all skill levels. This guide will help you get started quickly and effectively.

Following these guidelines helps us all work together efficiently and respectfully. 🙌

---

## 🐛 Using the Issue Tracker

Use the [issue tracker](https://github.com/netwk-pro/netwk-pro.github.io/issues) for:

- Reporting [bugs](#bug-reports)
- Submitting [feature requests](#feature-requests)
- Proposing [pull requests](#pull-requests)

🚫 Please do **not** use issues for general support — instead, head to:

- [Stack Overflow Teams](https://stack.neteng.pro/)
- [GitHub Discussions](https://discuss.neteng.pro)
- [Discord](https://discord.neteng.pro)

---

<section id="bug-reports">

## 🐞 Bug Reports

A bug is a clear, reproducible issue in the code. High-quality reports help us fix problems faster.

### ✅ A good bug report includes

- A **descriptive title**
- Steps to reproduce
- Your environment (OS, browser, version)
- Expected vs actual behavior
- Links to a minimal reproducible case (if possible)

_Example_:

<!-- markdownlint-disable MD042 -->

> **Title**: Checkbox toggle fails on Safari 17  
> Steps:
>
> 1. Visit page X
> 2. Click toggle
> 3. Observe that...  
>    Expected: ...  
>    Actual: ...  
>    [Live example](#)

<!-- markdownlint-enable MD042 -->

</section>

&nbsp;

<sub>[Back to top](#top)</sub>

---

<section id="feature-requests">

## ✨ Feature Requests

Feature requests are welcome — just make sure it aligns with the project’s goals.

Before posting:

- Search for similar requests
- Clearly describe the problem it solves
- Explain the use case and who benefits

Strong proposals help us prioritize.

</section>

&nbsp;

<sub>[Back to top](#top)</sub>

---

<section id="pull-requests">

## 🔁 Pull Requests

Well-scoped, well-documented pull requests are the lifeblood of open-source.

### ⚠️ Ask First

Before large PRs (new features, refactors, dependency upgrades), please check with maintainers first.

### 📋 Steps

1. **Fork the repo & set remotes**:

   ```bash
   git clone https://github.com/<your-username>/netwk-pro.github.io.git
   cd netwk-pro.github.io
   git remote add upstream https://github.com/netwk-pro/netwk-pro.github.io.git
   ```

2. **Stay Updated**

   ```bash
   git checkout master
   git pull upstream master
   ```

3. **Create a topic branch:**

   ```bash
   git checkout -b my-feature
   ```

4. **Install & test locally:**

   ```bash
   npm install
   npm run checkout
   ```

5. **Make your changes**

   (and commit them in logical chunks with good commit messages).

6. **Build:**

   ```bash
   npm run build
   git add build/
   git commit -m "Build: update assets"
   ```

7. **Push and open a PR:**

   ```bash
   git push origin my-feature
   ```

Open your PR with a clear title, description, and reference the related issue (if any).

</section>

&nbsp;

<sub>[Back to top](#top)</sub>

---

## ✅ Coding & Style Notes

- Use the defined code style (Prettier, ESLint, Stylelint, markdownlint)
- Avoid unrelated changes in the same PR
- Keep PRs focused and test-covered when appropriate

&nbsp;

## 🔐 Legal Notice

By submitting a pull request, you agree to license your contributions under:

- [CC BY 4.0](https://netwk.pro/license#cc-by)
- [GNU GPL 3.0 or later](https://netwk.pro/license#gnu-gpl)

&nbsp;

<sub>[Back to top](#top)</sub>

&nbsp;

_Thanks again for your contribution and for being part of the Network Pro&trade; community!_

---

<div style="font-size: 12px; font-weight: bold; text-align: center;">

[Home](https://netwk.pro) &nbsp; | &nbsp; [Terms of Use](https://netwk.pro/terms-of-use)  
[Privacy Policy](https://netwk.pro/privacy) &nbsp; | &nbsp; [Legal](https://netwk.pro/license)

</div>

&nbsp;

<span style="font-size: 12px; text-align: center;">

Copyright &copy; 2025  
**[Network Pro Strategies](https://netwk.pro/)** (Network Pro&trade;)

Network Pro&trade;, the shield logo, and the "Locking Down Networks...&trade;" slogan are [trademarks](https://netwk.pro/license#trademark) of Network Pro Strategies.

Licensed under **[CC BY 4.0](https://netwk.pro/license#cc-by)** and the **[GNU GPL](https://netwk.pro/license#gnu-gpl)**, as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

</span>
