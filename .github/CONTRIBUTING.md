<!-- =========================================================================
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Pro.
========================================================================== -->

[SPDX-License-Identifier](https://spdx.dev/learn/handling-license-info):
`CC-BY-4.0 OR GPL-3.0-or-later`

<section id="top">

# Contributing to Network Pro Strategies

</section>

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

<sub>[Back to top](#top)</sub>

<section id="bugs">

## Bug reports

</section>

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](https://css-tricks.com/reduced-test-cases/) and a live example.

A good bug report shouldn't leave others needing to chase you down for more
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

<sub>[Back to top](#top)</sub>

<section id="features">

## Feature requests

</section>

Feature requests are welcome. But take a moment to find out whether your idea
fits with the scope and aims of the project. It's up to _you_ to make a strong
case to convince the project's developers of the merits of this feature. Please
provide as much detail and context as possible.

<sub>[Back to top](#top)</sub>

<section id="pull-requests">

## Pull requests

</section>

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

5. Lint your code locally. As reflected in the dependencies, the following
   linting tools should be used:

   - [Prettier](https://prettier.io/)
   - [ESLint](https://eslint.org/)
   - [markdownlint](https://github.com/DavidAnson/markdownlint) and
     [markdownlint2](https://github.com/DavidAnson/markdownlint-cli2)
   - [stylelint](https://stylelint.io/)

6. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/about-git-rebase/)
   feature to tidy up your commits before making them public.

7. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream main
   ```

8. Update any applicable test cases and run tests:

   ```bash
   npm run test
   ```

   Tests must cover changes and pass to be accepted.

9. Run build and commit changes to build:

   ```bash
   npm run build
   git add build/
   git commit
   ```

   <!-- markdownlint-disable MD029 -->

10. Push your topic branch up to your fork:

```bash
git push origin <topic-branch-name>
```

11. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description.

<!-- markdownlint-enable MD029 -->

&nbsp;

**IMPORTANT**: By submitting a patch, you agree to allow the project
owners to license your work under the terms of [CC BY 4.0](https://netwk.pro/license#cc-by) and the [GNU GPL](https://netwk.pro/license#gnu-gpl).

<sub>[Back to top](#top)</sub>

---

<span style="font-size: 12px; font-weight: bold; text-align: center;">

[Home](https://netwk.pro) &nbsp; | &nbsp; [Terms of Use](https://netwk.pro/terms-of-use)  
[Privacy Policy](https://netwk.pro/privacy) &nbsp; | &nbsp; [Legal](https://netwk.pro/license)

</span>

&nbsp;

<span style="font-size: 12px; text-align: center;">

Copyright &copy; 2025  
**[Network Pro Strategies](https://netwk.pro/)** (Network Pro&trade;)

Network Pro&trade;, the shield logo, and the "Locking Down Netwspan&trade;" slogan are [trademarks](https://netwk.pro/license#trademark) of Network Pro Strategies.

Licensed under **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)** and the **[GNU GPL](https://spdx.org/licenses/GPL-3.0-or-later.html)**, as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

</span>
