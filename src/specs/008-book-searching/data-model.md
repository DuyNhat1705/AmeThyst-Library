# Data Model: Book Searching

## Entities

### Book
Represents the bibliographic information for a book. Both standard metadata and the description vector embedding are stored in PostgreSQL, utilizing the pgvector extension.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (UUID or database ID) |
| title | string | Full title of the book |
| author | string | Full name of the author |
| description | string | Detailed synopsis of the book content |
| genres | array[string] | List of categories/subjects |
| isbn | string | International Standard Book Number |
| publisher | string | Name of the publisher |
| publicationDate | date | The date when the book was published |
| pageCount | number | Total number of pages |
| language | string | Primary language of the text (e.g., "en", "vi") |
| coverImage | string | Path to the cover image asset |
| embedding | vector | Vector representation (e.g., 384 or 1536 dimensions) of `description` for pgvector similarity matching |

### SearchHistory
Represents the logs of queries ran by authenticated (logged-in) users.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique log entry ID |
| userId | string | Reference to User.id (logged-in user) |
| query | string | The search term or semantic description input |
| searchMode | string | The mode of search: "standard" or "semantic" |
| filters | object | JSON object of applied filters (dateRange, genres, pageRange, languages) |
| timestamp | datetime | When the search was executed |

## Relationships
- **User (1) -> (N) SearchHistory**: A logged-in user has multiple search history log entries. Guest users have none.
- **Book (1) -> (1) pgvector Embedding**: Each Book has an associated vector embedding column inside PostgreSQL, allowing similarity queries to be performed alongside metadata filtering in standard SQL queries.
