# Implementation Plan: In-Place Book Searching & Log Refinement

**Branch**: `009-book-filter-panel` | **Date**: 2026-06-24 | **Spec**: [spec.md](spec.md)

## Summary
The goal of this phase is to refine the Book Searching UI and database logging mechanism:
1. **In-Place UI**: Remove the `SearchPanel` overlay drawer entirely. Instead, standard and semantic search query inputs directly filter and update the catalog grid on the `/library` page in-place, replacing the default explored books catalog (`PopularPublishes.tsx`).
2. **Filter Panel Integration**: Reuse the slide-out `FilterPanel.tsx` drawer (supporting Genres, Locations, Year Range, and Availability) to filter both search results and explore views. Add the search mode selector (Standard vs Semantic) directly into the `FilterPanel.tsx` drawer as a top option.
3. **Database Migration**: Rename the database column `query` to `search_content` in the `search_history` table to store a composed text summarizing the search text + applied filter tags (e.g. `Query: "dystopian" | Filters: { Genres: [Sci-Fi] }`).
4. **Keystroke Log Debouncing & Intent Logging**: Prevent character-by-character search logs. Introduce a `logHistory: boolean` parameter to the search API. Trigger persistent history logging (`logHistory: true`) **only** when the user presses Enter, clicks the search icon, or applies filters (including filters applied without a query). Debounced typing searches will pass `logHistory: false` to fetch instant results without polluting database logs.

## Technical Context
- **Language/Version**: JavaScript (Node.js 20+, React 19)
- **Primary Dependencies**: Next.js 16.2.6, Express 5.2.1, pg (PostgreSQL)
- **Storage**: PostgreSQL with pgvector extension enabled. Schema update: `ALTER TABLE search_history RENAME COLUMN query TO search_content;` (or equivalent migration).
- **Testing**: Manual scenario testing of search submissions, live typing debounce vs enter logging, and click intent logs.

## Constitution Check
- **Atomic Design Compliance**: SearchToggle, checkboxes, and year range filters reside in `client/app/components/atoms/` and `molecules/`. The main grid catalog and unified slide-out filter reside in `client/app/components/organisms/`.
- **Layered Backend Architecture**: Backend search flows follow `Route -> Middleware -> Controller -> Service -> Model`.
- **Import Path Verification**: Relative path checks inside `client/` and `server/`.

## Project Structure

### Documentation
```text
src/specs/008-book-searching/
├── spec.md              # Original Feature Specification
├── plan.md              # This file (In-place UI + Search Log Refinements)
├── research.md          # Consolidated research on in-place routing & history logs
└── contracts/
    └── api-contract.md  # API JSON schemas with logHistory parameter
```

### Source Code File Updates
```text
client/
└── app/
    ├── library/
    │   └── page.tsx                 # Manages unified state for query, mode, filters, and logs
    └── components/
        ├── organisms/
        │   ├── FilterPanel.tsx      # Slide-out drawer; houses Standard/Semantic search mode toggle
        │   └── PopularPublishes.tsx  # Dynamic catalog list; fetches in-place search results
        └── molecules/
            └── SearchBar.tsx        # Triggers search submissions (Enter / Click search)
server/
└── src/
    ├── controllers/
    │   └── search.controllers.mjs   # Formulates search response and invokes conditional history logs
    ├── models/
    │   └── history.models.mjs       # Interacts with DB referencing search_content column
    └── services/
        ├── search.services.mjs      # Executes SQL query matches combining metadata filters & pgvector
        └── history.services.mjs     # Composes search_content text logging
```

## Done When
- [ ] Database migration renaming `query` to `search_content` in `search_history` executed.
- [ ] `FilterPanel.tsx` updated to support Standard/Semantic search mode toggle.
- [ ] `PopularPublishes.tsx` updated to fetch search results dynamically in-place using `/api/search` when queries or filters are active.
- [ ] Search input submit handlers (Enter, Search button click) mapped to trigger database logging, while live typing performs non-logging fetches.
- [ ] Filter panel adjustments with or without queries trigger database logs.
- [ ] Click-through interaction logging correctly maps search results clicks to the active history entry.
