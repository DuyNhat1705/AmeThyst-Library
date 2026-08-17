# Tasks: AI Recommendation System Infrastructure & Cloud Deployment Pipeline

**Input**: Design documents from `/specs/032-deploy-ai-recommendation/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Infrastructure configuration for local containerized Redis service

- [ ] T001 Verify Redis container service definition in `database/docker-compose.yml`
- [ ] T002 Configure Redis environment secrets (`REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`) in `database/.env` and `server/.env`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Base client connections and environment libraries required before user story implementation

- [ ] T003 Setup Python `redis` and `numpy` dependencies in virtual environment
- [ ] T004 Create base Redis connection pool helper in `server/src/recommendation/predict_server.py`

---

## Phase 3: User Story 1 - Real-Time Low-Latency Recommendation Serving (Priority: P1) 🎯 MVP

**Goal**: Deliver real-time recommendation scoring using Redis feature lookups and socket IPC in under 50ms.

**Independent Test**: Execute `npm run test:recommendation` in `server/` to verify latency (< 50ms) and out-of-stock item filtering.

### Implementation for User Story 1

- [ ] T005 [P] [US1] Create Redis vector retrieval in `server/src/recommendation/predict_server.py` for batch loading `emb:user:<id>` and `emb:item:<id>`
- [ ] T006 [US1] Extend LightGBM candidate feature row construction in `server/src/recommendation/predict_server.py` combining embeddings, dot products, and tabular context
- [ ] T007 [US1] Add inventory availability guard and fallback handling in `server/src/services/recommendation.services.mjs`
- [ ] T008 [US1] Add test cases for Redis fallback and socket recommendation serving in `server/tests/services/recommendation.services.spec.mjs`

**Checkpoint**: User Story 1 is fully functional and independently testable as an MVP increment.

---

## Phase 4: User Story 2 - Automated Graph & Feature Synchronization (Priority: P2)

**Goal**: Automate GraphSAGE node embedding export to Cloud Redis and sanitized graph deployment to Memgraph Cloud in CI/CD.

**Independent Test**: Run `python database/Init_data/Push_embeddings_redis.py` locally and verify `emb:*` keys in Redis.

### Implementation for User Story 2

- [ ] T009 [P] [US2] Implement standalone Redis bulk export script in `database/Init_data/Push_embeddings_redis.py`
- [ ] T010 [US2] Integrate `Push_embeddings_redis.py` into GitHub Actions workflow `.github/workflows/action-retrain.yml`
- [ ] T011 [US2] Update graph deployment script in `database/Init_data/Deploy_cloud.py` with transactional memory trimming (`FREE MEMORY`)

**Checkpoint**: User Story 2 is independently functional for automated model deployment.

---

## Phase 5: User Story 3 - High-Throughput Micro-Ranking with Dual Feature Integration (Priority: P3)

**Goal**: Enhance recommendation diversity with impression skip penalties and epsilon-greedy exploration.

**Independent Test**: Pass repeat impression payloads to `predict_server.py` and verify progressive score discounting.

### Implementation for User Story 3

- [ ] T012 [P] [US3] Implement progressive skip penalty factor ($0.65^{\text{past\_impressions\_count}}$) in `server/src/services/recommendation.services.mjs`
- [ ] T013 [US3] Implement epsilon-greedy exploration mixing (20% exploration probability) in `server/src/services/recommendation.services.mjs`

**Checkpoint**: All user stories complete and independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validation and full test suite regression check

- [ ] T014 [P] Update local quickstart guide in `specs/032-deploy-ai-recommendation/quickstart.md`
- [ ] T015 Run full backend test suite (`npm test` in `server/`) to verify zero regressions across all services

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories.
- **User Stories (Phases 3-5)**: Depend on Foundational phase completion (P1 → P2 → P3).
- **Polish (Phase 6)**: Depends on completion of all user story phases.

---

## Parallel Execution Opportunities

- T005 [US1] and T009 [US2] can be developed in parallel (separate Python files).
- T012 [US3] can proceed in parallel once T007 [US1] is established.
- T014 [Polish] documentation updates can proceed in parallel with T015 test execution.
