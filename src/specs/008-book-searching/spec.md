# Feature Specification: Book Searching

**Feature Branch**: `008-book-searching`

**Created**: 2026-06-21

**Status**: Draft

**Input**: User description: "app feature: book searching. 2 mode: standard searching(OPAC) / semantic search. As a user, when using standard searching, i will want to find the books that match my input (title, author, isbn, publisher...). On the other hand, with semantic search, the result should match my description of the book content. It should allow me to filter search result with publication date, genres, number of pages, languages... In the case that no book match my request, give me the clear response. Thhis should be handled with ChromaDB (the real database will be added later in our project), and keep in mind that the history of search should later be used to predict user preferences (in case they have logged in )"

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Standard Search (OPAC) (Priority: P1)

As a library member, I want to perform a keyword-based search on classic book metadata (title, author, ISBN, publisher, category) so that I can quickly find a specific book that I already know exists.

**Why this priority**: This is the fundamental, expected search mechanism of any library system. It allows high-precision searching when the user has explicit keywords or book identifiers.

**Independent Test**: Can be fully tested by selecting "Standard Search", entering an exact title, author name, or ISBN, and confirming that the correct matching books are returned in the results list.

**Acceptance Scenarios**:
1. **Given** I am on the Book Search page and have selected "Standard Search" mode, **When** I input a query term (e.g., "Rowling" or "978-0747532699") and click Search, **Then** the system queries the metadata attributes (Title, Author, ISBN, Publisher) and returns all matching books.
2. **Given** a list of search results, **When** I click on a book card, **Then** I am redirected to the book's details page.

---

### User Story 2 - Semantic Search (Priority: P1)

As a library member who doesn't remember a book's title or author but recalls its plot or topic, I want to search using a natural language description (e.g., "a story about space exploration and finding alien artifacts") so that I can discover books matching my conceptual description.

**Why this priority**: This is a key requirement that enables discovery and matches book content description instead of exact metadata keywords, leveraging ChromaDB's vector similarity matching.

**Independent Test**: Can be tested by selecting "Semantic Search", entering a description of a book's theme or plot, and confirming that books with conceptually relevant summaries/descriptions are returned at the top of the results list.

**Acceptance Scenarios**:
1. **Given** I am on the Book Search page and have selected "Semantic Search" mode, **When** I input a conceptual description of a book (e.g., "dystopian society where reading books is banned") and click Search, **Then** the system retrieves matching books from ChromaDB using vector similarity, sorted by relevance score.

---

### User Story 3 - Metadata Filtering (Priority: P2)

As a researcher or reader browsing the library catalog, I want to narrow down search results using specific filters (Publication Date range, Genres/Categories, Number of Pages range, and Languages) so that I can quickly find books that match my specific reading constraints.

**Why this priority**: Users need a way to refine large sets of results, particularly in semantic searches where similarity scores might return many broad matches.

**Independent Test**: Perform a search, apply one or more filters (e.g., Genre = "Fantasy", Language = "English", Publication Date >= 2010), and verify that only books satisfying all selected conditions are displayed.

**Acceptance Scenarios**:
1. **Given** a list of search results (from either standard or semantic search), **When** I open the filters panel and select specific genres, page counts, languages, or publication dates, **Then** the list instantly updates to show only books meeting these filters.
2. **Given** that I have filters applied, **When** I click "Clear Filters", **Then** the original unfiltered search results are restored.

---

### User Story 4 - Clear Response for No Matches (Priority: P1)

As a library member, when I search for a book that is not in the library collection or filter the results too restrictively, I want to see a clear, user-friendly message saying that no books match my request, along with helpful search suggestions, so that I understand there are no matching items.

**Why this priority**: Essential for good user experience. Without clear feedback, users may think the application has frozen, crashed, or returned an error.

**Independent Test**: Enter a random string of characters (e.g., "xyzabc12345") or apply extremely restrictive overlapping filters, and verify that the UI displays a clean "No books match your request" message rather than a blank page or server crash.

**Acceptance Scenarios**:
1. **Given** a query or combination of filters that returns 0 matching books, **When** the search is executed, **Then** the system displays a prominent message: "No books found matching your request."
2. **Given** the no-results screen, **When** it is displayed, **Then** the UI provides helpful tips (e.g., "Check spelling", "Remove filters", or "Try semantic search with different keywords").

