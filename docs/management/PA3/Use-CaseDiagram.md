# Usecase Diagram
    Project: Modern Library Management System 
    Course: CS300 – CSC13002 – Introduction to Software Engineering 
    Group ID: 03
    Group Name: AmeThyst 
    Assignment: PA3-2026

Performed by: Trần Lê Hoàng Gia, Vũ Duy Nhất | Reviewed by: All Other Members | Edited by: Trần Lê Hoàng Gia

## Table of content
- [Usecase Diagram](#usecase-diagram)
  - [Table of content](#table-of-content)
  - [Regulation](#regulation)
  - [Authentication](#authentication)
  - [Profile Management](#profile-management)
  - [Books Exploration \& Interaction](#books-exploration--interaction)
  - [Study Group Creation \& Facility Reservation](#study-group-creation--facility-reservation)
  - [Study Group](#study-group)
  - [AI Recommendations](#ai-recommendations)
  - [Librarian Administration](#librarian-administration)
  - [Admin Administration](#admin-administration)


## Regulation
```mermaid
flowchart RL
    L1(["<center>{abstract}<br>fa:fa-user Logged User</center>"])

    L2_1(["<center>fa:fa-user Admin</center>"])
    L2_2(["<center>fa:fa-user User</center>"])
    L2_3(["<center>fa:fa-user Librarian</center>"])

    L3(["<center>{abstract}<br>fa:fa-user General User</center>"])

    L4_1(["<center>fa:fa-user Guest</center>"])
    L4_2(["<center>fa:fa-user Admin</center>"])
    L4_3(["<center>fa:fa-user User</center>"])
    L4_4(["<center>fa:fa-user Librarian</center>"])

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
    ActorGuest(["<center>fa:fa-user Guest</center>"])
        %% Central System Boundary Subgraph
    subgraph Authentication [Authentication]
        UC_Reg(["<center>UC-AUTH-01:<br>Register</center>"])
        UC_OAuth(["<center>UC-AUTH-03:<br>Google OAuth</center>"])
        UC_Login(["<center>UC-AUTH-04:<br>Login</center>"])
        UC_Forget(["<center>UC-AUTH-05:<br>Forget Password</center>"])
        UC_Change(["<center>UC-AUTH-07:<br>Change Password</center>"])
        UC_VerifyEmail(["<center>UC-AUTH-02:<br>Verify By Email</center>"])
        UC_VerifyOTP(["<center>UC-AUTH-06:<br>Verify By OTP</center>"])
    end

    %% Right Actors
    ActorEmail(["<center>&lt;&lt; service &gt;&gt;<br>fa:fa-envelope Email</center>"])
    ActorGoogle(["<center>&lt;&lt; service &gt;&gt;<br>fa:fa-id-card Google Client</center>"])

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
    ActorLeft(["<center>{abstract}<br>fa:fa-user Logged User</center>"])
    ActorRight(["<center>&lt;&lt; service &gt;&gt;<br>fa:fa-images Cloudinary</center>"]) 

    %% System Boundary
    subgraph ProfileManagement [Profile Management]
        UC1(["<center>UC-PROF-01:<br>View Self Profile</center>"])
        UC2(["<center>UC-PROF-02:<br>Edit Profile</center>"])
        UC3(["<center>UC-PROF-03:<br>Change Avatar</center>"])
        UC4(["<center>UC-PROF-04:<br>Change Password</center>"])
    end
    
	ActorLeft ~~~~~ ProfileManagement ~~~ ActorRight

    %% Relationships
    ActorLeft --- UC1
    ActorLeft --- UC4
    
    UC2 -. "<< extend >>" .-> UC1
    UC3 -. "<< extend >>" .-> UC1
    
    UC3 --- ActorRight 
   
    %% Styling to make it clean
    style ProfileManagement fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>


## Books Exploration \& Interaction
```mermaid
flowchart TD
    %% Actors 
    Actor1(["<center>{abstract}<br>fa:fa-user General User</center>"])
    Actor2(["<center>fa:fa-user Logged User</center>"])

    %% System Boundary Subgraph
    subgraph BooksSystem [Books]
        %% Column 1: Search & Filter Features
        subgraph SearchBlock [Search Features]
            UC_StdSearch(["<center>Standard Search</center>"])
            UC_SemSearch(["<center>Search by context<br>and description</center>"])
            UC_AbsSearching(["<center>UC-BK-01:<br>Book Searching</center>"])
            UC_Filter(["<center>UC-BK-02:<br>Filtering Book</center>"])
        end
        
        %% Column 2: Book Actions
        subgraph ActionBlock [Book Actions]
            UC_ViewDetail(["<center>UC-BK-03:<br>View Book Detail</center>"])
            UC_AddFav(["<center>UC-BK-04:<br>Add Book Favorite</center>"])
            UC_Reserve(["<center>UC-BK-05:<br>Book Reservation</center>"])
        end
        
        %% Column 3: Reservation Management
        subgraph ReserveBlock [Reservation Management]
            UC_AbsManageReserve(["<center>{abstract}<br>Managing Reserved Book</center>"])
            UC_CreateReserve(["<center>UC-BK-05:<br>Book Reservation</center>"])
            UC_CancelReserve(["<center>UC-BK-06:<br>Canceling Book Reservation</center>"])
            UC_GenPin(["<center>UC-BK-07:<br>Generating Pin</center>"])
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
<div class="page"/>

## Study Group Creation & Facility Reservation

```mermaid
flowchart LR
    %% Actors 
    Actor1(["<center>{abstract}<br>fa:fa-user General User</center>"])
    Actor2(["<center>fa:fa-user Logged User</center>"])

    %% System Boundary Subgraph
    subgraph LibrarySystem [Library Map & Study Group & Room Reservation]
        %% Use Cases (using circle style: ([ ]) )
        UC_ViewMap(["<center>UC-FAC-01:<br>View Library Map</center>"])
        UC_ViewFacility(["<center>UC-FAC-02:<br>View Facility Information</center>"])
        
        UC_AbsReserving(["<center>UC-FAC-03:<br>Room Reservation</center>"])
        UC_ReservingFreely(["<center>Reserving Room Freely</center>"])
        UC_ReservingStudyGroup(["<center>Reserving Room<br>for Study Group</center>"])
        
        UC_AbsManagingRoom(["<center>{abstract}<br>Managing Room</center>"])
        UC_CreateReservation(["<center>UC-FAC-03:<br>Creating Room Reservation</center>"])
        UC_CancelReservation(["<center>UC-FAC-04:<br>Canceling Room Reservation</center>"])
        
        UC_AbsManagingStudy(["<center>{abstract}<br>Managing Study Group</center>"])
        UC_CreateStudyGroup(["<center>UC-FAC-05:<br>Creating Study Group</center>"])
        UC_CancelStudyGroup(["<center>UC-FAC-06:<br>Canceling Study Group</center>"])
        UC_UpdateStudyGroup(["<center>UC-FAC-07:<br>Updating Study Group<br>Information</center>"])
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


## Study Group
```mermaid
flowchart TD
 subgraph StudyGroup["Study Group"]
        UC1(["<center>UC-SG-01:<br>Searching Study Group</center>"])
        UC2(["<center>UC-SG-02:<br>Filtering Study Group</center>"])
        UC3(["<center>UC-SG-03:<br>View Study Group Detail</center>"])
        UC5(["<center>UC-SG-04:<br>Inviting Others into<br>Study Group</center>"])
        UC4(["<center>{abstract}<br>Interacting with Others</center>"])
        UC6(["<center>UC-SG-05:<br>Remove Others from<br>Study Group</center>"])
        UC7(["<center>UC-SG-06:<br>Finding User By Email</center>"])
        UC8(["<center>UC-SG-07:<br>View Other Profile</center>"])
        UC9(["<center>{abstract}<br>Interacting with Study Group</center>"])
        UC10(["<center>{abstract}<br>Managing Join<br>Request</center>"])
        UC11(["<center>UC-SG-08:<br>Creating Join<br>Request</center>"])
        UC12(["<center>UC-SG-09:<br>Canceling Join<br>Request</center>"])
        UC13(["<center>UC-SG-10:<br>Out Study Group</center>"])
  end
    StudyGroupCreator(["<center>fa:fa-user Study Group Creator</center>"]) --> User(["<center>{abstract}<br>fa:fa-user Logged User</center>"])
    GeneralUser(["<center>{abstract}<br>fa:fa-user General User</center>"]) ~~~ StudyGroupCreator
    StudyGroupCreator ~~~ User
    GeneralUser ~~~~~ StudyGroup
    GeneralUser --- UC1 & UC2 & UC3
    StudyGroupCreator --- UC4 & UC9
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

## AI Recommendations
```mermaid
flowchart LR
 subgraph AIRecommendation["AI Recommendation"]
        UC1(["<center>UC-BK-04:<br>Add Book Favorite</center>"])
        UC2(["<center>UC-AIR-01:<br>View Recommended Book</center>"])
        UC3(["<center>UC-AIR-02:<br>Reset AI Recommend</center>"])
  end
    ActorUser(["<center>fa:fa-user Logged User</center>"]) ~~~~ AIRecommendation 
    ActorUser --- UC2
    UC1 -. "<< extend >>" .-> UC2
    UC3 -. "<< extend >>" .-> UC2

    style AIRecommendation fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

## Librarian Administration
```mermaid
flowchart LR
 subgraph LibrarianAdministration["Librarian Administration"]
        UC1(["<center>{abstract}<br>Managing Book</center>"])
        UC2(["<center>UC-LIB-01:<br>Adding Books</center>"])
        UC3(["<center>UC-LIB-02:<br>Removing Books</center>"])
        UC4(["<center>UC-LIB-03:<br>Confirming Book Return</center>"])
        UC5(["<center>UC-LIB-04:<br>Recording Loan</center>"])
        UC6(["<center>Managing Room</center>"])
        UC7(["<center>{abstract}<br>Verifying Pin</center>"])
        UC8(["<center>UC-LIB-05:<br>Confirming Book Borrowed</center>"])
        UC9(["<center>UC-LIB-06:<br>Confirming Room Checkin</center>"])
        UC10(["<center>UC-LIB-07:<br>Announcement</center>"])
  end
    Librarian(["<center>fa:fa-user Librarian</center>"]) ======= LibrarianAdministration
    Librarian --- UC1 & UC6 & UC7 & UC10
    
    UC2 --> UC1
    UC3 --> UC1
    UC4 --> UC1
    
    %% Fixed: Changed from generalization (-->) to <<include>>
    UC8 -. "<< include >>" .-> UC7
    UC9 -. "<< include >>" .-> UC7
    UC5 -. "<< extend >>" .-> UC4

    style LibrarianAdministration fill:#fff,stroke:#333,stroke-width:2px
    linkStyle 0 stroke:transparent
```

<div class="page"/>

## Admin Administration

```mermaid
flowchart TD
 subgraph AdminAdministration["Admin Administration"]
        UC1(["<center>UC-ADM-01:<br>View User Account</center>"])
        UC2(["<center>UC-ADM-02:<br>Generating CSV Report</center>"])
        UC3(["<center>UC-ADM-03:<br>Authorization</center>"])
        UC4(["<center>UC-ADM-04:<br>Role Control</center>"])
        UC5(["<center>UC-ADM-05:<br>Use-case Permission</center>"])
        UC6(["<center>UC-ADM-06:<br>System Configuration</center>"])
        UC7(["<center>UC-ADM-07:<br>View Statistics</center>"])
  end
    Admin(["<center>fa:fa-user Admin</center>"]) ~~~~ AdminAdministration
    Admin --- UC1 & UC3 & UC6 & UC7
    
    %% Fixed: Changed from generalization (-->) to <<include>>
    UC2 -. "<< extend >>" .-> UC1
    UC4 -. "<< include >>" .-> UC3
    UC5 -. "<< include >>" .-> UC3

    style AdminAdministration fill:#fff,stroke:#333,stroke-width:2px
```
