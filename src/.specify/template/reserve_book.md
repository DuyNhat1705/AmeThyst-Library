# Book Reservation Process Specification (SRS)

This document specifies the technical requirements and data flows for the book reservation feature ("Reserve for Pickup") within the library system.

## 1. Feature Overview
The "Reserve for Pickup" feature allows a registered user to hold a specific book at a chosen library branch. The reservation is valid for up to 7 calendar days. If the user does not collect the physical book within this period, the reservation automatically expires.

---

## 2. Database Schema Reference
The process directly interacts with the following database tables based on the system design:

### 2.1. `books`
* `book_id` (varchar, PK): Unique identifier for the book.
* `title` (text): Title of the book.

### 2.2. `library`
* `book_id` (varchar, PK, FK): Reference to `books.book_id`.
* `branch_id` (int, PK, FK): Unique identifier for the library branch.
* `quantity` (int): Total stock quantity.
* `available_quantity` (int): Active stock available for reservation/borrowing.

### 2.3. `borrow_book`
* `borrow_id` (uuid, PK): Unique identifier for the transaction record.
* `user_id` (uuid, FK): Reference to the borrowing user.
* `book_id` (varchar, FK): Reference to `books.book_id`.
* `branch_id` (int, FK): Reference to the selected branch.
* `reserve_date` (date): Date when the reservation was made.
* `borrow_date` (date, nullable): Date when the book is physically picked up (Set to NULL initially).
* `due_date` (date, nullable): Return deadline calculated upon physical pickup (Set to NULL initially).
* `expired_at` (timestamp, nullable): Explicit expiration timestamp (Exactly 7 days from `reserve_date`).
* `status` (varchar): Current lifecycle status (`pending`, `expired`, `cancelled`).

---

## 3. Detailed Process Workflows

### 3.1. Successful Reservation Flow
1.  **Trigger:** The user clicks the **"Reserve for Pickup"** button on a book details page.
2.  **Branch Selection Pop-up:** A small pop-up modal is displayed, listing exactly the 2 available library branches along with their respective `available_quantity` values retrieved from the `library` table.
3.  **Stock Validation:** The system verifies if `available_quantity > 0` for the branch selected by the user.
4.  **Database Updates:**
    * **Inventory Decrement:** Decrement the `available_quantity` by 1 in the `library` table for the corresponding `book_id` and `branch_id`.
    * **Record Creation:** Insert a new row into the `borrow_book` table with the following parameters:
        * `borrow_id`: Automatically generated new UUID.
        * `user_id`: Current logged-in user's identifier.
        * `book_id`: Current book's identifier.
        * `branch_id`: User-selected branch identifier.
        * `reserve_date`: Current system date (Today).
        * `borrow_date`: `NULL`.
        * `due_date`: `NULL`.
        * `expired_at`: Current timestamp + 7 calendar days.
        * `status`: `'pending'`.
5.  **Calendar Integration:** The expiration date (`expired_at`) is synchronized and plotted automatically as an event onto the user's existing dashboard calendar view to remind them of the collection deadline.
6.  **User Dashboard Update:** Upon successful data recording, the system will render the newly inserted row information from the `borrow_book` table directly into the **`borrow_book` tab** of the user's dashboard.

### 3.2. Out-of-Stock Validation Flow
1.  **Trigger:** The user selects a branch from the pop-up modal where the `available_quantity` is equal to `0`.
2.  **Action:** The system blocks the reservation request execution.
3.  **UI Feedback:** An explicit error message or notification is displayed indicating that the book is currently out of stock at the selected location. No database modifications, calendar insertions, or dashboard rendering occur.

### 3.3. Reservation Cancellation Flow
1.  **Trigger:** The user clicks the **"Cancel"** button on an active pending reservation within their dashboard interface.
2.  **Database Processing:**
    * **Record Removal:** Delete the matching transaction record from the `borrow_book` table entirely.
    * **Inventory Restitution:** Increment the `available_quantity` by 1 in the `library` table for the specific `book_id` and `branch_id` linked to the cancelled transaction.
3.  **UI Feedback:** The reservation entry is removed from the `borrow_book` tab in the UI dashboard, and the associated expiration event is removed from the user's dashboard calendar.

---

## 4. Operational & System Constraints
* **Strict Scope Compliance:** The implementation must execute only the functions defined in this document. No unauthorized background processes, analytical models, or unrequested workflow paths should be introduced.
* **Temporal Fields:** `borrow_date` and `due_date` must remain `NULL` throughout this reservation lifecycle; they are strictly reserved for downstream fulfillment processes upon actual physical book pickup.