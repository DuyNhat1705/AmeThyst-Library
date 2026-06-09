import gzip
import json
from neo4j import GraphDatabase

URI = "bolt://localhost:7687"
AUTH = ("", "")  # Default Memgraph credentials

def get_top_book_ids(books_file, target_count=7500):
    """Scans the main file to find the most popular books to build a dense graph."""
    print("Scanning dataset to find the most interconnected books...")
    books_pool = []
    
    with gzip.open(books_file, 'rt', encoding='utf-8') as f:
        for line in f:
            try:
                data = json.loads(line)
                b_id = data.get("book_id")
                reviews = int(data.get("text_reviews_count") or 0)
                if b_id:
                    books_pool.append((b_id, reviews))
            except:
                continue
                
    # Sort by review count descending and slice
    books_pool.sort(key=lambda x: x[1], reverse=True)
    target_ids = {item[0] for item in books_pool[:target_count]}
    print(f"Target catalog initialized with {len(target_ids)} high-density Book IDs.")
    return target_ids

def run_cypher_batch(driver, query, batch):
    with driver.session() as session:
        session.run(query, batch=batch)

def ingest_all_data():
    # File Paths
    BOOKS_FILE = r"D:\goodreads_books.json.gz"
    WORKS_FILE = r"D:\goodreads_book_works.json.gz"
    SERIES_FILE = r"D:\goodreads_book_series.json.gz"
    GENRES_FILE = r"D:\goodreads_book_genres_initial.json.gz"
    AUTHORS_FILE = r"D:\goodreads_book_authors.json.gz"

    driver = GraphDatabase.driver(URI, auth=AUTH)
    
    # 1. Get our bounded ID set
    allowed_book_ids = get_top_book_ids(BOOKS_FILE, target_count=7500)

    # 2. Ingest Base Books (Updated with Physical Attributes)
    print("\n--- Phase 1: Ingesting Base Books with Physical Attributes ---")
    book_query = """
    UNWIND $batch AS row
    MERGE (b:Book {id: row.book_id})
    SET b.title = row.title,
        b.isbn = row.isbn,
        b.average_rating = toFloat(row.average_rating),
        b.description = row.description,
        b.num_pages = toInteger(row.num_pages),
        b.format = row.format,
        b.publication_year = toInteger(row.publication_year)
    """
    batch = []
    with gzip.open(BOOKS_FILE, 'rt', encoding='utf-8') as f:
        for line in f:
            data = json.loads(line)
            bid = data.get("book_id")
            if bid in allowed_book_ids:
                batch.append({
                    "book_id": bid, 
                    "title": data.get("title"),
                    "isbn": data.get("isbn"), 
                    "average_rating": data.get("average_rating", 0),
                    "description": data.get("description", ""),
                    "num_pages": data.get("num_pages") or 0,
                    "format": data.get("format") or "Unknown",
                    "publication_year": data.get("publication_year") or 0
                })
                if len(batch) >= 1000:
                    run_cypher_batch(driver, book_query, batch)
                    batch = []
        if batch: run_cypher_batch(driver, book_query, batch)

    # 3. Ingest Authors
    print("\n--- Phase 2: Mapping Authors ---")
    author_query = """
    UNWIND $batch AS row
    MERGE (a:Author {id: row.author_id})
    SET a.name = row.name
    WITH a, row
    MATCH (b:Book {id: row.book_id})
    MERGE (b)-[:WRITTEN_BY]->(a)
    """
    batch = []
    # We parse the author metadata file but only create links for our existing books
    with gzip.open(BOOKS_FILE, 'rt', encoding='utf-8') as f: # authors links are inline inside books file
        for line in f:
            data = json.loads(line)
            bid = data.get("book_id")
            if bid in allowed_book_ids:
                for author_entry in data.get("authors", []):
                    aid = author_entry.get("author_id")
                    if aid:
                        batch.append({"book_id": bid, "author_id": aid, "name": f"Author {aid}"}) # Placeholder name updated next
                if len(batch) >= 1000:
                    run_cypher_batch(driver, author_query, batch)
                    batch = []
        if batch: run_cypher_batch(driver, author_query, batch)

    # Enrich Author Names from authors file
    print("Enriching real author names...")
    author_name_query = """
    UNWIND $batch AS row
    MATCH (a:Author {id: row.author_id})
    SET a.name = row.name
    """
    batch = []
    with gzip.open(AUTHORS_FILE, 'rt', encoding='utf-8') as f:
        for line in f:
            data = json.loads(line)
            aid = data.get("author_id")
            batch.append({"author_id": aid, "name": data.get("name")})
            if len(batch) >= 1000:
                run_cypher_batch(driver, author_name_query, batch)
                batch = []
        if batch: run_cypher_batch(driver, author_name_query, batch)

    # 4. Ingest Works (Mapping Editions to a Single Abstract Work)
    print("\n--- Phase 3: Linking Book Editions to Abstract Works ---")
    work_query = """
    UNWIND $batch AS row
    MATCH (b:Book {id: row.book_id})
    MERGE (w:Work {id: row.work_id})
    MERGE (b)-[:BELONGS_TO_WORK]->(w)
    """
    batch = []
    with gzip.open(WORKS_FILE, 'rt', encoding='utf-8') as f:
        for line in f:
            data = json.loads(line)
            bid = data.get("book_id")
            wid = data.get("work_id")
            if bid in allowed_book_ids and wid:
                batch.append({"book_id": bid, "work_id": wid})
                if len(batch) >= 1000:
                    run_cypher_batch(driver, work_query, batch)
                    batch = []
        if batch: run_cypher_batch(driver, work_query, batch)

    # 5. Ingest Book Series
    print("\n--- Phase 4: Constructing Book Series ---")
    series_query = """
    UNWIND $batch AS row
    MATCH (b:Book {id: row.book_id})
    MERGE (s:Series {id: row.series_id})
    SET s.title = row.title
    MERGE (b)-[:PART_OF_SERIES {numbered: row.numbered}]->(s)
    """
    batch = []
    with gzip.open(SERIES_FILE, 'rt', encoding='utf-8') as f:
        for line in f:
            data = json.loads(line)
            # Series maps usually work on a list of book_ids in that series
            sid = data.get("series_id")
            stitle = data.get("title")
            for work in data.get("books", []):
                bid = work.get("book_id")
                num = work.get("numbered")
                if bid in allowed_book_ids:
                    batch.append({"book_id": bid, "series_id": sid, "title": stitle, "numbered": num})
            if len(batch) >= 1000:
                run_cypher_batch(driver, series_query, batch)
                batch = []
        if batch: run_cypher_batch(driver, series_query, batch)

    # 6. Ingest Genres
    print("\n--- Phase 5: Attaching Genres & Weights ---")
    genre_query = """
    UNWIND $batch AS row
    MATCH (b:Book {id: row.book_id})
    MERGE (g:Genre {name: row.genre_name})
    MERGE (b)-[:HAS_GENRE {weight: toInteger(row.count)}]->(g)
    """
    batch = []
    with gzip.open(GENRES_FILE, 'rt', encoding='utf-8') as f:
        for line in f:
            data = json.loads(line)
            bid = data.get("book_id")
            if bid in allowed_book_ids:
                genres = data.get("genres", {})
                for genre_name, count in genres.items():
                    batch.append({"book_id": bid, "genre_name": genre_name, "count": count})
                if len(batch) >= 1000:
                    run_cypher_batch(driver, genre_query, batch)
                    batch = []
        if batch: run_cypher_batch(driver, genre_query, batch)

    driver.close()
    print("\nGraph successfully populated and optimized for discovery algorithms!")

if __name__ == "__main__":
    ingest_all_data()