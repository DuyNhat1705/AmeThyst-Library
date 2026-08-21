# Individual Reflective Report: AI Recommendation & Core Systems

**Student Name**: Trần Lê Hoàng Gia

**Course**: CS300 / CSC13002 – Introduction to Software Engineering

**Project**: Modern Library Management System (LIMA)

**Group**: 03 (Amethyst)

**Primary Focus Area**: AI Recommendation Engine (`UC-AIR-01`, `UC-AIR-02`), System Architecture, and Vitest Verification Suite

---

## 1. Personal Task Experience: Successes & Challenges

### What Went Well

* **End-to-End AI Recommendation Pipeline**: Successfully engineered the hybrid recommendation service (`recommendation.services.mjs`), linking graph-based candidate retrieval from Memgraph with an asynchronous Graph Convolutional Network (GCN) ranking daemon over raw TCP sockets.


* **Automated Test Suite Design**: Designed and implemented the complete 10-case Vitest integration and unit testing suite (`recommendation.test.mjs`), achieving a 100% pass rate in ~700ms.


* **Multi-Tier Caching & Performance**: Implemented an in-memory Map cache (`recommendationCache`) backed by PostgreSQL persistence, eliminating redundant database queries on repeated requests and drastically reducing API latency.


* **Resilience by Architecture**: Built layered fallback handlers: when user graph interactions are sparse ($<60$ candidates), the service automatically executes cold-start Cypher queries; if PostgreSQL or ranking connections drop, it falls back gracefully to default catalog listings (`score: 0.0`) without crashing.



### Challenges Overcome

* **Asynchronous TCP Socket IPC Streaming**: Connecting the Node.js backend to the Python PyTorch ranker via raw TCP sockets caused stream framing and socket buffer chunking issues. I resolved this by establishing explicit JSON delimiter protocols and structured buffer parser handlers on both ends.


* **Cache Coherency & State Mutation**: Ensuring that real-time user interactions (clicks, manual resets via `UC-AIR-02`) reliably purged the in-memory cache while simultaneously triggering non-blocking Memgraph event synchronizations required careful event-driven hook design.


* **Inventory Stock Enforcement Guardrails**: GCN models naturally prioritize relevance over physical constraints. I designed pre-inference feature compilation filters to discard items with zero available copies (`global_available_copies === 0`), guaranteeing that out-of-stock titles are never recommended.


* **Dynamic Impression Decay**: Implementing the skip penalty formula ($S_{\text{final}} = S_{\text{GCN}} \times 0.65^N$) required managing tracking counters for unclicked impressions to penalize stale suggestions without requiring continuous model retraining.



---

## 2. Spec Kit & Specification-Driven Development Experience

### Experience with Spec Kit

Working with Spec Kit shifted my approach from ad-hoc coding to specification-first development. By establishing preconditions, basic flows, and explicit alternative exception paths in the Use-Case Specifications (such as `Recommendation Generation Error` and `Cache Expiration Cleared`), the architectural boundaries became clear before writing service logic.

```
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│       Specification (Spec Kit)       │ ──► │      Automated Vitest Test Suite     │
│ • UC-AIR-01: View Recommendations   │     │ • TC-01: In-Memory Cache Hit         │
│ • UC-AIR-02: Reset & Eviction        │     │ • TC-06: Out-of-Stock Filter         │
│ • 15-Item Minimum Display Quota      │     │ • TC-07: Skip Penalty (0.65^N)       │
│ • DB Connection Failure Fallback     │     │ • TC-08: General Pool Supplement     │
└──────────────────────────────────────┘     └──────────────────────────────────────┘

```

### Benefits Compared to Traditional Development

* **Precise Test Case Synthesis**: Formalized use-case constraints directly dictated test assertions. For example, the 15-item recommendation quota and the cold-start candidate floor directly inspired Vitest test cases `TC-AIR-05` and `TC-AIR-08`.


