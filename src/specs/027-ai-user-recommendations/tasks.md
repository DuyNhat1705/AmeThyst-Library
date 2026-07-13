# Tasks: AI User Recommendations

**Input**: Design documents from `/specs/027-ai-user-recommendations/`

**Prerequisites**: [plan.md](file:///C:/Local_D/HCMUS\SE2/AmeThyst-Library/src/specs/027-ai-user-recommendations/plan.md) (required), [spec.md](file:///C:/Local_D/HCMUS\SE2/AmeThyst-Library/src/specs/027-ai-user-recommendations/spec.md) (required for user stories), [research.md](file:///C:/Local_D/HCMUS\SE2/AmeThyst-Library/src/specs/027-ai-user-recommendations/research.md), [data-model.md](file:///C:/Local_D/HCMUS\SE2/AmeThyst-Library/src/specs/027-ai-user-recommendations/data-model.md), [contracts/recommendations-contract.md](file:///C:/Local_D/HCMUS\SE2/AmeThyst-Library/src/specs/027-ai-user-recommendations/contracts/recommendations-contract.md).

**Tests**: Temporarily skipped as requested. Focus is strictly on building the running system and automating retraining.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- All descriptions include exact file paths.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic dependencies configuration.

- [x] T001 [P] Install `node-cron` package in `server/package.json`
- [x] T002 [P] Configure Python environment packages (`lightgbm`, `neo4j`, `psycopg2-binary`, `scikit-learn`, `pandas`, `numpy`) in system environment or virtual environment

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core database schema and background scheduling mechanisms.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 Setup PostgreSQL recommends table and indexes in a new migration script `database/init_db/05_recommends.sql`
- [x] T004 [P] Implement Memgraph recommended click and renewal sync methods in `server/src/services/memgraphSync.services.mjs`
- [x] T005 Implement background cron scheduler task to retrain GraphSAGE and LightGBM models in `server/src/services/scheduler.services.mjs`
- [x] T006 Initialize the cron scheduler on application server start in `server/src/server.mjs`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - View Personalized Recommendations on User Dashboard (Priority: P1) 🎯 MVP

**Goal**: Fetch, filter, score, and display personalized book recommendations.

**Independent Test**: Visit the dashboard recommendation page, verify the "Based on your reading history" carousel displays personalized book cards, and assert that none of the books are in the user's wishlist or borrow list.

### Implementation for User Story 1

- [x] T007 [P] [US1] Implement Python inference script `server/src/recommendation/predict.py` to retrieve PostgreSQL features and score candidates using the trained LightGBM model
- [x] T008 [US1] Create recommendation service in `server/src/services/recommendation.services.mjs` to fetch GCN predictions from Memgraph, filter exclusions, execute `predict.py`, and save active recommendations
- [x] T009 [P] [US1] Create recommendation controller in `server/src/controllers/recommendation.controllers.mjs` to handle fetching active recommendations
- [x] T010 [US1] Create recommendation routes in `server/src/routes/recommendation.routes.mjs` registering active recommendation fetch endpoint
- [x] T011 [US1] Register recommendation routes within the main application server in `server/src/server.mjs`
- [x] T012 [US1] Create frontend dashboard recommendations page in `client/app/dashboard/user/recommendations/page.tsx` rendering personalized carousel cards with loading/error handling

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Renew Personalized Recommendations (Priority: P2)

**Goal**: Invalidate current active recommendations and trigger regeneration of a fresh personalized list.

**Independent Test**: Click the "Renew Recommendations" button on the dashboard, see the loading state, and verify that a fresh set of book cards is loaded.

### Implementation for User Story 2

- [x] T013 [US2] Add recommendation renewal logic in `server/src/services/recommendation.services.mjs` to update PostgreSQL and Memgraph logs with the current timestamp under `renewed_at`
- [x] T014 [US2] Expose the renewal POST endpoint in `server/src/controllers/recommendation.controllers.mjs` and `server/src/routes/recommendation.routes.mjs`
- [x] T015 [US2] Integrate the renewal button and hook its onClick handler to trigger the renew API in `client/app/dashboard/user/recommendations/page.tsx`

**Checkpoint**: Recommendation renewal works independently.

---

## Phase 5: User Story 3 - Track Recommendation Interaction (Priority: P2)

**Goal**: Track user clicks on recommended book cards and log the interaction.

**Independent Test**: Click a recommended book card, verify it navigates to details, and verify PostgreSQL database shows `is_clicked = true` and `renewed_at` is set.

### Implementation for User Story 3

- [x] T016 [US3] Implement click tracking method in `server/src/services/recommendation.services.mjs` updating `is_clicked = true` and `renewed_at = CURRENT_TIMESTAMP`
- [x] T017 [US3] Expose recommendation click tracking POST route in `server/src/controllers/recommendation.controllers.mjs` and `server/src/routes/recommendation.routes.mjs`
- [x] T018 [US3] Add a click-through click logger event handler on book cards in `client/app/dashboard/user/recommendations/page.tsx`

**Checkpoint**: Recommendation clicks are successfully recorded.

---

## Phase 6: User Story 4 - View Trending Recommendations (Priority: P2)

**Goal**: Display trending books based on aggregate user interactions, excluding user-specific wishlisted/borrowed books.

**Independent Test**: Verify that the "Trending this week" carousel displays popular books and correctly excludes user wishlist/borrow records.

### Implementation for User Story 4

- [x] T019 [US4] Implement trending book query service method in `server/src/services/recommendation.services.mjs` compiling overall interactions and applying user filters
- [x] T020 [US4] Render the trending carousel section in `client/app/dashboard/user/recommendations/page.tsx`

**Checkpoint**: Personalized and trending recommendation feeds are fully complete.

---

## Phase 7: ML Retraining Logic Optimization (Priority: P2)

**Goal**: Update training scripts to prioritize user inputs and run via background subprocess.

**Independent Test**: Trigger retraining manually or via cron scheduler, verify training completes, and verify only clicked recommended edges are loaded into the GraphSAGE model.

### Implementation for Phase 7

- [x] T021 [US2] Modify GraphSAGE edge generation query in `database/Init_data/GraphSAGE.py` to only load clicked recommended edges (`is_clicked = true`) and run retraining locally
- [x] T022 [US2] Add subprocess execution triggers for `GraphSAGE.py` and `LightGBM.py` in `server/src/services/scheduler.services.mjs`

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Spacing, responsiveness, performance tuning, and localization.

- [x] T023 [P] Add recommendation-related English and Vietnamese translations in `client/app/locales/en.json` and `client/app/locales/vi.json`
- [x] T024 Validate complete system E2E flow using validation scenarios in `specs/027-ai-user-recommendations/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup completion. Blocks all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational completion.
  - User Story 1 (P1) is the MVP and must be completed first.
  - User Story 2, 3, and 4 can then proceed in parallel.
- **ML Retraining Logic (Phase 7)**: Depends on Foundational scheduler setup.
- **Polish (Phase 8)**: Depends on all user stories and training pipelines.

### Parallel Opportunities

- Setup tasks `T001` and `T002` can run in parallel.
- Click and renewal sync methods `T004` can run in parallel with scheduler setup `T005`.
- GBDT prediction script `T007` can be written in parallel with controller creation `T009`.
- Localization updates `T023` can be written in parallel with final verification `T024`.

---

## Parallel Example: Setup Phase

```bash
# Developer A configures Python ML libraries
Task: "Configure Python environment packages in system environment or virtual environment"

# Developer B installs node-cron dependency
Task: "Install node-cron package in server/package.json"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational database migrations and scheduling placeholders.
2. Complete candidate retrieval service and `predict.py` inference script.
3. Hook up Node routes and controllers.
4. Render the dashboard page with personalized carousel.
5. **STOP and VALIDATE**: Verify that personalized recommendations appear on the user dashboard.

### Incremental Delivery

1. Setup foundation.
2. Add User Story 1 (MVP) -> View recommendations.
3. Add User Story 2 -> Renew recommendations.
4. Add User Story 3 -> Track clicks.
5. Add User Story 4 -> View trending recommendations.
6. Refine training script constraints and scheduler trigger logic.
7. Final polish and localization.
