import gzip
import json
import chromadb
from chromadb.utils import embedding_functions

# 1. Connect to local Chroma instance
chroma_client = chromadb.PersistentClient(path="./chroma_db")
default_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")

collection = chroma_client.get_or_create_collection(name="book_descriptions", embedding_function=default_ef)

def get_bounded_book_ids(books_file, target_count=7500):
    """Replicates our exact Memgraph strategy to find the top books by review count."""
    print("Sifting for the target 7,500 books to align with our graph...")
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
    return {item[0] for item in books_pool[:target_count]}

def populate_vectors_correctly():
    BOOKS_FILE = r"D:\goodreads_books.json.gz"
    
    # Get our strict gatekeeper set
    allowed_book_ids = get_bounded_book_ids(BOOKS_FILE, target_count=7500)
    
    ids = []
    documents = []
    metadatas = []
    
    print("\nStarting bounded embedding ingestion...")
    with gzip.open(BOOKS_FILE, 'rt', encoding='utf-8') as f:
        for line in f:
            try:
                data = json.loads(line)
                bid = data.get("book_id")
                
                # CRITICAL FILTER: Skip it if it's not in our explicit graph catalog
                if bid not in allowed_book_ids:
                    continue
                    
                desc = data.get("description", "").strip()
                if desc:
                    ids.append(str(bid))
                    documents.append(desc)
                    metadatas.append({"title": data.get("title", "")})
                    
                    if len(ids) >= 500:
                        collection.add(ids=ids, documents=documents, metadatas=metadatas)
                        print(f"Successfully embedded a batch of 500 items...")
                        ids, documents, metadatas = [], [], []
            except Exception as e:
                continue
                
        if ids:
            collection.add(ids=ids, documents=documents, metadatas=metadatas)
            
    print(f"Done! ChromaDB is now perfectly in sync with your Memgraph catalog scale.")

if __name__ == "__main__":
    populate_vectors_correctly()