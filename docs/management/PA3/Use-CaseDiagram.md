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
    L1(["<center>{abstract} <br> fa:fa-user Logged User</center>"])

    L2_1([fa:fa-user Admin])
    L2_2([fa:fa-user User])
    L2_3([fa:fa-user Librarian])

    L3(["<center>{abstract} <br> fa:fa-user General User</center>"])

    L4_1([fa:fa-user Guest])
    L4_2([fa:fa-user Admin])
    L4_3([fa:fa-user User])
    L4_4([fa:fa-user Librarian])

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
    ActorGuest([fa:fa-user Guest])
        %% Central System Boundary Subgraph
    subgraph Authentication [Authentication]
        UC_Reg([UC-AUTH-01:<br>Register])
        UC_OAuth([UC-AUTH-03:<br>Google OAuth])
        UC_Login([UC-AUTH-04:<br>Login])
        UC_Forget([UC-AUTH-05:<br>Forget Password])
        UC_Change([UC-AUTH-07:<br>Change Password])
        UC_VerifyEmail([UC-AUTH-02:<br>Verify By Email])
        UC_VerifyOTP([UC-AUTH-06:<br>Verify By OTP])
    end

    %% Right Actors
    ActorEmail(["<center><< service >><br>fa:fa-envelope Email</center>"])
    ActorGoogle(["<center><< service >><br>fa:fa-id-card Google Client</center>"])

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
    ActorLeft(["<center>{abstract} <br> fa:fa-user Logged User</center>"])
    ActorRight(["<center>&lt&lt; service &gt&gt; <br>fa:fa-images Cloudinary</center>"]) 

    %% System Boundary
    subgraph ProfileManagement [Profile Management]
        UC1([UC-PROF-01:<br>View Self Profile])
        UC2([UC-PROF-02:<br>Edit Profile])
        UC3([UC-PROF-03:<br>Change Avatar])
        UC4([UC-PROF-04:<br>Change Password])
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


## Books Exploration \& Interaction
```mermaid
flowchart TD
    %% Actors 
    Actor1(["<center>{abstract} <br> fa:fa-user General User</center>"])
    Actor2(["fa:fa-user Logged User"])

    %% System Boundary Subgraph
    subgraph BooksSystem [Books]
        %% Column 1: Search & Filter Features
        subgraph SearchBlock [Search Features]
            UC_StdSearch([Standard Search])
            UC_SemSearch([Semantic Search])
            UC_AbsSearching(["<center>UC-BK-01:<br>Book Searching</center>"])
            UC_Filter([UC-BK-02:<br>Filtering Book])
        end
        
        %% Column 2: Book Actions
        subgraph ActionBlock [Book Actions]
            UC_ViewDetail([UC-BK-03:<br>View Book Detail])
            UC_AddFav([UC-BK-04:<br>Add Book Favorite])
            UC_Reserve([UC-BK-05:<br>Book Reservation])
        end
        
        %% Column 3: Reservation Management
        subgraph ReserveBlock [Reservation Management]
            UC_AbsManageReserve(["<center>{abstract}<br>Managing Reserved Book</center>"])
            UC_CreateReserve([UC-BK-05:<br>Book Reservation])
            UC_CancelReserve([UC-BK-06:<br>Canceling Book Reservation])
            UC_GenPin([UC-BK-07:<br>Generating Pin])
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
    Actor1(["<center>{abstract} <br> fa:fa-user General User</center>"])
    Actor2(["<center> fa:fa-user User</center>"])

    %% System Boundary Subgraph
    subgraph LibrarySystem [Library Map & Study Group & Room Reservation]
        %% Use Cases (using circle style: ([ ]) )
        UC_ViewMap([UC-FAC-01:<br>View Library Map])
        UC_ViewFacility([UC-FAC-02:<br>View Facility Information])
        
        UC_AbsReserving(["<center>UC-FAC-03:<br>Room Reservation</center>"])
        UC_ReservingFreely([Reserving Room Freely])
        UC_ReservingStudyGroup([Reserving Room for Study Group])
        
        UC_AbsManagingRoom(["<center>{abstract} <br> Managing Room</center>"])
        UC_CreateReservation([UC-FAC-03:<br>Creating Room Reservation])
        UC_CancelReservation([UC-FAC-04:<br>Canceling Room Reservation])
        
        UC_AbsManagingStudy(["<center>{abstract}<br>Managing Study Group</center>"])
        UC_CreateStudyGroup([UC-FAC-05:<br>Creating Study Group])
        UC_CancelStudyGroup([UC-FAC-06:<br>Canceling Study Group])
        UC_UpdateStudyGroup([UC-FAC-07:<br>Updating Study Group Information])
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
        UC1([UC-SG-01:<br>Searching Study Group])
        UC2([UC-SG-02:<br>Filtering Study Group])
        UC3([UC-SG-03:<br>View Study Group Detail])
        UC5([UC-SG-04:<br>Inviting Others into<br>Study Group])
        UC4(["<center>{abstract}<br>Interacting with Others</center>"])
        UC6([UC-SG-05:<br>Remove Others from<br>Study Group])
        UC7([UC-SG-06:<br>Finding User By Email])
        UC8([UC-SG-07:<br>View Other Profile])
        UC9(["<center>{abstract}<br>Interacting with Study Group</center>"])
        UC10(["<center>{abstract}<br>Managing Join<br>Request</center>"])
        UC11([UC-SG-08:<br>Creating Join<br>Request])
        UC12([UC-SG-09:<br>Canceling Join<br>Request])
        UC13([UC-SG-10:<br>Out Study Group])
  end
    StudyGroupCreator(["fa:fa-user Study Group Creator"]) --> User(["<center>{abstract}<br>fa:fa-user User</center>"])
    OtherUser(["fa:fa-user Other User"]) --> User
    GeneralUser(["<center>{abstract}<br>fa:fa-user General User</center>"]) ~~~ StudyGroupCreator
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

## AI Recommendations
```mermaid
flowchart LR
 subgraph AIRecommendation["AI Recommendation"]
        UC1(["UC-BK-04:<br>Add Book Favorite"])
        UC2(["UC-AIR-01:<br>View Recommended Book"])
        UC3(["UC-AIR-02:<br>Reset AI Recommend"])
  end
    ActorUser(["fa:fa-user User"]) ~~~~ AIRecommendation 
    ActorUser --- UC2
    UC1 -. &lt;&lt; extend &gt;&gt; .-> UC2
    UC3 -. &lt;&lt; extend &gt;&gt; .-> UC2

    style AIRecommendation fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

