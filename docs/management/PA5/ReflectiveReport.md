# Reflective Report

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026
    Version: 1.3

Performed by: All Members | Reviewed by: All Members | Edited by: Vũ Duy Nhất


## Revision History
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |

| 14/08/2026 | 1.0 | Template for Reflective Report | Nguyễn Lê Hoàng Khải |
| 15/08/2026 | 1.1 | Reflective Report with personal reflections & contributions | Nguyễn Lê Hoàng Khải |
| 15/08/2026 | 1.2 | Reflective Report with personal reflections & contributions | Phan Lê Anh Minh |
| 16/08/2026 | 1.3 | Reflective Report with personal reflections & contributions | Vũ Duy Nhất |

## Table of Contents

- [I. Team Experience](#i-team-experience)
- [II. Spec Kit Experience](#ii-spec-kit-experience)
- [III. AI Tools Usage](#iii-ai-tools-usage)
- [IV. SDLC Feedback](#iv-sdlc-feedback)
- [V. Individual Contributions](#v-individual-contributions)

## I. Team Experience

### 1. What went well

The team consistently followed the plan laid out by the team leader, which allowed the project to be completed on schedule. Every member showed a strong sense of responsibility, completing assigned tasks on time while maintaining consistent quality in their output. The team also demonstrated a proactive learning attitude, independently researching new technologies needed to implement product features effectively and sharing what they learned with the rest of the group, which strengthened team cohesion and kept everyone aligned toward the common goal. Finally, open and proactive communication allowed the team to resolve issues together and coordinate smoothly on interdependent features, ensuring that changes to the database structure and codebase were always communicated and updated promptly.

### 2. Challenges faced

During Sprint 1 and the early part of Sprint 2, team members were still unfamiliar with tools such as Spec Kit and Docker, which caused the codebase to become disorganized — the AI agent generated a number of redundant files and, in some cases, modified the database table structure without authorization. In addition, because prompts given to the agent were not clearly scoped, some members ended up duplicating tasks that belonged to others, requiring the team leader to redistribute the workload. The database design (Physical ERD) also had to be revised frequently compared to the initial design in order to accommodate the implementation ideas that emerged as members wrote code. Because of overlapping class schedules and exams, progress slowed noticeably during Sprint 3 and Sprint 4, although the required deliverables for those sprints were still met by the end of each cycle. Finally, distributing tasks fairly was an ongoing challenge: the team had to balance workload so that no member was overloaded, match tasks to each person's skill level, and account for exam and coursework schedules so that everyone still had time to rest and keep up with their studies.

## II. Spec Kit Experience

### 1. Experience

Getting started with Spec Kit took some time, since the team had to become familiar with its commands, related files, and how to work effectively with the AI agent; once past that initial learning curve, however, handling day-to-day tasks became noticeably easier. Defining coding conventions and codebase structure in the constitution file proved especially important, as it shaped and constrained the agent's behavior, preventing it from breaking established structures and keeping the product within the boundaries the team had set. Combining Spec Kit with the AI agent also sped up both coding and documentation significantly, and because the agent's output was grounded in the specification documents rather than guesswork, the resulting quality was more reliable. Locating bugs across a large codebase became considerably easier as well, since the agent could scan the source code and identify issues very quickly.

### 2. Benefits & Limitations in Comparison with Traditional Development

**Benefits:**
- Documentation and coding were both automated to a large extent, which made the overall workflow faster and more accurate than writing everything manually.

- Because the agent implemented features strictly based on the specification documents rather than guessing at requirements, the resulting code was more consistent with what the team had actually designed.

- Specification documents served as a shared source of truth, which reduced miscommunication between members working on interdependent features, since everyone could refer to the same spec instead of relying on verbal explanations.

- The spec-first workflow made it easier to onboard members who were less experienced with a particular technology, because the constitution and feature specs gave both the agent and the reviewing member clear guardrails to follow.

- Reviewing and merging code became more predictable, since code generated from an agreed-upon specification was less likely to introduce unexpected architectural changes, which reduced the number of conflicts the team lead had to resolve at merge time.

**Limitations:**
- Writing sufficiently detailed specifications took considerable time upfront, and during Sprint 1 the team underestimated this cost, leaving less time available for actual implementation.

- When a specification was ambiguous or incomplete, the agent sometimes generated unnecessary files or modified the database structure in ways the team had not intended, requiring manual cleanup afterward.

- Spec Kit's structured workflow was less convenient for quick experiments or throwaway prototyping, since even small exploratory changes were expected to go through the same spec-and-review cycle as production features.

- The quality of the generated output depended heavily on how precisely a task was scoped in the spec, and loosely defined boundaries between features occasionally caused two members' agent sessions to touch overlapping parts of the codebase.

- Because a large share of the implementation was delegated to the agent, some members had less hands-on practice writing code manually, which is a trade-off worth being mindful of for individual skill development.

## III. AI Tools Usage

### 1. Effective aspects
- Coding tasks were completed much faster through automation, without sacrificing the overall quality of the output, since the agent's work could still be reviewed and corrected within the same session.

- Learning new technologies became significantly easier, as asking the AI directly usually surfaced the exact information needed instead of having to search through scattered documentation.

- Finding the right supporting tools for the project was much simpler with AI's help, since it could quickly compare options and explain the trade-offs relevant to the team's stack.

- Both code and documentation issues were easier to identify and fix quickly, because the AI could scan large amounts of content and pinpoint inconsistencies far faster than a manual review.

### 2. Limitations encountered
- Poorly written or incomplete prompts sometimes caused the AI to misunderstand the intended task, producing results that did not match what was actually needed and costing extra time to diagnose and fix.

- Although AI-assisted coding was fast, skipping manual review of its output risked bloating the codebase with redundant or non-reusable code, which increased resource usage and made long-term maintenance more difficult.

## IV. SDLC Feedback

- We would suggest reconsidering the timeline for PA2, which currently spans five weeks (including three weeks of summer break) dedicated primarily to documentation. Allowing implementation to begin earlier during this period would give teams more room to complete the planned 8–10 functional groups, since coursework and exams from PA3 onward leave considerably less time available for coding.

- We would recommend introducing framework selection and core architectural decisions — such as the database design — as part of PA1, alongside the initial Spec Kit setup. Establishing these foundations early would help teams avoid restructuring the codebase mid-implementation, which in our experience led to inconsistencies when architectural decisions were made concurrently with coding.

- We found the sequence and scope of documentation required across the PAs to be well designed and genuinely helpful for understanding the system: starting with the project plan and vision documents, moving into detailed feature planning through Use-Case Specifications and Diagrams, then system architecture via C4 Diagrams, and finally the testing documentation. We would encourage keeping this structure in future iterations of the course.

## V. Individual Contributions

### 1. 241270995 - Vũ Duy Nhất
- **Personal Contribution:** As team leader, I took the initiative early by researching coding frameworks and setting up the team's codebase, while also designing the database and running it locally through Docker. I then established clear coding conventions and database usage guidelines for the rest of the team, so that their development work would be more organized rather than relying purely on unstructured "vibe coding" with the AI agent and Spec Kit. Beyond that, I served as a reviewer, checking that the features implemented by other members functioned correctly and followed the conventions I had set, and I proposed solutions when members ran into problems or adjusted the database schema to accommodate their implementation ideas. At the end of each sprint, I merged approved code from all members into the main branch once it met the required standard, and because coding conventions and codebase organization had been defined clearly from the start, merge conflicts were rarely a significant issue. I also led our team meetings, reporting on overall progress and assigning the coming week's tasks, while sharing any relevant technical knowledge or tools I had picked up along the way.

- **Personal Learning:** Serving as team leader taught me how to communicate effectively with teammates and understand their ideas well enough to offer timely support and relay information clearly to the rest of the group. I also learned that recognizing each member's individual strengths and assigning tasks accordingly is essential for both product quality and team efficiency. Beyond that, I came to appreciate how important it is to establish solid foundations early — frameworks, database design, coding conventions, and clear collaboration norms — since these directly determine how smoothly individual members can complete their work and how quickly the team as a whole can move toward the final product. On the technical side, I gained hands-on experience with Next.js for the frontend and Express.js for the backend, using PostgreSQL running through Docker for local development, and, most importantly, learned how combining an AI agent with Spec Kit under a specification-driven workflow can significantly speed up development while still preserving the quality of the final product.
