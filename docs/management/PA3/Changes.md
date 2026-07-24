# Document Changes Log (PA2-2026 Resubmission)

This file tracks all modifications, refinements, and additions made to the project artifacts following Teaching Assistant (TA) feedback for Project Assignment 2 (PA2-2026).

---

## Section A: [Section A Updates Placeholder]
*Note: Section A changes previously documented remain above this section in the primary Changes.md repository file.*

---

## Section B: Vision Document Updates (2nd Submission)

### Summary of TA Feedback Addressed:
1. **Access Token Storage Strategy:** Insecure session persistence in `LocalStorage` flagged; required transition to a secure token management architecture.
2. **Functional Requirements Refinement:** Specific functional details regarding authentication workflow and token persistence refined for accuracy and compliance.
3. **Missing Non-Functional Requirements:** Bounded gaps identified in **Privacy**, **Accessibility (a11y)**, and **Backup & Recovery (Disaster Recovery)**.

---

### Detailed List of Functional Requirement Changes

#### 1. Refinement of Authentication & Token Storage Flow
* **Document Section:** Section 4.1 (*Memory/Storage Constraints*), Section 5.1 (*Authentication*), & Section 6.6 (*Design Constraints*)
* **Issue / Feedback:** The original specification stated that authenticated session information, including access tokens, were stored in browser `LocalStorage` for 7 days. Storing access tokens in `LocalStorage` exposes the application to Cross-Site Scripting (XSS) token exfiltration vulnerabilities.
* **Modification / Update:**
  * **Access Token Strategy:** Updated the functional authentication mechanism to store short-lived **Access Tokens in-memory** (React State / Application Context) with an explicit 15-minute expiration cycle.
  * **Refresh Token Strategy:** Implemented secure **`httpOnly`, `Secure`, `SameSite=Strict` HTTP cookies** for holding Refresh Tokens, allowing seamless and secure session renewal without exposing authentication credentials to client-side scripts.
  * **LocalStorage Scope Restriction:** Constrained `LocalStorage` strictly to non-sensitive UI user preferences, specifically client theme mode (`light` / `dark`) and language selections (`en` / `vi`).
* **Impact:** Eliminates XSS token hijacking risks while preserving seamless 7-day extended session login persistence via secure HTTP-only refresh tokens.

#### 2. Functional Clarification on User Profile & Data Access Controls
* **Document Section:** Section 5.2 (*Profile Management*) & Section 5.6 (*System Administration*)
* **Issue / Feedback:** Need for clearer operational boundaries between patron self-service data and administrative user inspection.
* **Modification / Update:**
  * Clarified that patron borrowing history, reading lists, and AI recommendation profiles are strictly accessible to the individual account holder.
  * Explicitly defined that System Administrators and Librarians access anonymized or task-bounded patron operational data necessary for physical inventory tracking, preventing unauthorized access to patron reading histories.

#### 3. Workflow Transaction & Failure Recovery Handling
* **Document Section:** Section 5.10 (*Key Workflows: Book Reservation, Pickup & Room Booking*)
* **Issue / Feedback:** Need for explicit functional behavior when PIN verification fails or room reservation timeouts occur during counter checkouts.
* **Modification / Update:**
  * Added precise functional exception branches in workflow descriptions for PIN expiration and verification failure retries.
  * Ensured that failed PIN attempts gracefully reset transaction state without marking items as checked out or creating orphaned database records.

---

### Non-Functional Requirement Additions (Section 6 Summary)

| Requirement Category | Document Section | Addition / Update Details |
| :--- | :--- | :--- |
| **Privacy & Data Protection** | Section 6.5 (*Quality Ranges*) | Enforced patron reading history confidentiality, PII masking, and strict data minimization across all API endpoints. |
| **Accessibility Standards** | Section 6.1 & Section 6.5 | Adopted **WCAG 2.1 Level AA** compliance, full keyboard navigation for core features, screen reader (`aria-label`) support, and contrast ratio validation. |
| **Backup & Recovery** | Section 6.4 & Section 6.5 | Defined **RPO $\le$ 24 hours** (daily automated PostgreSQL backups) and **RTO $\le$ 2 hours** (automated cloud database recovery procedures). |
