# Document Changes Log (Use Case Diagram & Specification Refinements)

This document tracks corrections, actor standardizations, UML relationship adjustments, diagram synchronizations, and specification refinements made across `docs/management/PA4/Use-CaseDiagram.md` and `docs/management/PA4/Use-CaseSpecification.md`.

---

## Summary of Issues Addressed

* **Official Use Case ID Integration:** Added explicit Use Case IDs (for example, `UC-AUTH-01`, `UC-BK-01`, and `UC-ADM-01`) directly into every Mermaid diagram node.
* **Generalization Relationship Correction:** Replaced misused generalization (`-->`) arrows with appropriate actor generalizations, associations, `<<include>>`, and `<<extend>>` relationships.
* **Actor Label Standardization:** Normalized actor names across all diagrams using `Platform User`, `Visitor`, `Authenticated User`, `Reader (Patron)`, `Librarian`, and `System Administrator`.
* **Actor Hierarchy & Contextual Role Clarification:** Defined Study Group Host, Study Group Member, and Prospective Member as contextual specializations of Reader rather than independent application roles.
* **Full Diagram Synchronization:** Synchronized all 9 Mermaid diagrams between `Use-CaseDiagram.md` and `Use-CaseSpecification.md`.
* **Study Group Coverage Completion:** Added `UC-SG-11 (Review Join Request)` and `UC-SG-12 (Respond to Invitation)` to both the diagram model and the specification, including the implemented Host review and invitee-response workflows.
* **Prototype Screen Additions & Standardized Naming:** Retained dedicated UI prototype figures for basic, alternative, and exception flows using the `P-[UC-ID]-[BF|AF]0X-[kebab-case-description].[ext]` naming convention.
* **Alternative Flow Refinement:** Updated Facility and Study Group validation branches so that the specifications describe implemented validation, concurrency, ownership, and time-window rules.

---

## Detailed List of Refinements

### 1. Integration of Official Use Case IDs across Diagrams

* **Documents:** `management/PA4/Use-CaseDiagram.md` and `management/PA4/Use-CaseSpecification.md`
* **Issue:** Diagram nodes lacked consistent official Use Case IDs or used duplicate identifiers.
* **Modification:** Updated every concrete use-case node to display its official ID and name with centered HTML line breaks, such as `<center>UC-AUTH-01:<br/>Register</center>`, `<center>UC-BK-01:<br/>Book Searching</center>`, and `<center>UC-ADM-01:<br/>Manage User Accounts</center>`. The Study Group sequence now also includes `UC-SG-11` and `UC-SG-12` without reusing an existing ID.

### 2. Regulation Actor Hierarchy Simplification

* **Documents:** `management/PA4/Use-CaseDiagram.md` and `management/PA4/Use-CaseSpecification.md` (Actor Regulation section)
* **Issue:** The previous hierarchy mixed `Guest`, `General User`, `Logged User`, and `User`, causing unclear or redundant inheritance relationships.
* **Modification:** Standardized the hierarchy as follows:
  * `Visitor` and abstract `Authenticated User` specialize abstract `Platform User`.
  * `Reader (Patron)`, `Librarian`, and `System Administrator` specialize `Authenticated User`.
  * `Reader (Patron)` maps to the persisted application role `user`.
  * `Study Group Host`, `Study Group Member`, and `Prospective Member` specialize Reader only within the Study Group context.

### 3. Actor Label Regularization and Typo Corrections

* **Documents:** `management/PA4/Use-CaseDiagram.md` and `management/PA4/Use-CaseSpecification.md` (all diagram and specification sections)
* **Issue:** Actor labels such as `logged user`, `General User`, `User`, `Other User`, and `Study Group Creator` were used inconsistently.
* **Modification:**
  * Replaced ambiguous actor labels with the Actor Regulation terminology.
  * Assigned public catalog, facility-information, and Study Group discovery flows to `Platform User`.
  * Assigned profile-management flows to `Authenticated User`.
  * Assigned wishlist, book reservation, room reservation, pickup PIN, and AI recommendation flows to `Reader`.
  * Regularized contextual Study Group actors as Host, Member, and Prospective Member.
  * Corrected use-case names and spelling, including `Forgot Password`, `Verify OTP`, `Reset Password`, `Confirm Room Check-in`, and `Renew Recommendations`.

### 4. Correction of UML Relationship Arrows & Dependency Types

