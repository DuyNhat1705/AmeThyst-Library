# Tasks: Book Searching

**Input**: Design documents from `specs/008-book-searching/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/api-contract.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and directory structure setups.

- [ ] T001 Create search page directory `client/app/search/` and default components structures
- [ ] T002 Configure `NEXT_PUBLIC_API_URL` inside `client/.env.local`
- [ ] T003 [P] Add database connection credentials and embedding API keys in server `.env`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core backend setup for routing and database connections.

- [ ] T004 Verify PostgreSQL connection configuration and setup pgvector in `server/src/config/db.config.mjs`
- [ ] T005 Setup basic routes mapping inside `server/src/routes/search.routes.mjs` and `server/src/routes/history.routes.mjs`
- [ ] T006 Initialize base search controller shell in `server/src/controllers/search.controllers.mjs`
- [ ] T007 Initialize base search history controller shell in `server/src/controllers/history.controllers.mjs`

**Checkpoint**: Foundation ready - backend configurations and endpoint routing setups are in place.

---

## Phase 3: User Story 1 - Standard Search (OPAC) (Priority: P1) 🎯 MVP

**Goal**: Implement metadata-based search (Title, Author, ISBN, Publisher) with visual search toggle.

**Independent Test**: Navigate to `/search`, run a Standard Search for an author name or title, and verify that matching books are returned in the grid.

### Implementation for User Story 1

- [ ] T008 [P] [US1] Create database querying methods in `server/src/services/search.services.mjs` to fetch books by Title, Author, ISBN, or Publisher using partial matches
- [ ] T009 [P] [US1] Create `SearchToggle` atom component in `client/app/components/atoms/SearchToggle.jsx`
- [ ] T010 [P] [US1] Create `SearchBar` molecule component in `client/app/components/molecules/SearchBar.jsx`
- [ ] T011 [US1] Bind metadata search service to endpoints in `server/src/controllers/search.controllers.mjs`
- [ ] T012 [US1] Create `SearchResultsGrid` organism in `client/app/components/organisms/SearchResultsGrid.jsx` to render list of book cards
- [ ] T013 [US1] Assemble standard search elements in `client/app/search/page.jsx`

**Checkpoint**: User Story 1 is functional - metadata lookup yields matching results on a responsive grid.

---

## Phase 4: User Story 2 - Semantic Search (Priority: P1)

**Goal**: Implement description-based semantic similarity search using pgvector in PostgreSQL.

**Independent Test**: Toggle to Semantic Search, search for a book plot/concept (e.g., "wizard school"), and verify that contextually relevant books are returned.

### Implementation for User Story 2

- [ ] T014 [P] [US2] Implement embedding generator service helper in `server/src/services/embedding.services.mjs`
- [ ] T015 [P] [US2] Implement similarity query methods inside `server/src/services/search.services.mjs` utilizing pgvector cosine distance
- [ ] T016 [US2] Update `server/src/controllers/search.controllers.mjs` to execute semantic search service when mode is "semantic"
- [ ] T017 [US2] Connect search action in `client/app/search/page.jsx` to trigger semantic search endpoint request

**Checkpoint**: User Story 2 is functional - semantic queries execute through PostgreSQL pgvector similarity engine.

---

## Phase 5: User Story 3 - Metadata Filtering (Priority: P2)

**Goal**: Narrow down search results by publication date range, genres, page count, and language.

**Independent Test**: Execute search and apply "Fantasy" genre filter; confirm results are restricted to Fantasy books.

### Implementation for User Story 3

- [ ] T018 [P] [US3] Create `FilterCheckbox` and `RangeInput` atoms in `client/app/components/atoms/`
- [ ] T019 [P] [US3] Create `FilterSidebar` organism in `client/app/components/organisms/FilterSidebar.jsx`
- [ ] T020 [US3] Implement backend filtering parameters handling in `server/src/services/search.services.mjs` (mapping filters to PostgreSQL WHERE clauses combined with pgvector query)
- [ ] T021 [US3] Integrate `FilterSidebar` inside `client/app/search/page.jsx` to trigger filtering requests on filters change

**Checkpoint**: User Story 3 is functional - both standard and semantic searches can be filtered.

---

## Phase 6: User Story 4 - Clear Response for No Matches (Priority: P1)

**Goal**: Show a user-friendly message when query yields zero results.

**Independent Test**: Search for a gibberish string and verify the friendly "No books found" screen is displayed.

### Implementation for User Story 4

- [ ] T022 [P] [US4] Create `EmptySearchResults` molecule component in `client/app/components/molecules/EmptySearchResults.jsx` with search tips
- [ ] T023 [US4] Update `SearchResultsGrid` in `client/app/components/organisms/SearchResultsGrid.jsx` to render `EmptySearchResults` when result count is 0

**Checkpoint**: User Story 4 is functional - clean fallback UI displays for empty matches.

---

## Phase 7: User Story 5 - Search History & Preference Logging (Priority: P2)

**Goal**: Log searches for logged-in users to PostgreSQL database to support preference prediction.

**Independent Test**: Log in, run search, and verify a record is added to the `SearchHistory` table. Run search as guest and verify no record is added.

### Implementation for User Story 5

- [ ] T024 [P] [US5] Implement authentication checker middleware in `server/src/middlewares/auth.middlewares.mjs`
- [ ] T025 [P] [US5] Set up Postgres schema definition for `SearchHistory` in `server/src/models/history.models.mjs`
- [ ] T026 [US5] Implement search logging method inside `server/src/services/history.services.mjs`
- [ ] T027 [US5] Update route handler in `server/src/controllers/search.controllers.mjs` to trigger history logging asynchronously for logged-in users
- [ ] T028 [US5] Create history retrieval methods in `server/src/services/history.services.mjs` and wire endpoints in `server/src/routes/history.routes.mjs`

**Checkpoint**: User Story 5 is functional - search history is tracked and logged safely for logged-in sessions.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final UI updates, loading states, and verification.

- [ ] T029 Add loading state animations/skeletons to `SearchResultsGrid`
- [ ] T030 Ensure the design is fully responsive across desktop, tablet, and mobile layouts
- [ ] T031 Run validation scenarios in `quickstart.md`
