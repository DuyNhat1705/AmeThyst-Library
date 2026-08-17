# Interface Contract: AI Recommendation Serving & Feature Store Protocol

## 1. Node.js Backend <-> Python IPC Socket Scoring Contract

- **Protocol**: Raw TCP Socket
- **Port**: `5001` (configurable via `RECOMMENDATION_PORT`)
- **Host**: `127.0.0.1`

### Request Payload (Node.js -> Python Socket Server)

Sent as a single JSON object terminated by a newline (`\n`):

```json
{
  "user_id": "28e1e0be-7a2b-444f-ab9f-5477109a29e5",
  "candidates": [
    {
      "id": "1020049",
      "session_month": 8,
      "past_impressions_count": 1,
      "is_in_wishlist": 0,
      "global_available_copies": 5,
      "gcn_score": 0.842
    },
    {
      "id": "11253413",
      "session_month": 8,
      "past_impressions_count": 0,
      "is_in_wishlist": 1,
      "global_available_copies": 2,
      "gcn_score": 0.915
    }
  ]
}
```

### Response Payload (Python Socket Server -> Node.js)

Returned as a single JSON line:

```json
{
  "success": true,
  "ranked": [
    {
      "id": "11253413",
      "score": 0.9412
    },
    {
      "id": "1020049",
      "score": 0.7854
    }
  ]
}
```

### Error Response

```json
{
  "success": false,
  "error": "Connection to Redis feature store timed out"
}
```

---

## 2. Feature Store Key Schema (Python <-> Redis)

- **Engine**: Redis 7.x
- **Format**: Binary float32 byte buffers

| Key Pattern | Type | Content | Example |
| :--- | :--- | :--- | :--- |
| `emb:user:<user_id>` | `String` (Binary Bytes) | 384 x 4 bytes float32 vector | `emb:user:28e1e0be-7a2b-444f-ab9f-5477109a29e5` |
| `emb:item:<book_id>` | `String` (Binary Bytes) | 384 x 4 bytes float32 vector | `emb:item:1020049` |

### Batch Retrieval Protocol (`predict_server.py`)

```python
# Multi-get item embeddings in a single pipeline round-trip
item_keys = [f"emb:item:{c['id']}" for c in candidates]
raw_bytes = redis_client.mget(item_keys)
```

---

## 3. GitHub Actions Retraining Pipeline Environment Contract

The automated retrain pipeline expects the following environment secrets configured in repository secrets:

| Secret Key | Required By | Purpose |
| :--- | :--- | :--- |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | `Init_graph.py`, `Embedding.py` | Supabase PostgreSQL relational connection |
| `MEMGRAPH_URI`, `MEMGRAPH_USER`, `MEMGRAPH_PASSWORD` | `GraphSAGE.py`, `Push_embeddings_redis.py` | Local/Training Memgraph instance |
| `MEMGRAPH_URI_SERVER`, `MEMGRAPH_USER_SERVER` | `Deploy_cloud.py` | Cloud Memgraph deployment target |
| `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` | `Push_embeddings_redis.py` | Cloud Redis Feature Store |
