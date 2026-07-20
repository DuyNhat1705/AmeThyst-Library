
# Use-Case Specification – Study Group

## 1. Searching Study Group

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-01 |
| **Use Case Name** | Searching Study Group |
| **Description** | Allows a General User to search for study groups within the system using search criteria such as keywords. |
| **Actor(s)** | General User |
| **Preconditions** | The General User has access to the study group search feature. |

### Main Flow

1. The General User navigates to the study group search interface.
2. The General User enters a search keyword or term.
3. The system validates the input.
4. The system searches for study groups matching the entered criteria.
5. The system displays the list of matching study groups to the General User.

### Postconditions

The system presents a list of study groups matching the search criteria.

### Alternative Flows

- **A1 – No matching results (Step 4):** If no study groups match the search criteria, the system displays a "no results found" message.

### Exception Flows

- **E1 – Empty or invalid search input (Step 3):** If the input is empty or invalid, the system prompts the General User to enter a valid search term.

### Postconditions (Alternative Flows)

- **A1:** No study group list is displayed; the General User is informed that no matches were found.

### Postconditions (Exception Flows)

- **E1:** The system remains on the search interface awaiting valid input.

### Special Requirements

- Search results should be returned within an acceptable response time to maintain usability.
- Search input should be validated to prevent malformed or malicious queries.

---

## 2. Filtering Study Group

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-02 |
| **Use Case Name** | Filtering Study Group |
| **Description** | Allows a General User to narrow down a list of study groups using filter criteria (e.g., subject, schedule, size). |
| **Actor(s)** | General User |
| **Preconditions** | A list of study groups is available for filtering (e.g., resulting from a search or a default listing). |

### Main Flow

1. The General User accesses the study group listing.
2. The General User selects one or more filter criteria.
3. The system validates the selected filter criteria.
4. The system applies the filters to the current study group list.
5. The system displays the filtered list of study groups.

### Postconditions

The displayed list of study groups reflects the applied filter criteria.

### Alternative Flows

- **A1 – No results after filtering (Step 4):** If no study groups match the filters, the system displays a "no results found" message and allows the General User to adjust filters.

### Exception Flows

- **E1 – Invalid filter combination (Step 3):** If the selected filters are invalid or conflicting, the system notifies the General User and retains the previous list.

### Postconditions (Alternative Flows)

- **A1:** The filtered list is empty; the General User remains on the filtering interface.

### Postconditions (Exception Flows)

- **E1:** The filter is not applied; the previous study group list remains displayed.

### Special Requirements

- Filter options should be clearly presented and combinable where applicable.

---

## 3. View Study Group Detail

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-03 |
| **Use Case Name** | View Study Group Detail |
| **Description** | Allows a General User to view detailed information about a specific study group. |
| **Actor(s)** | General User |
| **Preconditions** | A study group exists and is accessible from a list (search results or filtered results). |

### Main Flow

1. The General User selects a study group from a list.
2. The system retrieves detailed information about the selected study group.
3. The system displays the study group details (e.g., description, members, schedule).
4. The General User reviews the displayed information.

### Postconditions

The detailed information of the selected study group is displayed to the General User.

### Exception Flows

- **E1 – Study group unavailable (Step 2):** If the selected study group no longer exists or is inaccessible, the system displays an error message.

### Postconditions (Exception Flows)

- **E1:** No detail view is displayed; the General User is informed the study group is unavailable.

### Special Requirements

- Only information appropriate for the requesting General User's access level should be displayed.

---

## 4. Interacting with Others *(abstract)*

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-04 |
| **Use Case Name** | Interacting with Others |
| **Description** | Abstract use case capturing the common purpose shared by the actions a Study Group Creator may perform in relation to other users associated with a study group. Its specializations are: Inviting Others into Study Group, Remove Others from Study Group, Finding User By Email, and View Other Profile. |
| **Actor(s)** | Study Group Creator |

### Special Requirements

This is an abstract use case and cannot be executed independently. It is realized through its specializations:
- UC-SG-05 (Inviting Others into Study Group)
- UC-SG-06 (Remove Others from Study Group)
- UC-SG-07 (Finding User By Email)
- UC-SG-08 (View Other Profile)

---

## 5. Inviting Others into Study Group

*Specializes UC-SG-04 (Interacting with Others).*

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-05 |
| **Use Case Name** | Inviting Others into Study Group |
| **Description** | Allows the Study Group Creator to invite another user to join a study group they manage. |
| **Actor(s)** | Study Group Creator |
| **Preconditions** | The Study Group Creator is authenticated and manages the selected study group. |

### Main Flow

1. The Study Group Creator selects the study group to invite a member to.
2. The Study Group Creator selects a user to invite (e.g., by browsing the member list or by using UC-SG-07 Finding User By Email).
3. The system validates that the target user is not already a member of the study group.
4. The system sends an invitation to the target user.
5. The system confirms to the Study Group Creator that the invitation was sent.

### Postconditions

An invitation has been issued to the specified user for the selected study group.

### Exception Flows

- **E1 – Target user already a member (Step 3):** If the target user is already a member of the study group, the system displays an error message and does not send an invitation.

