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

def split_cypher_statements(script_content):
    """
    Splits a Cypher script into individual statements by semicolon,
    respecting single/double quotes, escape characters, and comments.
    """
    statements = []
    current = []
    in_single_quote = False
    in_double_quote = False
    in_comment = False
    escape = False

    i = 0
    length = len(script_content)

    while i < length:
        char = script_content[i]

        if in_comment:
            if char == '\n':
                in_comment = False
            i += 1
            continue

        if not in_single_quote and not in_double_quote and i + 1 < length and script_content[i:i+2] == '//':
            in_comment = True
            i += 2
            continue

        if escape:
            current.append(char)
            escape = False
            i += 1
            continue

        if char == '\\':
            current.append(char)
            escape = True
            i += 1
            continue

        if char == "'" and not in_double_quote:
            in_single_quote = not in_single_quote
            current.append(char)
            i += 1
            continue

        if char == '"' and not in_single_quote:
            in_double_quote = not in_double_quote
            current.append(char)
            i += 1
            continue

        if char == ';' and not in_single_quote and not in_double_quote:
            stmt = "".join(current).strip()
            if stmt:
                statements.append(stmt)
            current = []
            i += 1
            continue

        current.append(char)
        i += 1

    last_stmt = "".join(current).strip()
    if last_stmt:
        statements.append(last_stmt)

    return statements

def deploy_to_memgraph_cloud():
    # 1. Environment Variable Fallback Resolution
    cloud_uri = os.getenv("MEMGRAPH_URI_SERVER") or os.getenv("MEMGRAPH_URI")
    if not cloud_uri and os.getenv("MEMGRAPH_HOST"):
        host = os.getenv("MEMGRAPH_HOST")
        port = os.getenv("MEMGRAPH_PORT") or "7687"
        cloud_uri = f"bolt://{host}:{port}"

    cloud_user = os.getenv("MEMGRAPH_USER_SERVER") or os.getenv("MEMGRAPH_USER")
    cloud_password = os.getenv("MEMGRAPH_PASSWORD")

    if not cloud_uri:
        print("[Error] Neither MEMGRAPH_URI_SERVER nor MEMGRAPH_URI environment variable is configured!")
        sys.exit(1)

    print(f"Connecting to Memgraph Cloud instance at {cloud_uri}...")

    # 2. SSL & Protocol Handshake Configuration for Raw IPs / Self-Signed Certs
    driver_kwargs = {}
    if cloud_uri.startswith("bolt://"):
        driver_kwargs["encrypted"] = False

    auth_tuple = (cloud_user, cloud_password) if (cloud_user and cloud_password) else None

    try:
        driver = GraphDatabase.driver(cloud_uri, auth=auth_tuple, **driver_kwargs)
    except Exception as init_err:
        print(f"[Error] Failed to initialize GraphDatabase driver: {init_err}")
        sys.exit(1)

    if not os.path.exists(CYPHER_FILE_PATH):
        print(f"Cypher dump file not found at {CYPHER_FILE_PATH}. Fetching database dump from local Memgraph...")
        local_uri = os.getenv("MEMGRAPH_URI") or "bolt://localhost:7687"
        local_user = os.getenv("MEMGRAPH_USER")
        local_pass = os.getenv("MEMGRAPH_PASSWORD")
        local_auth = (local_user, local_pass) if (local_user and local_pass) else None
        
        try:
            local_driver = GraphDatabase.driver(local_uri, auth=local_auth, encrypted=False)
            with local_driver.session() as local_session:
                res = local_session.run("DUMP DATABASE;")
                dump_lines = [rec[0] for rec in res if rec and rec[0]]
            with open(CYPHER_FILE_PATH, "w", encoding="utf-8") as f:
                f.write("\n".join(dump_lines))
            print(f"[OK] Fallback dump generated successfully ({len(dump_lines)} statements).")
            local_driver.close()
        except Exception as fallback_err:
            print(f"[Error] Cypher dump file missing and fallback dump failed: {fallback_err}")
            sys.exit(1)

    print(f"Reading Cypher backup dump from {CYPHER_FILE_PATH}...")
    with open(CYPHER_FILE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    statements = split_cypher_statements(content)

    if not statements or len(statements) == 0:
        print("[CRITICAL ABORT] Cypher dump file contains 0 valid statements!")
        print("Aborting deployment immediately to prevent accidental data wipe on Memgraph Cloud.")
        sys.exit(1)

    try:
        with driver.session() as session:
            print(f"Validated {len(statements)} statements to restore.")
            print("Wiping existing graph on Memgraph instance via instant storage reset...")
            try:
                session.run("STORAGE MODE IN_MEMORY_ANALYTICAL")
                session.run("STORAGE MODE IN_MEMORY_TRANSACTIONAL")
                print(" -> Instant graph reset via STORAGE MODE completed.")
            except Exception:
                try:
                    session.run("DROP GRAPH")
                    print(" -> Instant graph reset via DROP GRAPH completed.")
                except Exception:
                    session.run("MATCH (n) DETACH DELETE n")
                    print(" -> Fallback DETACH DELETE completed.")

            # Separate constraint/index statements from data statements to run indexes first
            index_stmts = []
            data_stmts = []
            for stmt in statements:
                clean = stmt.rstrip(";").strip()
                if not clean:
                    continue
                if "CREATE CONSTRAINT" in clean.upper() or "CREATE INDEX" in clean.upper():
                    index_stmts.append(clean)
                else:
                    data_stmts.append(clean)

            # 1. Run index and constraint statements first
            if index_stmts:
                print(f"Applying {len(index_stmts)} schema constraints and indexes...")
                for idx_stmt in index_stmts:
                    try:
                        session.run(idx_stmt)
                    except Exception as idx_err:
                        print(f" Note on index/constraint: {idx_err}")

            # 2. Batch data restoration statements in transactions of BATCH_SIZE (500)
            # Periodic FREE MEMORY calls after commits trim internal allocator memory back to OS.
            BATCH_SIZE = 500
            print(f"Restoring {len(data_stmts)} Cypher statements in transaction batches of {BATCH_SIZE} with periodic memory trimming...")
            
            success_count = len(index_stmts)
            tx = session.begin_transaction()
            batch_count = 0

            for stmt in data_stmts:
                try:
                    tx.run(stmt)
                    batch_count += 1
                    success_count += 1
                except Exception as stmt_err:
                    print(f" Note on statement execution: {stmt_err}")

                if batch_count >= BATCH_SIZE:
                    tx.commit()
                    try:
                        session.run("FREE MEMORY")
                    except Exception:
                        pass
                    tx = session.begin_transaction()
                    batch_count = 0

            if batch_count > 0:
                tx.commit()
                try:
                    session.run("FREE MEMORY")
                except Exception:
                    pass

            print(f"Successfully restored {success_count}/{len(statements)} statements.")

            res = session.run("MATCH (n) RETURN count(n) AS total_nodes")
            total_nodes = res.single()["total_nodes"]
            print(f" Memgraph Cloud deployment complete! Total nodes verified: {total_nodes}")

    except Exception as e:
        print(f"[Error] Memgraph Cloud deployment failed: {e}")
        sys.exit(1)
    finally:
        driver.close()

if __name__ == "__main__":
    deploy_to_memgraph_cloud()
