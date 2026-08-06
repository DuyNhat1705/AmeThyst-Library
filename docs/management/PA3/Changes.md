# Document Changes Log (PA2-2026 Resubmission)

This file tracks all modifications, refinements, and additions made to the project artifacts following Teaching Assistant (TA) feedback for Project Assignment 2 (PA2-2026).

---

## Section A: Project Plan Updates (2nd Submission)

### Summary of TA Feedback Addressed:
1. **Missing Reviewer Attribution:** Task tables in Section 4.3 (*Detailed Build Plan*) did not identify who reviewed each task, only who performed it.
2. **Overly Long, Unclear Sprint 2 Task List:** The PA2 task breakdown was flagged as too long, with several tasks not defined at a clear, actionable level of granularity.

---

### Detailed List of Changes

#### 1. Corrected PA Schedule Dates
* **Document Section:** Section 4.1 (*Schedule Overview*) and all Sprint headers in Section 4.3 (*Detailed Build Plan*)
* **Issue / Feedback:** Sprint start/end dates deviated by a few days from the official schedule issued by the course instructor.
* **Modification / Update:** Updated the Out/Due dates for all five Sprints to match the official schedule:
  * PA1 (Sprint 1): 23/05/2026 – 06/06/2026
  * PA2 (Sprint 2): 06/06/2026 – 11/07/2026
  * PA3 (Sprint 3): 11/07/2026 – 25/07/2026
  * PA4 (Sprint 4): 25/07/2026 – 08/08/2026
  * PA5 (Sprint 5): 08/08/2026 – 22/08/2026
* **Impact:** All Sprint section headers in Section 4.3 were updated to stay consistent with the corrected schedule.

#### 2. Added "Reviewed By" Column to All Task Tables
* **Document Section:** Section 4.3 (*Detailed Build Plan*) — all Sprint 1–5 task tables
* **Issue / Feedback:** No reviewer was identified per task; only the performer was listed.
* **Modification / Update:** Added a "Reviewed By" column to every task table, following the team's internal review policy (documented as a note at the top of Section 4.3): documentation tasks are reviewed collectively by the whole team once drafted (`All Members`); development tasks are self-tested by the implementer and then reviewed by the Project Manager, Vũ Duy Nhất (`Self-tested + Vũ Duy Nhất`); the Overview and Merge Code task itself, performed by Vũ Duy Nhất each sprint, is reviewed collectively by the whole team (`All Members`), since it is where everyone's work is integrated.

#### 3. Consolidated the Sprint 2 (PA2) Task Breakdown
* **Document Section:** Section 4.3 (*Detailed Build Plan*), Sprint 2
* **Issue / Feedback:** The PA2 task list was excessively long (13, 10, 7, 6, and 10 tasks per member) with several overly granular, loosely-defined items.
* **Modification / Update:** Merged closely related tasks per member into fewer, clearer, theme-based items (e.g. combining individual page-by-page Figma implementation tasks into single consolidated feature tasks), reducing the per-member task counts to 5, 3, 5, 4, and 6 respectively, while preserving all original due dates and scope.
* **Gantt Chart Update:** Updated the Sprint 2 source data in `Sprint-Tasks.xlsx` and revised the PA2 Gantt chart to reflect the corrected Sprint period (06/06/2026 – 11/07/2026), consolidated task names, and corresponding task dates. The revised chart is used to regenerate `Gantt Charts/Sprint2.svg`.

#### 4. Updated the Sprint 4 (PA4) Task Table and Gantt Chart
* **Document Section:** Section 4.3 (*Detailed Build Plan*), Sprint 4
* **Issue / Feedback:** The Sprint 4 task table did not reflect the team's latest Planning Report (PlanningReport.pdf).
* **Modification / Update:** Replaced the Sprint 4 task table and per-member assignments with the tasks and due dates from the current Planning Report, and corrected the Sprint 4 deliverables description: the two functional groups implemented via Spec Kit in this sprint are **Profile Management** and **Books** (previously listed as Study Group and AI Recommendations).
* **Gantt Chart Update:** Updated the Sprint 4 source data in `Sprint-Tasks.xlsx` and revised the PA4 Gantt chart to reflect the corrected Sprint period (25/07/2026 – 08/08/2026), latest task assignments, updated due dates, and the Profile Management and Books Spec Kit scope. The revised chart is used to regenerate `Gantt Charts/Sprint4.svg`.

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