### Postconditions (Exception Flows)

- **E1:** No invitation is sent; the study group membership remains unchanged.

### Special Requirements

- Only the study group creator may issue invitations for a given study group.
- Duplicate invitations to the same user for the same study group should be prevented.

---

## 6. Remove Others from Study Group

*Specializes UC-SG-04 (Interacting with Others).*

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-06 |
| **Use Case Name** | Remove Others from Study Group |
| **Description** | Allows the Study Group Creator to remove an existing member from a study group they manage. |
| **Actor(s)** | Study Group Creator |
| **Preconditions** | The Study Group Creator manages the study group; the target user is a current member of the study group. |

### Main Flow

1. The Study Group Creator selects the study group and views its member list.
2. The Study Group Creator selects the member to remove.
3. The system requests confirmation of the removal action.
4. The system removes the selected member from the study group.
5. The system confirms the removal to the Study Group Creator.

### Postconditions

The selected member is no longer part of the study group.

### Alternative Flows

- **A1 – Removal canceled (Step 3):** The Study Group Creator cancels the confirmation. The system cancels the removal process.

### Exception Flows

- **E1 – Target user not a member (Step 2):** If the selected user is not currently a member, the system displays an error message.

### Postconditions (Alternative Flows)

- **A1:** The study group membership remains unchanged.

### Postconditions (Exception Flows)

- **E1:** The study group membership remains unchanged.

### Special Requirements

- Only the study group creator may remove members from a study group they manage.
- The affected user should be notified of their removal.

---

## 7. Finding User By Email

*Specializes UC-SG-04 (Interacting with Others).*

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-07 |
| **Use Case Name** | Finding User By Email |
| **Description** | Allows the Study Group Creator to locate a registered user by their email address, typically in support of inviting them to a study group. |
| **Actor(s)** | Study Group Creator |
| **Preconditions** | The Study Group Creator has access to the user lookup feature. |

### Main Flow

1. The Study Group Creator enters an email address to search for.
2. The system validates the format of the email address.
3. The system searches for a registered user account matching the entered email address.
4. The system displays the matching user's basic profile information.

### Postconditions

A user matching the provided email address, if found, is presented to the Study Group Creator.

### Alternative Flows

- **A1 – No matching user (Step 3):** If no registered user matches the provided email, the system displays a "user not found" message.

### Exception Flows

- **E1 – Invalid email format (Step 2):** If the email format is invalid, the system prompts the Study Group Creator to correct the input.

### Postconditions (Alternative Flows)

- **A1:** No user information is displayed.

### Postconditions (Exception Flows)

- **E1:** No user information is displayed.

### Special Requirements

- Only minimal, non-sensitive user information should be exposed through this lookup, in accordance with privacy considerations.

---

## 8. View Other Profile

*Specializes UC-SG-04 (Interacting with Others).*

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-08 |
| **Use Case Name** | View Other Profile |
| **Description** | Allows the Study Group Creator to view the profile information of another user, such as a study group member or a prospective invitee. |
| **Actor(s)** | Study Group Creator |
| **Preconditions** | The target user's profile exists and is accessible to the Study Group Creator. |

### Main Flow

1. The Study Group Creator selects a user (e.g., from a member list or search result).
2. The system retrieves the selected user's profile information according to the target user's visibility settings.
3. The system displays the profile to the Study Group Creator.

### Postconditions

The requested user's profile information is displayed to the Study Group Creator.

### Exception Flows

- **E1 – Profile unavailable (Step 2):** If the target user's profile cannot be retrieved, the system displays an error message.

### Postconditions (Exception Flows)

- **E1:** No profile information is displayed.

### Special Requirements

- Only profile information the target user has made visible/appropriate for this context should be shown.

---

## 9. Interacting with Study Group *(abstract)*

| Field | Description |
|---|---|   
| **Use case ID** | UC-SG-09 |
| **Use Case Name** | Interacting with Study Group |
| **Description** | Abstract use case capturing the common purpose shared by the actions a study group member (Study Group Creator or Other User) may perform regarding their own participation in a study group. Its specializations are: Managing Join Request and Out Study Group. |
| **Actor(s)** | Study Group Creator, Other User |

### Special Requirements

This is an abstract use case and cannot be executed independently. It is realized through its specializations:
- UC-SG-10 (Managing Join Request)
- UC-SG-13 (Out Study Group)

---

## 10. Managing Join Request *(abstract)*

*Specializes UC-SG-09 (Interacting with Study Group).*

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-10 |
| **Use Case Name** | Managing Join Request |
| **Description** | Abstract use case capturing the common purpose shared by actions related to a user's request to join a study group. Its specializations are: Creating Join Request and Canceling Join Request. |
| **Actor(s)** | Study Group Creator, Other User |

### Special Requirements

This is an abstract use case and cannot be executed independently. It is realized through its specializations:
- UC-SG-11 (Creating Join Request)
- UC-SG-12 (Canceling Join Request)

---

## 11. Creating Join Request

