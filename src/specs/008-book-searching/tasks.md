# Tasks: Book Searching (In-Place UI & Log Refinement)

**Input**: Design documents from `specs/008-book-searching/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api-contract.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic cleanup.

- [X] T001 [P] Delete old search routes directory `client/app/search/` and clear search tab configuration in global nav
- [X] T002 Configure backend variables and verify PostgreSQL connection string in `server/.env`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core database connections, schema setups, and migration.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Verify PostgreSQL connection pool configuration and pgvector extension verification in `server/src/config/db.config.mjs`
- [X] T004 Define search history endpoints and routing in `server/src/routes/search.routes.mjs` and `server/src/routes/history.routes.mjs`
- [X] T005 Verify JWT authentication middlewares in `server/src/middlewares/auth.middlewares.mjs` for optional vs mandatory login states
- [X] T006 [P] Execute database migration to rename column `query` to `search_content` in `search_history` table inside PostgreSQL (or equivalent migration SQL)

**Checkpoint**: Foundation ready - backend configurations and endpoint routing setups are in place.

---

## Phase 3: User Story 1 - In-Place Standard Search & Mode Toggle (Priority: P1) 🎯 MVP

**Goal**: Remove overlay search panel, implement in-place keyword-based standard search filtering the main catalog grid, and add the search mode selector inside the slide-out filter panel drawer.

**Independent Test**: Navigate to `/library`, click the filter button to open `FilterPanel.tsx`, select Standard Search, type a query in the search bar, hit Enter/Search, and verify matching books load in the `PopularPublishes.tsx` grid in-place.

### Implementation for User Story 1

- [X] T007 [P] [US1] Add Search Mode Selector (Standard/Semantic) toggle at the top of the slide-out filter panel in `client/app/components/organisms/FilterPanel.tsx`
- [X] T008 [P] [US1] Update `SearchBar` molecule component in `client/app/components/molecules/SearchBar.tsx` to handle in-place trigger events (e.g. on Enter, search button click, or input changes) and pass appropriate events
- [X] T009 [US1] Update `/library` page component in `client/app/library/page.tsx` to manage query states and route inputs in-place without mounting or opening the overlay `SearchPanel.tsx` (remove overlay code)
- [X] T010 [US1] Update catalog grid in `client/app/components/organisms/PopularPublishes.tsx` to fetch standard search results from `/api/search` when search query/filters are active, otherwise fall back to standard explore endpoint `/api/library/books`
- [X] T011 [US1] Update search service in `server/src/services/search.services.mjs` to execute partial matching standard metadata queries, validating integer cast constraints against NaNs/empty strings
- [X] T012 [US1] Create search controllers inside `server/src/controllers/search.controllers.mjs` mapping standard query triggers in-place

**Checkpoint**: User Story 1 is functional - metadata lookup yields matching results directly in the catalog grid on the `/library` page.

---

## Phase 4: User Story 2 - In-Place Semantic Search (Priority: P1)

**Goal**: Support similarity similarity-based semantic search matching using pgvector in PostgreSQL on the library catalog grid in-place.

**Independent Test**: Open the slide-out filter drawer, select Semantic Search, type a plot description in the search bar, click Search, and verify conceptually matching books load in the catalog grid in-place.

### Implementation for User Story 2

- [X] T013 [P] [US2] Implement query embedding generation service in `server/src/services/embedding.services.mjs` matching query words to reference database vectors
- [X] T014 [P] [US2] Implement similarity queries inside `server/src/services/search.services.mjs` utilizing pgvector cosine distance operator (`<=>`)
- [X] T015 [US2] Update controllers in `server/src/controllers/search.controllers.mjs` to invoke semantic services when search mode is "semantic", providing standard search fallback
- [X] T016 [US2] Update `/library` page in `client/app/library/page.tsx` and catalog grid in `client/app/components/organisms/PopularPublishes.tsx` to trigger and fetch semantic searches when semantic mode is toggled in the Filter Panel

**Checkpoint**: User Story 2 is functional - semantic queries execute through PostgreSQL pgvector similarity engine and display in-place.

---

## Phase 5: User Story 3 - Unified Filter Panel Reuse (Priority: P2)

**Goal**: Narrow down both general explore catalog and search results using the reused slide-out `FilterPanel.tsx`.

**Independent Test**: Open filter panel on `/library` page, choose genres, locations, publication year range, or availability. Confirm results update instantly in the grid, and filters are also passed along with standard/semantic search queries.

### Implementation for User Story 3

- [X] T017 [P] [US3] Ensure `FilterPanel.tsx` correctly propagates genres, locations (branches), year ranges, and availability switches to `client/app/library/page.tsx`
- [X] T018 [US3] Update search services in `server/src/services/search.services.mjs` to apply filters combined with standard/semantic queries (safely mapping empty fields/NaN values to null bounds)
- [X] T019 [US3] Ensure URL query synchronization in `client/app/library/page.tsx` supports both explore filters and active search filters cleanly

**Checkpoint**: User Story 3 is functional - both standard and semantic searches can be filtered via the slide-out drawer.

---

## Phase 6: User Story 4 - In-place Empty Search Feedback (Priority: P1)

**Goal**: Display user-friendly suggestion layout directly in the catalog grid when no matching books are found.

**Independent Test**: Search for a gibberish string on the library page, verify that the catalog grid shows the "No books found" screen.

### Implementation for User Story 4

- [X] T020 [P] [US4] Create or update `EmptySearchResults` molecule component in `client/app/components/molecules/EmptySearchResults.tsx` with search tips
- [X] T021 [US4] Update catalog grid component `client/app/components/organisms/PopularPublishes.tsx` to render `EmptySearchResults` when result count is 0

**Checkpoint**: User Story 4 is functional - clean fallback UI displays for empty matches inside the in-place catalog grid.

---

## Phase 7: User Story 5 & 6 - Search Intent Logging & Click-Through (Priority: P2)

**Goal**: Log searches to `search_history` (using column `search_content`) for logged-in sessions only when intent is confirmed (Enter, Search button click, or Filter change) and avoid raw keystroke logging via `logHistory`. Log clicked book details to track high-intent clicks.

**Independent Test**: Perform a search, verify that typing does not log history, but hitting Enter or toggling filters creates a `search_history` row with composed `search_content`. Verify that clicking a book from search results logs the click to `search_history` with the book ID.

### Implementation for User Story 5 & 6

- [X] T022 [P] [US5/US6] Update PostgreSQL statements to query/write column `search_content` in `server/src/models/history.models.mjs` instead of `query`
- [X] T023 [US5/US6] Compose rich search summary strings in `server/src/services/history.services.mjs` format: `Query: "[search term]" | Filters: { [genre/year/branch filters summary] }`. Ensure empty search text with filters applied is logged as `Query: (None) | Filters: { ... }`.
- [X] T024 [US5/US6] Update search controller in `server/src/controllers/search.controllers.mjs` to extract `logHistory` parameter and conditionally log history only if `logHistory: true` and user is logged in
- [X] T025 [US5/US6] Bind routes GET `/api/search/history` and POST `/api/search/history/click` to controllers in `server/src/routes/history.routes.mjs`
- [X] T026 [US6] Update `PopularPublishes.tsx` and `client/app/components/molecules/BookCard.tsx` to handle and propagate clicks, triggering `/api/search/history/click` only for intent clicks (i.e. click coming from a search/filter result state), keeping track of the active `searchHistoryId`

**Checkpoint**: User Story 5 and 6 are functional - search history (utilizing `search_content`) and click-through intent tracking log safely for logged-in sessions with debouncing.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final loading state animations, skeletons, layout responsiveness, and verification.

- [X] T027 Add skeleton loaders or loading states to `PopularPublishes.tsx` when fetching search results
- [X] T028 Run validation scenarios in `quickstart.md` and verify no overlay code remains in frontend files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all components/molecules for User Story 1 together:
Task: "Add Search Mode Selector (Standard/Semantic) toggle at the top of the slide-out filter panel in client/app/components/organisms/FilterPanel.tsx"
Task: "Update SearchBar molecule component in client/app/components/molecules/SearchBar.tsx to handle in-place trigger events"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories
