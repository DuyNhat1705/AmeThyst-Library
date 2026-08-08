# Document Changes Log (Use Case Diagram & Specification Refinements)

This document tracks all corrections, actor standardizations, UML relationship adjustments, diagram synchronizations, and specification updates made across `docs/management/PA4/Use-CaseDiagram.md`, `docs/management/PA4/Use-CaseSpecification.md`, and related PA3 files.

---

## Summary of Issues Addressed

* **Official Use Case ID Integration:** Added explicit Use Case IDs (e.g., `UC-AUTH-01`, `UC-BK-01`, `UC-ADM-01`) directly into every Mermaid diagram node.
* **Generalization Relationship Correction:** Replaced misused generalization (`-->`) arrows with proper `<<include>>` and `<<extend>>` dependencies for sub-routines, validation workflows (e.g., PIN verification), and helper utilities.
* **Actor Label Standardization:** Normalized all actor names across all diagrams (`Logged User`, `General User`, `Guest`, `User`, `Librarian`, `Admin`, `Study Group Creator`, `Other User`) to ensure strict consistency with the Regulation schema and fixed visual typos.
* **Actor Hierarchy & Abstract Node Simplification:** Streamlined redundant parallel inheritance lines in the Regulation hierarchy by leveraging transitive inheritance (`Logged User` $
ightarrow$ `General User`) and restructured abstract organizational use cases into modular functional workflows.
* **100% Diagram Synchronization:** Synchronized all 9 Mermaid flowchart diagrams between `Use-CaseDiagram.md` and `Use-CaseSpecification.md` to be 100% byte-for-byte identical.
* **Prototype Screen Additions & Standardized Naming for Alternative/Exception Flows:** Added dedicated UI prototype mockup figures for alternative and exception flows across Facility Reservation, Books, Study Group, and Administration use cases (`UC-FAC-01`, `UC-FAC-03`, `UC-FAC-04`, `UC-BK-06`, `UC-FAC-06`, `UC-ADM-07`), standardizing all file names to the `P-[UC-ID]-[BF|AF]0X-[kebab-case-description].[ext]` naming convention.
* **Omission of Alternative Flows for UC-FAC-05 & UC-FAC-07:** Removed unnecessary alternative exception flows for `UC-FAC-05 (Creating Study Group)` and `UC-FAC-07 (Updating Study Group Information)`, simplifying them to operate directly within standard validation boundaries.

---

## Detailed List of Refinements

### 1. Integration of Official Use Case IDs across Diagrams
* **Documents:** `management/PA4/Use-CaseDiagram.md` & `management/PA4/Use-CaseSpecification.md` (and PA3 counterparts)
* **Issue:** Diagram nodes in `Use-CaseDiagram.md` lacked official Use Case IDs (e.g. `UC-AUTH-01`, `UC-BK-01`, `UC-FAC-01`).
* **Modification:** Updated node definitions in all Mermaid diagrams across `Use-CaseDiagram.md` to display centered explicit IDs with HTML line breaks (`<center>UC-AUTH-01:<br>Register</center>`, `<center>UC-BK-01:<br>Book Searching</center>`, `<center>UC-ADM-01:<br>View User Account</center>`).

### 2. Regulation Actor Hierarchy Simplification
* **Documents:** `management/PA4/Use-CaseDiagram.md` & `management/PA4/Use-CaseSpecification.md` (Regulation Section)
* **Issue:** `Admin`, `User`, and `Librarian` inherited directly from both `Logged User` AND `General User`, creating redundant parallel inheritance lines.
* **Modification:** Simplified the hierarchy using transitive inheritance: `Logged User` inherits from `General User` (`LoggedUser --> GeneralUser`). Concrete roles `User`, `Librarian`, and `Admin` inherit strictly from `Logged User` (`User --> LoggedUser`, etc.), while `Guest` inherits from `General User` (`Guest --> GeneralUser`).

### 3. Actor Label Regularization and Typo Corrections
* **Documents:** `management/PA4/Use-CaseDiagram.md` & `management/PA4/Use-CaseSpecification.md` (All Diagram Sections)
* **Issue:** Inconsistent actor labels, typos (`logged user`, `user`, `other user`, `study group creator`), and misspelled titles (`AI Recommendation`, `View Recommended Book`).
* **Modification:** 
  * Regularized all actor labels to match the Regulation schema (`Logged User`, `General User`, `Guest`, `User`, `Librarian`, `Admin`, `Study Group Creator`, `Other User`).
  * Fixed typos in AI Recommendation (`AI Recommendation`, `View Recommended Book`) and Profile Management (`logged user` $
ightarrow$ `Logged User`).

