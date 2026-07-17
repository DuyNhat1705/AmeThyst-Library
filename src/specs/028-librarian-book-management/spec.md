# Feature Specification: Librarian Book Management

**Feature Branch**: `028-librarian-book-management`

**Created**: 2026-07-11

**Status**: Draft

**Input**: User description: "new feature: librarian book management. As a login librarian, we need to insert new book: changing quantity if existed in database, create new row if not yet (update tables books and libarys). The book row should genrate book_ID, bookshelf (first letter and random int) and process embedding automatically. Then synchronize with memgraph. The book info would be input typing (with type validate) and let them choose branch by drop down, There should be option to move books from branch to branch."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add a New Book to the Library System (Priority: P1)

As a logged-in librarian, I want to catalog a brand-new book and distribute its initial inventory across multiple library branches so that it is searchable and available for users to borrow.

**Why this priority**: Crucial for expanding the library catalog and stocking new items.
**Independent Test**: A librarian submits a novel book with a unique ISBN. The system validates the inputs, creates the catalog entry, generates a book ID, calculates the semantic search vector, assigns bookshelf codes and stock quantities to each branch where stock is specified, and displays a success notification.

**Acceptance Scenarios**:

1. **Given** a logged-in librarian is on the book management form, **When** they fill out all required details (Title, Author, ISBN, Description, Price, Pages, etc.), specify quantities for each available branch (including 0 for branches with no stock), and submit, **Then** the book is created in the catalog, a bookshelf code is generated and quantities are set for all branches with stock > 0, and the book is synchronized to the graph database.
2. **Given** a librarian is on the book management form, **When** they submit a book with invalid data (e.g., negative page count, negative price, malformed ISBN, or negative stock quantities for any branch), **Then** form validation errors are shown and the submission is blocked.

---

### User Story 2 - Restock an Existing Book (Priority: P1)

As a logged-in librarian, I want to add copies of an existing book to multiple branches simultaneously so that we can increase its inventory without creating duplicate catalog records.

**Why this priority**: Necessary for inventory replenishment and managing multiple copies of popular books.
**Independent Test**: A librarian submits a book insertion form matching an existing ISBN. The system detects the duplicate, skips adding a catalog row, and increases the stock for each specified branch.

**Acceptance Scenarios**:

1. **Given** a book already exists in the catalog, **When** a librarian inputs its ISBN on the form, and specifies restocking quantities for each branch, **Then** the catalog record remains unchanged, the branch stock quantities (total and available) are incremented by the specified amounts, and the updated inventory is synced to the graph database.

---

### User Story 3 - Transfer Books Between Branches (Priority: P2)

As a logged-in librarian, I want to transfer book copies from one physical branch to another so that we can balance inventory based on demand.

**Why this priority**: Required for inventory rebalancing and logistics.
**Independent Test**: A librarian selects a book, a source branch, a destination branch, and a transfer quantity, then commits the transfer. The system validates availability and moves the stock.

**Acceptance Scenarios**:

1. **Given** a book has available copies at Branch A, **When** a librarian transfers a valid quantity of copies to Branch B, **Then** the total and available quantities are decremented at Branch A, incremented (or initialized) at Branch B, and the updated stock is synced to the graph database.
2. **Given** a book has copies at Branch A, but some are currently borrowed or reserved, **When** a librarian tries to transfer a quantity greater than the *available* copies (i.e. copies not currently on loan or reserved), **Then** the transfer is blocked with an error.

---

### User Story 4 - Modify Book Metadata and Inventory (Priority: P2)

As a logged-in librarian, I want to edit the metadata (e.g., Title, Author, Description, Price) of a book and its physical inventory details at any branch so that the catalog and stock records remain accurate.

**Why this priority**: Essential for maintaining data quality and correcting errors in the library catalog.
**Independent Test**: A librarian updates the description and price of a book, and changes its quantity at Branch A. The system validates the inputs, updates the databases, automatically re-calculates the semantic embedding (due to description change), and syncs the updated attributes and relationships with the graph database.

**Acceptance Scenarios**:

1. **Given** a book exists in the catalog, **When** a librarian edits its Title or Description and submits, **Then** the catalog record is updated, a new semantic embedding vector is automatically generated, and the changes are synchronized to the graph database.
2. **Given** a book is stocked at Branch A with 5 total copies (2 currently borrowed, 3 available), **When** a librarian tries to reduce the total quantity to 1, **Then** the update is blocked with a validation error because the new quantity is less than the active loans.
3. **Given** a book exists in the catalog, **When** a librarian attempts to edit the book's ISBN to one that is already assigned to another book, **Then** the update is blocked with a validation error.

---

### Edge Cases

