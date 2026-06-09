# Implementation Plan: Hybrid Search Engine

**Branch**: `feature/BookGraph` | **Date**: 2026-06-09 | **Spec**: [specs/003-hybrid-search/spec.md]

## Summary

Implemented a dual-mode search system. The **Standard OPAC Search** uses Cypher queries against Memgraph for keyword matching. The **Semantic AI Search** leverages a Python FastAPI microservice that queries a ChromaDB vector store using `SentenceTransformer` embeddings. Results from both modes are enriched in the Node.js backend with graph data and external covers.

## Technical Context

**Language/Version**: JavaScript (ESM), Python 3.12

**Primary Dependencies**: Express.js, Neo4j Driver (for Memgraph), FastAPI, ChromaDB, Uvicorn, SentenceTransformers (all-MiniLM-L6-v2)

**Storage**: Memgraph (Graph), ChromaDB (Vector)

**Testing**: Manual verification against known dataset entities ("Dune").

**Project Type**: Hybrid Web Service (Node.js Gateway + Python AI Microservice)

**Performance Goals**: <500ms for search coordination and enrichment.

**Constraints**: Python AI service must remain isolated from Node.js process (per Constitution).

## Constitution Check

- **I. Graph-First Discovery**: ✅ Verified. ChromaDB is used for vector space matching, while Memgraph handles metadata enrichment.
- **IV. Isolated AI/ML Microservice**: ✅ Verified. Implemented a standalone Python microservice (`src/services/ai/app.py`) running on port 8000.

## Project Structure

### Documentation (this feature)

```text
specs/003-hybrid-search/
├── spec.md              # Feature specification
├── plan.md              # This file
└── tasks.md             # Implementation tasks and status
```

### Source Code

```text
src/
├── server/
│   ├── routes/library.mjs             # Added GET /api/books/search
│   ├── controllers/library.controller.mjs # Added searchBooks controller
│   └── services/library.services.mjs      # Added searchBooksOpac/Semantic and enrichSearchResults
├── services/
│   └── ai/
│       └── app.py                     # Python FastAPI microservice
└── client/
    └── app/
        ├── search/
        │   └── page.js                # New search UI
        └── components/
            └── NavBar.js              # Added Search link
```

## Structure Decision

Followed the project's existing Node.js/Express architecture for the backend and Next.js directory-based routing for the frontend. Introduced a new `src/services/ai` directory for the Python microservice to maintain separation of concerns.
