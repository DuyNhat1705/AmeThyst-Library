# Project Plan

    Project: Modern Library Management System 
    Course: CS300 – CSC13002 – Introduction to Software Engineering 
    Group ID: 03
    Group Name: AmeThyst 
    Assignment: PA2-2026
    Version: 1.2

Performed by: Nguyễn Lê Hoàng Khải, Vũ Duy Nhất | Reviewed by: All Members | Edited by: Nguyễn Lê Hoàng Khải, Vũ Duy Nhất

## Revision History
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 01/07/2026 | 1.0 | Drafted initial sections: Introduction, Project Overview, and Project Organization | Nguyễn Lê Hoàng Khải |
| 03/07/2026 | 1.1 | Updated Project Plan with detailed schedules and tasks for Sprints 1 and 2 | Nguyễn Lê Hoàng Khải |
| 07/07/2026 | 1.2 | Updated Project Plan with detailed schedules and tasks for Sprints 3 and 4 | Nguyễn Lê Hoàng Khải |

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
    - [4.2 Schedule Overview](#42-schedule-overview)
    - [4.3 Detailed Build Plan](#43-detailed-build-plan)
    - [Sprint 1 (23 May – 6 Jun 2026) — Completed](#sprint-1-23-may--6-jun-2026--completed)
      - [Vũ Duy Nhất (4 tasks)](#vũ-duy-nhất-4-tasks)
      - [Nguyễn Nhựt Huy (2 tasks)](#nguyễn-nhựt-huy-2-tasks)
      - [Trần Lê Hoàng Gia (1 task)](#trần-lê-hoàng-gia-1-task)
      - [Nguyễn Lê Hoàng Khải (2 tasks)](#nguyễn-lê-hoàng-khải-2-tasks)
      - [Phan Lê Anh Minh (1 task)](#phan-lê-anh-minh-1-task)
      - [All Members (1 task)](#all-members-1-task)
    - [Sprint 2 (7 Jun – 12 July 2026) — Completed](#sprint-2-7-jun--12-july-2026--completed)
      - [Vũ Duy Nhất (13 tasks)](#vũ-duy-nhất-13-tasks)
      - [Nguyễn Nhựt Huy (7 tasks)](#nguyễn-nhựt-huy-7-tasks)
      - [Trần Lê Hoàng Gia (10 tasks)](#trần-lê-hoàng-gia-10-tasks)
      - [Nguyễn Lê Hoàng Khải (6 tasks)](#nguyễn-lê-hoàng-khải-6-tasks)
      - [Phan Lê Anh Minh (10 tasks)](#phan-lê-anh-minh-10-tasks)
    - [Sprint 3 (13 Jul – 26 Jul, 2026) — Planned](#sprint-3-13-jul--26-jul-2026--planned)
      - [Vũ Duy Nhất (6 tasks)](#vũ-duy-nhất-6-tasks)
      - [Nguyễn Nhựt Huy (3 tasks)](#nguyễn-nhựt-huy-3-tasks)
      - [Trần Lê Hoàng Gia (3 tasks)](#trần-lê-hoàng-gia-3-tasks)
      - [Nguyễn Lê Hoàng Khải (3 tasks)](#nguyễn-lê-hoàng-khải-3-tasks)
      - [Phan Lê Anh Minh (2 task)](#phan-lê-anh-minh-2-task)
    - [Sprint 4 (27 Jul – 09 Aug, 2026) — Planned](#sprint-4-27-jul--09-aug-2026--planned)
    - [Sprint 5 (10 Aug – 23 Aug, 2026) — Planned](#sprint-5-10-aug--23-aug-2026--planned)
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

### 4.2 Schedule Overview

| Sprint | PA | Duration | Dates | Status | Key Deliverables / Main Tasks |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sprint 1** | PA1 | 2 weeks | 23 May – 6 Jun, 2026 | Completed | Project Proposal, Existing App Survey, Team Contract, Dev Tools & Process Setup, Framework Setup |
| **Sprint 2** | PA2 | 5 weeks | 7 Jun – 12 July, 2026 | Completed | Project Plan, Vision Document, Spec Kit Initialization, AI Usage & Weekly Report; ERD/DB Schema, Figma UI Design, Start working on several Functional Groups |
| **Sprint 3** | PA3 | 2 weeks | 13 Jul – 26 Jul, 2026 | Planned | Revised Project Plan, Detailed Vision Document, Use-Case Model, Use-Case Specification & UI Prototypes, AI Usage & Weekly Report, Implement 1 Functional Group (Authentication) |
| **Sprint 4** | PA4 | 2 weeks | 27 Jul – 09 Aug, 2026 | Planned | Revised Use-Case Specification, Software Architecture (C4 Model Level 1-3), Deployment Diagram, AI Usage & Weekly Report, Implement 2 Functional Groups (Study Group, AI Recommendations) |
| **Sprint 5** | PA5 | 2 weeks | 10 Aug – 23 Aug, 2026 | Planned | Test Plan, Test Cases, Test Execution Results, Bug Report, Reflective Report, Final Product Demo, Final Submission |

### 4.3 Detailed Build Plan

**Note:** Review tasks are not logged as separate items, but an internal review policy is strictly followed. Documents are collectively reviewed by the team once drafted. Meanwhile, development tasks undergo self-testing by the implementer and a mandatory code review by the Project Manager (Vũ Duy Nhất) prior to merging.

### Sprint 1 (23 May – 6 Jun 2026) — Completed
**Deliverables:** 
- Completed required documents (Project Proposal, Existing App Survey, and Team Contract).
- Researched, evaluated, and onboarded the team onto selected development tools.
- Delivered foundational documentation for a shared understanding of the project.
  
![Sprint 1 Gantt Chart](Gantt%20Charts/Sprint1.svg)

#### Vũ Duy Nhất (4 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Write Weekly Report | Jun 6 |
| Document | Write Planning Report | Jun 6 |
| Document | Write Review Report | Jun 6 |
| Development | Complete the Framework (React NextJs + ExpressJs) | May 30 |

#### Nguyễn Nhựt Huy (2 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Write Team Contract | Jun 6 |
| Development | UI/UX Design for the Website | Jun 6 |

#### Trần Lê Hoàng Gia (1 task)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Development | Collect data of books | Jun 6 |

#### Nguyễn Lê Hoàng Khải (2 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Write Project Proposal | Jun 6 |
| Document | Take screenshot of required tools (GitHub, Jira, VS Code, AI Coding Acc...) | Jun 6 |

#### Phan Lê Anh Minh (1 task)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Write Existing App Survey | Jun 6 |

#### All Members (1 task)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Finalize at least 10 usecase groups for the web | May 31 |

--- 

### Sprint 2 (7 Jun – 12 July 2026) — Completed

**Deliverables:** 
- Completed required documents (Project Plan, Vision Document, Spec Kit Initialization, and AI Usage & Weekly Report).
- Designed ERD/DB Schema and set up database connection.
- Prepared Figma UI designs in advance for core feature pages.
- Used Spec Kit to implement interfaces based on the Figma designs.
- Completed functional groups: User Authentication & Authorization, Profile Management, Advance Searching Feature.

![Sprint 2 Gantt Chart](Gantt%20Charts/Sprint2.svg)

#### Vũ Duy Nhất (13 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Draw ERD for user usecases | Jun 13 |
| Document | Draw usecase diagram | Jun 16 |
| Document | Draw ERD for librarian usecases | Jun 23 |
| Document | Complete collecting evidence for SpecKit self-training | Jun 27 |
| Document | Update ERD and Database structure based on member opinion | Jun 27 |
| Document | Write Document introducing intersection of Room Reserve + Library | Jun 27 |
| Document | Write Weekly Report | Jul 4 |
| Document | Write SpecKit document to summarize all members' knowledge + prepare for SpecKit files generated in initializing process | Jul 4 |
| Document | Write AI Usage Report | Jul 11 |
| Document | Write Planning Report + Review Report | Jul 11 |
| Development | Refactoring user tables, borrow_books, return_books based on meeting discussion | Jun 23 |
| Development | Overview and Merge Code | Jun 28 |
| Development | Overview and Merge code | Jul 4 |

#### Nguyễn Nhựt Huy (7 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Write Vision Document (20 points) | Jul 11 |
| Development | Complete Home Page based on Figma | Jun 18 |
| Development | Complete DashBoard/Profile/Personal Info Page + Settings | Jun 20 |
| Development | Complete DashBoard/Book Borrowing (All Reservations + Borrow History) | Jun 24 |
| Development | Complete DashBoard/Loan & Fees Page based on Figma | Jun 24 |
| Development | Complete Book Borrowing + Pin Verification for Book | Jun 27 |
| Development | Complete dashboard/librarian/pin-verification page based on Figma and its function | Jul 4 |

#### Trần Lê Hoàng Gia (10 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Identify database schema for storing data for user and book | Jun 13 |
| Development | Storing Data into PostgreSQL based on ERD | Jun 15 |
| Development | Set up USER table for storing user data based on ERD | Jun 16 |
| Development | Complete updating data in books table | Jun 27 |
| Development | Complete Semantic Search with Plot description, Semantic search by theme | Jun 27 |
| Development | Complete Search by title, Search by author/category, Search with no result | Jun 27 |
| Development | Complete Filter feature for books prioritizing by 13 genres | Jun 27 |
| Development | Fill data into study_room table and room_avail table | Jul 1 |
| Development | Complete Library Map page based on Figma and complete whole Library Map feature | Jul 4 |
| Development | Complete partially AI recommendation feature | Jul 11 |

#### Nguyễn Lê Hoàng Khải (6 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Write Project Plan (15 points) | Jul 11 |
| Development | Complete View Book Details based on Figma | Jun 18 |
| Development | Complete DashBoard/Recommended Books Page based on Figma | Jun 24 |
| Development | Complete studytogether/studygroup Page | Jun 27 |
| Development | Complete dashboard/yourstudygroup (Groups I created + Group I joined) | Jun 27 |
| Development | Complete dashboard/librarian/announcements page based on Figma | Jul 1 |

#### Phan Lê Anh Minh (10 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Development | Design DashBoard/Book Borrowing Page on Figma | Jun 17 |
| Development | Design DashBoard/Room Reservation Page on Figma | Jun 17 |
| Development | Complete Account Register, Account Login in Authentication | Jun 20 |
| Development | Add Single-Factor Authentication (SFA) for Create Account (Register) | Jun 24 |
| Development | Add resend OTP button + decrease expire time of OTP to 30s | Jun 24 |
| Development | Complete Profile Management | Jun 27 |
| Development | Complete Authentication (Login, Register, Forget pwd) for Librarian | Jun 27 |
| Development | Redesign based on Discussion in the Meeting | Jul 1 |
| Development | Write unit test (≥10 test cases) for register usecase (all relevant modules if possible) | Jul 4 |
| Development | Complete Announcements feature for Librarian | Jul 11 |

---

### Sprint 3 (13 Jul – 26 Jul, 2026) — Planned
**Deliverables:**
- Complete required documents: Revised Project Plan (5 pts), Detailed Vision Document (5 pts), Use-Case Model (10 pts), Use-Case Specification with inserted use-case diagrams and Figma UI screenshots (45 pts), AI Usage Report & Weekly Report (5 pts) — all changes relative to the PA2 versions are consolidated into a single shared `change.md` file (Project Plan and Vision Document changes together, not separate files).
- Complete 1 required functional group via Spec Kit: **Authentication** (20 pts) — deliverable includes a narrated video demo (uploaded Unlisted/Public to YouTube), the complete source code, and the generated Spec Kit artifacts (specs, plans, tasks).
- Aim to complete implementation for: Borrowing & Reserving (Room Reservation + Book Return flows), Study Group, AI Recommendations, and Librarian Administration (Books management page, Add/Remove books).

![Sprint 3 Gantt Chart](Gantt%20Charts/Sprint3.svg)

#### Vũ Duy Nhất (6 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Draw the general Use-Case Diagram for the 9 functional groups on Draw.io (Use-Case Model, 10 points); additional use cases discovered during implementation to be appended later | Jul 13 |
| Document | Export the Use-Case Diagram image per functional group and use AI to generate the corresponding Mermaid script from members' use-case specifications | Jul 13 |
| Document | Support Minh and Gia on the Use-Case Specification (45 points) | Jul 25 |
| Development | Record the narrated video demo for the Authentication functional group (upload Unlisted/Public to YouTube) | Jul 25 |
| Document | Write the AI Usage Report + Weekly Report (5 points) | Jul 25 |
| Development | Overview and Merge Code | Jul 19 |

#### Nguyễn Nhựt Huy (3 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Write the Detailed Vision Document (5 points) based on TA feedback; add all changes vs. PA2 into the shared change.md file | Jul 19 |
| Development | Complete the Room Reservation usecase in Borrowing & Reserving | Jul 15 |
| Development | Complete the Books page (Book Management, Book Pickup, Book Return, Inspection tabs) in the Librarian Dashboard based on Figma | Jul 18 |
| Development | Complete the Book Return Confirmation and Loan Recognition usecases (librarian-facing) in Borrowing & Reserving | Jul 25 |

#### Trần Lê Hoàng Gia (3 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Co-author the Use-Case Specification (45 points) with Minh, supported by Nhất | Jul 25 |
| Development | Complete the AI Recommendations feature | Jul 18 |
| Development | Complete the Add Books / Remove Books usecases in Librarian Administration | Jul 25 |

#### Nguyễn Lê Hoàng Khải (3 tasks)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Write the Revised Project Plan (5 points) based on TA feedback; write change.md listing all changes vs. the PA2 Project Plan | Jul 19 |
| Development | Complete Study Group – phase 1 (create group, remove group, edit group info, find user by email to add to group); cover 6 group states, adjusted to fit the team's design | Jul 18 |
| Development | Complete Study Group – phase 2 (request to join, view other member profile, cancel request by sender, reject request by group creator) with real-time updates; cover 4 join-request states, adjusted to fit the team's design | Jul 25 |

#### Phan Lê Anh Minh (2 task)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Co-author the Use-Case Specification (45 points) with Gia, supported by Nhất — organized by functional group per the PA3 outline, with use-case diagram and Figma GUI screenshots inserted for each group | Jul 25 |

---

### Sprint 4 (27 Jul – 09 Aug, 2026) — Planned
**Deliverables:**
- Complete required documents: Revised Use-Case Specification (5 pts, with change.md vs. PA3), Software Architecture — System Context Diagram (15 pts: technology stack description + C4 Model Level 1), Software Architecture — Container & Component Diagram (20 pts: C4 Model Level 2 & 3), Deployment Diagram (5 pts), AI Usage Report & Weekly Report (5 pts).
- Complete **2 required functional groups** via Spec Kit: **Study Group** and **AI Recommendations** (25 pts) — includes Spec-Kit-generated test cases, a narrated video demo (Unlisted/Public on YouTube), full source code, and the generated Spec Kit artifacts.
- Complete the remaining core implementation: full Borrowing & Reserving and Librarian Administration usecases (verification/checkout), and the Admin Dashboard (User Management, System Configuration, Statistics, Roles & Permissions) — effectively finishing the base LIMA website.

![Sprint 4 Gantt Chart](Gantt%20Charts/Sprint4.svg)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Document | Revised Use-Case Specification (5 points) — update based on TA feedback | Aug 2 |
| Document | Write change.md listing all changes vs. the PA3 Use-Case Specification | Aug 2 |
| Document | Software Architecture — System Context Diagram (15 points): describe frontend/backend/database/other component tech stack + draw C4 Model Level 1 diagram | Aug 8 |
| Document | Software Architecture — Container Diagram (C4 Level 2) and Component Diagram (C4 Level 3) (20 points) | Aug 8 |
| Document | Deployment Diagram (5 points) | Aug 8 |
| Development | Implement 2 Functional Groups via Spec Kit — Study Group & AI Recommendations (25 points), including Spec-Kit-generated test cases | Aug 8 |
| Development | Record narrated video demo for both functional groups (upload Unlisted/Public to YouTube) | Aug 8 |
| Document | AI Usage Report + Weekly Report (5 points) | Aug 8 |
| Development | Complete Room Reserve Verification and Checkout Room Confirmation usecases (librarian-facing); finish the full Borrowing & Reserving and Librarian Administration functional groups | Aug 1 |
| Development | Complete User Management page in Admin Dashboard (GUI + Functionality) | Aug 1 |
| Development | Complete System Configuration page in Admin Dashboard (GUI + Functionality) | Aug 1 |
| Development | Complete Statistics page in Admin Dashboard (GUI + Functionality) | Aug 1 |
| Development | Overview and Merge Code | Aug 2 |
| Development | Write unit tests (≥10 cases) for Create Study Group usecase, including all relevant dependent modules | Aug 8 |
| Development | Write unit tests (≥10 cases) for AI Recommendation usecase, including all relevant dependent modules | Aug 8 |
| Development | Complete Roles & Permissions in Admin Dashboard (GUI + Functionality) — effectively completes the base LIMA website | Aug 8 |

---

### Sprint 5 (10 Aug – 23 Aug, 2026) — Planned
**Deliverables:**
- Complete required documents: Test Plan, Test Cases (detailed document version, not code), Test Execution Results (document version, not console output), Bug Report, and Reflective Report (20 pts, covering team experience, Spec Kit experience, AI tools usage, SDLC feedback, and individual contributions).
- Complete remaining unit tests (Reserve Book, Pin Verification usecases) and finish reviewing/fixing bugs across the LIMA website.
- Deploy the website globally.
- Deliver the Final Product Demo (110 pts) and package the Final Submission.
- Aim to complete functional group: User Assistance.

![Sprint 5 Gantt Chart](Gantt%20Charts/Sprint5.svg)

| Type | Task | Due Date |
| :--- | :--- | :--- |
| Development | Write unit tests (≥10 cases) for Reserve Book usecase, including all relevant dependent modules | Aug 15 |
| Development | Write unit tests (≥10 cases) for Pin Verification usecase, including all relevant dependent modules | Aug 15 |
| Development | Review and fix bugs across the LIMA website (all members) | Aug 16 |
| Development | Deploy website globally (feasibility and resources planned ahead in Sprint 4 to allow code adjustments) | Aug 18 |
| Document | Test Plan | Aug 22 |
| Document | Test Cases (detailed document version) | Aug 22 |
| Document | Test Execution Results (document version) | Aug 22 |
| Document | Bug Report | Aug 22 |
| Document | Reflective Report (20 points): team experience, Spec Kit experience, AI tools usage, SDLC feedback, individual contributions | Aug 22 |
| All Members | Prepare and rehearse the Final Product Demo (110 points): brief introduction (1-2 min), live demo of 2-3 key user workflows (10-12 min), technical overview referencing C4 diagrams and Spec Kit usage (2-3 min); no slides, live working product only; every member presents at least one feature | Aug 23 |
| All Members | Prepare the Final Submission: finalize PA1–PA5 documents, complete source code (excl. node_modules, venv, build artifacts), all Spec Kit artifacts (specs, plans, tasks, generated tests), test documents, and the project-wide AI Usage Report; compress into `PA5-Group03.zip` | Aug 23 |

## 5. AI Usage Notes
This document was drafted with the assistance of an AI tool, declared as follows:

AI Tool 1
- **Tool name:** Gemini Pro 3.1, Google
- **Access time:** June 7, 2026 to 12 July 2026
- **Prompt:** "Translate the sentence into English suitable for a formal report, without altering the original meaning."
- **Purpose:** To accurately translate ideas from Vietnamese into fluent, professional English.
- **Content generated by AI:** Initial translation of all sections in this document.
- **Student's work and validation:** All AI-translated content was manually reviewed to confirm the original ideas were preserved, and semantic errors or mistranslations were corrected.

AI Tool 2

- **Tool name:** Claude Sonnet 5, Anthropic
- **Access** time: June 7, 2026 to July 12, 2026
- **Prompt:** "Refactor this Project Plan section by section."
- **Purpose:** To restructure and rewrite the Project Plan into clear, professional report language, and to draft the Team Structure and Risk Management content.
- **Content generated by AI:** Well-structure project plan document based on content student prepared.
- **Student's work and validation:** All AI-generated content was reviewed against TeamContract.md and ProjectProposal.md for accuracy, and edited to ensure it reflects the team's actual roles, decisions, and risk assessment.