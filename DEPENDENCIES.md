# Dependency Management

## Overview

This document describes how dependencies are managed in the wtf-frontend project.

## Package Manager

- **Package Manager**: npm
- **Lock File**: `package-lock.json`
- **Manifest**: See project root

## Commands

### Install Dependencies

```bash
npm ci
```

### Update Dependencies

```bash
npm update
```

### Security Audit

```bash
npm audit
```

## Dependency Update Policy

### Automated Updates

We use [Dependabot](https://github.com/whiskeytastingfoundation/wtf-frontend/blob/main/.github/dependabot.yml) for automated dependency updates:

- **Security updates**: Automatic PRs for vulnerabilities
- **Version updates**: Weekly PRs for outdated dependencies
- **Review process**: All updates reviewed before merging

### Manual Updates

For major version updates:

1. Review changelog and migration guide
2. Test in development environment
3. Update lock file
4. Run full test suite
5. Create PR with update notes

## Adding Dependencies

Before adding a new dependency:

1. **Evaluate necessity**: Can we solve this without a new dependency?
2. **Check security**: Review for known vulnerabilities
3. **Check maintenance**: Is it actively maintained?
4. **Check license**: Is the license compatible?
5. **Check size**: What's the impact on bundle/binary size?

### Approval Process

- **Direct dependencies**: Require code review
- **Security-sensitive**: Require security team review

## Lock File Policy

- **Always commit** lock files to version control
- **Never manually edit** lock files
- **Regenerate** if conflicts occur

## Vulnerability Response

See [SECURITY.md](SECURITY.md) for vulnerability remediation timelines.

| Severity | Response Time |
|----------|---------------|
| Critical | 24 hours |
| High | 7 days |
| Medium | 30 days |
| Low | Next release |
