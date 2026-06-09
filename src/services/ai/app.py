from fastapi import FastAPI, Query
import chromadb
from chromadb.utils import embedding_functions
import os
import uvicorn

app = FastAPI(title="Amethyst AI Search Service")

# Resolve Chroma path relative to project root
# Assuming app.py is in src/services/ai/
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
CHROMA_DATA_PATH = os.path.join(BASE_DIR, "chroma_db")
COLLECTION_NAME = "book_descriptions"

print(f"Connecting to ChromaDB at: {CHROMA_DATA_PATH}")

# Initialize Chroma Client and Embedding Function
client = chromadb.PersistentClient(path=CHROMA_DATA_PATH)
embedding_func = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
collection = client.get_collection(name=COLLECTION_NAME, embedding_function=embedding_func)

@app.get("/api/search/semantic")
async def semantic_search(q: str = Query(...), limit: int = 20):
    try:
        results = collection.query(
            query_texts=[q],
            n_results=limit,
            include=["documents", "metadatas", "distances"]
        )
        
        # Format results for Node.js
        formatted_results = []
        if results['ids'] and len(results['ids']) > 0:
            for i in range(len(results['ids'][0])):
                formatted_results.append({
                    "book_id": results['ids'][0][i],
                    "score": float(results['distances'][0][i]),
                    "title": results['metadatas'][0][i].get("title", "Unknown")
                })
                
        return {"results": formatted_results}
    except Exception as e:
        return {"error": str(e), "results": []}

@app.get("/health")
async def health():
    return {"status": "ok", "collection_count": collection.count()}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
