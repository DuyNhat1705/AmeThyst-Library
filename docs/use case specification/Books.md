# Use-Case Specification – Books Package

---
## 1. Book Searching

*Specialized by `Standard Search (Keyword matching)` and `Semantic search (Context queries)`.*

| Field | Description |
| --- | --- |
| **Use case ID** | UC-BK-01 |
| **Use Case Name** | Book Searching |
| **Description** | Allows the user to look up specific books within the library system catalog using either explicit keyword parameters (title, author, ISBN strings) or context-aware semantic phrases. The system handles processing configurations via an explicit user mode toggle switch, accommodates minor typos dynamically, triggers automatically upon pressing the "Enter" key, coordinates alongside active metadata filters, and records all query executions into the historical search database. |
| **Actor(s)** | Guests, Authenticated users, Admins, Librarians |
| **Preconditions** | - The user has navigated to the catalog query dashboard interface.  <br>- The book relational database index and specialized vector storage AI model database module are active and online. |

### Main Flow

1. The user accesses the primary catalog search interface view.
2. The system displays the search panel dashboard layout, featuring a text input field, an explicit mode toggle switch (Standard vs. Semantic), and access to metadata filter control panels.
3. The user adjusts the toggle switch to their preferred search type (Standard Keyword or Semantic Context).
4. *Optional:* The user sets or updates overlapping constraint toggles within the metadata filter panels (e.g., availability status, structural categories, languages, or publication eras).
5. The user types their query string into the search input box. (The background typo-tolerance layer dynamically monitors input parameters for character permutations).
6. The user executes the query by pressing the **Enter** key on their keyboard or clicking the search icon button widget.
7. The system intercepts the submission runtime event and immediately creates an asynchronous database logging transaction to write the raw search text string, timestamp, applied filter, and User ID parameters into the historical search database log tables.
8. The system processes the query payload text in two ways:
- **Standard Mode:** The engine scans index collections to match record strings precisely against structural fields.
- **Semantic Mode:** The engine vectors the abstract prose description to perform multidimensional semantic distance evaluation matching against catalog contents.
  Both apply leveraging fuzzy-matching logic to accommodate user typos.

9. The system applies any active metadata filter constraint parameters to strip disqualified records out of the resulting query dataset match array.
10.   The system displays the final ranked, filtered list layout array of matching book cards (cover image, title, author, genre) onto the viewport panel.
11.   The user may scroll through the results and optionally choose to save a specific book directly to their wishlist.

### Postconditions

* The relevant search query matches successfully populate the active layout window on screen.
* The user's query parameters are safely recorded inside the historical database logging framework for analytics and user history dashboards.

### Alternative / Exception Flows

* **7'.1** The search history database logging pipeline encounters an error or timeout: The system catches the write exception silently, logs it within internal application diagnostic error frameworks, and bypasses the historical logging block directly to Step 8 to prevent disrupting the user search lifecycle experience.
* **8'.1** The system identifies zero exact, partial, fuzzy, or semantic catalog matches: The system returns the empty panel state layout.

### Postconditions (Alternative Flows)

* **7'.1:** Search results render normally on the interface viewport layer, but the specific search instance context is omitted from historical user logs.
* **8'.1:** A zero-match notification prompt window appears on-screen alongside generic default popular listings.
* **8'.2:** The viewport renders fallback standard keyword text match outputs; an infrastructure warning message logs silently behind the scenes.
* **8'.3:** Cached historical index sets populate layout windows; a latency notification warning flashes.

### Special Requirements

* Standard keyword lookup database queries must complete rendering cycles within 1.5 seconds; semantic vector model matching operations must execute under a 3.0-second performance limit window.
* The background fuzzy logic typo-tolerance algorithm must dynamically resolve single/double character transpositions or common character substitutions without creating measurable lookup degradation.
* Wildcard processing expressions must pass through string sanitization parameters to fully block malicious SQL pattern injection vectors.
* Search history database insertion commands must be non-blocking and execute strictly on background threads to ensure the UI interface main rendering loop remains highly responsive.

