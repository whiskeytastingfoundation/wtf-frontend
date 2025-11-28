# Security Policy

## Reporting a Vulnerability

We take the security of wtf-frontend seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

### GitHub Private Vulnerability Reporting (Recommended)

This repository has **GitHub Private Vulnerability Reporting** enabled. This is the preferred method for reporting security issues:

1. Go to the [Security tab](https://github.com/whiskeytastingfoundation/wtf-frontend/security) of this repository
2. Click on "Report a vulnerability"
3. Fill out the form with details about the vulnerability

This method ensures your report is kept private and allows us to collaborate with you on a fix before any public disclosure.

For more information, see [GitHub's documentation on private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability).

### What to Include

Please include as much of the following information as possible:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the issue
- Location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Coordinated Disclosure Timeline

- We will acknowledge receipt of your vulnerability report within **3 business days**
- We will provide an initial assessment within **10 business days**
- We aim to release a fix within **90 days** of the initial report
- We will coordinate with you on the public disclosure timeline

## Security Updates

Security updates will be released as patch versions and announced via:
- GitHub Security Advisories
- Release notes

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

## Preferred Languages

We prefer all communications to be in English.

## Dependency Vulnerability Policy (SCA)

We use automated Software Composition Analysis (SCA) to identify vulnerabilities in dependencies.

### Remediation Timeline

| Severity | Remediation SLA |
|----------|-----------------|
| Critical | 24 hours |
| High | 7 days |
| Medium | 30 days |
| Low | 90 days or next release |

### Process

1. **Detection**: Dependabot and dependency-review action scan for vulnerabilities
2. **Triage**: Security team assesses exploitability and impact
3. **Remediation**: Update dependency or apply workaround
4. **Verification**: Confirm fix resolves the vulnerability
5. **Disclosure**: Follow coordinated disclosure if applicable

### Vulnerability Exploitability (VEX)

When a vulnerability is determined to not impact this project, we will publish a VEX (Vulnerability Exploitability eXchange) statement documenting:

- **CVE/Advisory ID**: The vulnerability identifier
- **Status**: `not_affected`, `affected`, `fixed`, or `under_investigation`
- **Justification**: Why the vulnerability does not impact us (e.g., `vulnerable_code_not_present`, `vulnerable_code_not_in_execute_path`, `inline_mitigations_already_exist`)
- **Impact Statement**: Explanation of our analysis

VEX statements will be published as:
- GitHub Security Advisory (for significant vulnerabilities)
- Comments on Dependabot PRs (for dependency vulnerabilities)
- Release notes (when applicable)

### Exceptions

Exceptions require documented justification and compensating controls.
Track exceptions in [GitHub Issues](https://github.com/whiskeytastingfoundation/wtf-frontend/issues?q=label%3Asecurity-exception).


## Static Analysis Policy (SAST)

We use CodeQL and other static analysis tools to identify security issues in code.

### Remediation Timeline

| Severity | Remediation SLA |
|----------|-----------------|
| Critical/High | Must fix before merge |
| Medium | 14 days |
| Low | 30 days |

### Process

1. **Detection**: CodeQL runs on all PRs and weekly scans
2. **Review**: Developers review findings in PR checks
3. **Fix**: Address issues before merging or document exception
4. **Verification**: Re-run analysis to confirm fix

### Suppression Policy

False positives may be suppressed with:
- Inline comments explaining why it's safe
- Issue tracking the suppression decision
- Periodic review of suppressions

## Secrets Management Policy

### Overview

This document describes how secrets are managed in the wtf-frontend project.

### Secret Types

| Type | Storage | Rotation |
|------|---------|----------|
| API Keys | GitHub Secrets | 90 days |
| Database Credentials | GitHub Secrets | 90 days |
| Signing Keys | Secure vault | Annually |
| Service Accounts | Cloud IAM | 90 days |

### Storage Guidelines

**DO:**
- ✅ Use GitHub Secrets for CI/CD credentials
- ✅ Use environment-specific secrets (dev, staging, prod)
- ✅ Use OIDC for cloud authentication when possible
- ✅ Rotate secrets regularly per the schedule above

**DON'T:**
- ❌ Commit secrets to the repository
- ❌ Log secrets in CI output
- ❌ Share secrets in issues, PRs, or comments
- ❌ Use the same secret across environments

### Secret Rotation Procedure

1. Generate new secret value
2. Update in GitHub Secrets / vault
3. Deploy to verify new secret works
4. Revoke old secret
5. Document rotation in security log

### Compromised Secret Response

If a secret is exposed:

1. **Immediately** rotate the compromised secret
2. **Review** access logs for unauthorized use
3. **Scan** git history with tools like `trufflehog` or `gitleaks`
4. **Report** the incident per security policy
5. **Document** in post-incident review

### Detection & Prevention

We use the following tools to prevent secret exposure:

- **GitHub Push Protection**: Blocks commits containing secrets
- **Pre-commit hooks**: Local scanning before commit
- **CI scanning**: `gitleaks` or `trufflehog` in pipeline
- **.gitignore**: Excludes common secret file patterns

### GitHub Secrets Configuration

Repository secrets: `https://github.com/whiskeytastingfoundation/wtf-frontend/settings/secrets/actions`

Required secrets for CI/CD:
- Document required secrets in `.github/workflows/README.md`
- Use descriptive names: `PROD_API_KEY`, `STAGING_DB_PASSWORD`

