import neo4j from 'neo4j-driver';

// Memgraph connection
const driver = neo4j.driver(
  process.env.MEMGRAPH_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(process.env.MEMGRAPH_USER || '', process.env.MEMGRAPH_PASSWORD || '')
);

export { driver };