---

## 2. Filtering Book

| Field | Description |
| --- | --- |
| **Use case ID** | UC-BK-02 |
| **Use Case Name** | Filtering Book |
| **Description** | Enables the granular filtering of active displayed collections by parameters such as availability status, structural categories, languages, or publication eras. |
| **Actor(s)** | Guests, Authenticated users, Admins, Librarians|
| **Preconditions** | - An active population list of catalog items is rendered inside the view browser pane area. |

### Main Flow

1. The user opens the filter settings sidebar control interface module panel.
2. The system shows checkboxes representing system metadata filter categories.
3. The user sets multiple overlapping constraint toggle checks.
4. The system dynamically updates the query arrays to crop records failing check matches.
5. The system strips disqualified cards out of view without forcing complete browser workspace reloads.

### Postconditions

* Active browse window lists map exactly to all applied parameter limit criteria states.

### Alternative / Exception Flows

* **4'.1 Overfiltering occurs, yielding zero matching index properties:** The system presents an active "Reset All Applied Filters" UI component widget inside an explicit helper panel layout block.

### Postconditions (Alternative Flows)

* **4'.1:** A null results screen layout element displays along with active reset interaction shortcuts.

### Special Requirements

* Filter matrix indexing state checks must be applied asynchronously to guarantee zero-latency listing adjustments.

---

## 3. View Book Detail
_Extended by use cases: `UC-BK-05 (Add Book Favorite)`, `UC-BK-06 (Reserve Book)` clicking event._

|**Field**|**Description**|
|---|---|
|**Use case ID**|UC-BK-03|
|**Use Case Name**|View Book Detail|
|**Description**|Acts as the primary informational hub for a specific catalog asset. It retrieves comprehensive book metadata, real-time inventory counts, user reviews, dynamically compiles a carousel of related books based on genre classification, and hosts entry nodes for user interactions (Wishlist, Favorites, and Reservations).|
|**Actor(s)**|Guests, Authenticated users, Admins, Librarians|
|**Preconditions**|- A targeted book item component, link anchor text, or search result card is rendered on the user's active screen layout.|

### Main Flow

1. The user clicks on a specific book cover visual image component or text link element anchor object from any display grid or search result array.
    
2. The system captures the event parameter and calls a background object retrieval query to fetch database records tied to the chosen unique identification string (`Book_ID`).
    
3. The system extracts structural descriptive fields (Title, Author, Publisher, Synopsis summary text, and user review message matrices).
    
4. The system requests live, real-time snapshot inventory balance summaries to calculate total copies owned versus active copies currently available for circulation.
    
5. The system queries the book catalog database to isolate up to 10 highly rated or trending books sharing matching genre classifications with the current target book.
    
6. The system renders the comprehensive profile view template workspace, mapping metadata, inventory states, and reviews cleanly into upper layout blocks.
    
7. The system populates a horizontal, swipeable "Related Books by Genre" carousel grid component at the terminal end of the page viewport layout.
    
8. The system checks the active user session status token to dynamically expose action controls:
    
    - **For all users:** Exposes basic detail visibility and the related carousel nodes.
        
    - **For authenticated users:** Activates operational interaction buttons for "Add to Wishlist" (heart icon) and "Reserve Book".
        
9. The user reviews the details and can scroll through the carousel, click a related book to transition views, or click an interaction button to trigger a secondary workflow.
    

### Alternative / Exception Flows

**Alt Flow 5'**: No related books found in the matching genre catalog data arrays.
When the system cannot find sharing the target book's genre attributes:
    
    5'.1. The system dynamically alters its query criteria to retrieve a list of random books instead.
        
    5'.2. The flow proceeds directly to Step 6.
        