*Specializes UC-SG-10 (Managing Join Request).*

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-11 |
| **Use Case Name** | Creating Join Request |
| **Description** | Allows a user to submit a request to join a study group. |
| **Actor(s)** | Study Group Creator, Other User |
| **Preconditions** | The Other User is authenticated, and the selected study group exists. |

### Main Flow

1. The Other User selects the study group they wish to join.
2. The Other User submits a request to join.
3. The system validates that the Other User is not already a member and has no existing pending request for the study group.
4. The system creates the join request and associates it with the study group.
5. The system notifies the Study Group Creator of the new join request.
6. The system confirms to the Other User that the request has been submitted.

### Postconditions

A pending join request for the Other User exists against the selected study group.

### Exception Flows

- **E1 – User already a member (Step 3):** If the Other User is already a member of the study group, the system displays an error message and does not create a request.
- **E2 – Duplicate pending request (Step 3):** If a pending join request already exists for the Other User and study group, the system displays a message and does not create a duplicate request.

### Postconditions (Exception Flows)

- **E1 / E2:** No new join request is created.

### Special Requirements

- Each user may have at most one pending join request per study group at any given time.

---

## 12. Canceling Join Request

*Specializes UC-SG-10 (Managing Join Request).*

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-12 |
| **Use Case Name** | Canceling Join Request |
| **Description** | Allows a user to cancel a previously submitted, still-pending join request for a study group. |
| **Actor(s)** | Study Group Creator, Other User |
| **Preconditions** | The Other User is authenticated. |

### Main Flow

1. The Other User views their pending join request(s).
2. The Other User selects a pending join request to cancel.
3. The system validates that the selected request is still pending.
4. The system cancels (removes) the join request.
5. The system confirms the cancellation to the Other User.

### Postconditions

The selected join request no longer exists / is no longer pending.

### Exception Flows

- **E1 – Request no longer pending (Step 3):** If the join request has already been resolved (e.g., approved or previously canceled), the system displays an error message and takes no action.

### Postconditions (Exception Flows)

- **E1:** The join request status remains unchanged.

### Special Requirements

- Only the user who created the join request may cancel it.

---

## 13. Out Study Group

*Specializes UC-SG-09 (Interacting with Study Group).*

| Field | Description |
|---|---|
| **Use case ID** | UC-SG-13 |
| **Use Case Name** | Out Study Group |
| **Description** | Allows a study group member (Study Group Creator or Other User) to voluntarily leave a study group they currently belong to. |
| **Actor(s)** | Study Group Creator, Other User |
| **Preconditions** | The actor is authenticated and is a current member of the selected study group. |

### Main Flow

1. The actor selects the study group they wish to leave.
2. The actor confirms the intent to leave the study group.
3. The system removes the actor from the study group's membership.
4. The system confirms to the actor that they have left the study group.

### Postconditions

The actor is no longer a member of the study group.

### Alternative Flows

- **A1 – Leave not confirmed (Step 2):** If the actor cancels the confirmation, no membership change occurs.

### Postconditions (Alternative Flows)

- **A1:** The actor's membership status remains unchanged.

### Special Requirements

- If the actor is the Study Group Creator, the system must ensure another member is assigned as the creator before the creator can leave.

# Diagram
## Study Group
```mermaid
flowchart LR
 subgraph StudyGroup["Study Group"]
        UC1(("Searching Study Group"))
        UC2(("Filtering Study Group"))
        UC3(("View Study Group Detail"))
        UC5(("Inviting Others into<br>Study Group"))
        UC4(("<center>{abstract}<br>Interacting with Others</center>"))
        UC6(("Remove Others from<br>Study Group"))
        UC7(("Finding User By Email"))
        UC8(("View Other Profile"))
        UC9(("<center>{abstract}<br>Interacting with Study Group</center>"))
        UC10(("<center>{abstract}<br>Managing Join<br>Request</center>"))
        UC11(("<center>Creating Join<br>Request</center>"))
        UC12(("<center>Canceling Join<br>Request</center>"))
        UC13(("Out Study Group"))
  end
    StudyGroupCreator(["study group creator"]) --> User(["<center>{abstract}<br>user</center>"])
    OtherUser(["other user"]) --> User
    GeneralUser(["<center>{abstract}<br>general user</center>"]) ~~~ StudyGroupCreator
    StudyGroupCreator ~~~ User
    User ~~~ OtherUser
    UC1 ~~~ UC2
    UC2 ~~~ UC3
    UC3 ~~~ UC5
    UC5 ~~~ UC4
    UC4 ~~~ UC6
    UC6 ~~~ UC7
    UC7 ~~~ UC8
    UC8 ~~~ UC9
    UC9 ~~~ UC10
    UC10 ~~~ UC11 & UC13
    UC11 ~~~ UC12
    GeneralUser ~~~~~ StudyGroup
    GeneralUser --- UC1 & UC2 & UC3
    StudyGroupCreator --- UC4 & UC9
    OtherUser --- UC9
    UC5 --> UC4
    UC6 --> UC4
    UC7 --> UC4
    UC8 --> UC4
    UC10 --> UC9
    UC13 --> UC9
    UC11 --> UC10
    UC12 --> UC10

    style StudyGroup fill:#fff,stroke:#333,stroke-width:2px
```