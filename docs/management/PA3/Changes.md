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
