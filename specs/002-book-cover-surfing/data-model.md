# Data Model: Genre-Filtered Discovery

## Memgraph (Graph Database)

### Nodes

| Label | Property | Type | Description |
|-------|----------|------|-------------|
| Book  | id       | String | Unique identifier |
| Book  | title    | String | Book title |
| Book  | isbn     | String | 10-digit ISBN |
| Book  | isbn13   | String | 13-digit ISBN |
| Genre | name     | String | Unique genre name (e.g., "Fantasy", "Science Fiction") |

### Relationships

| Start Node | Relationship | End Node | Properties | Description |
|------------|--------------|----------|------------|-------------|
| Book       | HAS_GENRE    | Genre    | weight (Int) | Associative strength between book and genre |

## API Contracts

### 1. Retrieve Genres
**Endpoint**: `GET /api/genres`
**Response**: `string[]`
**Example**: `["Fantasy", "History", "Mystery", "Poetry"]`

### 2. Filtered Surfing
**Endpoint**: `GET /api/books/surfing`
**Parameters**:
- `limit` (Int, default 20): Number of books to return.
- `skip` (Int, default 0): Offset for pagination.
- `genre` (String, optional): Name of the genre to filter by.
**Response**: `Book[]`
```json
[
  {
    "id": "123",
    "title": "The Hobbit",
    "isbn": "0345339681",
    "isbn13": "9780345339683",
    "coverUrl": "..."
  }
]
```
