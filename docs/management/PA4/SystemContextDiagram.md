# Software Architecture: System Context Diagram

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA4-2026

Performed by: Trần Lê Hoàng Gia | Reviewed by: All Members | Edited by: Trần Lê Hoàng Gia

## Table of Contents

- [Software Architecture: System Context Diagram](#software-architecture-system-context-diagram)
  - [Table of Contents](#table-of-contents)
  - [1. Technology Stack](#1-technology-stack)
  - [2. C4 Model — Level 1: System Context Diagram](#2-c4-model--level-1-system-context-diagram)
  - [3. AI Usage Notes](#3-ai-usage-notes)

---

## 1. Technology Stack

The platform covers all core workflows spanning PA1 through PA4, including catalog search, book circulation, study room reservation, study groups, real-time notifications, and AI recommendation pipelines.

| Layer / Component | Technologies & Libraries | Purpose & Coverage |
| :--- | :--- | :--- |
| **Frontend UI** | Next.js 16 (App Router / RSC), React 19, TypeScript, Tailwind CSS 4 | Renders dynamic interfaces, executes client workflows, and delivers server-rendered pages for readers, librarians, and admins. |
| **Backend API Server** | Node.js, Express 5, Socket.IO 4.8, Passport.js, JWT, `node-cron` | Hosts RESTful endpoints, handles access control, runs scheduled jobs (e.g., PIN expiration), and pushes real-time events. |
| **Recommendation Engine** | Python 3, LightGBM, GraphSAGE, pandas, scikit-learn | Implements graph link prediction and candidate re-ranking for personalized book recommendations over TCP/JSON lines. |
| **Primary Database** | PostgreSQL 15, `pgvector`, `pg_trgm`, `intarray` | Stores relational catalog, circulation, room bookings, user accounts, and vector search embeddings. |
| **Knowledge Graph DB** | Memgraph MAGE (Bolt Protocol / Cypher) | Stores user-book interaction graphs to run real-time link-prediction algorithms. |
| **Authentication & Email** | Google OAuth 2.0, Nodemailer (Gmail SMTP) | Provides Single Sign-On (SSO) and handles transactional emails (OTPs, password recovery, group invites). |
| **Media & CDN** | Cloudinary API, External CDNs (Open Library) | Manages image uploads, profile avatars, and book cover asset delivery. |
| **AI / Machine Learning** | Hugging Face Transformers (`@huggingface/transformers`) | Supplies local NLP transformer models for generating catalog search embeddings. |

---

## 2. C4 Model — Level 1: System Context Diagram


```mermaid
flowchart LR
    %% Actors
    Visitor["<b><center> fa:fa-user Visitor</b></center><br/><center>[Person]</center><br/><i>Browses public library catalog and content.</i>"]
    Readers["<b><center> fa:fa-user Reader (Patron)</b></center><br/><center>[Person]</center><br/><i>Searches catalog, reserves books online, and books study rooms.</i>"]
    Librarian["<b><center>fa:fa-user Librarian</center></b><br><center>[Person]</center><br><i>Verifies reservation PINs, processes checkouts/returns, and manages inventory.</i>"]
    SysAdmin["<b><center> fa:fa-user System Admin</center></b><br/><center>[Person]</center><br/><i>Manages user accounts, assigns roles, and monitors system analytics.</i>"]

    %% Core System
    CoreSystem["<b><center> fa:fa-server Modern Library Management System </center></b><br/><center>[Core Software System]</center><br/><i>Central web portal for book reservations, study room booking, recommendations, and library operations.</i>"]

    %% External Systems
    GoogleOAuth["<b><center> fa:fa-id-card Google Identity</center></b><br><center>[External Software System]</center><br><i>OAuth 2.0 identity provider for user authentication.</i>"]
    GmailSMTP["<b><center> fa:fa-envelope Gmail SMTP</center></b><br><center>[External Software System]</center><br><i>Delivers account verification, OTP, and notification emails.</i>"]
    Cloudinary["<b><center> fa:fa-images Cloudinary Service</b> </center><br><center>[External Software System]</center><br><i>Stores and serves user avatars and book covers.</i>"]
    HuggingFace["<b><center> fa:fa-brain Hugging Face Hub</b> </center><br><center>[External Software System]</center><br><i>Supplies NLP/Vector transformer model weights.</i>"]
    ExternalImages["<b><center> fa:fa-image External Image Hosts</b> </center><br><center>[External Software System]</center><br><i>Serves Open Library cover images and remote avatars.</i>"]

    %% Relationships
    Visitor -->|"Browses public catalog & schedule [HTTPS]"| CoreSystem
    Readers -->|"Reserves resources, joins groups & manages account [HTTPS]"| CoreSystem
    Librarian -->|"Processes checkouts, verifies PINs & updates stock [HTTPS]"| CoreSystem
    SysAdmin -->|"Configures policy, manages permissions & views metrics [HTTPS]"| CoreSystem

    CoreSystem -.->|"Authenticates users via [OAuth 2.0 / HTTPS]"| GoogleOAuth
    CoreSystem -.->|"Sends emails [SMTP / TLS]"| GmailSMTP
    CoreSystem -.->|"Stores & retrieves media assets [HTTPS]"| Cloudinary
    CoreSystem -.->|"Downloads model weights when uncached [HTTPS]"| HuggingFace
    CoreSystem -.->|"Fetches remote covers and avatar images [HTTPS]"| ExternalImages

    %% Styling
    classDef person fill:#08427b,stroke:#052e56,color:#fff;
    classDef coreSystem fill:#1168bd,stroke:#0b4884,color:#fff;
    classDef extSystem fill:#666666,stroke:#333333,color:#fff,stroke-dasharray:5 5;

    class Visitor,Readers,SysAdmin,Librarian person;
    class CoreSystem coreSystem;
    class GoogleOAuth,GmailSMTP,Cloudinary,HuggingFace,ExternalImages extSystem;
```




## 3. AI Usage Notes

This document was drafted with the assistance of an AI tool, declared as follows:

- **Tool name**: Gemini (Google)

- **Access time**: August 3, 2026

- **Prompt**: “Assure the consistency of C4 system context diagram with Vision Document, and deeper level C4 diagram. Provide the description and explaination of the diagram components.”

- **Purpose**: Synthesize and format the C4 Level 1 System Context diagram and entity descriptions to integrate the main architectural document.

- **Content generated by AI**: C4 Level 1 System Context Mermaid diagram, person descriptions, external system table, and main flow prose.

- **Student's work and validation**: The student audited actor/persona consistency across Level 1 and Level 2, verified external dependencies (Google Identity, Gmail SMTP, Cloudinary, Hugging Face Hub, and External Image Hosts), and verified diagram alignment against the codebase and database schema.