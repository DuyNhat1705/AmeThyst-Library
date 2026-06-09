<!-- SPECKIT START -->
# SpecKit Agent Workspace Instructions: AmeThyst-Library

This document outlines the strict technical instructions and development constraints that the AI agent must follow when editing, generating, or refactoring code within this workspace.

## 1. Core Stack & Machine Learning Environment Rules
- **Application Core**: Node.js running an Express.js API server (`src/server/server.mjs`).
- **Relational Integrity**: User authentication, profiles, and transactional check-out logs live in PostgreSQL.
- **Knowledge Graph**: Core book networks and structural metadata live in Memgraph, queried via the `neo4j-driver` npm package.
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