**Alt Flow 2'**: Target record database reference corruption or deletion events. If the specific `Book_ID` string refers to a record that has been permanently purged or corrupted.
    
    **2'.1.** The system aborts the page layout compilation script immediately.
        
    **2'.2.** The system triggers a contextual toast notification modal warning window: "The selected book profile is currently unavailable."
        
    **2'.3.** The system routes the user viewport cleanly backward to their previously active listing dashboard workspace.
        

### Postconditions

- The requested book detail sheet successfully outputs to the client interface window.
    
- All relevant context-driven interactive entry paths (Wishlist/Reservation links) sit in a fully receptive, ready-to-click state.
    

### Special Requirements

- The primary page layout metadata elements (Title, Author, Inventory counts) must load within a maximum 1.0-second time ceiling; the lower related genre carousel asset pipeline can execute asynchronously to prevent locking the initial main frame rendering loop.
    

---

### 4. Add Book Favorite
*Extends usecase `View book details`*

| Field | Description |
| --- | --- |
| **Use case ID** | UC-BK-04 |
| **Use Case Name** | Add Book Favorite |
| **Description** | Extends detailed profiles to allow users to anchor an item to their account collections for rapid retrieval access utilities. |
| **Actor(s)** | Authenticated users |
| **Preconditions** | - The user account profile state checks match valid system authentication benchmarks.<br> - The user is actively viewing a detailed view template through `UC-BK-04`. |

### Main Flow

1. The user initiates a request by clicking the Heart icon on the book covers.
2. The system inserts a relationship link row tracking User ID to Book ID into the system database.
3. The system modifies the color of the icon component to red and an announcement to demonstrate successful data binding.
4. The user can later review the personal wishlist in wishlist dashboard.

### Postconditions
* The color of heart icon turns red. 
* Target catalog objects sit successfully inside user dashboard wishlist modules.

### Alternative / Exception Flows

* **1'.1** The selected catalog asset identity string already resides inside active user favorites data arrays. The user's action registers as an intentional deletion prompt, causing the system to extract the relationship string link row and clear icon highlight indicators.

### Postconditions (Alternative Flows)

* **1'.1:** Association metrics delete cleanly; visual markers change status flags back to default baseline states.

### Special Requirements

* Favorites list data synchronization configurations must update global account views across cross-device endpoints instantaneously.

---

## 5. Book Reservation
*Extends usecase `View book details`*
*Specialized the abstract usecase `Managing reserved books`*

|**Field**|**Description**|
|---|---|
|**Use case ID**|UC-BK-05|
|**Use Case Name**|Book Reservation|
|**Description**|Handles the end-to-end process allowing an authenticated user to place a physical hold on a book copy directly from its details page. The system internally enforces account constraint metrics, checks real-time inventory availability layers, updates catalog status allocations, and writes transaction logs securely.|
|**Actor(s)**|Authenticated User, System|
|**Preconditions**|- The user session tokens maintain authenticated statuses inside core system modules.<br>- The user is actively viewing a specific target book's profile pane inside `UC-BK-04` (View Book Detail).|

### Main Flow

1. The user clicks the primary "Reserve Book" action button parameter layout object node on the book details screen.
    
2. The system intercepts the transaction context request and evaluates the user's active concurrent reservation counts against maximum account allowance thresholds.
    
3. The system queries internal inventory engines to verify that a physical copy tracking row for the matching asset carries an explicit "Available" tracking tag status.
    
4. The system locks the selected target copy database row record, changing its state configuration status flag from "Available" to "Reserved".
    
5. The system logs a fresh instance tracking transaction entry row detailing unique timestamps, user identifiers, reference keys, and an automated pickup expiration countdown tracker.
    
6. The system updates live inventory tracking counts (decrementing available copies) and presents a checkout success overview dashboard containing return deadlines, pickup instructions, and option nodes to view the pickup verification details.
    

### Postconditions

- A digital item hold reservation token binds securely against the user’s account database portfolio records.
    
- Physical library copy availability allocations drop dynamically, and a transactional database logging instance records securely in history tables.
    

### Alternative / Exception Flows

