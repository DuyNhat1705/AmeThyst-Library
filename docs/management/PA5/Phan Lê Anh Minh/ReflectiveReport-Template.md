# Reflective Report

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026

Performed by: Phan Lê Anh Minh | Reviewed by: Vũ Duy Nhất | Edited by: Phan Lê Anh Minh
## Table of Contents

- [I. Team Experience](#i-team-experience)
- [II. Spec Kit Experience](#ii-spec-kit-experience)
- [III. AI Tools Usage](#iii-ai-tools-usage)
- [IV. SDLC Feedback](#iv-sdlc-feedback)
- [V. Individual Contributions](#v-individual-contributions)

## I. Team Experience

*Note: Discuss what went well and what challenges the team faced during the project.*

### 1. What went well
- The team delivered a broad, integrated product rather than a collection of isolated screens. Authentication and profile management were connected to PostgreSQL-backed services; announcements gained management, notification, and real-time update flows; and the administrator dashboard was connected to protected APIs and real application data.
- Specification-driven work helped the team decompose large features into user stories, contracts, data models, implementation plans, and dependency-ordered tasks. This was particularly effective for authentication, avatar/profile enhancement, the announcement backend, notification unification, Admin User Management, and authentication test coverage. Interactive UI effects were developed separately through AI-assisted implementation and manual review.
- The project evolved through review and iteration. Generated or initial solutions were refined to remove duplicated notification components, correct hydration-sensitive animation logic, replace in-memory authentication state with PostgreSQL storage, improve profile update behavior, and align tests with the actual cookie-based authentication contract.
- Documentation was maintained across multiple project stages. The work included the application survey, use-case specifications and diagrams, prototype screens and alternative flows, Spec Kit artifacts, API and data-model documentation, test specifications, and AI Usage reports.
- Testing was treated as evidence rather than a formality. The team refined the authentication registration suite to remove duplication while preserving meaningful business coverage, requirement traceability, and legitimate failures for bug reporting.

### 2. Challenges faced
- Integrating changes across many branches and subsystems created merge conflicts, duplicated logic, stale documentation, and a risk of unrelated files entering a feature commit. The team repeatedly had to reconcile authentication, profile, notification, admin, database, localization, and test changes.
- Requirements and implementation contracts changed during development. Early authentication work exposed tokens through frontend-accessible flows and used in-memory OTP or pending-user storage, while later work moved toward PostgreSQL persistence and cookie-based sessions. Specifications, tests, UI behavior, and error mapping therefore had to be updated together.
- AI-generated solutions sometimes expanded the scope or introduced assumptions that did not fit the existing architecture. Examples included unnecessary notification components, proposed schema additions, runtime mock data, and outdated expectations about JWTs in response bodies or callback query strings.
- Cross-cutting quality requirements were difficult to verify consistently. Responsive layouts, dark mode, localization, accessibility, reduced-motion support, Socket.IO cleanup, authorization rules, transaction boundaries, and failure recovery all affected multiple files and required manual review beyond a successful build.
- Time pressure encouraged large commits and substantial generated documentation. This made reviews harder and increased the cost of confirming which checklist items were actually implemented and tested.

## II. Spec Kit Experience

*Note: Discuss how the experience of using Spec Kit for specification-driven development was. What were the benefits and limitations compared to traditional development?*

### 1. Experience

Using Spec Kit gave the team a more systematic way to turn feature requests into implementation through specifications, plans, tasks, and verification. It was especially useful for complex features because requirements, edge cases, dependencies, and test evidence could be traced throughout the workflow. However, the experience also showed that the generated artifacts were only as reliable as the prompts and repository context provided, so the team still needed to review the actual code and test results before accepting them.

### 2. Benefits & Limitations in Comparison with Traditional Development

**Benefits**

- The `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, and `/speckit.implement` sequence provided a repeatable path from a feature request to implementation. It required the team to define user stories, edge cases, measurable success criteria, technical context, file impact, dependencies, and verification before editing code.
- Spec Kit improved traceability between requirements and evidence. For the authentication registration suite, requirement tags `@A_R1` through `@A_R10`, unique test IDs, source layers, and execution outcomes were traceable through the reduction specification, plan, task list, and test files; failed requirements were mapped separately to the Bug Report.
- The supporting artifacts—research notes, API contracts, data models, quick-start guides, checklists, and task dependencies—made complex work easier to review, hand over, demonstrate, and revisit. Compared with direct implementation, this approach also surfaced security and failure conditions earlier, including suspended-account checks, self-mutation prevention, last-active-admin protection, parameterized queries, CSV formula-injection protection, token-expiry boundaries, and email-delivery consistency.

**Limitations**

- Spec Kit could not guarantee that its assumptions matched the repository. Generated tests initially expected JWTs in query parameters or bodies even though the final application used cookie-based sessions and generic anti-enumeration responses. Production code and real execution still had to be treated as the authoritative evidence.
- The generated scope depended heavily on prompt quality and repository context. Without strict instructions, Spec Kit could introduce unnecessary files, components, schema concepts, configuration changes, or duplicate test responsibilities. The team therefore had to define exclusions and file-impact boundaries clearly and remove unsuitable output afterward.
- Specifications and completed task checkboxes could become stale as implementation decisions changed, so the final diff, automated test output, and manual scenarios were still necessary. Maintaining a full specification package also added overhead for minor refactors, for which traditional direct development was often faster.

## III. AI Tools Usage

*Note: Describe how AI coding tools contributed to the project. What aspects were effective, and what limitations were encountered?*

### 1. Effective aspects
- AI coding tools accelerated both implementation and documentation across the stack. They assisted with Next.js and Atomic Design components, Node.js/Express services and controllers, PostgreSQL-backed authentication storage, Cloudinary avatar handling, Socket.IO notifications, localization, validation utilities, and Vitest suites.
- AI was effective at generating structured first drafts for repetitive or broad work, including Spec Kit artifacts, API contracts, data models, test cases, mocks, error mappings, translation keys, component exports, and technical reports.
- It helped connect cross-layer changes. Examples include migrating OTP and pending-user data from in-memory maps to PostgreSQL, wiring profile updates from UI to model queries, combining announcement and Study Group notifications, and implementing admin APIs together with their responsive frontend.
- AI also supported debugging and refactoring, such as diagnosing ESM environment-variable load order, preventing server/client hydration mismatches, moving Google OAuth handlers into controllers, replacing static `COALESCE` updates with dynamic profile updates, and consolidating duplicated tests.
- The greatest value came from rapid iteration: the student could compare generated output with the desired UI or business rule, request focused corrections, inspect the diff, and refine the result without rebuilding every draft manually.

### 2. Limitations encountered
- AI responses were often confident even when they were incomplete or inconsistent with the actual code. Claims of completion had to be checked against changed files, test assertions, database setup, and recorded verification results.
- Generated code sometimes introduced scope creep, duplicated components, unnecessary dependencies, mock data, or unrelated configuration edits. These changes increased review and cleanup work and could obscure the intended feature.
- AI did not reliably preserve evolving contracts across all artifacts. When authentication moved from token exposure and in-memory state toward cookies and PostgreSQL, older generated specifications, UI assumptions, and tests became inaccurate until they were manually corrected.
- Automated code generation did not replace security or data-consistency review. Transaction timing, exact expiry boundaries, email-delivery failures, authorization, CSV injection, resource cleanup, and sensitive error disclosure required explicit human attention.
- Visual quality and usability remained iterative. Spotlight size, background darkness, particle density, modal behavior, responsive layout, translations, and accessibility could only be judged after inspecting the rendered interface rather than from generated code alone.

## IV. SDLC Feedback


*Note: Provide constructive suggestions for improving the current SDLC process used in this course. What would you change about the PA structure, tools, or workflow?*

- Introduce a traceability matrix from the first assignment and update it incrementally. Each final requirement should map to its use case, Spec Kit artifact, implementation commit, test case, execution result, and bug report, reducing the large reconciliation effort at PA5.
- Require smaller, feature-scoped pull requests with a standard review checklist covering architecture, database impact, security, localization, accessibility, tests, and unrelated-file changes. This would make large AI-assisted diffs easier to verify and reduce merge conflicts.
- Separate generated status from verified status in Spec Kit tasks. A task should only be marked verified when it cites a test command, manual scenario, screenshot, or reviewer confirmation; implementation completion alone should use a different status.
- Add an early integration checkpoint for authentication, database schema, environment configuration, and shared API contracts. These foundations affected many later features, and changes such as cookie-based sessions or persistent OTP storage forced repeated corrections downstream.
- Provide clearer guidance on the appropriate documentation depth for different change sizes. Full specification packages are useful for high-risk, cross-layer features, while minor UI or refactoring work should be allowed a shorter change specification to avoid documentation overhead.
- Make test refinement a continuous sprint activity instead of concentrating it in PA5. Teams should periodically run generated tests, remove duplication, correct obsolete expectations, and record real defects while the related implementation context is still fresh.

## V. Individual Contributions

*Note: Each team member writes a brief (3-5 sentences) reflection on their personal contribution and learning.*

### 1. Phan Lê Anh Minh
- **Personal Contribution:** I contributed throughout the project, beginning with the PA1 application survey and later updating use-case specifications, diagrams, prototype screens, Spec Kit documents, and AI Usage reports. I implemented and refined major authentication and profile work, including Google OAuth, password reset and validation, PostgreSQL-backed OTP and pending-user storage, reusable authentication components, profile editing, avatar upload/cropping, localization, and related backend refactors. I also developed the announcement backend and real-time notification flow, unified announcement and Study Group notifications, implemented Admin User Management, added interactive landing/authentication/library effects, and reviewed cross-cutting security and UI issues. For testing, I created and refined authentication registration coverage, removed redundant cases, preserved requirement and test-ID traceability, and retained failures that exposed genuine functional defects.
- **Personal Learning:** I learned to use specification-driven development as a traceable engineering process rather than as automatic code generation, and to control scope through explicit requirements, exclusions, contracts, and verification criteria. I also learned that AI output must be reviewed against the real architecture and execution evidence, especially for authentication security, database consistency, boundary conditions, layered testing, hydration behavior, accessibility, and resource cleanup.

### 2. [Member 2 Name]
- **Personal Contribution:** [Briefly describe what you contributed to the project]
- **Personal Learning:** [Briefly describe what you learned during this course]

### 3. [Member 3 Name]
- **Personal Contribution:** [Briefly describe what you contributed to the project]
- **Personal Learning:** [Briefly describe what you learned during this course]

### 4. [Member 4 Name]
- **Personal Contribution:** [Briefly describe what you contributed to the project]
- **Personal Learning:** [Briefly describe what you learned during this course]

### 5. [Member 5 Name]
- **Personal Contribution:** [Briefly describe what you contributed to the project]
- **Personal Learning:** [Briefly describe what you learned during this course]
