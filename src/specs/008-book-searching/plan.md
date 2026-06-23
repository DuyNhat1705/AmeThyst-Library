# Implementation Plan: Book Searching

**Branch**: `008-book-searching` | **Date**: 2026-06-21 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/008-book-searching/spec.md`

## Summary

The goal of this feature is to implement a dual-mode Book Searching feature containing two search modes: Standard (OPAC) Search (keyword matching on metadata like Title, Author, ISBN, and Publisher) and Semantic Search (natural language description similarity matching utilizing pgvector in PostgreSQL). The results list will support real-time filtering by publication date range, genres, page count, and language. Users who are logged in will have their search queries tracked and recorded in the database `SearchHistory` collection to support future personalized book recommendation features. If search results are empty, a clean user-friendly screen with tips will be rendered.

## Technical Context

**Language/Version**: JavaScript (Node.js 20+, React 19)

**Primary Dependencies**: Next.js 16.2.6, Express 5.2.1, pgvector (pg package or pgvector library extension), Node Embedding library or OpenAI API client for embedding generation.

**Storage**: PostgreSQL (via existing DB service) with pgvector extension enabled, storing traditional metadata, search history logs, and book description vector embeddings in a single database.

**Testing**: ESLint, manual route validation, and integration tests for pgvector similarity search queries.

**Target Platform**: Modern Web Browsers

**Project Type**: Full-stack Web Application (Next.js App Router + Express)

**Performance Goals**: Standard search response < 200ms; Semantic search (including query embedding generation and similarity query) < 800ms.

**Constraints**: Strict compliance with `constitution.md` (Atomic Design, Layered Architecture, `.mjs` extensions, relative import checks).

**Scale/Scope**: Integration of vector search capability into library catalog search.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Atomic Design Compliance**: Components will be broken down into Atoms, Molecules, and Organisms in `client/app/components`.
- [x] **Layered Backend Architecture**: New search and history endpoints will follow `Route -> Middleware -> Controller -> Service -> Model`.
- [x] **Naming Conventions**: camelCase for frontend variables and controllers/services, PascalCase for components/models.
- [x] **Environment Variables**: Backend base URL loaded via `NEXT_PUBLIC_API_URL`. PostgreSQL connection credentials and Embedding model API keys stored in server `.env`.
- [x] **Modular Backend**: Use of ES Modules (`.mjs`) and directory-specific naming patterns.

## Project Structure

### Documentation (this feature)

```text
src/specs/008-book-searching/
├── spec.md              # Feature Specification (Standard/Semantic, filters, pgvector, history)
└── plan.md              # This file
```

### Source Code (repository root)

```text
client/
└── app/
    ├── search/
    │   └── page.jsx      # Main Search page showing search bar, toggle, filter sidebar, results grid
    └── components/
        ├── atoms/        # Search inputs, toggle switches, filter checkmarks, pagination buttons
        ├── molecules/    # Result cards, filter section dropdowns, empty state UI
        └── organisms/    # Results list grid, sidebar filters panel, search execution bar
server/
└── src/
    ├── config/
    │   └── db.config.mjs          # PostgreSQL and pgvector configuration and initialization
    ├── controllers/
    │   ├── search.controllers.mjs  # Handles standard/semantic search triggers and payload extraction
    │   └── history.controllers.mjs # Handles retrieval of logged search histories
    ├── middlewares/
    │   └── auth.middlewares.mjs   # Checks for authentication session to log search history
    ├── models/
    │   └── history.models.mjs     # SearchHistory mongoose/pg model definition
    ├── routes/
    │   ├── search.routes.mjs      # Endpoint: GET/POST /api/search
    │   └── history.routes.mjs     # Endpoint: GET/POST /api/search/history
    └── services/
        ├── search.services.mjs    # Performs standard Postgres metadata lookup or pgvector similarity search
        └── history.services.mjs   # Interacts with DB to store or retrieve user search histories
```

**Structure Decision**: Standard web application structure separating `client/` (Next.js App Router) and `server/` (Express API), in accordance with the layered architecture pattern.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
