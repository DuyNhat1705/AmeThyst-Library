# Implementation Plan: Announcement Management Backend

**Branch**: `021-announcement-backend` | **Date**: 2026-07-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `src/specs/021-announcement-backend/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command.

## Summary

This plan outlines the design and implementation of the Announcement Management backend feature for the LIMA library system. We will create the models, services, controllers, routes, and scheduler following the existing layered architecture (ES Modules, Express, pg.Pool). We will also write Vitest unit tests for the service layer and provide an additive SQL migration to link announcements with user accounts for auditing.

## Technical Context

**Language/Version**: Node.js (ES Modules, `.mjs`)

**Primary Dependencies**: Express.js, `pg` (PostgreSQL client via `pg.Pool` from `config/postgres.mjs`)

**Storage**: PostgreSQL 15, `announcements` table

**Testing**: Vitest (using `vi.mock` for unit testing the service layer)

**Target Platform**: Node.js Environment

**Project Type**: REST API Backend Web Service

**Performance Goals**: Fast database response times (<50ms for CRUD operations)

**Constraints**:
* Standard LIMA response envelopes:
  * Success: `{ success: true, data: [...], message: "..." }`
  * Error: `{ success: false, data: null, message: "..." }`
* Protect administrative routes using existing middleware: `verifyToken` + `authorizeRole('librarian', 'admin')`.
* Keep validation logic manual without external libraries unless already present in `package.json`.

**Scale/Scope**: Manage public and draft library announcements, supporting pagination and status filters.

## Constitution Check

*GATE: Passed. Review and verification against the project's core principles:*

1. **Component-Driven / Reusability (Service Reusability)**:
   * All database interactions are encapsulated inside `models/announcement.models.mjs`.
   * Core business logic (creating, editing, pagination formatting, status checks) is handled entirely in the service layer (`services/announcement.services.mjs`), making it completely decoupled and reusable.

2. **State Management**:
   * **N/A** (Backend REST API only; no frontend state).

3. **Error Handling & Accessibility**:
   * Explicit try-catch blocks are implemented in all controllers.
   * Proper HTTP status codes are returned (201 Created, 200 OK, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error) with structured JSON error messages in the `{ success: false, data: null, message }` format.

4. **Performance**:
   * The `announcements` table has a primary key index on `announce_id`. Query filters on `status` and `expired_date` will run on a small dataset (typically <1000 records total), so no additional index is needed at this stage.

5. **Security**:
   * Role-based access control (RBAC) is enforced using existing middleware: `verifyToken` and `authorizeRole('librarian', 'admin')` for all management routes.
   * Public endpoints (displaying active/non-expired announcements) will run without role protection, ensuring visitors and patrons can view them easily.

## Project Structure

### Documentation (this feature)

```text
src/specs/021-announcement-backend/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code

```text
src/
├── database/
│   └── init_db/
│       └── postgres/
│           └── 07_announcement_alter.sql       # SQL migration file
│
└── server/
    ├── src/
    │   ├── controllers/
    │   │   └── announcement.controllers.mjs    # CRUD / status controllers
    │   │
    │   ├── models/
    │   │   └── announcement.models.mjs         # SQL queries
    │   │
    │   ├── routes/
    │   │   ├── announcement.routes.mjs         # Public routing
    │   │   └── dashboard.librarian.routes.mjs  # Admin routing (modified)
    │   │
    │   ├── services/
    │   │   └── announcement.services.mjs       # Business logic / pagination
    │   │
    │   ├── utils/
    │   │   └── announcementScheduler.mjs       # Expiry background worker
    │   │
    │   └── server.mjs                          # Register routes and scheduler (modified)
    │
    └── tests/
        └── services/
            └── announcement.service.spec.mjs   # Vitest unit test suite
```

**Structure Decision**: The files are organized directly under `src/server/src` following the standard Route-Controller-Service-Model architecture structure, with the database migration placed under `src/database/init_db/postgres` and tests placed under `src/server/tests/services`.

## Complexity Tracking

*No constitution check violations; no entries required.*
