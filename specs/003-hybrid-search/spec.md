# Feature Specification: Hybrid Search Engine

**Feature Branch**: `feature/BookGraph`

**Created**: 2026-06-09

**Status**: Completed

**Input**: User description: "A hybrid search engine designed to give users two powerful ways to discover books: Standard OPAC Search and Semantic AI Search."

## User Scenarios & Testing

### User Story 1 - Standard OPAC Search (Priority: P1)

As a user, I want to find precise books by typing a title, author, or ISBN, so that I can quickly access the exact items I'm looking for.

**Why this priority**: Core functionality for any library system. Essential for power users and specific lookups.

**Independent Test**: Search for "Frank Herbert" or "Dune" and verify that exactly matching or relevant title/author results are returned.

**Acceptance Scenarios**:

1. **Given** a library with books by "Frank Herbert", **When** I search for "Frank Herbert" in Standard mode, **Then** I should see a list of books authored by him.
2. **Given** a book with ISBN "0441172717", **When** I search for that ISBN, **Then** I should see "Dune".

---

### User Story 2 - Semantic AI Search (Priority: P2)

As a user, I want to discover books by describing a "vibe," theme, or plot concept (e.g., "a lonely space cowboy finding romance"), so that I can find new books even when I don't know a specific title or author.

**Why this priority**: Key differentiator. Enhances discovery and provides a modern "smart" experience.

**Independent Test**: Type a conceptual query like "desert planet worms" and verify that "Dune" appears in the results.

**Acceptance Scenarios**:

1. **Given** a query "desert planet with giant worms", **When** I search in Semantic mode, **Then** "Dune" should be among the top results.
2. **Given** a query "cyberpunk dystopia with hackers", **When** I search in Semantic mode, **Then** relevant books like "Neuromancer" should appear.

---

### User Story 3 - Search Mode Toggle (Priority: P1)

As a user, I want to easily switch between Standard and Semantic search modes on the search page, so that I can choose the discovery method that best fits my current intent.

**Why this priority**: Necessary for the "Hybrid" aspect of the engine. Provides user control.

**Independent Test**: Toggle the search mode on the UI and verify that the placeholder text and backend behavior change accordingly.

**Acceptance Scenarios**:

1. **Given** the search page, **When** I select "AI Semantic Search", **Then** the input placeholder should change to "Describe a vibe, theme, or plot..."
2. **Given** a query, **When** I change the mode and click "Search", **Then** the results should refresh based on the selected algorithm.

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide a keyword-based search against Memgraph for title, author, and ISBN.
- **FR-002**: System MUST provide a vector-based semantic search using ChromaDB.
- **FR-003**: System MUST provide an isolated Python AI microservice to handle embedding and similarity calculations.
- **FR-004**: System MUST enrich search results with metadata (authors, genres) from Memgraph and covers from OpenLibrary.
- **FR-005**: System MUST provide a unified API endpoint `GET /api/books/search` that routes to either search mode.
- **FR-006**: Frontend MUST provide a responsive masonry-style results display.

### Key Entities

- **Book**: Represented in Memgraph (nodes) and ChromaDB (vectors). Attributes: `book_id`, `title`, `isbn`, `isbn13`.
- **Author**: Represented in Memgraph. Relationship: `(:Book)-[:WRITTEN_BY]->(:Author)`.
- **Embedding**: Mathematical representation of the book's description stored in ChromaDB.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Semantic search returns "Dune" within the top 5 results for the query "desert planet worms".
- **SC-002**: Search API response time (including enrichment) is under 1 second for typical queries.
- **SC-003**: 100% of search results displayed on the frontend include a book cover image (resolved via OpenLibrary).

## Assumptions

- **A-001**: ChromaDB has been prepopulated with vector embeddings for the book catalog.
- **A-002**: Memgraph is running and contains the relational book-author-genre graph.
- **A-003**: OpenLibrary Covers API is available for resolving cover URLs.
