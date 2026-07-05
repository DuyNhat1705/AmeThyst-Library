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
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
    - [1.1 References](#11-references)
  - [2. Positioning](#2-positioning)
    - [2.1 Problem Statement](#21-problem-statement)
    - [2.2 Product Position Statement](#22-product-position-statement)
  - [3. Stakeholder and User Descriptions](#3-stakeholder-and-user-descriptions)
    - [3.1 Stakeholder Summary](#31-stakeholder-summary)
    - [3.2 User Summary](#32-user-summary)
    - [3.3 User Environment](#33-user-environment)
    - [3.4 Summary of Key Stakeholder or User Needs](#34-summary-of-key-stakeholder-or-user-needs)
    - [3.5 Alternatives and Competition](#35-alternatives-and-competition)
  - [4. Product Overview](#4-product-overview)
    - [4.1 Product Perspective](#41-product-perspective)
    - [4.2 Assumptions and Dependencies](#42-assumptions-and-dependencies)
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

### 3.2 User Summary

| Name | Description | Responsibilities | Stakeholder |
| :--- | :--- | :--- | :--- |
| Patron / User | Any person who wants to borrow physical books or reserve a study room at the library | Searches the catalog, reserves books and study rooms, completes PIN-based pickup/return, and forms or joins study groups | Represented directly through requirements elicitation within the team; also represented by the Course Instructor/TA as an academic stand-in for real end users |
| Librarian | Front-line staff who operate day-to-day circulation | Processes physical book pickups and returns via PIN verification, manages book inventory, monitors room reservations, and responds to user support requests | Library (hypothetical) |
| Admin | Staff or managers responsible for system-wide oversight | Monitors usage statistics and trends, manages study-room configuration, and oversees platform-wide settings and reports | Library (hypothetical) |

### 3.3 User Environment

- **Number of users:** The system is designed to scale to the library's entire patron base (potentially thousands of users), plus a small number of librarian and admin accounts per branch.
- **Task cycle:** A typical patron session is short and goal-directed — search or browse, reserve a book or room, then a separate brief in-person visit to complete pickup/return via PIN verification. Librarian and admin sessions are longer, recurring throughout a work shift (processing multiple transactions per hour).
- **Environmental constraints:** Patrons access the system primarily from personal laptops or mobile phones, both on and off campus; librarians and admins use the system at fixed front-desk or office workstations inside the library building, where a stable network connection can be assumed.
- **Current platforms in use:** Based on the Application Survey, comparable institutions currently rely on separate or partially integrated systems — an on-premises catalog portal (e.g., University of Chicago Library), a cloud-based back-office system (e.g., Papyrus Library Cloud), or a hybrid SaaS platform (e.g., Accessit Library) — none of which is assumed to already exist at the target institution; this project treats the target library as an as-is manual/paper-based operation being replaced.
- **Integration needs:** The system currently has no requirement that login be restricted to a specific institution's accounts — any patron may register directly or sign in via Google OAuth. The system is not assumed to integrate with any pre-existing legacy library system, since none is specified for this project.

### 3.4 Summary of Key Stakeholder or User Needs

| Need | Priority | Concerns | Current Solution | Proposed Solution |
| :--- | :--- | :--- | :--- | :--- |
| Check book/room availability before visiting | High | Wasted trips when a book is unavailable or a room is already booked | Manual inquiry at the front desk, or no visibility at all | Real-time online availability and reservation for both books and study rooms |
| Fast physical checkout/return | High | Long queues and manual paperwork at the circulation desk | Staff manually record loans and returns on paper or in a basic ledger | 6-digit PIN verification for quick pickup/return, eliminating manual paperwork |
| Effective book discovery | Medium | Keyword search fails when the user doesn't know exact titles/authors, or misremembers details | Traditional keyword/catalog search only | AI-powered semantic search (by plot, theme, or character) alongside traditional search |
| Fair, conflict-free room booking | Medium | Double bookings and disputes over room usage among groups | Ad-hoc, first-come sign-up sheets or verbal arrangements | Structured, real-time booking grid with instant policy checks |
| Efficient inventory & operations management | Medium | Staff spend significant time on manual record-keeping instead of patron service | Manual tracking of stock, fines, and usage | Centralized dashboard for inventory, bookings, and usage statistics for librarians/admins |
| Personalized book recommendations | Low–Medium | Users unsure what to read next; information overload in a large catalog | No recommendation mechanism, or generic "popular titles" lists | AI recommendation engine based on individual borrowing/reading history |

### 3.5 Alternatives and Competition

Based on the team's Application Survey of three comparable systems, the following alternatives and their trade-offs were identified:

- **University of Chicago Library (on-premises, distributed catalog portal).** Strong for research-oriented patrons: supports advanced search, citation export, and room booking. Weakness: circulation still depends on a "Borrow Request → staff fulfillment" workflow rather than instant PIN-based self-service, and it offers no AI-assisted discovery or study-partner matching.
- **Papyrus Library Cloud (multi-tenant, cloud back-office system).** Strong for librarian/admin operations: fast two-scan barcode circulation, structured cataloguing and stock management, and AI-assisted OPAC search. Weakness: it is staff/administration-oriented rather than patron-facing, with no equivalent of student-friendly features like study-room social matching or personalized recommendations.
- **Accessit Library (cloud SaaS/hybrid, education-focused).** Strong for a friendly, role-adaptive patron experience: visual search for younger users, a "Quick List" for saving items, and fee management. Weakness: it targets K-12/general school libraries and lacks study-room reservation and AI semantic search entirely.
- **Status quo (manual/paper-based process).** The baseline alternative for the target library if no system is adopted: staff continue to manage checkouts, returns, and room bookings manually. This is low-cost to maintain but does not scale, is error-prone, and provides no online visibility for patrons.

None of the surveyed alternatives combines real-time book and study-room reservation, PIN-based fast physical circulation, AI-powered semantic search and recommendations, and study-partner matching in a single patron-facing system — this gap defines the market position described in Section 2.2.

## 4. Product Overview

### 4.1 Product Perspective

### 4.2 Assumptions and Dependencies

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