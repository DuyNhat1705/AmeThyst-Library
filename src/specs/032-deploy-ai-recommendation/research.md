# Research & Design Decisions: AI Recommendation System Infrastructure & Cloud Deployment Pipeline

## Feature Context
This feature establishes the end-to-end infrastructure for serving real-time, low-latency (< 50ms) AI book recommendations and automating the CI/CD retraining pipeline connecting Supabase PostgreSQL, Memgraph Cloud, Cloud Redis Feature Store, and GitHub Actions.

---

## Technical Decisions & Rationale

### 1. Feature Store Strategy: Cloud Redis with Binary `float32` Buffers

- **Decision**: Store GraphSAGE node embeddings ($z_{\text{user}}, z_{\text{item}}$) in Redis as compact binary byte buffers (`float32` array serialized via NumPy `tobytes()`) under keys `emb:user:<id>` and `emb:item:<id>`.
- **Rationale**:
  - String/JSON vector serialization in Redis incurs unnecessary parsing overhead and memory inflation.
  - Binary `float32` byte strings reduce memory footprint by 70% and allow direct zero-copy byte-array reconstruction in Python via `np.frombuffer()`.
  - Batch retrieval via `redis.mget()` fetches dozens of candidate item vectors in a single round-trip (< 2ms).
- **Alternatives Considered**:
  - *PostgreSQL pgvector column lookups during live scoring*: Rejected due to database connection pool limits and higher query latency under concurrent load.
  - *In-memory Node.js JavaScript Map*: Rejected because embeddings cannot be shared across multiple Node process workers or updated seamlessly by background GitHub Actions retrain jobs.

---

### 2. Synchronization Pipeline: Offline Batch Push (`Push_embeddings_redis.py`)

- **Decision**: Create a dedicated standalone script `Push_embeddings_redis.py` that extracts retrained node features from Memgraph, formats them as binary float buffers, and pushes them in non-blocking pipeline transactions (`r.pipeline()`) to Cloud Redis.
- **Rationale**:
  - Decouples feature store updates from online serving logic.
  - Bulk pipeline writes enable pushing thousands of vectors in seconds.
  - Integrates seamlessly into the GitHub Actions retraining workflow (`action-retrain.yml`).
- **Alternatives Considered**:
  - *Real-time Memgraph query during online scoring*: Rejected because executing `MATCH (n) WHERE n.id = $id RETURN n.features` per candidate adds 20-50ms to online scoring latency.

---

### 3. Serving Engine Architecture: Persistent TCP Socket Server + LightGBM

- **Decision**: Retain and extend the persistent Python socket server (`predict_server.py`) running on port `5001`, embedding direct Redis connection pooling for real-time vector retrieval and LightGBM ranking.
- **Rationale**:
  - Raw TCP socket IPC between Node.js and Python maintains sub-5ms communication latency.
  - LightGBM booster model (`lgb.Booster`) evaluates candidate feature rows (combining $z_{\text{user}}$, $z_{\text{item}}$, dot-product similarity, session month, and impression penalties) in < 10ms.
- **Alternatives Considered**:
  - *Migrating to HTTP FastAPI REST service*: Evaluated dual-mode capability, but raw TCP socket is retained as primary IPC mechanism to avoid HTTP header/JSON parsing overhead.

---

### 4. Continuous Integration & Deployment: Multi-Tiered GitHub Actions Pipeline

- **Decision**: Configure `.github/workflows/action-retrain.yml` with sequential deployment stages:
  1. Pull latest relational data from Supabase PostgreSQL into local training container.
  2. Execute weighted topological GraphSAGE training (`GraphSAGE.py`).
  3. Export retrained node embeddings to Cloud Redis (`Push_embeddings_redis.py`).
  4. Restore sanitized Cypher graph topology to Memgraph Cloud (`Deploy_cloud.py`).
- **Rationale**:
  - Ensures atomic deployment where feature store vectors and cloud graph topology update in sync.
  - Employs transactional batch restoration and explicit memory trimming (`FREE MEMORY`) to run safely on cloud instances.
- **Alternatives Considered**:
  - *Separate independent workflows for Redis and Memgraph*: Rejected due to risk of state desynchronization between graph topology and feature store embeddings.
