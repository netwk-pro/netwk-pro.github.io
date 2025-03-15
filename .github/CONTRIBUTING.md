<!-- =========================================================================
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

<!--
Copyright © 2025 Network Pro Strategies (Network Pro)

---

I. Creative Commons Attribution 4.0 International

Network Pro (the "Licensed Material") is licensed under Creative Commons Attribution 4.0 International ("CC BY 4.0"). To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0/.

Per the terms of the License, you are free to distribute, remix, adapt, and build upon the Licensed Material for any purpose, even commercially. You must give appropriate credit, provide a link to the License, and indicate if changes were made.

The Licensor offers the Licensed Material as-is and as-available, and makes no representations or warranties of any kind concerning the Licensed Material, whether express, implied, statutory, or other. This includes, without limitation, warranties of title, merchantability, fitness for a particular purpose, non-infringement, absence of latent or other defects, accuracy, or the presence or absence of errors, whether or not known or discoverable.

Permissions beyond the scope of this License—or instead of those permitted by this License—may be available as further defined within this document.

  SPDX Reference: https://spdx.org/licenses/CC-BY-4.0.html
  Canonical URL: https://creativecommons.org/licenses/by/4.0/

---

II. GNU General Public License

Network Pro is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License ("GNU GPL") as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This material is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

See the GNU General Public License for more details.

  SPDX Reference: https://spdx.org/licenses/GPL-3.0-or-later.html
  Canonical URL: https://www.gnu.org/licenses/gpl-3.0.html

---

Author: Scott Lopez
Email: <contact@neteng.pro>
Web: <https://bio.neteng.pro>
-->

[SPDX-License-Identifier](https://spdx.dev/learn/handling-license-info/):
`CC-BY-4.0 OR GPL-3.0-or-later`

<a name="top"></a>

# Contributing to Network Pro Strategies

♥ [Network Pro Strategies](https://netwk.pro/) and want to get involved?
Thanks! We're actively looking for folks interested in helping out and there
are plenty of ways you can help!

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.

## Using the issue tracker

The [issue tracker](https://github.com/netwk-pro/netwk-pro.github.io/issues) is
the preferred channel for [bug reports](#bugs), [features requests](#features)
and [submitting pull requests](#pull-requests), but please respect the following
restrictions:

- Please **do not** use the issue tracker for personal support requests (use
  [Stack Overflow Teams](https://stack.neteng.pro/), [Discussions](https://discuss.neteng.pro), or [Discord](https://discord.neteng.pro/)).

- Please **do not** derail or troll issues. Keep the discussion on topic and
  respect the opinions of others.

<sub>[Top](#top)</sub>

<a name="bugs"></a>

## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](https://css-tricks.com/reduced-test-cases/) and a live example.

A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? What would you expect to be the outcome? All these
details will help people to fix any potential bugs.

Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If
> suitable, include the steps required to reproduce the bug.
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).

<sub>[Top](#top)</sub>

<a name="features"></a>

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea
fits with the scope and aims of the project. It's up to _you_ to make a strong
case to convince the project's developers of the merits of this feature. Please
provide as much detail and context as possible.

<sub>[Top](#top)</sub>

<a name="pull-requests"></a>

## Pull requests

Good pull requests - patches, improvements, new features - are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code, porting to a different language),
otherwise you risk spending a lot of time working on something that the
project's developers might not want to merge into the project.

Please adhere to the coding conventions used throughout a project (indentation,
accurate comments, etc.) and any other requirements (such as test coverage).

Adhering to the following process is the best way to get your work
included in the project:

1. [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your
   fork, and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/netwk-pro.github.io.git
   # Navigate to the newly cloned directory
   cd netwk-pro.github.io
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/netwk-pro/netwk-pro.github.io.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Install locked dependencies:

   ```bash
   npm ci
   ```

   Ensure that your `node` and `npm` versions are compatible with the `engines`
   specification in `package.json`.

5. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/about-git-rebase/)
   feature to tidy up your commits before making them public.

6. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream main
   ```

7. Update any applicable test cases and run tests:

   ```bash
   npm run test
   ```

   Tests must cover changes and pass to be accepted.

8. Run build and commit changes to dist:

   ```bash
   npm run build
   git add dist/
   git commit
   ```

9. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

10. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description.

**IMPORTANT**: By submitting a patch, you agree to allow the project
owners to license your work under the terms of [CC BY 4.0](https://github.com/netwk-pro/netwk-pro.github.io/blob/master/assets/license/CC-BY-4.0.md) and the [GNU GPL](https://github.com/netwk-pro/netwk-pro.github.io/blob/master/assets/license/COPYING.md).

<sub>[Top](#top)</sub>

---

<span style="font-size: 12px; font-weight: bold; text-align: center;">

[Home](https://netwk.pro) &nbsp; | &nbsp; [Terms of Use](https://github.com/netwk-pro/netwk-pro.github.io/blob/master/legal/TERMS.md)  
[Privacy Policy](https://github.com/netwk-pro/netwk-pro.github.io/blob/master/legal/PRIVACY.md) &nbsp; | &nbsp; [Copyright and Licensing](https://github.com/netwk-pro/netwk-pro.github.io/blob/master/LICENSE.md)

</span>

&nbsp;

<span style="font-size: 12px; text-align: center;">

Copyright &copy; 2025 by  
**[Network Pro Strategies](https://netwk.pro/)** (Network Pro)

Licensed under **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)** and the **[GNU GPL](https://spdx.org/licenses/GPL-3.0-or-later.html)**, as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

</span>
