# Vision Document
    Project: Modern Library Management System 
    Course: CS300 – CSC13002 – Introduction to Software Engineering 
    Group ID: 03
    Group Name: AmeThyst 
    Assignment: PA2-2026
    Version: 1.0

Performed by: Nguyễn Lê Hoàng Khải, Nguyễn Nhựt Huy | Reviewed by: All Members | Edited by: Nguyễn Lê Hoàng Khải, Nguyễn Nhựt Huy

## Revision History
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 04/07/2026 | 1.0 | Drafted initial sections: Introduction, Positioning, Stakeholder and User Descriptions, Non-Functional Requirements | Nguyễn Lê Hoàng Khải |

## Table of Contents
- [Vision Document](#vision-document)
  - [Revision History](#revision-history)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
    - [1.1 References](#11-references)
  - [2. Positioning](#2-positioning)
    - [2.1 Problem Statement](#21-problem-statement)
    - [2.2 Product Position Statement](#22-product-position-statement)
  - [3. Stakeholder and User Descriptions](#3-stakeholder-and-user-descriptions)
    - [3.1 Stakeholder Summary](#31-stakeholder-summary)
    - [3.2. User Summary](#32-user-summary)
      - [User Class 1: Readers (Library Patrons)](#user-class-1-readers-library-patrons)
      - [User Class 2: Librarians](#user-class-2-librarians)
      - [User Class 3: System Administrators (Admin)](#user-class-3-system-administrators-admin)
    - [3.3 User Environment](#33-user-environment)
    - [3.4. Summary of Key Stakeholder or User Needs](#34-summary-of-key-stakeholder-or-user-needs)
    - [3.5 Alternatives and Competition](#35-alternatives-and-competition)
  - [4. Product Overview](#4-product-overview)
    - [4.1 Product Perspective](#41-product-perspective)
    - [4.2 Assumptions and Dependencies](#42-assumptions-and-dependencies)
      - [4.2.1 Assumptions](#421-assumptions)
      - [4.2.2 Dependencies](#422-dependencies)
  - [5. Product Features](#5-product-features)
  - [6. Non-Functional Requirements](#6-non-functional-requirements)
    - [6.1 Product Requirements](#61-product-requirements)
    - [6.2 Organizational Requirements](#62-organizational-requirements)
    - [6.3 External Requirements](#63-external-requirements)
    - [6.4 Priority Notes](#64-priority-notes)
  - [7. AI Usage Notes](#7-ai-usage-notes)

## 1. Introduction

The purpose of this document is to collect, analyze, and define the high-level needs and features of the Modern Library Management System. It focuses on the capabilities required by stakeholders and target users, and on **why** these needs exist, rather than on how the system fulfills them; the corresponding solution details will be captured in later Use-Case and Supplementary Specification artifacts produced in subsequent Project Assignments (PA3–PA5).

The Modern Library Management System is a web-based platform designed for anyone who wishes to use the library's book-borrowing and study-room-reservation services, as well as for the librarians and administrators who operate it. It bridges the convenience of online services with the reliability of traditional, in-person library operations by allowing users to search for and reserve physical books online, then quickly pick them up or return them in person. Beyond book circulation, the system also manages physical study spaces through a real-time room booking feature that supports both individual and group study sessions, and it integrates an AI-powered recommendation engine that suggests books tailored to each user's reading history.

This Vision Document is intended for all project stakeholders, including the team members of Group 03 (AmeThyst) and the course instructor and teaching assistants of CSC13002 – Introduction to Software Engineering. It also, indirectly, represents the interests of the system's prospective end users — not limited to university students, but anyone wishing to use the library's book-borrowing and study-room-reservation services, including librarians and administrators who operate the system day to day. It provides the shared understanding of project intent that will guide the design and prioritization decisions made throughout the remaining sprints.

### 1.1 References

| Document | Version | Date | Author(s) |
| :--- | :--- | :--- | :--- |
| Project Proposal.md | 1.0 | PA1 (23 May – 6 Jun 2026) | Nguyễn Lê Hoàng Khải |
| Existing Application Survey (AppSurvey.md) | 1.0 | PA1 (23 May – 6 Jun 2026) | Trần Lê Hoàng Gia, Phan Lê Anh Minh |
| Team Contract.md | 1.0 | PA1 (23 May – 6 Jun 2026) | Nguyễn Nhựt Huy |
| Planning Report.md | — | PA1 (23 May – 6 Jun 2026) | Vũ Duy Nhất |
| Project Plan.md | 1.1 | PA2 (7 Jun – 12 Jul 2026) | Nguyễn Lê Hoàng Khải, Vũ Duy Nhất |

These documents are stored in the team's shared Google Drive and version-controlled alongside the source code in the project's GitHub repository.

## 2. Positioning

### 2.1 Problem Statement

| | |
| :--- | :--- |
| **The problem of** | disconnected, manual, and time-consuming library operations — students cannot check book or study-room availability before visiting, physical checkouts/returns still rely on paperwork and queues, and book discovery depends on rigid keyword search |
| **Affects** | students and other library patrons seeking reference materials, quiet study spaces, or collaborative spaces, as well as librarians and administrators who manage circulation and facility usage |
| **The impact of which is** | wasted trips to the library, long wait times at the front desk, double-booked or underused study rooms, missed opportunities to discover relevant books, and heavy manual workload for library staff |
| **A successful solution would be** | a unified web platform that lets users check availability and reserve books or rooms online in advance, complete physical checkout/return in seconds via PIN verification, discover books through AI-assisted semantic search and personalized recommendations, and give staff real-time, data-driven tools to manage inventory, bookings, and usage statistics |

### 2.2 Product Position Statement

| | |
| :--- | :--- |
| **For** | anyone who wants to borrow physical books or reserve study rooms at the library |
| **Who** | need a faster, more transparent way to check availability and complete library transactions without wasted trips or manual paperwork |
| **The Modern Library Management System** | is a web-based library and study-space management platform |
| **That** | combines real-time book and room reservation, quick PIN-based physical checkout/return, and an AI-powered recommendation and semantic search engine in a single system |
| **Unlike** | traditional library systems such as the University of Chicago Library's catalog-only portal, or purely staff-facing tools such as Papyrus Library Cloud, which handle either patron discovery or back-office circulation but rarely both well |
| **Our product** | unifies the patron-facing reservation experience with efficient staff-side circulation tools, and adds AI-driven book discovery and study-partner matching that existing library systems in our survey do not offer |

## 3. Stakeholder and User Descriptions

### 3.1 Stakeholder Summary

| Name | Description | Responsibilities |
| :--- | :--- | :--- |
| Course Instructor & Teaching Assistants (CSC13002) | Academic evaluators of the project, acting as a stand-in for a real client/sponsor in this course context | Approve project scope, assess deliverables against course rubrics, and provide feedback that shapes requirement priorities each sprint |
| Development Team — Group 03 "AmeThyst" | The five-member Scrum team responsible for designing, building, and documenting the system | Elicit and refine requirements, make architecture and technology decisions, and deliver working increments each sprint |
| Project Manager (Vũ Duy Nhất) | Team lead responsible for overall coordination | Manages timelines, assigns tasks via Jira, resolves resourcing conflicts, and makes final calls in deadlocked decisions |
| Library (hypothetical adopting organization) | The organization the system is modeled to serve, represented indirectly through the survey of real-world library systems and the team's own assumptions about library operations | Would, in a real deployment, define institutional policies (borrowing limits, fines, room-booking rules) that constrain system behavior |

### 3.2. User Summary
The system targets three primary direct user classes interacting with the web application:

#### User Class 1: Readers (Library Patrons)
*   **Who they are:** Students, researchers, or general members of the library who need to browse, reserve books, book study rooms, and interact with the library community.
*   **Technical Literacy:** Basic to Intermediate. They are familiar with standard web applications and online reservation systems, requiring an intuitive and responsive user interface.
*   **Frequency of Use:** Frequent. Patrons access the application regularly to check return deadlines, book rooms for upcoming study sessions, or join library-hosted study groups.

#### User Class 2: Librarians
*   **Who they are:** On-site library staff responsible for managing physical assets, interacting with patrons at the desk, and overseeing daily inventory.
*   **Technical Literacy:** Intermediate. Capable of operating internal management systems, verifying digital receipts, and handling data entry.
*   **Frequency of Use:** Intensive. Librarians remain logged into the system throughout their daily working shifts to process check-outs, returns, and notifications.

#### User Class 3: System Administrators (Admin)
*   **Who they are:** High-level administrators or technical staff who manage the platform's user base, security, and overall operational statistics.
*   **Technical Literacy:** Advanced. Proficient in data management, role-based access control (RBAC), and interpreting system analytics.
*   **Frequency of Use:** Occasional to Moderate. Admins access the system to audit user accounts, adjust permissions, or review high-level platform statistics and charts.

### 3.3 User Environment

The operational context, platforms, and infrastructural environment in which the various user roles interact with the system are detailed below:

* **User Base and Scalability:**
    * The system is engineered to scale effectively to support the library's entire patron base (potentially hundreds of active readers).
    * Simultaneously, it supports a smaller, concurrent pool of librarian and administrative accounts allocated per library branch.

* **Hardware & Platforms:**
    * **For Readers (Patrons):** The system is a responsive Web application accessible via standard modern mobile and desktop web browsers (e.g., Google Chrome, Safari, Microsoft Edge). Users primarily access the platform from personal laptops or mobile smartphones, both on and off campus.
    * **For Librarians and Admins:** The system is accessed via desktop computers (PCs/Laptops) at fixed front-desk reception areas or back-office workstations inside the library building, utilizing larger screens to efficiently manage dense dashboards and data grids.

* **Operational Context & Task Cycles:**
    * **Readers (Patrons):** Sessions are typically short and goal-directed (e.g., browsing the catalog, searching for materials, or reserving books/study rooms from home or while commuting). Optimized web performance is required to accommodate varying network speeds. In-person interactions are brief, focusing on quick book location lookups or checking into reserved rooms via PIN verification.
    * **Librarians and Admins:** Sessions are long and recurring throughout a work shift, involving high-frequency transaction processing (multiple actions per hour). They operate within a stable, reliable, and wired library network infrastructure, requiring instant UI feedback during physical workflows (e.g., verifying book conditions upon return or processing handovers).

* **Current Platforms & Integration Scope:**
    * **Baseline Status:** Unlike comparable institutions that rely on fragmented on-premises portals, cloud-based back-offices, or hybrid SaaS platforms (e.g., University of Chicago Library, Papyrus, Accessit), this project treats the target library as a greenfield deployment, replacing an "as-is" manual or paper-based operation.
    * **System Integration:** The system operates without legacy constraints and does not integrate with any pre-existing legacy library infrastructure.
    * **Authentication Integration:** There is no restriction to specific institutional accounts; any patron can register directly on the platform or authenticate via Google OAuth for streamlined access.

* **Cooperating Systems & Technical Infrastructure:**
    * The application is built using a modern decoupled architecture consisting of a **React** frontend and a **Node.js (Express.js)** backend. 
    * Data persistence is managed via a **PostgreSQL** database. 
    * The entire ecosystem is containerized and orchestrated using **Docker** to ensure consistency across development, testing, and production environments.

### 3.4. Summary of Key Stakeholder or User Needs

| User Class / Stakeholder | Current Pain Point | Core User Need |
| :--- | :--- | :--- |
| **User Class 1: Readers (Patrons)** | *   Wasting time commuting to the library only to find that the desired books are out of stock or study rooms are fully occupied.<br>*   Difficulty discovering new books that match their reading history and lack of an official platform to find study partners or academic groups within the library. | *   Requires a real-time online reservation system for both books and study rooms before arriving at the library.<br>*   Needs a personalized interface that suggests relevant books based on interests, along with integrated library study group features. |
| **User Class 2: Librarians** | *   Tedious manual workflows when verifying physical book handovers, updating inventory counts, and tracking book damage.<br>*   Difficulty contacting or sending urgent announcements/overdue reminders to specific students efficiently. | *   Requires an automated management dashboard to process check-outs/returns and instantly update book status.<br>*   Needs a centralized notification system to broadcast announcements or target specific users regarding borrowing deadlines. |
| **User Class 3: Admins** | *   Lack of high-level overview tools to track overall platform growth, active user metrics, and reading trends.<br>*   Managing user roles, upgrading permissions, or handling policy violations (banning users) via raw databases is inefficient and risky. | *   Requires visual analytics charts and statistics to easily monitor library platform activities.<br>*   Needs full role-based access control (RBAC) management tools to securely view, upgrade, downgrade, or ban accounts. |
| **Instructor / Client** | *   Difficult to evaluate whether the full-stack architecture can robustly handle concurrent library reservations and role management. | *   Clear, well-structured software specifications and a containerized, working prototype delivered strictly on schedule. |

### 3.5 Alternatives and Competition

Based on the team's Application Survey of three comparable systems, the following alternatives and their trade-offs were identified:

- **University of Chicago Library (on-premises, distributed catalog portal).** Strong for research-oriented patrons: supports advanced search, citation export, and room booking. Weakness: circulation still depends on a "Borrow Request → staff fulfillment" workflow rather than instant PIN-based self-service, and it offers no AI-assisted discovery or study-partner matching.
- **Papyrus Library Cloud (multi-tenant, cloud back-office system).** Strong for librarian/admin operations: fast two-scan barcode circulation, structured cataloguing and stock management, and AI-assisted OPAC search. Weakness: it is staff/administration-oriented rather than patron-facing, with no equivalent of student-friendly features like study-room social matching or personalized recommendations.
- **Accessit Library (cloud SaaS/hybrid, education-focused).** Strong for a friendly, role-adaptive patron experience: visual search for younger users, a "Quick List" for saving items, and fee management. Weakness: it targets K-12/general school libraries and lacks study-room reservation and AI semantic search entirely.
- **Status quo (manual/paper-based process).** The baseline alternative for the target library if no system is adopted: staff continue to manage checkouts, returns, and room bookings manually. This is low-cost to maintain but does not scale, is error-prone, and provides no online visibility for patrons.

None of the surveyed alternatives combines real-time book and study-room reservation, PIN-based fast physical circulation, AI-powered semantic search and recommendations, and study-partner matching in a single patron-facing system — this gap defines the market position described in Section 2.2.

## 4. Product Overview

### 4.1 Product Perspective
The system is developed as a standalone software product and does not rely on any pre-existing larger systems for its core operations. 

* **System Context:** 
  * The product is a completely standalone system.
* **Hardware Interfaces:** 
  * The software does not directly interface with specialized hardware components. It operates on standard server infrastructure for deployment and is accessed via standard user end-devices.
* **Software Interfaces:** 
  * **Client-side:** The system executes within modern, standard web browsers (e.g., Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
  * **Server-side:** The application interacts with its dedicated database management system and hosting operating system.
* **Communications Interfaces:** 
  * The system utilizes standard web communication protocols, primarily HTTP and HTTPS, for handling client-server requests and data transmissions.
* **Memory/Storage Constraints:** 
  * [To be determined / Not applicable at this stage]

---

### 4.2 Assumptions and Dependencies

#### 4.2.1 Assumptions
* **User Capability & Connectivity:** It is assumed that end-users possess basic computer literacy, have access to a modern web browser, and maintain a continuous, stable internet connection to access the system’s cloud-hosted services.
* **Independent Data Management:** It is assumed that the development team is solely responsible for generating, managing, and initializing all necessary mock data, configuration setups, and system assets without relying on external stakeholders.

#### 4.2.2 Dependencies
* **Standard Web Environment:** The proper rendering and execution of the system depend entirely on the compatibility and compliance of the client's web browsers with modern web standards (HTML5, CSS3, and ECMAScript specifications).

## 5. Product Features

## 6. Non-Functional Requirements

 
### 6.1 Product Requirements
 
| ID | Category | Requirement | Priority |
| :--- | :--- | :--- | :--- |
| NFR-01 | Usability | A first-time user shall be able to complete a book reservation without external help, after viewing the in-app usage guidelines provided in the User Assistance feature. | High |
| NFR-02 | Efficiency (Performance) | Catalog and semantic search queries shall return results within an average of 2–3 seconds under normal load. | High |
| NFR-03 | Efficiency (Performance) | PIN-based book pickup/return verification shall be confirmed by the system within a few seconds of PIN entry, so that a single circulation transaction at the desk stays short. | High |
| NFR-04 | Reliability | Study-room and book reservation data shall remain consistent under concurrent bookings — the system must prevent two users from being confirmed for the same room/time slot or the same physical copy. | High |
| NFR-05 | Reliability | Core services (authentication, book search, reservation) shall be available during the project's demo/grading windows, with unplanned downtime minimized. | Medium |
| NFR-06 | Security | User passwords and personal profile data must be stored securely (e.g., hashed passwords); only users with a registered account (via direct registration or Google OAuth) may access borrowing and reservation features. | High |
| NFR-07 | Portability | The web application shall render correctly on the latest versions of major browsers (Chrome, Safari, Edge) across desktop and mobile viewports, without requiring local installation. | Medium |
 
### 6.2 Organizational Requirements
 
| ID | Category | Requirement | Priority |
| :--- | :--- | :--- | :--- |
| NFR-08 | Development process | The system shall be implemented using the team's agreed technology stack — React (Next.js) for the front end, Express.js for the back end, and PostgreSQL as the primary datastore — as defined in the Project Plan. | High |
| NFR-09 | Development process | All source code shall follow the team's Git workflow (feature/doc branches, mandatory peer-reviewed pull requests into `dev`) and naming/coding conventions defined in the Team Contract. | Medium |
| NFR-10 | Documentation standard | All project documentation (Vision, SRS, Project Plan, reports) shall be written and maintained in Markdown within the shared GitHub repository, per the Team Contract's documentation standards. | Medium |
| NFR-11 | Delivery process | Features shall be delivered incrementally across the team's 5-sprint Scrum roadmap, with each sprint's scope tracked on the Jira board. | High |
 
### 6.3 External Requirements
 
| ID | Category | Requirement | Priority |
| :--- | :--- | :--- | :--- |
| NFR-12 | Regulatory / Ethical | Any use of generative AI tools in producing code or documentation shall be disclosed per the course's AI Usage declaration policy (see Section 7). | High |
| NFR-13 | Interoperability | Authentication shall support Google OAuth as an external identity provider, in addition to standard email/password registration. | Medium |
| NFR-14 | Legislative / Privacy | User personal data (profile information, borrowing history) shall only be used internally for account management and the AI recommendation feature, and shall not be exposed to unauthorized parties. | Medium |
 
### 6.4 Priority Notes
 
- **High-priority** items are treated as constraints the architecture must satisfy from the start (e.g., authentication security, reservation data consistency, use of the agreed tech stack), since violating them would require significant rework later.
- **Medium-priority** items are important for a polished, professional deliverable but can be refined incrementally across sprints without blocking core functionality.
- Performance and reliability targets above (NFR-02 through NFR-05) are stated as goals appropriate for a course project; they may be tightened or formally load-tested in later assignments (SRS/Supplementary Specification) once the corresponding use cases are detailed.


## 7. AI Usage Notes
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

AI Tool 3

- **Tool name:** Gemini, Google
- **Access time:** July 5, 2026
- **Prompt:** "What should I write in this section?", "Please write this into a markdown skeleton so I can easily fill it in", "Ask me questions so I can fill in these fields accurately"
- **Purpose:** To break down the required structure for the "Stakeholder and User Descriptions" section, and to draft the content in professional English using tailored questionnaires.
- **Content generated by AI:** A comprehensive Markdown boilerplate for the Stakeholder/User sections, and finalized, professional English content for Section 3.1 (Stakeholder Summary), 3.2 (User Summary), 3.3 (User Environment), and Section 3.4 (Summary of Key Stakeholder or User Needs) with placeholders left for future competition analysis.
- **Student's work and validation:** Provided precise architectural, role-based, and feature specifications for the smart library system (Group 03 - AmeThyst, Instructor, Node.js/Express.js/React stack, PostgreSQL with Docker, reader online reservations/study groups, and librarian/admin workflows) and validated the structured translation to match the actual project implementation.

- **Tool name:** Gemini, Google
- **Access time:** July 5, 2026
- **Prompt:** "What should I write in this section? Please suggest a markdown template in English", "Ask me questions so I can fill in the information myself"
- **Purpose:** To draft the Product Overview (Product Perspective, Assumptions and Dependencies) and to consolidate multiple overlapping sections of the User Environment into a cohesive, structured format.
- **Content generated by AI:** A standardized Markdown template and finalized English content for sections 4.1 (Product Perspective) and 4.2 (Assumptions and Dependencies), along with a unified, professionally written section 3.3 (User Environment).
- **Student's work and validation:** Provided explicit project constraints (standalone system, web browser interface, no external dependencies, and manual-to-digital transition context) and manually reviewed the generated text to ensure it aligned precisely with the system design and project scope.