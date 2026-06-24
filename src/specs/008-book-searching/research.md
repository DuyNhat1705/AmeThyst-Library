# Research: In-Place Search Catalog & Conditional Logging

## UI Architecture & Components

### Search Catalog Design Shift (V2)
- **Previous approach**: Integrated overlay panel (`SearchPanel.tsx`) that froze scroll when active.
- **New approach**: In-place search results on the `/library` catalog page directly. No scroll freezing overlay is needed.
- **Trigger**: Typing in the search bar or triggering filters updates the URL query string and directly fetches and updates the main catalog grid.
- **Reusing FilterPanel**: Reuses the slide-out drawer `FilterPanel.tsx` (supporting Genres, Campus Locations, Publication Year range, and Available Only switches) to refine both general catalog browsing and standard/semantic searches.

### Standard/Semantic Toggle Placement
- To maintain a clean search input field, the **Search Mode** selector (Standard vs Semantic) will be integrated directly inside the slide-out `FilterPanel.tsx` drawer as the top-most configuration setting.

---

## Log Analytics & Database Schema Changes

### Renaming `query` to `search_content`
- **Goal**: To capture richer context of user search intent for recommendations, standard metadata queries are merged with applied filters before logging.
- **Migration**:
  - Alter the `search_history` table to rename or replace the `query` text column with a `search_content` text column.
  - Value format: `Query: "[search term]" | Filters: { [genre/year/branch filters summary] }`.
- **Handling Empty Search Logs**: If a user applies filters without entering any search text, the log persists the active filters under `search_content` (e.g., `Query: (None) | Filters: { Genres: [Fiction] }`).

### Keystroke Debouncing vs. Intent Logging
- **The Issue**: Live typing searches are executed dynamically (debounced) on the client to show instant results. However, logging every single character permutation (e.g., "h", "ha", "har", "harry") to the database is wasteful and pollutes recommendation data.
- **The Solution**: 
  - The client passes a `logHistory: boolean` flag in the `POST /api/search` request body.
  - During active typing/debouncing, `logHistory` is set to `false`.
  - The flag is set to `true` **only** when:
    1. The user presses **Enter** inside the search input.
    2. The user clicks the **Search** icon.
    3. The user applies/triggers any filters in the slide-out `FilterPanel` (regardless of whether the search query is empty).

---

## Decision Log

- **Decision**: Render search results in-place on `/library` page.
  - *Rationale*: Leverages the existing `/library` catalog layout and pagination, reducing codebase duplication and allowing unified filters.
- **Decision**: Introduce `logHistory` parameter.
  - *Rationale*: Explicit client-side control enables instant results while preventing raw keystrokes from polluting database logs.
- **Decision**: Merge query and filters into `search_content` database column.
  - *Rationale*: Provides a descriptive, single-column summary of user preferences for downstream recommendation systems.
