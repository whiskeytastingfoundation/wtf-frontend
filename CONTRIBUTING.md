# Contributing to WTF Frontend

First off, thank you for considering contributing to WTF Frontend! 🎉

The following is a set of guidelines for contributing to this project. These are
mostly guidelines, not rules. Use your best judgment, and feel free to propose
changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Find an Issue](#find-an-issue)
- [Ask for Help](#ask-for-help)
- [Pull Request Process](#pull-request-process)
- [Sign Your Commits](#sign-your-commits)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct.
By participating, you are expected to uphold this code. Please report unacceptable
behavior to the project maintainers.

## Ways to Contribute

We welcome many different types of contributions including:

- 🐛 Bug fixes
- ✨ New features
- 📖 Documentation improvements
- 🧪 Test coverage
- 🎨 UI/UX improvements
- 🔧 Build and CI/CD improvements
- 💬 Answering questions and helping other users
- 📢 Blog posts, tutorials, and talks

Not everything happens through a GitHub pull request. Please reach out via
GitHub Issues to discuss how we can work together.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up your development environment (see README.md)
4. Create a branch for your changes
5. Make your changes and commit them
6. Push your branch and open a pull request

## Find an Issue

We use GitHub issues to track bugs and feature requests.

- Look for issues labeled [`good first issue`](https://github.com/whiskeytastingfoundation/wtf-frontend/labels/good%20first%20issue)
  if you're new to the project
- Issues labeled [`help wanted`](https://github.com/whiskeytastingfoundation/wtf-frontend/labels/help%20wanted)
  are good for any contributor

If you want to work on an issue, please comment on it to let others know.

## Ask for Help

The best ways to reach us with questions are:

- 💬 GitHub Issues
- 🐛 Open a [GitHub Issue](https://github.com/whiskeytastingfoundation/wtf-frontend/issues/new)

## Pull Request Process

1. **Create an issue first** - For significant changes, please open an issue to
   discuss your proposed changes before starting work.

2. **Keep PRs focused** - Each pull request should address a single concern.
   If you have multiple unrelated changes, submit them as separate PRs.

3. **Write good commit messages** - Use clear, descriptive commit messages.
   Reference relevant issues using `#issue-number`.

4. **Add tests** - If you're adding new functionality, please include tests.
   If you're fixing a bug, add a test that would have caught the bug.

5. **Update documentation** - Update the README.md or other documentation if
   your changes affect how users interact with the project.

6. **Wait for review** - A maintainer will review your PR. Please be patient
   and responsive to feedback.

### Sign Your Commits (Required)

We use the [Developer Certificate of Origin (DCO)](https://developercertificate.org/)
to certify that contributors have the right to submit code under this project's license.

**⚠️ All commits must be signed off. This is enforced automatically on all pull requests.**

#### How to Sign Off

Add a `Signed-off-by` line to your commit message. Your sign-off must match the
git user and email associated with the commit:

```
This is my commit message

Signed-off-by: Your Name <your.name@example.com>
```

Git has a `-s` command line option to do this automatically:

```bash
git commit -s -m 'This is my commit message'
```

#### Fixing Unsigned Commits

If you forgot to sign off and haven't pushed yet:

```bash
# Amend the last commit
git commit --amend -s

# Or sign off multiple commits via rebase
git rebase HEAD~N --signoff
```

If you've already pushed, you'll need to amend and force push:

```bash
git commit --amend -s
git push --force-with-lease
```

#### What the DCO Means

By signing off, you certify the following (from [developercertificate.org](https://developercertificate.org/)):

> I certify that I have the right to submit this contribution under the open source
> license indicated in the file, and that I created this contribution (or have
> permission to submit it on behalf of the original author).

## Pull Request Checklist

Before submitting your pull request, please verify:

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

---

Thank you for contributing! 🙏