### 4. Correction of UML Relationship Arrows & Dependency Types 
* **Documents:** `management/PA4/Use-CaseDiagram.md` & `management/PA4/Use-CaseSpecification.md`
* **Issue:** Solid generalization (`-->`) arrows misused for sub-routines, validation steps, and helper tools.
* **Modification:**
  * **Librarian Administration:** Converted `Confirming Book Borrowed` (`UC8`) and `Confirming Room Checkin` (`UC9`) to `<<include>>` dependencies pointing to `Verifying Pin` (`UC7`).
  * **Books Exploration:** Converted `Generating Pin` (`UC_GenPin`) to an `<<include>>` dependency of `Creating Book Reservation` (`UC_CreateReserve`).
  * **Study Group:** Converted helper actions (`Finding User By Email` to `<<include>>` under `Inviting Others`, `View Other Profile` to `<<extend>>` under `Interacting with Others`, `Managing Join Request` and `Out Study Group` to `<<include>>` under `Interacting with Study Group`).
  * **Admin Administration:** Converted `Role Control` (`UC4`) and `Use-case Permission` (`UC5`) to `<<include>>` dependencies pointing to `Authorization` (`UC3`).

### 5. Full Diagram Synchronization
* **Documents:** `management/PA4/Use-CaseDiagram.md` & `management/PA4/Use-CaseSpecification.md`
* **Issue:** Minor formatting and whitespace discrepancies between diagrams in `Use-CaseDiagram.md` and `Use-CaseSpecification.md`.
* **Modification:** Fully synchronized all 9 Mermaid flowchart blocks so that every diagram block in `Use-CaseSpecification.md` is 100% byte-for-byte identical to `Use-CaseDiagram.md`.

### 6. Addition of UI Mockup Prototypes for Alternative & Exception Flows
* **Documents:** `management/PA4/Use-CaseSpecification.md` & `management/PA3/Use-CaseSpecification.md`
* **Issue:** Specification tables lacked visual prototype figures for alternative/exception flows.
* **Modification:**
  * Newly added prototype images:
    * **`UC-FAC-01 (View Library Map)`**: `ImageGUI/Facility/P-FAC-01-AF01-library-map-unavailable.jfif` (*Figure P-FAC-01-AF01 – Library Map Unavailable*) illustrating map graphics loading failure.
    * **`UC-FAC-03 (Room Reservation)`**: `ImageGUI/Facility/P-FAC-03-AF01-reservation-limit-reached.jpg` (*Figure P-FAC-03-AF01 – Reservation Limit Reached*) and `ImageGUI/Facility/P-FAC-03-AF02-time-slot-conflict.jfif` (*Figure P-FAC-03-AF02 – Time Slot Conflict*) illustrating max active booking limits and schedule overlap warning popups.
    * **`UC-FAC-04 (Canceling Room Reservation)`**: `ImageGUI/Facility/P-FAC-04-AF01-late-cancellation-warning.jfif` (*Figure P-FAC-04-AF01 – Late Cancellation Warning*) depicting penalty / late cancellation warning dialogs.
    * **`UC-BK-06 (Canceling Book Reservation)`**: prototype screen `ImageGUI/Books/P-BK-06-AF01-cancellation-failed-network-error.jfif` (*Figure P-BK-06-AF01 – Cancellation Failed (Network Error)*) depicting network transaction error popups when canceling a hold.
    * **`UC-FAC-06 (Canceling Study Group)`**: prototype screen `ImageGUI/Facility/P-FAC-06-AF01-disband-group-failed.jfif` (*Figure P-FAC-06-AF01 – Disband Study Group Failed*) illustrating failure dialogs when disbanding an active study group.
    * **`UC-ADM-07 (View Statistics)`**: `ImageGUI/Admin/P-ADM-07-AF01-empty-statistics-data.jfif` (*Figure P-ADM-07-AF01 – Empty Statistics Data*) showing empty state charts when no analytical data is available.
  * Updated all image tag references, `alt` attributes, and figure captions across `Use-CaseSpecification.md` in both PA3 and PA4 to match the standardized file names.

### 7. Removal of Alternative Flows for UC-FAC-05 and UC-FAC-07
* **Documents:** `management/PA4/Use-CaseSpecification.md` & `management/PA3/Use-CaseSpecification.md`
* **Issue:** `UC-FAC-05 (Creating Study Group)` and `UC-FAC-07 (Updating Study Group Information)` previously listed redundant exception flow branches for form validation that belong within standard inline form handling.
* **Modification:** Omitted alternative flows for both `UC-FAC-05` and `UC-FAC-07` by setting `Alternative / Exception Flows` to `None`, streamlining their specification tables to focus on core execution logic.
