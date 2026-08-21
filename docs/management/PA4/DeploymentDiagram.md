# Deployment Diagram

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA4-2026

Performed by: Vũ Duy Nhất | Reviewed by: All Members | Edited by: Vũ Duy Nhất

## Table of Contents

- [Deployment Diagram](#deployment-diagram)
  - [Table of Contents](#table-of-contents)
  - [1. Deployment Diagram](#1-deployment-diagram)
  - [2. Node Description](#2-node-description)
  - [3. Communication Protocol Summary](#3-communication-protocol-summary)
  - [4. Project Folder Structure of the Source Code](#4-project-folder-structure-of-the-source-code)
  - [5. AI Usage Note](#5-ai-usage-note)
    - [AI Tool 1](#ai-tool-1)
    - [AI Tool 2](#ai-tool-2)

## 1. Deployment Diagram

```mermaid
flowchart LR
    %% ACTORS
    visitor["<b>Visitor</b><br/>[Person]"]
    patron["<b>Reader / Patron</b><br/>[Person]"]
    librarian["<b>Librarian</b><br/>[Person]"]
    admin["<b>System Administrator</b><br/>[Person]"]

    %% USER DEVICE
    subgraph UserDevice["User Device — Browser"]
        browserApp["<b>Browser Web App</b><br/>[Client-side App]<br/>React 19 hydrated client<br/>Tailwind CSS v4"]
    end

    %% FRONTEND NODE
    subgraph FrontendNode["Frontend Node"]
        uiServer["<b>Next.js UI Delivery</b><br/>[Web Application]<br/>Next.js 16 / Node.js<br/>:3000"]
    end

    %% BACKEND NODE
    subgraph BackendNode["Backend Node"]
        api["<b>Backend API &amp; Realtime</b><br/>[Server-side App]<br/>Node.js / Express 5<br/>Socket.IO / node-cron<br/>:5000"]
        inference["<b>Inference Service</b><br/>[Python Process]<br/>LightGBM / pandas<br/>:5001 TCP"]
        retrain["<b>Retraining Jobs</b><br/>[Batch Python]<br/>GraphSAGE / LightGBM<br/>cron: Sun 02:00"]
    end

    %% DATABASE NODE
    subgraph DatabaseNode["Database Node (Docker: amethyst_ecosystem)"]
        postgres[("PostgreSQL<br/>[Database]<br/>pgvector:pg15<br/>:5432")]
        memgraph[("Memgraph<br/>[Graph DB]<br/>memgraph-mage<br/>:7687")]
        lab["<b>Memgraph Lab</b><br/>[Admin UI]<br/>memgraph/lab<br/>:8080"]
    end

    %% FILE STORAGE NODE
    subgraph FileNode["File Storage Node"]
        configStore[("System Configuration Store<br/>[File Data Store]<br/>server/src/config/<br/>system-configuration.json")]
        recFiles[("Recommendation File Store<br/>[File Data Store]<br/>database/Init_data/ + server/logs/<br/>artifact, status &amp; logs")]
    end

    %% EXTERNAL SERVICES
    subgraph ExternalServices["External Cloud Services"]
        google["<b>Google Identity</b><br/>[External]<br/>OAuth 2.0"]
        gmail["<b>Gmail SMTP</b><br/>[External]<br/>SMTP / TLS"]
        cloudinary["<b>Cloudinary</b><br/>[External]<br/>Media API + CDN"]
        hf["<b>Hugging Face</b><br/>[External]<br/>ONNX Model Repo"]
        imageHosts["<b>Image Hosts</b><br/>[External]<br/>HTTPS"]
    end

    %% ACTORS → BROWSER
    visitor -->|"Public UI"| browserApp
    patron -->|"Patron UI"| browserApp
    librarian -->|"Staff UI"| browserApp
    admin -->|"Admin UI"| browserApp

    %% BROWSER → SERVERS
    browserApp -->|"HTTP/HTTPS (SSR)"| uiServer
    browserApp -->|"REST + HttpOnly JWT cookies + CSRF"| api
    browserApp -->|"Socket.IO (WS)"| api
    browserApp -->|"HTTPS (CDN)"| cloudinary
    browserApp -->|"HTTPS"| imageHosts

    %% API → DATABASES
    api -->|"PostgreSQL protocol<br/>pgvector / pg_trgm"| postgres
    api -->|"Bolt/Cypher"| memgraph

    %% API → PYTHON PROCESSES
    api -->|"spawn + TCP/JSON :5001"| inference
    api -->|"spawn via node-cron"| retrain

    %% API → FILE STORES
    api -->|"Reads/writes policy<br/>Filesystem I/O"| configStore
    api -->|"Writes status &amp; logs<br/>Filesystem I/O"| recFiles

    %% API → EXTERNAL
    api -->|"HTTPS / OAuth 2.0"| google
    api -->|"SMTP/TLS"| gmail
    api -->|"HTTPS (SDK)"| cloudinary
    api -->|"HTTPS (download)"| hf
    api -->|"HTTPS (fetch)"| imageHosts

    %% INFERENCE ↔ FILE
    inference -->|"Loads ranker artifact<br/>auto-reload on change"| recFiles

    %% RETRAINING → DATABASES + FILE
    retrain -->|"psycopg2"| postgres
    retrain -->|"Bolt/Cypher"| memgraph
    retrain -->|"Writes artifact<br/>Filesystem I/O"| recFiles

    %% MEMGRAPH LAB
    lab -->|"Bolt/Cypher :7687"| memgraph

    %% STYLES
    classDef person fill:#08427b,stroke:#052e56,color:#fff;
    classDef container fill:#1168bd,stroke:#0b4884,color:#fff;
    classDef database fill:#2b78b8,stroke:#0b4884,color:#fff;
    classDef external fill:#666,stroke:#333,color:#fff,stroke-dasharray:5 5;
    classDef filestore fill:#3b6fa0,stroke:#1e4d80,color:#fff;
    classDef tool fill:#4a7fa5,stroke:#2c5f80,color:#fff;

    class visitor,patron,librarian,admin person;
    class browserApp,uiServer,api,inference,retrain container;
    class postgres,memgraph database;
    class google,gmail,cloudinary,hf,imageHosts external;
    class configStore,recFiles filestore;
    class lab tool;
```

---

## 2. Node Description

| # | Node | Hardware / Cloud Service | Containers / Components | Port(s) | Communication Protocols |
|---|------|--------------------------|-------------------------|---------|-------------------------|
| 1 | **User Device (Browser)** | End-user physical device (PC, laptop, tablet, phone) | Browser Web Application — React 19 hydrated client bundle, Tailwind CSS v4 | — (browser-side) | HTTP/HTTPS (→ Frontend, Backend), WebSocket/HTTP via Socket.IO (→ Backend), HTTPS (→ Cloudinary, External Image Hosts) |
| 2 | **Frontend Node** | Local machine (logical node) | Next.js UI Delivery — Next.js 16 / Node.js; serves SSR pages, RSC, static assets, and hydrated client bundle | **3000** | HTTP/HTTPS (← Browser) |
| 3 | **Backend Node** | Local machine (logical node) | **(a)** Backend API & Realtime Server — Node.js / Express 5 / Socket.IO / node-cron / `@huggingface/transformers` (local ONNX); **(b)** Recommendation Inference Service — Python 3 / LightGBM / pandas, TCP socket server; **(c)** Recommendation Retraining Jobs — Python 3 / GraphSAGE (Cypher MAGE) / LightGBM / psycopg2, cron-spawned batch processes | **5000** (API), **5001** (Python TCP) | HTTP/HTTPS (← Browser), PostgreSQL wire protocol (→ DB Node), Bolt/Cypher via neo4j-driver (→ DB Node), TCP/JSON Lines (API ↔ Inference, loopback), OS child process spawn (API → Retrain), HTTPS (→ External), SMTP/TLS (→ Gmail) |
| 4 | **Database Node** | Local machine — Docker Compose (`amethyst_ecosystem`) | **(a)** PostgreSQL 15 + pgvector + pg_trgm (`pgvector/pgvector:pg15`); **(b)** Memgraph MAGE (`memgraph/memgraph-mage:latest`); **(c)** Memgraph Lab (`memgraph/lab:latest`) — visual query and admin UI | **5432** (PostgreSQL), **7687** (Memgraph Bolt), **8080** (Memgraph Lab) | PostgreSQL wire protocol (← Backend API, ← Retraining Jobs), Bolt/Cypher (← Backend API, ← Retraining Jobs, ← Memgraph Lab) |
| 5 | **File Storage Node** | Local machine filesystem | **(a)** System Configuration Store (`server/src/config/system-configuration.json`) — active borrowing and penalty policy; **(b)** Recommendation File Store (`database/Init_data/`, `server/logs/`) — recommendation scripts/generated model artifact, `recommendation_retraining.log`, and `retrain_status.json` | — | Filesystem I/O (↔ Backend API reads/writes policy; ← Backend API writes recommendation status/logs; ← Retraining Jobs write artifact; ← Inference Service reads/reloads artifact) |
| 6 | **Google Identity** | Google Cloud (external) | OAuth 2.0 authorization server; integrated via `passport-google-oauth20` | — | HTTPS / OAuth 2.0 (← Backend API) |
| 7 | **Gmail SMTP** | Google Cloud (external) | SMTP relay; integrated via `nodemailer` | — | SMTP over TLS (← Backend API) |
| 8 | **Cloudinary** | Cloudinary CDN (external) | Media storage and CDN for processed avatars and book covers; integrated via `cloudinary` SDK | — | HTTPS / Cloudinary API (← Backend API upload); HTTPS CDN (← Browser load) |
| 9 | **Hugging Face Model Repository** | Hugging Face (external) | Hosts `Xenova/all-MiniLM-L6-v2` ONNX transformer weights; accessed via `@huggingface/transformers` | — | HTTPS (← Backend API on first use; weights auto-cached locally) |
| 10 | **External Image Hosts** | Third-party servers (external) | Remotely hosted book cover images and user-supplied avatar URLs | — | HTTPS (← Browser for display; ← Backend API for avatar fetch before `sharp` crop) |

---

## 3. Communication Protocol Summary

| # | Link | Source | Destination | Protocol / Mechanism |
|---|------|--------|-------------|----------------------|
| 1 | Browser → Frontend | Browser Web App | Next.js UI Delivery | HTTP / HTTPS |
| 2 | Browser → Backend (REST) | Browser Web App | Backend API & Realtime Server | HTTP / HTTPS — REST API; HttpOnly access/refresh JWT cookies; CSRF token on protected mutations |
| 3 | Browser → Backend (Realtime) | Browser Web App | Backend API & Realtime Server | WebSocket / HTTP — Socket.IO with authenticated JWT session middleware |
| 4 | Browser → Cloudinary | Browser Web App | Cloudinary CDN | HTTPS — direct CDN URL |
| 5 | Browser → Image Hosts | Browser Web App | External Image Hosts | HTTPS |
| 6 | Backend API → PostgreSQL | Backend API | PostgreSQL Data Store | PostgreSQL wire protocol (via `pg` pool) |
| 7 | Backend API → Memgraph | Backend API | Memgraph Knowledge Graph | Bolt / Cypher (via `neo4j-driver`) |
| 8 | Backend API → Inference | Backend API | Recommendation Inference Service | OS `spawn()` to start; TCP / JSON Lines on loopback port 5001 |
| 9 | Backend API → Retraining | Backend API | Recommendation Retraining Jobs | OS `spawn()` via `node-cron` (no persistent IPC) |
| 10 | Backend API ↔ System Configuration Store | Backend API | System Configuration Store | Filesystem I/O — reads at startup and atomically replaces `system-configuration.json` on an authorized update |
| 11 | Backend API → Recommendation File Store | Backend API | Recommendation File Store | Filesystem I/O (`fs.appendFileSync`, `fs.writeFileSync`) — writes retraining logs and status |
| 12 | Backend API → Google | Backend API | Google Identity | HTTPS / OAuth 2.0 (`passport-google-oauth20`) |
| 13 | Backend API → Gmail | Backend API | Gmail SMTP | SMTP over TLS (`nodemailer`) |
| 14 | Backend API → Cloudinary | Backend API | Cloudinary | HTTPS (`cloudinary` SDK upload) |
| 15 | Backend API → Hugging Face | Backend API | Hugging Face Model Repository | HTTPS (`@huggingface/transformers` — cached after first download) |
| 16 | Backend API → Image Hosts | Backend API | External Image Hosts | HTTPS (`sharp` + fetch for avatar crop) |
| 17 | Inference → Recommendation File Store | Recommendation Inference Service | Recommendation File Store | Filesystem I/O — reads the LightGBM ranker artifact and auto-reloads it on modification |
| 18 | Retraining → PostgreSQL | Recommendation Retraining Jobs | PostgreSQL Data Store | PostgreSQL wire protocol (`psycopg2`) |
| 19 | Retraining → Memgraph | Recommendation Retraining Jobs | Memgraph Knowledge Graph | Bolt / Cypher (`neo4j` Python driver) |
| 20 | Retraining → Recommendation File Store | Recommendation Retraining Jobs | Recommendation File Store | Filesystem I/O — writes the LightGBM artifact and GraphSAGE snapshot |
| 21 | Memgraph Lab → Memgraph | Memgraph Lab | Memgraph Knowledge Graph | Bolt / Cypher (port 7687, Docker internal network) |

## 4. Project Folder Structure of the Source Code

The following tree shows the source-controlled project structure that maps to the deployment nodes above. Generated dependency/build directories such as `node_modules/` and `.next/`, together with local `.env` files, are intentionally omitted.

```text
AmeThyst-Library/
├── docs/
│   └── management/PA4/             # PA4 architecture and management documents
└── src/
    ├── client/                     # Frontend Node and Browser Web Application
    │   ├── app/
    │   │   ├── components/         # Atomic Design: atoms, molecules, organisms, templates
    │   │   ├── dashboard/          # Reader, Librarian, and Administrator dashboards
    │   │   ├── library/            # Catalog and book-detail routes
    │   │   ├── study-together/     # Public study-group discovery routes
    │   │   ├── auth/               # Shared authentication UI flow
    │   │   ├── providers/          # Session, theme, and localization providers
    │   │   ├── hooks/              # Reusable client-side hooks
    │   │   ├── locales/            # English and Vietnamese dictionaries
    │   │   ├── types/              # Shared TypeScript types
    │   │   └── utils/              # API client and browser utilities
    │   ├── scripts/                # Frontend maintenance/build scripts
    │   ├── package.json
    │   └── next.config.mjs
    ├── server/                     # Backend Node
    │   ├── src/
    │   │   ├── config/             # Service config and system-configuration.json
    │   │   ├── controllers/        # HTTP request/response handlers
    │   │   ├── middlewares/        # Authentication, authorization, validation
    │   │   ├── models/             # PostgreSQL/Memgraph data access
    │   │   ├── routes/             # Express API route definitions
    │   │   ├── services/           # Core business logic and transactions
    │   │   ├── recommendation/     # Recommendation inference integration
    │   │   ├── utils/              # Shared backend utilities
    │   │   └── server.mjs          # Express/Socket.IO application entry point
    │   ├── tests/                  # Unit and API integration tests
    │   ├── logs/                   # Retraining status and runtime logs
    │   └── package.json
    ├── database/                   # Database and recommendation data infrastructure
    │   ├── init_db/
    │   │   ├── postgres/           # PostgreSQL schema and seed scripts
    │   │   └── memgraph/           # Memgraph initialization scripts
    │   ├── Init_data/              # GraphSAGE/LightGBM training and artifact scripts
    │   └── docker-compose.yml       # PostgreSQL, Memgraph, and Memgraph Lab
    ├── specs/                      # Feature specifications, plans, and contracts
    └── README.md                   # Source workspace setup and run instructions
```

### Deployment Mapping

| Source Folder | Deployment Element |
|---|---|
| `src/client/app/` | Browser Web App and Next.js UI Delivery |
| `src/server/src/` | Backend API & Realtime Server |
| `src/server/src/recommendation/` and `src/database/Init_data/` | Recommendation Inference Service and Retraining Jobs |
| `src/database/init_db/postgres/` | PostgreSQL Data Store initialization |
| `src/database/init_db/memgraph/` and `src/database/docker-compose.yml` | Memgraph and Memgraph Lab deployment |
| `src/server/src/config/system-configuration.json` | System Configuration Store |
| `src/database/Init_data/` and `src/server/logs/` | Recommendation File Store |

## 5. AI Usage Note

This document was drafted with the assistance of an AI tool, declared as follows:

### AI Tool 1

- **Tool name:** Antigravity Agent (Sonnet 4.6)
- **Access time:** August 5, 2026 15:00
- **Prompt:** *Based on the deploymentDiagramRequirent.md, draw the deployment diagram using mermaid, then create file DeploymentDiagram.md and insert into it.*
- **Purpose:** To ensure the deployment diagram follows strictly the requirements in PA4 and the structure of the Container Diagram (C4 level 2)
- **Content generated by AI:** Mermaid diagram in the file DeploymentDiagram.md
- **Student's work and validation:** The student reviewed the generated Mermaid syntax, verified that all C4 level 2 containers and node mappings strictly satisfied the criteria in `deploymentDiagramRequirent.md`, adjusted element labels for visual clarity, and validated that the container architecture accurately reflected the planned infrastructure.

### AI Tool 2

- **Tool name:** Antigravity Agent (Sonnet 4.6)
- **Access time:** August 5, 2026 15:10
- **Prompt:** *Based on source code in folder src, fix if any missing and use flowchart LR tag for the mermaid diagram*
- **Purpose:** To ensure the deployment diagram reflects correctly our current system based on source code
- **Content generated by AI:** The new Mermaid Diagram using flowchart LR is more complete and suitable for our system
- **Student's work and validation:** The student cross-referenced the generated flowchart against the active codebase in the `src` folder, verified all network protocols and container dependencies, manually corrected minor node naming discrepancies, and performed a final dry run to ensure the diagram accurately represented the live deployment layout.