* **Documents:** `management/PA4/Use-CaseDiagram.md` and `management/PA4/Use-CaseSpecification.md`
* **Issue:** Solid generalization arrows and abstract organizational nodes were previously used for helper routines and concrete actor goals.
* **Modification:**
  * **Authentication:** `Register` includes `Verify Email`; `Forgot Password` includes `Verify OTP` and `Reset Password`.
  * **Profile Management:** `Edit Profile`, `Change Avatar`, and `Change Password` extend `View Self Profile`.
  * **Books Exploration:** `Filter Books` extends `Book Searching`; `Manage Wishlist` and `Reserve Book` extend `View Book Detail`. Pickup PIN generation remains a later Reader action rather than part of reservation creation.
  * **Facility Reservation:** `View Facility Information` extends `View Library Map`; `Create Study Group` includes `Reserve Room` for the selected slot.
  * **Study Group:** `Invite Member` includes `Find User by Email`; `View Other Profile` extends `View Study Group Detail`. Public filtering is directly associated with `Platform User` because it can operate on the default listing without a prior search. `Review Join Request` is assigned to the Host, while `Respond to Invitation` is assigned to the invited Prospective Member; both are contextual Reader roles and match the implemented decision endpoints.
  * **AI Recommendations:** `Manage Wishlist` and `Renew Recommendations` extend `View Recommended Books`, preserving the optional actions available from the recommendation view.
  * **Librarian Administration:** Book borrowing, book return, and room check-in include PIN verification where applicable; book return includes `Assess Return and Penalty`.
  * **System Administration:** `Export User CSV` extends `Manage User Accounts`; `Promote or Demote Account` and `Invite Administrator` are included role-assignment actions.

### 5. Full Diagram Synchronization

* **Documents:** `management/PA4/Use-CaseDiagram.md` and `management/PA4/Use-CaseSpecification.md`
* **Issue:** Diagram content, IDs, actor labels, relationship types, and whitespace differed between the standalone and embedded versions.
* **Modification:** Synchronized all 9 Mermaid blocks while retaining the original diagram directions, actor placement, grouping style, and valid associations. Layout changes are limited to accommodating corrected actor labels and newly added use cases; each block was render-checked so actors, use cases, and relationship labels remain readable without overlapping.

### 6. Addition of UI Mockup Prototypes for Alternative & Exception Flows

* **Document:** `management/PA4/Use-CaseSpecification.md`
* **Issue:** Several specification tables lacked visual references for important basic, alternative, or exception flows.
* **Modification:** Retained and standardized prototype references including:
  * **`UC-FAC-01 (View Library Map)`**: map display and map-unavailable states.
  * **`UC-FAC-03 (Reserve Room)`**: reservation, active-limit, and slot-conflict states.
  * **`UC-FAC-04 (Cancel Room Reservation)`**: reservation cancellation screens; the legacy late-cancellation prototype is explicitly marked for later image refresh.
  * **`UC-BK-06 (Cancel Book Reservation)`**: reservation dashboard, confirmation, and transaction-failure states.
  * **`UC-FAC-06 (Dissolve Study Group)`**: Study Group management and dissolution-failure states.
  * **`UC-SG-11 (Review Join Request)`**: the prototype row includes the Host's request-review interface together with its bell and email notification results.
  * **`UC-SG-12 (Respond to Invitation)`**: the prototype row includes the invitee-response interface followed by its bell and email notification results.
  * **`UC-ADM-07 (View Statistics)`**: statistics dashboard and empty-data states.
* **Naming:** Image paths, `alt` attributes, and figure captions continue to follow the established prototype naming scheme. The supplied SG-11 and SG-12 screenshots are embedded with responsive sizing and centered presentation.

### 7. Refinement of Implemented Facility and Study Group Flows

* **Document:** `management/PA4/Use-CaseSpecification.md`
* **Issue:** The earlier alternative flows described unsupported blocklists, editable capacity boundaries, or generic validation behavior that did not match the implemented workflow. The implemented join-request review and invitation-response workflows were also absent from the specification.
* **Modification:**
  * **`UC-FAC-05 (Create Study Group)`** now covers invalid required details, more than five requirements, and a room slot becoming unavailable during the transaction.
  * **`UC-FAC-07 (Update Study Group)`** now covers unsupported or invalid values, more than five requirements, and a Study Group that is no longer manageable.
  * **`UC-SG-11 (Review Join Request)`** now has a complete specification table covering Host-only authorization, pending request validation, approve/deny branches, member-count and group-status updates, transaction locking, stale decisions, concurrent capacity changes, postconditions, and special requirements.
  * **`UC-SG-12 (Respond to Invitation)`** now has a complete specification table covering invitation-recipient authorization, accept/decline branches, capacity validation, atomic membership updates, stale invitations, concurrent capacity changes, postconditions, and special requirements.
  * All four flows preserve the existing specification-table structure while aligning their postconditions with the transactional behavior of the current system.
