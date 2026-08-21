# Reflective Report

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026
    Version: 1.6

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

## Table of Contents

- [I. Team Experience](#i-team-experience)
- [II. Spec Kit Experience](#ii-spec-kit-experience)
- [III. AI Tools Usage](#iii-ai-tools-usage)
- [IV. SDLC Feedback](#iv-sdlc-feedback)
- [V. Individual Contributions](#v-individual-contributions)

## I. Team Experience

### 1. What went well

- The team consistently followed the plan laid out by the team leader, which allowed the project to be completed on schedule. Every member showed a strong sense of responsibility, completing assigned tasks on time while maintaining consistent quality in their output. The team also demonstrated a proactive learning attitude, independently researching new technologies needed to implement product features effectively and sharing what they learned with the rest of the group, which strengthened team cohesion and kept everyone aligned toward the common goal. Finally, open and proactive communication allowed the team to resolve issues together and coordinate smoothly on interdependent features, ensuring that changes to the database structure and codebase were always communicated and updated promptly.

- The team leader delegated tasks effectively, enabling the team to work consistently through each phase without being pressured by tight deadlines or overwhelmed by tasks in any single PA/sprint. All team resources and documents were thoroughly and systematically organized on Google Drive, and the GitHub repository was effectively branched, which allowed for parallel work as well as quick merging and testing of code. As a result, we successfully fulfilled all mandatory requirements outlined in the initial project proposal.

- The team delivered a broad, integrated product rather than a collection of isolated screens: authentication and profile management were connected to PostgreSQL-backed services, announcements gained management, notification, and real-time update flows, and the administrator dashboard was connected to protected APIs and real application data. Specification-driven work helped the team decompose large features into user stories, contracts, data models, implementation plans, and dependency-ordered tasks, which was particularly effective for authentication, avatar/profile enhancement, the announcement backend, notification unification, Admin User Management, and authentication test coverage, while interactive UI effects were developed separately through AI-assisted implementation and manual review. The project also evolved through review and iteration, as generated or initial solutions were refined to remove duplicated notification components, correct hydration-sensitive animation logic, replace in-memory authentication state with PostgreSQL storage, improve profile update behavior, and align tests with the actual cookie-based authentication contract. Documentation was maintained across multiple project stages, including the application survey, use-case specifications and diagrams, prototype screens and alternative flows, Spec Kit artifacts, API and data-model documentation, test specifications, and AI Usage reports. Finally, testing was treated as evidence rather than a formality: the team refined the authentication registration suite to remove duplication while preserving meaningful business coverage, requirement traceability, and legitimate failures for bug reporting.

- The team maintained a clean Git workflow with feature branches and clear pull request procedures, ensuring smooth code integration into `dev` and `main` branches, while decoupling the frontend (Client) and backend (Server) allowed members to work independently on their respective modules while integrating seamlessly through defined RESTful APIs. When facing system integration or deployment hurdles, team members communicated promptly to align on code fixes and maintain project deadlines. Every member completed their assigned tasks on time and with stable quality, and the team proactively researched new technologies (Next.js, Express.js, PostgreSQL/Docker) and shared what they learned, which strengthened cohesion and kept everyone aligned toward the common goal. Finally, the team established a detailed, concrete plan from the very first week — defining use cases, milestones, and module ownership directly in the specification documents — and even when unexpected problems appeared, this plan gave us a reliable reference point, so we always knew what to prioritize, what to deliver next, and who to consult.

### 2. Challenges faced

- During Sprint 1 and the early part of Sprint 2, team members were still unfamiliar with tools such as Spec Kit and Docker, which caused the codebase to become disorganized — the AI agent generated a number of redundant files and, in some cases, modified the database table structure without authorization. In addition, because prompts given to the agent were not clearly scoped, some members ended up duplicating tasks that belonged to others, requiring the team leader to redistribute the workload. The database design (Physical ERD) also had to be revised frequently compared to the initial design in order to accommodate the implementation ideas that emerged as members wrote code. Because of overlapping class schedules and exams, progress slowed noticeably during Sprint 3 and Sprint 4, although the required deliverables for those sprints were still met by the end of each cycle. Finally, distributing tasks fairly was an ongoing challenge: the team had to balance workload so that no member was overloaded, match tasks to each person's skill level, and account for exam and coursework schedules so that everyone still had time to rest and keep up with their studies.

- Initially, the team was unfamiliar with Spec Kit, leading to the creation of too many specification documents and occasional failure to update related documents when modifying code manually; this resulted in minor bugs when implementing new features, as the referenced specifications were outdated or inaccurate. Some diagram concepts were also quite novel to the team, resulting in a few errors that were pointed out by the instructors. In addition, since this was our first time working in a medium-sized group compared to freshman year, we experienced several operational and communication hiccups during the collaboration process.

- Integrating changes across many branches and subsystems created merge conflicts, duplicated logic, stale documentation, and a risk of unrelated files entering a feature commit, so the team repeatedly had to reconcile authentication, profile, notification, admin, database, localization, and test changes. Requirements and implementation contracts also changed during development: early authentication work exposed tokens through frontend-accessible flows and used in-memory OTP or pending-user storage, while later work moved toward PostgreSQL persistence and cookie-based sessions, which meant specifications, tests, UI behavior, and error mapping had to be updated together. AI-generated solutions sometimes expanded the scope or introduced assumptions that did not fit the existing architecture, including unnecessary notification components, proposed schema additions, runtime mock data, and outdated expectations about JWTs in response bodies or callback query strings. Cross-cutting quality requirements were also difficult to verify consistently, as responsive layouts, dark mode, localization, accessibility, reduced-motion support, Socket.IO cleanup, authorization rules, transaction boundaries, and failure recovery all affected multiple files and required manual review beyond a successful build. Finally, time pressure encouraged large commits and substantial generated documentation, which made reviews harder and increased the cost of confirming which checklist items were actually implemented and tested

- Managing deployments on platforms like Vercel and Render presented technical challenges, including build failures caused by lockfile mismatches (`package-lock.json`) and runtime container crashes (e.g., status 137 exit code); because these hidden errors were difficult to predict before they occurred, the team had to iterate repeatedly between local testing, CI logs, and cloud logs until the deployments became stable. Coordinating complex full-stack features, AI integrations, and rigorous testing within tight academic schedules also required high effort and disciplined time management. Finally, during Sprint 1 and the early part of Sprint 2, team members were still unfamiliar with tools such as Spec Kit and Docker, which caused the codebase to become temporarily disorganized and required the team leader to redistribute some duplicated tasks.
## II. Spec Kit Experience

### 1. Experience

- Getting started with Spec Kit took some time, since the team had to become familiar with its commands, related files, and how to work effectively with the AI agent; once past that initial learning curve, however, handling day-to-day tasks became noticeably easier. Defining coding conventions and codebase structure in the constitution file proved especially important, as it shaped and constrained the agent's behavior, preventing it from breaking established structures and keeping the product within the boundaries the team had set. Combining Spec Kit with the AI agent also sped up both coding and documentation significantly, and because the agent's output was grounded in the specification documents rather than guesswork, the resulting quality was more reliable. Locating bugs across a large codebase became considerably easier as well, since the agent could scan the source code and identify issues very quickly.

- Our experience with Spec Kit showed that the quality of the implementation depended heavily on how clearly the requirements were described. When a specification lacked important details, the AI often produced incorrect or incomplete results; however, an overly detailed description could also constrain the solution or lead it away from our actual intent. We therefore learned that specifications should be structured with clear requirements, expected behaviors, and priorities while remaining concise enough to allow appropriate implementation decisions. Keeping this structure consistent also made specifications easier to review and update throughout development.

- Using Spec Kit gave the team a more systematic way to turn feature requests into implementation through specifications, plans, tasks, and verification. It was especially useful for complex features because requirements, edge cases, dependencies, and test evidence could be traced throughout the workflow. However, the experience also showed that the generated artifacts were only as reliable as the prompts and repository context provided, so the team still needed to review the actual code and test results before accepting them.

- From a personal perspective, using Spec Kit taught me what specification-driven development really means in practice: a specification is not a final document but a live contract that drives how a feature is decomposed, implemented, and verified. I learned that the quality of the output depends heavily on how clearly I describe requirements — an ambiguous or incomplete specification made the AI generate unnecessary files or miss edge cases, while an overly rigid one constrained reasonable implementation decisions. I also learned to treat generated artifacts as drafts rather than truth: I had to review every plan, task, and piece of code against the actual architecture and runtime evidence instead of trusting completion claims. Because the specifications told us exactly what to build and how the system should behave, Spec Kit significantly shortened my onboarding with the tech stack (Next.js, Express.js, PostgreSQL/Docker) and with coding in general, letting me focus on implementing features correctly rather than on deciding what the system should do. Finally, I learned to keep specifications and their related test cases synchronized as code evolved — updating the documents whenever a runtime issue or UI flow changed, so the documentation never drifted too far from reality. Overall, the combination of a well-structured plan and Spec Kit taught me to think in terms of requirements, dependencies, and verifiable acceptance criteria before writing code, a discipline I will carry into future projects.

### 2. Benefits & Limitations in Comparison with Traditional Development

**Benefits:**
- Spec Kit provided a clear specification-driven framework, establishing a single source of truth for requirements and reducing misalignment between API design and frontend UI requirements.

- Documentation and coding were both automated to a large extent, which made the overall workflow faster and more accurate than writing everything manually.

- Because the agent implemented features strictly based on the specification documents rather than guessing at requirements, the resulting code was more consistent with what the team had actually designed.

- Specification documents served as a shared source of truth, which reduced miscommunication between members working on interdependent features, since everyone could refer to the same spec instead of relying on verbal explanations.

- The spec-first workflow made it easier to onboard members who were less experienced with a particular technology, because the constitution and feature specs gave both the agent and the reviewing member clear guardrails to follow.

- Reviewing and merging code became more predictable, since code generated from an agreed-upon specification was less likely to introduce unexpected architectural changes, which reduced the number of conflicts the team lead had to resolve at merge time.

- Facilitated easy updates and seamless development of new features.

- User-friendly, with most necessary skills and prompts pre-configured, lowering the learning curve.

- Providing a clearer link between requirements, implementation plans, and code, reducing the risk of the final product diverging from the original requirements.

**Limitations:**
- Writing and refining specification documents was heavily time-consuming.

- Continuously updating specifications incurred noticeable token costs.

- Occasionally, the specification documents lacked clarity or missed logical details for complex features.


- Unlike traditional development, where small changes can often be applied directly to the code, specification-driven development required related documents to be updated consistently, creating additional maintenance overhead.

- The initial learning curve was fairly steep, as the team needed time to understand how to scope and structure specifications properly before the workflow became productive.

- Specifications and completed task checkboxes could become stale as implementation decisions changed, so the final diff, automated test output, and manual scenarios were still necessary.

## III. AI Tools Usage

### 1. Effective aspects
- Coding tasks were completed much faster through automation, without sacrificing the overall quality of the output, since the agent's work could still be reviewed and corrected within the same session.

- Learning new technologies became significantly easier, as asking the AI directly usually surfaced the exact information needed instead of having to search through scattered documentation.

- Both code and documentation issues were easier to identify and fix quickly, because the AI could scan large amounts of content and pinpoint inconsistencies far faster than a manual review.

- Saved significant development time by shifting much of the workflow from manual coding to prompting, reviewing, and refining generated code.

- Accelerated the prototyping phase by instantly providing functional boilerplate code and basic structure.

- AI was effective at generating structured first drafts for repetitive or broad work, including Spec Kit artifacts, API contracts, data models, test cases, mocks, error mappings, translation keys, component exports, and technical reports.

- The greatest value came from rapid iteration: the student could compare generated output with the desired UI or business rule, request focused corrections, inspect the diff, and refine the result without rebuilding every draft manually.

### 2. Limitations encountered
- Poorly written or incomplete prompts sometimes caused the AI to misunderstand the intended task, producing results that did not match what was actually needed and costing extra time to diagnose and fix.

- Although AI-assisted coding was fast, skipping manual review of its output risked bloating the codebase with redundant or non-reusable code, which increased resource usage and made long-term maintenance more difficult.

- Generated code often had numerous UI/UX inconsistencies and layout issues.

- Generated code sometimes introduced scope creep, duplicated components, unnecessary dependencies, mock data, or unrelated configuration edits. These changes increased review and cleanup work and could obscure the intended feature.

- Automated code generation did not replace security or data-consistency review. Transaction timing, exact expiry boundaries, email-delivery failures, authorization, CSV injection, resource cleanup, and sensitive error disclosure required explicit human attention.

- The token limits of AI models made it difficult to handle very large specification files or long multi-file tasks in a single session, forcing work to be split into smaller pieces that then had to be re-verified for consistency.

- Relying on free AI models meant occasional degraded or inconsistent behavior — the model sometimes failed to follow instructions, hallucinated APIs, or returned different results across runs.
## IV. SDLC Feedback

### 1. In PAs Guideline
- We would suggest reconsidering the timeline for PA2, which currently spans five weeks (including three weeks of summer break) dedicated primarily to documentation. Allowing implementation to begin earlier during this period would give teams more room to complete the planned 8–10 functional groups, since coursework and exams from PA3 onward leave considerably less time available for coding.

- We would recommend introducing framework selection and core architectural decisions — such as the database design — as part of PA1, alongside the initial Spec Kit setup. Establishing these foundations early would help teams avoid restructuring the codebase mid-implementation, which in our experience led to inconsistencies when architectural decisions were made concurrently with coding.

- We found the sequence and scope of documentation required across the PAs to be well designed and genuinely helpful for understanding the system: starting with the project plan and vision documents, moving into detailed feature planning through Use-Case Specifications and Diagrams, then system architecture via C4 Diagrams, and finally the testing documentation. We would encourage keeping this structure in future iterations of the course.

- Provide clearer guidelines or standard examples for diagrams to prevent common structural mistakes.

### 2. In Developing Team
- Add an early integration checkpoint for authentication, database schema, environment configuration, and shared API contracts. These foundations affected many later features, and changes such as cookie-based sessions or persistent OTP storage forced repeated corrections downstream.

- Make test refinement a continuous sprint activity instead of concentrating it in PA5. Teams should periodically run generated tests, remove duplication, correct obsolete expectations, and record real defects while the related implementation context is still fresh.

- Require smaller, feature-scoped pull requests with a standard review checklist covering architecture, database impact, security, localization, accessibility, tests, and unrelated-file changes. This would make large AI-assisted diffs easier to verify and reduce merge conflicts.

- Introduce Docker and standardized build templates earlier in the course to help us detect deployment and dependency discrepancies prior to production release.

- Schedule brief check-ins focusing on aligning Spec Kit documents with the actual codebase midway through each milestone to reduce last-minute documentation debt.
## V. Individual Contributions

### 1. 241270995 - Vũ Duy Nhất
- **Personal Contribution:** As team leader, I took the initiative early by researching coding frameworks and setting up the team's codebase, while also designing the database and running it locally through Docker. I then established clear coding conventions and database usage guidelines for the rest of the team, so that their development work would be more organized rather than relying purely on unstructured "vibe coding" with the AI agent and Spec Kit. Beyond that, I served as a reviewer, checking that the features implemented by other members functioned correctly and followed the conventions I had set, and I proposed solutions when members ran into problems or adjusted the database schema to accommodate their implementation ideas. At the end of each sprint, I merged approved code from all members into the main branch once it met the required standard, and because coding conventions and codebase organization had been defined clearly from the start, merge conflicts were rarely a significant issue. I also led our team meetings, reporting on overall progress and assigning the coming week's tasks, while sharing any relevant technical knowledge or tools I had picked up along the way.

- **Personal Learning:** Serving as team leader taught me how to communicate effectively with teammates and understand their ideas well enough to offer timely support and relay information clearly to the rest of the group. I also learned that recognizing each member's individual strengths and assigning tasks accordingly is essential for both product quality and team efficiency. Beyond that, I came to appreciate how important it is to establish solid foundations early — frameworks, database design, coding conventions, and clear collaboration norms — since these directly determine how smoothly individual members can complete their work and how quickly the team as a whole can move toward the final product. On the technical side, I gained hands-on experience with Next.js for the frontend and Express.js for the backend, using PostgreSQL running through Docker for local development, and, most importantly, learned how combining an AI agent with Spec Kit under a specification-driven workflow can significantly speed up development while still preserving the quality of the final product.

### 2. 24127082 - Phan Lê Anh Minh
- **Personal Contribution:** I contributed throughout the project, beginning with the PA1 application survey and later updating use-case specifications, diagrams, prototype screens, Spec Kit documents, and AI Usage reports. I implemented and refined major authentication and profile work, including Google OAuth, password reset and validation, PostgreSQL-backed OTP and pending-user storage, reusable authentication components, profile editing, avatar upload/cropping, localization, and related backend refactors. I also developed the announcement backend and real-time notification flow, unified announcement and Study Group notifications, implemented Admin User Management, added interactive landing/authentication/library effects, and reviewed cross-cutting security and UI issues. For testing, I created and refined authentication registration coverage, removed redundant cases, preserved requirement and test-ID traceability, and retained failures that exposed genuine functional defects.

- **Personal Learning:** I learned to use specification-driven development as a traceable engineering process rather than as automatic code generation, and to control scope through explicit requirements, exclusions, contracts, and verification criteria. I also learned that AI output must be reviewed against the real architecture and execution evidence, especially for authentication security, database consistency, boundary conditions, layered testing, hydration behavior, accessibility, and resource cleanup.

### 3. 24127398 - Nguyễn Nhựt Huy
- **Personal Contribution:** As the UI/UX Designer & Front-end Engineer, I helped establish the frontend foundation early on — setting up the Atomic Design structure and the constitution rules, then building the homepage, authentication pages, profile pages, and light/dark mode and i18n support. During implementation I built the Librarian 4-Tab Book Management Dashboard (Book Management, Book Pickup, Book Return, Inspection), the Freely Room Reservation feature end-to-end, the Book Return & Inspection System (US1–US7), and the Admin Dashboard with authorization hardening (including the branch `branch_id` lifecycle and JWT session invalidation). I also implemented the Room Check-In & Check-Out feature, and configured automated deployment workflows on Render and Vercel, actively resolving complex build, lockfile, and container memory issues. For PA5, I wrote the 50 test cases for the Reserve Book and PIN Verification use cases, executed the automated Vitest suite together with manual checks, and identified 5 real defects (BUG-01 → BUG-05) which were fixed and re-verified in a final 50/50 regression run.

- **Personal Learning:** Through this project, I deepened my practical understanding of specification-driven software engineering, modern AI-assisted development practices (Vibe Coding, MCP), and the complexities of managing real-world cloud CI/CD deployment pipelines. I also improved my ability to write structured, well-scoped prompts for AI agents, to review generated code against the actual architecture and runtime evidence rather than trusting completion claims, and to design full-stack features where careful attention to authorization, timezone handling, and database constraints is required.

### 4. 24127408 - Nguyễn Lê Hoàng Khải
- **Personal Contribution:** Developed various project documents, implemented the Study Group functional group, developed the View Book Detail use case within the Searching group, and built the System Configuration feature in the Administration module.

- **Personal Learning:** Gained practical experience with AI agents and used technologies such as Spec Kit to optimize agent-assisted development while better understanding the strengths and limitations of these tools. I learned to write structured prompts, using headings when appropriate, to clarify tasks and reduce agent errors. I also learned when to start a new conversation or refer to previous ones to optimize token usage. Finally, I became better at identifying situations in which agents perform poorly and applying specific agent skills to achieve the desired outcomes.

