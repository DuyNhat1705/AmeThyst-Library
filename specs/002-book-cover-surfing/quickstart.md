# Quickstart: Genre-Filtered Discovery

## Development Setup

1. **Backend**:
   - Ensure Memgraph is running (`bolt://localhost:7687`).
   - Run the Node.js server: `cd src/server && npm run dev` (or equivalent).
   - Test the new endpoint: `curl http://localhost:5000/api/genres`

2. **Frontend**:
   - Run the Next.js app: `cd src/client && npm run dev`
   - Navigate to `/surfing` in your browser.

## Verification Steps

1. **Dropdown Visibility**: Hover over "Discovery" in the NavBar. A list of genres should appear.
2. **Genre Selection**: Click "Fantasy". The URL should change to `/surfing?genre=Fantasy`.
3. **Feed Refresh**: The book grid should clear and reload with only Fantasy books.
4. **Infinite Scroll**: Scroll to the bottom of the filtered list. More Fantasy books should load.
5. **Reset**: Click the main "Discovery" link (without a genre) to return to the all-book feed.
