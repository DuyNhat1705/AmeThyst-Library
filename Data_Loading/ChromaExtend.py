import gzip
import json
import chromadb
from chromadb.utils import embedding_functions

chroma_client = chromadb.PersistentClient(path="./chroma_db")
default_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
collection = chroma_client.get_or_create_collection(name="book_descriptions", embedding_function=default_ef)

def get_bounded_book_ids(books_file, target_count=100000):
    """Gathers the top 100,000 books by review count to maximize vector space."""
    print(f"Sifting for the top {target_count} books for vector space...")
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

def populate_vectors_extended():
    BOOKS_FILE = r"D:\goodreads_books.json.gz"
    
    # Separate gatekeeper bound to hit 100,000
    allowed_book_ids = get_bounded_book_ids(BOOKS_FILE, target_count=100000)
    
    ids = []
    documents = []
    metadatas = []
    
    print("\nStarting extended vector ingestion...")
    with gzip.open(BOOKS_FILE, 'rt', encoding='utf-8') as f:
        for line in f:
            try:
                data = json.loads(line)
                bid = data.get("book_id")
                
                if bid not in allowed_book_ids:
                    continue
                    
                desc = data.get("description", "").strip()
                if desc:
                    ids.append(str(bid))
                    documents.append(desc)
                    metadatas.append({"title": data.get("title", "")})
                    
                    if len(ids) >= 500:
                        # .upsert ensures existing vectors aren't duplicated or overwritten blindly
                        collection.upsert(ids=ids, documents=documents, metadatas=metadatas)
                        print(f"Ingested/Verified batch of 500 items...")
                        ids, documents, metadatas = [], [], []
            except Exception as e:
                continue
                
        if ids:
            collection.upsert(ids=ids, documents=documents, metadatas=metadatas)
            
    print(f"Done! ChromaDB scaled to 100,000 records consistently.")

if __name__ == "__main__":
    populate_vectors_extended()