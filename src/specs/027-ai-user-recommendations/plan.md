# Implementation Plan: AI Recommendation for Login Users

**Branch**: `027-ai-user-recommendations` | **Date**: 2026-07-11 | **Spec**: [/specs/027-ai-user-recommendations/spec.md](file:///C:/Local_D/HCMUS/SE2/AmeThyst-Library/src/specs/027-ai-user-recommendations/spec.md)

**Input**: Feature specification from `/specs/027-ai-user-recommendations/spec.md`

## Summary

The AI Recommendation for Login Users feature implements a personalized recommendation engine for library members. It replaces placeholder random book carousels on the user dashboard with a machine learning-driven recommendation system utilizing a hybrid GraphSAGE (graph link prediction on Memgraph) and LightGBM (gradient boosting decision tree ranker on PostgreSQL data) pipeline. The feature supports real-time synchronization of user behaviors (searches, wishlist modifications, and borrows/returns) to Memgraph, scheduled retraining of ML models, recommendation click tracking, and user-triggered recommendation renewals.

## Technical Context

**Language/Version**: Node.js v18+ (ES Modules, Express v5.2.1), Python 3.10+ (for ML pipeline scripts).

**Primary Dependencies**:
- Backend (Node.js): `neo4j-driver` (v6.2.0) for Memgraph bolt connection, `pg` (v8.21.0) for PostgreSQL connection, `node-cron` (v3.0.3) for retraining scheduling.
- ML Pipeline (Python): `lightgbm` (v4.0.0), `neo4j` (v5.18.0), `psycopg2-binary` (v2.9.9), `scikit-learn` (v1.3.0), `pandas` (v2.1.1), `numpy` (v1.26.0).

**Storage**:
- Primary Database: PostgreSQL (holds users, books, loans, wishlists, search history, and recommends log).
- Secondary Graph Database: Memgraph (holds node representations and weighted interaction edges).

**Testing**: Jest (v25.0.0, running with experimental VM modules for ES modules), Pytest (v7.4.2) for testing ML scripts.

**Target Platform**: Linux/Windows containerized deployment with Node.js app server and Memgraph/PostgreSQL database instances.

**Project Type**: Full-stack web application with integrated Python ML service scripts.

**Performance Goals**:
- Personal recommendations fetch endpoint: `< 1.0s` response time.
- Renew recommendations execution (background trigger & page reload): `< 3.0s`.
- Asynchronous click tracking sync: non-blocking, execution time `< 500ms`.

**Constraints**:
- Recommendations must strictly exclude active wishlist items and current/past borrowed books.
- Background sync must be non-blocking and fail-silent to protect the primary client experience.
- Priority in GraphSAGE edge building must be given to active user behaviors (borrows, returns, wishlists, searches) rather than system recommendations.

**Scale/Scope**:
- Graph database: 100k+ interaction edges.
- PostgreSQL database: Thousands of catalog books, active users, search queries, and historical click impressions.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Component-Driven & Reusability)**: The Next.js frontend MUST utilize the established `RecommendationCarousel` and `BookCard` components under `client/app/components/` and customize properties to support renewal actions and click handlers. (PASSED)
- **Principle II (State Management & Data Fetching)**: The frontend MUST load the backend base URL dynamically from `NEXT_PUBLIC_API_URL` environment variables. Data fetching MUST explicitly handle `loading`, `error`, and `success` states on the Dashboard Recommendations view. (PASSED)
- **Principle VI & VIII (Directory Structure & Verified Imports)**: All code files MUST be created within the verified project structure. All ES Modules backend imports MUST use relative paths with explicit `.mjs` extensions. (PASSED)
- **Principle VII (Layered Architecture)**: The Express backend MUST follow the sequence `Route -> Middleware -> Controller -> Service -> Model`. The recommendation candidate fetch, click tracking, and renewal logic will be contained strictly inside `library.services.mjs` and a new `recommendation.services.mjs`. (PASSED)
- **Principle IX (Theme & i18n)**: Frontend changes MUST support both Light/Dark modes (via Tailwind system tokens) and Localization (English/Vietnamese translation keys in `en.json` and `vi.json` for all labels, warnings, and messages). (PASSED)

## Project Structure

### Documentation (this feature)

```text
specs/027-ai-user-recommendations/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── contracts/
    └── recommendations-contract.md # API interface contract
```

### Source Code (repository root)

```text
database/
├── Init_data/
│   ├── GraphSAGE.py          # Modified GraphSAGE pipeline prioritizing user actions
│   └── LightGBM.py           # Modified LightGBM training script
server/
├── src/
│   ├── controllers/
│   │   └── recommendation.controllers.mjs    # Coordinates recommendation fetch, click, and renew
│   ├── routes/
│   │   └── recommendation.routes.mjs         # Registers dashboard recommendation API paths
│   ├── services/
│   │   ├── recommendation.services.mjs      # Business logic for scoring, renewal, and exclusions
│   │   ├── memgraphSync.services.mjs         # Syncs click log updates asynchronously to Memgraph
│   │   └── scheduler.services.mjs            # Schedules automated periodic ML retraining
│   └── server.mjs                            # Initializes cron scheduler service on server start
client/
├── app/
│   └── dashboard/
│       └── user/
│           └── recommendations/
│               └── page.tsx                  # Recommendations page showing carousels, refresh action
```

**Structure Decision**: Consolidating Express route, controller, and services in `server/src/` aligning with backend layered design. Modifying the existing Python training scripts inside `database/Init_data/` where they are grouped, and creating a dedicated Next.js client component page.

## Complexity Tracking

*No constitution violations present. No complexity tracking entries required.*
