# Research: Book Searching Implementation

## UI Architecture & Components

### Existing Components to Reuse:
- **Organisms**: `NavBar.jsx`, `Footer.jsx`.
- **Molecules**: `BookCard.jsx` (to render book cards in the search result grid).

### New Components to Create (Atomic Design):
- **Atoms**:
    - `SearchToggle.jsx`: Toggle switch to alternate between Standard (OPAC) and Semantic search modes.
    - `FilterCheckbox.jsx`: Custom checkbox for selecting categories/genres or languages.
    - `RangeInput.jsx`: Dual-slider or numeric input inputs for selecting page count and publication date ranges.
- **Molecules**:
    - `SearchBar.jsx`: The search input box with execution buttons and clearing icons.
    - `FilterGroup.jsx`: A collapsible category block (e.g., "Genres", "Languages", "Page Count").
    - `EmptySearchResults.jsx`: A friendly feedback state displayed when search results are empty, suggesting corrective actions (e.g., spelling checks, removing filters, or trying semantic search).
- **Organisms**:
    - `SearchHeader.jsx`: Top control panel grouping `SearchBar` and `SearchToggle`.
    - `FilterSidebar.jsx`: A sidebar containing all filter groups, collapsible on mobile screens into a drawer.
    - `SearchResultsGrid.jsx`: Layout wrapper that renders a responsive grid of `BookCard`s or displays `EmptySearchResults` if zero results.

---

## Backend API Design

Based on the Layered Architecture requirement, we propose these API endpoints:

### Proposed Endpoints:
- `POST /api/search`:
    - Executes a search query based on selected mode and filters.
    - **Payload**:
      ```json
      {
        "query": "dystopian rebellion",
        "searchMode": "semantic",
        "filters": {
          "publicationDate": { "start": "2010", "end": "2026" },
          "genres": ["Sci-Fi", "Dystopian"],
          "pageRange": { "min": 100, "max": 500 },
          "languages": ["en"]
        }
      }
      ```
    - **Returns**: `{ books: [...], totalResults: 15 }`
- `GET /api/search/history`:
    - Retrieves search history for the logged-in user.
    - **Returns**: `{ history: [ { query, searchMode, filters, timestamp } ] }`

---

## pgvector & Vector Integration

PostgreSQL with the pgvector extension will manage the semantic similarity querying. The system will operate as follows:
1. **Embedding Generation**: Book summaries are converted to vectors (using local HuggingFace transformers via `xenova/transformers` or an external OpenAI API) during database seeding.
2. **Query Embedding**: The search input from the user is converted into a vector query on the backend.
3. **Similarity Search**: The query embedding is compared against book embeddings using pgvector operators (such as `<=>` for cosine distance). PostgreSQL returns records sorted by similarity.
4. **Metadata Filters inside PostgreSQL**: Metadata filters (such as language, publication year, genres) will be combined with the vector query using standard SQL `WHERE` clauses. E.g.:
   ```javascript
   const results = await db.query(
     `SELECT *, (embedding <=> $1) AS distance
      FROM books
      WHERE language = $2 AND publication_year >= $3
      ORDER BY distance ASC
      LIMIT 20`,
     [queryVector, 'en', 2010]
   );
   ```

---

## History Tracking & Personalization Strategy

To lay the foundation for predicting user preferences:
- A `search.middlewares.mjs` middleware checks for an active authorization token (`jwt` or session cookie).
- If present, it attaches the user ID to the request.
- After a successful search response, a database write task is scheduled to append the user's action to the `SearchHistory` database model.
- Recommendation engines can later parse these queries (e.g. counting frequent genres or running semantic profiling on past query embeddings) to generate personalized dashboard content.

---

## UI/UX & Responsive Layout

- **Desktop Layout**: 2-column layout. The left column (25% width) holds `FilterSidebar` as a sticky panel. The right column (75% width) holds the search bar, toggle, and the responsive results grid (3 or 4 columns).
- **Mobile Layout**: 1-column layout. The filters panel is hidden behind a "Filter Results" button, which opens a fullscreen overlay/drawer. The results grid collapses to 1 or 2 columns.
- **Micro-interactions**: Hover zoom effects on book cards, slide-down transitions for collapsible filters, and fading skeleton loaders during search execution.

---

## Decision Log

- **Decision**: Perform filtering directly in PostgreSQL SQL queries alongside pgvector similarity matching.
  - *Rationale*: Allows PostgreSQL's query planner to optimize execution by using both relational indexes and vector indexing (HNSW/IVFFlat) in a single unified operation, avoiding the cost of manual in-memory filtering.
- **Decision**: Avoid saving empty query logs to SearchHistory.
  - *Rationale*: Filters out noise and protects analytics datasets.
- **Decision**: Gracefully degrade to Standard OPAC search if pgvector queries fail or the vector column is unavailable.
  - *Rationale*: Users can still find books via metadata keyword search if the vector engine encounters database exceptions.
