# API Contract: Book Searching & Dynamic Filtering

## 1. Execute Book Search (Standard & Semantic)
**Endpoint**: `POST /api/search`

### Request Body
```json
{
  "query": "dystopian rebellion",
  "searchMode": "semantic",
  "logHistory": true,
  "filters": {
    "publicationDate": {
      "start": "2010",
      "end": "2026"
    },
    "genres": ["Sci-Fi", "Fiction"],
    "branches": [1],
    "availableOnly": true
  }
}
```

*Note: `logHistory` decides whether the search execution results in a persistent log database write. Live keystroke debounces pass `logHistory: false`; User submission clicks, Enters, or Filter changes pass `logHistory: true`.*

### Success Response (200 OK)
```json
{
  "books": [
    {
      "id": "book_1",
      "title": "Fahrenheit 451",
      "author": "Ray Bradbury",
      "description": "Guy Montag is a fireman. His job is to destroy the most illegal of commodities...",
      "genres": ["Fiction", "Sci-Fi"],
      "isbn": "978-1451673319",
      "publisher": "Simon & Schuster",
      "publicationDate": "2012-01-10T00:00:00Z",
      "pageCount": 256,
      "language": "en",
      "coverImage": "/fahrenheit451.png"
    }
  ],
  "totalResults": 1,
  "searchHistoryId": "log_888"
}
```

*Note: If `logHistory: false` or the user is not logged in, `searchHistoryId` returns `null`.*

### Empty Matches Response (200 OK)
```json
{
  "books": [],
  "totalResults": 0,
  "searchHistoryId": null
}
```

---

## 2. Get User Search History
**Endpoint**: `GET /api/search/history`
**Headers**: `Authorization: Bearer <token>`

### Success Response (200 OK)
```json
{
  "history": [
    {
      "id": "log_888",
      "searchContent": "Query: \"dystopian rebellion\" | Filters: { Genres: [Sci-Fi, Fiction]; Branches: [1]; Years: 2010 - 2026; Available Only }",
      "searchMode": "semantic",
      "filters": {
        "publicationDate": { "start": "2010", "end": "2026" },
        "genres": ["Sci-Fi", "Fiction"],
        "branches": [1],
        "availableOnly": true
      },
      "clickedBookIds": ["book_1"],
      "timestamp": "2026-06-24T09:12:35Z"
    }
  ]
}
```

### Unauthorized Response (401 Unauthorized)
```json
{
  "error": "Authentication required to access search history"
}
```

---

## 3. Log Book Interaction (Intent Clicks)
**Endpoint**: `POST /api/search/history/click`
**Headers**: `Authorization: Bearer <token>`

### Request Body
```json
{
  "searchHistoryId": "log_888",
  "bookId": "book_1"
}
```

### Success Response (200 OK)
```json
{
  "message": "Click interaction logged successfully",
  "searchHistoryId": "log_888",
  "clickedBookIds": ["book_1"]
}
```

### Bad Request Response (400 Bad Request)
```json
{
  "error": "Missing searchHistoryId or bookId"
}
```

### Unauthorized Response (401 Unauthorized)
```json
{
  "error": "Authentication required to log click interaction"
}
```
