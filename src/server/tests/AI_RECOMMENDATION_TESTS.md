# AI Recommendation Feature - Vitest Test Suite Documentation

## Overview

This document summarizes the unit and integration test suite written in **Vitest** for the **AI Book Recommendation System** (`server/src/services/recommendation.services.mjs` and `server/src/controllers/recommendation.controllers.mjs`).

The test suite consists of **10 comprehensive test cases** designed to validate cache management, TCP socket communication with the machine learning ranking server, graph candidate retrieval from Memgraph, hard guardrails (stock availability), scoring adjustments (skip penalty), candidate pool supplementation, click interaction logging, database error fallbacks, and API controller integration.

---

## Test Environment & Configuration

- **Test Framework**: Vitest (`v4.1.10`)
- **Project Name**: `test_recommendation`
- **Config file**: [vitest.config.mjs](file:///C:/Local_D/HCMUS/SE2/AmeThyst-Library/src/server/vitest.config.mjs)
- **Test File**: [recommendation.test.mjs](file:///C:/Local_D/HCMUS/SE2/AmeThyst-Library/src/server/tests/recommendation.test.mjs)
- **Execution Command**: `npm run test:recommendation`

---

## Detailed Test Cases Breakdown

### 1. Cache Management - Hit (`getUserRecommendations`)
- **Focus**: Validates that when active recommendations exist in the in-memory cache (`recommendationCache`), the service returns cached data directly without querying PostgreSQL.
- **Preconditions**: First call populates memory cache with 15 recommendation items.
- **Expected Output**: 
  - First call queries PostgreSQL (`pool.query` called 1 time).
  - Second call returns identical data from memory without executing additional database queries (`pool.query` stays at 1 call).

### 2. Cache Management - Miss & Invalidation (`invalidateUserRecommendationCache`)
- **Focus**: Verifies that calling `invalidateUserRecommendationCache(userId)` clears the memory cache and forces the next request to fetch active recommendations from PostgreSQL.
- **Preconditions**: Recommendation cache initialized for `test-user-id`.
- **Expected Output**: After cache invalidation, `getUserRecommendations` executes a new database query (`pool.query` count increases from 1 to 2).

### 3. Database Error Resilience & Fallback (`getUserRecommendations`)
- **Focus**: Tests system resilience when PostgreSQL database connection or queries fail during recommendation retrieval.
- **Preconditions**: `pool.query` throws an error (`PostgreSQL Connection Failed`).
- **Expected Output**: Service catches exception gracefully and executes fallback catalog query, returning 15 catalog books with default `score: 0.0`.

### 4. TCP Socket Inference Handler (`runRankerInference` & `generateRecommendations`)
- **Focus**: Validates end-to-end communication over TCP socket between Node.js recommendation service and Python micro-ranking inference server (simulated via test TCP socket server).
- **Preconditions**: Mock TCP server active on `process.env.RECOMMENDATION_PORT`.
- **Expected Output**: Payload is serialized, transmitted over TCP, parsed on response, and returns ranked books sorted by GCN score (top candidate score `0.9`).

### 5. Graph Candidate Retrieval - Cold Start Fallback (`fetchPersonalizedCandidates`)
- **Focus**: Tests Graph DB (Memgraph) candidate retrieval when a user has low interaction count (<60 candidate books).
- **Preconditions**: Memgraph primary interaction Cypher query returns only 5 candidates.
- **Expected Output**: Triggers cold-start fallback Cypher query to retrieve top-rated catalog books from Memgraph (`session.run` called twice).

### 6. Hard Guardrail - Out-of-Stock Item Filtering (`generateRecommendations`)
- **Focus**: Enforces business logic guardrail preventing out-of-stock books (`global_available_copies === 0`) from being recommended.
- **Preconditions**: Candidate `stock-book-0` has 0 available copies in library inventory.
- **Expected Output**: `stock-book-0` is filtered out during feature compilation; output contains only available books.

### 7. Skip Penalty Scoring Adjustment (`generateRecommendations`)
- **Focus**: Verifies recommendation score discounting for books previously shown to the user but skipped (unclicked impressions).
- **Preconditions**: `book-skipped` has `past_impressions_count = 2` with initial GCN score `0.9`.
- **Expected Output**: Penalty multiplier $0.65^2 = 0.4225$ applied; final score adjusted to $0.9 \times 0.4225 \approx 0.38025$.

### 8. Candidate Pool Supplementation (`generateRecommendations`)
- **Focus**: Ensures candidate pool maintains minimum requirement of 15 items even when user interaction history yields fewer candidates.
- **Preconditions**: Candidate retrieval produces only 1 initial candidate.
- **Expected Output**: System queries general catalog to supplement 14 additional candidates, returning exactly 15 recommendations.

### 9. Click Tracking & Memgraph Sync (`logRecommendationClick`)
- **Focus**: Tests recommendation click interaction logging, database update, memory cache invalidation, and non-blocking Memgraph sync.
- **Preconditions**: Recommendation click recorded for `book-0`.
- **Expected Output**: 
  - Updates PostgreSQL row (`is_clicked = TRUE`, `renewed_at = NOW()`), returning `true`.
  - Clears in-memory cache.
  - Invokes `syncRecommendationClick('test-user-id', 'book-0', timestamp)`.

### 10. Controller Endpoint Integration (`getRecommendations`)
- **Focus**: Validates Express controller response formatting for `GET /api/dashboard/user/recommendations`.
- **Preconditions**: Mock request containing authenticated `req.user.userId`.
- **Expected Output**: Controller returns HTTP 200 JSON payload:
  ```json
  {
    "success": true,
    "data": {
      "historyBased": [...],
      "trending": [...]
    }
  }
  ```

---

## Test Results & Execution Summary

| Test Case | Test Description | Focus Area | Result |
|---|---|---|---|
| **1** | Cache Hit | In-memory cache reuse | **PASS** |
| **2** | Cache Invalidation | Memory invalidation & DB re-fetch | **PASS** |
| **3** | Database Fallback | Error recovery & catalog default | **PASS** |
| **4** | TCP Socket Client | ML Ranker TCP socket communication | **PASS** |
| **5** | Cold Start Graph Fallback | Memgraph low-interaction fallback | **PASS** |
| **6** | Out-of-Stock Guardrail | Stock inventory filtering | **PASS** |
| **7** | Skip Penalty Discount | Impression penalty scoring ($0.65^N$) | **PASS** |
| **8** | Candidate Supplementation | Catalog supplementation for small pools | **PASS** |
| **9** | Click Interaction & Sync | Click tracking & Memgraph sync | **PASS** |
| **10** | Controller API Endpoint | End-to-end controller JSON payload | **PASS** |

**Summary**: 10 tests passed (100% pass rate) in ~700ms.
