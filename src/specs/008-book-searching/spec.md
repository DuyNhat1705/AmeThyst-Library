# Feature Specification: Book Searching

**Feature Branch**: `008-book-searching`

**Created**: 2026-06-21

**Status**: Draft

**Input**: User description: "app feature: book searching. 2 mode: standard searching(OPAC) / semantic search. As a user, when using standard searching, i will want to find the books that match my input (title, author, isbn, publisher...). On the other hand, with semantic search, the result should match my description of the book content. It should allow me to filter search result with publication date, genres, number of pages, languages... In the case that no book match my request, give me the clear response. Thhis should be handled with ChromaDB (the real database will be added later in our project), and keep in mind that the history of search should later be used to predict user preferences (in case they have logged in )"

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Standard Search (OPAC) (Priority: P1)

As a library member, I want to perform a keyword-based search on classic book metadata (title, author, ISBN, publisher, category) within an overlay search panel on the library page so that I can quickly find a specific book without losing my position in the catalog.

**Why this priority**: This is the fundamental, expected search mechanism of any library system. It allows high-precision searching when the user has explicit keywords or book identifiers.

**Independent Test**: Can be fully tested by clicking the library search bar, typing a query, selecting "Standard Search" in the overlay panel, and confirming that the correct matching books are returned in the overlay panel grid.

**Acceptance Scenarios**:
1. **Given** I am on the Library catalog page and click or type in the Search Bar, **When** the Search Panel overlay opens and I select "Standard Search" mode, input a query term, and click Search, **Then** the outer catalog page freezes its scroll and the panel queries the metadata attributes (Title, Author, ISBN, Publisher) and returns all matching books.
2. **Given** a list of search results in the search panel, **When** I click on a book card, **Then** I am redirected to the book's details page.

---

### User Story 2 - Semantic Search (Priority: P1)

As a library member who doesn't remember a book's title or author but recalls its plot or topic, I want to search using a natural language description within the search panel so that I can discover books matching my conceptual description.

**Why this priority**: This is a key requirement that enables discovery and matches book content description instead of exact metadata keywords, leveraging pgvector similarity matching in PostgreSQL.

**Independent Test**: Can be tested by opening the search panel on the library page, selecting "Semantic Search", entering a description of a book's theme or plot, and confirming that books with conceptually relevant summaries/descriptions are returned at the top of the search panel grid.

**Acceptance Scenarios**:
1. **Given** the Search Panel overlay is open on the Library page and I have selected "Semantic Search" mode, **When** I input a conceptual description of a book and click Search, **Then** the system retrieves matching books from the PostgreSQL database using pgvector similarity search, sorted by relevance score inside the panel.

---

### User Story 3 - Metadata Filtering (Priority: P2)

As a researcher or reader browsing the library catalog, I want to narrow down search results inside the search panel using specific filters (Publication Date range, Genres/Categories, Number of Pages range, and Languages) so that I can quickly find books that match my specific reading constraints.

**Why this priority**: Users need a way to refine large sets of results, particularly in semantic searches where similarity scores might return many broad matches.

**Independent Test**: Open the search panel, perform a search, apply one or more filters (e.g., Genre = "Fantasy", Language = "English", Publication Date >= 2010), and verify that only books satisfying all selected conditions are displayed.

**Acceptance Scenarios**:
1. **Given** a list of search results in the search panel (from either standard or semantic search), **When** I open the filters sidebar within the panel and select specific genres, page counts, languages, or publication dates, **Then** the list instantly updates to show only books meeting these filters.
2. **Given** that I have filters applied, **When** I click "Clear Filters", **Then** the original unfiltered search results are restored.

---

### User Story 4 - Clear Response for No Matches (Priority: P1)

As a library member, when I search for a book that is not in the library collection or filter the results too restrictively, I want to see a clear, user-friendly message saying that no books match my request, along with helpful search suggestions, so that I understand there are no matching items.

**Why this priority**: Essential for good user experience. Without clear feedback, users may think the application has frozen, crashed, or returned an error.

**Independent Test**: Enter a random string of characters (e.g., "xyzabc12345") or apply extremely restrictive overlapping filters in the search panel, and verify that the panel grid displays a clean "No books match your request" message rather than a blank page or server crash.

**Acceptance Scenarios**:
1. **Given** a query or combination of filters that returns 0 matching books in the search panel, **When** the search is executed, **Then** the system displays a prominent message: "No books found matching your request."
2. **Given** the no-results screen, **When** it is displayed, **Then** the UI provides helpful tips (e.g., "Check spelling", "Remove filters", or "Try semantic search with different keywords").

---

### User Story 5 - Search History & Preference Logging (Priority: P2)

As a logged-in library member, I want the system to securely record my search queries, modes, and filters executed inside the search panel in my search history so that the library system can later analyze my preferences and provide personalized book recommendations.

**Why this priority**: Critical backend requirement to support downstream user preference prediction and recommendations.

**Independent Test**: Log in as a user, execute standard and semantic searches with different filters in the search panel, and check the database to verify that search logs are stored correctly with user reference, query, mode, filters, and timestamp.

**Acceptance Scenarios**:
1. **Given** I am logged in to my account, **When** I run any book search in the search panel, **Then** the system logs a `SearchHistory` entry containing my `userID`, `query`, `searchMode`, `appliedFilters`, and the `timestamp`.
2. **Given** I am browsing as a guest (not logged in), **When** I run a book search, **Then** the search runs successfully but the system does not persist any search logs in the database.

---

### User Story 6 - Click-Through Tracking (Intent vs. Passive Clicks) (Priority: P2)

