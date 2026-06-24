# Quickstart: Book Searching & Filter Panel Integration Validation

This guide provides scenarios to validate the updated in-place Book Searching and unified filter panel integration.

## Prerequisites
- **Backend Server**: Running on `http://localhost:5000`
- **Frontend Client**: Running on `http://localhost:3000`
- **PostgreSQL Database**: Configured with the pgvector extension enabled and the modified `search_history` schema.

---

## Validation Scenarios

### Scenario 1: Standard In-Place Search
1. **Action**: Open browser, go to `http://localhost:3000/library`.
2. **Expectation**:
    - The page renders the general books catalog. No popup overlay panel opens.
3. **Action**: Click the Search input at the top, type a query (e.g., "Potter"), and press **Enter** (or click the search icon).
4. **Expectation**:
    - The main explored books grid replaces its default content in-place with books matching "Potter" by metadata.
    - An HTTP request `POST /api/search` is executed with `logHistory: true`.
    - If logged in, a search log entry is saved in the database under `search_content` (e.g. `Query: "Potter"`).

### Scenario 2: Semantic Search via Filter Panel Toggle
1. **Action**: Click the "Filter" button on the Search Bar to slide out the `FilterPanel` drawer.
2. **Expectation**:
    - At the top of the Filter Panel drawer, a search mode selector (Standard vs Semantic) is visible.
3. **Action**: Toggle search mode to "Semantic", type "teenage wizard at magic academy" in the search bar, and click Search (or press Enter).
4. **Expectation**:
    - The catalog grid refreshes in-place with books sorted by cosine similarity relevance (pgvector lookup).
    - If logged in, a search log entry is created with `search_mode` set to "semantic".

### Scenario 3: Intent-Based Logging (Enter vs. Live Debounce)
1. **Action**: Type a query character-by-character (e.g., typing "H-a-r-r-y") without pressing Enter or clicking Search.
2. **Expectation**:
    - The catalog results update dynamically as you type (live debounce).
    - If logged in, verify the database: **no new rows are created in `search_history`** (since the client passed `logHistory: false` during typing).
3. **Action**: Press **Enter** once typing is finished.
4. **Expectation**:
    - A single history log row is created in the database `search_history` table.

### Scenario 4: Logging Filter Trigger without Search
1. **Action**: Click the Filter button to open the filter drawer. Leave the search input completely empty.
2. **Action**: Check "Fiction" genre tag and click apply/toggle it.
3. **Expectation**:
    - The catalog results grid updates in-place to display fiction books.
    - Even with an empty search query, an API request `POST /api/search` with `logHistory: true` is dispatched.
    - If logged in, a search history log is written containing `search_content` as: `Filters: { Genres: [Fiction] }`.

### Scenario 5: Click-Through Intent Tracking
1. **Action**: Perform an in-place search, and click one of the matching book cards from the results.
2. **Expectation**:
    - User is redirected to the book details page.
    - An intent click is logged under `clickedBookIds` for that search session history ID.
3. **Action**: Go back to library page, browse explore catalog without typing a query or toggling filters, and click a book card.
4. **Expectation**:
    - Redirect works correctly; **no** click tracking event is logged.
