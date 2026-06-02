

## Common features of existing products

- **Identity and Access Management (IAM)**
    
    - University Stack Implementation:_ Orchestrated via enterprise Single Sign-On (SSO) infrastructures such as Shibboleth or Central Authentication Service (CAS). This maps digital patron identities to physical security parameters, including building turnstiles, private study space resource schedulers, and off-campus proxies (e.g., EZproxy) for restricted publisher networks.
        
    - _Software Codebase Implementation:_ Expressed via web token verifiers, security filter middlewares, and strict Role-Based Access Control (RBAC) permission tables. The codebase acts as a digital gatekeeper, explicitly evaluating whether an authenticated system account possesses the specific cryptographic scopes required to alter ledger balances, invoke API endpoints, or modify a patron profile.
        
    - _Objectives_: Guarantees institutional data privacy compliance, prevents privilege escalation by unauthorized staff or external actors, and creates a frictionless user experience by removing multi-login barriers for researchers moving between disparate databases.
        
- **Metadata Management and Discovery Control**
    
    - _University Stack Implementation:_ Executed through active local cataloging, metadata curation, and database maintenance workflows. Staff verify and enrich bibliographic records (e.g., MARC schemas) and map them directly to physical shelf locations across a campus footprint, exposing these records to unified user-facing discovery networks like WorldCat or UC Library Search.
        
    - _Software Codebase Implementation:_ Managed via database storage configurations, ingestion pipelines, and search index mappings. In FOLIO, this manifests as specialized back-end inventory applications, QuickMARC editing modules, and data import/export engines that store abstract instance, holding, and item records independently of any physical building layout.
        
    - _Objectives:_ Delivers high-precision retrieval of complex academic resources, enforces cross-system data standardization across institutional boundaries, and provides real-time, accurate availability matching for physical and electronic items.
        
- **Fulfillment and Circulation Workflows**
    
    - _University Stack Implementation:_ The operational orchestration of logistics, personnel, and physical inventory. It relies on circulation desks, sorting equipment, physical drop-boxes, course reserve shelves, and regional courier transport vehicles moving items through the physical campus network.
        
    - _Software Codebase Implementation:_ Modeled as an abstract, deterministic state machine. Items are persisted as database records with changing status attributes (e.g., `Available`, `Checked Out`, `Missing`, `On Hold`). Code subroutines calculate loan rules, process renewals, trigger notices, and generate fine or fee entries when loan boundaries are violated.
        
    - _Objectives:_ Secures equitable access to high-demand materials through automated loan enforcement, provides workflow predictability for patrons tracking holds, and delivers unalterable transactional logs for administrative clarity.
        
- **External Integration Infrastructure**
    
    - _University Stack Implementation:_ The physical and institutional boundaries established with third-party networks. This includes configuring local network routing to external content providers (e.g., JSTOR, PubMed) and establishing secure data connections to book vendors (e.g., GOBI) and central campus enterprise resource planning (ERP) financial frameworks.
        
    - _Software Codebase Implementation:_ Expressed via programmatic interfaces, protocol adapters, and web standards. The system executes these integrations using RESTful web APIs, EDIFACT data parsers for automated acquisitions processing, OAI-PMH data-harvesting modules, and generic webhook configurations.
        
    - _Objectives:_ Consolidates access into a single search environment, cuts administrative labor via automated procurement pipelines, and ensures platform future-proofing by allowing developers to swap or upgrade modules cleanly.
    
## Comparison on existing apps

| **Entity**                            | **Deployment Model**                                                                                 | **Target Audience**                                                     |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **The University of Chicago Library** | **On-Premises / Distributed** (Central campus data nodes paired with localized physical collections) | **Researchers** & End-User Students                                     |
| **FOLIO Platform**                    | **Distributed / Cloud** (Containerized microservices managed via Kubernetes clusters)                | **Library IT Administrators** & System Developers                       |
| **Papyrus Library Cloud**             | **Multi-Tenant / Cloud** (Centralized, vendor-managed commercial cloud environment)                  | **Library IT Administrators** & Operations Personnel                    |
| **Accessit Library**                  | **Cloud SaaS / Hybrid** (Vendor-hosted cloud environment with multi-tier web apps)                   | **End-User Students**, K-12/Tertiary Learners, & Operational Librarians |

### FOLIO Platform

- **Microservice Architecture:** Architected as a decoupled ecosystem of containerized backend applications that utilize an API gateway to talk to one another over REST interfaces, allowing institutions to run only the services they need.
    
- **Community Governance Councils:** Governed openly through a structured framework led by an independent Product Council, Technical Council, and Community Council, supplemented by domain-specific Special Interest Groups (SIGs).
    
- **Native ERM Capabilities:** Built from its inception with core electronic resource management (ERM) modules designed to ingest and process digital contract parameters, including native apps for _Agreements_, _Licenses_, _eHoldings_, and _eUsage_ data metrics.
    
- **Decoupled Data Analytics (Metadb):** Isolates operational reporting via a distinct analytics database layer (`Metadb`) that transforms highly variable, transactional JSON data from microservices into standard relational tables, avoiding performance degradation on production clusters.

### Papyrus Library Cloud

- **Commercial SaaS Delivery Model:** Implements a pure software-as-a-service model hosted, maintained, and deployed entirely on vendor-managed cloud networks under a commercial operating structure.
    
- **Vendor-Managed Paradigm:** Incorporates an integrated, client-facing _Price List_ and corporate service-tier architecture natively within the platform ecosystem, targeting buyers who want to outsource infrastructure overhead.
    
- **Client Authentication Footprint:** Utilizes an account-gated, minimalist landing page optimized for secure tenant authentication and administrative workflows rather than functioning as an open public discovery portal.

# UX/UI Adoptation

- **The In-Box Mode Toggle:** Place tab controls or crisp radio toggles right inside or directly above the primary search box. This lets users change the underlying target database (e.g., searching for _local catalog entries_ vs. _all external database connections_) without switching pages.
    
- **Contextual Scoping Checkboxes:** filtering checkboxes directly beneath the text box. This keeps users from needing to navigate a complex advanced filter menu for common queries.
    
- **Fallback Redirect Anchors:** Place a clear secondary link below the search field (e.g., _"Not finding what you need? Search WorldCat"_). This guides the user to a fallback partner network or external integration.
      
- **Color-Coded Boolean State Indicators:** Group locations or service endpoints into a clean vertical list. Pair each item with a clear, color-coded state badge (e.g., a red background badge for `Closed`, a green one for `Open`) alongside current timestamp data (e.g., _"Hours today: 11 a.m. - 5 p.m."_).
    
- **"See Full Details" Contextual Drills:** Keep the main location dashboard clean by placing a uniform, low-emphasis action link (_"See full library details"_) beneath every entry. This prevents secondary data—like maps, floor plans, or staff contacts—from cluttering the high-level summary views.
       
- **Action-Oriented Intent Nesting:** Instead of naming the navigation items after the internal software modules , group the menus by user intent, such as **Borrow & Request**, **Research & Teaching**, or **Visit & Study**.
    
- **Categorized Functional Columns:** When a user opens a top-level menu category, split the submenu panel into distinct columns based on what the user wants to know versus what they want to do.
      
- **The "Account at a Glance" Header Link:** Keep a persistent **"My Library Account"** anchor link pinned to the global header. This gives users a 1-click path to view their active states, items checked out, and system notifications from anywhere in the app.
    
- **High-Frequency Utility Blocks:** Create a specific section on your home dashboard for the most common user workflows.
  
## Proposed app ideas

