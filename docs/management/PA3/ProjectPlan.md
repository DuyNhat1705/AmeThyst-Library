# Project Plan

    Project: Modern Library Management System 
    Course: CS300 – CSC13002 – Introduction to Software Engineering 
    Group ID: 03
    Group Name: AmeThyst 
    Assignment: PA3-2026
    Version: 2.0

Performed by: Nguyễn Lê Hoàng Khải, Vũ Duy Nhất | Reviewed by: All Members | Edited by: Nguyễn Lê Hoàng Khải, Vũ Duy Nhất

## Revision History
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 01/07/2026 | 1.0 | Drafted initial sections: Introduction, Project Overview, and Project Organization | Nguyễn Lê Hoàng Khải |
| 03/07/2026 | 1.1 | Updated Project Plan with detailed schedules and tasks for Sprints 1 and 2 | Nguyễn Lê Hoàng Khải |
| 07/07/2026 | 1.2 | Updated Project Plan with detailed schedules and tasks for Sprints 3 and 4 | Nguyễn Lê Hoàng Khải |
| 23/07/2026 | 2.0 | Revised Project Plan for PA3-2026 based on TA feedback: corrected the PA schedule dates in Section 4.1 to match the official course schedule (and all Sprint headers in Section 4.3 accordingly); added a "Reviewed By" column across all task tables reflecting the team's internal review policy; consolidated the Sprint 2 task breakdown into clearer, more specific items; and updated the Sprint 4 task table and assignments per the latest Planning Report | Nguyễn Lê Hoàng Khải |

## Table of Contents

