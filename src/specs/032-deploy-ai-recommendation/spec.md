# Feature Specification: AI Recommendation System Infrastructure & Cloud Deployment Pipeline

**Feature Branch**: `032-deploy-ai-recommendation`

**Created**: 2026-08-17

**Status**: Draft

**Input**: User description: "read @[draft.md] and specify the step for deploying the AI recommendation"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Real-Time Low-Latency Recommendation Serving (Priority: P1)

As a library user, I want instant personalized book recommendations on my dashboard so that I can discover relevant books without delay or slow loading times.

**Why this priority**: Delivering low-latency, personalized recommendations directly impacts user engagement and discovery experience on the digital library platform.

**Independent Test**: Can be tested independently by issuing recommendation requests for existing users to the backend recommendation endpoint and verifying response latency (< 50ms) and relevance of returned book candidates.

**Acceptance Scenarios**:

1. **Given** a logged-in library user requesting recommendations, **When** the recommendation engine fetches candidates and scores them, **Then** ranked recommendations are returned within low-latency bounds (< 50ms total response time).
2. **Given** a candidate book that has zero available copies in physical branch inventories, **When** recommendations are generated and scored, **Then** out-of-stock items are filtered out or penalized to ensure only available books are actively recommended.

---

### User Story 2 - Automated Graph & Feature Synchronization (Priority: P2)

As a system administrator or automated CI/CD pipeline, I want retrained GraphSAGE embeddings and graph topology automatically synchronized to the cloud feature store and Memgraph Cloud instance, so that online serving always utilizes up-to-date model representations without manual deployment steps.

**Why this priority**: Automated synchronization ensures ML model freshness, eliminates manual error-prone deployment steps, and maintains seamless alignment between relational data, graph models, and feature stores.

**Independent Test**: Can be tested independently by triggering the automated retraining pipeline via workflow dispatch and verifying that updated binary vector embeddings exist in Redis and graph nodes/relationships are restored in Memgraph Cloud.

**Acceptance Scenarios**:

1. **Given** a scheduled or manually triggered retraining job in GitHub Actions, **When** GraphSAGE representation training completes, **Then** user and item embedding vectors are exported as compact binary `float32` byte buffers to the Cloud Redis feature store.
2. **Given** a validated graph snapshot and retrained model artifacts, **When** the cloud deployment step executes, **Then** the live graph database is updated with transaction safety and memory trimming.

---

### User Story 3 - High-Throughput Micro-Ranking with Dual Feature Integration (Priority: P3)

As an AI scoring service, I want to combine graph node embeddings, real-time dot-product similarity, session metadata, and skip penalties, so that users receive diverse and non-repetitive book suggestions.

**Why this priority**: Enhances recommendation quality by combining deep structural graph embeddings with real-time tabular context and impression history.

**Independent Test**: Can be tested independently by passing candidate feature payloads into the scoring engine and verifying score adjustments based on user-item embedding dot products and impression skip penalties.

**Acceptance Scenarios**:

1. **Given** candidate books retrieved from graph prediction queries, **When** evaluated by the scoring engine alongside user embedding vectors from Redis, **Then** candidates are ranked based on combined vector similarity, session context, and item availability.
2. **Given** books previously shown to a user but left unclicked across multiple sessions, **When** fresh recommendations are generated, **Then** a progressive skip penalty factor is applied to prevent repetitive recommendations.

---

### Edge Cases

- **Cold-Start User / Missing Embedding**: When a new user has no graph interactions or missing Redis embedding vector, the system MUST fallback gracefully to baseline zero-vector representation combined with catalog popularity and rating metrics without failing the API request.
- **Feature Store Unreachable**: If the Cloud Redis instance is temporarily offline or unreachable, the scoring engine MUST fall back to GCN topological predictions or Postgres trending candidates seamlessly.
- **Pipeline Interruption / Network Timeout**: If a deployment step fails during cloud restoration, the pipeline MUST abort safely without leaving the live graph in a corrupted state, emitting clear diagnostic logs.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST maintain a high-performance Feature Store (Redis) to cache binary `float32` byte array embedding vectors for users (`emb:user:<id>`) and items (`emb:item:<id>`).
- **FR-002**: System MUST provide an automated synchronization script (`Push_embeddings_redis.py`) to extract GraphSAGE node embeddings from Memgraph and push them in bulk pipeline operations to Redis.
- **FR-003**: Python recommendation scoring engine MUST perform batch vector lookups (`mget`) from the Feature Store and compute dot-product similarity to construct feature matrices for LightGBM ranking.
- **FR-004**: Automated retraining workflow (`action-retrain.yml`) MUST execute sequential steps: database relational pull, GraphSAGE training, Redis embedding push, and Memgraph Cloud graph restoration.
- **FR-005**: Recommendation backend MUST apply impression skip penalties and inventory availability guards to filter out out-of-stock items and avoid repetitive suggestions.

### Key Entities

- **User Embedding (`emb:user:<user_id>`)**: Binary float32 vector representing the learned GraphSAGE topological representation of a user.
- **Item Embedding (`emb:item:<book_id>`)**: Binary float32 vector representing the GraphSAGE and semantic text representation of a book.
- **Recommendation Candidate Payload**: Structure containing candidate book ID, baseline GCN prediction score, session month, available inventory count, and past impression count.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of recommendation scoring requests execute within low latency (< 15ms for Python socket scoring, < 50ms end-to-end API response).
- **SC-002**: Automated retraining and deployment pipeline completes full execution (GraphSAGE training, Redis push, Memgraph Cloud restoration) in under 15 minutes.
- **SC-003**: 100% uptime for recommendation APIs during background deployment and feature store synchronization.
- **SC-004**: Zero unhandled exceptions or 500 internal server errors when Redis keys are missing or cold-start users request recommendations.

## Assumptions

- Environment secrets (`DB_HOST`, `MEMGRAPH_URI`, `MEMGRAPH_URI_SERVER`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`) are configured in GitHub Repository Secrets and `.env` files.
- Local Docker environment includes Redis (`redis:7-alpine`) service mapped on port `6379`.
- Existing TCP socket communication between Node.js server and Python socket script is maintained for low-overhead local IPC.
