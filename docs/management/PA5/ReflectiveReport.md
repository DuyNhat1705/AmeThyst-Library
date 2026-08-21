# Reflective Report

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026
    Version: 1.7

Performed by: All Members | Reviewed by: All Members | Edited by: Vũ Duy Nhất


## Revision History
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 14/08/2026 | 1.0 | Template for Reflective Report | Nguyễn Lê Hoàng Khải |
| 15/08/2026 | 1.1 | Reflective Report with personal reflections & contributions | Nguyễn Lê Hoàng Khải |
| 15/08/2026 | 1.2 | Reflective Report with personal reflections & contributions | Phan Lê Anh Minh |
| 16/08/2026 | 1.3 | Reflective Report with personal reflections & contributions | Vũ Duy Nhất |
| 16/08/2026 | 1.4 | Add Experience in Using Spec Kit | Nguyễn Lê Hoàng Khải |
| 18/08/2026 | 1.5 | Add Experience in Using Spec Kit | Phan Lê Anh Minh |
| 18/08/2026 | 1.6 | Reflective Report with personal reflections & contributions | Nguyễn Nhựt Huy |
| 21/08/2026 | 1.7 | Reflective Report with personal reflections & contributions | Trần Lê Hoàng Gia |

## Table of Contents

- [Reflective Report](#reflective-report)
  - [Revision History](#revision-history)
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
    - [1. In PAs Guideline](#1-in-pas-guideline)
    - [2. In Developing Team](#2-in-developing-team)
  - [V. Individual Contributions](#v-individual-contributions)
    - [1. 24127028 - Trần Lê Hoàng Gia](#1-24127028---trần-lê-hoàng-gia)
    - [2. 24127082 - Phan Lê Anh Minh](#2-24127082---phan-lê-anh-minh)
    - [3. 241270995 - Vũ Duy Nhất](#3-241270995---vũ-duy-nhất)
    - [4. 24127398 - Nguyễn Nhựt Huy](#4-24127398---nguyễn-nhựt-huy)
    - [5. 24127408 - Nguyễn Lê Hoàng Khải](#5-24127408---nguyễn-lê-hoàng-khải)

## I. Team Experience

### 1. What went well

The team leader delegated tasks effectively and established a detailed, concrete plan from the very first week — defining use cases, milestones, and module ownership directly in the specification documents — which allowed the team to work consistently through each phase without being overwhelmed by tasks in any single PA/sprint. This plan, combined with dynamic reprioritization of the Jira backlog whenever schedules or milestones shifted, gave the team a reliable reference point for what to prioritize and deliver next. When individual members faced academic workload spikes or technical blockers, other members stepped in to cover pending tasks, keeping progress steady across sprint backlogs.

Open and proactive communication allowed the team to resolve issues together and coordinate smoothly on interdependent features, with changes to the database structure and codebase always communicated and updated promptly. All team resources and documents were thoroughly organized on Google Drive, and assigning clear ownership over distinct domains — such as authentication, notifications, AI recommendation pipelines, and interactive UI modules — reduced merge conflicts and enabled members to test their work independently.

The team maintained a clean Git workflow with feature branches and clear pull request procedures for smooth integration into `dev` and `main`, while a decoupled frontend/backend architecture let members work independently through well-defined RESTful APIs. Specification-driven work further helped the team decompose large features into user stories, contracts, data models, and dependency-ordered tasks, which proved especially effective for authentication, profile management, notifications, and admin functionality.

The team delivered a broad, integrated product rather than a collection of isolated screens, with real features connected to persistent, protected backend services rather than mock data. Solutions were continuously refined through review and iteration — removing duplicated components, fixing hydration issues, and replacing temporary in-memory state with proper database storage — and testing was treated as evidence rather than a formality, with suites refined to preserve meaningful coverage, requirement traceability, and genuine failures for bug reporting. As a result, the team successfully fulfilled all mandatory requirements outlined in the initial project proposal.

Finally, the team demonstrated a proactive learning attitude, independently researching new technologies (Next.js, Express.js, PostgreSQL, Docker, and others) needed to implement product features effectively and sharing what they learned with the rest of the group, which strengthened team cohesion and kept everyone aligned toward the common goal.
### 2. Challenges faced

During Sprint 1 and the early part of Sprint 2, the team was still unfamiliar with new tools such as Spec Kit, Docker, Vitest, and Memgraph, which required significant self-training before productive, organized development could begin; in this period the AI agent occasionally generated redundant files, modified database structures without authorization, or produced too many specification documents that were not consistently kept up to date, leading to minor bugs from outdated specs and requiring the team leader to redistribute duplicated tasks caused by unclear prompt scoping. Some diagram and architecture concepts were also new to the team, resulting in a few errors later identified by the instructors, and since this was the team's first time working in a medium-sized group, some early operational and communication hiccups were expected.

Integrating changes across many branches and subsystems created merge conflicts, duplicated logic, and stale documentation, requiring repeated reconciliation across authentication, profile, notification, admin, database, localization, and test changes. Requirements and contracts also evolved during development — for example, authentication moved from token-exposing, in-memory storage toward PostgreSQL persistence and cookie-based sessions — which meant specifications, tests, and UI behavior had to be updated together, and the database's Physical ERD needed frequent revision to accommodate emerging implementation ideas. AI-generated solutions sometimes expanded scope or introduced assumptions that did not fit the existing architecture, and cross-cutting quality requirements — responsive layouts, dark mode, localization, accessibility, authorization, and failure recovery — were difficult to verify consistently, since they affected multiple files and required manual review beyond a successful build.

Managing deployments on platforms like Vercel and Render, and running services such as PostgreSQL and Memgraph within free-tier constraints, presented recurring technical challenges — including lockfile mismatches, container crashes, TCP socket stream-framing and buffer issues between the Node.js backend and the Python ranker, and dual-database synchronization between PostgreSQL and Memgraph — all of which required iterative debugging and custom solutions such as JSON delimiter protocols and asynchronous synchronization hooks. Gathering realistic data, such as scraping external book catalog sources, also triggered anti-bot rate limits that required custom throttling and cleanup before ingestion.

Overlapping class schedules, exams, and tight academic deadlines slowed progress at times, particularly during later sprints, though required deliverables were still met each cycle. Balancing workload fairly — matching tasks to each member's skill level while accounting for coursework and rest time — remained an ongoing challenge, compounded by time pressure that encouraged large commits and heavy generated documentation, making reviews harder to verify.
## II. Spec Kit Experience

### 1. Experience

Getting started with Spec Kit required an initial learning curve — becoming familiar with its commands, workflow, and how to collaborate effectively with the AI agent — but once past that stage, day-to-day development became noticeably easier. Defining coding conventions and codebase structure in the constitution file proved especially valuable, as it shaped and constrained the agent's behavior and kept the product within the boundaries the team had set.

The quality of implementation depended heavily on how clearly requirements were described: an ambiguous or incomplete specification often led the AI to produce incorrect or incomplete results, while an overly detailed one could constrain the solution or push it away from the team's actual intent. The team therefore learned to structure specifications with clear requirements, expected behaviors, and priorities while keeping them concise enough to allow reasonable implementation decisions, which also made specifications easier to review and update consistently throughout development.

Spec Kit gave the team a more systematic way to turn feature requests into implementation through specifications, plans, tasks, and verification, which was especially useful for complex features since requirements, edge cases, dependencies, and test evidence could be traced throughout the workflow. However, generated artifacts were only as reliable as the prompts and repository context provided, so the team still had to treat them as drafts and review the actual code and runtime evidence — rather than completion claims — before accepting them.

Beyond the technical workflow, working with clear specifications also shortened onboarding with new parts of the tech stack, letting members focus on implementing features correctly rather than deciding what the system should do, and encouraged a broader discipline of thinking in terms of requirements, dependencies, and verifiable acceptance criteria before writing code — a habit the team expects to carry into future projects.

### 2. Benefits & Limitations in Comparison with Traditional Development

**Benefits:**
- Established a clear, single source of truth for requirements, which reduced misalignment between API design and UI, and provided a traceable link between requirements, implementation plans, and code that limited the risk of the final product diverging from what was designed.

- Automated a significant portion of coding and documentation, making the overall workflow faster and more accurate than doing everything manually, while grounding the agent's output in the spec kept results consistent with the team's actual design.

- Acted as a shared reference that reduced miscommunication between members working on interdependent features and made code review and merging more predictable, since generated code was less likely to introduce unexpected architectural changes.

- Lowered the learning curve for less experienced members and for new technologies, since the constitution and feature specs — along with pre-configured skills and prompts — gave both the agent and reviewers clear guardrails to follow.

- Facilitated easy updates and seamless development of new features as the project evolved.

**Limitations:**
- Writing and refining specification documents was heavily time-consuming, and the team faced a fairly steep initial learning curve in learning how to scope and structure specs properly before the workflow became productive.

- Continuously updating specifications incurred noticeable token costs, and unlike traditional development — where small changes can often be applied directly to the code — specification-driven development required related documents to be updated consistently, adding ongoing maintenance overhead.

- Specification documents occasionally lacked clarity or missed logical details for complex features, and specs together with completed task checkboxes could become stale as implementation decisions changed, meaning the final diff, automated test output, and manual scenarios were still necessary to confirm actual behavior.

## III. AI Tools Usage

### 1. Effective aspects
- Significantly accelerated development by shifting much of the workflow from manual coding to prompting, reviewing, and refining generated code, without sacrificing overall quality since output could still be corrected within the same session.

- Sped up prototyping and first-draft creation by instantly providing functional boilerplate and structured drafts for repetitive or broad work, such as Spec Kit artifacts, API contracts, data models, test cases, and technical reports.

- Made learning new technologies significantly easier, as asking the AI directly usually surfaced the exact information needed instead of having to search through scattered documentation.

- Helped identify and fix code and documentation issues quickly, since the AI could scan large amounts of content and pinpoint inconsistencies far faster than a manual review.

- Delivered the greatest value through rapid iteration: comparing generated output against the desired UI or business rule, requesting focused corrections, and refining the result without rebuilding every draft manually.

### 2. Limitations encountered
- Poorly written or incomplete prompts sometimes caused the AI to misunderstand the intended task, producing mismatched results that cost extra time to diagnose and fix.

- Skipping manual review of AI output risked scope creep, duplicated components, unnecessary dependencies, mock data, and UI/UX inconsistencies, which increased review and cleanup work and could obscure the intended feature.

- Automated code generation did not replace security or data-consistency review — transaction timing, expiry boundaries, authorization, injection risks, and sensitive error disclosure still required explicit human attention.

- Token and context limits made it difficult to handle large specification files or long multi-file tasks in a single session, sometimes causing context degradation (such as misnamed variables or missed edge cases) and forcing work to be split into smaller, re-verified pieces.

- Relying on free AI models led to occasional degraded or inconsistent behavior, including failure to follow instructions, hallucinated APIs, or different results across runs.
## IV. SDLC Feedback

### 1. In PAs Guideline
- We would suggest reconsidering the timeline for PA2, which currently spans five weeks (including three weeks of summer break) dedicated primarily to documentation. Allowing implementation to begin earlier during this period would give teams more room to complete the planned 8–10 functional groups, since coursework and exams from PA3 onward leave considerably less time available for coding.

- We would recommend introducing framework selection and core architectural decisions — such as the database design — as part of PA1, alongside the initial Spec Kit setup. Establishing these foundations early would help teams avoid restructuring the codebase mid-implementation, which in our experience led to inconsistencies when architectural decisions were made concurrently with coding.

- We found the sequence and scope of documentation required across the PAs to be well designed and genuinely helpful for understanding the system: starting with the project plan and vision documents, moving into detailed feature planning through Use-Case Specifications and Diagrams, then system architecture via C4 Diagrams, and finally the testing documentation. We would encourage keeping this structure in future iterations of the course.

- We would also recommend providing clearer guidelines or standard examples for diagrams, to help teams avoid common structural mistakes.

### 2. In Developing Team
- Establish an early integration checkpoint for authentication, database schema, environment configuration, and shared API contracts, since these foundations affect many later features and changes to them tend to force repeated corrections downstream.

- Treat test refinement as a continuous sprint activity rather than concentrating it in PA5, with teams periodically running generated tests, removing duplication, correcting obsolete expectations, and recording real defects while the implementation context is still fresh.

- Require smaller, feature-scoped pull requests with a standard review checklist covering architecture, database impact, security, localization, accessibility, and tests, which would make large AI-assisted diffs easier to verify and reduce merge conflicts.

- Introduce Docker and standardized build templates earlier, and recognize the substantial DevOps effort that multi-service setups require by awarding explicit milestones for container orchestration, to help teams detect deployment and dependency discrepancies before production and encourage cleaner system integration.

- Schedule brief check-ins to align Spec Kit documents with the actual codebase midway through each milestone, to reduce last-minute documentation debt.

- Encourage automated Git commit hooks that reference Jira issue keys, to reinforce real-world agile tracking across sprint deliverables.

## V. Individual Contributions

### 1. 24127028 - Trần Lê Hoàng Gia
* **Personal Contribution:** Served as the member in charged of search infrastructure and AI recommendations. I set up the database backend combining PostgreSQL (for books data and pgvector embeddings) with Memgraph (for user interaction graphs). To build the catalog, I scraped Goodreads data using SeleniumBase, resolved missing fields, and synced data across both databases. I developed the hybrid search engine by pairing pgvector semantic retrieval with pg_trgm fuzzy text matching, and unified the backend `BuildFilter()` function for multi-criteria filtering. For recommendations, I implemented GraphSAGE graph embeddings with a LightGBM reranker, automating weekly retraining and daily database backups via GitHub Actions. Additionally, I built the interactive D3.js library map with room detail panels, admin statistics, librarian inventory workflows, system architecture diagrams, and the Vitest test suite 

* **Personal Learning:** I gained hands-on experience working with multiple database types at the same time, learning how to keep relational records, vector embeddings, and graph data in sync. I learned how to set up practical machine learning pipelines in production, connecting model retraining directly to automated cloud redeployments. Working with Spec Kit also taught me the value of writing clear, structured specifications before coding, which made building complex features like hybrid search and interactive maps much faster and easier to test.

### 2. 24127082 - Phan Lê Anh Minh
- **Personal Contribution:** I contributed throughout the project, beginning with the PA1 application survey and later updating use-case specifications, diagrams, prototype screens, Spec Kit documents, and AI Usage reports. I implemented and refined major authentication and profile work, including Google OAuth, password reset and validation, PostgreSQL-backed OTP and pending-user storage, reusable authentication components, profile editing, avatar upload/cropping, localization, and related backend refactors. I also developed the announcement backend and real-time notification flow, unified announcement and Study Group notifications, implemented Admin User Management, added interactive landing/authentication/library effects, and reviewed cross-cutting security and UI issues. For testing, I created and refined authentication registration coverage, removed redundant cases, preserved requirement and test-ID traceability, and retained failures that exposed genuine functional defects.

- **Personal Learning:** I learned to use specification-driven development as a traceable engineering process rather than as automatic code generation, and to control scope through explicit requirements, exclusions, contracts, and verification criteria. I also learned that AI output must be reviewed against the real architecture and execution evidence, especially for authentication security, database consistency, boundary conditions, layered testing, hydration behavior, accessibility, and resource cleanup.

### 3. 241270995 - Vũ Duy Nhất
- **Personal Contribution:** As team leader, I took the initiative early by researching coding frameworks and setting up the team's codebase, while also designing the database and running it locally through Docker. I then established clear coding conventions and database usage guidelines for the rest of the team, so that their development work would be more organized rather than relying purely on unstructured "vibe coding" with the AI agent and Spec Kit. Beyond that, I served as a reviewer, checking that the features implemented by other members functioned correctly and followed the conventions I had set, and I proposed solutions when members ran into problems or adjusted the database schema to accommodate their implementation ideas. At the end of each sprint, I merged approved code from all members into the main branch once it met the required standard, and because coding conventions and codebase organization had been defined clearly from the start, merge conflicts were rarely a significant issue. I also led our team meetings, reporting on overall progress and assigning the coming week's tasks, while sharing any relevant technical knowledge or tools I had picked up along the way.

- **Personal Learning:** Serving as team leader taught me how to communicate effectively with teammates and understand their ideas well enough to offer timely support and relay information clearly to the rest of the group. I also learned that recognizing each member's individual strengths and assigning tasks accordingly is essential for both product quality and team efficiency. Beyond that, I came to appreciate how important it is to establish solid foundations early — frameworks, database design, coding conventions, and clear collaboration norms — since these directly determine how smoothly individual members can complete their work and how quickly the team as a whole can move toward the final product. On the technical side, I gained hands-on experience with Next.js for the frontend and Express.js for the backend, using PostgreSQL running through Docker for local development, and, most importantly, learned how combining an AI agent with Spec Kit under a specification-driven workflow can significantly speed up development while still preserving the quality of the final product.

### 4. 24127398 - Nguyễn Nhựt Huy
- **Personal Contribution:** As the UI/UX Designer & Front-end Engineer, I helped establish the frontend foundation early on — setting up the Atomic Design structure and the constitution rules, then building the homepage, authentication pages, profile pages, and light/dark mode and i18n support. During implementation I built the Librarian 4-Tab Book Management Dashboard (Book Management, Book Pickup, Book Return, Inspection), the Freely Room Reservation feature end-to-end, the Book Return & Inspection System (US1–US7), and the Admin Dashboard with authorization hardening (including the branch `branch_id` lifecycle and JWT session invalidation). I also implemented the Room Check-In & Check-Out feature, and configured automated deployment workflows on Render and Vercel, actively resolving complex build, lockfile, and container memory issues. For PA5, I wrote the 50 test cases for the Reserve Book and PIN Verification use cases, executed the automated Vitest suite together with manual checks, and identified 5 real defects (BUG-01 → BUG-05) which were fixed and re-verified in a final 50/50 regression run.

- **Personal Learning:** Through this project, I deepened my practical understanding of specification-driven software engineering, modern AI-assisted development practices (Vibe Coding, MCP), and the complexities of managing real-world cloud CI/CD deployment pipelines. I also improved my ability to write structured, well-scoped prompts for AI agents, to review generated code against the actual architecture and runtime evidence rather than trusting completion claims, and to design full-stack features where careful attention to authorization, timezone handling, and database constraints is required.

### 5. 24127408 - Nguyễn Lê Hoàng Khải
- **Personal Contribution:** Developed various project documents, implemented the Study Group functional group, developed the View Book Detail use case within the Searching group, and built the System Configuration feature in the Administration module.

- **Personal Learning:** Gained practical experience with AI agents and used technologies such as Spec Kit to optimize agent-assisted development while better understanding the strengths and limitations of these tools. I learned to write structured prompts, using headings when appropriate, to clarify tasks and reduce agent errors. I also learned when to start a new conversation or refer to previous ones to optimize token usage. Finally, I became better at identifying situations in which agents perform poorly and applying specific agent skills to achieve the desired outcomes.

