# Document Changes Log (PA2-2026 Resubmission & PA3/PA4 Refinements)

This file tracks all modifications, refinements, and additions made to the project artifacts following Teaching Assistant (TA) feedback for Project Assignment 2 (PA2-2026) and subsequent Use Case Diagram & Specification refinements.

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

## Section C: Use Case Diagram & Specification Refinements

### Summary of Issues Addressed:
1. **Official Use Case ID Integration:** Added explicit Use Case IDs (e.g., `UC-AUTH-01`, `UC-BK-01`, `UC-ADM-01`) directly into every Mermaid diagram node.
2. **UML Relationship Arrows & Dependency Types:** Converted solid generalization (`-->`) arrows to `<<include>>` and `<<extend>>` dependencies for sub-routines, validation workflows (e.g., PIN verification), and helper utilities.
3. **Actor Naming Standardization:** Standardized all actor names across all diagrams (`Logged User`, `General User`, `Guest`, `User`, `Librarian`, `Admin`, `Study Group Creator`, `Other User`) in compliance with system Regulation schema.
4. **Specification Text & Cross-Reference Alignment:** Corrected internal Use Case ID typos and step references within `Use-CaseSpecification.md`.
5. **Prototype Screen Additions & Standardized Naming for Alternative/Exception Flows:** Added dedicated UI prototype mockup figures for alternative and exception flows across Facility Reservation, Books, Study Group, and Administration use cases (`UC-FAC-01`, `UC-FAC-03`, `UC-FAC-04`, `UC-BK-06`, `UC-FAC-06`, `UC-ADM-07`), standardizing all file names to the `P-[UC-ID]-[BF|AF]0X-[kebab-case-description].[ext]` naming convention.
6. **Omission of Alternative Flows for UC-FAC-05 & UC-FAC-07:** Removed unnecessary alternative exception flows for `UC-FAC-05 (Creating Study Group)` and `UC-FAC-07 (Updating Study Group Information)`, simplifying them to operate directly within standard validation boundaries.

---

### Detailed List of Refinements

#### 1. Integration of Official Use Case IDs across Diagrams
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md`
* **Issue:** Diagram nodes lacked official Use Case IDs (e.g. `UC-AUTH-01`, `UC-BK-01`, `UC-FAC-01`).
* **Modification:** Updated node definitions in all 9 Mermaid diagrams across both files to display explicit IDs with HTML line breaks (`<center>UC-AUTH-01:<br>Register</center>`, `<center>UC-BK-01:<br>Book Searching</center>`, `<center>UC-ADM-01:<br>View User Account</center>`).

#### 2. Actor Label Regularization and Typo Corrections
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md` (All Diagram Sections)
* **Issue:** Inconsistent actor labels, typos (`logged user`, `user`, `other user`, `study group creator`), and misspelled titles (`AI Recommedation`, `View Recomended Book`).
* **Modification:** Standardized all actor labels to match the Regulation schema (`Logged User`, `General User`, `Guest`, `User`, `Librarian`, `Admin`, `Study Group Creator`, `Other User`).

#### 3. Correction of UML Relationship Arrows & Dependency Types
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md`
* **Issue:** Solid generalization (`-->`) arrows misused for sub-routines, validation steps, and helper tools.
* **Modification:**
  * **Librarian Administration:** Converted `Confirming Book Borrowed` (`UC8`) and `Confirming Room Checkin` (`UC9`) to `<<include>>` dependencies pointing to `Verifying Pin` (`UC7`).
  * **Books Exploration:** Converted `Generating Pin` (`UC_GenPin`) to an `<<include>>` dependency of `Creating Book Reservation` (`UC_CreateReserve`).
  * **Study Group:** Converted helper actions (`Finding User By Email` to `<<include>>` under `Inviting Others`, `View Other Profile` to `<<extend>>` under `Interacting with Others`, `Managing Join Request` and `Out Study Group` to `<<include>>` under `Interacting with Study Group`).
  * **Admin Administration:** Converted `Role Control` (`UC4`) and `Use-case Permission` (`UC5`) to `<<include>>` dependencies pointing to `Authorization` (`UC3`).

#### 4. Addition and Standardization of UI Mockup Prototypes for Alternative & Exception Flows
* **Documents:** `management/PA3/Use-CaseSpecification.md` & `management/PA4/Use-CaseSpecification.md`
* **Issue:** Specification tables lacked visual prototype figures for alternative/exception flows, and newly added image files were not adhering to the system's strict `P-[UC-ID]-[BF|AF]0X-[kebab-case-description].[ext]` naming convention.
* **Modification:**
  * Renamed all newly added prototype images to comply with the project naming schema:
    * **`UC-FAC-01 (View Library Map)`**: Renamed to `ImageGUI/Facility/P-FAC-01-AF01-library-map-unavailable.jfif` (*Figure P-FAC-01-AF01 – Library Map Unavailable*) illustrating map graphics loading failure.
    * **`UC-FAC-03 (Room Reservation)`**: Renamed to `ImageGUI/Facility/P-FAC-03-AF01-reservation-limit-reached.jpg` (*Figure P-FAC-03-AF01 – Reservation Limit Reached*) and `ImageGUI/Facility/P-FAC-03-AF02-time-slot-conflict.jfif` (*Figure P-FAC-03-AF02 – Time Slot Conflict*) illustrating max active booking limits and schedule overlap warning popups.
    * **`UC-FAC-04 (Canceling Room Reservation)`**: Renamed to `ImageGUI/Facility/P-FAC-04-AF01-late-cancellation-warning.jfif` (*Figure P-FAC-04-AF01 – Late Cancellation Warning*) depicting penalty / late cancellation warning dialogs.
    * **`UC-BK-06 (Canceling Book Reservation)`**: Added and renamed prototype screen `ImageGUI/Books/P-BK-06-AF01-cancellation-failed-network-error.jfif` (*Figure P-BK-06-AF01 – Cancellation Failed (Network Error)*) depicting network transaction error popups when canceling a hold.
    * **`UC-FAC-06 (Canceling Study Group)`**: Added and renamed prototype screen `ImageGUI/Facility/P-FAC-06-AF01-disband-group-failed.jfif` (*Figure P-FAC-06-AF01 – Disband Study Group Failed*) illustrating failure dialogs when disbanding an active study group.
    * **`UC-ADM-07 (View Statistics)`**: Renamed to `ImageGUI/Admin/P-ADM-07-AF01-empty-statistics-data.jfif` (*Figure P-ADM-07-AF01 – Empty Statistics Data*) showing empty state charts when no analytical data is available.
  * Updated all image tag references, `alt` attributes, and figure captions across `Use-CaseSpecification.md` in both PA3 and PA4 to match the standardized file names.

#### 5. Removal / Omission of Alternative Flows for UC-FAC-05 and UC-FAC-07
* **Documents:** `management/PA3/Use-CaseSpecification.md` & `management/PA4/Use-CaseSpecification.md`
* **Issue:** `UC-FAC-05 (Creating Study Group)` and `UC-FAC-07 (Updating Study Group Information)` previously listed redundant exception flow branches for form validation that belong within standard inline form handling.
* **Modification:** Omitted alternative flows for both `UC-FAC-05` and `UC-FAC-07` by setting `Alternative / Exception Flows` to `None`, streamlining their specification tables to focus on core execution logic.