- **Graph Sync Outage**: If the graph database is temporarily unavailable during book insertion or transfer, the primary transactional record must save successfully, and the graph sync must be retried asynchronously so that search index integrity is eventually consistent.
- **Embedding Generation Failure**: If the semantic embedding model fails to load or compute the vector, a fallback deterministic vector must be generated so that book creation is not blocked.
- **Conflicting Metadata**: If a librarian inserts a book with an existing ISBN but different metadata (e.g., a typo in the title), the system must preserve the existing catalog metadata and only update the stock, displaying a warning notice.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (Librarian Role Guard)**: Only users authenticated with the "Librarian" or "Admin" roles MUST be permitted to access book insertion and transfer interfaces.
- **FR-002 (Input Validation)**: The book insertion form MUST validate inputs before submission:
  - Title: Required, plain text.
  - Author(s): Required, list of names.
  - ISBN: Required, 10 or 13 digits format.
  - Description: Required.
  - Price: Required, positive number.
  - Num Pages: Required, positive integer.
  - Genres: Required, list.
  - Stock Quantities: Required, a non-negative integer for each library branch (with at least one branch having a quantity greater than zero).
- **FR-003 (Auto ID Generation)**: For new books, the system MUST generate a unique Book ID up to 20 characters in length.
- **FR-004 (Auto Bookshelf Generation)**: For new books and branches where the book is stocked for the first time, the system MUST generate a bookshelf location consisting of the first letter of the book's title (capitalized) followed by a random integer between 1 and 9 (e.g., 'F5' for a book titled 'Fahrenheit 451').
- **FR-005 (Auto Embedding Process)**: For new books, the system MUST automatically compute a 384-dimensional vector embedding of the book's title and description to enable semantic search indexing.
- **FR-006 (Inventory Stock Association)**: When stocking a book, the system MUST insert or update stock records associating the book with all branches where the quantity specified is greater than 0, storing:
  - Total Quantity (incremented by specified amount if already stocked at the branch)
  - Available Quantity (incremented by specified amount if already stocked at the branch)
  - Bookshelf location code (reused if already exists, generated if new to the branch)
- **FR-007 (Graph Synchronization)**: All book creations, author/genre associations, and branch stocks MUST be synchronized to the graph database to maintain accurate relationships and GCN candidate generation.
- **FR-008 (Inventory Transfer)**: The system MUST support moving books from branch to branch via a dedicated "Inventory Transfer" tab in the Librarian Dashboard.
- **FR-009 (Bookshelf Resolution on Transfer)**: When moving a book to a destination branch:
  - If the book already has a stock record (and bookshelf code) at the destination branch, the system MUST reuse that existing bookshelf code.
  - If the book is new to the destination branch, the system MUST auto-generate a new bookshelf code (first letter of title + random integer) for the destination branch.
- **FR-010 (Transfer Guard)**: The transfer quantity MUST NOT exceed the book's current available quantity at the source branch.
- **FR-011 (Dual Stock Update)**: A successful transfer MUST decrement total and available quantities at the source branch, increment/initialize them at the destination branch, and sync both to the graph.
- **FR-012 (Metadata Modification)**: The system MUST allow a librarian to modify any metadata field of a book catalog entry.
- **FR-013 (ISBN Uniqueness Guard)**: If a librarian modifies the ISBN of an existing book, the system MUST validate that the new ISBN is unique. If the new ISBN is already assigned to another book in the catalog, the update MUST be blocked and a validation error displayed.
- **FR-014 (Auto Re-Embedding on Update)**: If a book's Title or Description is updated, the system MUST automatically re-compute and update the book's 384-dimensional vector embedding.
- **FR-015 (Graph Sync on Update)**: Any changes to book metadata, including authors, genres, and embeddings, MUST be synchronized to the graph database, ensuring old relationships are detached and new relationships are established.
- **FR-016 (Inventory Fields Update)**: The system MUST allow a librarian to update inventory details (Total Quantity, Shelf location) for any branch.
- **FR-017 (Inventory Reduction Guard)**: The system MUST NOT allow reducing the Total Quantity of a book at a branch below the count of active borrows and reservations at that branch.

### Key Entities *(include if feature involves data)*

- **Book Catalog Entry**: Represents a book in the system catalog.
  - Key attributes: Book ID, Title, Author list, Description, ISBN, Publication Date, Genres, Publisher, Price, Semantic Embedding Vector.
- **Library Branch**: Represents a physical branch location.
  - Key attributes: Branch ID, Name, Short Name, Address.
- **Branch Stock (Inventory)**: Tracks physical copies of a book at a branch.
  - Key attributes: Book ID, Branch ID, Total Quantity, Available Quantity, Bookshelf Code.
- **Graph Database Nodes/Edges**:
  - `Book` node connected to `Author` nodes via `WRITTEN_BY` edges.
  - `Book` node connected to `Genre` nodes via `HAS_GENRE` edges.
  - `Book` node connected to `Branch` nodes via `AVAILABLE_AT` edges (storing quantity and available quantity).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of newly added books have their semantic embeddings generated and saved immediately upon form submission.
- **SC-002**: Graph database synchronizations for book creations and transfers complete within 2 seconds of the database transaction committing.
- **SC-003**: Librarians can perform a branch-to-branch book transfer in under 1 minute.
- **SC-004**: Zero books with insufficient available stock can be transferred.

## Assumptions

- **Librarian Authentication**: An existing authentication system provides a session containing the user's role and their associated branch (if applicable).
- **Branch Data**: A list of library branches is already present in the database to populate the branch dropdown.
- **Single-Book Insertion**: The tool is designed for manual cataloging of individual books, not bulk CSV uploads (which would bypass some UX validations).
