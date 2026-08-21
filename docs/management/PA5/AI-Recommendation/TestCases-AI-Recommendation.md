# Test Plan and Test Cases

    Project: Modern Library Management System (LIMA)
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026

Performed by: Trần Lê Hoàng Gia | Reviewed by: Vũ Duy Nhất | Edited by: Trần Lê Hoàng Gia

## Table of Contents

- [Test Plan and Test Cases](#test-plan-and-test-cases)
  - [Table of Contents](#table-of-contents)
  - [I. Test Plan](#i-test-plan)
    - [1. Test objectives and scope](#1-test-objectives-and-scope)
      - [Quality Objectives](#quality-objectives)
      - [Scope Boundaries](#scope-boundaries)
    - [2. Features to be tested](#2-features-to-be-tested)
    - [3. Test environment and tools](#3-test-environment-and-tools)
    - [4. Test schedule and responsibilities](#4-test-schedule-and-responsibilities)
    - [5. Entry and exit criteria](#5-entry-and-exit-criteria)
      - [Entry Criteria](#entry-criteria)
      - [Exit Criteria](#exit-criteria)
  - [II. Test Cases](#ii-test-cases)
    - [1. Use Case 1: View Recommended Book (UC-AIR-01)](#1-use-case-1-view-recommended-book-uc-air-01)
    - [2. Use Case 2: Reset AI Recommend (UC-AIR-02)](#2-use-case-2-reset-ai-recommend-uc-air-02)

---

## I. Test Plan

### 1. Test objectives and scope

The primary objective of this testing campaign is to perform rigorous quality assurance and integration testing for the **AI Personalized Book Recommendation Engine** embedded within the Modern Library Management System (LIMA) platform.

#### Quality Objectives
- **Functional Correctness**: Ensure candidate recommendation generation, user interaction history fetching, and API payload contracts behave strictly according to functional specifications (`UC-AIR-01`, `UC-AIR-02`).
- **Deterministic Mathematical Scoring**: Validate the exact mathematical formulation of Graph Convolutional Network (GCN) ranker output combined with exponential skip penalty decay factor ($0.65^N$).
- **IPC Socket Reliability**: Validate high-throughput, low-latency inter-process communication (IPC) over raw TCP sockets between the Node.js service layer and the Python PyTorch/LightGBM micro-ranker daemon.
- **Cache Lifecycle Management**: Ensure dual-tier caching (in-memory Map cache backed by PostgreSQL sync) maintains strict consistency and invalidates predictable state transitions upon user interaction events.
- **Fault-Tolerant Resilience**: Guarantee zero unhandled system crashes during database connectivity failures or Memgraph cold-start graph query shortages by falling back gracefully to general catalog trends.

#### Scope Boundaries
- **In-Scope**:
  - Node.js IPC raw TCP socket client handler (`runRankerInference`).
  - Dual-tier cache implementation (`recommendationCache` Map and PostgreSQL sync).
  - Graph DB Cypher candidate generation queries (`fetchPersonalizedCandidates` with Memgraph).
  - Business rules & hard inventory guardrails (pruning items where `global_available_copies === 0`).
  - Service routines in `recommendation.services.mjs`.
  - REST Controller endpoints in `recommendation.controllers.mjs`
- **Out-of-Scope**:
  - Offline GraphSAGE neural network loss function convergence and gradient descent training.
  - Front-end React UI component layout rendering performance (covered under dedicated UI test suite).

---

### 2. Features to be tested

| Sub-Routine / Module Name | Module Location | Feature Description |
| :--- | :--- | :--- |
| `getUserRecommendations` | Service | Dual-tier lookup returning cached recommendations or fetching new ones from PostgreSQL/Memgraph. |
| `invalidateUserRecommendationCache` | Service | Clears memory Map cache for a specific user upon action triggers or explicit reset commands. |
| `runRankerInference` | Service | Handles raw TCP socket IPC handshake, JSON payload serialization framing, and score sorting with Python ML daemon. |
| `fetchPersonalizedCandidates` | Service | Executes primary Cypher query against Memgraph DB; falls back to cold-start Cypher query if candidate count $< 60$. |
| `generateRecommendations` | Service | Orchestrates candidate gathering, inventory feature enrichment, ML ranking, skip penalty scoring, catalog supplementation, and DB persistence. |
| `adjustCandidateScores` | Service | Filters out out-of-stock items (`global_available_copies === 0`) and applies exponential skip penalty score discounting. |
| `logRecommendationClick` | Service | Persists click event (`is_clicked = TRUE`), evicts user cache, and triggers async Memgraph graph edge synchronization. |

---

### 3. Test environment and tools

- **Test Automation Framework**: Vitest `v4.1.10` with mock TCP socket servers and spied database pool modules.
- **Runtime Environment**: Node.js `v20.11.0` (ES Modules `.mjs`).
- **Relational Storage**: PostgreSQL 16 (`pg` Connection Pool).
- **Graph Knowledge Base**: Memgraph `v2.14` (Bolt protocol / Neo4j driver interface).
- **AI Micro-Ranker**: Python 3.11 daemon running LightGBM & PyTorch GraphSAGE over TCP socket (`127.0.0.1:5999`).
- **Execution Platform**: Windows 11 Enterprise / x64.

---

### 4. Test schedule and responsibilities

- **Test design and review:** before execution - Trần Lê Hoàng Gia.
- **Test execution:** 2026-08-12 to 2026-08-16 - Trần Lê Hoàng Gia.
- **Final review:** before PA5 submission - Trần Lê Hoàng Gia.

---

### 5. Entry and exit criteria

#### Entry Criteria
1. Subsystem implementation of [`recommendation.services.mjs`] passes ESLint syntactic static analysis with zero lint errors.
2. PostgreSQL database migration schemas and Memgraph initial graph projection scripts are fully defined.
3. Vitest test runner environment configured with isolated environment variables (`process.env.RECOMMENDATION_PORT = 5999`).

#### Exit Criteria
1. 100% execution pass rate across all 10 core integration test cases (`TC-SRV-REC-001` to `TC-SRV-REC-010`).
2. Zero Blocker or Critical defects remaining open in the defect tracking log.
3. Complete suite execution duration remains strictly $\le 1.0\text{s}$ (measured actual: ~684ms).
4. Hard inventory guardrail verified: Zero candidates with 0 physical copies presented in recommendation feeds.

---

## II. Test Cases

### 1. Use Case 1: View Recommended Book (UC-AIR-01)

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: In-Memory Cache Hit Validation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate that repeating a recommendation request for an active user hits the in-memory Map cache (<code>recommendationCache</code>) and avoids secondary database SQL queries (<code>pool.query</code>).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, memory cache pre-cleared, PostgreSQL DB containing 15 pre-computed recommendations.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call <code>getUserRecommendations('test-user-id')</code>.</li>
          <li>Record the number of SQL queries executed by <code>pool.query</code>.</li>
          <li>Immediately invoke <code>getUserRecommendations('test-user-id')</code> a second time.</li>
          <li>Compare output objects and inspect <code>pool.query</code> call count.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">The first call queries the database once (<code>pool.query</code> count = 1) and returns 15 recommendation items. The second call retrieves the array directly from the in-memory Map cache (<code>pool.query</code> count remains 1). Returned array matching <code>result1 === result2</code>.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Database Connection Resilience & Catalog Fallback
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate system fault tolerance when PostgreSQL pool encounters connection failure, verifying graceful fallback to standard catalog trend items without unhandled exceptions.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, primary query configured to throw <code>Error('PostgreSQL Connection Failed')</code>, secondary query returning 15 fallback catalog books.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Execute <code>getUserRecommendations('test-user-id')</code> during active database pool exception.</li>
          <li>Capture returned data structure and inspect error handling logs.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Service handles exception internally without crashing or throwing an unhandled rejection. Returns exactly 15 fallback items with default <code>score: 0.0</code> and fallback titles (<code>fallback-book-0</code> through <code>fallback-book-14</code>).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: TCP Socket Inference Handler & Framing
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate raw TCP socket IPC communication with Python ML micro-ranker daemon, verifying JSON payload framing with trailing newline <code>\n</code> and output score re-ranking.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, Mock TCP Server on <code>127.0.0.1:5999</code> returning JSON payload with GCN scores <code>[0.9, 0.85, ...]</code>.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Trigger <code>generateRecommendations('test-user-id')</code>.</li>
          <li>Mock server intercepts JSON TCP payload containing candidate array and responds with score JSON.</li>
          <li>Validate candidate score ordering in service response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Payload serialized as valid JSON string with trailing newline <code>\n</code>. Service receives and parses response buffer correctly. Recommendations returned sorted in descending order of GCN score (<code>result[0].score === 0.9</code>).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Memgraph Candidate Retrieval & Cold-Start Fallback
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-005</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate candidate retrieval from Memgraph DB; verify that if primary graph traversal returns fewer than 60 records, secondary cold-start Cypher query is executed.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, primary Cypher graph query yielding 5 records (&lt; 60 threshold), secondary cold-start query yielding 60 records.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Mock <code>getSession().run</code> to return 5 records on 1st call, and 60 records on 2nd call.</li>
          <li>Invoke <code>generateRecommendations('test-user-id')</code>.</li>
          <li>Count total calls to <code>session.run</code>.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;"><code>session.run</code> is executed exactly twice, successfully triggering the secondary cold-start graph traversal Cypher query. Candidate pool is populated with merged items from both graph passes.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Hard Guardrail – Out-of-Stock Item Filtering
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-006</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate business rule inventory guardrail (<code>adjustCandidateScores</code>) ensuring items with 0 available physical copies (<code>global_available_copies === 0</code>) are pruned regardless of GCN score.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Candidate <code>stock-book-0</code> with raw GCN score <code>0.9</code> and <code>global_available_copies: 0</code>; items <code>stock-book-1..14</code> with <code>global_available_copies: 5</code>.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke <code>generateRecommendations('test-user-id')</code>.</li>
          <li>Inspect candidate list returned by service routine.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Candidate <code>stock-book-0</code> is completely pruned from recommendation output (<code>result.some(b => b.id === 'stock-book-0') === false</code>). Total returned items maintain quota via supplementation.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Exponential Skip Penalty Scoring Calculation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate mathematical precision of exponential skip decay formula Score_final = Score_GCN * (0.65)^N for past skipped impressions.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>book-skipped</code> with raw score <code>0.90</code> and <code>past_impressions_count = 2</code>; <code>book-fresh</code> with raw score <code>0.80</code> and <code>past_impressions_count = 0</code>.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Execute <code>generateRecommendations('test-user-id')</code>.</li>
          <li>Extract calculated <code>book-skipped</code> score from output.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Final score matches exact mathematical formula: 0.90 * (0.65)^2 = 0.90 * 0.4225 = 0.38025. <code>expect(skippedItem.score).toBeCloseTo(0.38025, 4)</code> evaluates to true.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Candidate Pool Catalog Supplementation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate catalog supplementation algorithm ensuring recommendation feed strictly maintains minimum 15-item quota when graph queries return insufficient items.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, Graph queries return only 1 item (<code>few-book-1</code>).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Execute <code>generateRecommendations('test-user-id')</code>.</li>
          <li>Check database queries for catalog supplementation pass.</li>
          <li>Verify returned array length.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Database is queried for catalog supplementation (<code>supp-book-0</code> through <code>supp-book-13</code>). Returned array length is exactly 15 items.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Click Tracking, Eviction & Graph Sync Integration
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-009</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate end-to-end click tracking lifecycle: updating PostgreSQL click flag (<code>is_clicked = TRUE</code>), evicting user cache Map, and invoking async graph sync (<code>syncRecommendationClick</code>).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, <code>bookId = "book-0"</code>, active recommendations cached in memory Map.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call <code>getUserRecommendations('test-user-id')</code> to populate cache.</li>
          <li>Invoke <code>logRecommendationClick('test-user-id', 'book-0')</code>.</li>
          <li>Assert PostgreSQL update query executed (<code>is_clicked = TRUE</code>).</li>
          <li>Assert <code>syncRecommendationClick</code> called with user, book ID, and timestamp.</li>
          <li>Call <code>getUserRecommendations('test-user-id')</code> again.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Click recorded successfully (<code>logged === true</code>). In-memory cache for user is evicted; subsequent lookup triggers DB reload (<code>pool.query</code> count increments). Non-blocking graph edge sync invoked with ISO timestamp.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Express Controller API Contract Validation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate REST controller endpoint (<code>getRecommendations</code>) payload formatting into <code>historyBased</code> (15 items) and <code>trending</code> arrays with HTTP 200 OK status.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01) & Reset AI Recommend (UC-AIR-02)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Mock Request <code>req = { user: { userId: 'test-user-id' } }</code>, Mock Response <code>res</code> with spied <code>json</code> and <code>status</code> methods.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call <code>getRecommendations(req, res)</code> controller handler.</li>
          <li>Inspect response payload passed to <code>res.json()</code>.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP Response status implicitly set to 200 OK. Response payload contains <code>{ success: true, data: { historyBased: [...], trending: [...] } }</code>.</td>
    </tr>
  </tbody>
</table>

---

### 2. Use Case 2: Reset AI Recommend (UC-AIR-02)

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Cache Invalidation & Miss Flow
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate that invoking <code>invalidateUserRecommendationCache</code> properly evicts user cache entry from memory Map, causing subsequent requests to trigger a database query miss.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reset AI Recommend (UC-AIR-02)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, active recommendations cached in memory Map.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Execute <code>getUserRecommendations('test-user-id')</code> to ensure cache populate (<code>pool.query</code> count = 1).</li>
          <li>Invoke <code>invalidateUserRecommendationCache('test-user-id')</code>.</li>
          <li>Call <code>getUserRecommendations('test-user-id')</code> once more.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Cache eviction function succeeds silently. The subsequent <code>getUserRecommendations</code> call experiences a cache miss and queries PostgreSQL (<code>pool.query</code> count increments to 2).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Express Controller API Contract Validation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate REST controller endpoint (<code>getRecommendations</code>) payload formatting into <code>historyBased</code> (15 items) and <code>trending</code> arrays with HTTP 200 OK status.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01) & Reset AI Recommend (UC-AIR-02)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Mock Request <code>req = { user: { userId: 'test-user-id' } }</code>, Mock Response <code>res</code> with spied <code>json</code> and <code>status</code> methods.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call <code>getRecommendations(req, res)</code> controller handler.</li>
          <li>Inspect response payload passed to <code>res.json()</code>.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP Response status implicitly set to 200 OK. Response payload contains <code>{ success: true, data: { historyBased: [...], trending: [...] } }</code>.</td>
    </tr>
  </tbody>
</table>
