# Feature Specification: Book Cover Surfing

**Feature Branch**: `feature/book-surfing`

**Created**: 2026-06-09

**Status**: Completed

**Input**: User description: "An interactive visual discovery interface allowing users to browse books via a masonry grid of covers, with deep-dive metadata retrieval from Memgraph and ChromaDB."

## User Scenarios & Testing

### User Story 1 - Visual Discovery Grid (Priority: P1)

As a user, I want to see a beautiful, infinite-scrolling grid of book covers so that I can discover new books based on their visual appeal.

**Why this priority**: Primary entry point for the "surfing" experience.

**Independent Test**: Navigate to `/surfing` and scroll down to verify that more covers load automatically in a masonry layout.

**Acceptance Scenarios**:

1. **Given** the surfing page, **When** I scroll to the bottom, **Then** more book covers should be fetched from the backend and appended to the grid.
2. **Given** the surfing page, **When** I view it on different screen sizes, **Then** the masonry grid should adjust its column count responsively.

---

### User Story 2 - Book Deep Dive (Priority: P1)

As a user, I want to click on a book cover to see its detailed description and relationships, so that I can learn more about a book that caught my eye.

**Why this priority**: Connects visual discovery with the rich metadata stored in our graph and vector databases.

**Independent Test**: Click a cover and verify that a modal appears with the book title, authors, genres, and a vector-based description.

**Acceptance Scenarios**:

1. **Given** a book cover in the grid, **When** I click it, **Then** a modal should open displaying data from both Memgraph (authors/genres) and ChromaDB (description).

---

### User Story 3 - Genre-Filtered Discovery (Priority: P1)

As a user, I want to hover over the "Discovery" link and select a specific genre so that I can see a feed of book covers restricted to that category.

**Why this priority**: Enhances discovery by allowing users to narrow down the infinite feed to their interests.

**Independent Test**: Hover over "Discovery" in the NavBar, select "Fantasy", and verify that the grid refreshes with only fantasy books.

**Acceptance Scenarios**:

1. **Given** the navigation bar, **When** I hover over "Discovery", **Then** a dropdown menu listing available genres should appear.
2. **Given** the genre dropdown, **When** I click on a specific genre, **Then** the surfing grid should clear its current contents and load books belonging to the selected genre.
3. **Given** a selected genre, **When** I scroll to the bottom, **Then** more books from *that same genre* should be fetched and appended.

## Requirements

### Functional Requirements

- **FR-001**: System MUST query Memgraph to retrieve a paginated list of books for the surfing grid.
- **FR-002**: System MUST enrich book data with cover URLs using the Open Library Covers API.
- **FR-003**: System MUST filter out books that do not have valid covers available.
- **FR-004**: System MUST implement an infinite scroll mechanism on the frontend.
- **FR-005**: System MUST provide a "Deep Dive" API endpoint to aggregate graph relationships and vector embeddings for a specific book.
- **FR-006**: Frontend MUST display book details in a responsive modal.
- **FR-007**: System MUST provide an API endpoint to retrieve all unique genres available in the database.
- **FR-008**: Navigation Bar MUST include a dropdown on the "Discovery" link populated with genres.
- **FR-009**: Surfing API MUST support a `genre` filter parameter to scope results.

### Key Entities

- **Book**: Node in Memgraph and document in ChromaDB.
- **Author/Genre**: Related nodes in Memgraph connected to Books.
- **Cover**: Visual asset resolved via ISBN against Open Library API.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Surfing page loads the first batch of 20 books in under 800ms (including cover verification).
- **SC-002**: Deep dive modal displays aggregated data from two databases in under 500ms.
- **SC-003**: 100% of books displayed in the surfing grid have a visible cover image.

## Assumptions

- **A-001**: Books in the database have valid ISBN or ISBN13 fields for cover resolution.
- **A-002**: Memgraph and ChromaDB are reachable from the Express.js server.
- **A-003**: The Open Library API is accessible for HEAD requests to verify covers.
