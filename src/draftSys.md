## System Architecture Specification: Two-Stage Recommender Pipeline

This document outlines the complete workflow for the hybrid **Retrieval (GraphSAGE)** and **Ranking (LightGBM)** library recommendation engine.

---

## 1. The Database Architecture (PostgreSQL)

The code agent must maintain four operational transactional tables to feed data into the machine learning layers:

* **`searches`**: Logs explicit user keyword search interactions.
* **`recommendation_impressions`**: Logs recommendations shown to the user.
* `is_clicked = FALSE` when served.
* `is_clicked = TRUE` updated immediately if clicked.
* `renewed_at = TIMESTAMP` populated when a feed is manually refreshed or session expires.


* **`user_wishlists`**: Acts as a high-intent bookmarking table for saved items.
* **`book_inventory` / `branches**`: Houses physical branch tracking information and real-time inventory limits (`available_copies`).

---

## 2. Offline Training Pipeline (Asynchronous Tasks)

### Stage 1: Macro Retrieval Engine (Memgraph MAGE + GraphSAGE)

1. **Sync Graph Topology:** Extract users, books, and interaction records from PostgreSQL and insert them into Memgraph.
2. **Topological Multi-Edge Ingestion (Weight Workaround):** Because Memgraph's native GraphSAGE module operates strictly on unweighted adjacency matrices, pass interaction weights structural-style. Use a Cypher `UNWIND` loop to generate parallel `:INTERACTED` edges based on interaction type and time decay scales:
* *Borrows* = 5 parallel edges (base scale)
* *Returns* = 4 parallel edges
* *Wishlists* = 3 parallel edges
* *Search Clicks* = 1 parallel edge


3. **Feature Backfill:** Map static text transformer vector embeddings (`all-MiniLM`) onto `:Book.features`. Initialize non-book node labels with structural zero-vectors.
4. **Execute Training:** Call `link_prediction.train()` to optimize neighborhood embeddings.
5. **Output:** A high-speed candidate retrieval block capable of parsing the entire catalog down to the **Top 100 relevant book IDs** for any active user profile.

### Stage 2: Micro Ranking Engine (Local LightGBM Classifier)

1. **Compile Tabular Training Matrix:** Execute a relational query in PostgreSQL across historical impressions to calculate engineering features:
* `session_month`: Temporal tracking indicator.
* `past_impressions_count`: Number of historical unclicked views for this book where `renewed_at IS NULL` (The Penalty Box).
* `is_in_wishlist`: Binary flag indicating if the book was saved at the time of view.
* `global_available_copies`: Combined available library branch stock.
* `label`: Binary target vector matching row click outcomes (`is_clicked`).


2. **Execute Tree Boosting:** Train a local LightGBM binary classifier on CPU using the engineered feature matrix.
3. **Output:** Export a compact weight configuration file named `lightgbm_ranker.txt` directly to the backend runtime workspace.

---

## 3. Online Inference Pipeline (Live Page Load Lifecycle)

Every time a user visits or refreshes their dashboard layout, the application backend must execute this synchronized sequence:

```
[User Loads Dashboard]
        │
        ▼
1. Fetch 80 Personalized Candidates from Memgraph (via GraphSAGE)
   + Fetch 20 Globally Hot Candidates from PostgreSQL (Trending Query)
   ──► Merge into a single target pool of 100 unique book IDs
        │
        ▼
2. PostgreSQL Hard Guardrail (Inventory Stock Verification)
   ──► Query `book_inventory` table
   ──► Instantly drop any book ID where SUM(available_copies) == 0
        │
        ▼
3. Vector Feature Assembly
   ──► Query Postgres to calculate live contextual features for surviving books:
       [current_month, past_unrenewed_skips, wishlist_status, total_stock]
        │
        ▼
4. LightGBM Scoring Logic (`lightgbm_ranker.txt`)
   ──► Pass the feature grid into the cached model booster
   ──► Rank candidates descending based on predicted click probabilities
        │
        ▼
5. Post-Processing Postures (Epsilon-Greedy Exploration Blending)
   ──► Assign positions 1 through 4 to the absolute top algorithmic choices.
   ──► Generate a random float for slot 5:
       ├── If rand < 0.10: Pick a random candidate from ranks 5-30 (Explore)
       └── Else: Take algorithmic position 5 (Exploit)
        │
        ▼
6. Render & Transaction Log
   ──► Deliver the finalized top 5 layout array to the user interface.
   ──► Run a batch SQL operation to insert 5 new rows into 
       `recommendation_impressions` with `is_clicked = FALSE` and `renewed_at = NULL`.

```

---

## 4. Active Feedback State Updates

The agent must handle two specific event endpoints to keep the learning cycle functional:

* **User Clicks a Recommendation:** Send a `POST` request to fire an `UPDATE` query setting `is_clicked = TRUE` for that specific `user_id` and `book_id` pair.
* **User Hits "Refresh / Renew Feed":** Fire an `UPDATE` query setting `renewed_at = CURRENT_TIMESTAMP` for all current `is_clicked = FALSE` rows. This resets their dynamic `past_impressions_count` back to 0 on the next pass, clearing them from the active penalty box.