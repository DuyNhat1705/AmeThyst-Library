# Reflective Report

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026

Performed by: Nguyễn Nhựt Huy | Reviewed by: AmeThyst Team | Edited by: Nguyễn Nhựt Huy

## Revision History
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |

| 18/08/2026 | 1.0 | Reflective Report with personal reflections & contributions (Reserve Book & PIN Verification) | Nguyễn Nhựt Huy |

## Table of Contents

- [Reflective Report](#reflective-report)
  - [Revision History](#revision-history)
  - [Table of Contents](#table-of-contents)
  - [I. Team Experience](#i-team-experience)
  - [II. Spec Kit Experience](#ii-spec-kit-experience)
  - [III. AI Tools Usage](#iii-ai-tools-usage)
  - [IV. SDLC Feedback](#iv-sdlc-feedback)
  - [V. Individual Contributions](#v-individual-contributions)

## I. Team Experience

### 1. What went well
- **Effective Version Control & Collaboration:** The team maintained a clean Git workflow with feature branches and clear pull request procedures, ensuring smooth code integration into `dev` and `main` branches.
- **Clear Architectural Separation:** Decoupling the frontend (Client) and backend (Server) allowed members to work independently on their respective modules while integrating seamlessly through defined RESTful APIs.
- **Proactive Problem Solving:** When facing system integration or deployment hurdles, team members communicated promptly to align on code fixes and maintain project deadlines.
- **Consistent Delivery & Shared Knowledge:** Every member completed their assigned tasks on time and with stable quality, and the team proactively researched new technologies (Next.js, Express.js, PostgreSQL/Docker) and shared what they learned, which strengthened cohesion and kept everyone aligned toward the common goal.
- **Detailed Plan from the Start:** The team established a detailed, concrete plan from the very first week — defining use cases, milestones, and module ownership directly in the specification documents. Even when unexpected problems appeared, the plan gave us a reliable reference point, so we always knew what to prioritize, what to deliver next, and who to consult.

### 2. Challenges faced
- **Cloud Deployment & Environment Inconsistencies:** Managing deployments on platforms like Vercel and Render presented technical challenges, including build failures caused by lockfile mismatches (`package-lock.json`) and runtime container crashes (e.g., status 137 exit code). Because these hidden errors were difficult to predict before they occurred, the team had to iterate repeatedly between local testing, CI logs, and cloud logs until the deployments became stable.
- **Scope vs. Deadline Pressure:** Coordinating complex full-stack features, AI integrations, and rigorous testing within tight academic schedules required high effort and disciplined time management.
- **Initial Learning Curve for New Tools:** During Sprint 1 and the early part of Sprint 2, team members were still unfamiliar with tools such as Spec Kit and Docker, which caused the codebase to become temporarily disorganized and required the team leader to redistribute some duplicated tasks.

## II. Spec Kit Experience

### 1. Experience

From a personal perspective, using Spec Kit taught me what specification-driven development really means in practice: a specification is not a final document but a live contract that drives how a feature is decomposed, implemented, and verified. I learned that the quality of the output depends heavily on how clearly I describe requirements — an ambiguous or incomplete specification made the AI generate unnecessary files or miss edge cases, while an overly rigid one constrained reasonable implementation decisions. I also learned to treat generated artifacts as drafts rather than truth: I had to review every plan, task, and piece of code against the actual architecture and runtime evidence instead of trusting completion claims. Because the specifications told us exactly what to build and how the system should behave, Spec Kit significantly shortened my onboarding with the tech stack (Next.js, Express.js, PostgreSQL/Docker) and with coding in general, letting me focus on implementing features correctly rather than on deciding what the system should do. Finally, I learned to keep specifications and their related test cases synchronized as code evolved — updating the documents whenever a runtime issue or UI flow changed, so the documentation never drifted too far from reality. Overall, the combination of a well-structured plan and Spec Kit taught me to think in terms of requirements, dependencies, and verifiable acceptance criteria before writing code, a discipline I will carry into future projects.

### 2. Benefits & Limitations in Comparison with Traditional Development

**Benefits**

- **Structured Development Roadmap:** Spec Kit provided a clear specification-driven framework, establishing a single source of truth for requirements and reducing misalignment between API design and frontend UI requirements.
- **Clear Evaluation & Test Criteria:** Having pre-written feature specifications simplified the validation of system behavior and edge cases before and during implementation.
- **Faster, More Reliable Output:** Combining Spec Kit with the AI agent sped up both coding and documentation, and because the generated output was grounded in the specification documents rather than guesswork, the resulting quality was more consistent and easier to review.
- **Accelerated Onboarding with the Tech Stack:** Because the specifications described exactly what to build and how the system should behave, they served as a fast onboarding guide that shortened the learning curve for new technologies (Next.js, Express.js, PostgreSQL/Docker) and for everyday coding, allowing the team to focus on implementation rather than on requirements discovery.

**Limitations**

- **Maintenance Overhead:** Keeping specification documents perfectly synchronized with fast-moving code changes during rapid debugging sessions created extra documentation overhead.
- **Rigidity in Iterative Fixes:** When adapting to runtime issues or modifying UI flows on the fly, strict spec compliance required continuous manual updates to documentation.
- **Quality Depends on Prompt Precision:** When a specification was ambiguous or incomplete, the agent sometimes generated unnecessary files or touched parts of the codebase that overlapped with another member's work, requiring manual cleanup and re-scoping.

## III. AI Tools Usage

### 1. Effective aspects
- **Accelerated Development Workflow:** Utilizing modern AI coding tools and paradigms (such as Vibe Coding and IDE assistants) sped up code scaffolding, SQL query writing, and API logic implementation.
- **Rapid Debugging & Troubleshooting:** AI tools helped quickly diagnose full-stack configuration issues, refactor legacy logic, and analyze build/runtime error logs.
- **Learning & Tool Discovery:** Asking the AI directly surfaced the exact information needed when learning new technologies and helped compare supporting tools relevant to the team's stack much faster than searching scattered documentation.

### 2. Limitations encountered
- **Deployment & Package Configuration Errors:** AI assistants sometimes generated environment configurations or package versions that caused unexpected failures during CI/CD builds on external hosting platforms like Vercel or Render.
- **Context Drift in Complex Repositories:** During multi-file refactoring, AI models occasionally missed domain-specific constraints or state dependencies, requiring developer code verification.
- **Prompt Sensitivity:** Poorly written or incomplete prompts sometimes caused the AI to misunderstand the intended task, producing results that did not match what was needed and costing extra time to diagnose and fix.
- **Token & Context Limits:** The token limits of AI models made it difficult to handle very large specification files or long multi-file tasks in a single session, forcing work to be split into smaller pieces that then had to be re-verified for consistency.
- **Unstable Free AI Models:** Relying on free AI models meant occasional degraded or inconsistent behavior — the model sometimes failed to follow instructions, hallucinated APIs, or returned different results across runs — so every output had to be manually validated against the codebase and runtime evidence.

## IV. SDLC Feedback

- **Provide Early Containerization & Deployment Guidelines:** Introduce Docker and standardized build templates earlier in the course to help students detect deployment and dependency discrepancies prior to production release.
- **Integrate Automated Pipeline & MCP Practices:** Incorporate hands-on guidelines for Model Context Protocol (MCP) or automated CI/CD workflows to catch build errors earlier in the submission cycle.
- **Dynamic Spec Synchronization Milestones:** Schedule brief check-ins focusing on aligning Spec Kit documents with the actual codebase midway through each milestone to reduce last-minute documentation debt.
- **Introduce Framework & Architecture Decisions Earlier:** Moving framework selection and core architectural decisions (such as database design) into PA1, alongside the initial Spec Kit setup, would help teams avoid restructuring the codebase mid-implementation.

## V. Individual Contributions

### 1. Nguyễn Nhựt Huy
- **Personal Contribution:** As the UI/UX Designer & Front-end Engineer, I helped establish the frontend foundation early on — setting up the Atomic Design structure and the constitution rules, then building the homepage, authentication pages, profile pages, and light/dark mode and i18n support. During implementation I built the Librarian 4-Tab Book Management Dashboard (Book Management, Book Pickup, Book Return, Inspection), the Freely Room Reservation feature end-to-end, the Book Return & Inspection System (US1–US7), and the Admin Dashboard with authorization hardening (including the branch `branch_id` lifecycle and JWT session invalidation). I also implemented the Room Check-In & Check-Out feature, and configured automated deployment workflows on Render and Vercel, actively resolving complex build, lockfile, and container memory issues. For PA5, I wrote the 50 test cases for the Reserve Book and PIN Verification use cases, executed the automated Vitest suite together with manual checks, and identified 5 real defects (BUG-01 → BUG-05) which were fixed and re-verified in a final 50/50 regression run.
- **Personal Learning:** Through this project, I deepened my practical understanding of specification-driven software engineering, modern AI-assisted development practices (Vibe Coding, MCP), and the complexities of managing real-world cloud CI/CD deployment pipelines. I also improved my ability to write structured, well-scoped prompts for AI agents, to review generated code against the actual architecture and runtime evidence rather than trusting completion claims, and to design full-stack features where careful attention to authorization, timezone handling, and database constraints is required.
