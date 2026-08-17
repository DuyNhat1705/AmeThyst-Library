# Quickstart Guide: AI Recommendation System & Feature Store Pipeline

This quickstart guide outlines how to run, verify, and test the AI recommendation pipeline locally and in staging environments.

---

## 1. Prerequisites & Environment Setup

Ensure your local development environment has:
- Python >= 3.10
- Node.js >= 18
- Docker & Docker Compose

### Environment File Configuration (`src/database/.env` & `src/server/.env`)

```ini
# PostgreSQL (Supabase / Local)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=amethyst

# Memgraph Database
MEMGRAPH_HOST=localhost
MEMGRAPH_PORT=7687
MEMGRAPH_URI=bolt://localhost:7687

# Redis Feature Store
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Recommendation Socket Server
RECOMMENDATION_PORT=5001
```

---

## 2. Local Container & Infrastructure Execution

Start local PostgreSQL, Memgraph, and Redis instances:

```bash
cd src/database
docker-compose up -d
```

Verify Redis container status:

```bash
docker exec -it amethyst_redis redis-cli ping
# Expected output: PONG
```

---

## 3. End-to-End Local Execution Flow

### Step 1: Initialize Database & Vector Embeddings

```bash
# Push text embeddings to Postgres
python src/database/Init_data/Embedding.py

# Sync relational data to local Memgraph container
python src/database/Init_data/Init_graph.py
```

### Step 2: Train GraphSAGE & Sync Redis Feature Store

```bash
# Train GraphSAGE weighted topological representations
python src/database/Init_data/GraphSAGE.py

# Export node embeddings to local Redis container
python src/database/Init_data/Push_embeddings_redis.py
```

### Step 3: Inspect Redis Feature Store Keys

```bash
docker exec -it amethyst_redis redis-cli keys "emb:*"
```

---

## 4. Testing Recommendation Scoring Engine

### Run Automated Backend Tests

```bash
cd src/server
npm run test:recommendation
```

### Run Python Scoring Socket Server Directly

```bash
python src/server/src/recommendation/predict_server.py
```

---

## 5. Deployment Verification Checklist

- [ ] Redis container operational and listening on port `6379`.
- [ ] `Push_embeddings_redis.py` executes without errors and loads `emb:user:*` and `emb:item:*` keys.
- [ ] Backend `/api/recommendations` endpoint returns ranked recommendation list in under 50ms.
- [ ] GitHub Actions workflow `.github/workflows/action-retrain.yml` passes with green status.