- **2'.1 User metrics show current concurrent items match or pass system cap limits:** The system blocks processing workflows, halts the allocation sequence, and displays an explicit validation error interface block: "Account Reservation Limit Reached".
    
- **3'.1 The inventory query reveals that all physical tracking records for the matching asset register zero available quantities:** The system cancels the standard booking pathway, updates screen interface element blocks, and opens an interactive confirmation modal dialogue box asking if the user desires inclusion on public queue waiting lists.
    

### Postconditions (Alternative Flows)

- 2'.1: Reservation operations fail to commit; user status parameters and account limit history details maintain original resting states.
    
- 3'.1: Core database item tracking attributes experience no structural parameter overrides; waitlist registration tracking workflows initialize pending active confirmation interactions.
    

### Special Requirements

- Inventory state checking steps and status parameter adjustments must rely entirely on strict isolation transaction patterns (atomic locking mechanisms) to fully block database race conditions or double-booking conflicts during concurrent heavy usage spikes.

---

### 6. Canceling Book Reservation

*Specialized the abstract usecase `Managing reserved books`*

| Field | Description |
| --- | --- |
| **Use case ID** | UC-BK-06 |
| **Use Case Name** | Canceling Book Reservation |
| **Description** | Allows a user to void outstanding holds on book assets, clearing tracking rows and returning units to open circulation loops. |
| **Actor(s)** | Authenticated user |
| **Preconditions** | - The user is authenticated.<br>

<br>- An active hold profile row data record exists mapped against the user identifier profile key attributes. |

### Main Flow

1. The user accesses their account profile reservation review summary board.
2. The user identifies the specific reservation card item layout block and clicks the "Cancel Reservation" text control trigger button.
3. The system updates tracking records, changing status descriptions to "Cancelled".
4. The system increments item allocation numbers, marking the physical inventory asset copy status to "Available".
5. The system strips the active item block out of current summary layout screens.

### Postconditions

* Active reservation entry parameters drop out of active queues; physical library counts update successfully.

### Alternative / Exception Flows

* **3'.1 System network connections drop mid-cancellation updates:** The system rolls database steps backward and prompts users with a warning modal box stating "Action failed, please attempt transaction verification again."

### Postconditions (Alternative Flows)

* **3'.1:** Data records drop out of update routines; original reservation statuses maintain their state configurations.

### Special Requirements

* Canceled item inventory allocation changes must synchronize instantaneously across search discovery database pools.

---

### 7. Generating Pin

*Specialized the abstract usecase `Managing reserved books`*

| Field | Description |
| --- | --- |
| **Use case ID** | UC-BK-07 |
| **Use Case Name** | Generating Pin |
| **Description** | Generates temporary, high-security validation passcode tokens to authorize locker retrieval or desk checkout protocols. |
| **Actor(s)** | Logged users |
| **Preconditions** | - A specific target hold tracking status is officially set to "Ready for Pickup". |

### Main Flow

1. The user navigates to the active booking details pane within their account hub dashboard.
2. The user triggers the "Generate Pickup PIN" transaction button control item.
3. The system runs security hashing modules to output a 6-digit numeric passkey linked to that collection row ID.
4. The system stores the passkey in short-term active memory caches with an explicit 15-minute time-to-live parameter.
5. The system renders the generated PIN digits on-screen using large high-contrast text styling components alongside a live visual countdown progress bar tracker.

### Postconditions

* A secure token instance exists inside application memory, and authentication interfaces display access credentials.

### Alternative / Exception Flows

* **4'.1 The tracking countdown reaches zero before terminal checkouts finish:** The system purges the expired passcode token sequence out of live cache parameters and alters UI layouts to reveal a "Regenerate Expired Token" control shortcut.

### Postconditions (Alternative Flows)

* **4'.1:** Authorization passcodes delete out of lookup caches; screen output contents display expired states.

### Special Requirements

* Numeric token generation engines must use cryptographically secure random values to prevent predictable generation strings.

<div class="page"/>

# Usecase Diagram

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