# Library Map & Study Group & Room Reservation

## 1. View Library Map

| Field | Description |
| --- | --- |
| **Use case ID** | UC-LIB-01 |
| **Use Case Name** | View Library Map |
| **Description** | Allows a user to view the interactive graphical spatial layout floor plan map of the physical library facilities. |
| **Actor(s)** | Guests, Authenticated users, Admins, Librarians |
| **Preconditions** | - The user has launched the library digital map display. |

### Main Flow

1. The user selects the "Interactive Map" tab component link from the primary navigation portal.
2. The system queries the database to load the current geometric library floor map configuration data models.
3. The system renders the complete high-resolution layout map canvas onto the active user screen interface.
4. The user navigates, pans, or zooms around the active floor coordinate spaces.

### Postconditions

* The digital structural blueprint map is fully loaded and remains interactive within the client application container workspace.

**Alternative / Exception Flows**

* **2'.1** Map structural asset vector files fail to load from backend content delivery nodes: The system terminates the display script routine and defaults to rendering a static text-based directory list layout grid of floors.

### Postconditions (Alternative Flows)

* 2'.1: The active workspace falls back to descriptive layout index directories; errors parse securely into diagnostic logs.

**Special Requirements**

* The graphical layout component structure must render interactively within 1.0 second on modern client application endpoints.

---

## 2. View Facility Information

*Extends UC-LIB-01 (View Library Map) — extension point: User selects a specific room or point-of-interest zone node anchor element within the visual map array space.*

| Field | Description |
| --- | --- |
| **Use case ID** | UC-LIB-02 |
| **Use Case Name** | View Facility Information |
| **Description** | Extends the active map visualization layout dashboard panel to display specific metadata parameters, operational schedules, capacity thresholds, and equipment summaries for a chosen target room asset. |
| **Actor(s)** | Guests, Authenticated users, Admins, Librarians |
| **Preconditions** | - The core baseline `View Library Map (UC-LIB-01)` flow is fully executed and active on screen. |

### Main Flow

1. The user hovers over and clicks an active structural facility zone/room element node anchor on the map layout model.
2. The system reads the clicked room ID parameter, intercepting the base mapping loop.
3. The system queries database profiles to extract targeted capacity indices, itemized equipment inventories, and booking schedule statuses.
4. The system updates the UI by opening an aligned descriptive contextual informational summary side-drawer panel sheet component over the map workspace.

### Postconditions

* Detailed individual facility asset performance metrics, resource lists, and structural availability maps display clearly alongside graphic canvases.

**Alternative / Exception Flows**

* **3'.1** The chosen facility room identifier parameters match legacy hardware profiles deleted from standard database lookup tables: The system presents a temporary notification popup indicating "Facility configuration parameters updated, listing refresh required."

### Postconditions (Alternative Flows)

* 3'.1: Invalid profile popups close immediately; the base layer interactive map forces an automatic silent index update routine.

**Special Requirements**

* Context detail slide-drawer components must overlay fluidly without modifying or breaking current canvas viewport layout locations.
* The `reserve` option and capacity information are available for study room panel, while other areas will display Description only.  

---

## UC-LIB-03: Room Reservation
*Specialized by `Reserve room freely` and `Reserve room for Study group`*

|**Field**|**Description**|
|---|---|
|**Use case ID**|UC-LIB-03|
|**Use Case Name**|Room Reservation|
|**Description**|Handles the end-to-end process enabling an authenticated user to directly secure a short-term reservation allocation block for an open facility study space. The system dynamically parses target timeline boundaries, enforces duration limits, resolves concurrent race conditions, locks availability grids, and outputs entrance validation credentials.|
|**Actor(s)**|Authenticated Users|
|**Preconditions**|- The user profile account identity successfully clears central access authorization checks.<br>- The chosen facility room asset calendar matches open, non-restricted booking states.|

### Main Flow

1. The user opens the structural room booking schedule board tool component layout screen.
    
2. The user isolates an open target timeslot parameter block row on a free room workspace slot and hits the "Book Instantly" action control.
    
3. The system intercepts the transaction context, reads the target facility room item identifier, and captures the requested operational time window timeline boundaries.
    
4. The system queries the database tables to verify that the target room space record does not contain active, overlapping booking blocks within that specific timeframe.
    
5. The system evaluates the parsed duration parameters against standard account booking thresholds to ensure the timeline conforms to allowed continuous hourly limits.
    
6. The system locks the target calendar matrix block, shifting availability state configurations from "Available" to "Booked / Reserved".
    
7. The system logs a unique transactional allocation receipt index tracking row record detailing room numbers, account keys, timestamps, and entry variables.
    
8. The system updates the live scheduling UI matrix dynamically to strip the targeted space block parameters out of the public discovery views, and displays a confirmation card layout showing specific room entrance verification PINs.
    
### Postconditions

- An individual space transaction token instantiates securely, locking the designated room parameters for the designated duration.
    
- Core database calendar indices update permanently, blocking alternative reservation requests across all client discovery platforms.
    

