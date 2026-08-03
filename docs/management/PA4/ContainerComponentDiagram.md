# Container and Component Diagram

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA4-2026

Performed by: Nguyễn Lê Hoàng Khải | Reviewed by: All Members | Edited by: Nguyễn Lê Hoàng Khải

## Table of Contents

- [Container and Component Diagram](#container-and-component-diagram)
  - [Table of Contents](#table-of-contents)
  - [1. C4 Model — Level 2: Container Diagram](#1-c4-model--level-2-container-diagram)
    - [1.1 Main Flow](#11-main-flow)
    - [1.2 Container Descriptions](#12-container-descriptions)
    - [1.3 External System Descriptions](#13-external-system-descriptions)
  - [2. C4 Model — Level 3: Frontend Component Diagram](#2-c4-model--level-3-frontend-component-diagram)
    - [2.1 Main Flow](#21-main-flow)
    - [2.2 Frontend Component Descriptions](#22-frontend-component-descriptions)
  - [3. C4 Model — Level 3: Backend Core Business Component Diagram](#3-c4-model--level-3-backend-core-business-component-diagram)
    - [3.1 Main Flow](#31-main-flow)
    - [3.2 Backend Core Component Descriptions](#32-backend-core-component-descriptions)
  - [4. C4 Model — Level 3: Recommendation Subsystem Component Diagram](#4-c4-model--level-3-recommendation-subsystem-component-diagram)
    - [4.1 Main Flow](#41-main-flow)
    - [4.2 Recommendation Component Descriptions](#42-recommendation-component-descriptions)
  - [5. AI Usage Notes](#5-ai-usage-notes)

## 1. C4 Model — Level 2: Container Diagram

```mermaid
flowchart LR
    visitor["<span style='font-size:18px'><b>Visitor</b></span><br/><br/>[Person]<br/>Browses public library content"]
    patron["<span style='font-size:18px'><b>Reader (Library Patron)</b></span><br/><br/>[Person]<br/>Uses account, borrowing, room, and group features"]
    librarian["<span style='font-size:18px'><b>Librarian</b></span><br/><br/>[Person]<br/>Manages catalog and library operations"]
    admin["<span style='font-size:18px'><b>System Administrator</b></span><br/><br/>[Person]<br/>Maintains system policy"]

    subgraph amethyst["Software System: Modern Library Management System (AmeThyst)"]
        direction LR

        uiServer["<span style='font-size:18px'><b>Next.js UI Delivery</b></span><br/><br/>[Container: Web Application]<br/>Next.js 16 / Node.js<br/>Serves routes, HTML/RSC, assets, and browser bundle"]
        browserApp["<span style='font-size:18px'><b>Browser Web Application</b></span><br/><br/>[Container: Client-side Web Application]<br/>React 19 / TypeScript / Tailwind CSS<br/>Renders UI and runs client workflows"]
        api["<span style='font-size:18px'><b>Backend API and Realtime Server</b></span><br/><br/>[Container: Server-side Application]<br/>Node.js / Express 5 / Socket.IO<br/>Provides APIs, access control, events, and jobs"]
        inference["<span style='font-size:18px'><b>Recommendation Inference Service</b></span><br/><br/>[Container: Server-side Application]<br/>Python / LightGBM / pandas<br/>Ranks recommendation candidates over TCP"]
        retrain["<span style='font-size:18px'><b>Recommendation Retraining Jobs</b></span><br/><br/>[Container: Batch Processes]<br/>Python / GraphSAGE / LightGBM<br/>Retrains graph and ranking models"]
        postgres[("<span style='font-size:18px'><b>PostgreSQL Data Store</b></span><br/><br/>[Container: Database]<br/>PostgreSQL 15 / pgvector / pg_trgm<br/>Stores operational, catalog, and recommendation data")]
        memgraph[("<span style='font-size:18px'><b>Memgraph Knowledge Graph</b></span><br/><br/>[Container: Graph Database]<br/>Memgraph MAGE / Bolt<br/>Stores user-book graph and link-prediction model")]
        policyStore[("<span style='font-size:18px'><b>System Configuration Store</b></span><br/><br/>[Container: File Data Store]<br/>JSON / local filesystem<br/>Persists borrowing and penalty policy")]
        recFiles[("<span style='font-size:18px'><b>Recommendation File Store</b></span><br/><br/>[Container: File Data Store]<br/>Local filesystem<br/>Stores model artifact, status, and logs")]
    end

    google["<span style='font-size:18px'><b>Google Identity</b></span><br/><br/>[External Software System]<br/>OAuth 2.0<br/>Authenticates Google accounts"]
    gmail["<span style='font-size:18px'><b>Gmail SMTP</b></span><br/><br/>[External Software System]<br/>SMTP over TLS<br/>Delivers verification, OTP, and study-group email"]
    cloudinary["<span style='font-size:18px'><b>Cloudinary</b></span><br/><br/>[External Software System]<br/>Media API/CDN<br/>Stores and serves uploaded avatars and covers"]
    hf["<span style='font-size:18px'><b>Hugging Face Model Repository</b></span><br/><br/>[External Software System]<br/>HTTPS<br/>Supplies transformer model weights"]
    imageHosts["<span style='font-size:18px'><b>External Image Hosts</b></span><br/><br/>[External Software Systems]<br/>HTTPS<br/>Serve covers and submitted images"]

    visitor -->|"Uses public UI"| browserApp
    patron -->|"Uses authenticated patron UI"| browserApp
    librarian -->|"Uses staff UI"| browserApp
    admin -->|"Uses admin UI"| browserApp
    browserApp -->|"Requests routes, HTML, and assets [HTTP/HTTPS]"| uiServer
    browserApp -->|"Calls JSON APIs with optional Bearer JWT [HTTP/HTTPS]"| api
    browserApp -->|"Subscribes to authenticated events [Socket.IO over WebSocket/HTTP]"| api
    browserApp -->|"Loads cover images [HTTPS]"| imageHosts
    browserApp -->|"Loads stored media URLs [HTTPS]"| cloudinary

    api -->|"Reads and writes relational/vector data [PostgreSQL protocol]"| postgres
    api -->|"Reads and writes graph data [Bolt/Cypher]"| memgraph
    api -->|"Starts and calls ranking process [OS child process; TCP/JSON lines]"| inference
    api -->|"Starts scheduled training processes [OS child process]"| retrain
    api -->|"Reads and writes system policy [filesystem I/O]"| policyStore
    api -->|"Writes retraining status and logs [filesystem I/O]"| recFiles
    inference -->|"Loads or reloads ranker artifact [filesystem I/O]"| recFiles
    retrain -->|"Reads interactions and writes recommendation records [PostgreSQL protocol]"| postgres
    retrain -->|"Reads and writes graph model state [Bolt/Cypher]"| memgraph
    retrain -->|"Writes LightGBM model artifact [filesystem I/O]"| recFiles

    api -->|"Calls authorization, callback, and profile APIs [HTTPS/OAuth 2.0]"| google
    api -->|"Sends transactional email [SMTP/TLS]"| gmail
    api -->|"Uploads processed media [HTTPS]"| cloudinary
    api -->|"Downloads transformer weights when not cached [HTTPS]"| hf
    api -->|"Fetches a user-supplied remote avatar before cropping [HTTPS]"| imageHosts

    subgraph keyL2["Legend"]
        keyPerson["<span style='font-size:18px'><b>Person</b></span><br/><br/>[Person]<br/>Human actor"]
        keyContainer["<span style='font-size:18px'><b>Application / Process</b></span><br/><br/>[Container]<br/>Executable runtime boundary"]
        keyData[("<span style='font-size:18px'><b>Data Store</b></span><br/><br/>[Container: Data Store]<br/>Owned persisted data")]
        keyExternal["<span style='font-size:18px'><b>External System</b></span><br/><br/>[External Software System]<br/>Outside Modern Library Management System ownership"]
    end

    classDef person fill:#08427b,stroke:#052e56,color:#fff;
    classDef container fill:#1168bd,stroke:#0b4884,color:#fff;
    classDef database fill:#2b78b8,stroke:#0b4884,color:#fff;
    classDef external fill:#666,stroke:#333,color:#fff,stroke-dasharray:5 5;
    class visitor,patron,librarian,admin,keyPerson person;
    class uiServer,browserApp,api,inference,retrain,keyContainer container;
    class postgres,memgraph,policyStore,recFiles,keyData database;
    class google,gmail,cloudinary,hf,imageHosts,keyExternal external;
```

### 1.1 Main Flow

A user loads the Browser Web Application from Next.js UI Delivery. The browser calls the Backend API for business operations and subscribes to realtime events. The backend reads and writes PostgreSQL, uses Memgraph and the Python processes for recommendations, and calls external services for identity, email, media, and model downloads.

### 1.2 Container Descriptions

| Container | Responsibility and services provided | Technology/framework | Communication |
|---|---|---|---|
| Next.js UI Delivery | Serves pages, RSC payloads, browser bundles, and static assets. | Next.js 16.2, Node.js | HTTP/HTTPS from browsers. |
| Browser Web Application | Renders the UI, keeps client auth state, calls APIs, and receives realtime events. | React 19.2, TypeScript, Tailwind CSS 4, Socket.IO client | HTTP/HTTPS to Next.js and backend; Socket.IO to backend; HTTPS to media hosts. |
| Backend API and Realtime Server | Runs APIs, access control, business workflows, realtime events, schedulers, and recommendation process control. | Node.js, Express 5.2, Socket.IO 4.8, Passport, JWT, node-cron | HTTP/HTTPS, Socket.IO, PostgreSQL, Bolt/Cypher, TCP/JSON lines, SMTP/TLS, HTTPS, filesystem, and child processes. |
| PostgreSQL Data Store | Stores accounts, catalog, circulation, rooms, groups, announcements, history, wishlist, and recommendations. | PostgreSQL 15, pgvector, pg_trgm, intarray | PostgreSQL protocol from Node and Python. |
| Memgraph Knowledge Graph | Stores user-book interactions and provides graph recommendation scores. | Memgraph MAGE | Bolt/Cypher from backend and GraphSAGE jobs. |
| Recommendation Inference Service | Ranks candidates with LightGBM or GraphSAGE-score fallback. | Python, LightGBM, pandas | Newline-delimited JSON over local TCP; reads model files. |
| Recommendation Retraining Jobs | Retrains GraphSAGE and LightGBM models. | Python, GraphSAGE, LightGBM, scikit-learn | Spawned child processes; PostgreSQL, Bolt/Cypher, and filesystem. |
| System Configuration Store | Stores borrowing limits, fees, and damage coefficients. | JSON, Node.js filesystem APIs | Read at startup; replaced atomically on update. |
| Recommendation File Store | Stores model artifacts, retraining status, and logs. | Local filesystem, JSON, LightGBM model | Written by backend/jobs and read by inference. |

### 1.3 External System Descriptions

| External system | Purpose | Integration and evidence |
|---|---|---|
| Google Identity | Google sign-in and profile data. | OAuth 2.0 through Passport and backend auth routes. |
| Gmail SMTP | Verification, OTP, invitation, and group emails. | SMTP/TLS through Nodemailer. |
| Cloudinary | Stores uploaded avatars and book covers. | HTTPS media API and CDN URLs. |
| Hugging Face Model Repository | Supplies the local search embedding model. | HTTPS through `@huggingface/transformers`; database/hash fallbacks are available. |
| External Image Hosts | Serve Open Library covers and submitted avatar images. | Browser HTTPS requests or validated backend HTTPS fetches. |

## 2. C4 Model — Level 3: Frontend Component Diagram

```mermaid
flowchart LR
    webUser["<span style='font-size:18px'><b>Reader</b></span><br/><br/>[Person]<br/>Uses reader-facing library features"]
    librarian["<span style='font-size:18px'><b>Librarian</b></span><br/><br/>[Person]<br/>Runs daily library operations"]
    backend["<span style='font-size:18px'><b>Backend API and Realtime Server</b></span><br/><br/>[Container: Server-side Application]<br/>Express 5 / Socket.IO<br/>Provides APIs and events"]
    media["<span style='font-size:18px'><b>Media Hosts</b></span><br/><br/>[External Software Systems]<br/>Cloudinary / Open Library / HTTPS<br/>Serve referenced images"]

    subgraph browser["Container: Browser Web Application — React 19 / TypeScript"]
        direction TB

        accountUI["<span style='font-size:18px'><b>Authentication and Profile</b></span><br/><br/>[Component]<br/>React pages and forms<br/>Account access, recovery, profile, and avatar"]
        catalogUI["<span style='font-size:18px'><b>Catalog and Search</b></span><br/><br/>[Component]<br/>React catalog pages<br/>Browse, search, details, history, and wishlist"]
        circulationUI["<span style='font-size:18px'><b>Reader Book Circulation</b></span><br/><br/>[Component]<br/>React dashboard components<br/>Reservations, book PINs, loans, returns, and fees"]
        roomUI["<span style='font-size:18px'><b>Study Room Reservation</b></span><br/><br/>[Component]<br/>React map and room components<br/>Room discovery, availability, reserve, and cancel"]
        groupUI["<span style='font-size:18px'><b>Study Groups</b></span><br/><br/>[Component]<br/>React pages and modals<br/>Group discovery, membership, and management"]
        recommendationUI["<span style='font-size:18px'><b>AI Recommendations</b></span><br/><br/>[Component]<br/>React recommendation components<br/>Personalized feed, renewal, and click tracking"]
        librarianUI["<span style='font-size:18px'><b>Librarian Operations</b></span><br/><br/>[Component]<br/>React staff dashboard<br/>Catalog, pickup, return, fees, and announcements"]
    end

    webUser -->|"Uses account and profile screens"| accountUI
    webUser -->|"Searches and browses books"| catalogUI
    webUser -->|"Manages reservations and loans"| circulationUI
    webUser -->|"Reserves study rooms"| roomUI
    webUser -->|"Joins and manages groups"| groupUI
    webUser -->|"Explores personalized recommendations"| recommendationUI
    librarian -->|"Runs staff workflows"| librarianUI

    catalogUI -->|"Starts book reservation"| circulationUI
    accountUI -->|"Calls authentication and profile APIs [JSON over HTTP/HTTPS]"| backend
    catalogUI -->|"Calls catalog and search APIs [JSON over HTTP/HTTPS]"| backend
    circulationUI -->|"Calls circulation and fee APIs [JSON over HTTP/HTTPS]"| backend
    roomUI -->|"Calls room APIs [JSON over HTTP/HTTPS]"| backend
    groupUI -->|"Calls study-group APIs [JSON over HTTP/HTTPS]"| backend
    recommendationUI -->|"Calls recommendation APIs [JSON over HTTP/HTTPS]"| backend
    librarianUI -->|"Calls librarian APIs [JSON over HTTP/HTTPS]"| backend
    backend ---->|"Publishes study-group events [Socket.IO over WebSocket/HTTP]"| groupUI

    accountUI -->|"Loads avatar images [HTTPS]"| media
    catalogUI ---->|"Loads book-cover images [HTTPS]"| media
    recommendationUI -->|"Loads recommended book covers [HTTPS]"| media

    subgraph keyL3F["Legend"]
        keyComponentF["<span style='font-size:18px'><b>Component</b></span><br/><br/>[Component]<br/>Cohesive code inside the browser container"]
        keyContainerF["<span style='font-size:18px'><b>Application / Process</b></span><br/><br/>[Container]<br/>Executable runtime outside the expanded container"]
        keyExternalF["<span style='font-size:18px'><b>External System</b></span><br/><br/>[External Software System]<br/>Outside system ownership"]
    end

    classDef person fill:#08427b,stroke:#052e56,color:#fff;
    classDef component fill:#85bbf0,stroke:#2f6fa6,color:#102a43;
    classDef container fill:#1168bd,stroke:#0b4884,color:#fff;
    classDef external fill:#666,stroke:#333,color:#fff,stroke-dasharray:5 5;
    class webUser,librarian person;
    class accountUI,catalogUI,circulationUI,roomUI,groupUI,recommendationUI,librarianUI,keyComponentF component;
    class backend,keyContainerF container;
    class media,keyExternalF external;
```

### 2.1 Main Flow

A reader searches the catalog and opens a book detail page. Catalog and Search calls the backend for book data, then starts the reservation workflow in Reader Book Circulation. That component calls the backend to validate the reader and inventory before showing the updated reservation on the dashboard.

### 2.2 Frontend Component Descriptions

| Component | Responsibility | Representative code/modules | Relationships |
|---|---|---|---|
| Authentication and Profile | Handles login, registration, verification, recovery, profile, password, and avatar screens. | Auth/profile pages, `LoginFormCard.tsx`, `RegisterFormCard.tsx`, `SecurityFormCard.tsx`, `AvatarUploader.tsx` | Calls `/auth` and `/user`; loads avatar media. |
| Catalog and Search | Supports browsing, filters, search, book details, history, and wishlist. | Library pages, `FilterPanel.tsx`, `SearchBar.tsx`, `BookDetailTemplate.tsx`, `WishlistHeart.tsx` | Calls catalog/search/history/wishlist APIs and starts reservation. |
| Reader Book Circulation | Shows reservations, pickup/return PINs, loans, extensions, history, and fees. | User dashboard pages, `BorrowedBookCard.tsx`, `PinModal.tsx`, `DashboardCalendar.tsx`, `FeesBreakdownPanel.tsx` | Calls circulation and fee APIs. |
| Study Room Reservation | Shows floor maps, room details, availability, reservations, and cancellation. | `map/page.tsx`, `FloorMap.tsx`, `RoomDetailPanel.tsx`, `ReservationCard.tsx`, `utils/room.ts` | Calls `/api/rooms`; room check-in PIN is not implemented. |
| Study Groups | Supports discovery, creation, membership requests, invitations, and management. | Study-group pages, `StudyGroup.tsx`, `StudyGroupInfoModal.tsx`, `AuthActions.tsx`, `utils/studyGroup.ts` | Calls `/api/study-groups` and receives Socket.IO events. |
| AI Recommendations | Shows, renews, and tracks personalized recommendations. | Recommendation page, `RecommendationCarousel.tsx`, `BookCard.tsx` | Calls recommendation and wishlist APIs; loads cover media. |
| Librarian Operations | Manages catalog, pickup, return inspection, fees, and announcements. | `BookManagementTab.tsx`, `InlinePinVerification.tsx`, `ReturnFlowPanel.tsx`, `LoanFeesPanel.tsx`, `LibrarianAnnouncementsPanel.tsx` | Calls librarian, catalog, and announcement APIs; stock transfer is partial. |

## 3. C4 Model — Level 3: Backend Core Business Component Diagram

```mermaid
flowchart LR
    browserCore["<span style='font-size:18px'><b>Browser Web Application</b></span><br/><br/>[Container: Client-side Web Application]<br/>React / TypeScript<br/>Calls APIs and receives events"]
    postgresCore[("<span style='font-size:18px'><b>PostgreSQL Data Store</b></span><br/><br/>[Container: Database]<br/>PostgreSQL / pgvector<br/>Stores core operational data")]
    policyFile[("<span style='font-size:18px'><b>System Configuration Store</b></span><br/><br/>[Container: File Data Store]<br/>JSON / local filesystem<br/>Stores live borrowing and penalty policy")]
    googleCore["<span style='font-size:18px'><b>Google Identity</b></span><br/><br/>[External Software System]<br/>OAuth 2.0<br/>Authenticates Google accounts"]
    gmailCore["<span style='font-size:18px'><b>Gmail SMTP</b></span><br/><br/>[External Software System]<br/>SMTP/TLS<br/>Delivers account and group email"]
    cloudinaryCore["<span style='font-size:18px'><b>Cloudinary</b></span><br/><br/>[External Software System]<br/>HTTPS media API<br/>Stores avatars and book covers"]
    hfCore["<span style='font-size:18px'><b>Hugging Face Model Repository</b></span><br/><br/>[External Software System]<br/>HTTPS<br/>Supplies search embedding weights"]
    imageCore["<span style='font-size:18px'><b>User-supplied Image Hosts</b></span><br/><br/>[External Software Systems]<br/>HTTPS<br/>Serve submitted avatar images"]

    subgraph backendCore["Container: Backend API and Realtime Server — Core Business View"]
        direction TB

        apiAccess["<span style='font-size:18px'><b>API and Access Control</b></span><br/><br/>[Component]<br/>Express routers and middleware<br/>Routes, validation, JWT checks, and roles"]
        identity["<span style='font-size:18px'><b>Identity and Profile</b></span><br/><br/>[Component]<br/>Node.js business modules<br/>Accounts, OAuth, OTP, profile, password, and avatar"]
        catalog["<span style='font-size:18px'><b>Catalog and Search</b></span><br/><br/>[Component]<br/>Node.js business modules<br/>Catalog, search, embeddings, history, and wishlist"]
        circulation["<span style='font-size:18px'><b>Book Circulation</b></span><br/><br/>[Component]<br/>Node.js transactional modules<br/>Reservations, book PINs, loans, returns, penalties, and fees"]
        rooms["<span style='font-size:18px'><b>Study Room Reservation</b></span><br/><br/>[Component]<br/>Node.js business modules<br/>Room details, availability, reserve, list, and cancel"]
        groups["<span style='font-size:18px'><b>Study Groups</b></span><br/><br/>[Component]<br/>Node.js transactional modules<br/>Group lifecycle, membership, requests, and invitations"]
        policy["<span style='font-size:18px'><b>System Configuration</b></span><br/><br/>[Component]<br/>Node.js / versioned memory snapshot<br/>Validates and updates live system policy"]

        apiAccess -->|"Dispatches identity and profile requests"| identity
        apiAccess -->|"Dispatches catalog and search requests"| catalog
        apiAccess -->|"Dispatches circulation requests"| circulation
        apiAccess -->|"Dispatches room requests"| rooms
        apiAccess -->|"Dispatches study-group requests"| groups
        apiAccess -->|"Dispatches configuration requests"| policy
        circulation -->|"Reads active borrowing and penalty policy"| policy
    end

    browserCore -->|"Calls mounted endpoints [JSON over HTTP/HTTPS]"| apiAccess
    apiAccess -->|"Reads current account and role [PostgreSQL protocol]"| postgresCore
    identity -->|"Reads and writes account and profile records [PostgreSQL protocol]"| postgresCore
    catalog -->|"Reads and writes catalog, history, and wishlist [PostgreSQL/pgvector]"| postgresCore
    circulation -->|"Reads and writes loan, inventory, return, and penalty records [PostgreSQL protocol]"| postgresCore
    rooms ---->|"Reads and writes room reservations [PostgreSQL protocol]"| postgresCore
    groups ------>|"Reads and writes group and room records [PostgreSQL protocol]"| postgresCore
    policy -->|"Reads and writes configuration [filesystem I/O]"| policyFile

    groups -->|"Publishes lifecycle events [Socket.IO over WebSocket/HTTP]"| browserCore
    rooms ---->|"Publishes reservation refresh events [Socket.IO over WebSocket/HTTP]"| browserCore
    identity -->|"Calls authentication and profile APIs [HTTPS/OAuth 2.0]"| googleCore
    identity -->|"Sends verification and OTP email [SMTP/TLS]"| gmailCore
    groups ---->|"Sends invitation and lifecycle email [SMTP/TLS]"| gmailCore
    identity ---->|"Writes processed avatar media [HTTPS]"| cloudinaryCore
    catalog ------>|"Writes book-cover media [HTTPS]"| cloudinaryCore
    catalog -->|"Downloads embedding weights [HTTPS]"| hfCore
    identity -->|"Reads submitted avatar images [HTTPS]"| imageCore

    subgraph keyCore["Legend"]
        keyCoreComponent["<span style='font-size:18px'><b>Component</b></span><br/><br/>[Component]<br/>Cohesive code inside the backend container"]
        keyCoreContainer["<span style='font-size:18px'><b>Application / Process</b></span><br/><br/>[Container]<br/>Runtime outside the expanded view"]
        keyCoreData[("<span style='font-size:18px'><b>Data Store</b></span><br/><br/>[Container: Data Store]<br/>Persisted data outside the expanded view")]
        keyCoreExternal["<span style='font-size:18px'><b>External System</b></span><br/><br/>[External Software System]<br/>Outside system ownership"]
    end

    keyCoreExternal ~~~ apiAccess

    classDef component fill:#85bbf0,stroke:#2f6fa6,color:#102a43;
    classDef container fill:#1168bd,stroke:#0b4884,color:#fff;
    classDef database fill:#2b78b8,stroke:#0b4884,color:#fff;
    classDef external fill:#666,stroke:#333,color:#fff,stroke-dasharray:5 5;
    class apiAccess,identity,catalog,circulation,rooms,groups,policy,keyCoreComponent component;
    class browserCore,keyCoreContainer container;
    class postgresCore,policyFile,keyCoreData database;
    class googleCore,gmailCore,cloudinaryCore,hfCore,imageCore,keyCoreExternal external;
```

### 3.1 Main Flow

The browser calls API and Access Control with a Bearer JWT. For a book reservation, the API dispatches the request to Book Circulation, which reads the active policy, checks and updates inventory in PostgreSQL, and writes the reservation. Other requests follow the same entry point and are dispatched to their matching business component.

### 3.2 Backend Core Component Descriptions

| Component | Responsibility | Representative code/modules | Relationships |
|---|---|---|---|
| API and Access Control | Routes requests, validates input and JWTs, reloads account roles, and enforces access. | `server.mjs`, `routes/*.mjs`, auth/role/validation middleware | Receives browser calls, reads account roles, and dispatches requests. |
| Identity and Profile | Handles accounts, password/Google login, verification, OTP, profiles, passwords, and avatars. | Auth/user/avatar controllers, services, models, Passport, and mail helpers | Reads/writes PostgreSQL and calls Google, Gmail, Cloudinary, and image hosts. |
| Catalog and Search | Handles catalog data, text/vector search, embeddings, history, CRUD, and wishlist. | Library/search/history/wishlist modules, `embedding.services.mjs` | Reads/writes PostgreSQL and calls Hugging Face and Cloudinary. |
| Book Circulation | Handles reservations, pickup/return PINs, loans, extensions, returns, penalties, inventory, and payments. | Library and user/librarian dashboard modules, `penalty.utils.mjs`, `pinScheduler.mjs` | Reads policy and writes circulation transactions to PostgreSQL. |
| Study Room Reservation | Provides room data and conflict-safe reservation, listing, and cancellation. | Room routes, controllers, services, and models | Reads/writes PostgreSQL and publishes reservation refresh events. |
| Study Groups | Handles group creation, room booking, membership, requests, invitations, and lifecycle actions. | Study-group routes, middleware, controllers, services, and models | Reads/writes PostgreSQL, publishes Socket.IO events, and sends Gmail messages. |
| System Configuration | Validates, versions, reads, and atomically updates live borrowing and penalty policy. | System-configuration modules and JSON document | Reads/writes the configuration store and supplies policy to circulation. |

## 4. C4 Model — Level 3: Recommendation Subsystem Component Diagram

```mermaid
flowchart TB
    browserRec["<span style='font-size:18px'><b>Browser Web Application</b></span><br/><br/>[Container: Client-side Web Application]<br/>React / TypeScript<br/>Requests and tracks recommendations"]
    postgresRec[("<span style='font-size:18px'><b>PostgreSQL Data Store</b></span><br/><br/>[Container: Database]<br/>PostgreSQL / pgvector<br/>Stores catalog, interactions, and feeds")]
    memgraphRec[("<span style='font-size:18px'><b>Memgraph Knowledge Graph</b></span><br/><br/>[Container: Graph Database]<br/>Memgraph MAGE<br/>Stores interaction graph and graph model")]
    inferenceRec["<span style='font-size:18px'><b>Recommendation Inference Service</b></span><br/><br/>[Container: Server-side Application]<br/>Python / LightGBM<br/>Ranks candidates over TCP"]
    trainingRec["<span style='font-size:18px'><b>Recommendation Retraining Jobs</b></span><br/><br/>[Container: Batch Processes]<br/>Python / GraphSAGE / LightGBM<br/>Retrain graph and ranking models"]
    recFiles[("<span style='font-size:18px'><b>Recommendation File Store</b></span><br/><br/>[Container: File Data Store]<br/>Local filesystem<br/>Stores artifact, status, and logs")]

    subgraph recommendationView["Container: Backend API and Realtime Server — Recommendation Subsystem View"]
        direction TB

        recApi["<span style='font-size:18px'><b>Recommendation API and Feed Management</b></span><br/><br/>[Component]<br/>Express / Node.js / in-memory cache<br/>Serves, renews, caches, and stores feeds"]
        candidates["<span style='font-size:18px'><b>Candidate Generation</b></span><br/><br/>[Component]<br/>Node.js recommendation modules<br/>Builds graph and trending candidate pools"]
        ranking["<span style='font-size:18px'><b>Feature Preparation and Ranking Client</b></span><br/><br/>[Component]<br/>Node.js / TCP client<br/>Builds features and requests candidate ranking"]
        graphSync["<span style='font-size:18px'><b>Interaction Graph Synchronization</b></span><br/><br/>[Component]<br/>Node.js / Cypher<br/>Synchronizes wishlist and click interactions"]
        retraining["<span style='font-size:18px'><b>Retraining Coordination</b></span><br/><br/>[Component]<br/>node-cron / child_process<br/>Schedules training and records status"]

        recApi ---->|"Calls candidate generation"| candidates
        candidates -->|"Calls feature preparation and ranking"| ranking
        ranking -->|"Returns ranked candidates"| recApi
        recApi ---->|"Calls interaction synchronization"| graphSync
    end

    browserRec ---->|"Calls feed, renew, and click APIs [JSON over HTTP/HTTPS]"| recApi
    recApi -->|"Reads active recommendation feeds [PostgreSQL protocol]"| postgresRec
    recApi -->|"Writes generated recommendations and clicks [PostgreSQL protocol]"| postgresRec
    candidates -->|"Reads catalog, trending, and interaction data [PostgreSQL protocol]"| postgresRec
    candidates -->|"Reads personalized graph candidates [Bolt/Cypher]"| memgraphRec
    ranking -->|"Calls candidate ranking [TCP/JSON lines]"| inferenceRec
    graphSync -->|"Writes user-book interaction edges [Bolt/Cypher]"| memgraphRec

    retraining -->|"Starts scheduled training pipeline [OS child process]"| trainingRec
    retraining -->|"Writes retraining status and logs [filesystem I/O]"| recFiles
    retraining -->|"Restarts inference after training [OS child process]"| inferenceRec
    trainingRec -->|"Reads training interactions [PostgreSQL protocol]"| postgresRec
    trainingRec -->|"Reads and writes graph model state [Bolt/Cypher]"| memgraphRec
    trainingRec ---->|"Writes LightGBM model artifact [filesystem I/O]"| recFiles
    inferenceRec -->|"Loads and reloads model artifact [filesystem I/O]"| recFiles

    subgraph keyRec["Legend"]
        keyRecComponent["<span style='font-size:18px'><b>Component</b></span><br/><br/>[Component]<br/>Cohesive recommendation code inside backend"]
        keyRecContainer["<span style='font-size:18px'><b>Application / Process</b></span><br/><br/>[Container]<br/>Runtime outside the expanded view"]
        keyRecData[("<span style='font-size:18px'><b>Data Store</b></span><br/><br/>[Container: Data Store]<br/>Persisted data outside the expanded view")]
    end

    classDef component fill:#85bbf0,stroke:#2f6fa6,color:#102a43;
    classDef container fill:#1168bd,stroke:#0b4884,color:#fff;
    classDef database fill:#2b78b8,stroke:#0b4884,color:#fff;
    class recApi,candidates,ranking,graphSync,retraining,keyRecComponent component;
    class browserRec,inferenceRec,trainingRec,keyRecContainer container;
    class postgresRec,memgraphRec,recFiles,keyRecData database;
```

### 4.1 Main Flow

For feed generation, the browser calls Recommendation API and Feed Management. It reads an existing feed or calls Candidate Generation, which reads PostgreSQL and Memgraph before Feature Preparation and Ranking Client calls the Python inference process. The API writes the selected recommendations to PostgreSQL. Separately, Retraining Coordination starts the scheduled GraphSAGE and LightGBM jobs, writes their status, and restarts inference after a new artifact is created.

### 4.2 Recommendation Component Descriptions

| Component | Responsibility | Representative code/modules | Relationships |
|---|---|---|---|
| Recommendation API and Feed Management | Serves recommendation feeds, renews them, tracks clicks, keeps the user cache, and stores results. | Recommendation routes/controllers/services and in-memory cache | Calls candidate generation and graph synchronization; reads/writes PostgreSQL. |
| Candidate Generation | Combines Memgraph personalized candidates with PostgreSQL trending fallbacks. | Candidate selection in `recommendation.services.mjs` | Reads PostgreSQL and Memgraph, then calls ranking. |
| Feature Preparation and Ranking Client | Builds ranking features and exchanges newline-delimited JSON with Python inference. | Feature compilation and TCP client in `recommendation.services.mjs` | Calls Recommendation Inference Service and returns ranked candidates. |
| Interaction Graph Synchronization | Synchronizes wishlist and recommendation-click interactions. | `memgraphSync.services.mjs` and recommendation click handling | Writes user-book edges to Memgraph. |
| Retraining Coordination | Schedules weekly training, prevents overlap, records status/logs, and restarts inference. | `scheduler.services.mjs`, startup calls in `server.mjs` | Starts training jobs, writes file status, and restarts inference. |

## 5. AI Usage Notes

This document was drafted with the assistance of an AI tool, declared as follows:

### AI Tool 1

- **Tool name:** ChatGPT (OpenAI)
- **Access time:** August 2, 2026
- **Prompt:** “Using the PA4 requirements, Project Plan, Vision Document, and C4 guidance, read the whole system and create its container and component diagrams.”
- **Purpose:** Review the current implementation and document its C4 container and component architecture.
- **Content generated by AI:** Mermaid diagrams, architecture descriptions, terminology alignment, and document formatting.
- **Student's work and validation:** The student provided the requirements and reference documents. Architecture details were checked against source code, runtime configuration, database schema, and rendered Mermaid output.