## Librarian Administration
```mermaid
flowchart LR
 subgraph LibrarianAdministration["Librarian Administration"]
        UC1(["{abstract}<br>Managing Book"])
        UC2(["UC-LIB-01: Adding Books"])
        UC3(["UC-LIB-02: Removing Books"])
        UC4(["UC-LIB-03: Confirming Book Return"])
        UC5(["UC-LIB-04: Recording Loan"])
        UC6(["Managing Room"])
        UC7(["{abstract}<br>Verifying Pin"])
        UC8(["UC-LIB-05: Confirming Book Borrowed"])
        UC9(["UC-LIB-06: Confirming Room Checkin"])
        UC10(["UC-LIB-07: Announcement"])
  end
    Librarian(["fa:fa-user Librarian"]) ======= LibrarianAdministration
    Librarian --- UC1 & UC6 & UC7 & UC10
    
    UC2 --> UC1
    UC3 --> UC1
    UC4 --> UC1
    
    %% Fixed: Changed from generalization (-->) to <<include>>
    UC8 -. "<<include>>" .-> UC7
    UC9 -. "<<include>>" .-> UC7
    UC5 -. "<<extend>>" .-> UC4

    style LibrarianAdministration fill:#fff,stroke:#333,stroke-width:2px
    linkStyle 0 stroke:transparent
```

<div class="page"/>

## Admin Administration

```mermaid
flowchart TD
 subgraph AdminAdministration["Admin Administration"]
        UC1(["UC-ADM-01: View User Account"])
        UC2(["UC-ADM-02: Generating CSV Report"])
        UC3(["UC-ADM-03: Authorization"])
        UC4(["UC-ADM-04: Role Control"])
        UC5(["UC-ADM-05: Use-case Permission"])
        UC6(["UC-ADM-06: System Configuration"])
        UC7(["UC-ADM-07: View Statistics"])
  end
    Admin(["fa:fa-user Admin"]) ~~~~ AdminAdministration
    Admin --- UC1 & UC3 & UC6 & UC7
    
    %% Fixed: Changed from generalization (-->) to <<include>>
    UC2 -. "<<extend>>" .-> UC1
    UC4 -. "<<include>>" .-> UC3
    UC5 -. "<<include>>" .-> UC3

    style AdminAdministration fill:#fff,stroke:#333,stroke-width:2px
```
