# AmeThyst-Library Constitution
<!-- This document defines the foundational architectural and behavioral invariants for the AmeThyst-Library project. -->

## Core Principles

### I. Graph-First Discovery
Semantic Search and Discovery must prioritize structural and relational integrity over generative heuristics.
- **Semantic Search**: Must utilize ChromaDB (for local vector space matching) integrated with Memgraph (Cypher) for graph metadata traversal. Conversational LLM text generation for search results is strictly prohibited to ensure factual accuracy.
- **Personal Recommendations**: Must be derived from a Graph-Traversal or Personalized PageRank algorithm executing directly over the Memgraph RecKG topology, ensuring recommendations are grounded in established node relationships.

### II. Deterministic Review & Recommendation Analysis
Analysis of user metrics and feedback must yield structured, reproducible data rather than subjective summaries.
- **User Review Summaries**: Must utilize an Aspect-Based Sentiment Analysis (ABSA) extraction pipeline leveraging lightweight NLP libraries (e.g., SpaCy or BERT) to yield structured numeric data.
- **Smart Recommendations**: Predictive ranking must be computed deterministically using localized Machine Learning frameworks (TensorFlow Recommenders) combining graph embeddings from Memgraph, semantic features from ChromaDB, and relational user histories from PostgreSQL.

### III. Strict Concurrency & Security
System integrity and user security are non-negotiable and must be enforced at the lowest possible layer.
- **Resource Locking**: Double-booking of physical study rooms or overlapping book reservations must be blocked at the database level using Memgraph's explicit transactional writes, constraint locks, or pessimistic Cypher locking strategies during scheduling updates.
- **PIN Verification**: The 6-digit PIN verification system must use short-lived (10-minute expiry), cryptographically random, salted, and hashed PIN strings stored directly inside secure properties on the `(:User)` nodes in Memgraph.

### IV. Amended Tech Stack Boundaries & Machine Learning Integration
The data and execution layers are isolated into specialized subsystems to protect system resource bounds.
- **Core Node.js/Express API**: Serves as the primary operational gateway, routing user requests, handling RBAC permissions, and orchestrating transactions.
- **Storage Subsystems**: User accounts and transaction states reside in PostgreSQL. The structural catalog grid (Works, Editions, Authors, Series) resides in Memgraph. Dense textual plot descriptions reside in ChromaDB.
- **Isolated AI/ML Microservice (Python/TensorFlow)**: TensorFlow operations, graph neural network processing (MAGE/Node2Vec extraction), and embedding workflows must run within an isolated Python background runtime. Node.js interacts with this layer via stateless HTTP/gRPC endpoints. Direct invocation of TensorFlow or PyTorch layers inside the Node.js process is strictly prohibited.

## Security & Reliability Standards

- **Zero-Chatbot Dependency**: AI features must be implemented using deterministic algorithms and graph theory, bypassing heavy LLM/chatbot dependencies.
- **Data Integrity**: Database constraints and transactions are the primary line of defense for business logic consistency.

## Governance
- This Constitution supersedes all other documentation and individual project practices.
- Any architectural change that deviates from these principles requires a formal amendment process and justification.
- All code reviews must verify compliance with these principles.

**Version**: 1.0.0 | **Ratified**: 2026-06-04 | **Last Amended**: 2026-06-04
