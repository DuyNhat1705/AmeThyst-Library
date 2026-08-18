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

    # 2. SSL & Protocol Handshake Configuration
    auth_tuple = (cloud_user, cloud_password) if (cloud_user and cloud_password) else None
    
    driver = None
    connection_errors = []
    
    # 1. Standard driver initialization (natively handles bolt+ssc://, bolt+s://, bolt://, etc.)
    try:
        test_driver = GraphDatabase.driver(cloud_uri, auth=auth_tuple)
        with test_driver.session() as s:
            s.run("RETURN 1")
        driver = test_driver
        print(" -> Connected to Memgraph Cloud successfully.")
    except Exception as conn_err:
        connection_errors.append(f"Standard URI setup ({cloud_uri}): {conn_err}")

    # 2. Fallback for plain unencrypted bolt:// or neo4j:// URIs
    if not driver and (cloud_uri.startswith("bolt://") or cloud_uri.startswith("neo4j://")):
        try:
            test_driver = GraphDatabase.driver(cloud_uri, auth=auth_tuple, encrypted=False)
            with test_driver.session() as s:
                s.run("RETURN 1")
            driver = test_driver
            print(" -> Connected to Memgraph Cloud successfully (encrypted=False).")
        except Exception as conn_err:
            connection_errors.append(f"encrypted=False: {conn_err}")

    if not driver:
        print("[Error] Failed to connect to Memgraph Cloud instance!")
        print("Diagnostic Details:")
        for err in connection_errors:
            print(f"  - {err}")
        print("\nPlease check:")
        print("  1. VPS Firewall / Security Group: Ensure port 7687 is open to inbound traffic.")
        print("  2. Memgraph Config: Ensure --bolt-address=0.0.0.0 in memgraph.conf (not 127.0.0.1).")
        sys.exit(1)

    try:
        with driver.session() as session:
            # Check if target Memgraph Cloud instance already has nodes
            check_res = session.run("MATCH (n) RETURN count(n) AS total_nodes")
            existing_nodes = check_res.single()["total_nodes"]

            # 1. Ensure essential unique constraints are active
            essential_constraints = [
                "CREATE CONSTRAINT ON (b:Book) ASSERT b.id IS UNIQUE;",
                "CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE;",
                "CREATE CONSTRAINT ON (a:Author) ASSERT a.name IS UNIQUE;",
                "CREATE CONSTRAINT ON (g:Genre) ASSERT g.name IS UNIQUE;",
                "CREATE CONSTRAINT ON (br:Branch) ASSERT br.id IS UNIQUE;"
            ]
            print("Verifying essential schema unique constraints on Memgraph Cloud...")
            for c_stmt in essential_constraints:
                try:
                    session.run(c_stmt)
                except Exception:
                    pass

            if existing_nodes > 0:
                print(f"Existing graph detected ({existing_nodes} nodes)! Running non-destructive fast incremental interaction & feature sync...")
                
                # Step A: Delete old temporary INTERACTED projection edges
                print(" -> [Step 1/3] Refreshing old interaction projection edges...")
                session.run("MATCH (u:User)-[r:INTERACTED]->(b:Book) DELETE r;")

                # Step B: Re-generate multi-tiered relational INTERACTED edges directly on Cloud instance
                print(" -> [Step 2/3] Re-injecting weighted topological INTERACTED edges (Borrows, Returns, Wishlists, Searches, Clicks)...")
                
                # Borrows (scale 5)
                session.run("""
                    MATCH (u:User)-[b:BORROWED]->(bk:Book)
                    WITH u, bk, CASE 
                      WHEN b.borrow_date IS NOT NULL AND b.borrow_date <> "" THEN b.borrow_date
                      WHEN b.reserve_date IS NOT NULL AND b.reserve_date <> "" THEN b.reserve_date
                      ELSE "2026-01-01T00:00:00"
                    END AS raw_date
                    WITH u, bk, replace(raw_date, " ", "T") AS t_date
                    WITH u, bk, CASE WHEN t_date CONTAINS "T" THEN t_date ELSE t_date + "T00:00:00" END AS final_date_str
                    WITH u, bk, (timestamp() - timestamp(localDateTime(final_date_str))) / 86400000000.0 AS days_ago
                    WITH u, bk, 5.0 * exp(-0.05 * days_ago) AS final_weight
                    WITH u, bk, toInteger(ceil(final_weight)) AS edge_count
                    UNWIND range(1, edge_count) AS flag
                    CREATE (u)-[:INTERACTED]->(bk);
                """)

                # Returns (scale 4)
                session.run("""
                    MATCH (u:User)-[r:RETURNED]->(bk:Book)
                    WITH u, bk, CASE 
                      WHEN r.return_date IS NOT NULL AND r.return_date <> "" THEN r.return_date
                      ELSE "2026-01-01T00:00:00"
                    END AS raw_date
                    WITH u, bk, replace(raw_date, " ", "T") AS t_date
                    WITH u, bk, CASE WHEN t_date CONTAINS "T" THEN t_date ELSE t_date + "T00:00:00" END AS final_date_str
                    WITH u, bk, (timestamp() - timestamp(localDateTime(final_date_str))) / 86400000000.0 AS days_ago
                    WITH u, bk, 4.0 * exp(-0.05 * days_ago) AS final_weight
                    WITH u, bk, toInteger(ceil(final_weight)) AS edge_count
                    UNWIND range(1, edge_count) AS flag
                    CREATE (u)-[:INTERACTED]->(bk);
                """)

                # Wishlists (scale 3)
                session.run("""
                    MATCH (u:User)-[w:WISHED]->(bk:Book)
                    WITH u, bk, CASE 
                      WHEN w.added_at IS NOT NULL AND w.added_at <> "" THEN w.added_at
                      ELSE "2026-01-01T00:00:00"
                    END AS raw_date
                    WITH u, bk, replace(raw_date, " ", "T") AS t_date
                    WITH u, bk, CASE WHEN t_date CONTAINS "T" THEN t_date ELSE t_date + "T00:00:00" END AS final_date_str
                    WITH u, bk, (timestamp() - timestamp(localDateTime(final_date_str))) / 86400000000.0 AS days_ago
                    WITH u, bk, 3.0 * exp(-0.05 * days_ago) AS final_weight
                    WITH u, bk, toInteger(ceil(final_weight)) AS edge_count
                    UNWIND range(1, edge_count) AS flag
                    CREATE (u)-[:INTERACTED]->(bk);
                """)

                # Searches (scale 1)
                session.run("""
                    MATCH (u:User)-[s:SEARCHED]->(bk:Book)
                    WITH u, bk, CASE 
                      WHEN s.created_at IS NOT NULL AND s.created_at <> "" THEN s.created_at
                      ELSE "2026-01-01T00:00:00"
                    END AS raw_date
                    WITH u, bk, replace(raw_date, " ", "T") AS t_date
                    WITH u, bk, CASE WHEN t_date CONTAINS "T" THEN t_date ELSE t_date + "T00:00:00" END AS final_date_str
                    WITH u, bk, (timestamp() - timestamp(localDateTime(final_date_str))) / 86400000000.0 AS days_ago
                    WITH u, bk, 1.0 * exp(-0.05 * days_ago) AS final_weight
                    WITH u, bk, toInteger(ceil(final_weight)) AS edge_count
                    UNWIND range(1, edge_count) AS flag
                    CREATE (u)-[:INTERACTED]->(bk);
                """)

                # Recommended Clicks (scale 3)
                session.run("""
                    MATCH (u:User)-[r:RECOMMENDED]->(bk:Book)
                    WHERE r.is_clicked = true
                    WITH u, bk, CASE 
                      WHEN r.generated_at IS NOT NULL AND r.generated_at <> "" THEN r.generated_at
                      ELSE "2026-01-01T00:00:00"
                    END AS raw_date
                    WITH u, bk, replace(raw_date, " ", "T") AS t_date
                    WITH u, bk, CASE WHEN t_date CONTAINS "T" THEN t_date ELSE t_date + "T00:00:00" END AS final_date_str
                    WITH u, bk, (timestamp() - timestamp(localDateTime(final_date_str))) / 86400000000.0 AS days_ago
                    WITH u, bk, 3.0 * exp(-0.05 * days_ago) AS final_weight
                    WITH u, bk, toInteger(ceil(final_weight)) AS edge_count
                    UNWIND range(1, edge_count) AS flag
                    CREATE (u)-[:INTERACTED]->(bk);
                """)

                # Step C: Fast sync of updated Book embedding feature vectors
                print(" -> [Step 3/3] Syncing updated node feature properties...")
                session.run("""
                    MATCH (b:Book)
                    WHERE b.embedding IS NOT NULL
                    SET b.features = b.embedding;
                """)

                try:
                    session.run("FREE MEMORY")
                except Exception:
                    pass

                print(" [FAST SUCCESS] Incremental interaction adjustment & embedding sync complete in ~3 seconds!")

            else:
                print("Empty target graph detected! Checking for backup Cypher dump file...")
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
                    sys.exit(1)

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

                if index_stmts:
                    print(f"Applying {len(index_stmts)} schema constraints and indexes...")
                    for idx_stmt in index_stmts:
                        try:
                            session.run(idx_stmt)
                        except Exception as idx_err:
                            pass

                BATCH_SIZE = 1000
                print(f"Restoring {len(data_stmts)} Cypher statements in safe transaction batches of {BATCH_SIZE}...")
                
                success_count = len(index_stmts)
                tx = session.begin_transaction()
                batch_count = 0

                for stmt in data_stmts:
                    try:
                        tx.run(stmt)
                        batch_count += 1
                        success_count += 1
                    except Exception as stmt_err:
                        pass

                    if batch_count >= BATCH_SIZE:
                        tx.commit()
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
            print(f" Memgraph Cloud deployment complete! Total active nodes verified: {total_nodes}")

    except Exception as e:
        print(f"[Error] Memgraph Cloud deployment failed: {e}")
        sys.exit(1)
    finally:
        driver.close()

if __name__ == "__main__":
    deploy_to_memgraph_cloud()