---

## Section C: Use Case Diagram & Specification Refinements (PA3 Fixes)

### Summary of Issues Addressed:
1. **Missing Use Case IDs in Diagrams:** Restored explicit Use Case IDs across all Mermaid use case diagrams for direct traceability with the specification.
2. **Abstract Use Cases vs. Specification Alignment:** Reconciled abstract parent nodes (e.g. `{abstract} Searching Book`) with concrete specification IDs (`UC-BK-01: Book Searching`).
3. **Relationship Types & Direction Correction:** Fixed incorrect UML generalization (`-->`) arrows, replacing them with `<<include>>` dependencies for included operational sub-routines (e.g., Authorization and PIN verification).
4. **Actor Naming Standardization:** Standardized all actor names across diagrams to Title Case in compliance with system Regulation schema.
5. **Specification Text & Cross-Reference Alignment:** Corrected internal Use Case ID typos and step references within `Use-CaseSpecification.md`.

---

### Detailed List of Refinements

#### 1. Integration of Official Use Case IDs across Diagrams
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md`
* **Issue:** Diagram nodes lacked official Use Case IDs (e.g. `UC-AUTH-01`, `UC-BK-01`, `UC-FAC-01`).
* **Modification:** Updated node definitions in all 9 Mermaid diagrams across both files to display explicit IDs (e.g., `UC-AUTH-01: Register`, `UC-BK-01: Book Searching`, `UC-ADM-01: View User Account`).

#### 2. Abstract vs. Concrete Use Case Alignment
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md` (Books Exploration & Librarian sections)
* **Issue:** Abstract parent node `{abstract} Searching Book` conflicted with `UC-BK-01: Book Searching`, which is defined as a single concrete use case encompassing keyword and semantic search modes.
* **Modification:** Designated `UC-BK-01: Book Searching` as the primary concrete node, with `Standard Search` and `Semantic Search` as specialized search options generalizing (`-->`) into `UC-BK-01`.

#### 3. Correction of UML Relationship Arrows & Dependency Types
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md` (Admin & Librarian Administration diagrams)
* **Issue:** 
  * In Admin Administration, `Role Control` (`UC-ADM-04`) and `Use-case Permission` (`UC-ADM-05`) improperly used solid generalization (`-->`) to point to `Authorization` (`UC-ADM-03`).
  * In Librarian Administration, `Confirming Book Borrowed` (`UC-LIB-05`) and `Confirming Room Checkin` (`UC-LIB-06`) improperly used generalization (`-->`) pointing to `{abstract} Verifying Pin`.
* **Modification:**
  * Converted Admin arrows to `<<include>>` dependencies (`-. "<<include>>" .->`) pointing from `UC-ADM-04` and `UC-ADM-05` to `UC-ADM-03 (Authorization)`.
  * Converted Librarian arrows to `<<include>>` dependencies pointing from `UC-LIB-05` and `UC-LIB-06` to `{abstract} Verifying Pin`.
  * Verified `UC-LIB-04: Recording Loan` correctly extends (`-. "<<extend>>" .->`) `UC-LIB-03: Confirming Book Return`.

#### 4. Actor Naming and Capitalization Standardization
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md` (All Diagram Sections)
* **Issue:** Inconsistent lowercase actor labels (e.g. `logged user`, `general user`, `user`, `study group creator`, `other user`).
* **Modification:** Standardized all actor labels to Title Case (`Logged User`, `General User`, `User`, `Study Group Creator`, `Other User`) aligning strictly with the Regulation definition.

#### 5. Specification Text and Cross-Reference Corrections
* **Document:** `management/PA3/Use-CaseSpecification.md`
* **Issue:** Discrepancies and typos in cross-referenced Use Case IDs within specification tables.
* **Modification:**
  * Fixed `UC-LIB-03` Step 5 alt flow reference from `UC-LIB-05` to `UC-LIB-04 (Recording Loan)`.
  * Corrected `UC-ADM-03` brief description to reference `UC-ADM-04` and `UC-ADM-05` (was mislabeled `UC-ADM-05` & `UC-ADM-06`).
  * Corrected `UC-ADM-04` and `UC-ADM-05` brief descriptions, event flows, and exception flows to reference `UC-ADM-03 Authorization` (were mislabeled `UC-ADM-07`).