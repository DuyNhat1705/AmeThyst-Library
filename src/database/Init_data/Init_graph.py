import os
from dotenv import load_dotenv
from neo4j import GraphDatabase

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
ENV_PATH = os.path.join(ROOT_DIR, ".env")
load_dotenv(ENV_PATH)

# Database Connection Configurations
MEMGRAPH_URI = "bolt://localhost:7687"  # Use loopback that matches active network bind
MEMGRAPH_USER = os.getenv("MEMGRAPH_USER")
MEMGRAPH_PASSWORD = os.getenv("MEMGRAPH_PASSWORD")
CSV_DIR = "/csv_data"

CONSTRAINTS_AND_CLEANUP = [
    "MATCH (n) DETACH DELETE n;",
    "CREATE CONSTRAINT ON (b:Book) ASSERT b.id IS UNIQUE;",
    "CREATE CONSTRAINT ON (br:Branch) ASSERT br.id IS UNIQUE;",
    "CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE;",
    "CREATE CONSTRAINT ON (a:Author) ASSERT a.name IS UNIQUE;",
    "CREATE CONSTRAINT ON (g:Genre) ASSERT g.name IS UNIQUE;"
]

IMPORT_QUERIES = [
    # --- 1. IMPORT BRANCHES ---
    """
    LOAD CSV FROM $branches_url WITH HEADER AS row
    CREATE (:Branch {
      id: toInteger(row.branch_id),
      name: row.name_short,
      address: row.address
    });
    """,
    
    # --- 2. IMPORT USERS ---
    """
    LOAD CSV FROM $users_url WITH HEADER AS row
    CREATE (:User {
      id: row.user_id,
      username: row.username,
      role: row.role
    });
    """,
    
    # --- 3. IMPORT BOOKS WITH ARRAY PRE-SPLITTING ---
    """
    LOAD CSV FROM $books_url WITH HEADER AS row
    WITH row,
         substring(row.genres, 1, size(row.genres) - 2) AS clean_genres_str,
         substring(row.author, 1, size(row.author) - 2) AS clean_authors_str
    WITH row,
         split(clean_genres_str, ",") AS genres_list,
         split(clean_authors_str, ",") AS authors_list

    MERGE (b:Book { id: row.book_id })
    SET b.title = row.title,
        b.description = coalesce(row.description, "No description available"),
        b.publication = coalesce(row.publication, "Unknown"),
        b.num_pages = toInteger(row.num_pages),
        b.rating = toFloat(row.rating),
        b.language_code = coalesce(row.language_code, "en"),
        b.embedding = row.embedding

    WITH b, genres_list, authors_list
    UNWIND authors_list AS single_author
    WITH b, genres_list, trim(single_author) AS clean_author
    WHERE clean_author <> ""
    MERGE (a:Author { name: clean_author })
    MERGE (b)-[:WRITTEN_BY]->(a)

    WITH b, genres_list
    UNWIND genres_list AS single_genre
    WITH b, trim(single_genre) AS clean_genre
    WHERE clean_genre <> ""
    MERGE (g:Genre { name: clean_genre })
    MERGE (b)-[:HAS_GENRE]->(g);
    """,
    
    # --- 4. IMPORT INVENTORY RELATIONSHIPS (LIBRARY) ---
    """
    LOAD CSV FROM $library_url WITH HEADER AS row
    MATCH (b:Book { id: row.book_id })
    MATCH (br:Branch { id: toInteger(row.branch_id) })
    CREATE (b)-[:AVAILABLE_AT {
      quantity: toInteger(row.quantity),
      available_quantity: toInteger(row.available_quantity)
    }]->(br);
    """,
    
    # --- 5. IMPORT SEARCH LOG CONNECTIONS ---
    """
    LOAD CSV FROM $searches_url WITH HEADER AS row
    WITH row 
    WHERE row.user_id IS NOT NULL AND row.book_clicked IS NOT NULL AND row.book_clicked <> ""
    
    MERGE (u:User { id: row.user_id })
    
    WITH u, row 
    
    MATCH (b:Book { id: row.book_clicked })
    
    CREATE (u)-[:SEARCHED {
      search_id: row.search_id,
      created_at: row.created_at,
      query: coalesce(row.search_content, "Raw Navigation Click")
    }]->(b);
    """,
  
    # --- 6. IMPORT BORROW BOOK ACTIONS ---
    """
    LOAD CSV FROM $borrow_url WITH HEADER AS row
    MERGE (u:User { id: row.user_id })
    MERGE (b:Book { id: row.book_id })
    WITH u, b, row
    MATCH (br:Branch { id: toInteger(row.branch_id) })
    CREATE (u)-[:BORROWED {
      id: row.borrow_id,
      reserve_date: row.reserve_date,
      borrow_date: row.borrow_date,
      due_date: row.due_date
    }]->(b)-[:FROM_BRANCH]->(br);
    """,
    
    # --- 7. IMPORT RETURN BOOK ACTIONS ---
    """
    LOAD CSV FROM $return_url WITH HEADER AS row
    MATCH (b:Book { id: row.book_id })
    MERGE (u:User { id: row.user_id })
    CREATE (u)-[:RETURNED {
      return_id: row.return_id,
      return_date: row.return_date
    }]->(b);
    """,
    
    # --- 8. FIXED: IMPORT USER WISHLISTS (Was missing entirely) ---
    """
    LOAD CSV FROM $wishlists_url WITH HEADER AS row
    MERGE (u:User { id: row.user_id })
    MERGE (b:Book { id: row.book_id })
    CREATE (u)-[:WISHED {
      wish_id: row.wish_id,
      added_at: row.added_at
    }]->(b);
    """
]

def run_graph_initialization():
    def get_file_url(filename):
        return f"csv_data/{filename}"
        
    print("Connecting to Memgraph instance...")
    driver = GraphDatabase.driver(MEMGRAPH_URI, auth=(MEMGRAPH_USER, MEMGRAPH_PASSWORD))
    
    with driver.session() as session:
        print("Wiping old graph context and establishing unique constraints...")
        for cmd in CONSTRAINTS_AND_CLEANUP:
            try:
                session.run(cmd)
            except Exception as e:
                print(f" Note on constraint/cleanup step: {e}")

        params = {
            "branches_url": get_file_url("branches.csv"),
            "users_url": get_file_url("users.csv"),
            "books_url": get_file_url("books.csv"),
            "library_url": get_file_url("library.csv"),
            "searches_url": get_file_url("searches.csv"),
            "borrow_url": get_file_url("borrow.csv"),
            "return_url": get_file_url("returns.csv"),
            "wishlists_url": get_file_url("user_wishlists.csv")
        }

        print("Executing sequential CSV ingestion scripts...")
        for idx, query in enumerate(IMPORT_QUERIES, start=1):
            print(f"Running pipeline step {idx}/{len(IMPORT_QUERIES)}...")
            session.run(query, **params)
            
    driver.close()
    print("Graph topology successfully initialized and synced with Wishlist & Recommendation properties!")

if __name__ == "__main__":
    run_graph_initialization()