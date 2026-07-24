# Use-Case Specification: Library Map & Study Group & Room Reservation Package

    Project Name: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering 
    Group ID: 03
    Group Name: Amethyst
    Assignment: PA3-2026
    Document Identifier: NGLP-SRS-LIB-001
    Version: 1.1

Performed by: Trần Lê Hoàng Gia, Phan Lê Anh Minh | Reviewed by: All Members | Edited by: Trần Lê Hoàng Gia, Phan Lê Anh Minh

---

## Revision History

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 20-Jul-2026 | 1.1 | Facility and Reserving room Use case (RUP format layout). | Trần Lê Hoàng Gia, Phan Lê Anh Minh |

---

## Table of Contents
1. [Regulation](#regulation)
8. [Use case diagram](#use-case-diagram)
1. [UC-LIB-01: View Library Map](#uc-lib-01-view-library-map)
2. [UC-LIB-02: View Facility Information](#uc-lib-02-view-facility-information)
3. [UC-LIB-03: Room Reservation](#uc-lib-03-room-reservation)
4. [UC-LIB-04: Canceling Room Reservation](#uc-lib-04-canceling-room-reservation)
5. [UC-LIB-05: Creating Study Group](#uc-lib-05-creating-study-group)
6. [UC-LIB-06: Canceling Study Group](#uc-lib-06-canceling-study-group)
7. [UC-LIB-07: Updating Study Group Information](#uc-lib-07-updating-study-group-information)


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

## Use case diagram

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

---

## UC-LIB-01: View Library Map

### 1. Use-Case Name

View Library Map

#### 1.1 Brief Description

Allows a user to view the interactive graphical spatial layout floor plan map of the physical library facilities.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user selects the "Interactive Map" tab component link from the primary navigation portal.


2. **[System Response]**: The system queries the database to load the current geometric library floor map configuration data models.


3. **[Display Result]**: The system renders the complete high-resolution layout map canvas onto the active user screen interface.


4. **[Actor Action]**: The user navigates, pans, or zooms around the active floor coordinate spaces.



#### 2.2 Alternative Flows

##### 2.2.1 Asset Loading Failure (Step 2)

If map structural asset vector files fail to load from backend content delivery nodes:

1. The system terminates the display script routine.


2. The system defaults to rendering a static text-based directory list layout grid of floors.



* **Postcondition (Alternative Flow):** The active workspace falls back to descriptive layout index directories; errors parse securely into diagnostic logs.



### 3. Special Requirements

#### 3.1 Render Performance Ceiling

The graphical layout component structure must render interactively within 1.0 second on modern client application endpoints.

### 4. Preconditions

#### 4.1 Interface Initialization

The user has launched the library digital map display.

### 5. Postconditions

#### 5.1 Interactive Map State

The digital structural blueprint map is fully loaded and remains interactive within the client application container workspace.

### 6. Extension Points

None.

### 7. Prototype Screen

![](Img/Facility/uc-LibMap.jfif)

---

## UC-LIB-02: View Facility Information

*Extends UC-LIB-01 (View Library Map) — extension point: User selects a specific room or point-of-interest zone node anchor element within the visual map array space.*

### 1. Use-Case Name

View Facility Information

#### 1.1 Brief Description

Extends the active map visualization layout dashboard panel to display specific metadata parameters, operational schedules, capacity thresholds, and equipment summaries for a chosen target room asset.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user hovers over and clicks an active structural facility zone/room element node anchor on the map layout model.


2. **[System Response]**: The system reads the clicked room ID parameter, intercepting the base mapping loop.


3. **[Data Processing]**: The system queries database profiles to extract targeted capacity indices, itemized equipment inventories, and booking schedule statuses.


4. **[Display Result]**: The system updates the UI by opening an aligned descriptive contextual informational summary side-drawer panel sheet component over the map workspace.



#### 2.2 Alternative Flows

##### 2.2.1 Legacy Component Deletion (Step 3)

If the chosen facility room identifier parameters match legacy hardware profiles deleted from standard database lookup tables:

1. The system presents a temporary notification popup indicating "Facility configuration parameters updated, listing refresh required."



* **Postcondition (Alternative Flow):** Invalid profile popups close immediately; the base layer interactive map forces an automatic silent index update routine.



### 3. Special Requirements

#### 3.1 Overlay Interface Non-Disruption

Context detail slide-drawer components must overlay fluidly without modifying or breaking current canvas viewport layout locations.

#### 3.2 Dynamic Functional Layout Capabilities

The "reserve" option and capacity information are available explicitly for the study room panel type, while other facility layout zones will display descriptive content matrices only.

### 4. Preconditions

#### 4.1 Underlying Map Session Active

The core baseline `View Library Map (UC-LIB-01)` flow is fully executed and active on screen.

### 5. Postconditions

#### 5.1 Overlay Statistics Presentation

Detailed individual facility asset performance metrics, resource lists, and structural availability maps display clearly alongside graphic canvases.

### 6. Extension Points

None.

### 7. Prototype Screen
![](Img/Facility/uc-room-info.jfif)

---

## UC-LIB-03: Room Reservation

*Specialized by Reserve room freely and Reserve room for Study group.*

### 1. Use-Case Name

Room Reservation

#### 1.1 Brief Description

Handles the end-to-end process enabling an authenticated user to directly secure a short-term reservation allocation block for an open facility study space. The system dynamically parses target timeline boundaries, enforces duration limits, resolves concurrent race conditions, locks availability grids, and outputs entrance validation credentials.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user opens the structural room booking schedule board tool component layout screen.


2. **[Actor Action]**: The user isolates an open target timeslot parameter block row on a free room workspace slot and hits the "Book Instantly" action control.


3. **[System Response]**: The system intercepts the transaction context, reads the target facility room item identifier, and captures the requested operational time window timeline boundaries.


4. **[Data Processing]**: The system queries the database tables to verify that the target room space record does not contain active, overlapping booking blocks within that specific timeframe.


5. **[Data Processing]**: The system evaluates the parsed duration parameters against standard account booking thresholds to ensure the timeline conforms to allowed continuous hourly limits.


6. **[Data Processing]**: The system locks the target calendar matrix block, shifting availability state configurations from "Available" to "Booked / Reserved".


7. **[Data Processing]**: The system logs a unique transactional allocation receipt index tracking row record detailing room numbers, account keys, timestamps, and entry variables.


8. **[Display Result]**: The system updates the live scheduling UI matrix dynamically to strip the targeted space block parameters out of the public discovery views, and displays a confirmation card layout showing specific room entrance verification PINs.



#### 2.2 Alternative Flows

##### 2.2.1 Duration Threshold Exception (Step 5)

If the targeted time duration parameters violate application booking limit thresholds:

1. The system interrupts the processing logic routine immediately.


2. The system throws an allocation constraint exception flag and blocks database write pipelines from committing changes.


3. The system highlights the duration configuration components on screen with a validation alert notice.



* **Postcondition (Alternative Flow):** Internal database state architectures maintain original conditions; the active booking form remains open on the user interface pane pending user boundary revisions.



##### 2.2.2 Grid Collision Race Condition (Step 6)

If another concurrent transaction session locks the exact same spatial grid slot milliseconds before submission:

1. The system database layer traps the conflict error and rejects the execution command thread.


2. The system cancels the workflow block execution and rolls back any pending staging changes.


3. The system surfaces a priority alert header bar onto the screen layout stating: "Timeslot reservation conflict encountered; this room slot has already been claimed."



* **Postcondition (Alternative Flow):** The active space booking matrix refreshes its visual structural layout layout immediately to show accurate states; database tables remain fully uncorrupted.



### 3. Special Requirements

#### 3.1 Serializable Transaction Isolation

Calendar scheduling check updates and state parameter adjustments must rely entirely on strict serializable transaction isolation logic rules to fully block duplicate double-booking anomalies during concurrent load spikes.

### 4. Preconditions

#### 4.1 Central Identity Clearance

The user profile account identity successfully clears central access authorization checks.

#### 4.2 Material Open Status

The chosen facility room asset calendar matches open, non-restricted booking states.

### 5. Postconditions

#### 5.1 Account Allocation Locked

An individual space transaction token instantiates securely, locking the designated room parameters for the designated duration.

#### 5.2 Global Grid Update

Core database calendar indices update permanently, blocking alternative reservation requests across all client discovery platforms.

### 6. Extension Points

None.

### 7. Prototype Screen
![](Img/Facility/uc-room-reserve.jfif)

---

## UC-LIB-04: Canceling Room Reservation

### 1. Use-Case Name

Canceling Room Reservation

#### 1.1 Brief Description

Processes user request commands to void active outstanding room slot holds, returning spaces into open catalog index pools.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user opens their personal active schedule dashboard interface window panel.


2. **[Actor Action]**: The user selects a target upcoming room reservation object row control card and hits "Cancel Booking".


3. **[Data Processing]**: The system processes the cancellation call context, modifying the database entry status description tag index values to "Cancelled".


4. **[Data Processing]**: The system modifies the targeted room structural availability calendar rows back to an "Available" state configuration parameter flag.


5. **[Display Result]**: The system sends confirmation notices to the user workspace screen while triggering background clearing loops.



#### 2.2 Alternative Flows

##### 2.2.1 Penalty Policy Horizon Encroachment (Step 3)

If the user processes cancellation intents within restricted time lock penalty parameters:

1. The system marks the database transaction status as "Late Cancellation".


2. The system flags the account history log index with an automated usage compliance flag warning.



* **Postcondition (Alternative Flow):** The space hold clears out safely; administrative metric systems update account infraction tracking fields.



### 3. Special Requirements

#### 3.1 Electronic Lock Synchronization

Cancel actions must trigger asynchronous event loops that instantly clear associated digital security locks installed at the physical room site coordinates.

### 4. Preconditions

#### 4.1 Matching Relational Hold

An active space allocation record is mapped under the user profile credentials matching upcoming timeline dates.

### 5. Postconditions

#### 5.1 Matrix Release Commitment

Outstanding space tracking parameters invalidate completely; room availability timelines clear to open registration access.

### 6. Extension Points

None.

### 7. Prototype Screen
![](Img/Facility/uc-room-reserve.jfif)

---

## UC-LIB-05: Creating Study Group

*Child sub-routine supporting parent operational blocks under abstract parent {abstract} Managing Study Group.*

*Included in Reserve room for Study group workflow parameters.*

### 1. Use-Case Name

Creating Study Group

#### 1.1 Brief Description

Establishes a fresh data structure instance profile configuring collaborative team metadata, participant rosters, and organizer roles.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user selects "Form New Study Group" via their group coordination tool dashboard panel.


2. **[System Response]**: The system prompts the user to supply structural identity parameters (Group Name, Subject Classification Tag, Maximum Capacity Limits).


3. **[Actor Action]**: The user populates the configuration fields and clicks "Confirm Setup".


4. **[Data Processing]**: The system validates syntax formatting and inserts a fresh team registry record entity row into the active profile databases.


5. **[Data Processing]**: The system configures the initialization user's security token role parameter index to "Group Owner / Administrator".


6. **[Display Result]**: The system displays the empty group management cockpit interface screen layout views.



#### 2.2 Alternative Flows

##### 2.2.1 Lexical Blocklist Interception (Step 4)

If the chosen Group Name parameter contains words matching active system text blocklist filters:

1. The system blocks database row creation frameworks.


2. The system surfaces explicit text layout warnings and locks submission tools pending correction.



* **Postcondition (Alternative Flow):** Group registry tables experience zero modification tasks; the form setup view model remains open.



### 3. Special Requirements

None.

### 4. Preconditions

#### 4.1 System Roster Identity Active

The team coordinator account holds active registration statuses within system databases.

### 5. Postconditions

#### 5.1 Collaborative Record Instantiated

A structural collaborative group object profile instantiates within application tables, ready to intercept member mapping data streams.

### 6. Extension Points

None.

### 7. Prototype Screen
![](Img/Facility/uc-group-create.jfif)
![](Img/Facility/uc-create-form.jfif)

---

## UC-LIB-06: Canceling Study Group

*Specializes abstract parent {abstract} Managing Study Group.*

### 1. Use-Case Name

Canceling Study Group

#### 1.1 Brief Description

Completely disbands an active study group team profile structure entity, purging associated participant mapping rows and linked metadata records.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user opens the administrative settings panel inside the target study group configuration dashboard.


2. **[Actor Action]**: The user clicks the priority action control link labeled "Disband / Delete Study Group".


3. **[System Response]**: The system raises an interactive safety validation challenge popup confirmation box module.


4. **[Actor Action]**: The user completes the verification prompt action step.


5. **[Data Processing]**: The system modifies team data rows, toggling lifecycle status state values to "Terminated / Disbanded".


6. **[Data Processing]**: The system cascade-purges participant relationship map links out of active session caches.


7. **[Display Result]**: The system notifies all active team members via operational dashboard alert feeds that the group space has closed.



#### 2.2 Alternative Flows

##### 2.2.1 Unfulfilled Asset Dependency Barriers (Step 5)

If the group entity profile holds active dependencies such as unfulfilled future room reservations:

1. The system prevents structural row delete steps.


2. The system displays a prompt screen detailing that the group cannot be killed until outstanding room bookings are resolved or transferred.



* **Postcondition (Alternative Flow):** The group deletion command sequence aborts; operational group entity variables maintain status-quo parameters.



### 3. Special Requirements

#### 3.1 Automated Cascade Validation

Group termination cleanup rules must fully run automated cascade validation checks across linked records to verify zero dangling relational index nodes remain in structural table spaces.

### 4. Preconditions

#### 4.1 Elevated Security Authority

The actor's account role profile parameter matches explicit "Group Owner / Administrator" authorization permissions keys.

### 5. Postconditions

#### 5.1 Relational Dissolution Complete

Coordinated team database index entities change to a fully inactive state model layout; member groupings break apart cleanly.

### 6. Extension Points

None.

### 7. Prototype Screen
![](Img/Facility/uc-group-manage.jfif)

---

## UC-LIB-07: Updating Study Group Information

*Specializes abstract parent {abstract} Managing Study Group.*

### 1. Use-Case Name

Updating Study Group Information

#### 1.1 Brief Description

Modifies operational configuration metadata parameters including capacity boundaries, name markers, visibility conditions, or subject categories for an existing active group.

### 2. Flow of Events

#### 2.1 Basic Flow

1. **[Actor Action]**: The user navigates to the group configuration editing dashboard profile template view layout.


2. **[System Response]**: The system populates input data entry text boxes with existing live database parameters.


3. **[Actor Action]**: The user modifies selected metadata settings (e.g., expanding group capacity thresholds, changing descriptions).


4. **[Actor Action]**: The user clicks the "Save Modifications" processing control button widget.


5. **[Data Processing]**: The system performs alignment safety checks to ensure new capacity parameters do not drop below the current count of already enrolled active members.


6. **[Data Processing]**: The system updates the targeted group configuration database columns with the revised parameters.
7. **[Display Result]**: The system updates workspace windows, rendering flash confirmation notification banners.



#### 2.2 Alternative Flows

##### 2.2.1 Active Capacity Floor Violation (Step 5)

If the user attempts to reduce group maximum capacity limits below the total number of currently active registered members:

1. The system blocks database modification commands.


2. The system flashes validation errors and highlights the capacity text box layout elements in red.



* **Postcondition (Alternative Flow):** Data updates abort entirely; previous configuration fields remain unchanged inside database storage rows.



### 3. Special Requirements

None.

### 4. Preconditions

#### 4.1 Ownership Permissions

The user profile account identity possesses necessary editing permission rights parameters within the group database records.

### 5. Postconditions

#### 5.1 Global Property Synchronization

Modified structural team layout profile properties match user updates instantly across all connected client interfaces.

### 6. Extension Points

None.

### 7. Prototype Screen
![](Img/Facility/uc-group-manage.jfif)