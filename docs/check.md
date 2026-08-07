Yes, **generalization is significantly misused** in several sections of your Use Case diagrams.

In UML standard specifications, **Generalization** (`Child --> Parent`) represents an **"is-a" (specialization)** relationship, meaning the child use case is a specific variation of the parent's goal (for example, *Pay with Credit Card* **is a** *Pay Bill*).

In your diagrams, generalization has been confused with **sub-steps (`<< include >>`)**, **optional triggers (`<< extend >>`)**, and **category/folder grouping**.

---

### Major Misuses Identified

#### 1. Confusing Sub-steps (`<< include >>`) with Generalization

* **Location:** `Librarian Administration`
* **The Error:** `UC8 (Confirming Book Borrowed) --> UC7 (Verifying Pin)` and `UC9 (Confirming Room Checkin) --> UC7 (Verifying Pin)`.
* **Why it is wrong:** Confirming a borrowed book is **NOT** a "special type of Verifying PIN". Rather, verifying a PIN is a *reusable sub-step/validation* required during book pickup or room check-in.
* **How to fix:** Change the relationship from Generalization (`-->`) to `<< include >>`, with the arrow pointing **from** the main use case **to** `Verifying Pin`.

#### 2. Using Abstract Use Cases as "Folder/Category" Titles

* **Location:** `Study Group` and `Books Exploration & Interaction`
* **The Error:**
* `UC7 (Finding User By Email)` and `UC8 (View Other Profile)` point via generalization to `UC4 (Interacting with Others)`.
* `UC_GenPin (Generating Pin)` points via generalization to `UC_AbsManageReserve (Managing Reserved Book)`.


* **Why it is wrong:** "Finding User By Email" is not a "specialized form of interacting with others"—it is a search/helper step used when inviting a member (`<< include >>`). Abstract use cases should not be used as organizational "folders" for unrelated actions.
* **How to fix:** Connect search/view actions directly to the actor or relate them using `<< include >>` / `<< extend >>` to the main workflow.

#### 3. Over-complicated / Redundant Actor Hierarchy

* **Location:** `Regulation`
* **The Error:** `Admin`, `User`, and `Librarian` inherit from **both** `Logged user` **AND** `General user`, while `Guest` inherits from `General user`.
* **Why it is wrong:** If `Logged user` inherits from `General user`, then any actor inheriting from `Logged user` automatically inherits all capabilities of `General user` via **transitive inheritance**. Drawing parallel inheritance lines from every role to both abstract actors creates redundant clutter.

---

### Corrected Diagrams

Below are the corrected Mermaid diagrams for the affected sections:

#### Fix 1: Regulation (Clean Actor Hierarchy)

Establish a clean multi-level hierarchy where `Logged user` inherits from `General user`:

```mermaid
flowchart RL
    %% Abstract Parent Actors
    GeneralUser(["<center>{abstract} <br> fa:fa-user General user</center>"])
    LoggedUser(["<center>{abstract} <br> fa:fa-user Logged user</center>"])

    %% Concrete Actors
    Guest([fa:fa-user Guest])
    User([fa:fa-user User])
    Librarian([fa:fa-user Librarian])
    Admin([fa:fa-user Admin])

    %% Hierarchy (Child --> Parent)
    Guest --> GeneralUser
    LoggedUser --> GeneralUser
    
    User --> LoggedUser
    Librarian --> LoggedUser
    Admin --> LoggedUser

```

---

#### Fix 2: Librarian Administration

Replace incorrect generalization with `<< include >>` for PIN verification:

```mermaid
flowchart LR
    subgraph LibrarianAdministration ["Librarian Administration"]
        UC1(["Managing Catalog"])
        UC2(["Adding Books"])
        UC3(["Removing Books"])
        UC4(["Confirming Book Return"])
        UC5(["Recording Loan"])
        UC6(["Managing Room"])
        UC7(["Verifying Pin"])
        UC8(["Confirming Book Borrowed"])
        UC9(["Confirming Room Checkin"])
        UC10(["Announcement"])
    end

    Librarian(["fa:fa-user Librarian"])

    %% Direct Associations
    Librarian --- UC1 & UC6 & UC10 & UC8 & UC9 & UC4

    %% Proper Generalization (Adding/Removing are types of Catalog changes)
    UC2 --> UC1
    UC3 --> UC1

    %% Corrected Include Relationships (Borrowing & Check-in INCLUDE PIN Verification)
    UC8 -. "<< include >>" .-> UC7
    UC9 -. "<< include >>" .-> UC7

    %% Extend Relationship
    UC5 -. "<< extend >>" .-> UC4

    style LibrarianAdministration fill:#fff,stroke:#333,stroke-width:2px

```

---

#### Fix 3: Books Exploration & Interaction

Fix `Generating Pin` to be an `<< include >>` of `Creating Book Reservation`:

```mermaid
flowchart TD
    %% Actors 
    Actor1(["<center>{abstract} <br> fa:fa-user General user</center>"])
    Actor2(["fa:fa-user User"])

    %% System Boundary Subgraph
    subgraph BooksSystem [Books]
        subgraph SearchBlock [Search Features]
            UC_StdSearch([Standard Search])
            UC_SemSearch([Semantic Search])
            UC_AbsSearching(["<center>{abstract}<br>Searching Book</center>"])
            UC_Filter([Filtering Book])
        end
        
        subgraph ActionBlock [Book Actions]
            UC_ViewDetail([View Book Detail])
            UC_AddFav([Add book favorite])
            UC_Reserve([Reserve Book])
        end
        
        subgraph ReserveBlock [Reservation Management]
            UC_CreateReserve([Creating Book Reservation])
            UC_CancelReserve([Canceling Book Reservation])
            UC_GenPin([Generating Pin])
        end
    end

    %% Actor Associations
    Actor1 --- UC_AbsSearching
    Actor1 --- UC_Filter
    Actor1 --- UC_ViewDetail
    Actor2 --- UC_AddFav
    Actor2 --- UC_Reserve
    Actor2 --- UC_CancelReserve

    %% Valid Generalization (Standard/Semantic ARE types of Search)
    UC_StdSearch --> UC_AbsSearching
    UC_SemSearch --> UC_AbsSearching

    %% Extend & Include Relationships
    UC_AddFav -. "<< extend >>" .-> UC_ViewDetail
    UC_Reserve -. "<< extend >>" .-> UC_ViewDetail
    
    %% Generating PIN is an INCLUDED step during reservation creation
    UC_CreateReserve -. "<< include >>" .-> UC_GenPin
    UC_Reserve -. "<< include >>" .-> UC_CreateReserve

    %% Styling
    style BooksSystem fill:#fff,stroke:#333,stroke-width:2px
    style SearchBlock fill:none,stroke:none
    style ActionBlock fill:none,stroke:none
    style ReserveBlock fill:none,stroke:none

```