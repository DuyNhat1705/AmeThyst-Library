# API Contract: Book Searching

## 1. Execute Book Search (Standard & Semantic)
**Endpoint**: `POST /api/search`

### Request Body
```json
{
  "query": "dystopian rebellion",
  "searchMode": "semantic",
  "filters": {
    "publicationDate": {
      "start": "2010",
      "end": "2026"
    },
    "genres": ["Sci-Fi", "Dystopian"],
    "pageRange": {
      "min": 100,
      "max": 500
    },
    "languages": ["en"]
  }
}
```

### Success Response (200 OK)
```json
{
  "books": [
    {
      "id": "book_1",
      "title": "Fahrenheit 451",
      "author": "Ray Bradbury",
      "description": "Guy Montag is a fireman. His job is to destroy the most illegal of commodities...",
      "genres": ["Dystopian", "Sci-Fi"],
      "isbn": "978-1451673319",
      "publisher": "Simon & Schuster",
      "publicationDate": "2012-01-10T00:00:00Z",
      "pageCount": 256,
      "language": "en",
      "coverImage": "/fahrenheit451.png"
    }
  ],
  "totalResults": 1
}
```

### Empty Matches Response (200 OK)
```json
{
  "books": [],
  "totalResults": 0
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
      "query": "dystopian rebellion",
      "searchMode": "semantic",
      "filters": {
        "publicationDate": { "start": "2010", "end": "2026" },
        "genres": ["Sci-Fi", "Dystopian"],
        "pageRange": { "min": 100, "max": 500 },
        "languages": ["en"]
      },
      "timestamp": "2026-06-21T09:12:35Z"
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