### Alternative / Exception Flows
 **5'.** The targeted time duration parameters violate application booking limit thresholds. 
    
- **5'.1.** The system interrupts the processing logic routine immediately.
        
- **5'.2.** The system throws an allocation constraint exception flag and blocks database write pipelines from committing changes.
        
- **5'.3** The system highlights the duration configuration components on screen with a validation alert notice.
        
 **6'.**  Occurs at Step 6 if another concurrent transaction session locks the exact same spatial grid slot milliseconds before submission.
    
- **6'.1** The system database layer traps the conflict error and rejects the execution command thread.
        
- **6'.2**. The system cancels the workflow block execution and rolls back any pending staging changes.
        
- **6'.3** The system surfaces a priority alert header bar onto the screen layout stating: "Timeslot reservation conflict encountered; this room slot has already been claimed."
        

### Postconditions (Alternative Flows)

- **5'.** Internal database state architectures maintain original conditions; the active booking form remains open on the user interface pane pending user boundary revisions.
    
- **6'.** The active space booking matrix refreshes its visual structural layout layout immediately to show accurate states; database tables remain fully uncorrupted.
    

### Special Requirements

- Calendar scheduling check updates and state parameter adjustments must rely entirely on strict serializable transaction isolation logic rules to fully block duplicate double-booking anomalies during concurrent load spikes.
  
---

### 6. Canceling Room Reservation

| Field | Description |
| --- | --- |
| **Use case ID** | UC-LIB-06 |
| **Use Case Name** | Canceling Room Reservation |
| **Description** | Processes user request commands to void active outstanding room slot holds, returning spaces into open catalog index pools. |
| **Actor(s)** | Actor 2 |
| **Preconditions** | - An active space allocation record is mapped under the user profile credentials matching upcoming timeline dates. |

### Main Flow

1. The user opens their personal active schedule dashboard interface window panel.
2. The user selects a target upcoming room reservation object row control card and hits "Cancel Booking".
3. The system processes the cancellation call context, modifying the database entry status description tag index values to "Cancelled".
4. The system modifies the targeted room structural availability calendar rows back to an "Available" state configuration parameter flag.
5. The system sends confirmation notices to the user workspace screen while triggering background clearing loops.

### Postconditions

* Outstanding space tracking parameters invalidate completely; room availability timelines clear to open registration access.

**Alternative / Exception Flows**

* **3'.1 The user processes cancellation intents within restricted time lock penalty parameters:** The system marks the database transaction status as "Late Cancellation" and flags the account history log index with an automated usage compliance flag warning.

### Postconditions (Alternative Flows)

* 3'.1: The space hold clears out safely; administrative metric systems update account infraction tracking fields.

**Special Requirements**

* Cancel actions must trigger asynchronous event loops that instantly clear associated digital security locks installed at the physical room site coordinates.

---

### 7. Creating Study Group

*Included in `reserve room for Study group`*
*Child sub-routine supporting parent operational blocks under abstract parent `{abstract} Managing Study Group`.*

| Field | Description |
| --- | --- |
| **Use case ID** | UC-LIB-07 |
| **Use Case Name** | Creating Study Group |
| **Description** | Establishes a fresh data structure instance profile configuring collaborative team metadata, participant rosters, and organizer roles. |
| **Actor(s)** | Authenticated user |
| **Preconditions** | - The team coordinator account holds active registration statuses within system databases. |

### Main Flow

1. The user selects "Form New Study Group" via their group coordination tool dashboard panel.
2. The system prompts the user to supply structural identity parameters (Group Name, Subject Classification Tag, Maximum Capacity Limits).
3. The user populates the configuration fields and clicks "Confirm Setup".
4. The system validates syntax formatting and inserts a fresh team registry record entity row into the active profile databases.
5. The system configures the initialization user's security token role parameter index to "Group Owner / Administrator".
6. The system displays the empty group management cockpit interface screen layout views.

### Postconditions

* A structural collaborative group object profile instantiates within application tables, ready to intercept member mapping data streams.

**Alternative / Exception Flows**

* **4'.1 The chosen Group Name parameter contains words matching active system text blocklist filters:** The system blocks database row creation, surfaces explicit text layout warnings, and locks submission tools pending correction.

### Postconditions (Alternative Flows)

* 4'.1: Group registry tables experience zero modification tasks; the form setup view model remains open.

**Special Requirements**

* None.

---

### 8. Canceling Study Group

*Specializes abstract parent `{abstract} Managing Study Group`.*

| Field | Description |
| --- | --- |
| **Use case ID** | UC-LIB-08 |
| **Use Case Name** | Canceling Study Group |
| **Description** | Completely disbands an active study group team profile structure entity, purging associated participant mapping rows and linked metadata records. |
| **Actor(s)** | Authenticated user |
| **Preconditions** | - The actor's account role profile parameter matches explicit "Group Owner / Administrator" authorization permissions keys. |

### Main Flow

