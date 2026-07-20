
# Use-Case Specification – Librarian Administration

## 2. Adding Books

*Specializes Abstract use case Managing Book.*

| Field | Description |
|---|---|
| **Use case ID** | UC-LIB-02 |
| **Use Case Name** | Adding Books |
| **Description** | Allows the Librarian to add a new book record to the library catalog. |
| **Actor(s)** | Librarian |
| **Preconditions** | Librarian is authenticated. The book to be added does not already exist in the catalog under the same identifying information. |

### Main Flow

1. Librarian selects the "Add Book" operation.
2. System displays the book entry form.
3. Librarian enters the book details (e.g., title, author, and other identifying information).
4. System validates the entered data, including uniqueness of the identifying information.
5. System saves the new book record to the catalog.
6. System confirms successful addition to the Librarian.

### Postconditions

A new book record is stored in the catalog and is available for borrowing.

### Alternative / Exception Flows

- **4a. Invalid or duplicate data:** System detects invalid input or a duplicate identifier. System displays a validation error and prompts the Librarian to correct the entry.

### Postconditions (Alternative Flows)

- **4a:** No new book record is created.

### Special Requirements

The book's identifying information must be unique within the catalog. Mandatory fields must be validated before submission is accepted.

---

## 3. Removing Books

*Specializes UC-LIB-01 (Managing Book).*

| Field | Description |
|---|---|
| **Use case ID** | UC-LIB-03 |
| **Use Case Name** | Removing Books |
| **Description** | Allows the Librarian to remove an existing book record from the library catalog. |
| **Actor(s)** | Librarian |
| **Preconditions** | Librarian is authenticated. The book to be removed exists in the catalog. |

### Main Flow

1. Librarian selects the "Remove Book" operation.
2. System displays a book search interface.
3. Librarian searches for and selects the book to remove.
4. System checks the current status of the book.
5. Librarian confirms the removal.
6. System deletes or deactivates the book record and confirms the removal to the Librarian.

### Postconditions

The selected book record is removed or deactivated in the catalog.

### Alternative / Exception Flows

- **4a. Book currently on loan:** System determines the book is currently loaned out. System prevents removal and displays a warning to the Librarian.

### Postconditions (Alternative Flows)

- **4a:** No removal is performed; the book record remains unchanged.

### Special Requirements

A book that is currently on loan must not be removable until it is returned.

---

## 4. Confirming Book Return

*Specializes usecase Managing Book*
*Extended by UC-LIB-05 (Recording Loan) — extension point: after book return is confirmed.*

| Field | Description |
|---|---|
| **Use case ID** | UC-LIB-04 |
| **Use Case Name** | Confirming Book Return |
| **Description** | Allows the Librarian to confirm that a borrowed book has been physically returned by a member, updating the corresponding loan record. |
| **Actor(s)** | Librarian |
| **Preconditions** | Librarian is authenticated. An active loan record exists for the book being returned. |

### Main Flow

1. Librarian selects the "Confirm Book Return" operation.
2. System displays a search interface for active loans.
3. Librarian selects or scans the book being returned.
4. System marks the associated loan record as returned and updates the book's availability status.
5. System confirms completion of the return.

### Postconditions

The loan record is marked as returned, and the book is marked as available.

### Alternative / Exception Flows

- **5a. Record New Loan:** If the Librarian chooses to immediately loan the returned book to another member, the system invokes UC-LIB-05 (Recording Loan).

### Postconditions (Alternative Flows)

- **5a:** Control passes to UC-LIB-05; postconditions of that use case apply upon its completion.

### Special Requirements

The extension point occurs only after the return has been successfully confirmed. Invoking the extension is optional.

---

## 5. Recording Loan

*Extends UC-LIB-04 (Confirming Book Return) — extension point: after book return is confirmed.*

| Field | Description |
|---|---|
| **Use case ID** | UC-LIB-05 |
| **Use Case Name** | Recording Loan |
| **Description** | Allows the Librarian to record a new loan of a book to a member. May be invoked at the extension point of UC-LIB-04 (Confirming Book Return). |
| **Actor(s)** | Librarian |
| **Preconditions** | Librarian is authenticated. The selected book exists, and a member has been selected. |

### Main Flow

1. Librarian initiates the loan recording via the extension point of UC-LIB-04.
2. Librarian enters or selects the member's identification.
3. Librarian selects the book(s) to be loaned.
4. System validates member eligibility and book availability.
5. System creates a new loan record and calculates the due date.
6. System confirms the recorded loan to the Librarian.

### Postconditions

A new loan record is created, and the selected book is marked as on loan.

### Alternative / Exception Flows

- **4a. Member ineligible:** System determines the member is ineligible to borrow (e.g., outstanding restrictions). System denies the loan and displays the reason.

### Postconditions (Alternative Flows)

- **4a:** No loan record is created.

### Special Requirements

The due date is calculated according to the library's loan policy.

---

## 6. Managing Room

*Abstract use case. The diagram defines no specialization relationships for this use case.*

| Field | Description |
|---|---|
| **Use case ID** | UC-LIB-06 |
| **Use Case Name** | Managing Room |
| **Description** | Abstract use case representing the Librarian's general capability to manage library rooms. As an abstract use case, it is never instantiated or executed on its own. |
| **Actor(s)** | Librarian |

### Special Requirements

