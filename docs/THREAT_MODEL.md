# Threat Model: Whiskey Tasting Foundation Frontend

**Generated:** 2025-11-30
**Methodology:** STRIDE
**Repository:** whiskeytastingfoundation/wtf-frontend
**Application Type:** Vue.js Single Page Application (SPA)

## Executive Summary

| Risk Level | Count |
|------------|-------|
| 🔴 Critical | 0 |
| 🟠 High | 1 |
| 🟡 Medium | 3 |
| 🟢 Low | 2 |

This threat model analyzes the Whiskey Tasting Foundation frontend application, a Vue.js SPA that allows users to create and manage whiskey tasting notes. The application uses browser localStorage for data persistence.

## System Overview

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Vue.js SPA                          │    │
│  │  ┌──────────────┐  ┌──────────────┐             │    │
│  │  │ WhiskeyForm  │  │ NoteSummary  │             │    │
│  │  └──────────────┘  └──────────────┘             │    │
│  │  ┌──────────────┐                               │    │
│  │  │ NoteDetail   │                               │    │
│  │  └──────────────┘                               │    │
│  │           │                                      │    │
│  │           ▼                                      │    │
│  │  ┌──────────────────────┐                       │    │
│  │  │   localStorage       │                       │    │
│  │  │   (submissions)      │                       │    │
│  │  └──────────────────────┘                       │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│              GitHub Pages (Static Hosting)               │
└─────────────────────────────────────────────────────────┘
```

### Assets Inventory

| Asset | Type | Sensitivity | Location |
|-------|------|-------------|----------|
| Whiskey tasting notes | User data | Low | localStorage |
| Application source code | Code | Public | GitHub |
| Static assets (JS/CSS) | Code | Public | GitHub Pages |
| User preferences | User data | Low | localStorage |

### Trust Boundaries

1. **Browser ↔ GitHub Pages**: HTTPS-protected static asset delivery
2. **Application ↔ localStorage**: Same-origin browser storage
3. **User ↔ Application**: Client-side input handling

## Threat Analysis (STRIDE)

### Spoofing (S)

#### S-1: Cross-Site Request Forgery (CSRF)
- **Risk Level:** 🟢 Low
- **Description:** Malicious sites could attempt to manipulate the application
- **Attack Vector:** Embedded iframes or malicious links
- **Current Mitigations:**
  - No backend API to target
  - localStorage is same-origin protected
- **Recommendations:** None required for current architecture

### Tampering (T)

#### T-1: localStorage Data Manipulation
- **Risk Level:** 🟡 Medium
- **Description:** Malicious browser extensions or XSS could modify stored tasting notes
- **Attack Vector:** Browser devtools, malicious extensions, XSS vulnerabilities
- **Impact:** Data integrity loss, corrupted tasting notes
- **Current Mitigations:**
  - Same-origin policy
- **Recommendations:**
  - Validate data structure when reading from localStorage
  - Consider data integrity checksums for critical data
  - Implement input validation in `JSON.parse()` calls

#### T-2: Supply Chain Attacks via Dependencies
- **Risk Level:** 🟠 High
- **Description:** Compromised npm packages could inject malicious code
- **Attack Vector:** Dependency confusion, typosquatting, compromised maintainer accounts
- **Impact:** Full application compromise, data exfiltration
- **Current Mitigations:**
  - ✅ Dependabot configured
  - ✅ package-lock.json present
  - ✅ SAST scanning via CodeQL
- **Recommendations:**
  - Enable npm audit in CI pipeline
  - Consider using npm provenance verification
  - Pin dependency versions

### Repudiation (R)

#### R-1: No Audit Trail
- **Risk Level:** 🟢 Low
- **Description:** No logging of user actions or data modifications
- **Attack Vector:** N/A (informational)
- **Impact:** Cannot trace data changes or debug issues
- **Current Mitigations:** None
- **Recommendations:**
  - For future backend integration, implement audit logging
  - Consider optional browser console logging for debugging

### Information Disclosure (I)

#### I-1: Sensitive Data in localStorage
- **Risk Level:** 🟡 Medium
- **Description:** localStorage data is accessible to any JavaScript on the same origin
- **Attack Vector:** XSS vulnerabilities, malicious browser extensions
- **Impact:** Exposure of user's tasting notes
- **Current Mitigations:**
  - Same-origin policy
  - Content Security Policy (if configured)
- **Recommendations:**
  - Implement strict Content Security Policy
  - Avoid storing sensitive personal data
  - Document data retention policies

#### I-2: Source Code Exposure
- **Risk Level:** 🟢 Low (Intentional)
- **Description:** Application source is publicly visible
- **Attack Vector:** Direct repository access
- **Impact:** Attackers can analyze code for vulnerabilities
- **Current Mitigations:**
  - ✅ Open source by design
  - ✅ Security scanning in CI
- **Recommendations:** Continue security scanning practices

### Denial of Service (D)

#### D-1: localStorage Quota Exhaustion
- **Risk Level:** 🟡 Medium
- **Description:** Excessive data storage could exhaust browser storage quota
- **Attack Vector:** Repeated form submissions, malicious scripts
- **Impact:** Application becomes unusable, data loss
- **Current Mitigations:** None
- **Recommendations:**
  - Implement storage quota monitoring
  - Add data cleanup/export functionality
  - Limit number of stored notes

#### D-2: Client-Side Resource Exhaustion
- **Risk Level:** 🟢 Low
- **Description:** Large datasets could slow browser performance
- **Attack Vector:** Accumulated data over time
- **Impact:** Degraded user experience
- **Current Mitigations:** None
- **Recommendations:**
  - Implement pagination for large note collections
  - Consider lazy loading of note details

### Elevation of Privilege (E)

#### E-1: Cross-Site Scripting (XSS)
- **Risk Level:** 🟡 Medium
- **Description:** User input in tasting notes could contain malicious scripts
- **Attack Vector:** Stored XSS via form inputs rendered in NoteDetail
- **Impact:** Session hijacking, data theft, defacement
- **Current Mitigations:**
  - Vue.js automatic template escaping
- **Recommendations:**
  - Verify v-html is not used with user data
  - Implement Content Security Policy
  - Sanitize rich text if supported in future

## Security Controls Matrix

| Control | Status | Notes |
|---------|--------|-------|
| HTTPS | ✅ | GitHub Pages enforces HTTPS |
| Content Security Policy | ⚠️ | Verify CSP headers |
| Input Validation | ⚠️ | Verify form validation |
| Output Encoding | ✅ | Vue.js auto-escaping |
| Dependency Scanning | ✅ | Dependabot configured |
| SAST | ✅ | CodeQL workflow present |
| SCA | ✅ | Dependency review configured |

## Recommendations Summary

### Immediate Actions (High Priority)

1. **Verify dependency security**
   - Run `npm audit` regularly
   - Review Dependabot alerts promptly
   - Consider npm provenance verification

### Short-term Actions (Medium Priority)

2. **Implement Content Security Policy**
   - Add CSP headers via GitHub Pages `_headers` file
   - Restrict script sources to 'self'

3. **Add localStorage validation**
   - Validate data structure on read
   - Handle corrupted data gracefully
   - Implement storage quota monitoring

4. **Input validation hardening**
   - Verify all form inputs are validated
   - Ensure no v-html with user data

### Long-term Considerations

5. **Data management features**
   - Export/backup functionality
   - Data cleanup tools
   - Pagination for scalability

## Methodology

This threat model was created using the STRIDE methodology:

- **S**poofing - Identity verification threats
- **T**ampering - Data integrity threats
- **R**epudiation - Audit and accountability threats
- **I**nformation Disclosure - Confidentiality threats
- **D**enial of Service - Availability threats
- **E**levation of Privilege - Authorization threats

### Scope

- Client-side Vue.js application
- Browser localStorage persistence
- Static hosting on GitHub Pages
- No backend services in scope

### Limitations

- Static analysis only - runtime behavior not analyzed
- No penetration testing performed
- Business context requires human review
- This is not a substitute for professional security assessment

## Review Schedule

This threat model should be reviewed:
- Quarterly, or
- When significant architectural changes occur
- When new features are added
- After security incidents

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [Vue.js Security Best Practices](https://vuejs.org/guide/best-practices/security.html)
- [GitHub Pages Security](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
