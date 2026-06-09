<!-- SPECKIT START -->
# SpecKit Agent Workspace Instructions: AmeThyst-Library

The components of websites must be placed in src folder, obliged the JavaScript framework suggested in README.md.

## 1. Core Stack & Machine Learning Environment Rules
- **Application Core**: Node.js running an Express.js API server (`src/server/server.mjs`).
- **Relational Integrity**: User authentication, profiles, and transactional check-out logs live in PostgreSQL.
- **Knowledge Graph**: Core book networks and structural metadata live in Memgraph, queried via the `neo4j-driver` npm package.
- **Hybrid Search Engine**: Combines keyword-based OPAC search (Memgraph) and vector-based Semantic search (ChromaDB via FastAPI).
- **AI Microservice Integration**: 
  1. The Node.js gateway routes search requests based on the `mode` parameter.
  2. For `semantic` mode, it calls the Python microservice at `src/services/ai/app.py`.
  3. The Python service vectorizes the query and retrieves matching Book IDs from ChromaDB.
  4. Node.js enriches the resulting IDs with metadata from Memgraph and covers from OpenLibrary.
- **TensorFlow Engine Core**: Housed inside `src/services/ai/`. Implements a TensorFlow Recommenders (TFRS) Two-Tower model trained using vectorized inputs.
- **Recommendation Execution Flow**: 
  1. The Node.js server extracts user historical logs from PostgreSQL and candidate book IDs from Memgraph.
  2. Node pings the Python TensorFlow service passing these identifiers.
  3. The TensorFlow model applies neural weights to rank the items, returning a structured list of recommended IDs back to Node.js.
  4. Node.js populates the display details from Memgraph and pushes the JSON payload to the React frontend tier.

## 2. Structural & File Naming Conventions
When generating new features, you must follow the strict `README.md` layout patterns:
- **Routes**: Map URL endpoints inside `src/server/routes/`. Intercept requests using authorization middleware before reaching controllers.
- **Controllers**: Handle request parameter extraction and JSON responses inside `src/server/controllers/`. Keep logic thin.
- **Services**: Implement heavy business logic, database transactions, and Cypher executions inside `src/server/services/`.
- **Client Pages**: Respect Next.js directory-based routing. Endpoints are created by folders containing a `page.js` file inside `src/client/app/`.


<!-- SPECKIT END -->