As a logged-in library member, when I click on a book from the search/filter result list in the search panel, I want the system to save this clicked book in my search history so that the system can use this high-intent interaction as data for future recommendations. I want to ensure that "passive" clicks (browsing the general library page or home page without searching/filtering) do not pollute the search history.

**Why this priority**: Direct, active interactions (clicking a result from a search) represent a much higher user interest than passive browsing, which is crucial for recommendation quality.

**Independent Test**:
1. Log in, search for a book in the search panel, click a book from the search panel results grid, and verify that the clicked book ID is recorded in the corresponding search history entry under `clickedBookIds`.
2. Browse to the general books catalog, click a book without applying search or filters, and verify that no search history updates occur.

**Acceptance Scenarios**:
1. **Given** I am a logged-in user on the search panel and have executed a search, **When** I click a book card from the results grid, **Then** the system triggers a click tracking request that appends the book's ID to `clickedBookIds` of the current `SearchHistory` entry.
2. **Given** I am a logged-in user on the general catalog page (passive surfing), **When** I click a book card, **Then** no search history log is updated or created.

---

## Edge Cases

- **Empty or Whitespace-only Input**: If the user submits an empty query or only whitespace, standard search should return either all books or prompt the user for input. Semantic search should handle this gracefully without triggering vector generation errors.
- **Database / Extension Failure**: If the pgvector queries fail or the database connection is interrupted, semantic search should degrade gracefully by falling back to standard metadata keyword search and notifying the user.
- **Malformed Filter Inputs**: Users inputting invalid page ranges (e.g., minimum pages > maximum pages, empty strings, NaNs) or invalid dates. The backend and frontend must sanitize and validate these inputs, converting empty/invalid filter values to null/defaults to prevent database casting exceptions.
- **Books with Incomplete Metadata**: If some books in the database lack language, page counts, or publication dates, the filtering logic must handle `null` or `undefined` values without crashing or excluding books unless explicitly filtered out.
- **Extremely Long Semantic Queries**: If a user pastes a massive block of text as a description, the embedding model must truncate the input appropriately without failing.
- **Click Tracking Failures**: If the backend click tracking API fails, the user's navigation to the book details page must still proceed without interruption.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide an integrated search panel overlay on the Library catalog page, triggered when the user starts typing in or clicks the catalog search bar.
- **FR-002**: The search panel overlay MUST freeze the outer page scroll (disabling body scroll) while active.
- **FR-003**: The search panel MUST contain a toggle/selector to switch between **Standard (OPAC) Search** and **Semantic Search**.
- **FR-004**: **Standard Search** MUST perform key-matching on Title, Author, ISBN, Publisher, and Category using partial matching.
- **FR-005**: **Semantic Search** MUST compute embeddings for the search query and perform a vector similarity search using pgvector in PostgreSQL.
- **FR-006**: The system MUST provide filters inside the search panel for:
  - **Publication Date**: Start and end year/date.
  - **Genres**: Multiple-choice checkbox list.
  - **Number of Pages**: Min and max page counts.
  - **Languages**: Multiple-choice checkbox list.
- **FR-007**: The system MUST support combined vector similarity search and metadata filtering using PostgreSQL (integrating pgvector distance operations with standard WHERE clauses).
- **FR-008**: The system MUST display a user-friendly message when a query returns zero results.
- **FR-009**: The system MUST log the search details to the database under a `SearchHistory` model if a user is logged in.
- **FR-010**: The system MUST NOT log search history for unauthenticated/guest users.
- **FR-011**: The search endpoint (`POST /api/search`) MUST return the `searchHistoryId` in the response when an authenticated user performs a search.
- **FR-012**: The system MUST provide an endpoint `POST /api/search/history/click` to associate a clicked book ID with a specific `SearchHistory` record.
- **FR-013**: The search panel results grid MUST trigger an update to the search history via the click endpoint only for "intent clicks" (clicks originating from search results/filter panel applications) for authenticated users, distinguishing them from passive surfing clicks.
- **FR-014**: The backend and frontend MUST validate filter parameter values, ensuring malformed inputs (like empty strings or NaNs for numeric page bounds) are handled gracefully and safely mapped to null or skipped.

### Key Entities

- **Book**: Represents a book resource in the system.
  - *Attributes*: `id`, `title`, `author`, `isbn`, `publisher`, `publicationDate`, `genres` (array), `pageCount`, `language`, `description`, `coverImage`, `embedding` (vector type for pgvector similarity matches).
- **SearchHistory**: Represents a log of a search query executed by a logged-in user.
  - *Attributes*: `id`, `userId` (references User), `query`, `searchMode` (Standard/Semantic), `filters` (JSON object of applied filters), `clickedBookIds` (array of strings, referencing Book.id), `timestamp`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Standard searches must execute and render results in under 200ms.
- **SC-002**: Semantic searches (including embedding generation and pgvector lookup) must execute and return results in under 800ms.
- **SC-003**: Filtering updates the displayed result list in under 100ms (client-side or server-side).
- **SC-004**: 100% of searches by authenticated users successfully write a record to `SearchHistory` database tables.
- **SC-005**: 100% of intent clicks by authenticated users on search results must trigger a request and record the clicked book ID under `clickedBookIds` in the corresponding SearchHistory entry.

---

## Assumptions

- **Embedding Service**: A reliable embedding generation model (e.g., via HuggingFace transformers, local models, or OpenAI API) will be available to convert descriptions and queries into vectors.
- **pgvector**: The PostgreSQL database will have the pgvector extension enabled, and the books table will feature a vector column for descriptions.
- **Integration**: A mock/stub layer for pgvector and SearchHistory logging will be implemented first, as the "real database will be added later".
- **User Session Context**: The frontend/backend integration exposes a user session context containing the current user's ID when they are authenticated.

