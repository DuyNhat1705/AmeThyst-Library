# Vision Document
    Project: Modern Library Management System 
    Course: CS300 – CSC13002 – Introduction to Software Engineering 
    Group ID: 03
    Group Name: AmeThyst 
    Assignment: PA2-2026
    Version: 1.4

Performed by: Nguyễn Lê Hoàng Khải, Nguyễn Nhựt Huy | Reviewed by: All Members | Edited by: Nguyễn Lê Hoàng Khải, Nguyễn Nhựt Huy

## Revision History
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 04/07/2026 | 1.0 | Drafted initial sections: Introduction, Positioning, Stakeholder and User Descriptions, Non-Functional Requirements | Nguyễn Lê Hoàng Khải |
| 04/07/2026 | 1.1 | Drafted initial sections: Product Overview, Product Features | Nguyễn Nhựt Huy |
| 06/07/2026 | 1.2 | Added detailed Product Features descriptions (Sections 5.1–5.9) — Authentication, Profile Management, Borrow & Reserving, Searching, Librarian Admin, Admin Admin, AI Recommendations, Study Groups, User Assistance; added Key Workflows section (5.10) with Book Reservation and Pickup Workflow (PIN Verification) Mermaid flowchart; expanded Table of Contents for Section 5; added AI Usage entry for Draw.io-to-Mermaid conversion | Nguyễn Nhựt Huy |
| 09/07/2026 | 1.3 | Fixed heading level for §5.10, removed inconsistent separators and trailing periods in section headers, fixed grammar and broken text in §4.2.2 and §7, updated Memory/Storage Constraints with 7-day LocalStorage session persistence | Nguyễn Nhựt Huy |
| 10/07/2026 | 1.4 | Added Start/End boundary markers to both workflow diagrams; wrapped Mermaid diagrams in overflow-x auto container to prevent page-stretching | Nguyễn Nhựt Huy |

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
    - [3.2 User Summary](#32-user-summary)
      - [User Class 1: Readers (Library Patrons)](#user-class-1-readers-library-patrons)
      - [User Class 2: Librarians](#user-class-2-librarians)
      - [User Class 3: System Administrators (Admin)](#user-class-3-system-administrators-admin)
    - [3.3 User Environment](#33-user-environment)
    - [3.4 Summary of Key Stakeholder or User Needs](#34-summary-of-key-stakeholder-or-user-needs)
    - [3.5 Alternatives and Competition](#35-alternatives-and-competition)
  - [4. Product Overview](#4-product-overview)
    - [4.1 Product Perspective](#41-product-perspective)
    - [4.2 Assumptions and Dependencies](#42-assumptions-and-dependencies)
      - [4.2.1 Assumptions](#421-assumptions)
      - [4.2.2 Dependencies](#422-dependencies)
  - [5. Product Features](#5-product-features)
    - [5.1. Authentication](#51-authentication)
    - [5.2. Profile Management](#52-profile-management)
    - [5.3. Borrow \& Reserving Feature](#53-borrow--reserving-feature)
    - [5.4. Searching Feature](#54-searching-feature)
    - [5.5. Librarian Administration](#55-librarian-administration)
    - [5.6. System Administration](#56-system-administration)
    - [5.7. AI Recommendations](#57-ai-recommendations)
    - [5.8. Study Groups](#58-study-groups)
    - [5.9. User Assistance](#59-user-assistance)
    - [5.10. Key Workflows](#510-key-workflows)
      - [5.10.1. Book Reservation and Pickup Workflow (PIN Verification)](#5101-book-reservation-and-pickup-workflow-pin-verification)
      - [5.10.2. Room Booking and Study Group Workflow](#5102-room-booking-and-study-group-workflow)
  - [6. Non-Functional Requirements](#6-non-functional-requirements)
    - [6.1 Applicable Standards](#61-applicable-standards)
    - [6.2 Hardware and Platform Requirements](#62-hardware-and-platform-requirements)
    - [6.3 Performance Requirements](#63-performance-requirements)
    - [6.4 Environmental Requirements](#64-environmental-requirements)
    - [6.5 Quality Ranges](#65-quality-ranges)
    - [6.6 Design Constraints](#66-design-constraints)
    - [6.7 External Constraints and Dependencies](#67-external-constraints-and-dependencies)
    - [6.8 Documentation Requirements](#68-documentation-requirements)
    - [6.9 Priority of Non-Functional Requirements](#69-priority-of-non-functional-requirements)
  - [7. AI Usage Notes](#7-ai-usage-notes)
    - [AI Tool 1](#ai-tool-1)
    - [AI Tool 2](#ai-tool-2)
    - [AI Tool 3](#ai-tool-3)
    - [AI Tool 4](#ai-tool-4)
    - [AI Tool 5](#ai-tool-5)

## 1. Introduction

The purpose of this document is to collect, analyze, and define the high-level needs and features of the Modern Library Management System. It focuses on the capabilities required by stakeholders and target users, and on **why** these needs exist, rather than on how the system fulfills them; the corresponding solution details will be captured in later Use-Case and Supplementary Specification artifacts produced in subsequent Project Assignments (PA3–PA5).

The Modern Library Management System is a web-based platform designed for anyone who wishes to use the library's book-borrowing and study-room-reservation services, as well as for the librarians and administrators who operate it. It bridges the convenience of online services with the reliability of traditional, in-person library operations by allowing users to search for and reserve physical books online, then quickly pick them up or return them in person. Beyond book circulation, the system also manages physical study spaces through a real-time room booking feature that supports both individual and group study sessions, and it integrates an AI-powered recommendation engine that suggests books tailored to each user's reading history.

This Vision Document is intended for all project stakeholders, including the team members of Group 03 (AmeThyst) and the course instructor and teaching assistants of CSC13002 – Introduction to Software Engineering. It also, indirectly, represents the interests of the system's prospective end users — not limited to university students, but anyone wishing to use the library's book-borrowing and study-room-reservation services, including librarians and administrators who operate the system day to day. It provides the shared understanding of project intent that will guide the design and prioritization decisions made throughout the remaining sprints.

### 1.1 References

| Document | Version | Date | Author(s) |
| :--- | :--- | :--- | :--- |
| Project Proposal.md | 1.0 | PA1 (23 May – 6 Jun 2026) | Nguyễn Lê Hoàng Khải |
| AppSurvey.md | 1.0 | PA1 (23 May – 6 Jun 2026) | Trần Lê Hoàng Gia, Phan Lê Anh Minh |
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

### 3.4 Summary of Key Stakeholder or User Needs

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
  * **Database Storage:** The PostgreSQL instance stores all persistent data—approximately 15,000 bibliographic records, user accounts, transaction logs, and study room availability schedules. At this scale, the database footprint remains modest (estimated under 500 MB) and fits comfortably within local Docker volumes or any standard cloud free-tier allocation.
  * **Media Storage:** User avatar images are offloaded to Cloudinary, so the application server itself does not store or serve binary media files. No local disk space is required for uploaded assets.
  * **Client-Side Storage:** The web application stores authenticated user session information (e.g., access tokens, user profile data) in the browser's LocalStorage with a 7-day expiration, allowing users to remain logged in across visits without re-entering credentials. Additionally, LocalStorage is used for non-critical user preferences such as theme mode. No local database or significant client-side caching is required on the client device.
  * **Container Overhead:** The Dockerized deployment (PostgreSQL container plus application containers) requires approximately 1–2 GB of disk space for images, volumes, and runtime layers, which is within the capacity of any modern development workstation or low-cost cloud VM.

### 4.2 Assumptions and Dependencies

#### 4.2.1 Assumptions
* **User Capability & Connectivity:** It is assumed that end-users possess basic computer literacy, have access to a modern web browser, and maintain a continuous, stable internet connection to access the system’s cloud-hosted services.
* **Independent Data Management:** It is assumed that the development team is solely responsible for generating, managing, and initializing all necessary mock data, configuration setups, and system assets without relying on external stakeholders.

#### 4.2.2 Dependencies
* **Standard Web Environment:** The proper rendering and execution of the system depend entirely on the compatibility and compliance of the client's web browsers with modern web standards.
* **Third-Party Service Resilience:** The system integrates several external services—including Google OAuth for authentication, and Cloudinary for avatar storage. Should any of these services become unavailable, the core web application remains operational; only the specific features that depend on the unavailable service are disabled.

## 5. Product Features

### 5.1. Authentication
The Authentication module handles secure user registration, login, and password recovery, supporting both traditional email/password credentials and quick integration via Google OAuth. This feature is critical to ensure that only verified accounts and authorized personnel can access the library’s digital resources and physical facilities. It protects sensitive user accounts from unauthorized access while streamlined OAuth login options minimize friction during entry. Both standard library members and system administrators benefit from this secure, reliable gatekeeping system.

### 5.2. Profile Management
Profile Management serves as a personalized dashboard where users can view their active borrowed books, transaction history, and upcoming room reservations. It also allows individuals to update personal details and change passwords. This feature is necessary because it centralizes self-service operations, giving users clear visibility over their obligations and reducing manual inquiries at the front desk. Library members directly benefit from this high level of transparency, allowing them to manage their library activities independently.

### 5.3. Borrow & Reserving Feature
This core module enables users to reserve physical books and book available study rooms for specific time slots in real-time. To streamline the physical pickup process and eliminate tedious paperwork, the system generates a unique 6-digit PIN code upon online reservation, which librarians can quickly verify at the counter. This feature addresses the traditional long queues and scheduling conflicts, making resource allocation much faster and more transparent. Both students looking for efficient access to materials/spaces and librarians processing daily physical checkouts benefit significantly from this automation.

### 5.4. Searching Feature
The Searching Feature is a powerful search engine that goes beyond traditional keyword matching by integrating AI-powered semantic search alongside standard filters like title, author, and category. Users can find specific reference materials simply by typing in obscure plot descriptions, themes, or character archetypes (e.g., "a boy who discovers he is a wizard"). This advanced capability is essential for academic research where exact titles are often forgotten, saving students immense time during their literature review. Students and researchers are the primary beneficiaries, as they can discover relevant academic texts instantly and intuitively.

### 5.5. Librarian Administration
Librarian Administration empowers library staff to efficiently oversee daily physical operations, including managing book inventories, posting announcements, and tracking active borrows. It bridges the gap between online requests and physical book assets by providing librarians with tools to block users with unpaid overdue fines or manage depleted book copies. This administrative suite ensures high data integrity and reliability, as human staff can safely supervise a massive backend database. Librarians benefit from reduced manual workflows, while the entire student body enjoys a well-maintained, up-to-date library catalog.

### 5.6. System Administration
System Administration provides high-level system administrators with a comprehensive dashboard containing visual charts on system usage, popular book trends, and peak study room hours. It also grants full control over user roles, enabling administrators to assign or revoke librarian privileges and suspend non-compliant accounts. This data-driven module is required for continuous system maintenance, security oversight, and strategic resource allocation. System administrators and university executives benefit most, as it provides the actionable insights needed to optimize overall library operations.

### 5.7. AI Recommendations
Leveraging machine learning models, the AI Recommendations feature automatically suggests at least three similar books on any book detail page based on genres, tags, and user preferences. It adapts gracefully by displaying trending materials for new users with no history and smartly excludes books that the user has already borrowed. This feature enhances academic discovery, helping students stumble upon unexpected but highly relevant educational resources they might not have actively searched for. Students benefit from a highly personalized, Netflix-like browsing experience tailored specifically to their academic tastes.

### 5.8. Study Groups
The Study Groups module fosters a highly collaborative learning environment by allowing users to create study sessions, post requirements, and find matching study companions. Group creators can seamlessly manage member applications, coordinate physical study room bookings, and automatically notify participants if any schedule changes occur. This feature is necessary to bridge social gaps within the university, helping students connect based on shared academic topics or difficult courses. Students benefit immensely from this community-driven feature, making collaborative exam prep and group projects much easier to organize.

### 5.9. User Assistance
User Assistance enhances student satisfaction by offering a self-paced onboarding tour, dynamic library floor maps with zone details, and accessible user guides. The interactive map responds smoothly to zoom/drag gestures, allowing students to check seat availability and resource locations before their arrival. This is essential for new students or visitors navigating a large physical library campus, effectively reducing confusion and anxiety. New and existing students benefit from this seamless physical-to-digital guidance, making every visit to the library stress-free.

### 5.10. Key Workflows

Here are the two most critical workflows within the Library Management System, illustrating how digital actions trigger physical interactions.

#### 5.10.1. Book Reservation and Pickup Workflow (PIN Verification)
This workflow demonstrates how a user reserves a book online and claims it at the physical counter using a secure 6-digit PIN.

<div style="max-width: 80%; overflow-x: auto; margin: 0 auto;">

```mermaid
flowchart TB
    S(["Start"])
 subgraph Reservation["1. Book Reservation"]
        B{"Is the book available?"}
        A(["User requests to borrow a book"])
        B1@{ label: "Show 'Out of Stock' message" }
        C["System holds the book & updates calendar"]
        D{"Does User collect it on time?"}
        D1(["Reservation expires"])
        Collect["Proceed to collection"]
  end
 subgraph Collection["2. Book Collection"]
        G{"Is the PIN valid?"}
        F["User generates a pickup PIN"]
        G1(["PIN expires / Show error"])
        H["Librarian verifies details & hands over the book"]
  end
 subgraph Management["3. During the Borrowing"]
        I{"User wants to renew?"}
        J{"Renewal limit reached?"}
        J1["Show 'Limit Reached' message"]
        J2["Extend due date"]
        K["Proceed to return book"]
  end
 subgraph Return["4. Book Return"]
        L["User returns the book"]
        M{"What is the book status?"}
        N1(["Mark as returned successfully"])
        N2(["Charge late fee"])
        N3(["Charge partial compensation fee"])
        N4(["Charge full replacement fee"])
  end
    End(["End"])
    S --> A
    A --> B
    B -- No --> B1
    B -- Yes --> C
    C --> D
    D -- No --> D1
    D -- Yes --> Collect
    F --> G
    G -- No --> G1
    G -- Yes --> H
    H --> I
    I -- Yes --> J
    J -- Yes --> J1
    J -- No --> J2
    I -- No --> K
    J1 --> K
    J2 --> K
    K --> L
    L --> M
    M -- On Time & Perfect --> N1
    M -- Overdue --> N2
    M -- Damaged --> N3
    M -- Lost --> N4
    Collect -.-> F
    B1 --> End
    D1 --> End
    G1 --> End
    N1 --> End
    N2 --> End
    N3 --> End
    N4 --> End

    B1@{ shape: stadium}
 ```

</div>

#### 5.10.2. Room Booking and Study Group Workflow
This workflow illustrates how a user books a study room — either individually or by creating a study group — and checks in using a PIN at the physical room.

<div style="max-width: 100%; overflow-x: auto;">

```mermaid
graph TD
    %% Nodes definition
    S(["Start"])
    ChooseMode{Choose Booking Mode}

    subgraph Individual_Flow [Individual Booking Flow]
        FreeBook[Individual Booking]
        SelectDateTime[Select Date & Available Time Slot]
        SubmitBooking[Submit Booking Info]
        BookSuccess[Booking Successful]
    end

    subgraph Group_Creation_Flow [Study Group Creation Flow]
        GroupBook[Study Group Booking]
        InputGroupInfo[Input Study Group Info]
        CheckInfo{Is Info Valid?}
        LogError([Print Error Message])
        GroupSuccess[Study Group Created Successfully]
    end

    subgraph Group_Management_Flow [Study Group Interaction & Management]
        RoleSplit{Role in Study Group}
        Creator[Creator]
        OtherUser[Other User]
        EditGroup[Edit Group Info]
        SendInvite[Send Invitation to Others]
        SendRequest[Send Request to Join]
        ApproveCheck{Is Approved?}
        NotifySender([Notify Sender of Rejection])
        AddToGroup[Add Member to Group]
        PostJoinEvent{Any Post-Join Events?}
        RemoveMember[Member Removed by Creator]
        LeaveGroup[Member Leaves Voluntarily]
        HandleGroupEvent([Appropriate Handling Steps])
    end

    subgraph Checkin_And_Exceptions [Check-in & Exceptions Handling]
        CheckinEvent{Any Pre-Checkin Events?}
        ArriveCheckin[Arrive for Check-in & Generate PIN]
        PinCheck{Is PIN Valid?}
        PinError([Print PIN Error])
        CheckinSuccess([Confirm Room Check-in Successful])
        
        RoomIssue[Room Issue / Booking Cancelled]
        TimeoutIssue[Timeout: No Check-in past End Time]
        CancelGroup[Cancel Study Group]
        HandleIssue([Appropriate Handling Steps])
    end

    End(["End"])

    %% Main Flow Connections
    S --> ChooseMode
    ChooseMode -->|Individual| FreeBook
    ChooseMode -->|Study Group| GroupBook
    
    %% Connections inside Individual Flow
    FreeBook --> SelectDateTime
    SelectDateTime --> SubmitBooking
    SubmitBooking --> BookSuccess
    
    %% Connections inside Group Creation Flow
    GroupBook --> SelectDateTime
    GroupBook --> InputGroupInfo
    InputGroupInfo --> CheckInfo
    CheckInfo -->|No| LogError
    CheckInfo -->|Yes| SubmitBooking
    SubmitBooking --> GroupSuccess
    
    %% Inter-subgraph Connections: Group Success to Management
    GroupSuccess --> RoleSplit
    RoleSplit -->|Creator| Creator
    RoleSplit -->|Other User| OtherUser
    
    Creator --> EditGroup
    Creator --> SendInvite
    OtherUser --> SendRequest
    
    SendInvite --> ApproveCheck
    SendRequest --> ApproveCheck
    ApproveCheck -->|No| NotifySender
    ApproveCheck -->|Yes| AddToGroup
    
    AddToGroup --> PostJoinEvent
    PostJoinEvent -->|Yes| RemoveMember
    PostJoinEvent -->|Yes| LeaveGroup
    RemoveMember --> HandleGroupEvent
    LeaveGroup --> HandleGroupEvent

    %% Inter-subgraph Connections: To Check-in & Exceptions
    BookSuccess --> CheckinEvent
    GroupSuccess --> CheckinEvent
    
    CheckinEvent -->|No| ArriveCheckin
    ArriveCheckin --> PinCheck
    PinCheck -->|No| PinError
    PinCheck -->|Yes| CheckinSuccess
    
    CheckinEvent -->|Yes| RoomIssue
    CheckinEvent -->|Yes| TimeoutIssue
    CheckinEvent -->|Yes| CancelGroup
    
    RoomIssue --> HandleIssue
    TimeoutIssue --> HandleIssue
    CancelGroup --> RoomIssue

    %% Terminal connections
    LogError --> End
    NotifySender --> End
    HandleGroupEvent --> End
    PinError --> End
    CheckinSuccess --> End
    HandleIssue --> End
 ```

</div>

## 6. Non-Functional Requirements

### 6.1 Applicable Standards

- REST API design will follow conventional HTTP method/status-code semantics for consistency between the Next.js front end and Express.js back end.
- No formal industry data-exchange standard (e.g., MARC/MARC21 for library records) is adopted; the team will use its own PostgreSQL schema, as no interoperability with external library systems is required for this project.
- Internationalization (i18n) is a mandated internal standard: the interface must fully support both English and Vietnamese, with all user-facing text sourced from centralized dictionaries (`en.json`/`vi.json`) rather than hardcoded strings.

### 6.2 Hardware and Platform Requirements

- The system shall run as a responsive web application accessible from major desktop and mobile browsers (Chrome, Safari, Edge).
- The system shall be accessible across all major operating systems (Windows, macOS, Linux, iOS, Android) without requiring local installation.
- The back end, database, and any AI/embedding services shall run on a standard cloud platform-as-a-service tier (e.g., Render, Railway, or a comparable free/low-cost tier), sized for course-project-scale traffic rather than production-scale library usage.
- Client devices require only a modern browser and standard internet connectivity; no special hardware (e.g., barcode scanners) is required for the patron-facing web app, unlike the desk-side barcode workflows seen in the Application Survey.
- In development, the front end runs on port `3000` and the back end on port `5000`; the frontend-backend connection is configured via environment variables (`NEXT_PUBLIC_API_URL` on the client, `PORT` on the server) rather than hardcoded values.

### 6.3 Performance Requirements

- Catalog and semantic search queries shall return results within an average of 2–3 seconds under normal load.
- PIN-based book pickup/return verification shall be confirmed by the system within a few seconds of PIN entry, so that a single circulation transaction at the desk stays short.
- The system shall support at least 50 concurrent users performing search and reservation actions without noticeable degradation, an estimate appropriate for course demo and grading purposes rather than full-scale institutional deployment.
- The study-room booking grid shall reflect newly confirmed reservations for other users within a few seconds, so concurrent users see up-to-date availability.
- All standard read-only page views that fetch data from the backend (e.g., book details, study group info, study room details) shall load and render within 1–2 seconds under normal load, excluding the more complex semantic search and AI recommendation flows which are covered separately.

### 6.4 Environmental Requirements

- Patrons are expected to access the system primarily from personal laptops or mobile phones, both on and off the library premises.
- Librarians and admins are expected to use the system at fixed front-desk or office workstations inside the library building.
- A stable broadband or Wi-Fi/mobile-data connection is assumed for all users; no offline mode is planned, since both reservation and PIN verification require real-time server communication.
- The system is deployed to a single cloud region appropriate for the team's target demo audience (Vietnam/Southeast Asia), rather than a globally distributed, multi-region deployment.

### 6.5 Quality Ranges

| Quality Attribute | Requirement | Priority |
| :--- | :--- | :--- |
| Usability | A first-time user shall be able to complete a book reservation without external help, after viewing the in-app usage guidelines provided in the User Assistance feature. | High |
| Usability | Librarian and Admin staff shall be able to use all system functions after four hours of training. After this training, the average number of errors made by experienced staff shall not exceed two per hour of system use. | Medium |
| Reliability | Study-room and book reservation data shall remain consistent under concurrent bookings — the system must prevent two users from being confirmed for the same room/time slot or the same physical copy. | High |
| Reliability | Core services (authentication, book search, reservation) shall be available during the project's demo/grading windows, with unplanned downtime minimized. | Medium |
| Security | User passwords and personal profile data must be stored securely (e.g., hashed passwords); only users with a registered account (via direct registration or Google OAuth) may access borrowing and reservation features. | High |
| Robustness | If the database or AI recommendation/search service becomes temporarily unavailable, the system shall degrade gracefully — e.g., falling back to basic keyword search or hiding the recommendation panel — rather than crashing or blocking core borrowing/reservation flows. | Medium |
| Fault tolerance | If a PIN verification step fails or times out during a checkout/return transaction, the system shall not mark the book or room as transferred, and shall allow the user or librarian to safely retry without creating a duplicate transaction. | Medium |
| Usability (Theme) | The interface shall support Light/Dark mode, initially resolving to the user's OS-level preference (falling back to Light mode if undetected), with the chosen theme persisted across sessions via LocalStorage. | Medium |
| Localization | All user-facing text (labels, placeholders, error messages) shall be available in both English and Vietnamese via centralized translation dictionaries; no hardcoded UI text is permitted. | High |

### 6.6 Design Constraints

- The system shall be implemented using the team's agreed technology stack — React (Next.js) for the front end, Express.js for the back end, and PostgreSQL as the primary datastore — as defined in the Project Plan.
- All source code shall follow the team's Git workflow (feature/doc branches, mandatory peer-reviewed pull requests into `dev`) and naming/coding conventions defined in the Team Contract.
- Front-end components shall follow an Atomic Design structure (Atoms → Molecules → Organisms → Templates/Pages), with global state limited to simple cases (e.g., theme, user session) handled via React Context; all backend data-fetching must explicitly handle `loading`, `error`, and `success` states.
- Back-end source code shall strictly follow a Layered Architecture, with every request passing through the chain `Route → Middleware(s) → Controller → Service → Model` and business logic kept out of routes/controllers; the backend shall be written using ES Modules (`.mjs`), per the project constitution.
- The AI-powered semantic search and recommendation features shall be built using the tools identified in the Application Survey (e.g., an embedding model such as Ollama's `nomic-embed-text` or OpenAI's `text-embedding-3-small`, paired with a vector store such as ChromaDB or Neo4j) rather than a custom-trained model, to stay feasible within the 5-sprint timeline.
- No mandated cloud vendor is fixed at this stage; hosting choice is left to whichever platform the team can operate within its budget (student/free tiers).

### 6.7 External Constraints and Dependencies

- Authentication shall support Google OAuth as an external identity provider, in addition to standard email/password registration — the system therefore depends on the availability of this third-party service.
- Any use of generative AI tools in producing code or documentation shall be disclosed per the course's AI Usage declaration policy.
- Features shall be delivered incrementally across the team's 5-sprint Scrum roadmap, with each sprint's scope tracked on the Jira board — the project timeline is therefore constrained by the course schedule.
- The backend base URL shall never be hardcoded in frontend source code; it must be loaded dynamically via environment variables, per the project constitution.

### 6.8 Documentation Requirements

- All project documentation (Vision, SRS, Project Plan, reports) shall be written and maintained in Markdown within the shared GitHub repository, per the Team Contract's documentation standards.
- In-app user guidance (usage guidelines, direct support channel, library floor plans and policies) is planned as part of the User Assistance feature; no separate printed user manual is currently planned.
- Online help is delivered as static in-app guideline pages plus a direct support/contact channel, rather than a searchable knowledge base or ticketing system with formal SLAs, given the course-project scope.
- Not applicable: installation, labeling, and packaging requirements — the system is a web application requiring no local installation or physical packaging.

### 6.9 Priority of Non-Functional Requirements

| Requirement (summary) | Priority | Stability | Benefit | Effort | Risk |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Patron self-service usability | High | High | High | Medium | Medium |
| Staff usability after training | Medium | High | Medium | Low | Low |
| Search performance (2–3s) | High | Medium | High | Medium | Medium |
| PIN verification speed | High | High | High | Low | Low |
| Reservation data consistency | High | High | High | Medium | High |
| Service availability | Medium | Medium | Medium | Medium | Medium |
| Password/account security | High | High | High | Medium | High |
| Robustness (graceful degradation) | Medium | Medium | Medium | Medium | Medium |
| Fault tolerance (safe PIN retry) | Medium | Medium | Medium | Medium | Medium |
| Cross-browser/platform support | Medium | High | Medium | Low | Low |
| Agreed tech stack (Next.js/Express/PostgreSQL) | High | High | High | Low | Low |
| Git workflow & coding conventions | Medium | High | Medium | Low | Low |
| Markdown documentation standard | Medium | High | Low | Low | Low |
| Sprint-based incremental delivery | High | High | High | Medium | Medium |
| AI usage disclosure | High | High | Low | Low | Low |
| Google OAuth support | Medium | Medium | Medium | Low | Low |
| Theme system (Light/Dark mode) | Medium | High | Medium | Medium | Low |
| Localization (English/Vietnamese) | High | High | High | Medium | Medium |
| Layered backend architecture (.mjs) | High | High | Medium | Medium | Medium |
| Env-var based API configuration | High | High | Medium | Low | Low |
| Next.js Image optimization | Medium | High | Low | Low | Low |

## 7. AI Usage Notes
This document was drafted with the assistance of an AI tool, declared as follows:

### AI Tool 1
- **Tool name:** Gemini Pro 3.1, Google
- **Access time:** June 07, 2026 to July 12, 2026
- **Prompt:** "Translate the sentence into English suitable for a formal report, without altering the original meaning."
- **Purpose:** To accurately translate ideas from Vietnamese into fluent, professional English.
- **Content generated by AI:** Initial translation of all sections in this document.
- **Student's work and validation:** All AI-translated content was manually reviewed to confirm the original ideas were preserved, and semantic errors or mistranslations were corrected.

### AI Tool 2
- **Tool name:** Claude Sonnet 5, Anthropic
- **Access time:** June 07, 2026 to July 12, 2026
- **Prompt:** "Refactor this Project Plan section by section."
- **Purpose:** To restructure and rewrite the Project Plan into clear, professional report language, and to draft the Team Structure and Risk Management content.
- **Content generated by AI:** Well-structured project plan document based on content student prepared.
- **Student's work and validation:** All AI-generated content was reviewed against TeamContract.md and ProjectProposal.md for accuracy, and edited to ensure it reflects the team's actual roles, decisions, and risk assessment.

### AI Tool 3
- **Tool name:** Gemini Flash 3.5, Google
- **Access time:** June 07, 2026 to July 12, 2026
- **Prompt:** "What should I write in this section?", "Please write this into a markdown skeleton so I can easily fill it in", "Ask me questions so I can fill in these fields accurately"
- **Purpose:** To break down the required structure for the "Stakeholder and User Descriptions" section, and to draft the content in professional English using tailored questionnaires.
- **Content generated by AI:** A comprehensive Markdown boilerplate for the Stakeholder/User sections, and finalized, professional English content for Section 3.1 (Stakeholder Summary), 3.2 (User Summary), 3.3 (User Environment), and Section 3.4 (Summary of Key Stakeholder or User Needs) with placeholders left for future competition analysis.
- **Student's work and validation:** Provided precise architectural, role-based, and feature specifications for the smart library system (Group 03 - AmeThyst, Instructor, Node.js/Express.js/React stack, PostgreSQL with Docker, reader online reservations/study groups, and librarian/admin workflows) and validated the structured translation to match the actual project implementation.

### AI Tool 4
- **Tool name:** Gemini Flash 3.5, Google
- **Access time:** June 07, 2026 to July 12, 2026
- **Prompt:** "What should I write in this section? Please suggest a markdown template in English", "Ask me questions so I can fill in the information myself"
- **Purpose:** To draft the Product Overview (Product Perspective, Assumptions and Dependencies) and to consolidate multiple overlapping sections of the User Environment into a cohesive, structured format.
- **Content generated by AI:** A standardized Markdown template and finalized English content for sections 4.1 (Product Perspective) and 4.2 (Assumptions and Dependencies), along with a unified, professionally written section 3.3 (User Environment).
- **Student's work and validation:** Provided explicit project constraints (standalone system, web browser interface, no external dependencies, and manual-to-digital transition context) and manually reviewed the generated text to ensure it aligned precisely with the system design and project scope.

### AI Tool 5
- **Tool name:** Gemini Flash 3.5 (Google)
- **Access time:** July 06, 2026
- **Prompt:** 
  - *"Is there any way to convert draw io diagram into mermaid?"*
  - *"Convert this Draw.io XML diagram into valid Mermaid.js flowchart syntax, reduce the content, the existing one is long"*
  - *"Please streamline this workflow for me by keeping only the essential steps. The content in each box should not be overly technical or jargon-heavy; instead, use simple, easy-to-understand terms and write it in English."*
- **Purpose:** To convert a raw, complex Draw.io visual layout (XML format) into a clean, concise, and professional English Mermaid.js flowchart representing the core system workflows for the AmeThyst smart library system.
- **Content generated by AI:** A streamlined, high-level Mermaid.js diagram structured into intuitive subgraphs (Book Reservation, Book Collection, Loan Management, Book Return) using simple business terms instead of technical database instructions.
- **Student's work and validation:** Provided the original, complex Draw.io XML structure containing the multi-branch user and librarian workflows; validated the AI-generated Mermaid code to ensure accuracy with the actual business logic, and integrated the syntax into the project's markdown documentation.
