# Research: Genre-Filtered Discovery

## Decisions

### 1. Genre Retrieval Pattern
**Decision**: Use a dedicated API endpoint `/api/genres` that executes a simple Cypher query on Memgraph.
**Rationale**: Dynamically fetching genres from the database ensures the UI always matches the current catalog without manual updates to the frontend.
**Query**: `MATCH (g:Genre) RETURN g.name AS name ORDER BY name`

### 2. Filtered Surfing Query
**Decision**: Modify `getSurfingBooks` to accept an optional `genre` parameter and update the Cypher query to join with the `Genre` node when provided.
**Rationale**: Keeps the logic centralized in a single service function.
**Query Pattern**:
```cypher
MATCH (b:Book)
WHERE ($genre IS NULL OR (b)-[:HAS_GENRE]->(:Genre {name: $genre}))
RETURN b.id AS id, b.title AS title, b.isbn AS isbn, b.isbn13 AS isbn13
SKIP $skip LIMIT $limit
```

### 3. Navigation Dropdown Implementation
**Decision**: Implement a CSS-based hover dropdown in `NavBar.js`.
**Rationale**: Minimizes JavaScript state complexity for simple navigation. The "Discovery" link will be wrapped in a container that displays a absolute-positioned list of genre links on hover.

### 4. Client-side State Management
**Decision**: Use URL query parameters (`/surfing?genre=Fantasy`) to drive the feed.
**Rationale**: Allows for bookmarking, sharing links to specific categories, and utilizes Next.js routing patterns.

## Alternatives Considered

- **Hardcoded Genre List**: Rejected because it requires redeployment when new genres are added to the dataset.
- **Client-side Filtering**: Rejected because the dataset is too large (7500+ books) and we use server-side pagination.
- **Separate Page for Each Genre**: Rejected to maintain the "surfing" experience in a single, fluid view.
