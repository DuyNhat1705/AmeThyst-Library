import os
import sys
from dotenv import load_dotenv
from neo4j import GraphDatabase

# Load configurations
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
ENV_PATH = os.path.join(ROOT_DIR, ".env")
load_dotenv(ENV_PATH)
load_dotenv()

CYPHER_FILE_PATH = os.path.join(SCRIPT_DIR, "datagraph_backup.cypher")

def deploy_to_memgraph_cloud():
    cloud_uri = os.getenv("MEMGRAPH_URI_SERVER")
    cloud_user = os.getenv("MEMGRAPH_USER_SERVER")
    cloud_password = os.getenv("MEMGRAPH_PASSWORD")

    if not cloud_uri:
        print("[Error] MEMGRAPH_URI_SERVER (or MEMGRAPH_URI) environment variable is missing!")
        sys.exit(1)

    print(f"Connecting to Memgraph Cloud instance at {cloud_uri}...")
    driver = GraphDatabase.driver(cloud_uri, auth=(cloud_user, cloud_password) if cloud_user and cloud_password else None)

    if not os.path.exists(CYPHER_FILE_PATH):
        print(f"[Error] Cypher dump file not found at: {CYPHER_FILE_PATH}")
        sys.exit(1)

    print(f"Reading Cypher backup dump from {CYPHER_FILE_PATH}...")
    with open(CYPHER_FILE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    statements = [s.strip() for s in content.split(";") if s.strip()]

    try:
        with driver.session() as session:
            print("Wiping existing graph on Memgraph Cloud...")
            session.run("MATCH (n) DETACH DELETE n;")

            print(f"Restoring {len(statements)} Cypher statements to Memgraph Cloud...")
            success_count = 0
            for stmt in statements:
                if stmt.startswith("//") or stmt.startswith("#"):
                    continue
                try:
                    session.run(stmt + ";")
                    success_count += 1
                except Exception as stmt_err:
                    print(f" Note on statement execution: {stmt_err}")

            print(f"Successfully restored {success_count}/{len(statements)} statements.")

            res = session.run("MATCH (n) RETURN count(n) AS total_nodes;")
            total_nodes = res.single()["total_nodes"]
            print(f" Memgraph Cloud deployment complete! Total nodes verified: {total_nodes}")

    except Exception as e:
        print(f"[Error] Memgraph Cloud deployment failed: {e}")
        sys.exit(1)
    finally:
        driver.close()

if __name__ == "__main__":
    deploy_to_memgraph_cloud()
