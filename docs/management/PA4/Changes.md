# Document Changes Log (Use Case Diagram & Specification Refinements)

This document tracks all corrections, actor standardizations, UML relationship adjustments, and diagram synchronizations made across `docs/management/PA3/Use-CaseDiagram.md` and `docs/management/PA3/Use-CaseSpecification.md` based on review feedback in `check.md`.

---

## Summary of Issues Addressed

1. **Clean Actor Inheritance Hierarchy (Regulation):** Replaced redundant parallel actor generalization lines with a clean multi-level hierarchy (`Logged User` inherits from `General User`; `User`, `Librarian`, and `Admin` inherit from `Logged User`; `Guest` inherits from `General User`).
2. **Actor Label Regularization & Formatting:** Standardized all actor names across diagrams to align with the Regulation schema (fixing capitalization and typos: `Logged User`, `General User`, `Guest`, `User`, `Librarian`, `Admin`, `Study Group Creator`, `Other User`).
3. **Correction of Misused UML Generalizations:** Replaced improper generalization (`-->`) arrows with `<<include>>` or `<<extend>>` dependencies for helper tools, validation steps, and subroutines across Librarian Administration, Books Exploration, Study Group, and Admin Administration.
4. **Diagram & Specification Synchronization:** Ensured 100% complete synchronization of all Mermaid diagrams between `Use-CaseDiagram.md` and `Use-CaseSpecification.md`.

---

## Detailed List of Refinements

### 1. Regulation Actor Hierarchy Simplification
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md` (Regulation Section)
* **Issue:** `Admin`, `User`, and `Librarian` inherited directly from both `Logged User` AND `General User`, creating redundant parallel inheritance lines.
* **Modification:** Simplified the hierarchy using transitive inheritance: `Logged User` inherits from `General User` (`LoggedUser --> GeneralUser`). Concrete roles `User`, `Librarian`, and `Admin` inherit strictly from `Logged User` (`User --> LoggedUser`, etc.), while `Guest` inherits from `General User` (`Guest --> GeneralUser`).

### 2. Actor Label Regularization and Typo Corrections
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md` (All Diagram Sections)
* **Issue:** Inconsistent actor labels, typos (`logged user`, `user`, `other user`, `study group creator`), and misspelled titles (`AI Recommedation`, `View Recomended Book`).
* **Modification:** 
  * Regularized all actor labels to match the Regulation schema (`Logged User`, `General User`, `Guest`, `User`, `Librarian`, `Admin`, `Study Group Creator`, `Other User`).
  * Fixed typos in AI Recommendation (`AI Recommendation`, `View Recommended Book`) and Profile Management (`logged user` $\rightarrow$ `Logged User`).

### 3. Correction of UML Relationship Arrows & Dependency Types (from check.md)
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md`
* **Issue:** Solid generalization (`-->`) arrows misused for sub-routines, validation steps, and helper tools.
* **Modification:**
  * **Librarian Administration:** Converted `Confirming Book Borrowed` (`UC8`) and `Confirming Room Checkin` (`UC9`) to `<<include>>` dependencies pointing to `Verifying Pin` (`UC7`).
  * **Books Exploration:** Converted `Generating Pin` (`UC_GenPin`) to an `<<include>>` dependency of `Creating Book Reservation` (`UC_CreateReserve`).
  * **Study Group:** Converted helper actions (`Finding User By Email` to `<<include>>` under `Inviting Others`, `View Other Profile` to `<<extend>>` under `Interacting with Others`, `Managing Join Request` and `Out Study Group` to `<<include>>` under `Interacting with Study Group`).
  * **Admin Administration:** Converted `Role Control` (`UC4`) and `Use-case Permission` (`UC5`) to `<<include>>` dependencies pointing to `Authorization` (`UC3`).

### 4. Diagram Synchronization across Documentation Files
* **Documents:** `management/PA3/Use-CaseDiagram.md` & `management/PA3/Use-CaseSpecification.md`
* **Issue:** Discrepancies between main diagrams in `Use-CaseDiagram.md` and embedded diagrams in `Use-CaseSpecification.md`.
* **Modification:** Synchronized all 9 Mermaid flowchart blocks across both documents to maintain identical actor names, layout structures, and relationship arrows.