This is an abstract (generalization) use case and cannot be instantiated on its own. Unlike UC-LIB-01 and UC-LIB-07, the source diagram does not depict any use case specializing it; no concrete realization is documented in this functional group.

---

## 7. Verifying Pin

*Abstract use case. Generalized by (specialized into) UC-LIB-08 (Confirming Book Borrowed) and UC-LIB-09 (Confirming Room Checkin).*

| Field | Description |
|---|---|
| **Use case ID** | UC-LIB-07 |
| **Use Case Name** | Verifying Pin |
| **Description** | Abstract use case representing the common purpose shared by the Librarian's PIN-verification specializations: confirming a book borrowing and confirming a room check-in. As an abstract use case, it is never instantiated or executed on its own. |
| **Actor(s)** | Librarian |

### Special Requirements

This is an abstract (generalization) use case and cannot be instantiated on its own. It is realized exclusively through its specializations: UC-LIB-08 and UC-LIB-09.

---

## 8. Confirming Book Borrowed

*Specializes UC-LIB-07 (Verifying Pin).*

| Field | Description |
|---|---|
| **Use case ID** | UC-LIB-08 |
| **Use Case Name** | Confirming Book Borrowed |
| **Description** | Allows the Librarian to confirm a book borrowing transaction by verifying the borrowing member's PIN. |
| **Actor(s)** | Librarian |
| **Preconditions** | Librarian is authenticated. A book borrowing transaction is in progress and awaiting identity confirmation. |

### Main Flow

1. Librarian initiates confirmation of the book borrowing transaction.
2. System prompts for the member's PIN.
3. Librarian enters the member's PIN.
4. System verifies the PIN against the member's record.
5. System marks the borrowing transaction as confirmed.
6. System logs the confirmation.

### Postconditions

The member's identity is verified, and the book borrowing transaction is confirmed.

### Alternative / Exception Flows

- **4a. Incorrect PIN:** If the PIN is invalid, the system displays an error message and returns to step 2.

### Postconditions (Alternative Flows)

- **4a:** The book borrowing transaction remains unconfirmed.

### Special Requirements

The system should limit the number of consecutive invalid PIN attempts.

---

## 9. Confirming Room Checkin

*Specializes UC-LIB-07 (Verifying Pin).*

| Field | Description |
|---|---|
| **Use case ID** | UC-LIB-09 |
| **Use Case Name** | Confirming Room Checkin |
| **Description** | Allows the Librarian to confirm a member's check-in to a library room by verifying the member's PIN. |
| **Actor(s)** | Librarian |
| **Preconditions** | Librarian is authenticated. A room check-in transaction is in progress and awaiting identity confirmation. |

### Main Flow

1. Librarian initiates confirmation of the room check-in transaction.
2. System prompts for the member's PIN.
3. Librarian enters the member's PIN.
4. System verifies the PIN against the member's record.
5. System marks the member as checked into the room.
6. System logs the confirmation.

### Postconditions

The member's identity is verified, and the member is confirmed as checked into the room.

### Alternative / Exception Flows

- **4a. Incorrect PIN:** If the PIN is invalid, the system displays an error message and returns to step 2.

### Postconditions (Alternative Flows)

- **4a:** The room check-in remains unconfirmed.

### Special Requirements

The system should limit the number of consecutive invalid PIN attempts.

---

## 10. Announcement

| Field | Description |
|---|---|
| **Use case ID** | UC-LIB-10 |
| **Use Case Name** | Announcement |
| **Description** | Allows the Librarian to create and publish an announcement for library members. |
| **Actor(s)** | Librarian |
| **Preconditions** | Librarian is authenticated. |

### Main Flow

1. Librarian selects the "Create Announcement" operation.
2. System displays the announcement entry form.
3. Librarian enters the announcement details.
4. System validates the entered content.
5. System saves and publishes the announcement.
6. System confirms successful publication to the Librarian.

### Postconditions

The announcement is published and stored in the system.

### Alternative / Exception Flows

- **4a. Invalid content:** System detects missing required fields or invalid content. System displays a validation error and prompts the Librarian to correct the entry.

### Postconditions (Alternative Flows)

- **4a:** No announcement is published.

### Special Requirements

Required fields (e.g., title, content) must be validated before an announcement can be published.

<div class="page"/>

# Use case diagram

``` mermaid
flowchart LR
 subgraph LibrarianAdministration["Librarian Administration"]
        UC1(("<center>{abstract} <br> Managing Book</center>"))
        UC2(("Adding Books"))
        UC3(("Removing Books"))
        UC4(("Confirming Book Return"))
        UC5(("Recording Loan"))
        UC6(("Managing Room"))
        UC7(("<center>{abstract} <br> Verifying Pin</center>"))
        UC8(("Confirming Book Borrowed"))
        UC9(("Confirming Room Checkin"))
        UC10(("Announcement"))
  end
    Librarian(["Librarian"]) ======= LibrarianAdministration
    Librarian --- UC1 & UC6 & UC7 & UC10
    UC2 --> UC1
    UC3 --> UC1
    UC4 --> UC1
    UC8 --> UC7
    UC9 --> UC7
    UC5 -. &lt;&lt; extend &gt;&gt; .-> UC4

    style LibrarianAdministration fill:#fff,stroke:#333,stroke-width:2px
    linkStyle 0 stroke:transparent
```