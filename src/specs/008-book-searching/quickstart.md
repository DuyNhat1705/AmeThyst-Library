# Quickstart: Book Searching Validation

This guide provides step-by-step scenarios to validate the "Book Searching" feature end-to-end.

## Prerequisites
- **Backend Server**: Running on `http://localhost:5000`
- **Frontend Client**: Running on `http://localhost:3000`
- **PostgreSQL Database**: Running and configured with the pgvector extension enabled, containing sample book vector embeddings.
- **Environment**:
  - Frontend `.env.local` contains `NEXT_PUBLIC_API_URL=http://localhost:5000`
  - Backend `.env` contains PostgreSQL database credentials.

---

## Validation Scenarios

### Scenario 1: Standard Search (OPAC)
1. **Action**: Open the browser, go to the Search page (`http://localhost:3000/search`), and select "Standard Search".
2. **Action**: Enter a partial title (e.g., "Harry Potter") or author name (e.g., "Tolkien") in the search input and click the "Search" button.
3. **Expectation**:
    - Result list updates to display matching book cards.
    - Matches highlight matching text in title/author if applicable.
    - Executing is fast (< 200ms).

### Scenario 2: Semantic Search (Description Matching)
1. **Action**: On the Search page, toggle the mode to "Semantic Search".
2. **Action**: Enter a natural language theme or conceptual description (e.g., "a story about rings, elves, and an evil lord in Middle Earth") and click "Search".
3. **Expectation**:
    - System displays a brief loading/searching state.
    - System retrieves matching books from the PostgreSQL database using pgvector cosine distance.
    - "The Lord of the Rings" or relevant titles appear at the top of the search results grid.

### Scenario 3: Apply Metadata Filters
1. **Action**: Perform a search (either Standard or Semantic).
2. **Action**: From the filter sidebar, select Genre = "Sci-Fi", Language = "English", Page Count = "100-300 pages", and Publication Year = "2010 - 2025".
3. **Expectation**:
    - The search results list updates instantly to display only books meeting ALL specified conditions.
    - Clear Filter badges appear for each selected filter option.

### Scenario 4: No Matches Scenario
1. **Action**: Enter an obscure random string (e.g., "qwertyuiopasdfg") in the search input and execute search.
2. **Expectation**:
    - The results grid displays a friendly screen: "No books found matching your request."
    - Suggestions such as "Check your spelling", "Try fewer filters", or "Toggle to Semantic Search" are displayed.

### Scenario 5: Search History Logging (User Preferences)
1. **Action**: Log in to a registered user account.
2. **Action**: Execute a search for "adventure novels" in Semantic mode with Genre = "Action" filter active.
3. **Action**: Execute another search as a guest/unauthenticated user.
4. **Expectation**:
    - Logged-in user's search is logged in the `SearchHistory` table (verified via backend console log or Database check).
    - Guest user's search is NOT logged in the database.