* **Deterministic Edge Case Coverage**: Specifying exception flows beforehand ensured that database connection failures and empty candidate sets were treated as expected execution branches rather than unhandled bugs.



### Limitations & Friction Points

* **Static Specs vs. Stateful IPC Architectures**: Spec Kit templates are designed around static CRUD inputs and struggled to model dynamic, asynchronous microservices like TCP socket event loops and real-time graph traversals.


* **Maintenance Overhead**: Minor schema updates (such as tracking `past_impressions_count` for skip penalties) required updating specifications and test fixtures across multiple documents.



---

## 3. AI Coding Tools Usage & Evaluation

### Effective Aspects & Contributions

* **Test Fixture & Mock Socket Construction**: AI tools helped accelerate boilerplate generation for mocking the TCP Socket Server in Vitest, establishing stream listeners that simulate PyTorch GCN responses.


* **Mathematical Scoring Helpers**: LLM assistants assisted in generating test data matrices and floating-point assertions for the exponential decay skip penalty ($S_{\text{final}} = S_{\text{GCN}} \times 0.65^N$).


* **Cypher Query Optimization**: AI tools provided structural templates for complex Cypher queries used to traverse collaborative user-book graph relationships in Memgraph.



```
                     ┌──────────────────────────────────────────┐
                     │          AI Tools Effectiveness          │
                     └────────────────────┬─────────────────────┘
                                          │
         ┌────────────────────────────────┼────────────────────────────────┐
         ▼                                ▼                                ▼
[ Mock Socket Generation ]     [ Math Assertion Logic ]        [ Cypher & SQL Scaffolding ]
 • TCP client/server harness    • Penalty: S * 0.65^N           • Memgraph traversal queries
 • Buffer event listeners       • Precision assertions          • PostgreSQL migration scripts

```

### Limitations & Pitfalls Encountered

* **IPC Protocol Hallucinations**: AI tools consistently defaulted to suggesting HTTP REST client mocks (`axios`, `fetch`), missing the project's requirement for raw TCP socket communication and requiring custom implementation.


* **Omission of Negative Business Rules**: Initial test cases generated by AI assistants focused only on happy-path cache hits. They missed critical safety guardrails—such as pruning out-of-stock items (`global_available_copies === 0`)—until I manually added those constraints.


* **Multi-File Context Degradation**: Passing multiple service files and database configuration modules simultaneously often caused AI assistants to misname internal properties or generate outdated syntax.

---

## 4. SDLC & Course Process Feedback

* **Stagger Formal Documentation Milestones**: Authoring over 90 pages of detailed RUP specifications in PA3 before validating complex technical spikes caused rework when architectural needs (such as socket IPC vs. REST) changed. Introducing an initial lightweight Technical Architecture Spike would prevent document churn.


* **Allocate Dedicated Marks for Integration Scaffolding**: Multi-service setups (Node.js, Python ML daemon, PostgreSQL, and Memgraph) require substantial DevOps effort. Awarding explicit milestones for container orchestration (Docker Compose) would encourage cleaner system integration.


* **Integrate Jira with Git Automation**: Enforce automated Git commit hooks referencing Jira issue keys (`SCRUM-XX`) to reinforce real-world agile tracking across sprint deliverables.

---

## 5. Individual Reflection & Personal Learning

Throughout this project, I served as the technical lead for the AI recommendation subsystem (`SCRUM-81`, `SCRUM-74`), the software architecture and system context diagrams (`SCRUM-99`), database schema setups (`SCRUM-25`, `SCRUM-44`), and the Vitest automated test suite (`SCRUM-98`, `SCRUM-113`).

This project gave me valuable practical experience in:

* Engineering hybrid architectures integrating relational databases (PostgreSQL), graph databases (Memgraph), and machine learning rankers.


* Implementing IPC communication across different runtimes via raw TCP sockets.


* Designing multi-tier caching strategies with reliable cache invalidation patterns.


* Applying test-driven development (TDD) by writing automated test cases that enforce business guardrails and fault-tolerant fallbacks under real-world conditions.