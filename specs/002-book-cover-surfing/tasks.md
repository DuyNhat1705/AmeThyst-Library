# Tasks: Book Cover Surfing

**Input**: Design documents from `/specs/002-book-cover-surfing/`

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Install `neo4j-driver` and `chromadb` dependencies
- [x] T002 Create database configuration in `src/server/config/db.mjs`

---

## Phase 2: Foundational (Backend Services)

- [x] T003 Implement `getSurfingBooks` in `src/server/services/library.services.mjs`
- [x] T004 Implement `getBookDetails` in `src/server/services/library.services.mjs`
- [x] T005 Create API controllers in `src/server/controllers/library.controller.mjs`
- [x] T006 Register routes in `src/server/routes/library.mjs`

---

## Phase 3: User Story 1 - Visual Discovery Grid (P1)

- [x] T007 Add masonry styles to `src/client/app/globals.css`
- [x] T008 Implement `/surfing` page with infinite scroll in `src/client/app/surfing/page.js`
- [x] T009 Add "Surfing" link to `src/client/app/components/NavBar.js`

---

## Phase 4: User Story 2 - Book Deep Dive (P1)

- [x] T010 Implement detail modal in `src/client/app/surfing/page.js`
- [x] T011 Integrate modal with `/api/books/:id/details` endpoint

---

## Phase 5: Cleanup & Refactoring

- [x] T012 Refactor server folder structure to remove redundant `src/server/src` nesting
- [x] T013 Update import paths and `package.json` for the refactored structure

**Status**: All tasks completed.
