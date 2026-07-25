# AI Usage Report

    Project: Modern Library Management System 
    Course: CS300 – CSC13002 – Introduction to Software Engineering 
    Group ID: 03
    Group Name: AmeThyst 
    Assignment: PA3-2026

Performed by: All Members | Reviewed by: All Members | Edited by: Vũ Duy Nhất

## Table of Contents

- [AI Usage Report](#ai-usage-report)
  - [Table of Contents](#table-of-contents)
  - [I. 24127028 - Trần Lê Hoàng Gia](#i-24127028---trần-lê-hoàng-gia)
    - [Note 1 - Renew Button UI Refinement](#note-1---renew-button-ui-refinement)
    - [Note 2 - GraphSAGE Post-Training Model State Capture](#note-2---graphsage-post-training-model-state-capture)
    - [Note 3 - PostgreSQL Schema Constraint Modifications for Inventory Dynamics](#note-3---postgresql-schema-constraint-modifications-for-inventory-dynamics)
    - [Note 4 - Mermaid Actor Syntax Guidance](#note-4---mermaid-actor-syntax-guidance)
    - [Note 5 - Image-to-Mermaid Structural Conversion](#note-5---image-to-mermaid-structural-conversion)
    - [Note 6 - Automated Use Case Specification Drafting](#note-6---automated-use-case-specification-drafting)
    - [Note 7 - HTML Document Page Break Formatting](#note-7---html-document-page-break-formatting)
    - [Note 8 - HTML Table Template for Use Case Specifications](#note-8---html-table-template-for-use-case-specifications)
    - [Note 9 - Diagram Zooming and Pan Interaction Design](#note-9---diagram-zooming-and-pan-interaction-design)
  - [II. 24127082 - Phan Lê Anh Minh](#ii-24127082---phan-lê-anh-minh)
    - [Note 1 - Configure Announcement Backend](#note-1---configure-announcement-backend)
    - [Note 2 - Add Announcement Notification Bell and Reading View](#note-2---add-announcement-notification-bell-and-reading-view)
    - [Note 3 - Align Authentication Tests with Business Scenarios and Tags](#note-3---align-authentication-tests-with-business-scenarios-and-tags)
    - [Note 4 - Add Real-Time Announcement Updates with Socket.IO](#note-4---add-real-time-announcement-updates-with-socketio)
  - [III. 24127398 - Nguyễn Nhựt Huy](#iii-24127398---nguyễn-nhựt-huy)
    - [Note 1 - Librarian Book Management UI Design (4-Tab Dashboard)](#note-1---librarian-book-management-ui-design-4-tab-dashboard)
    - [Note 2 - Freely Room Reservation Feature (End-to-End) + Room Localization \& Card Redesign](#note-2---freely-room-reservation-feature-end-to-end--room-localization--card-redesign)
    - [Note 3 - Room Reservation UI/UX Improvements, Dark Mode Contrast, Date Validation \& Branch Name Display](#note-3---room-reservation-uiux-improvements-dark-mode-contrast-date-validation--branch-name-display)
    - [Note 4 - Book Return \& Inspection System (US1–US7 Implementation)](#note-4---book-return--inspection-system-us1us7-implementation)
    - [Note 5 - Borrow Book Split, Classification, Lost+Overdue Fix, Extend Due Date \& Debt Guard](#note-5---borrow-book-split-classification-lostoverdue-fix-extend-due-date--debt-guard)
  - [IV. 24127408 - Nguyễn Lê Hoàng Khải](#iv-24127408---nguyễn-lê-hoàng-khải)
    - [Note 1 - Building the Study Group specification with Spec Kit](#note-1---building-the-study-group-specification-with-spec-kit)
    - [Note 2 - Clarifying requirements and resolving specification conflicts](#note-2---clarifying-requirements-and-resolving-specification-conflicts)
    - [Note 3 - Producing the implementation plan, tasks, and consistency analysis](#note-3---producing-the-implementation-plan-tasks-and-consistency-analysis)
    - [Note 4 - Inspecting the schema and integrating the reservation-backed backend](#note-4---inspecting-the-schema-and-integrating-the-reservation-backed-backend)
    - [Note 5 - Replacing mock data while restoring the original frontend design](#note-5---replacing-mock-data-while-restoring-the-original-frontend-design)
    - [Note 6 - Correcting lifecycle, authorization, cooldown, and duplicate participation logic](#note-6---correcting-lifecycle-authorization-cooldown-and-duplicate-participation-logic)
    - [Note 7 - Adding realtime updates through the existing Socket.IO architecture](#note-7---adding-realtime-updates-through-the-existing-socketio-architecture)
    - [Note 8 - Designing database-driven Study Together filters](#note-8---designing-database-driven-study-together-filters)
    - [Note 9 - Refining confirmation dialogs and management popups](#note-9---refining-confirmation-dialogs-and-management-popups)
    - [Note 10 - Refining Study Card formatting, spacing, and responsive dimensions](#note-10---refining-study-card-formatting-spacing-and-responsive-dimensions)
    - [Note 11 - Fixing creator-owned cards with “Your Group”](#note-11---fixing-creator-owned-cards-with-your-group)
    - [Note 12 - Completing Study Group discovery and dashboard behavior](#note-12---completing-study-group-discovery-and-dashboard-behavior)
    - [Note 13 - Adding email invitations and the shared notification bell](#note-13---adding-email-invitations-and-the-shared-notification-bell)
    - [Note 14 - Adding lifecycle email and browser notifications](#note-14---adding-lifecycle-email-and-browser-notifications)
    - [Note 15 - Synchronizing Dashboard Calendar \& Overview](#note-15---synchronizing-dashboard-calendar--overview)
    - [Note 16 - Adding profile previews to Study Group popups](#note-16---adding-profile-previews-to-study-group-popups)
    - [Note 17 - Adding URL-addressable Study Group details](#note-17---adding-url-addressable-study-group-details)
    - [Note 18 - Refining the notification timeline and scrollbars](#note-18---refining-the-notification-timeline-and-scrollbars)
    - [Note 19 - Completing Study Group communications, stale navigation, confirmation UI, and use-case review](#note-19---completing-study-group-communications-stale-navigation-confirmation-ui-and-use-case-review)
    - [Note 20 - Hardening Study Group logic with Spec Kit](#note-20---hardening-study-group-logic-with-spec-kit)
  - [V. 24127095 - Vũ Duy Nhất](#v-24127095---vũ-duy-nhất)
    - [Note 1 - Redesign table for invitation and request feature](#note-1---redesign-table-for-invitation-and-request-feature)
    - [Note 2 - Tech stack table used in Demo Video](#note-2---tech-stack-table-used-in-demo-video)
    - [Note 3 - Find out about WebSocket on Real-time feature](#note-3---find-out-about-websocket-on-real-time-feature)
    - [Note 4 - Find out about AWS Cloud for deploy service](#note-4---find-out-about-aws-cloud-for-deploy-service)

## I. 24127028 - Trần Lê Hoàng Gia

### Note 1 - Renew Button UI Refinement

* **Tool Name, Version, and Platform:** Gemini
* **Access time (Date and Hour):** 2026-07-20 10:00 AM
* **Prompts used:** "How to refine and style a rounded SVG arrow icon for a 'renew' action button in a web frontend?"
* **Purpose of use:** UI refinement — polishing component visual aesthetics.
* **Content Generated by AI:** CSS and SVG snippet options for rendering a clean circular/rounded arrow icon.
* **Independent Content & Student Validation:** Adapted the CSS transitions and SVG paths to align with the project's established styling theme.

---

### Note 2 - GraphSAGE Post-Training Model State Capture

* **Tool Name, Version, and Platform:** Gemini
* **Access time:** 2026-07-20 
* **Prompts used:** "How to write a script to take a snapshot/checkpoint of model weights and graph embeddings after the GraphSAGE training phase?"
* **Purpose of use:** Machine Learning workflow — persisting GraphSAGE model artifacts post-training.
* **Content Generated by AI:** Code pattern for saving PyTorch Geometric / GraphSAGE model states and logging evaluation metrics.
* **Independent Content & Student Validation:** Verified model checkpointing parameters and integrated snapshot exports into the graph pipeline execution flow.

---

### Note 3 - PostgreSQL Schema Constraint Modifications for Inventory Dynamics

* **Tool Name, Version, and Platform:** Gemini
* **Access time:** 2026-07-21 
* **Prompts used:** "How to update DDL constraints for book insertion and deletion in a PostgreSQL database to enforce non-negative stock and referential integrity?"
* **Purpose of use:** Database management — updating schema constraints for safe stock updates.
* **Content Generated by AI:** SQL DDL script examples using `ALTER TABLE ... ADD CONSTRAINT` with `CHECK` and foreign key rules.
* **Independent Content & Student Validation:** Validated edge cases (e.g., dropping existing constraints safely) and applied updated migrations across staging environments.

---

### Note 4 - Mermaid Actor Syntax Guidance

* **Tool Name, Version, and Platform:** Gemini
* **Access time:** 2026-07-22
* **Prompts used:** "How to draw an actor in a Mermaid.js sequence or use case diagram?"
* **Purpose of use:** Documentation — learning correct Mermaid syntax for actor representation.
* **Content Generated by AI:** Syntax rules and code snippets illustrating actor notation in Mermaid syntax.
* **Independent Content & Student Validation:** Applied the syntax directly into the project's system modeling Markdown files.

---

### Note 5 - Image-to-Mermaid Structural Conversion

* **Tool Name, Version, and Platform:** Gemini
* **Access time:** 2026-07-22
* **Prompts used:** "Convert this image/sketch of a use case workflow into clean Mermaid diagram code."
* **Purpose of use:** Diagram engineering — translating raw UI/use-case mockups into structural Markdown code.
* **Content Generated by AI:** Generated Mermaid block matching the workflow entities and connections.
* **Independent Content & Student Validation:** Reviewed flow syntax against our software requirements and fixed missing actor interactions.

---

### Note 6 - Automated Use Case Specification Drafting

* **Tool Name, Version, and Platform:** Gemini
* **Access time:** 2026-07-22 
* **Prompts used:** "Generate a structured use case specification document based on our vision document and use case diagram."
* **Purpose of use:** Technical documentation — authoring comprehensive functional specifications.
* **Content Generated by AI:** Draft specification outline including pre-conditions, main flow, alternative flows, and post-conditions.
* **Independent Content & Student Validation:** Edited steps to accurately match system boundaries and cross-checked alignment with PA2 requirements.

---

### Note 7 - HTML Document Page Break Formatting

* **Tool Name, Version, and Platform:** Gemini
* **Access time:** 2026-07-22
* **Prompts used:** "What HTML and CSS inline tags should I use for forcing page breaks and line breaks when converting Markdown/HTML reports to PDF?"
* **Purpose of use:** Documentation presentation — controlling PDF page layouts.
* **Content Generated by AI:** Explanation of `<div style="page-break-after: always;"></div>` and `<br>` styling practices.
* **Independent Content & Student Validation:** Embedded page break anchors before major document headers prior to exporting to PDF.

---

### Note 8 - HTML Table Template for Use Case Specifications

* **Tool Name, Version, and Platform:** Gemini
* **Access time:** 2026-07-23 
* **Prompts used:** "Create a clean HTML table format template suitable for embedding detailed use case specifications into Markdown files."
* **Purpose of use:** Document layout design — enhancing readability of specification tables.
* **Content Generated by AI:** Clean HTML `<table>` boilerplate with styled header rows, borders, and column spacing.
* **Independent Content & Student Validation:** Adopted the template structure across all project use case documentation files.

---

### Note 9 - Diagram Zooming and Pan Interaction Design

* **Tool Name, Version, and Platform:** Gemini
* **Access time:** 2026-07-23 
* **Prompts used:** "How can I enable interactive zoom in/out and panning behaviors on dynamic diagrams using JavaScript or SVG libraries?"
* **Purpose of use:** Frontend feature design — improving diagram usability within the UI.
* **Content Generated by AI:** Code example demonstrating library integration (e.g., svg-pan-zoom or D3 zoom parameters) with event listeners.
* **Independent Content & Student Validation:** Integrated zoom/pan handlers into the map component wrapper to enable full canvas navigation.

## II. 24127082 - Phan Lê Anh Minh

### Note 1 - Configure Announcement Backend

- **Tool Name, Version, and Platform:** Claude Code + SpecKit
- **Access time:** Fri Jul 10, approximately 11:27
- **Prompts used:**
  - `/speckit.specify` — "Implement the backend for the announcement feature. Support creating, listing, reading, editing, publishing or deactivating, deleting, and automatically expiring announcements. Protect management operations with authentication and librarian/admin role authorization. Add validation for required title and content and prevent an active announcement from using an expiration date in the past."
  - `/speckit.plan`
  - `/speckit.tasks`
  - `/speckit.implement`
  - "Create announcement model, service, controller, and route layers following the existing backend architecture."
  - "Add PostgreSQL schema changes for announcement data and document the REST API contract and data model."
  - "Register announcement routes in the server and librarian dashboard router."
  - "Create an announcement scheduler that periodically marks outdated active announcements as expired."
  - "Connect `LibrarianAnnouncementsPanel.tsx` to the backend and add English and Vietnamese validation messages."
- **Purpose of use:** Implement the announcement feature end to end on the backend, including persistence, role-protected CRUD operations, status transitions, expiration handling, validation, and initial librarian UI integration.
- **Content Generated by AI:**
  - `specs/021-announcement-backend/spec.md` — backend feature requirements
  - `specs/021-announcement-backend/contracts/api.md` — announcement API contract
  - `specs/021-announcement-backend/data-model.md` — announcement data model
  - `specs/021-announcement-backend/tasks.md` — implementation tasks
  - `announcement.models.mjs` — PostgreSQL announcement queries
  - `announcement.services.mjs` — validation, status transitions, pagination, editing, deletion, and expiration logic
  - `announcement.controllers.mjs` — HTTP request/response handlers
  - `announcement.routes.mjs` and `dashboard.librarian.routes.mjs` — protected CRUD routes
  - `announcementScheduler.mjs` — scheduled expiration processing
  - `server.mjs`, `package.json`, and database initialization SQL — route/scheduler registration and persistence support
  - `LibrarianAnnouncementsPanel.tsx`, `en.json`, and `vi.json` — backend integration and localized validation feedback
- **Independent Content & Student Validation:** The student reviewed the generated role guards and route structure, checked the SQL schema and model queries, and tested create, edit, status-change, delete, pagination, and expiration behavior. The student confirmed that invalid active expiration dates were rejected, verified that librarian/admin restrictions were enforced, and adjusted the panel integration to match the existing client API utilities and toast behavior.

---

### Note 2 - Add Announcement Notification Bell and Reading View

- **Tool Name, Version, and Platform:** Claude Code + SpecKit
- **Access time:** Sat Jul 11, approximately 19:26
- **Prompts used:**
  - `/speckit.specify` — "Remove `is_pinned` from the announcement database and UI, add a notification-bell dropdown on the navigation bar, and implement a full announcement reading-view overlay."
  - `/speckit.plan`
  - `/speckit.tasks`
  - `/speckit.implement`
  - "Create reusable bell and unread-dot atoms, a notification-bell molecule, a dropdown panel, and announcement notification list items. Integrate them into `AuthActions`."
  - "Create a `useAnnouncementBell` hook that fetches announcements, stores the latest seen announcement per user, and exposes unread state and mark-as-seen behavior."
  - "Create an `AnnouncementReadingModal` that opens from notification items, prevents background scrolling, and supports both light and dark LIMA theme tokens."
  - "Remove `is_pinned` from announcement forms, list items, management hooks, backend controllers, models, and services."
  - "Add English and Vietnamese notification, empty-state, reading-view, and accessibility strings."
  - "Update Atomic Design index exports and clean up announcement management components."
- **Purpose of use:** Decouple announcements from homepage pinning and add a user-facing notification and reading experience with unread-state tracking, localized UI, responsive dropdown behavior, and a themed full-content modal.
- **Content Generated by AI:**
  - `specs/025-announcement-notification-bell/` — specification, research, data model, plan, and tasks
  - `BellIcon.tsx` and `NotificationDot.tsx` — notification atoms
  - `NotificationBell.tsx`, `NotificationDropdownPanel.tsx`, and `AnnouncementNotificationItem.tsx` — notification molecules
  - `AnnouncementReadingModal.tsx` — full announcement reading overlay
  - `useAnnouncementBell.ts` — announcement fetch, last-seen storage, and unread-state logic
  - `AuthActions.tsx` — navbar notification integration
  - Announcement form, management list, list item, panel, manager hook, controller, model, and service changes removing `is_pinned`
  - `en.json` / `vi.json` and index files — translations, accessibility text, and exports
- **Independent Content & Student Validation:** The student verified that the unread dot was calculated per user and cleared when the dropdown opened, tested opening an announcement from the dropdown into the reading modal, and checked background scroll locking and close behavior. The student reviewed mobile overflow and responsive positioning, tested both language files and theme modes, and confirmed that removing `is_pinned` did not leave stale fields in the client or backend flow.

---

### Note 3 - Align Authentication Tests with Business Scenarios and Tags

- **Tool Name, Version, and Platform:** Claude Code + SpecKit
- **Access time:** Mon Jul 20, approximately 22:53
- **Prompts used:**
  - `/speckit.specify` — "Update the authentication registration test suite so it follows the business test cases in `specs/022-register-test-coverage`. Preserve the existing visible `Test N - ...` names. Organize Vitest projects by authentication feature and attach native Vitest scenario tags to level-2 `describe()` blocks so tests can be filtered by unified business requirements."
  - `/speckit.plan`
  - `/speckit.tasks`
  - `/speckit.implement`
  - "Extend coverage to email registration, email verification, resend verification, Google OAuth strategy/controller/API behavior, and supporting auth helpers."
  - "Define the authentication test projects and all supported scenario tags in `vitest.config.mjs`, with `strictTags: false` at root and project level."
  - "Add commands and documentation for running the suite, an authentication project, one registration project, and a specific scenario tag."
  - "Update auth controller and Passport behavior only where required to make the business-scenario tests deterministic."
- **Purpose of use:** Make the authentication tests traceable to business requirements and selectively executable by feature project or scenario tag without changing the team's established visible test names.
- **Content Generated by AI:**
  - Updated `specs/022-register-test-coverage/spec.md`, `plan.md`, and `tasks.md`
  - Test updates across Google OAuth strategy/controller/API, registration, verification, resend-verification, services, controllers, integrations, and auth helpers
  - `vitest.config.mjs` — multiple authentication projects, scenario-tag declarations, and filtering configuration
  - `docs/test/index.md` and `src/README.md` — project/tag conventions and execution commands
  - Minor `passport.mjs` and `auth.controllers.mjs` adjustments required by the test scenarios
  - `package.json` test configuration updates
- **Independent Content & Student Validation:** The student checked the mapping between every tagged `describe()` block and the business requirements, preserved the existing `Test N - ...` display convention, and ran the full suite as well as filtered project/tag commands. The student reviewed the test documentation for reproducibility and confirmed that the small production-code adjustments reflected valid behavior rather than changes made only to satisfy mocks.

---

### Note 4 - Add Real-Time Announcement Updates with Socket.IO

- **Tool Name, Version, and Platform:** SpecKit
- **Access time:** Thu Jul 23, approximately 21:25
- **Prompts used:**
  - `/speckit.specify` — "Extend the announcement feature with real-time delivery through Socket.IO. Whenever an announcement is created, edited, has its status changed, is deleted, or is automatically expired, emit an `announcement:changed` event. The client notification bell must subscribe to the event and refresh its announcement list and unread state without requiring a page reload."
  - `/speckit.plan`
  - `/speckit.tasks`
  - `/speckit.implement`
  - "Fix Socket.IO authentication to read `decoded.userId` from the JWT payload and attach it to `socket.userId`."
  - "Add a safe Socket.IO emitter helper in `announcement.services.mjs` and emit actions for `created`, `updated`, `status_changed`, and `deleted` after successful database operations."
  - "Update `useAnnouncementBell.ts` to read the auth token, connect through the existing `useSocket` hook, subscribe to `announcement:changed`, refetch announcements, and unregister the listener during cleanup."
  - "Prevent state updates after the hook unmounts and keep the initial fetch behavior unchanged."
  - "Update the SpecKit task list and run the backend test suite after the Socket.IO integration."
  - "Correct the registration success redirect and password-input browser attributes discovered while validating the integrated branch."
- **Purpose of use:** Deliver announcement changes to active clients in real time, ensuring that the navbar bell and unread indicator stay synchronized with backend create, edit, status, delete, and scheduled-expiration operations.
- **Content Generated by AI:**
  - `specs/026-announcement-socket/tasks.md` — real-time Socket.IO workstream and validation tasks
  - `socket.mjs` — corrected JWT payload field used for socket authentication
  - `announcement.services.mjs` — Socket.IO access and guarded `announcement:changed` event emission after successful mutations
  - `useAnnouncementBell.ts` — token acquisition, socket connection, event subscription, refetch callback, mounted-state guard, and listener cleanup
  - `package.json` / lockfile updates — Socket.IO dependency alignment
  - `RegisterFormCard.tsx` — corrected verification-page route and password input attributes
- **Independent Content & Student Validation:** The student verified that the server emitted events only after successful database changes, tested all action types from multiple browser sessions, and confirmed that the notification list and unread dot refreshed without reloading. The student checked socket authentication with the real JWT shape, verified that listeners were removed on unmount to avoid duplicate requests, reran the backend test suite, and manually reviewed the unrelated registration fixes introduced during branch integration.

## III. 24127398 - Nguyễn Nhựt Huy

### Note 1 - Librarian Book Management UI Design (4-Tab Dashboard)

- **Tool Name, Version, and Platform:** OpenCode TUI (DeepSeek V4 Flash Free)
- **Access time:** 10:00 AM – 5:00 PM ICT, July 17, 2026
- **Prompts Used:**
  - *"read the template/design_books.txt, adjust the 025 spec file and reimplement the interface, I want to change the UI into the design exported from figma. Break into components and comply with the atomic design structure in the constitution.md"*
  - *"add UI for all 4 tabs: Book Management, Book Pickup, Book Return, and Inspection"*
  - *"create mock data for books, pickups, borrows, and inspection entries"*
  - *"add localization keys for all new UI in both en.json and vi.json"*
  - *"fill in the AI_Usage_Notes with what I have added to new branch feature/BookReturn"*
- **Purpose of Use:** Used to design and implement a complete 4-tab Book Management UI Dashboard for librarians with Figma-based design, following Atomic Design methodology, supporting light/dark mode and i18n (EN/VI).
- **Content Generated by AI:**
  - **New Atoms (4 files):**
    - `ConditionCheckbox.tsx` — reusable condition selection checkbox with fee display
    - `CountdownTimer.tsx` — real-time countdown timer with urgent/expired states
    - `KPIProgressBar.tsx` — progress bar widget for KPI stat cards
    - `TrendIndicator.tsx` — trend text with positive/negative/neutral color variants
  - **New Molecules (3 files):**
    - `FilterDropdown.tsx` — dropdown filter with click-outside-close and active selection highlighting
    - `KPIStatCard.tsx` — reusable KPI metric card composing icon, value, label, trend, and progress bar
    - `BookTablePagination.tsx` + `EmptySearchResults.tsx` — pagination controls and empty state molecule
  - **Updated Molecules (2 files):**
    - `BookTableHeader.tsx` — refactored into standalone molecule with sort-indicator slots
    - `BookTableRow.tsx` — refactored into molecule with render-actions pattern for edit/delete
  - **New Organisms (4 files):**
    - `BookManagementTab.tsx` — book inventory with search, category filter, add/edit/delete, pagination, and empty state
    - `BookPickupTab.tsx` — PIN-based pickup management with status badges (urgent/pending/expired/redeemed), countdown timers, search bar, category/status filters, and paginated table
    - `BookReturnTab.tsx` — return processing with 3 KPI cards (active/overdue/returns today), column-sorted borrow table with status badges, search, and pagination
    - `InspectionTab.tsx` — return inspection panel with condition checklist grid, borrower info card, book details with dates, notes textarea, and financial summary (repair fees + late penalty + final refund)
  - **Updated Organisms (2 files):**
    - `LibrarianBookManagement.tsx` — updated to delegate to new 4-tab sub-components
    - `LibrarianDashboardSidebar.tsx` — adjusted sidebar navigation structure
  - **New Template (1 file):**
    - `LibrarianBookDashboard.tsx` — composes sidebar + 4-tab panel with tab-switching state
  - **Mock Data (1 file):**
    - `mockLibraryData.ts` — 12 `MOCK_BOOKS`, 24 `MOCK_PICKUPS`, 12 `MOCK_BORROWS`, 1 `MOCK_INSPECTION` with 6 condition options, plus `KPIMetric` typed arrays for pickup and return dashboards
  - **Locales:** Updated `en.json` and `vi.json` with 50+ new translation keys across `librarian.*` namespace covering tab labels, headers, statuses, placeholders, KPI labels, condition names, financial fields, and action buttons
  - **Specification Artifacts (8 files):**
    - `specs/025-book-management-ui-design/spec.md` — feature specification
    - `specs/025-book-management-ui-design/plan.md` — implementation plan with constitution gates and 4 research tasks
    - `specs/025-book-management-ui-design/research.md` — research output auditing existing components
    - `specs/025-book-management-ui-design/data-model.md` — data interface definitions
    - `specs/025-book-management-ui-design/quickstart.md` — implementation quickstart guide
    - `specs/025-book-management-ui-design/tasks.md` — 15 implementation tasks
    - `specs/025-book-management-ui-design/contracts/ui-component-contracts.md` — component contracts
    - `specs/025-book-management-ui-design/checklists/requirements.md` — requirements checklist
- **Independent Content & Student Validation:** Student reviewed all new components, verified `npx tsc --noEmit` passes with no new errors, tested tab switching between Book Management / Book Pickup / Book Return / Inspection, confirmed KPI stats display correct counts from mock data, validated pagination boundaries, checked search/filter filtering logic, verified dark mode renders correctly across all 4 tabs, reviewed localization in both EN and VI, confirmed Figma design fidelity (colors, spacing, typography), and approved the final commit.

---

### Note 2 - Freely Room Reservation Feature (End-to-End) + Room Localization & Card Redesign

- **Tool Name, Version, and Platform:** OpenCode TUI (DeepSeek V4 Flash Free)
- **Access time:** 10:00 AM – 12:00 PM ICT, July 18, 2026
- **Prompts Used:**
  - Full 26-task implementation of the "Freely Room Reservation" feature via Speckit workflow, including backend API (MVC) and frontend dashboard UI
  - *"this status is hard text or depend on table column to render?"* → clarified DB-driven status with i18n display
  - *"please add language of room description to locale, this is stored in db, is there anyway to do this?"* → added locale-based description override for all 23 rooms with DB fallback
  - *"room detail heading in room booking tab does not have language switch, please add for me"* → added `description_heading` locale key
  - *"add language for Room Details and room name heading too"* → added `room_details` locale key and `name_1..name_23` room name translations (EN/VI)
  - *"please make the room image bigger in the room cell"* → initially adjusted RoomDetailPanel, then reverted
  - *"undo the change in RoomDetailPanel, what I mean is that increase the size of image in the room reservation cell in user dashboard"* → changed ReservationCard image from 48×48 thumbnail to `w-20 h-20`
  - *"increase to a rectangle that cover top of the card please"* → restructured card layout to full-width `h-40` banner image at top
- **Purpose of Use:** Implemented the complete Freely Room Reservation feature end-to-end (backend API + frontend dashboard), added locale-based room description and name translations with DB fallback, and redesigned the ReservationCard with a top banner image.
- **Content Generated by AI:**
  - **Backend (5 files):**
    - `server/src/models/room.models.mjs` — added `findReservationBySlotAndDate`, `createReservation`, `findUserReservations`, `deleteReservation`; added `sr.room_id AS "roomId"` to user-reservations query
    - `server/src/services/room.services.mjs` — `createReservation` (conflict/violation checks), `getUserReservations` (ISO date comparison fix, upcoming/past categorization), `cancelReservation`
    - `server/src/controllers/room.controllers.mjs` — 4 controllers: details, availability, create, user-reservations, cancel
    - `server/src/routes/room.routes.mjs` — 5 routes with `verifyToken` on protected ones; added `DELETE /api/rooms/reserve/:reserveId`
    - `server/src/server.mjs` — mounts roomRoutes at `/api/rooms`
  - **Frontend — Dashboard (2 files):**
    - `client/app/dashboard/user/reservations/page.tsx` — full dashboard with upcoming ReservationCards, past PastBookingsTable, pagination arrows, API fetch with auth, error banner, cancel refresh
    - `client/app/components/organisms/DashboardSidebar.tsx` — sidebar href `#` → `/dashboard/user/reservations`
  - **Frontend — Molecules (2 files):**
    - `client/app/components/molecules/ReservationCard.tsx` — redesigned with full-width `h-40` banner image at top; locale-driven cancel confirm modal with Keep/Cancel buttons; raw DB status with capitalised display; added `roomId` to `Reservation` interface; uses `localizedDesc`
    - `client/app/components/molecules/PastBookingsTable.tsx` — past bookings table with duration calculation (endTime - startTime)
  - **Frontend — Organisms (1 file):**
    - `client/app/components/organisms/RoomDetailPanel.tsx` — Freely/Study Group mode selection (Study Group disabled), inline date picker + selectable slot list with toggle deselection, Confirm button wired to POST endpoint, locale-driven slot statuses (`room.slot_available/reserved/pending` with capitalisation), uses `localizedDesc` and `localizedRoomName`
  - **Frontend — Locales (2 files):**
    - `client/app/locales/en.json` — 24 room UI keys, 23 `desc_{id}` English descriptions, 23 `name_{id}` English room names, `description_heading`, `room_details`
    - `client/app/locales/vi.json` — 24 room UI keys, 23 `desc_{id}` Vietnamese descriptions, 23 `name_{id}` Vietnamese room names, `description_heading` ("Mô tả"), `room_details` ("Chi tiết phòng")
  - **Frontend — Utilities (1 file):**
    - `client/app/utils/room.ts` — `localizedDesc()`, `localizedRoomName()`, and `localizedKey()` helpers for locale→DB fallback resolution
- **Independent Content & Student Validation:** Student directed the image layout direction (side thumbnail → top banner), validated all 26 implementation tasks are marked complete, reviewed Vietnamese translations for accuracy, tested dashboard rendering with upcoming/past reservation categories, and verified locale switching changes all room descriptions/names correctly.

---

### Note 3 - Room Reservation UI/UX Improvements, Dark Mode Contrast, Date Validation & Branch Name Display

- **Tool Name, Version, and Platform:** OpenCode TUI (DeepSeek V4 Flash Free)
- **Access time:** 9:40 AM – 10:30 AM ICT, July 19, 2026
- **Prompts Used:**
  - *"help me implement the following updates and fixes: 1. UI/UX: Update the headers' text color in Dark Mode on the Dashboard/RoomReservation page to make them stand out... 2. Localization: Add a translation key for 'Tạo mã PIN'... 3. Validation: In the room detail panel, restrict users from selecting a booking date earlier than the current date..."*
  - *"adjust the color of the button (freely mode, confirm booking) in room detail panel and create pin, new reservation button in user dashboard room reservation tab such that it match the color of the reserve for pickup button in book reservation (yellow color)"*
  - *"please prevent the user from picking the past time in the day..."* (fix past time slot selection for today's date)
  - *"fix the issue where it display today room booking to past bookings instead of rendering on the upcoming"* (UTC vs local date bug)
  - *"I want the room card in user dashboard room reservations tab display an additional column that is branch name..."*
- **Purpose of Use:** Used to improve the room reservation UI/UX with dark mode contrast fixes, button color consistency, date/time validation, a UTC timezone bug fix, and adding branch name display to reservation cards and past bookings table.
- **Content Generated by AI:**
  - **Dark Mode Headers** (`dashboard/user/reservations/page.tsx`): Added `dark:text-white` to `<h1>` and both `<h2>` elements for proper contrast on dark backgrounds
  - **Localization Fix** (`en.json`): Changed `room.create_pin` from `"Tạo mã PIN"` (Vietnamese) to `"Create PIN"` (English)
  - **Date Validation** (`RoomDetailPanel.tsx`): Added `min={todayStr}` attribute and onChange clamp to prevent selecting dates before today
  - **Past Time Slot Filtering** (`RoomDetailPanel.tsx`): Added `nowTimeStr` check — for today's date, time slots with `startTime < nowTimeStr` are rendered with `opacity-40`, a "Passed" badge, and are non-clickable; the Confirm button is also disabled when the selected slot is in the past
  - **Button Color Consistency** (4 files): Changed all room-related primary buttons (Freely Mode, Confirm Booking, Create PIN, New Reservation) from dark navy `bg-[#03192E]` to yellow `bg-[#FFB95F] text-[#091426] hover:bg-[#e6a54d]`, matching the book reserve-for-pickup button color
  - **Time Zone Bug Fix** (`room.services.mjs`): Replaced `new Date().toISOString().slice(0, 10)` (UTC) with local timezone date extraction (`getFullYear`, `getMonth`, `getDate`) in `getUserReservations` so today's local-date reservations correctly appear as "Upcoming" instead of "Past"
  - **Branch Name Display**: Added `JOIN public.branches` to the `findUserReservations` SQL query; added `branchName` to the `Reservation` interface; rendered branch name with location-pin icon in `ReservationCard.tsx`; added "Branch" column header and data cell in `PastBookingsTable.tsx`
- **Independent Content & Student Validation:** Student reviewed all file changes, verified the dark mode header contrast renders correctly, confirmed the Create PIN button text reads "Create PIN" (English), tested that past dates are unselectable in the date picker, validated that past time slots are grayed out and non-clickable for today's date, confirmed all buttons use the new yellow color scheme, verified tomorrow's and today's reservations appear in "Upcoming" (not "Past"), and checked that branch names display correctly in both card and table views.

---

### Note 4 - Book Return & Inspection System (US1–US7 Implementation)

- **Tool Name, Version, and Platform:** OpenCode TUI (DeepSeek V4 Flash Free)
- **Access time:** 9:00 AM – 11:00 AM ICT, July 21, 2026
- **Prompts Used:**
  - Multiple prompts to implement the Book Return & Inspection feature: PIN generation, return verification, condition inspection, penalty calculation, loan/fees management, and borrowing history
  - Debugging prompts for: `chk_issue` constraint violation (missing `OVERDUE` issue type), `chk_status` constraint (borrow_book doesn't allow `'returned'`), `fk_penalty_returnbook` FK violation (UUID type mismatch between JS variable and PostgreSQL), `value.toFixed is not a function` (pg returns numeric as string), `fees.filter is not a function` (API returns object, frontend expects array)
  - *"new row for relation 'book_penalty' violates check constraint 'chk_issue'"* → added missing `'OVERDUE'` enum value + changed all issue values to lowercase
  - *"new row for relation 'borrow_book' violates check constraint 'chk_status'"* → changed UPDATE `status = 'returned'` to DELETE (per user instruction, later changed to `UPDATE pin = NULL, expired_at = NULL`)
  - *"insert or update on table 'book_penalty' violates foreign key constraint 'fk_penalty_returnbook'"* → used CTE (WITH) to keep `return_id` inside PostgreSQL, eliminating JS variable round-trip type mismatch
  - *"please don't delete the row in borrow_book table"* → changed DELETE to UPDATE pin/expired_at only
  - *"Runtime TypeError - value.toFixed is not a function"* → added `Number()` coercion in `Amount` and `PenaltyDisplay` atoms
  - *"fees.filter is not a function"* → backend returns `{ outstanding, history }` object, frontend expects flat `Fee[]` array; added JOIN to books for `book_title`, mapped response in page component
  - *"why when a librarian click confirm return, the status of the book is set to reserved?"* → `cleanupExpiredPins` in `library.services.mjs` unconditionally set both `pending` and `pending_return` to `reserved`; fixed with CASE expression: `pending → reserved`, `pending_return → borrowed`
- **Purpose of Use:** Implemented the complete Book Return & Inspection System (backend + frontend) covering all 7 user stories: Return PIN generation, PIN verification, condition inspection, penalty calculation, loan/fees management, payment confirmation, and user borrowing history.
- **Content Generated by AI:**
  - **Backend — Services (2 files):**
    - `dashboard.librarian.services.mjs` — `confirmReturn` service: penalty calculation with 4 issue types (LOST/DAMAGED/COMBINED/OVERDUE), damage coefficient mapping, overdue cost formula, CTE-based return_book + book_penalty INSERT to avoid FK type mismatch, inventory update for perfect returns, PIN cleanup on return confirmation; `getOutstandingDebts` with username search; `confirmPayment` with paid_at timestamp
    - `dashboard.user.services.mjs` — `generateReturnPin` (status → pending_return, 3-min PIN expiry); `cleanupReturnPin` (expired → borrowed); `getUserFees` (JOIN borrow_book + books for book_title); `getBorrowingHistory` (JOIN return_book + books + branches)
  - **Backend — Controllers (2 files):**
    - `dashboard.librarian.controllers.mjs` — `verifyReturnPin`, `confirmReturn`, `getOutstandingDebts`, `confirmPayment`
    - `dashboard.user.controllers.mjs` — `generateReturnPin`, `cleanupReturnPin`, `getUserFees`, `getBorrowingHistory`
  - **Backend — Routes (2 files):**
    - `dashboard.librarian.routes.mjs` — 4 POST routes: verify-return-pin, confirm-return, loan-fees/outstanding, loan-fees/confirm-payment
    - `dashboard.user.routes.mjs` — 2 POST routes: generate-return-pin, return-pin/cleanup; 2 GET routes: fees, borrowing-history
  - **Backend — Utils (1 file):**
    - `apiClient.ts` — added `getBranchId()` helper to decode JWT's `branch_id` (no AuthProvider exists)
  - **Backend — Fixes (2 files):**
    - `library.services.mjs` — fixed `cleanupExpiredPins` and `clearAllPins`: `pending → reserved`, `pending_return → borrowed` (was both → reserved)
    - `dashboard.user.services.mjs` — added JOIN to books for `book_title` in `getUserFees`
  - **Frontend — Components (5 files):**
    - `ReturnFlowPanel.tsx` — full 3-step flow (PIN entry → inspection → done) with 6-digit slot inputs, paste support, keyboard navigation
    - `InspectionPanel.tsx` — condition selector + description + real-time penalty preview + confirm button
    - `BorrowedBookCard.tsx` — return PIN generation button, expiry timer auto-reset, all BookStatus entries including `pending_return`
    - `PinModal.tsx` — PIN display with countdown, used for both borrow and return PINs
    - `ConditionSelector.tsx` — 11 conditions with mutual exclusion, disabled for Perfect/Lost
  - **Frontend — Atoms (4 files):**
    - `Amount.tsx` — added `Number()` coercion for string values from API
    - `PenaltyDisplay.tsx` — dark mode fix, added `Number()` coercion
    - `ConditionCheckbox.tsx` — added `disabled` prop with visual state, removed per-checkbox fee display
    - `StatusBadge.tsx` — added `pending_return` variant
  - **Frontend — Molecules (2 files):**
    - `BorrowInfoPanel.tsx` — 3-column layout with null-safe dates, gender/phone/email fallbacks
    - `OutstandingDebtRow.tsx` — confirm payment button, `Content-Type: application/json` header
  - **Frontend — Pages (2 files):**
    - `dashboard/user/borrowed/page.tsx` — return PIN generation, PinModal, expiry cleanup, `Content-Type` header fix
    - `dashboard/user/fees/page.tsx` — transform API `{ outstanding, history }` to flat `Fee[]` with field mapping
  - **Frontend — Organisms (2 files):**
    - `LoanFeesPanel.tsx` — outstanding debts search + table + total
    - `FeesBreakdownPanel.tsx` — filter tabs (all/pending/paid), totals
  - **Locales (2 files):** Updated `en.json` and `vi.json` with 40+ keys for inspection, penalty, loan fees, borrowing history, PIN display, and return status
  - **Specification (2 files — diagnostics):** `data-model.md` confirmed `chk_issue` allows only `overdue/damaged/lost/combined` (lowercase), `return_id` is UUID with `DEFAULT gen_random_uuid()`, `fk_penalty_returnbook` has `ON DELETE SET NULL`, `fk_returnbook_borrowbook` has `ON DELETE CASCADE`, `borrow_book` status CHECK excludes `returned`
- **Independent Content & Student Validation:** Student directed the resolution strategy for each constraint violation (chk_issue → added missing enum, chk_status → changed to DELETE then to UPDATE-only, FK → kept return_id in SQL), validated the cascade chain reasoning, tested the confirm return flow at each step, reviewed locale key coverage, and confirmed the cleanup status reset matches the correct PIN type semantics.

---

### Note 5 - Borrow Book Split, Classification, Lost+Overdue Fix, Extend Due Date & Debt Guard

- **Tool Name, Version, and Platform:** deepseek-v4-flash-free, via opencode CLI
- **Access time:** 11:41 ICT, July 22, 2026
- **Prompts Used:**
  - Locate borrow_book rendering logic and split into current/past types using return_book and book_penalty existence
  - Remove unnecessary `returned` status and status column from history table
  - Classify past records into returned/overdue/damaged/lost/combined based on penalty issues
  - Trace code flow for User Story 1 (generate return PIN) and User Story 2 (librarian PIN verification)
  - Audit penalty calculation in confirmReturn: fix lost+overdue to charge late fees, confirm single-row persistence
  - Fix borrow limit not decrementing on confirm return → add borrow_num decrement and available_quantity increment for all non-lost returns
  - Add unpaid debt guard to block reservation if book_penalty has any is_paid = false
  - Add extend-due-date button with confirmation modal, 3-time limit check (extend_num), and limit-reached notification
  - Add View PIN button for pending_return cards
  - Record AI usage notes and suggest commit message
- **Purpose of Use:** Refactored the borrow_book display to split into current/past records; classified past records by condition (returned/overdue/damaged/lost/combined); fixed lost+overdue penalty to include late fees; added `borrow_num` decrement and `available_quantity` increment on return confirm; added unpaid-debt guard to reservation; added extend-due-date feature with 3-time limit and confirmation modal; added View PIN button for pending_return cards.
- **Content Generated by AI:**
  - **Backend — Services (2 files):**
    - `dashboard.user.services.mjs` — `getUserBorrowRecords` now LEFT JOINs `return_book`/`book_penalty` via EXISTS subqueries, returns `{ current, past }` with `borrowCondition` classification; added `extendDueDate` service (checks extend_num < 3, adds 7 days, increments counter)
    - `dashboard.librarian.services.mjs` — `confirmReturn`: added overdue cost to lost penalty; moved `available_quantity` increment to all non-lost returns; added `borrow_num` decrement via `GREATEST(borrow_num - 1, 0)`
    - `library.services.mjs` — `createReservation`: added unpaid debt check (`SELECT COUNT(*) FROM book_penalty WHERE is_paid = false`) returning `UNPAID_DEBT` error
  - **Backend — Controller (1 file):**
    - `dashboard.user.controllers.mjs` — added `extendDueDate` controller
  - **Backend — Routes (1 file):**
    - `dashboard.user.routes.mjs` — added `POST /borrowed/extend-due-date`
  - **Frontend — Components (2 files):**
    - `BorrowedBookCard.tsx` — added `extendNum` field, `onExtend` prop, "Extend Due Date" button in borrowed state, "View PIN" button for `pending_return` status
    - `BorrowedHistoryTable.tsx` — replaced local `BorrowedBook` interface with shared type, removed status column, added Condition column with colored badges (Perfect/Overdue/Damaged/Lost/Combined)
  - **Frontend — Page (1 file):**
    - `dashboard/user/borrowed/page.tsx` — fetches both `current` and `past` from single endpoint; added confirmation modal for extend; added `extendError` display for limit-reached notification; `onExtend` triggers confirm dialog then API call
  - **Locales (2 files):** Added 10+ keys for extend confirmation dialog (`borrowed_extend*`) and condition labels (`borrowed_condition_*`) in both en.json and vi.json
- **Independent Content & Student Validation:** Student verified the past-borrow condition badges match DB penalty issues, confirmed the lost+overdue formula stacks correctly, validated the extend flow with confirmation modal and limit notification, and reviewed the debt guard blocks reservation with unpaid debts.

## IV. 24127408 - Nguyễn Lê Hoàng Khải

### Note 1 - Building the Study Group specification with Spec Kit

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 19, 2026, 13:00 (UTC+7).
- **Prompts used:** “Use `$speckit-specify` to create `specs/026-study-group-feature/spec.md` for a Study Group feature in the existing library reservation system. A Study Group cannot exist without exactly one valid room reservation. Cover Study Group creation during reservation, Group I Created, Group I Joined, Study Together, editable group information, host and participant actions, lifecycle statuses, constraints, edge cases, acceptance criteria, dependencies, phased development, and out-of-scope behavior. Preserve Freely Mode and read `database/init_db/postgres` as the source of truth. Keep all work on the current branch and do not implement the feature yet.”
- **Purpose of use:** Convert the initial product idea into a complete, implementation-agnostic specification following Spec Kit conventions.
- **Content generated by AI:** The initial feature overview, user stories, functional and non-functional requirements, business rules, workflows, assumptions, edge cases, acceptance scenarios, dependencies, and proposed delivery phases.
- **Independent Content & Student Validation:** The student defined the core product requirements and reviewed the generated specification against the existing reservation and dashboard flows. The student corrected the output filename from `specify.md` to `spec.md`, prohibited creation of another branch, preserved Freely Mode, and confirmed that the SQL schema—not names suggested in the prompt—must determine actual database terminology.

---

### Note 2 - Clarifying requirements and resolving specification conflicts

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 19, 2026, 15:00 (UTC+7).
- **Prompts used:** “Run `$speckit-clarify` and ask the highest-impact questions”; “Use the selected answers B, D, A, and A”; “Change the denied-request cooldown to 30 minutes instead of 25 hours”; “Provide the five highest-priority unresolved issues”; and “Update the specification using the approved recommendations, selecting option A for item 4.”
- **Purpose of use:** Resolve ambiguities before planning and ensure that business decisions were recorded consistently.
- **Content generated by AI:** Clarification questions, alternative choices, impact explanations, a prioritized issue list, and revisions to the specification based on the student’s selected answers.
- **Independent Content & Student Validation:** The student selected the final options, replaced an incorrect 25-hour rule with a 30-minute cooldown after denial, accepted or rejected proposed changes, and explicitly approved each material specification revision. The student also clarified that the project was academic rather than production-critical when choosing option A for the fourth issue.

---

### Note 3 - Producing the implementation plan, tasks, and consistency analysis

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 19, 2026, 15:30 (UTC+7).
- **Prompts used:** “Run `$speckit-plan` for the approved Study Group specification”; “Run `$speckit-tasks`”; and “Run `$speckit-analyze` repeatedly, report inconsistencies without implementing changes, and update the documents only after approval.”
- **Purpose of use:** Translate the accepted specification into technical design artifacts and an ordered backlog, then verify consistency across all Spec Kit outputs.
- **Content generated by AI:** `plan.md`, `tasks.md`, `research.md`, `data-model.md`, `quickstart.md`, the OpenAPI contract, dependency ordering, verification strategy, and cross-artifact analysis findings.
- **Independent Content & Student Validation:** The student reviewed the proposed design and task scope, asked whether recommendations affected only unit tests, authorized document changes separately from code changes, and reran analysis until the specification, plan, and tasks were sufficiently aligned.

---

### Note 4 - Inspecting the schema and integrating the reservation-backed backend

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 20, 2026, 16:00 (UTC+7), continued July 21, 2026, 15:00–16:00 (UTC+7).
- **Prompts used:** “Read the current server architecture and every relevant SQL file under `database/init_db/postgres` before changing code. Integrate Study Groups with room reservations, use exact table and column names, create the reservation before the Study Group, keep the operation transactional, and do not change database files without asking first. Diagnose errors such as `sg.created_at does not exist`, `gr.decided_at does not exist`, malformed array literals, and the `fk_reserve_user` foreign-key violation.”
- **Purpose of use:** Implement backend integration against the real PostgreSQL schema and eliminate assumptions that caused runtime failures.
- **Content generated by AI:** Server-side query corrections, middleware/controller/service/model changes, transaction orchestration, reservation/group linkage, DTO projections, input normalization, database error handling, and regression tests.
- **Independent Content & Student Validation:** The student reproduced each database error, supplied the exact error message, required one-error-at-a-time investigation, and prohibited autonomous SQL changes. After discussion with the team leader, the student updated the SQL files and instructed Codex to reread them. The student established that dissolving a group permanently deletes both the reservation and Study Group and clarified that `group_request.type` supports `request` and `invite`.

---

### Note 5 - Replacing mock data while restoring the original frontend design

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 20, 2026, 16:00 (UTC+7), continued July 21, 2026, 16:00 (UTC+7).
- **Prompts used:** “Replace Study Together and dashboard mock data with real backend data, but restore the frontend to the version before backend integration. Preserve the existing project design, Study Cards, and separate popup logic for Study Together, Group I Created, and Group I Joined. External interfaces are layout references only; do not redesign the frontend.”
- **Purpose of use:** Connect persisted backend data without discarding the interface and interaction patterns already designed by the project team.
- **Content generated by AI:** API-to-view adapters, persisted loading and action flows, restored React component structure, status mapping, avatar handling, date/time presentation, and backend-bound popup actions.
- **Independent Content & Student Validation:** The student identified that the first integration had substantially altered the original interface, explained how each card and popup differed by page and permission, supplied reference images, and visually compared every restoration attempt with the original design. The student accepted the dashboard card only after it matched the intended layout closely enough.

---

### Note 6 - Correcting lifecycle, authorization, cooldown, and duplicate participation logic

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 21, 2026, 16:00–17:00 (UTC+7).
- **Prompts used:** “Derive Study Group status from the actual reservation date and time. Show only Upcoming groups in Study Together. For Group I Created, order In Progress, Full, Upcoming, Completed, Cancelled, and Expired, and dim only Completed, Cancelled, and Expired. For Group I Joined, handle Approved, Pending, Denied, and Expired in a useful order. Enforce the 30-minute post-denial cooldown, prevent duplicate request/member records, remove Denied when the same user becomes Approved, hide approved groups from Study Together, and fix duplicate React keys.”
- **Purpose of use:** Make displayed state, action availability, sorting, and participation records correspond to authoritative reservation and request state.
- **Content generated by AI:** Lifecycle derivation and ordering helpers, visibility filters, dimming rules, cooldown calculation, request uniqueness handling, approved-group discovery exclusion, and stable list-key changes.
- **Independent Content & Student Validation:** The student defined the desired ordering and historical-state behavior, clarified that Expired check-in behavior would be completed later with the PIN feature, and manually tested using account A in Google Chrome and account B in Microsoft Edge. The student reported incorrect dates, missing Join and Pending states, cooldown failures, duplicate Denied/Approved records, and React key warnings for correction.

---

### Note 7 - Adding realtime updates through the existing Socket.IO architecture

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 20, 2026, 16:00 (UTC+7).
- **Prompts used:** “The team leader requires sockets and has already created Socket.IO-related files. Inspect and reuse the existing socket architecture so join requests, approvals, denials, request cancellation, leaving, dissolution, dashboard state, and Study Together discovery update between different signed-in users without relying on manual reloads.”
- **Purpose of use:** Synchronize host and participant views when actions are performed concurrently by different accounts.
- **Content generated by AI:** Socket event integration, server emission points, and client refresh/invalidation behavior using the project’s existing connection structure.
- **Independent Content & Student Validation:** The student identified Socket.IO as a forgotten team requirement, instructed Codex to preserve the team leader’s existing files, and tested realtime behavior with two accounts in separate browsers. The student reported cases where a Pending state disappeared after reload or host queues failed to update.

---

### Note 8 - Designing database-driven Study Together filters

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 21, 2026, 16:00 (UTC+7).
- **Prompts used:** “Redesign the Study Together filter section using the current project’s visual language. Include Search Groups, subject, one or both library branches loaded from the database, all or selected lendable rooms with capacity of at least one, Date, From, and To. Use custom checkboxes, remove Sort By, align Search and Subject with Library Branches, and begin Date/From/To at the Rooms grid line.”
- **Purpose of use:** Provide useful persisted-data filtering while improving clarity and maintaining the accepted page layout.
- **Content generated by AI:** Filter layout, custom checkbox styling, database-bound branch and room selections, filter query state, field alignment, and removal of Sort By.
- **Independent Content & Student Validation:** The student specified the exact multi-selection rules, corrected an over-redesign by stating that Date/From/To were already acceptable, and iteratively approved control widths and grid alignment.

---

### Note 9 - Refining confirmation dialogs and management popups

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 21, 2026, 17:00 (UTC+7).
- **Prompts used:** “Replace Chrome confirmation dialogs for Dissolve Group, Leave Group, and Cancel Request with project-styled confirmation dialogs. Preserve the separate Created and Joined popup behavior, dim the parent popup cleanly without leaving an unattractive white border, align the warning icon with the dissolve title, enlarge Leave Group and Keep Group button borders, and show the full members list in Group I Joined.”
- **Purpose of use:** Make destructive actions safer and visually consistent while completing host and participant popup information.
- **Content generated by AI:** Reusable confirmation-dialog behavior, modal layering and backdrop changes, action sizing and alignment, cancel/confirm handlers, and member-list presentation.
- **Independent Content & Student Validation:** The student tested the dialogs and reported exact visual defects in the backdrop, border, icon, and buttons. The student compared Created and Joined popup behavior and requested member details rather than only the creator and total member count.

---

### Note 10 - Refining Study Card formatting, spacing, and responsive dimensions

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 21, 2026, 16:00–17:00 (UTC+7).
- **Prompts used:** “Preserve the original Study Card designs but fix presentation: format dates and times naturally instead of displaying raw database timestamps; put time on its own line as `10:00 - 12:30`; clamp descriptions to two lines with an ellipsis; retain the already approved card height; balance spacing between tags, creator details, description, and time; make dashboard cards wider like Study Together cards; and center the Study Together creator/avatar/member section between its divider and bottom edge.”
- **Purpose of use:** Keep cards readable and visually balanced despite different description lengths, membership counts, and page contexts.
- **Content generated by AI:** Date/time formatting, two-line text clamping, spacing and alignment CSS, responsive card/grid dimensions, avatar/footer positioning, and stable card layouts.
- **Independent Content & Student Validation:** The student visually inspected each change, rejected unnecessary card-height modifications, approved the dashboard card result, and separately corrected Study Together because it intentionally uses a different design.

---

### Note 11 - Fixing creator-owned cards with “Your Group”

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 21, 2026, 17:00 (UTC+7).
- **Prompts used:** “When A and B both create Study Groups, A’s own card has no Join Group button, leaving an excessive gap between description and date. Fix the layout”; followed by “If the card says Your Group, remove the Creator tag.”
- **Purpose of use:** Preserve consistent action-area height for creator-owned and joinable Study Together cards without showing redundant ownership labels.
- **Content generated by AI:** A disabled `Your Group`/`Nhóm của bạn` action for creator-owned cards, creator-aware disabled logic, locale entries, removal of the redundant Creator tag, and an updated acceptance criterion.
- **Independent Content & Student Validation:** The student reproduced the spacing issue using accounts A and B, accepted the disabled-action solution, then refined it by removing the duplicate Creator tag. The final changes were checked with locale synchronization, ESLint, and TypeScript type checking.

---

### Note 12 - Completing Study Group discovery and dashboard behavior

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 22–23, 2026 (UTC+7).
- **Prompts used:** “Do not display creator-owned cards in Study Together”; “Order Pending requests first and then by the nearest scheduled time”; “Add Cancel Request to Pending cards in Study Together”; “Replace the single priority status with multi-select status filters for both Group I Created and Group I Joined, with All Status clearing the selection”; and “Synchronize capacity immediately after approval.”
- **Purpose of use:** Finalize discovery ordering, participation actions, dashboard filtering, and realtime presentation before functional sign-off.
- **Content generated by AI:** Creator-card exclusion, Pending-first/nearest-time sorting, Study Together cancellation flow, multi-select status filtering, capacity refresh behavior, locale strings, tests, and specification revisions.
- **Independent Content & Student Validation:** The student selected the final visibility and ordering rules, reviewed spacing and filter placement, manually exercised Created and Joined flows, and explicitly approved updating the related specifications and tests.

---

### Note 13 - Adding email invitations and the shared notification bell

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 22–23, 2026 (UTC+7).
- **Prompts used:** 
  - “Add an email invitation feature inside the Group I Created popup beside Members. Reuse the system’s OTP-mail sending approach. Show invitations in the existing general notification bell, open a Study Group detail popup with Accept and Deny, route accepted users to Your Study Groups with joined feedback, and decide a safe denial behavior.”
  - “Use only a circular invite icon beside Members”; “Expand an email text box to the left instead of opening another popup”; “Submit immediately on Enter and clear stale feedback”; “Do not label the general notification panel as Study Group-specific”; and “Show Subject/Members, Date/Time, and Branch/Room in notification details.”
- **Purpose of use:** Implement persisted email invitations and integrate them into the application-wide notification surface.
- **Content generated by AI:** Invitation endpoints, Nodemailer integration based on the existing transport, inline invitation UI, bell projection, Accept/Deny actions, redirect feedback, realtime refresh, localization, and regression coverage.
- **Independent Content & Student Validation:** The student chose the final compact interaction, rejected an extra invitation popup, refined validation wording, confirmed that the bell is shared by the whole application, and manually tested invitation decisions.

### Note 14 - Adding lifecycle email and browser notifications

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 22–23, 2026 (UTC+7).
- **Prompts used:** “Send email and bell notifications when a member is kicked and when a Study Group is dissolved”; “Notify the creator by email and bell when an Approved member leaves”; and “Include the action performer’s profile picture, username, and email in the email and selected notification detail.”
- **Purpose of use:** Notify affected users about destructive or membership-changing Study Group actions without coupling successful transactions to SMTP delivery.
- **Content generated by AI:** Post-commit removal, dissolution, and leave emails; pre-deletion snapshots; targeted Socket.IO events; account-scoped browser-storage notifications; actor identity; red dissolution warning icon; and lifecycle tests.
- **Independent Content & Student Validation:** The student approved retaining the browser-local notification mechanism instead of adding a database table, reported missing bell delivery for kick/dissolve, and selected the actor information to show. No notification schema was introduced.

---

### Note 15 - Synchronizing Dashboard Calendar & Overview

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 22, 2026 (UTC+7).
- **Prompts used:** “Synchronize Dashboard Calendar & Overview with real data. Display reservation-backed Study Groups in purple and Freely Mode room reservations in blue; do not change other event types yet. Fix the month navigation arrows so their positions do not move with month-name length.”
- **Purpose of use:** Replace calendar placeholders with the two existing reservation projections while preserving the Dashboard design.
- **Content generated by AI:** Calendar/agenda adapters, Study Group versus Freely Mode colors, schedule formatting, and fixed month navigation.
- **Independent Content & Student Validation:** The student limited the scope, selected the color semantics, and visually checked the calendar and navigation.

---

### Note 16 - Adding profile previews to Study Group popups

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 23, 2026 (UTC+7).
- **Prompts used:** 
  - “Inside Study Group popups, show a compact user-information card when hovering the Group Organizer or a member’s avatar/name. Follow `specs/026-study-group-feature/profile-view-layout.txt`, and also support applicants awaiting approval.”
  - “Include email, date of birth, phone number, gender, occupation, and hometown, using Unknown for missing values”; and “Clamp the optional description to at most four lines without reserving empty height.”
- **Purpose of use:** Show contextual profile information without leaving the Study Group workflow.
- **Content generated by AI:** Reusable hover/focus profile preview, profile projection, avatar fallback, Unknown states, adaptive four-line clamping, applicant support, localization, and tests.
- **Independent Content & Student Validation:** The student corrected the trigger location from outer cards to Organizer/Members inside popups, specified the fields, and iteratively verified description behavior.

---

### Note 17 - Adding URL-addressable Study Group details

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 23, 2026 (UTC+7).
- **Prompts used:** “Implement `/study-together/{study_card_id}`”; and “Do the same for Group I Created and Group I Joined in Dashboard.”
- **Purpose of use:** Make detail popups addressable by URL while retaining the existing modal interaction.
- **Content generated by AI:** History API integration, direct-load resolution, Back/Forward support, Created/Joined route discrimination, missing-group fallback, and route tests.
- **Independent Content & Student Validation:** The student evaluated the routing trade-off, approved URL-backed modal navigation, and required it across discovery and both dashboard projections.

---

### Note 18 - Refining the notification timeline and scrollbars

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 23, 2026 (UTC+7).
- **Prompts used:** “Sort all notification types newest first as one stack”; “Remove the two scrollbar triangle buttons while retaining a long modern scrollbar”; “Use a red warning icon for cancellation/dissolution”; and “Apply the same scrollbar design to Study Card popups but remove the gray track underneath.”
- **Purpose of use:** Make mixed notifications predictable and modernize scrolling without redesigning navigation.
- **Content generated by AI:** Deterministic merged timeline, normalized timestamps, custom overlay scrollbar with hidden native controls, transparent track, light/dark thumb, popup reuse, red warning icon, specifications, and tests.
- **Independent Content & Student Validation:** The student inspected the Windows/Chrome result, rejected CSS that merely covered native arrow buttons, selected the thumb-only design, reported a popup-scroll regression, and required scroll behavior to be restored without losing the appearance.

---

### Note 19 - Completing Study Group communications, stale navigation, confirmation UI, and use-case review

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, OpenAI Codex coding-agent workspace connected to the local project repository.
- **Access time:** July 23, 2026 (UTC+7).
- **Prompts used:** “Audit and complete the Study Group email and notification system without changing the database schema”; “Use a balanced model for request, membership, invitation, edit, removal, leave, and dissolution communications”; “Redesign email and notification details so the action type is immediately distinguishable while retaining all current information”; “Use permission-aware Created, Joined, or general Your Study Groups destinations and handle stale invitation/group links safely”; “Prevent background scrolling behind notification details”; “Align destructive-action confirmation buttons evenly and audit the remaining Study Group use cases”; and “List the use cases needed to complete the Study Group use-case diagram.”
- **Purpose of use:** Complete the accepted Study Group functional scope, improve the clarity and consistency of communications and confirmations, verify lifecycle/navigation edge cases, and derive an implementation-backed actor/use-case inventory for documentation.
- **Content generated by AI:** A balanced bilingual email/bell event matrix; action-specific email and notification visuals; actor identity snapshots; stable event identifiers; invitation-only and group-only unavailable states; permission-aware direct-detail navigation; notification background scroll locking; equal-width centered confirmation actions; localized confirmation text; regression tests; specification/quick-start updates; and a proposed General User, User, Study Group Creator, and Other User use-case mapping.
- **Independent Content & Student Validation:** The student selected which events require email plus bell versus bell only, approved the navigation rules before implementation, rejected unnecessary Members fields for removal-style events, refined the visual direction by removing the colored side bar, distinguished stale invitations from unavailable Study Groups, shortened the final Dissolve action label, and declared the current Study Group functional scope ready to close. The student requested the final use-case inventory for incorporation into the project’s UC diagram.

---

### Note 20 - Hardening Study Group logic with Spec Kit

- **Tool name, version, and platform:** OpenAI Codex, GPT-5, using the project’s Spec Kit workflows in the local repository.
- **Access time:** July 24, 2026 (UTC+7).
- **Prompts used:** The student first requested a full logic audit of the Study Group functional group against all artifacts in `specs/026-study-group-feature`, including frontend, backend, API, database, authorization, validation, state management, dependencies, and tests. The audit had to distinguish confirmed defects, specification differences, unimplemented functionality, risks requiring clarification, and test gaps without modifying code. The subsequent specification prompt explicitly began with the instruction: “Dựa vào sự đánh giá ở trên, hãy thực hiện vào folder `027-study-group-logic-hardening` để hoàn thiện sửa chữa những lỗi logic còn sót lại.” This was followed by `$speckit-clarify`, `$speckit-plan`, `$speckit-tasks`, `$speckit-analyze` and `$speckit-implement`. Finally, the student reported UI delays which led to removing synchronous SMTP awaits.
- **Purpose of use:** First establish evidence-based findings for the existing Study Group implementation; then, based on that evaluation, capture the accepted edge-case and failure-path corrections as a separate feature, clarify decisions before implementation, produce an ordered implementation plan and task list, and check consistency across the specification, plan, and tasks. Implement and verify the hardening tasks using TDD, fixing role checks and UI blocking issues.
- **Content generated by AI:** Requirements for failure handling, stale or missing Study Group/request flows, authorization and state-transition safeguards, notification/request timing concerns, validation scenarios, implementation design, dependency ordering, analysis findings, and full implementation code with tests (122 passing backend tests).
- **Independent Content & Student Validation:** The student reviewed the six identified issues, confirmed that they were primarily failure-path hardening rather than changes to the main Study Group behavior, approved the recommended approaches, and explicitly requested implementation only after the Spec Kit artifacts were prepared. SG-004 was retained only if the existing working behavior remains unaffected; SG-014 and SG-016 were resolved using the more user-convenient option. The student manually tested the implemented API, caught the `authorizeRole` mismatch (`student` vs `user`), and requested fixes for the 3-second UI blocking caused by SMTP emails.

## V. 24127095 - Vũ Duy Nhất
### Note 1 - Redesign table for invitation and request feature
- **Tool name, version, and platform:** Gemini pro (3.6 Flash) via Web
- **Access time:** July 21, 2026 at 11:18.
- **Prompts used:**
  - The image of Physical ERD of `group_request` and `group_invite` tables
  - *Thiết kế như thế này được không, mặc dù trường giống nhau nhưng tách ra để phân biệt lời request gửi từ user cho creator và invite gửi từ creator đến user*
- **Purpose of use:** To evaluate whether the group_request and group_invite table design was well-structured, and to get suggestions for optimizing the schema.
- **Content generated by AI:**
  - Nhược điểm:
    - Dùng lại (Duplicate) cấu trúc dữ liệu: Cả 2 bảng có $100\%$ các trường (id, group_id, user_id, created_at, content, status, decided_at) giống hệt nhau.
    - Bảo trì khó khăn (Maintenance Overhead): Sau này nếu bạn muốn bổ sung trường mới (ví dụ: inviter_id, expires_at, role_requested,...), bạn sẽ phải chạy migration cho cả 2 bảng.
  - Các phương án tối ưu hơn:
    - Phương án 1 - Gộp thành 1 bảng chung (Khuyên dùng): Gộp 2 bảng thành group_member_requests (hoặc group_invitations) và thêm 1 cột type hoặc direction.
    - Phương án 2 - Giữ 2 bảng nhưng làm rõ ngữ nghĩa (Nếu bắt buộc phải tách): Nếu nghiệp vụ của hai luồng này trong tương lai khác hẳn nhau (ví dụ: Invite cần có token gửi qua email, còn Request cần đính kèm bài làm/câu hỏi duyệt vào nhóm), bạn mới nên tách.
- **Independent Content & Student Validation:** The student reviewed the two proposed alternatives and independently decided to merge the two tables into one (Suggestion 1), based on the reasoning that both tables shared 100% identical fields and separate tables would increase future maintenance overhead.

---

### Note 2 - Tech stack table used in Demo Video
- **Tool name, version, and platform:** Gemini pro (3.6 Flash) via Web
- **Access time:** July 21, 2026 at 15:30.
- **Prompts used:** *Hãy cho tôi mã md của bảng với 2 cột (technology, description)*
  - *JWT (Json Web Token): Dùng để xác thực và phân quyền người dùng trong các request tiếp theo*
  - *Postgres SQL: Cơ sở dữ liệu để lưu trữ*
  - *Google Client: Dùng cho usecase ggoauth*
  - *Email: Dùng để gửi mail chứa otp xác thực ở forgot password hoặc mail xác thực register *
- **Purpose of use:** To quickly format the list of technologies used in the project into a clean Markdown table for the demo video.
- **Content generated by AI:**
    | Technology | Description |
    | :--- | :--- |
    | **JWT (Json Web Token)** | Dùng để xác thực và phân quyền người dùng trong các request tiếp theo. |
    | **PostgreSQL** | Cơ sở dữ liệu để lưu trữ. |
    | **Google Client** | Dùng cho usecase Google OAuth. |
    | **Email** | Dùng để gửi mail chứa OTP xác thực ở forgot password hoặc mail xác thực register. |
- **Independent Content & Student Validation:** The student provided the technology list and descriptions; the AI only handled formatting into a table. The student reviewed the table for accuracy before use.

---

### Note 3 - Find out about WebSocket on Real-time feature

- **Tool name, version, and platform:** Gemini pro (3.6 Flash) via Web
- **Access time:** July 13, 2026 at 9:29.
- **Prompts used:** *Nếu không dùng websocket thì có thể thực hiện các tính năng một cách realtime dc không*
- **Purpose of use:** To research alternative approaches for implementing real-time features without relying on WebSocket.
- **Content generated by AI:** Hoàn toàn có thể thực hiện các tính năng realtime (hoặc gần như realtime) mà không cần dùng đến WebSocket.
  - Server-Sent Events (SSE) — Khuyên Dùng Cho Luồng Một Chiều
  - Short Polling (Truy vấn ngắn liên tục)
  - Long Polling (Truy vấn dài)
  - HTTP/2 Server Push (hoặc HTTP/3)
  - Sử dụng bên thứ ba (Firebase / Supabase)
- **Independent Content & Student Validation:** The student reviewed the suggested alternatives (SSE, polling, HTTP push, third-party services) and independently evaluated which approach best fit the project's needs before deciding on an implementation.

---

### Note 4 - Find out about AWS Cloud for deploy service

- **Tool name, version, and platform:** Gemini pro (3.6 Flash) via Web
- **Access time:** July 15, 2026 at 14:16.
- **Prompts used:** *deploy lên aws là global ai cũng truy cập dc dko*
- **Purpose of use:** To understand the requirements for making an AWS-deployed application publicly accessible.
- **Content generated by AI:** Đúng vậy, nhưng với một điều kiện quan trọng: Bạn phải mở "cửa" cho họ vào. Dưới đây là 3 yếu tố quyết định giúp ứng dụng AWS của bạn có thể truy cập từ mọi nơi:
  - Mở cổng trong Security Group (Tường lửa)
  - Phải có Địa chỉ Công cộng (Public IP / DNS)
  - Cách deploy tối ưu nhất cho ứng dụng "Global"
- **Independent Content & Student Validation:** The student reviewed the explanation of Security Group rules, public IP/DNS requirements, and deployment options, then applied this understanding to configure the project's own AWS deployment.