# Document Changes Log (Use Case Diagram & Specification Refinements)

This document tracks all corrections, actor standardizations, UML relationship adjustments, and diagram synchronizations made across `docs/management/PA3/Use-CaseDiagram.md` and `docs/management/PA3/Use-CaseSpecification.md` based on review feedback in `check.md`.

---

## Summary of Issues Addressed

* **Official Use Case ID Integration:** Added explicit Use Case IDs (e.g., `UC-AUTH-01`, `UC-BK-01`, `UC-ADM-01`) directly into every Mermaid diagram node.
* **Generalization Relationship Correction:** Replaced misused generalization (`-->`) arrows with proper `<<include>>` and `<<extend>>` dependencies for sub-routines, validation workflows (e.g., PIN verification), and helper utilities.
* **Actor Label Standardization:** Normalized all actor names across all diagrams (`Logged User`, `General User`, `Guest`, `User`, `Librarian`, `Admin`, `Study Group Creator`, `Other User`) to ensure strict consistency with the Regulation schema and fixed visual typos.
* **Actor Hierarchy & Abstract Node Simplification:** Streamlined redundant parallel inheritance lines in the Regulation hierarchy by leveraging transitive inheritance (`Logged User` $\rightarrow$ `General User`) and restructured abstract organizational use cases into modular functional workflows.
* **100% Diagram Synchronization:** Synchronized all 9 Mermaid flowchart diagrams between `Use-CaseDiagram.md` and `Use-CaseSpecification.md` to be 100% byte-for-byte identical.

---

## Detailed List of Refinements

### 1. Integration of Official Use Case IDs across Diagrams
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md`
* **Issue:** Diagram nodes in `Use-CaseDiagram.md` lacked official Use Case IDs (e.g. `UC-AUTH-01`, `UC-BK-01`, `UC-FAC-01`).
* **Modification:** Updated node definitions in all Mermaid diagrams across `Use-CaseDiagram.md` to display centered explicit IDs with HTML line breaks (`<center>UC-AUTH-01:<br>Register</center>`, `<center>UC-BK-01:<br>Book Searching</center>`, `<center>UC-ADM-01:<br>View User Account</center>`).

### 2. Regulation Actor Hierarchy Simplification
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md` (Regulation Section)
* **Issue:** `Admin`, `User`, and `Librarian` inherited directly from both `Logged User` AND `General User`, creating redundant parallel inheritance lines.
* **Modification:** Simplified the hierarchy using transitive inheritance: `Logged User` inherits from `General User` (`LoggedUser --> GeneralUser`). Concrete roles `User`, `Librarian`, and `Admin` inherit strictly from `Logged User` (`User --> LoggedUser`, etc.), while `Guest` inherits from `General User` (`Guest --> GeneralUser`).

### 3. Actor Label Regularization and Typo Corrections
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md` (All Diagram Sections)
* **Issue:** Inconsistent actor labels, typos (`logged user`, `user`, `other user`, `study group creator`), and misspelled titles (`AI Recommedation`, `View Recomended Book`).
* **Modification:** 
  * Regularized all actor labels to match the Regulation schema (`Logged User`, `General User`, `Guest`, `User`, `Librarian`, `Admin`, `Study Group Creator`, `Other User`).
  * Fixed typos in AI Recommendation (`AI Recommendation`, `View Recommended Book`) and Profile Management (`logged user` $\rightarrow$ `Logged User`).

### 4. Correction of UML Relationship Arrows & Dependency Types 
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md`
* **Issue:** Solid generalization (`-->`) arrows misused for sub-routines, validation steps, and helper tools.
* **Modification:**
  * **Librarian Administration:** Converted `Confirming Book Borrowed` (`UC8`) and `Confirming Room Checkin` (`UC9`) to `<<include>>` dependencies pointing to `Verifying Pin` (`UC7`).
  * **Books Exploration:** Converted `Generating Pin` (`UC_GenPin`) to an `<<include>>` dependency of `Creating Book Reservation` (`UC_CreateReserve`).
  * **Study Group:** Converted helper actions (`Finding User By Email` to `<<include>>` under `Inviting Others`, `View Other Profile` to `<<extend>>` under `Interacting with Others`, `Managing Join Request` and `Out Study Group` to `<<include>>` under `Interacting with Study Group`).
  * **Admin Administration:** Converted `Role Control` (`UC4`) and `Use-case Permission` (`UC5`) to `<<include>>` dependencies pointing to `Authorization` (`UC3`).

### 5. Full Diagram Synchronization
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md`
* **Issue:** Minor formatting and whitespace discrepancies between diagrams in `Use-CaseDiagram.md` and `Use-CaseSpecification.md`.
* **Modification:** Fully synchronized all 9 Mermaid flowchart blocks so that every diagram block in `Use-CaseSpecification.md` is 100% byte-for-byte identical to `Use-CaseDiagram.md`.