- [Project Plan](#project-plan)
  - [Revision History](#revision-history)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
  - [2. Project Overview](#2-project-overview)
    - [2.1 Project Objectives](#21-project-objectives)
    - [2.2 Scope of Work](#22-scope-of-work)
      - [2.2.1 Target Users](#221-target-users)
      - [2.2.2 Target Environments](#222-target-environments)
    - [2.3 Project Deliverables](#23-project-deliverables)
    - [2.4 Assumptions \& Constraints](#24-assumptions--constraints)
  - [3. Project Organization](#3-project-organization)
    - [3.1 Team Structure and Roles](#31-team-structure-and-roles)
    - [3.2 Risk Management](#32-risk-management)
  - [4. Project Plan](#4-project-plan)
    - [4.1 Schedule Overview](#41-schedule-overview)
    - [4.3 Detailed Build Plan](#43-detailed-build-plan)
    - [Sprint 1 (23 May – 6 Jun 2026) — Completed](#sprint-1-23-may--6-jun-2026--completed)
      - [Vũ Duy Nhất (4 tasks)](#vũ-duy-nhất-4-tasks)
      - [Nguyễn Nhựt Huy (2 tasks)](#nguyễn-nhựt-huy-2-tasks)
      - [Trần Lê Hoàng Gia (1 task)](#trần-lê-hoàng-gia-1-task)
      - [Nguyễn Lê Hoàng Khải (2 tasks)](#nguyễn-lê-hoàng-khải-2-tasks)
      - [Phan Lê Anh Minh (1 task)](#phan-lê-anh-minh-1-task)
      - [All Members (1 task)](#all-members-1-task)
    - [Sprint 2 (6 Jun – 11 Jul 2026) — Completed](#sprint-2-6-jun--11-jul-2026--completed)
      - [Vũ Duy Nhất (5 tasks)](#vũ-duy-nhất-5-tasks)
      - [Nguyễn Nhựt Huy (3 tasks)](#nguyễn-nhựt-huy-3-tasks)
      - [Trần Lê Hoàng Gia (5 tasks)](#trần-lê-hoàng-gia-5-tasks)
      - [Nguyễn Lê Hoàng Khải (4 tasks)](#nguyễn-lê-hoàng-khải-4-tasks)
      - [Phan Lê Anh Minh (6 tasks)](#phan-lê-anh-minh-6-tasks)
    - [Sprint 3 (11 Jul – 25 Jul, 2026) — Planned](#sprint-3-11-jul--25-jul-2026--planned)
      - [Vũ Duy Nhất (6 tasks)](#vũ-duy-nhất-6-tasks)
      - [Nguyễn Nhựt Huy (3 tasks)](#nguyễn-nhựt-huy-3-tasks)
      - [Trần Lê Hoàng Gia (3 tasks)](#trần-lê-hoàng-gia-3-tasks)
      - [Nguyễn Lê Hoàng Khải (3 tasks)](#nguyễn-lê-hoàng-khải-3-tasks)
      - [Phan Lê Anh Minh (2 tasks)](#phan-lê-anh-minh-2-tasks)
    - [Sprint 4 (25 Jul – 08 Aug, 2026) — Planned](#sprint-4-25-jul--08-aug-2026--planned)
      - [Vũ Duy Nhất (4 tasks)](#vũ-duy-nhất-4-tasks-1)
      - [Trần Lê Hoàng Gia (3 tasks)](#trần-lê-hoàng-gia-3-tasks-1)
      - [Phan Lê Anh Minh (2 tasks)](#phan-lê-anh-minh-2-tasks-1)
      - [Nguyễn Nhựt Huy (2 tasks)](#nguyễn-nhựt-huy-2-tasks-1)
      - [Nguyễn Lê Hoàng Khải (3 tasks)](#nguyễn-lê-hoàng-khải-3-tasks-1)
      - [All Members (2 tasks)](#all-members-2-tasks)
    - [Sprint 5 (08 Aug – 22 Aug, 2026) — Planned](#sprint-5-08-aug--22-aug-2026--planned)
  - [5. AI Usage Notes](#5-ai-usage-notes)

## 1. Introduction

Our project is a Modern Library Management System designed for everyone, combining the convenience of online services with the reliability of traditional, in-person library operations. The system enables users to search for and reserve physical books online, then quickly pick them up or return them in person. Beyond book management, the platform also manages physical spaces by offering a study room booking feature that supports both individual and group study sessions. In addition, an integrated AI recommendation tool suggests books tailored to each user's reading history, delivering a more personalized library experience.

## 2. Project Overview

### 2.1 Project Objectives

The primary goal of this project is to build a system that maximizes the management of all library resources — encompassing both books and rooms — while delivering a convenient, modern, and highly accessible experience to every user.

- **Provide an easy-to-use interface for users:** Simplify how users interact with the system, from searching for books to reserving study rooms, without requiring technical expertise.
- **Speed up physical checkouts:** Eliminate manual paperwork and long queues when borrowing books or booking study rooms.
- **Enable early availability checking**: Allow users to check book and study room availability in advance, reducing wasted trips and unnecessary waiting.
- **Optimize library assets:** Help staff manage book stock, monitor study room bookings, and review usage and financial data in real time.
- **Modernize the user experience:** Use AI to make finding books more intuitive and personalized to individual reading habits.

### 2.2 Scope of Work

#### 2.2.1 Target Users

- **Users seeking reference materials:** Students who need to quickly locate, reserve, and borrow physical books or textbooks for coursework and research.
- **Users seeking collaboration:** Users who want to connect with peers, form study groups, find study partners, and book collaborative spaces.
- **Users seeking quiet, focused spaces:** Users who need a quiet, structured environment for self-study, assignments, or individual projects.

#### 2.2.2 Target Environments

- **Web application:** Responsive interface compatible with major desktop and mobile browsers (Chrome, Safari, Edge).
- **Cross-platform access:** Accessible from any major operating system (Windows, macOS, Linux, iOS, Android) without requiring local installation.

### 2.3 Project Deliverables

The final product will be a fully operational web platform with integrated frontend, backend, and database components, covering the following functional modules:

1. **User Authentication & Authorization** — Supports single sign-on (SSO) via Google Account as well as standard self-registration.
2. **Profile Management** — A customizable dashboard for users to view, edit, and manage personal information, and to track their in-system transaction history.
3. **Advance Searching Feature** — Advanced filtering and search capabilities to efficiently locate library resources.
4. **Borrow & Reserving Feature** — Reservation of physical study spaces, combined with secure PIN-based authentication for in-person book borrowing and returns, synchronized automatically with the central database.
5. **Study Groups** — Enables users to create or join study groups and coordinate collaborative study sessions with peers.
6. **AI Recommendations** — Analyzes user reading history to generate personalized book recommendations.
7. **Librarian Administration** — Operational tools for library staff to update records, oversee circulation, and manage room reservations.
8. **Admin Administration** — Visual analytics and statistics on system metrics such as trending books and usage reports.
9. **User Assistance** — Provides comprehensive support features, including an interactive onboarding tour for new users, a responsive library floor map for locating specific zones and resources, and accessible documentation detailing system guides and library policies.

**Documentation deliverables:**
- A public GitHub repository containing the full source code.
- Complete documentation for all five Project Assignments (PAs).
- Spec Kit artifacts for all implemented functional groups, including UI/UX wireframes, architecture diagrams, database schemas, and system workflows.

### 2.4 Assumptions & Constraints

**Assumptions**

- All five team members will remain available and actively contribute throughout the project.
- The team will incorporate feedback from the Teaching Assistant promptly and thoroughly in each revision cycle.
- Project progress will be tracked through consistently maintained documentation.
- Third-party services will remain accessible and stable throughout development.


**Constraints**

- **Time:** The project is strictly limited to 5 Sprints (2–3 weeks each), corresponding to the 5 Project Assignments (PAs) scheduled throughout the semester.
- **Language:** All documentation, reports, and in-code comments must be written exclusively in English.
- **Process:** The team must follow the Scrum framework, using Jira for task tracking and GitHub for version control.
- **Personnel:** Despite having specialized role titles, every team member is expected to contribute as a full-stack engineer across report writing, development, and self-training.
- **Formatting:** All documentation must be written in Markdown (`.md`) with Mermaid diagrams, and a converted PDF version must accompany every submission.
- **AI Declaration:** A detailed AI Usage Declaration must be provided for every section that uses AI assistance; submissions missing this declaration will not be graded.
- **Quality Assurance:** The system must be verified as functional at every stage of development to ensure a reliable final product.
- **Workload Distribution:** Tasks must be distributed fairly and efficiently throughout the development process.

## 3. Project Organization

### 3.1 Team Structure and Roles

The team consists of five members, each holding a primary specialization while also contributing as a full-stack engineer across the project.

|Member|Role|Main Responsibilities|
|---|---|---|
|Vũ Duy Nhất|Project Manager & Full-stack Engineer (Team Leader)|Manages project timelines, assigns tasks, coordinates team communication, and owns the overall system architecture. Contributes to both front-end and back-end development for core features.|
|Nguyễn Nhựt Huy|UI/UX Designer & Front-end Engineer|Designs wireframes and prototypes, optimizes user experience, and translates design mockups into clean, production-ready front-end code.|
|Trần Lê Hoàng Gia|Technical Lead & Back-end Engineer|Designs database schemas, builds and optimizes APIs, handles server-side logic, and ensures system security and scalability.|
|Nguyễn Lê Hoàng Khải|Full-stack Engineer & DevOps Specialist|Develops both front-end and back-end features as needed, configures environments, sets up CI/CD pipelines, manages repositories, and deploys the application.|
|Phan Lê Anh Minh|Full-stack Engineer & Quality Assurance (Tester)|Contributes to feature development, and leads the QA process by writing test cases, executing testing, and tracking bugs.|

Decision-making follows a consensus-first approach; if consensus cannot be reached, the team defaults to a majority vote, with the Project Manager holding final authority on non-technical deadlocks and the Technical Lead on purely technical disputes.

### 3.2 Risk Management

||Risk|Likelihood|Impact|Mitigation Strategy|
|---|---|---|---|---|
|1|**Member unavailability** — a team member becomes unreachable or unable to complete assigned tasks due to personal issues, illness, or academic workload.|Medium|High|Members must notify the team at least 24 hours before a deadline if they anticipate missing it. Available members redistribute the affected workload, and the delayed member compensates in a subsequent sprint.|
|2|**Technology / integration issues** — difficulties integrating the AI recommendation engine, third-party services (e.g. Google OAuth), or the front-end/back-end stack (Next.js, Node.js/Express).|Medium|Medium|Allocate dedicated research and prototyping time early in the sprint before full implementation. The Technical Lead reviews architecture decisions in advance, and the team maintains a fallback (simpler) implementation option for high-risk features such as AI recommendations.|
|3|**Scope creep** — the project scope expands beyond what is feasible within the 5-sprint timeline (e.g. adding non-essential features).|Medium|High|All feature changes must go through the team's consensus/majority-vote decision process before implementation. The Project Manager cross-checks new requests against the Jira backlog and sprint capacity before approval.|
|4|**Uneven task distribution / workload imbalance** — some members contribute significantly more or less than others, causing delays or team friction.|Low|Medium|Track task completion and code contributions through Jira story points and GitHub Pull Requests. Apply the team's escalation procedure (friendly reminder → official warning → instructor escalation).|
|5|**Data loss or version conflicts** — unsynchronized work or accidental overwrites in the shared GitHub repository.|Low|High|Enforce the branching strategy (`main` / `dev` / `feature/*` / `doc/*`), require `git fetch` and `git pull` before starting work, and mandate at least one peer review before merging any Pull Request.|

## 4. Project Plan

This project plan is not a final version and may be subject to change and finish throughout the remaining PAs.

### 4.1 Schedule Overview

| Sprint | PA | Duration | Dates | Status | Key Deliverables / Main Tasks |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sprint 1** | PA1 | 2 weeks | 23 May – 6 Jun, 2026 | Completed | Project Proposal, Existing App Survey, Team Contract, Dev Tools & Process Setup, Framework Setup |
| **Sprint 2** | PA2 | 5 weeks | 6 Jun – 11 Jul, 2026 | Completed | Project Plan, Vision Document, Spec Kit Initialization, AI Usage & Weekly Report; ERD/DB Schema, Figma UI Design, Start working on several Functional Groups |
| **Sprint 3** | PA3 | 2 weeks | 11 Jul – 25 Jul, 2026 | Planned | Revised Project Plan, Detailed Vision Document, Use-Case Model, Use-Case Specification & UI Prototypes, AI Usage & Weekly Report, Implement 1 Functional Group (Authentication) |
| **Sprint 4** | PA4 | 2 weeks | 25 Jul – 08 Aug, 2026 | Planned | Revised Use-Case Specification, Software Architecture (C4 Model Level 1-3), Deployment Diagram, AI Usage & Weekly Report, Implement 2 Functional Groups (Profile Management, Books) |
| **Sprint 5** | PA5 | 2 weeks | 08 Aug – 22 Aug, 2026* | Planned | Test Plan, Test Cases, Test Execution Results, Bug Report, Reflective Report, Final Product Demo, Final Submission |

*Dates above follow the official course schedule provided by the instructor; the PA5 due date is marked with an asterisk (22/08/2026*) per that schedule.*

### 4.3 Detailed Build Plan

### Sprint 1 (23 May – 6 Jun 2026) — Completed
**Deliverables:** 
- Completed required documents (Project Proposal, Existing App Survey, and Team Contract).
- Researched, evaluated, and onboarded the team onto selected development tools.
- Delivered foundational documentation for a shared understanding of the project.
  
![Sprint 1 Gantt Chart](Gantt%20Charts/Sprint1.svg)

#### Vũ Duy Nhất (4 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Write Weekly Report | Jun 6 | All Members |
| Document | Write Planning Report | Jun 6 | All Members |
| Document | Write Review Report | Jun 6 | All Members |
| Development | Complete the Framework (React Next.js + ExpressJS) | May 30 | Self-tested + Vũ Duy Nhất |

#### Nguyễn Nhựt Huy (2 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Write Team Contract | Jun 6 | All Members |
| Development | UI/UX Design for the Website | Jun 6 | Self-tested + Vũ Duy Nhất |

#### Trần Lê Hoàng Gia (1 task)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Development | Collect data of books | Jun 6 | Self-tested + Vũ Duy Nhất |

#### Nguyễn Lê Hoàng Khải (2 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Write Project Proposal | Jun 6 | All Members |
| Document | Take screenshot of required tools (GitHub, Jira, VS Code, AI Coding Acc...) | Jun 6 | All Members |

#### Phan Lê Anh Minh (1 task)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Write Existing App Survey | Jun 6 | All Members |

#### All Members (1 task)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Finalize at least 10 usecase groups for the web | May 31 | All Members |

--- 

### Sprint 2 (6 Jun – 11 Jul 2026) — Completed

**Deliverables:** 
- Completed required documents (Project Plan, Vision Document, Spec Kit Initialization, and AI Usage & Weekly Report).
- Designed ERD/DB Schema and set up database connection.
- Prepared Figma UI designs in advance for core feature pages.
- Used Spec Kit to implement interfaces based on the Figma designs.
- Completed functional groups: User Authentication & Authorization, Profile Management, Advance Searching Feature.

![Sprint 2 Gantt Chart](Gantt%20Charts/Sprint2.svg)

#### Vũ Duy Nhất (5 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Design core system diagrams: ERD for user and librarian usecases, and the overall usecase diagram | Jun 23 | All Members |
| Development | Update the ERD and database structure based on team feedback, including refactoring the user, borrow_books, and return_books tables | Jun 27 | Self-tested + Vũ Duy Nhất |
| Document | Prepare Spec Kit foundational documentation: self-training evidence, a Spec Kit knowledge-summary document, and the Room Reserve + Library intersection document | Jul 4 | All Members |
| Development | Overview and Merge Code (two integration passes across the sprint) | Jul 4 | All Members |
| Document | Write the Weekly Report, AI Usage Report, Planning Report, and Review Report | Jul 11 | All Members |

#### Nguyễn Nhựt Huy (3 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Write the Vision Document (20 points) | Jul 11 | All Members |
| Development | Complete the Home Page and core Dashboard pages (Profile/Personal Info, Settings, Book Borrowing history, Loan & Fees) based on Figma | Jun 24 | Self-tested + Vũ Duy Nhất |
| Development | Complete the Book Borrowing flow with Pin Verification, covering both user-facing and librarian-facing pages | Jul 4 | Self-tested + Vũ Duy Nhất |

#### Trần Lê Hoàng Gia (5 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Identify the database schema for storing user and book data | Jun 13 | All Members |
| Development | Set up the PostgreSQL database based on the ERD: user table, books table, and study_room/room_avail tables | Jun 27 | Self-tested + Vũ Duy Nhất |
| Development | Complete the Advance Search feature: title/author/category search, semantic search by plot and theme, no-result handling, and the 13-genre filter | Jun 27 | Self-tested + Vũ Duy Nhất |
| Development | Complete the Library Map feature based on Figma | Jul 4 | Self-tested + Vũ Duy Nhất |
| Development | Complete a partial (phase 1) version of the AI Recommendation feature | Jul 11 | Self-tested + Vũ Duy Nhất |

#### Nguyễn Lê Hoàng Khải (4 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Write the Project Plan (15 points) | Jul 11 | All Members |
| Development | Complete the View Book Details and Recommended Books pages based on Figma | Jun 24 | Self-tested + Vũ Duy Nhất |
| Development | Complete the Study Group pages: browse/join study groups, and "Your Study Groups" (created & joined) | Jun 27 | Self-tested + Vũ Duy Nhất |
| Development | Complete the Librarian Announcements page based on Figma | Jul 1 | Self-tested + Vũ Duy Nhất |

#### Phan Lê Anh Minh (6 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Development | Design the Book Borrowing and Room Reservation Dashboard pages on Figma | Jun 17 | Self-tested + Vũ Duy Nhất |
| Development | Complete user Authentication: Register (with Single-Factor Authentication and OTP resend / 30s expiry) and Login | Jun 24 | Self-tested + Vũ Duy Nhất |
| Development | Complete Profile Management and Librarian Authentication (Login, Register, Forgot Password) | Jun 27 | Self-tested + Vũ Duy Nhất |
| Development | Redesign UI based on team meeting feedback | Jul 1 | Self-tested + Vũ Duy Nhất |
| Development | Write unit tests (≥10 test cases) for the Register usecase (all relevant modules if possible) | Jul 4 | Self-tested + Vũ Duy Nhất |
| Development | Complete the Announcements feature for Librarian | Jul 11 | Self-tested + Vũ Duy Nhất |

---

### Sprint 3 (11 Jul – 25 Jul, 2026) — Completed
**Deliverables:**
- Complete required documents: Revised Project Plan (5 pts), Detailed Vision Document (5 pts), Use-Case Model (10 pts), Use-Case Specification with inserted use-case diagrams and Figma UI screenshots (45 pts), AI Usage Report & Weekly Report (5 pts) — all changes relative to the PA2 versions are consolidated into a single shared `change.md` file (Project Plan and Vision Document changes together, not separate files).
- Complete 1 required functional group via Spec Kit: **Authentication** (20 pts) — deliverable includes a narrated video demo (uploaded Unlisted/Public to YouTube), the complete source code, and the generated Spec Kit artifacts (specs, plans, tasks).
- Aim to complete implementation for: Borrowing & Reserving (Room Reservation + Book Return flows), Study Group, AI Recommendations, and Librarian Administration (Books management page, Add/Remove books).

![Sprint 3 Gantt Chart](Gantt%20Charts/Sprint3.svg)

#### Vũ Duy Nhất (6 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Draw the general Use-Case Diagram for the 9 functional groups on Draw.io (Use-Case Model, 10 points); additional use cases discovered during implementation to be appended later | Jul 13 | All Members |
| Document | Export the Use-Case Diagram image per functional group and use AI to generate the corresponding Mermaid script from members' use-case specifications | Jul 13 | All Members |
| Document | Support Minh and Gia on the Use-Case Specification (45 points) | Jul 25 | All Members |
| Development | Record the narrated video demo for the Authentication functional group (upload Unlisted/Public to YouTube) | Jul 25 | Self-tested + Vũ Duy Nhất |
| Document | Write the AI Usage Report + Weekly Report (5 points) | Jul 25 | All Members |
| Development | Overview and Merge Code | Jul 19 | All Members |

#### Nguyễn Nhựt Huy (3 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Write the Detailed Vision Document (5 points) based on TA feedback; add all changes vs. PA2 into the shared change.md file | Jul 19 | All Members |
| Development | Complete the Room Reservation usecase in Borrowing & Reserving | Jul 15 | Self-tested + Vũ Duy Nhất |
| Development | Complete the Books page (Book Management, Book Pickup, Book Return, Inspection tabs) in the Librarian Dashboard based on Figma | Jul 18 | Self-tested + Vũ Duy Nhất |
| Development | Complete the Book Return Confirmation and Loan Recognition usecases (librarian-facing) in Borrowing & Reserving | Jul 25 | Self-tested + Vũ Duy Nhất |

#### Trần Lê Hoàng Gia (3 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Co-author the Use-Case Specification (45 points) with Minh, supported by Nhất | Jul 25 | All Members |
| Development | Complete the AI Recommendations feature | Jul 18 | Self-tested + Vũ Duy Nhất |
| Development | Complete the Add Books / Remove Books usecases in Librarian Administration | Jul 25 | Self-tested + Vũ Duy Nhất |

#### Nguyễn Lê Hoàng Khải (3 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Write the Revised Project Plan (5 points) based on TA feedback; write change.md listing all changes vs. the PA2 Project Plan | Jul 19 | All Members |
| Development | Complete Study Group – phase 1 (create group, remove group, edit group info, find user by email to add to group); cover 6 group states, adjusted to fit the team's design | Jul 18 | Self-tested + Vũ Duy Nhất |
| Development | Complete Study Group – phase 2 (request to join, view other member profile, cancel request by sender, reject request by group creator) with real-time updates; cover 4 join-request states, adjusted to fit the team's design | Jul 25 | Self-tested + Vũ Duy Nhất |

#### Phan Lê Anh Minh (2 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Document | Co-author the Use-Case Specification (45 points) with Gia, supported by Nhất — organized by functional group per the PA3 outline, with use-case diagram and Figma GUI screenshots inserted for each group | Jul 25 | All Members |

---

### Sprint 4 (25 Jul – 08 Aug, 2026) — Planned
**Deliverables:**
- Complete required documents: Revised Use-Case Specification (5 pts), Software Architecture — System Context Diagram (15 pts: technology stack description + C4 Model Level 1), Software Architecture — Container & Component Diagram (20 pts: C4 Model Level 2 & 3), Deployment Diagram (5 pts), AI Usage Report & Weekly Report (5 pts).
- Complete 2 required functional groups via Spec Kit: **Profile Management** and **Books** (25 pts) — includes Spec-Kit-generated test cases, a narrated video demo (Unlisted/Public on YouTube), full source code, and the generated Spec Kit artifacts.
- Complete the remaining core implementation: Room Reserve Verification and Checkout Room Confirmation usecases in Borrowing & Reserving, and the Admin Dashboard (User Management, System Configuration, Statistics, Roles & Permissions) — effectively finishing the base LIMA website.

![Sprint 4 Gantt Chart](Gantt%20Charts/Sprint4.svg)

#### Vũ Duy Nhất (4 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Development | Overview and Merge Code | Aug 2 | All Members |
| Document | Deployment Diagram (5 points) | Aug 8 | All Members |
| Development | Record a video demo with narration explaining the implemented features (Profile Management and Books) | Aug 8 | Self-tested + Vũ Duy Nhất |
| Document | AI Usage Report + Weekly Report (5 points) | Aug 8 | All Members |

#### Trần Lê Hoàng Gia (3 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Development | Complete the Statistics Page in Admin Administration (GUI + Functionality) | Aug 1 | Self-tested + Vũ Duy Nhất |
| Development | Write unit tests (≥10 test cases) for the AI Recommendation usecase, covering all relevant modules called by this API where possible | Aug 7 | Self-tested + Vũ Duy Nhất |
| Document | Software Architecture: System Context Diagram (15 points) | Aug 8 | All Members |

#### Phan Lê Anh Minh (2 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Development | Complete User Management in Admin Administration (GUI + Functionality) | Aug 1 | Self-tested + Vũ Duy Nhất |
| Document | Revised Use-Case Specification (5 points) | Aug 8 | All Members |

#### Nguyễn Nhựt Huy (2 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Development | Complete the Room Reserve Verification and Checkout Room Confirmation usecases in Borrowing & Reserving | Aug 1 | Self-tested + Vũ Duy Nhất |
| Development | Complete Roles & Permissions in Admin Dashboard (GUI + Functionality) | Aug 7 | Self-tested + Vũ Duy Nhất |

#### Nguyễn Lê Hoàng Khải (3 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Development | Complete System Configuration in Admin Administration (GUI + Functionality) | Aug 1 | Self-tested + Vũ Duy Nhất |
| Development | Write unit tests (≥10 test cases) for the Create Study Group usecase, covering all relevant modules called by this API where possible | Aug 7 | Self-tested + Vũ Duy Nhất |
| Document | Software Architecture: Container Diagram and Component Diagram (20 points) | Aug 8 | All Members |

#### All Members (2 tasks)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Development | Implement 2 Functional Groups using Spec Kit — Profile Management and Books (25 points), including Spec-Kit-generated test cases | Aug 8 | Self-tested + Vũ Duy Nhất |
| Development | Fix bugs in implemented features | Aug 8 | Self-tested + Vũ Duy Nhất |

---

### Sprint 5 (08 Aug – 22 Aug, 2026) — Planned
**Deliverables:**
- Complete required documents: Test Plan, Test Cases (detailed document version, not code), Test Execution Results (document version, not console output), Bug Report, and Reflective Report (20 pts, covering team experience, Spec Kit experience, AI tools usage, SDLC feedback, and individual contributions).
- Complete remaining unit tests (Reserve Book, Pin Verification usecases) and finish reviewing/fixing bugs across the LIMA website.
- Deploy the website globally.
- Deliver the Final Product Demo (110 pts) and package the Final Submission.
- Aim to complete functional group: User Assistance.

![Sprint 5 Gantt Chart](Gantt%20Charts/Sprint5.svg)

| Type | Task | Due Date | Reviewed By |
| :--- | :--- | :--- | :--- |
| Development | Write unit tests (≥10 cases) for Reserve Book usecase, including all relevant dependent modules | Aug 15 | Self-tested + Vũ Duy Nhất |
| Development | Write unit tests (≥10 cases) for Pin Verification usecase, including all relevant dependent modules | Aug 15 | Self-tested + Vũ Duy Nhất |
| Development | Review and fix bugs across the LIMA website (all members) | Aug 16 | Self-tested + Vũ Duy Nhất |
| Development | Deploy website globally (feasibility and resources planned ahead in Sprint 4 to allow code adjustments) | Aug 18 | Self-tested + Vũ Duy Nhất |
| Document | Test Plan | Aug 22 | All Members |
| Document | Test Cases (detailed document version) | Aug 22 | All Members |
| Document | Test Execution Results (document version) | Aug 22 | All Members |
| Document | Bug Report | Aug 22 | All Members |
| Document | Reflective Report (20 points): team experience, Spec Kit experience, AI tools usage, SDLC feedback, individual contributions | Aug 22 | All Members |
| All Members | Prepare and rehearse the Final Product Demo (110 points): brief introduction (1-2 min), live demo of 2-3 key user workflows (10-12 min), technical overview referencing C4 diagrams and Spec Kit usage (2-3 min); no slides, live working product only; every member presents at least one feature | Aug 22 | All Members |
| All Members | Prepare the Final Submission: finalize PA1–PA5 documents, complete source code (excl. node_modules, venv, build artifacts), all Spec Kit artifacts (specs, plans, tasks, generated tests), test documents, and the project-wide AI Usage Report; compress into `PA5-Group03.zip` | Aug 22 | All Members |

## 5. AI Usage Notes
This document was drafted with the assistance of an AI tool, declared as follows:

AI Tool 1
- **Tool name:** Gemini Pro 3.1, Google
- **Access time:** June 7, 2026 to July 12, 2026
- **Prompt:** "Translate the sentence into English suitable for a formal report, without altering the original meaning."
- **Purpose:** To accurately translate ideas from Vietnamese into fluent, professional English.
- **Content generated by AI:** Initial translation of all sections in this document.
- **Student's work and validation:** All AI-translated content was manually reviewed to confirm the original ideas were preserved, and semantic errors or mistranslations were corrected.

AI Tool 2

- **Tool name:** Claude Sonnet 5, Anthropic
- **Access** time: June 7, 2026 to July 12, 2026
- **Prompt:** "Refactor this Project Plan section by section."
- **Purpose:** To restructure and rewrite the Project Plan into clear, professional report language, and to draft the Team Structure and Risk Management content.
- **Content generated by AI:** Well-structured project plan document based on content the student prepared.
- **Student's work and validation:** All AI-generated content was reviewed against TeamContract.md and ProjectProposal.md for accuracy, and edited to ensure it reflects the team's actual roles, decisions, and risk assessment.

AI Tool 3

- **Tool name:** Claude Sonnet 5, Anthropic
- **Access time:** July 23, 2026
- **Prompt:** "Revise the Project Plan for PA3-2026 based on TA feedback: correct the PA schedule dates, add a Reviewed By column reflecting our review policy, consolidate the Sprint 2 task list, and update Sprint 4 tasks based on the Planning Report."
- **Purpose:** To apply TA-requested corrections and reorganize existing content without introducing new, unverified information.
- **Content generated by AI:** Corrected schedule table and Sprint headers, a consolidated Sprint 2 task breakdown, a "Reviewed By" column applied consistently across all task tables, and an updated Sprint 4 task table reflecting the team's Planning Report.
- **Student's work and validation:** All AI-generated changes were checked against the official course schedule, the team's actual review practices, and PlanningReport.pdf before being accepted into the document.