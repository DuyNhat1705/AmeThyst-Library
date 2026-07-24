# Usecase Diagram

**Project Name:** Modern Library Management System

**Course:** CS300 – CSC13002 – Introduction to Software Engineering 

**Group ID:** 03

**Group Name:** Amethyst

**Assignment:** PA3-2026

## Table of content
- [Usecase Diagram](#usecase-diagram)
  - [Table of content](#table-of-content)
  - [Regulation](#regulation)
  - [Authentication](#authentication)
  - [Profile Management](#profile-management)
  - [Library Map \& Study Group \& Room Reservation](#library-map--study-group--room-reservation)
  - [Library Exploration](#library-exploration)
  - [Study Group](#study-group)
  - [AI Recomendations](#ai-recomendations)
  - [Admin Administration](#admin-administration)
  - [Librarian Administration](#librarian-administration)


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

<div class="page"/>

## Authentication 

```mermaid
flowchart LR
    %% Left Actor
    ActorGuest((Guest))
        %% Central System Boundary Subgraph
    subgraph Authentication [Authentication]
        UC_Reg((Register))
        UC_OAuth((Google OAuth))
        UC_Login((Login))
        UC_Forget((Forget Password))
        UC_Change((Change Password))
        UC_VerifyEmail((Verify By Email))
        UC_VerifyOTP((Verify By OTP))
    end

    %% Right Actors
    ActorEmail(["<center><< service >><br>Email</center>"])
    ActorGoogle(["<center><< service >><br>Google Client</center>"])

    %% -------------------------------------------------------------
    %% Structural Layout Anchors (Invisible lines to center-align the subgraph)
    %% -------------------------------------------------------------
    ActorGuest ~~~ Authentication ~~~ ActorEmail
    ActorGuest ~~~ Authentication ~~~~ ActorGoogle

    %% -------------------------------------------------------------
    %% Actual Connections (Matching your image exactly)
    %% -------------------------------------------------------------
    %% Left Actor Associations
    ActorGuest --- UC_Reg
    ActorGuest --- UC_OAuth
    ActorGuest --- UC_Login
    ActorGuest --- UC_Forget

    %% Subgraph Internal Include Relationships
    UC_Reg -. "<< include >>" .-> UC_VerifyEmail
    UC_Forget -. "<< include >>" .-> UC_VerifyOTP
    UC_Forget -. "<< include >>" .-> UC_Change

    %% Right Actor Associations
    UC_VerifyEmail --- ActorEmail
    UC_OAuth --- ActorGoogle
    UC_VerifyOTP --- ActorEmail

    %% Styling
    style Authentication fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

## Profile Management

```mermaid
flowchart LR
    %% Actors
    ActorLeft(["<center>{abstract} <br> logged user</center>"])
    ActorRight(["<center>&lt&lt; service &gt&gt; <br> Cloudinary</center>"]) 

    %% System Boundary
    subgraph ProfileManagement [Profile Management]
        UC1((View Self Profile))
        UC2((Edit Profile))
        UC3((Change Avatar))
        UC4((Change Password))
    end
    
	ActorLeft ~~~~~ ProfileManagement ~~~ ActorRight

    %% Relationships
    ActorLeft --- UC1
    ActorLeft --- UC4
    
    UC2 -. "<< extend >>" .-> UC1
    UC3 -. "<< extend >>" .-> UC1
    
    UC3  --- ActorRight 
   
    %% Styling to make it clean
    style ProfileManagement fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

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

<div class="page"/>

## Library Exploration
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
</div>

## Study Group
```mermaid
flowchart TD
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

<div class="page"/>

## AI Recomendations
```mermaid
flowchart LR
 subgraph AIRecommendation["AI Recommedation"]
        UC1(("Adding book favorite"))
        UC2(("View Recomended Book"))
        UC3(("Reset AI Recommend"))
  end
    ActorUser(["user"]) ~~~~ AIRecommendation 
    ActorUser(["user"]) --- UC2
    UC1 -. &lt;&lt; extend &gt;&gt; .-> UC2
    UC3 -. &lt;&lt; extend &gt;&gt; .-> UC2

    style AIRecommendation fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

## Admin Administration

```mermaid
flowchart TD
 subgraph AdminAdministration["Admin Administration"]
        UC1(("View User Account"))
        UC2(("Generating CSV Report"))
        UC3(("Authorization"))
        UC4(("Role Control"))
        UC5(("Use-case Permission"))
        UC6(("System Configuration"))
        UC7(("View Statistics"))
  end
    Admin(["Admin"]) ~~~~ AdminAdministration
    Admin --- UC1 & UC3 & UC6 & UC7
    UC2 -. &lt;&lt; extend &gt;&gt; .-> UC1
    UC4 --> UC3
    UC5 --> UC3

    style AdminAdministration fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

## Librarian Administration
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
