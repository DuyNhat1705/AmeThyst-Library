# Reflective Report

    Project: Modern Library Management System (LIMA)
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026

Performed by: Trần Lê Hoàng Gia | Reviewed by: Vũ Duy Nhất | Edited by: Trần Lê Hoàng Gia

## Table of Contents

- [Reflective Report](#reflective-report)
  - [Table of Contents](#table-of-contents)
  - [I. Team Experience](#i-team-experience)
    - [1. What went well](#1-what-went-well)
    - [2. Challenges faced](#2-challenges-faced)
  - [II. Spec Kit Experience](#ii-spec-kit-experience)
    - [1. Experience](#1-experience)
    - [2. Benefits \& Limitations in Comparison with Traditional Development](#2-benefits--limitations-in-comparison-with-traditional-development)
  - [III. AI Tools Usage](#iii-ai-tools-usage)
    - [1. Effective aspects](#1-effective-aspects)
    - [2. Limitations encountered](#2-limitations-encountered)
  - [IV. SDLC Feedback](#iv-sdlc-feedback)
  - [V. Individual Contributions](#v-individual-contributions)
    - [1. Trần Lê Hoàng Gia](#1-trần-lê-hoàng-gia)

---

## I. Team Experience

### 1. What went well

* **Mutual Support and Cross-Coverage**: When individual team members encountered academic workload spikes or technical blockers, other members stepped in to cover pending tasks, ensuring steady progress across sprint backlogs.

* **Agile Adaptability to Schedule Changes**: The team handled sudden scheduling adjustments and shifting milestone deadlines by reprioritizing Jira backlogs dynamically (from early schema definitions in `SCRUM-25` to testing AI recommendations in `SCRUM-98`/`SCRUM-113`).


* **Modular Subsystem Ownership**: Assigning clear ownership over distinct domains (AI recommendation pipelines, interactive UI/map modules, and database synchronization) reduced merge conflicts and enabled independent testing.

### 2. Challenges faced

* **Steep Learning Curve for New Toolchains**: Integrating non-traditional tools (SpecKit, Vitest `v4.1.10`, and the Memgraph graph database) required significant initial self-training (`SCRUM-47`) before productive development could begin.


* **Book Data Scraping & Ingestion Bottlenecks**: Gathering realistic library catalog data (`SCRUM-16`) involved scraping external book repositories, which frequently triggered anti-bot rate limits and HTTP 403 blocks, requiring custom user-agent rotation, polite request throttling, and extensive schema cleaning before database ingestion.

* **Dual-Database Synchronization**: Maintaining data consistency between PostgreSQL (relational transactional state) and Memgraph (collaborative filtering interaction graph) proved challenging, particularly during real-time event logging (`logRecommendationClick`) and cache invalidation. The team resolved this by implementing non-blocking, asynchronous synchronization event hooks.


* **Infrastructure Constraints on Free-Tier Tooling**: Working within the constraints of free and open-source tiers required running PostgreSQL and Memgraph locally alongside containerized mocks rather than relying on paid hosted cloud solutions.

- **Asynchronous TCP Socket IPC Streaming**: Connecting the Node.js backend to the Python PyTorch ranker via raw TCP sockets caused stream framing and socket buffer chunking issues. Resolved by establishing explicit JSON delimiter protocols with trailing `\n` and structured buffer parser handlers on both ends.

- **Cache Coherency & State Mutation**: Ensuring that real-time user interactions (clicks, manual resets via `UC-AIR-02`) reliably purged the in-memory cache while simultaneously triggering non-blocking Memgraph event synchronizations required careful event-driven hook design.

---

## II. Spec Kit Experience

### 1. Experience

Working with Spec Kit shifted the development approach from ad-hoc coding to specification-first development. By establishing preconditions, basic flows, and explicit alternative exception paths in Use-Case Specifications (such as defining `UC-AIR-01` *View Recommended Book* and `UC-AIR-02` *Reset AI Recommend*), the architectural boundaries and API contracts became clear before writing service routines in [`recommendation.services.mjs`](file:///C:/Local_D/HCMUS/SE2/AmeThyst-Library/src/server/src/services/recommendation.services.mjs).

### 2. Benefits & Limitations in Comparison with Traditional Development

**Benefits**
- **Accelerated Delivery and Architectural Alignment**: Spec Kit streamlined baseline service code generation (e.g., scaffolding signatures for `getUserRecommendations` and `generateRecommendations`), cutting initial setup overhead and allowing engineering effort to focus on socket IPC integration, graph queries, and architectural compliance.
- **Precise Test Case Synthesis**: Formalized use-case constraints directly dictated test assertions. For example, the 15-item recommendation quota and cold-start threshold ($<60$ candidates) in `UC-AIR-01` directly inspired Vitest test cases `TC-SRV-REC-005` (*Memgraph Cold-Start Fallback*) and `TC-SRV-REC-008` (*Catalog Supplementation*).
- **Deterministic Edge Case Coverage**: Specifying exception flows beforehand ensured edge cases were treated as expected execution branches rather than unexpected crashes. For example, database connection failure specs led directly to `TC-SRV-REC-003`, asserting that the service gracefully returns 15 fallback catalog books with `score: 0.0`.
- **Architectural Traceability**: Provided a clear, verifiable link between business requirements, service routines, and test suites. For instance, mapping `UC-AIR-02` (*Cache Eviction*) directly to `invalidateUserRecommendationCache` and verifying its cache miss execution flow in `TC-SRV-REC-002`.

**Limitations**
- **Static Specs vs. Stateful IPC Architectures**: Spec Kit templates are primarily designed around static CRUD inputs/outputs and struggled to model dynamic, stateful microservices like raw TCP socket stream framing on port `5999` (`runRankerInference`) or asynchronous Memgraph Bolt protocol graph traversals.
- **Maintenance Overhead**: Minor schema updates required updating specifications and test fixtures across multiple files. For instance, introducing the exponential skip penalty decay formula ($\text{Score}_{\text{final}} = \text{Score}_{\text{GCN}} \times 0.65^N$) required updating `past_impressions_count` definitions across feature specs, database mocks, and `TC-SRV-REC-007` test assertions.
- **High Upfront Time Investment**: Writing detailed specification documents (preconditions, main flows, exception flows, postconditions) for candidate generation required several days of upfront effort before writing any Node.js service code.

---

## III. AI Tools Usage

### 1. Effective aspects
- **End-to-End Workflow Acceleration Across SDLC Phases**: AI tools dramatically reduced turnaround time across all SDLC phases—from drafting RUP specifications (PA1–PA3) and C4 Container diagrams for Node.js, Python ML daemon, PostgreSQL, and Memgraph, to scaffolding backend services, writing PostgreSQL migration scripts, and generating the 10 automated Vitest integration cases in [`recommendation.services.spec.mjs`] (PA4–PA5).
- **Rapid Prototyping & Boilerplate Scaffolding**: Automatically generated complex test boilerplate, such as creating a Vitest mock TCP server using `net.createServer()` listening on `127.0.0.1:5999` to simulate Python LightGBM/PyTorch score arrays (`[0.9, 0.85, ...]`), shifting manual effort toward system integration and SLA latency checks.
- **Accelerated Technology Onboarding & Cross-Domain Research**: Fast-tracked the adoption of specialized technologies across the stack by generating structural query templates—such as Memgraph Bolt Cypher graph traversal queries (`MATCH (u:User {id: $userId})-[r:INTERACTED]->(b:Book)...`) and PostgreSQL `pg` pool transaction handling.
- **Automated Bug Diagnosis & Assertion Synthesis**: Accelerated debugging by scanning multi-file stack traces to diagnose floating-point precision drift (`BUG-REC-02`), and synthesized exact mathematical test assertions (e.g., asserting `expect(score).toBeCloseTo(0.38025, 4)` for raw GCN score $0.90$ with $N=2$ skips in `TC-SRV-REC-007`).

### 2. Limitations encountered
- **Architectural Hallucinations & Stack Inaccuracies**: AI tools repeatedly hallucinated stack patterns unsuited to our architecture, such as generating HTTP REST client mocks (`axios.post('http://localhost:5999/rank')`) instead of raw TCP socket client streams (`net.Socket()` with newline `\n` framing), requiring manual rewriting of `runRankerInference`.
- **Blind Happy-Path Bias & Omission of Negative Guardrails**: AI-generated code and test cases consistently prioritized happy-path scenarios, failing to infer critical business guardrails. For example, AI recommendations initially included out-of-stock books (`global_available_copies === 0`), causing reservation checkout failures (`BUG-REC-01`), until we manually introduced inventory filtering in `adjustCandidateScores` and added `TC-SRV-REC-006`.
- **Context Window Degradation in Multi-File Systems**: When passing multiple service files, controllers, and database configurations simultaneously, AI assistants experienced context degradation, misnaming `global_available_copies` as `available_copies` and missing socket connection timeout handling during ranker latency (`BUG-REC-03`).
- **Risk of Unstructured "Vibe Coding" & Codebase Drift**: Early unguided AI prompts modified PostgreSQL database table schemas directly without migration scripts, causing local environment crashes and highlighting why strict human PR reviews and Spec Kit constitution rules are mandatory.

---

## IV. SDLC Feedback

- **Stagger Formal Documentation Milestones**: Authoring over 90 pages of detailed RUP specifications in PA3 before validating complex technical spikes caused rework when architectural needs (such as socket IPC vs. REST) changed. Introducing an initial lightweight Technical Architecture Spike would prevent document churn.
- **Allocate Dedicated Marks for Integration Scaffolding**: Multi-service setups (Node.js, Python ML daemon, PostgreSQL, and Memgraph) require substantial DevOps effort. Awarding explicit milestones for container orchestration (Docker Compose) would encourage cleaner system integration.
- **Integrate Jira with Git Automation**: Enforce automated Git commit hooks referencing Jira issue keys (`SCRUM-XX`) to reinforce real-world agile tracking across sprint deliverables.

---

## V. Individual Contributions

### 1. Trần Lê Hoàng Gia
- **Personal Contribution:** Served as technical lead for the AI recommendation subsystem (`SCRUM-81`, `SCRUM-74`), designed software architecture and system context diagrams (`SCRUM-99`), set up database schemas (`SCRUM-25`, `SCRUM-44`), and authored the complete Vitest automated test suite (`SCRUM-98`, `SCRUM-113`).
- **Personal Learning:** Gained practical experience in engineering hybrid architectures integrating relational databases (PostgreSQL), graph databases (Memgraph), and ML rankers over raw TCP sockets. Mastered multi-tier caching with reliable invalidation and applied Test-Driven Development (TDD) to enforce inventory guardrails and fault tolerance.
