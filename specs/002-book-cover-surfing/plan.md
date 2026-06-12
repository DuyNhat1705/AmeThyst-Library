# Implementation Plan: Book Cover Surfing (Extended)

**Branch**: `feature/book-surfing` | **Date**: 2026-06-12 | **Spec**: [specs/002-book-cover-surfing/spec.md]

## Summary

Implemented a visual-first book discovery system with genre-based filtering. All tasks completed, including backend services, API endpoints, and a dynamic frontend dropdown UI with genre-scoped infinite scrolling.

## Technical Context

**Language/Version**: JavaScript (ESM) / Node.js 18+ / Next.js 14+

**Primary Dependencies**: Express.js, Next.js, neo4j-driver, chromadb

**Storage**: Memgraph (Graph), ChromaDB (Vector), PostgreSQL (Transactional)

**Testing**: Manual verification of dropdown interaction, API filtering accuracy, and infinite scroll continuity under filtered views.

**Target Platform**: Web (Modern Browsers)

**Project Type**: Full-stack Web Feature

**Performance Goals**: <800ms for paginated surfing batches; <200ms for genre list retrieval.

**Constraints**: Must adhere to Constitution Principle I (Graph-First Discovery) and IV (Isolated ML Microservice). No LLM-based filtering.

## Constitution Check

- **I. Graph-First Discovery**: ✅ Verified. Genre relationships are stored in Memgraph and used for filtering.
- **IV. Tech Stack Boundaries**: ✅ Verified. Express acts as the gateway; Memgraph handles graph queries; logic is isolated from ML services unless deep-dive metadata is requested.

## Project Structure

### Documentation (this feature)

```text
specs/002-book-cover-surfing/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 Research
├── data-model.md        # Phase 1 Data Model
└── tasks.md             # Implementation tasks
```

### Source Code

```text
src/
├── server/
│   ├── routes/library.mjs             # Register /api/genres and update /api/books/surfing
│   ├── controllers/library.controller.mjs # Add getGenres and update getSurfingPage
│   └── services/library.services.mjs      # Implement getAllGenres and update getSurfingBooks
└── client/
    └── app/
        ├── surfing/
        │   └── page.js                # Update to handle 'genre' query param
        └── components/
            └── NavBar.js              # Implement hover dropdown for Discovery
```

## Structure Decision

Maintained the established Routes -> Controllers -> Services architecture. The frontend uses Next.js app router and query parameters for state persistence.
