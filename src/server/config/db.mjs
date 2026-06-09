import neo4j from 'neo4j-driver';
import { ChromaClient } from 'chromadb';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Memgraph connection
const driver = neo4j.driver(
  process.env.MEMGRAPH_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(process.env.MEMGRAPH_USER || '', process.env.MEMGRAPH_PASSWORD || '')
);

// ChromaDB connection
// The chroma_db folder is in the root, which is 3 levels up from here (src/server/config)
const chromaPath = path.join(__dirname, '../../../chroma_db');
const chromaClient = new ChromaClient({
  path: chromaPath
});

export { driver, chromaClient };
