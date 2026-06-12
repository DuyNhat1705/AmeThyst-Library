import gzip
import json
from neo4j import GraphDatabase

URI = "bolt://localhost:7687"
AUTH = ("", "") 

def get_top_book_ids(books_file, target_count=50000):
    """Scans the main file to find the top 50,000 most popular books."""
    print(f"Scanning dataset to isolate the top {target_count} high-density Book IDs...")
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
                
    books_pool.sort(key=lambda x: x[1], reverse=True)
    target_ids = {item[0] for item in books_pool[:target_count]}
    print(f"Target catalog initialized with {len(target_ids)} Book IDs.")
    return target_ids

def run_cypher_batch(driver, query, batch):
    with driver.session() as session:
        session.run(query, batch=batch)

def ingest_extended_data():
    BOOKS_FILE = r"D:\goodreads_books.json.gz"
    WORKS_FILE = r"D:\goodreads_book_works.json.gz"
    SERIES_FILE = r"D:\goodreads_book_series.json.gz"
    GENRES_FILE = r"D:\goodreads_book_genres_initial.json.gz"
    AUTHORS_FILE = r"D:\goodreads_book_authors.json.gz"

    driver = GraphDatabase.driver(URI, auth=AUTH)
    
    # 1. Expand the gatekeeper pool to 50,000
    allowed_book_ids = get_top_book_ids(BOOKS_FILE, target_count=50000)

    # 2. Ingest Base Books 
    print("\n--- Phase 1: Extending Base Books to 50,000 ---")
    book_query = """
    UNWIND $batch AS row
    MERGE (b:Book {id: row.book_id})
    ON CREATE SET 
        b.title = row.title,
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
                if len(batch) >= 2000: # Increased batch size for faster processing
                    run_cypher_batch(driver, book_query, batch)
                    batch = []
        if batch: run_cypher_batch(driver, book_query, batch)

    # [Keep Phase 2, 3, 4, and 5 from your original Data_Loading.py file here]
    # They will naturally process the new 50,000 boundary because `allowed_book_ids` was expanded.

    driver.close()
    print("\nMemgraph successfully extended to 50,000 books!")

if __name__ == "__main__":
    ingest_extended_data()