---

### User Story 5 - Search History & Preference Logging (Priority: P2)

As a logged-in library member, I want the system to securely record my search queries, modes, and filters in my search history so that the library system can later analyze my preferences and provide personalized book recommendations.

**Why this priority**: Critical backend requirement to support downstream user preference prediction and recommendations.

**Independent Test**: Log in as a user, execute standard and semantic searches with different filters, and check the database (or mock database endpoints) to verify that search logs are stored correctly with user reference, query, mode, filters, and timestamp.

**Acceptance Scenarios**:
1. **Given** I am logged in to my account, **When** I run any book search, **Then** the system logs a `SearchHistory` entry containing my `userID`, `query`, `searchMode`, `appliedFilters`, and the `timestamp`.
2. **Given** I am browsing as a guest (not logged in), **When** I run a book search, **Then** the search runs successfully but the system does not persist any search logs in the database.

---

## Edge Cases

- **Empty or Whitespace-only Input**: If the user submits an empty query or only whitespace, standard search should return either all books or prompt the user for input. Semantic search should handle this gracefully without triggering vector generation errors.
- **ChromaDB Unavailability**: If the ChromaDB vector database is offline or fails, semantic search should degrade gracefully by falling back to standard metadata keyword search and notifying the user.
- **Malformed Filter Inputs**: Users inputting invalid page ranges (e.g., minimum pages > maximum pages) or invalid dates. The interface must validate these inputs or default them correctly.
- **Books with Incomplete Metadata**: If some books in the database lack language, page counts, or publication dates, the filtering logic must handle `null` or `undefined` values without crashing or excluding books unless explicitly filtered out.
- **Extremely Long Semantic Queries**: If a user pastes a massive block of text as a description, the embedding model must truncate the input appropriately without failing.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a search UI with a clear toggle/selector to switch between **Standard (OPAC) Search** and **Semantic Search**.
- **FR-002**: **Standard Search** MUST perform key-matching on Title, Author, ISBN, Publisher, and Category using partial matching.
- **FR-003**: **Semantic Search** MUST compute embeddings for the search query and perform a vector similarity search using ChromaDB.
- **FR-004**: The system MUST provide filters for:
  - **Publication Date**: Start and end year/date.
  - **Genres**: Multiple-choice checkbox list.
  - **Number of Pages**: Min and max page counts.
  - **Languages**: Multiple-choice checkbox list.
- **FR-005**: The system MUST support combined vector similarity search (ChromaDB) and metadata filtering (ChromaDB metadata where-clauses or post-filtering).
- **FR-006**: The system MUST display a user-friendly message when a query returns zero results.
- **FR-007**: The system MUST log the search details to the database under a `SearchHistory` model if a user is logged in.
- **FR-008**: The system MUST NOT log search history for unauthenticated/guest users.

### Key Entities

- **Book**: Represents a book resource in the system.
  - *Attributes*: `id`, `title`, `author`, `isbn`, `publisher`, `publicationDate`, `genres` (array), `pageCount`, `language`, `description`, `coverImage`, `embedding` (for ChromaDB similarity matches).
- **SearchHistory**: Represents a log of a search query executed by a logged-in user.
  - *Attributes*: `id`, `userId` (references User), `query`, `searchMode` (Standard/Semantic), `filters` (JSON object of applied filters), `timestamp`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Standard searches must execute and render results in under 200ms.
- **SC-002**: Semantic searches (including embedding generation and ChromaDB lookup) must execute and return results in under 800ms.
- **SC-003**: Filtering updates the displayed result list in under 100ms (client-side or server-side).
- **SC-004**: 100% of searches by authenticated users successfully write a record to `SearchHistory` database tables.

---

## Assumptions

- **Embedding Service**: A reliable embedding generation model (e.g., via HuggingFace transformers, local models, or OpenAI API) will be available to convert descriptions and queries into vectors.
- **ChromaDB**: ChromaDB will be initialized with a book collection containing descriptions and metadata to support vector similarity searches.
- **Integration**: A mock/stub layer for ChromaDB and SearchHistory logging will be implemented first, as the "real database will be added later".
- **User Session Context**: The frontend/backend integration exposes a user session context containing the current user's ID when they are authenticated.
