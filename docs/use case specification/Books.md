# Use-Case Specification: Books Package

**Group Name:** Amethyst

**Project Name:** Amethyst Library Management System

**Version:** 1.1

**Date:** 20-Jul-2026

**Document Identifier:** NGLP-SRS-BK-001

---

## Revision History

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 20-Jul-2026 | 1.1 | Books Use case (RUP format layout). | Anh Minh, Hoang Gia |

---


## Table of Contents
1. [Regulation](#regulation)
2. [Usecase Diagram](#usecase-diagram)
3. [UC-BK-01: Book Searching](#uc-bk-01-book-searching)
4. [UC-BK-02: Filtering Book](#uc-bk-02-filtering-book)
5. [UC-BK-03: View Book Detail](#uc-bk-03-view-book-detail)
6. [UC-BK-04: Add Book Favorite](#uc-bk-04-add-book-favorite)
7. [UC-BK-05: Book Reservation](#uc-bk-05-book-reservation)
8. [UC-BK-06: Canceling Book Reservation](#uc-bk-06-canceling-book-reservation)
9. [UC-BK-07: Generating Pin](#uc-bk-07-generating-pin)

---

## Regulation
```mermaid
flowchart RL
    L1(["<center>{abstract} <br> Logged user</center>"])

    L2_1([Admin])
    L2_2([User])
    L2_3([Librarian])

    L3(["<center>{abstract} <br> General user</center>"])

    L4_1([Guest])
    L4_2([Admin])
    L4_3([User])
    L4_4([Librarian])

    L2_1 --> L1
    L2_2 --> L1
    L2_3 --> L1
 
    L4_1 --> L3
    L4_2 --> L3
    L4_3 --> L3
    L4_4 --> L3

    
```

---

## Usecase Diagram

```mermaid
flowchart TD
    %% Actors 
    Actor1(["<center>{abstract} <br> General user</center>"])
    Actor2(["User"])

    %% System Boundary Subgraph
    subgraph BooksSystem [Books]
        %% Column 1: Search & Filter Features
        subgraph SearchBlock [Search Features]
            UC_StdSearch((Standard Search))
            UC_SemSearch((Semantic Search))
            UC_AbsSearching(("<center>{abstract}<br>Searching Book</center>"))
            UC_Filter((Filtering Book))
        end
        
        %% Column 2: Book Actions
        subgraph ActionBlock [Book Actions]
            UC_ViewDetail((View Book Detail))
            UC_AddFav((Add book favorite))
            UC_Reserve((Reserve Book))
        end
        
        %% Column 3: Reservation Management
        subgraph ReserveBlock [Reservation Management]
            UC_AbsManageReserve(("<center>{abstract}<br>Managing Reserved Book</center>"))
            UC_CreateReserve((Creating Book Reservation))
            UC_CancelReserve((Canceling Book Reservation))
            UC_GenPin((Generating Pin))
        end
    end

    %% -------------------------------------------------------------
    %% Actor Associations
    %% -------------------------------------------------------------
    Actor1 --- UC_AbsSearching
    Actor1 --- UC_Filter
    Actor1 --- UC_ViewDetail
    Actor2 --- UC_AddFav
    Actor2 --- UC_Reserve
    Actor1 ~~~ Actor2

    %% -------------------------------------------------------------
    %% Generalization Relationships
    %% -------------------------------------------------------------
    UC_StdSearch --> UC_AbsSearching
    UC_SemSearch --> UC_AbsSearching
    
    UC_CreateReserve --> UC_AbsManageReserve
    UC_CancelReserve --> UC_AbsManageReserve
    UC_GenPin --> UC_AbsManageReserve

    %% -------------------------------------------------------------
    %% Extend & Include Relationships
    %% -------------------------------------------------------------
    UC_AddFav -. "<< extend >>" .-> UC_ViewDetail
    UC_Reserve -. "<< extend >>" .-> UC_ViewDetail
    UC_Reserve -. "<< include >>" .-> UC_AbsManageReserve

    %% Styling
    style BooksSystem fill:#fff,stroke:#333,stroke-width:2px
    style SearchBlock fill:none,stroke:none
    style ActionBlock fill:none,stroke:none
    style ReserveBlock fill:none,stroke:none

```


---

## UC-BK-01: Book Searching

*Specialized by Standard Search (Keyword matching) and Semantic search (Context queries).*

### 1. Use-Case Name

Book Searching

#### 1.1 Brief Description

Allows the user to look up specific books within the library system catalog using either explicit keyword parameters (title, author, ISBN strings) or context-aware semantic phrases. The system handles processing configurations via an explicit user mode toggle switch, accommodates minor typos dynamically, triggers automatically upon pressing the "Enter" key, coordinates alongside active metadata filters, and records all query executions into the historical search database.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user accesses the primary catalog search interface view.
2. **[System Response]**: The system displays the search panel dashboard layout, featuring a text input field, an explicit mode toggle switch (Standard vs. Semantic), and access to metadata filter control panels.
3. **[Actor Action]**: The user adjusts the toggle switch to their preferred search type (Standard Keyword or Semantic Context).
4. **[Actor Action]**: *Optional:* The user sets or updates overlapping constraint toggles within the metadata filter panels (e.g., availability status, structural categories, languages, or publication eras).
5. **[Actor Action]**: The user types their query string into the search input box. (The background typo-tolerance layer dynamically monitors input parameters for character permutations).
6. **[Actor Action]**: The user executes the query by pressing the **Enter** key on their keyboard or clicking the search icon button widget.
7. **[Data Processing]**: The system intercepts the submission runtime event and immediately creates an asynchronous database logging transaction to write the raw search text string, timestamp, applied filter, and User ID parameters into the historical search database log tables.
8. **[Data Processing]**: The system processes the query payload text by both keywords and context-aware matching.  
9. **[Data Processing]**: The system applies any active metadata filter constraint parameters to strip disqualified records out of the resulting query dataset match array.
10. **[Display Result]**: The system displays the final ranked, filtered list layout array of matching book cards (cover image, title, author, genre) onto the viewport panel.
11. **[Actor Action]**: The user may scroll through the results and optionally choose to save a specific book directly to their wishlist.

#### 2.2 Alternative Flows

##### 2.2.1 Search History Logging Failure (Step 7)

If the search history database logging pipeline encounters an error or timeout:

1. The system catches the write exception silently.
2. The system logs it within internal application diagnostic error frameworks.
3. The system bypasses the historical logging block directly and resumes execution at Step 8 to prevent disrupting the user search lifecycle experience.

* **Postcondition (Alternative Flow):** Search results render normally on the interface viewport layer, but the specific search instance context is omitted from historical user logs.

##### 2.2.2 Zero Catalog Matches (Step 8)

If the system identifies zero exact, partial, fuzzy, or semantic catalog matches:

1. The system interrupts standard rendering and outputs an empty panel state layout.

* **Postcondition (Alternative Flow):** A zero-match notification prompt window appears on-screen alongside generic default popular listings. Alternate permutations may drop back to standard keyword text match structural summaries (logging an infrastructure error notice behind the scenes) or push cached historical index layers directly into viewport screens with warning alerts flashed.

### 3. Special Requirements

#### 3.1 Performance SLA Boundaries

Standard keyword lookup database queries must complete rendering cycles within 1.5 seconds; semantic vector model matching operations must execute under a 3.0-second performance limit window.

#### 3.2 Dynamic Typo Tolerance

The background fuzzy logic typo-tolerance algorithm must dynamically resolve single/double character transpositions or common character substitutions without creating measurable lookup degradation.

#### 3.3 String Sanitization Injection Guards

Wildcard processing expressions must pass through string cookies sanitization parameters to fully block malicious SQL pattern injection vectors.

#### 3.4 Non-Blocking Thread Execution

Search history database insertion commands must be non-blocking and execute strictly on background threads to ensure the UI interface main rendering loop remains highly responsive.

### 4. Preconditions

#### 4.1 UI Location Context

The user has navigated to the catalog query dashboard interface.

#### 4.2 Core Subsystem Verification

The book relational database index and specialized vector storage AI model database module are active and online.

### 5. Postconditions

#### 5.1 Workspace Population

The relevant search query matches successfully populate the active layout window on screen.

#### 5.2 Transaction Logging Commitment

The user's query parameters are safely recorded inside the historical database logging framework for analytics and user history dashboards.

### 6. Extension Points

None.

---

## UC-BK-02: Filtering Book

### 1. Use-Case Name

Filtering Book

#### 1.1 Brief Description

Enables the granular filtering of active displayed collections by parameters such as availability status, structural categories, languages, or publication eras.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user opens the filter settings sidebar control interface module panel.
2. **[System Response]**: The system shows checkboxes representing system metadata filter categories.
3. **[Actor Action]**: The user sets multiple overlapping constraint toggle checks.
4. **[Data Processing]**: The system dynamically updates the query arrays to crop records failing check matches.
5. **[Display Result]**: The system strips disqualified cards out of view without forcing complete browser workspace reloads.

#### 2.2 Alternative Flows

##### 2.2.1 Overfiltering Outcome (Step 4)

If overfiltering occurs, yielding zero matching index properties:

1. The system presents an active "Reset All Applied Filters" UI component widget inside an explicit helper panel layout block.

* **Postcondition (Alternative Flow):** A null results screen layout element displays along with active reset interaction shortcuts.

### 3. Special Requirements

#### 3.1 Asynchronous Adjustments

Filter matrix indexing state checks must be applied asynchronously to guarantee zero-latency listing adjustments.

### 4. Preconditions

#### 4.1 Populated Dataset Context

An active population list of catalog items is rendered inside the view browser pane area.

### 5. Postconditions

#### 5.1 Grid Alignment State

Active browse window lists map exactly to all applied parameter limit criteria states.

### 6. Extension Points

None.

---

## UC-BK-03: View Book Detail

*Extended by use cases: UC-BK-04 (Add Book Favorite), UC-BK-05 (Book Reservation).*

### 1. Use-Case Name

View Book Detail

#### 1.1 Brief Description

Acts as the primary informational hub for a specific catalog asset. It retrieves comprehensive book metadata, real-time inventory counts, user reviews, dynamically compiles a carousel of related books based on genre classification, and hosts entry nodes for user interactions (Wishlist, Favorites, and Reservations).

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user clicks on a specific book cover visual image component or text link element anchor object from any display grid or search result array.
2. **[System Response]**: The system captures the event parameter and calls a background object retrieval query to fetch database records tied to the chosen unique identification string (`Book_ID`).
3. **[Data Processing]**: The system extracts structural descriptive fields (Title, Author, Publisher, Synopsis summary text, and user review message matrices).
4. **[Data Processing]**: The system requests live, real-time snapshot inventory balance summaries to calculate total copies owned versus active copies currently available for circulation.
5. **[Data Processing]**: The system queries the book catalog database to isolate up to 10 highly rated or trending books sharing matching genre classifications with the current target book.
6. **[Display Result]**: The system renders the comprehensive profile view template workspace, mapping metadata, inventory states, and reviews cleanly into upper layout blocks.
7. **[Display Result]**: The system populates a horizontal, swipeable "Related Books by Genre" carousel grid component at the terminal end of the page viewport layout.
8. **[System Response]**: The system checks the active user session status token to dynamically expose action controls:
* **For all users:** Exposes basic detail visibility and the related carousel nodes.
* **For authenticated users:** Activates operational interaction buttons for "Add to Wishlist" (heart icon) and "Reserve Book".


9. **[Actor Action]**: The user reviews the details and can scroll through the carousel, click a related book to transition views, or click an interaction button to trigger a secondary workflow.

#### 2.2 Alternative Flows

##### 2.2.1 Empty Genre Associations (Step 5)

If no related books are found in the matching genre catalog data arrays:

1. The system dynamically alters its query criteria to retrieve a list of random books instead.
2. The workflow proceeds directly to Step 6 of the Basic Flow.

##### 2.2.2 Record Reference Corruption (Step 2)

If the specific `Book_ID` string refers to a record that has been permanently purged or corrupted:

1. The system aborts the page layout compilation script immediately.
2. The system triggers a contextual toast notification modal warning window: "The selected book profile is currently unavailable."
3. The system routes the user viewport cleanly backward to their previously active listing dashboard workspace.

* **Postcondition (Alternative Flow):** No data attributes modify; the user workspace safely falls back to stable resting panels.

### 3. Special Requirements

#### 3.1 Metadata Performance Thresholds

The primary page layout metadata elements (Title, Author, Inventory counts) must load within a maximum 1.0-second time ceiling; the lower related genre carousel asset pipeline can execute asynchronously to prevent locking the initial main frame rendering loop.

### 4. Preconditions

#### 4.1 Visual Target Anchor

A targeted book item component, link anchor text, or search result card is rendered on the user's active screen layout.

### 5. Postconditions

#### 5.1 Sheet Output Delivery

The requested book detail sheet successfully outputs to the client interface window.

#### 5.2 Entry Node Accessibility

All relevant context-driven interactive entry paths (Wishlist/Reservation links) sit in a fully receptive, ready-to-click state.

### 6. Extension Points

#### 6.1 Add Book Favorite

* Location inside event flow: Exposing action controls for authenticated users (Step 8).

#### 6.2 Book Reservation

* Location inside event flow: Exposing action controls for authenticated users (Step 8).

---

## UC-BK-04: Add Book Favorite

*Extends UC-BK-03 (View Book Detail) — extension point: Exposing action controls for authenticated users.*

### 1. Use-Case Name

Add Book Favorite

#### 1.1 Brief Description

Extends detailed profiles to allow users to anchor an item to their account collections for rapid retrieval access utilities.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user initiates a request by clicking the Heart icon on the book details cover pane interface.
2. **[Data Processing]**: The system inserts a relationship link row tracking User ID to Book ID into the system database.
3. **[Display Result]**: The system modifies the color of the icon component to red and fires a system status toast announcement to demonstrate successful data binding.
4. **[Actor Action]**: The user can later review the personal wishlist in their main wishlist dashboard space.

#### 2.2 Alternative Flows

##### 2.2.1 Asset Redundancy (Step 1)

If the selected catalog asset identity string already resides inside active user favorites data arrays:

1. The system registers the action as an intentional favorite deletion prompt.
2. The system extracts the relationship string link row from database tables.
3. The system clears the heart icon color highlight indicators back to default status configurations.

* **Postcondition (Alternative Flow):** Association metrics delete cleanly; visual markers change status flags back to default baseline states.

### 3. Special Requirements

#### 3.1 Real-Time Cross-Device Sync

Favorites list data synchronization configurations must update global account views across cross-device endpoints instantaneously.

### 4. Preconditions

#### 4.1 Session Verification

The user account profile state checks match valid system authentication benchmarks.

#### 4.2 Context Parameter

The user is actively executing active workspace viewing tasks inside `UC-BK-03`.

### 5. Postconditions

#### 5.1 Structural Element UI Changes

The color of the heart icon turns red on the client side interface.

#### 5.2 Storage Confirmation

Target catalog objects sit successfully inside user dashboard wishlist modules.

### 6. Extension Points

None.

---

## UC-BK-05: Book Reservation

*Extends UC-BK-03 (View Book Detail) — extension point: Exposing action controls for authenticated users.*

*Specializes the abstract usecase Managing Reserved Books.*

### 1. Use-Case Name

Book Reservation

#### 1.1 Brief Description

Handles the end-to-end process allowing an authenticated user to place a physical hold on a book copy directly from its details page. The system internally enforces account constraint metrics, checks real-time inventory availability layers, updates catalog status allocations, and writes transaction logs securely.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user clicks the primary "Reserve Book" action button parameter layout object node on the book details screen.
2. **[System Response]**: The system intercepts the transaction context request and evaluates the user's active concurrent reservation counts against maximum account allowance thresholds.
3. **[System Response]**: The system queries internal inventory engines to verify that a physical copy tracking row for the matching asset carries an explicit "Available" tracking tag status.
4. **[Data Processing]**: The system locks the selected target copy database row record, changing its state configuration status flag from "Available" to "Reserved".
5. **[Data Processing]**: The system logs a fresh instance tracking transaction entry row detailing unique timestamps, user identifiers, reference keys, and an automated pickup expiration countdown tracker.
6. **[Display Result]**: The system updates live inventory tracking counts (decrementing available copies) and presents a checkout success overview dashboard containing return deadlines, pickup instructions, and option nodes to view the pickup verification details.

#### 2.2 Alternative Flows

##### 2.2.1 Account Caps Reached (Step 2)

If user metrics show current concurrent items match or pass system cap limits:

1. The system blocks processing workflows and halts the allocation sequence execution.
2. The system throws and displays an explicit validation error interface block: "Account Reservation Limit Reached".

##### 2.2.2 Material Allocation Shortage (Step 3)

If the inventory query reveals that all physical tracking records for the matching asset register zero available quantities:

1. The system cancels the standard booking pathway logic parameters.
2. The system updates screen interface element blocks and opens an interactive confirmation modal dialogue box asking if the user desires inclusion on public queue waiting lists.

### 3. Special Requirements

#### 3.1 Strict Data Isolation Concurrency Guards

Inventory state checking steps and status parameter adjustments must rely entirely on strict isolation transaction patterns (atomic locking mechanisms) to fully block database race conditions or double-booking conflicts during concurrent heavy usage spikes.

### 4. Preconditions

#### 4.1 Token Security Check

The user session tokens maintain authenticated statuses inside core system modules.

#### 4.2 Parent Context Reference

The user is actively executing workspace view processing steps inside `UC-BK-03`.

### 5. Postconditions

#### 5.1 Structural Account Allocation

A digital item hold reservation token binds securely against the user’s account database portfolio records.

#### 5.2 Material Ledger Reduction

Physical library copy availability allocations drop dynamically, and a transactional database logging instance records securely in history tables.

### 6. Extension Points

None.

---

## UC-BK-06: Canceling Book Reservation

*Specializes the abstract usecase Managing Reserved Books.*

### 1. Use-Case Name

Canceling Book Reservation

#### 1.1 Brief Description

Allows a user to void outstanding holds on book assets, clearing tracking rows and returning units to open circulation loops.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user accesses their account profile reservation review summary board.
2. **[Actor Action]**: The user identifies the specific reservation card item layout block and clicks the "Cancel Reservation" text control trigger button.
3. **[Data Processing]**: The system updates tracking records, changing status descriptions to "Cancelled".
4. **[Data Processing]**: The system increments item allocation numbers, marking the physical inventory asset copy status to "Available".
5. **[Display Result]**: The system strips the active item block out of current summary layout screens.

#### 2.2 Alternative Flows

##### 2.2.1 Network Drops Mid-Commit (Step 3)

If system network connections drop mid-cancellation updates:

1. The system rolls database operational steps backward cleanly.
2. The system prompts users with a warning modal box stating "Action failed, please attempt transaction verification again."

* **Postcondition (Alternative Flow):** Data records drop out of update routines; original reservation statuses maintain their state configurations.

### 3. Special Requirements

#### 3.1 Broadcast Synchronicity

Canceled item inventory allocation changes must synchronize instantaneously across search discovery database pools to reflect open availability fields.

### 4. Preconditions

#### 4.1 Identity Check

The user is authenticated within core security frameworks.

#### 4.2 Extant Record Verification

An active hold profile row data record exists mapped against the user identifier profile key attributes.

### 5. Postconditions

#### 5.1 Account Queue Dropping

Active reservation entry parameters drop out of active queues; physical library counts update successfully.

### 6. Extension Points

None.

---

## UC-BK-07: Generating Pin

*Specializes the abstract usecase Managing Reserved Books.*

### 1. Use-Case Name

Generating Pin

#### 1.1 Brief Description

Generates temporary, high-security validation passcode tokens to authorize locker retrieval or desk checkout protocols.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user navigates to the active booking details pane within their account hub dashboard.
2. **[Actor Action]**: The user triggers the "Generate Pickup PIN" transaction button control item.
3. **[System Response]**: The system runs security hashing modules to output a 6-digit numeric passkey linked to that collection row ID.
4. **[Data Processing]**: The system stores the passkey in short-term active memory caches with an explicit 15-minute time-to-live parameter.
5. **[Display Result]**: The system renders the generated PIN digits on-screen using large high-contrast text styling components alongside a live visual countdown progress bar tracker.

#### 2.2 Alternative Flows

##### 2.2.1 Checkout Expiration Time Breach (Step 4)

If the tracking countdown reaches zero before terminal checkouts finish:

1. The system purges the expired passcode token sequence out of live cache parameters.
2. The system alters UI layouts to reveal a "Regenerate Expired Token" control shortcut.

* **Postcondition (Alternative Flow):** Authorization passcodes delete out of lookup caches; screen output contents display expired states.

### 3. Special Requirements

#### 3.1 Cryptographic Randomization

Numeric token generation engines must use cryptographically secure random values to prevent predictable generation strings.

### 4. Preconditions

#### 4.1 Item Pipeline State

A specific target hold tracking status is officially set to "Ready for Pickup".

### 5. Postconditions

#### 5.1 Instance Authentication Staging

A secure token instance exists inside application memory, and authentication interfaces display access credentials.

### 6. Extension Points

None.
