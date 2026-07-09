# Tasks: Announcement Management Backend

**Input**: Design documents from `src/specs/021-announcement-backend/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g. US1, US2, US3)
- Path references are relative to repository root (`src/server/src/` or `src/database/`)

---

## Phase 1: Database Migration

**Goal**: Update the database schema to support creator auditing.

- [ ] T001 [P] Create additive migration file `src/database/init_db/postgres/07_announcement_alter.sql` containing `ALTER TABLE announcements ADD COLUMN created_by UUID REFERENCES users(user_id) ON DELETE SET NULL;`
- [ ] T002 Execute database migration on the local PostgreSQL database using docker container command: `docker exec -i library_postgres psql -U lib_admin -d postgres < src/database/init_db/postgres/07_announcement_alter.sql`

**Checkpoint:** The local PostgreSQL database is updated and the `announcements` table contains the new nullable `created_by` column.

---

## Phase 2: Model Layer

**Goal**: Implement the database queries for announcements.

- [ ] T003 [P] [US1] Implement `insertAnnouncement` function in `src/server/src/models/announcement.models.mjs` to insert a new announcement in draft status, storing title, content, expired_date, and created_by fields.
- [ ] T004 [P] [US2] Implement `findAnnouncementsForManagement` function in `src/server/src/models/announcement.models.mjs` to fetch announcements for administrators, incorporating pagination (limit, offset) and status filtering.
- [ ] T005 [P] [US2] Implement `countAnnouncementsForManagement` function in `src/server/src/models/announcement.models.mjs` to count the total matching announcements for pagination calculations.
- [ ] T006 [P] [US2] Implement `findAnnouncementById` function in `src/server/src/models/announcement.models.mjs` to retrieve details of a single announcement by ID.
- [ ] T007 [P] [US3] Implement `updateAnnouncementStatus` function in `src/server/src/models/announcement.models.mjs` to update status field (`draft`, `active`, `expired`).
- [ ] T008 [P] [US4] Implement `updateAnnouncementDetails` function in `src/server/src/models/announcement.models.mjs` to update title, content, and expired_date of an existing announcement.
- [ ] T009 [P] [US5] Implement `deleteAnnouncementById` function in `src/server/src/models/announcement.models.mjs` to permanently delete an announcement record.
- [ ] T010 [P] [US6] Implement `findActiveAnnouncements` function in `src/server/src/models/announcement.models.mjs` to retrieve active, non-expired announcements (where status = 'active' and expired_date is NULL or >= current date).
- [ ] T011 [P] [US7] Implement `updateExpiredAnnouncements` function in `src/server/src/models/announcement.models.mjs` to transition all active announcements with past expiration dates to 'expired'.

**Checkpoint:** All database query functions are successfully implemented and exported from `src/server/src/models/announcement.models.mjs`.

---

## Phase 3: Service Layer

**Goal**: Implement business logic, validation, and transitions.

- [ ] T012 [P] [US1] Implement `createAnnouncementService` in `src/server/src/services/announcement.services.mjs` to validate payload (title, content, expired_date) and insert it as a draft.
- [ ] T013 [P] [US2] Implement `getAnnouncementsForManagementService` in `src/server/src/services/announcement.services.mjs` to calculate offset, fetch announcements and counts, and format paginated responses.
- [ ] T014 [P] [US3] Implement `updateAnnouncementStatusService` in `src/server/src/services/announcement.services.mjs` to check announcement existence, validate new status value, and trigger status updates.
- [ ] T015 [P] [US4] Implement `editAnnouncementDetailsService` in `src/server/src/services/announcement.services.mjs` to update an announcement's details after verifying its existence and validating inputs.
- [ ] T016 [P] [US5] Implement `deleteAnnouncementService` in `src/server/src/services/announcement.services.mjs` to delete an announcement after validating its existence.
- [ ] T017 [P] [US6] Implement `getActiveAnnouncementsService` in `src/server/src/services/announcement.services.mjs` to query and return active public announcements.
- [ ] T018 [P] [US7] Implement `expireOutdatedAnnouncementsService` in `src/server/src/services/announcement.services.mjs` to trigger bulk expiration of outdated announcements in the DB.

**Checkpoint:** Business rules, pagination formatting, status transitions, and bulk expiration services are implemented in `src/server/src/services/announcement.services.mjs`.

---

## Phase 4: Controller Layer

**Goal**: Implement HTTP request parsers and response formatters.

- [ ] T019 [P] [US1] Implement `createAnnouncementController` in `src/server/src/controllers/announcement.controllers.mjs` to parse creator details, validate required fields, and format 201 Created responses.
- [ ] T020 [P] [US2] Implement `getAnnouncementsForManagementController` in `src/server/src/controllers/announcement.controllers.mjs` to parse pagination query parameters, query services, and return paginated data.
- [ ] T021 [P] [US3] Implement `updateAnnouncementStatusController` in `src/server/src/controllers/announcement.controllers.mjs` to process status patch requests and return standardized envelopes.
- [ ] T022 [P] [US4] Implement `editAnnouncementDetailsController` in `src/server/src/controllers/announcement.controllers.mjs` to handle announcement update PUT requests.
- [ ] T023 [P] [US5] Implement `deleteAnnouncementController` in `src/server/src/controllers/announcement.controllers.mjs` to process announcement deletion.
- [ ] T024 [P] [US6] Implement `getActiveAnnouncementsController` in `src/server/src/controllers/announcement.controllers.mjs` to return public active announcements.

**Checkpoint:** Controller functions are created in `src/server/src/controllers/announcement.controllers.mjs` to orchestrate services and return standard envelopes.

---

## Phase 5: Routes

**Goal**: Define public and protected route entry points.

- [ ] T025 [P] [US6] Create `src/server/src/routes/announcement.routes.mjs` and define public `GET /` to return active announcements.
- [ ] T026 Mount public announcement routes in `src/server/src/server.mjs` under `app.use('/api/announcements', announcementRoutes)`.
- [ ] T027 Add administrative CRUD routes (POST, GET, PUT, PATCH, DELETE) to `src/server/src/routes/dashboard.librarian.routes.mjs` under `verifyToken` and `authorizeRole('librarian', 'admin')` protection.

**Checkpoint:** Routing entry points are registered in `server.mjs` and properly secured via middlewares.

---

## Phase 6: Background Scheduler

**Goal**: Automate active announcement expiration.

- [ ] T028 [P] [US7] Create background scheduler `src/server/src/utils/announcementScheduler.mjs` defining `runStartupAnnouncementCleanup` and `startPeriodicAnnouncementCleanup` using `setInterval` (running every 1 hour).
- [ ] T029 Register and run both startup and periodic announcement cleanup tasks inside `src/server/src/server.mjs`.

**Checkpoint:** The scheduler runs bulk auto-expiration of announcements on server startup and hourly intervals.

---

## Phase 7: Testing

**Goal**: Validate business logic and edge cases via unit testing.

- [ ] T030 [P] [US1] Create unit tests file `src/server/tests/services/announcement.service.spec.mjs` with test scenarios for creation, status transitions, pagination, details editing, deletion, and auto-expiration.
- [ ] T031 Execute Vitest suite via `npm run test` inside `src/server` to ensure all tests pass successfully.

**Checkpoint:** The test suite compiles and runs with 100% success rate, confirming correct business validation and execution.

---

## Technical Debt / Future Work

* **Rate Limiting on Public Endpoints**: Consider adding rate limiting middleware to public endpoints (`GET /api/announcements`) to mitigate potential DoS attacks.
* **Rich Text Sanitization**: Add HTML/markdown sanitization on the backend for the announcement `content` field if the frontend editor starts supporting rich text inputs in a later phase.
* **Audit Logs Table**: Link announcement changes to a dedicated audit logging system instead of only saving `created_by` on the announcement record itself.
* **Push Notifications**: Integrate web push notification payloads when active announcements are published.