1. The user opens the administrative settings panel inside the target study group configuration dashboard.
2. The user clicks the priority action control link labeled "Disband / Delete Study Group".
3. The system raises an interactive safety validation challenge popup confirmation box module.
4. The user completes the verification prompt action step.
5. The system modifies team data rows, toggling lifecycle status state values to "Terminated / Disbanded".
6. The system cascade-purges participant relationship map links out of active session caches.
7. The system notifies all active team members via operational dashboard alert feeds that the group space has closed.

### Postconditions

* Coordinated team database index entities change to a fully inactive state model layout; member groupings break apart cleanly.

**Alternative / Exception Flows**

* **5'.1** The group entity profile holds active dependencies such as unfulfilled future room reservations. The system prevents simple delete steps and displays a prompt screen detailing that the group cannot be killed until outstanding room bookings are resolved or transferred.

### Postconditions (Alternative Flows)

* **5'.1**: The group deletion command sequence aborts; operational group entity variables maintain status-quo parameters.

**Special Requirements**

* Group termination cleanup rules must fully run automated cascade validation checks across linked records to verify zero dangling relational index nodes remain in structural table spaces.

---

### 9. Updating Study Group Information

*Specializes abstract parent `{abstract} Managing Study Group`.*

| Field | Description |
| --- | --- |
| **Use case ID** | UC-LIB-09 |
| **Use Case Name** | Updating Study Group Information |
| **Description** | Modifies operational configuration metadata parameters including capacity boundaries, name markers, visibility conditions, or subject categories for an existing active group. |
| **Actor(s)** | Authenticated user |
| **Preconditions** | - The user profile account identity possesses necessary editing permission rights parameters within the group database records. |

### Main Flow

1. The user navigates to the group configuration editing dashboard profile template view layout.
2. The system populates input data entry text boxes with existing live database parameters.
3. The user modifies selected metadata settings (e.g., expanding group capacity thresholds, changing descriptions).
4. The user clicks the "Save Modifications" processing control button widget.
5. The system performs alignment safety checks to ensure new capacity parameters do not drop below the current count of already enrolled active members.
6. The system updates the targeted group configuration database columns with the revised parameters.
7. The system updates workspace windows, rendering flash confirmation notification banners.

### Postconditions

* Modified structural team layout profile properties match user updates instantly across all connected client interfaces.

**Alternative / Exception Flows**

* **5'.1 The user attempts to reduce group maximum capacity limits below the total number of currently active registered members:** The system blocks database modification commands, flashes validation errors, and highlights the capacity text box layout elements in red.

### Postconditions (Alternative Flows)

* 5'.1: Data updates abort entirely; previous configuration fields remain unchanged inside database storage rows.

**Special Requirements**

* None.

# Diagram

## Library Map & Study Group & Room Reservation

```mermaid
flowchart LR
    %% Actors 
    Actor1(["<center>{abstract} <br> General user</center>"])
    Actor2(["<center>User</center>"])

    %% System Boundary Subgraph
    subgraph LibrarySystem [Library Map & Study Group & Room Reservation]
        %% Use Cases (using circle style: (( )) )
        UC_ViewMap((View Library Map))
        UC_ViewFacility((View Facility Information))
        
        UC_AbsReserving(("<center>{abstract} <br> Reserving Room</center>"))
        UC_ReservingFreely((Reserving Room Freely))
        UC_ReservingStudyGroup((Reserving Room for Study Group))
        
        UC_AbsManagingRoom(("<center>{abstract} <br> Managing Room</center>"))
        UC_CreateReservation((Creating Room Reservation))
        UC_CancelReservation((Canceling Room Reservation))
        
        UC_AbsManagingStudy(("<center>{abstract}<br>Managing Study Group</center>"))
        UC_CreateStudyGroup((Creating Study Group))
        UC_CancelStudyGroup((Canceling Study Group))
        UC_UpdateStudyGroup((Updating Study Group Information))
    end

    %% -------------------------------------------------------------
    %% Actor Associations
    %% -------------------------------------------------------------

    Actor1 --- UC_ViewMap
    Actor2 --- UC_AbsReserving

    %% -------------------------------------------------------------
    %% Extend & Include Relationships 
    %% -------------------------------------------------------------
    UC_ViewFacility -. "<< extend >>" .-> UC_ViewMap
    UC_AbsReserving -. "<< extend >>" .-> UC_ViewFacility
    UC_AbsReserving -. "<< include >>" .-> UC_AbsManagingRoom
    UC_ReservingStudyGroup -. "<< include >>" .-> UC_AbsManagingStudy

    %% -------------------------------------------------------------
    %% Generalization Relationships (pointing Specific -> Abstract)
    %% -------------------------------------------------------------
    UC_ReservingFreely --> UC_AbsReserving
    UC_ReservingStudyGroup --> UC_AbsReserving
    
    UC_CreateReservation --> UC_AbsManagingRoom
    UC_CancelReservation --> UC_AbsManagingRoom
    
    UC_CreateStudyGroup --> UC_AbsManagingStudy
    UC_CancelStudyGroup --> UC_AbsManagingStudy
    UC_UpdateStudyGroup --> UC_AbsManagingStudy

    %% Styling
    style LibrarySystem fill:#fff,stroke:#333,stroke-width:2px
```
