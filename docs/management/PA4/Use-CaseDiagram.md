<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

# Use Case Diagram

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA4-2026

Performed by: Trần Lê Hoàng Gia, Vũ Duy Nhất | Reviewed by: All Other Members | Edited by: Trần Lê Hoàng Gia

## Table of Contents

- [Use Case Diagram](#use-case-diagram)
  - [Table of Contents](#table-of-contents)
  - [Actor Regulation](#actor-regulation)
  - [Authentication](#authentication)
  - [Profile Management](#profile-management)
  - [Books Exploration \& Interaction](#books-exploration--interaction)
  - [Study Group Creation \& Facility Reservation](#study-group-creation--facility-reservation)
  - [Study Group](#study-group)
  - [AI Recommendations](#ai-recommendations)
  - [Librarian Administration](#librarian-administration)
  - [System Administration](#system-administration)

## Actor Regulation

```mermaid
flowchart RL
    PlatformUser(["<center>{abstract}<br/>fa:fa-user Platform User</center>"])
    Visitor(["<center>fa:fa-user Visitor</center>"])
    AuthenticatedUser(["<center>{abstract}<br/>fa:fa-user Authenticated User</center>"])
    Reader(["<center>fa:fa-user Reader (Patron)</center>"])
    Librarian(["<center>fa:fa-user Librarian</center>"])
    Admin(["<center>fa:fa-user System Administrator</center>"])
    Host(["<center>fa:fa-user Study Group Host</center>"])
    Member(["<center>fa:fa-user Study Group Member</center>"])
    Applicant(["<center>fa:fa-user Prospective Member</center>"])

    Visitor --> PlatformUser
    AuthenticatedUser --> PlatformUser
    Reader --> AuthenticatedUser
    Librarian --> AuthenticatedUser
    Admin --> AuthenticatedUser
    Host --> Reader
    Member --> Reader
    Applicant --> Reader
```

`Reader (Patron)` maps to the persisted application role `user`. `Authenticated User` is an abstract actor shared by Reader, Librarian, and System Administrator. Contextual study-group actors specialize Reader rather than introducing new application roles.

<div class="page"/>

## Authentication

```mermaid
flowchart LR
    Visitor(["<center>fa:fa-user Visitor</center>"])

    subgraph Authentication [Authentication]
        direction TB
        UC_Register(["<center>UC-AUTH-01:<br/>Register</center>"])
        UC_VerifyEmail(["<center>UC-AUTH-02:<br/>Verify Email</center>"])
        UC_OAuth(["<center>UC-AUTH-03:<br/>Google OAuth</center>"])
        UC_Login(["<center>UC-AUTH-04:<br/>Login</center>"])
        UC_Forgot(["<center>UC-AUTH-05:<br/>Forgot Password</center>"])
        UC_VerifyOTP(["<center>UC-AUTH-06:<br/>Verify OTP</center>"])
        UC_Reset(["<center>UC-AUTH-07:<br/>Reset Password</center>"])

        UC_Register -. "<< include >>" .-> UC_VerifyEmail
        UC_Forgot -. "<< include >>" .-> UC_VerifyOTP
        UC_Forgot -. "<< include >>" .-> UC_Reset
    end

    Email(["<center>&lt;&lt;service&gt;&gt;<br/>fa:fa-envelope Email Service</center>"])
    Google(["<center>&lt;&lt;service&gt;&gt;<br/>fa:fa-id-card Google Identity</center>"])

    Visitor ~~~ Authentication ~~~ Email
    Visitor ~~~ Authentication ~~~~ Google

    Visitor --- UC_Register
    Visitor --- UC_OAuth
    Visitor --- UC_Login
    Visitor --- UC_Forgot
    UC_VerifyEmail --- Email
    UC_VerifyOTP --- Email
    UC_OAuth --- Google

    style Authentication fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

## Profile Management

```mermaid
flowchart LR
    AuthenticatedUser(["<center>{abstract}<br/>fa:fa-user Authenticated User</center>"])

    subgraph ProfileManagement [Profile Management]
        direction TB
        UC_View(["<center>UC-PROF-01:<br/>View Self Profile</center>"])
        UC_Edit(["<center>UC-PROF-02:<br/>Edit Profile</center>"])
        UC_Avatar(["<center>UC-PROF-03:<br/>Change Avatar</center>"])
        UC_Password(["<center>UC-PROF-04:<br/>Change Password</center>"])

        UC_Edit -. "<< extend >>" .-> UC_View
        UC_Avatar -. "<< extend >>" .-> UC_View
        UC_Password -. "<< extend >>" .-> UC_View
    end

    Cloudinary(["<center>&lt;&lt;service&gt;&gt;<br/>fa:fa-images Cloudinary</center>"])

    AuthenticatedUser ~~~~~ ProfileManagement ~~~ Cloudinary

    AuthenticatedUser --- UC_View
    AuthenticatedUser --- UC_Password
    UC_Avatar --- Cloudinary

    style ProfileManagement fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

## Books Exploration \& Interaction

```mermaid
flowchart TD
    PlatformUser(["<center>{abstract}<br/>fa:fa-user Platform User</center>"])

    subgraph BooksSystem [Books Exploration & Interaction]
        subgraph SearchBlock [Search Features]
            UC_Search(["<center>UC-BK-01:<br/>Book Searching</center>"])
            UC_Filter(["<center>UC-BK-02:<br/>Filter Books</center>"])
        end

        subgraph ActionBlock [Book Actions]
            UC_Detail(["<center>UC-BK-03:<br/>View Book Detail</center>"])
            UC_Wishlist(["<center>UC-BK-04:<br/>Manage Wishlist</center>"])
            UC_Reserve(["<center>UC-BK-05:<br/>Reserve Book</center>"])
        end

        subgraph ReserveBlock [Reservation Management]
            UC_Cancel(["<center>UC-BK-06:<br/>Cancel Book Reservation</center>"])
            UC_Pin(["<center>UC-BK-07:<br/>Generate Pickup PIN</center>"])
        end

        UC_Filter -. "<< extend >>" .-> UC_Search
        UC_Wishlist -. "<< extend >>" .-> UC_Detail
        UC_Reserve -. "<< extend >>" .-> UC_Detail
    end

    Reader(["<center>fa:fa-user Reader (Patron)</center>"])

    PlatformUser --- UC_Search
    PlatformUser --- UC_Filter
    PlatformUser --- UC_Detail
    Reader --- UC_Wishlist
    Reader --- UC_Reserve
    Reader --- UC_Cancel
    Reader --- UC_Pin

    style BooksSystem fill:#fff,stroke:#333,stroke-width:2px
    style SearchBlock fill:none,stroke:none
    style ActionBlock fill:none,stroke:none
    style ReserveBlock fill:none,stroke:none
```

<div class="page"/>

## Study Group Creation & Facility Reservation

```mermaid
flowchart LR
    PlatformUser(["<center>{abstract}<br/>fa:fa-user Platform User</center>"])

    subgraph FacilitySystem [Library Map & Study Group & Room Reservation]
        UC_Map(["<center>UC-FAC-01:<br/>View Library Map</center>"])
        UC_Facility(["<center>UC-FAC-02:<br/>View Facility Information</center>"])
        UC_Room(["<center>UC-FAC-03:<br/>Reserve Room</center>"])
        UC_CancelRoom(["<center>UC-FAC-04:<br/>Cancel Room Reservation</center>"])
        UC_CreateGroup(["<center>UC-FAC-05:<br/>Create Study Group</center>"])
        UC_Dissolve(["<center>UC-FAC-06:<br/>Dissolve Study Group</center>"])
        UC_Update(["<center>UC-FAC-07:<br/>Update Study Group</center>"])

        UC_Facility -. "<< extend >>" .-> UC_Map
        UC_Room -. "<< extend >>" .-> UC_Facility
        UC_CreateGroup -. "<< extend >>" .-> UC_Facility
        UC_CreateGroup -. "<< include >>" .-> UC_Room
    end

    Reader(["<center>fa:fa-user Reader (Patron)</center>"])
    Host(["<center>fa:fa-user Study Group Host</center>"])
    Host --> Reader

    PlatformUser ~~~ FacilitySystem ~~~ Reader

    PlatformUser --- UC_Map
    Reader --- UC_Room
    Reader --- UC_CancelRoom
    Reader --- UC_CreateGroup
    Host --- UC_Dissolve
    Host --- UC_Update

    style FacilitySystem fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

## Study Group

```mermaid
flowchart TD
    PlatformUser(["<center>{abstract}<br/>fa:fa-user Platform User</center>"])

    subgraph StudyGroupSystem [Study Group]
        UC_Search(["<center>UC-SG-01:<br/>Search Study Groups</center>"])
        UC_Filter(["<center>UC-SG-02:<br/>Filter Study Groups</center>"])
        UC_Detail(["<center>UC-SG-03:<br/>View Study Group Detail</center>"])
        UC_Invite(["<center>UC-SG-04:<br/>Invite Member</center>"])
        UC_Remove(["<center>UC-SG-05:<br/>Remove Member</center>"])
        UC_Find(["<center>UC-SG-06:<br/>Find User by Email</center>"])
        UC_Profile(["<center>UC-SG-07:<br/>View Other Profile</center>"])
        UC_Request(["<center>UC-SG-08:<br/>Create Join Request</center>"])
        UC_Cancel(["<center>UC-SG-09:<br/>Cancel Join Request</center>"])
        UC_Leave(["<center>UC-SG-10:<br/>Leave Study Group</center>"])
        UC_Review(["<center>UC-SG-11:<br/>Review Join Request</center>"])
        UC_Respond(["<center>UC-SG-12:<br/>Respond to Invitation</center>"])

        UC_Profile -. "<< extend >>" .-> UC_Detail
        UC_Invite -. "<< include >>" .-> UC_Find
    end

    Reader(["<center>fa:fa-user Reader (Patron)</center>"])
    Host(["<center>fa:fa-user Study Group Host</center>"])
    Member(["<center>fa:fa-user Study Group Member</center>"])
    Applicant(["<center>fa:fa-user Prospective Member</center>"])

    Host --> Reader
    Member --> Reader
    Applicant --> Reader

    PlatformUser ~~~~~ StudyGroupSystem
    PlatformUser ~~~ Host

    PlatformUser --- UC_Search
    PlatformUser --- UC_Filter
    PlatformUser --- UC_Detail
    Reader --- UC_Profile
    Host --- UC_Invite
    Host --- UC_Remove
    Host --- UC_Review
    Member --- UC_Leave
    Applicant --- UC_Request
    Applicant --- UC_Cancel
    Applicant --- UC_Respond

    style StudyGroupSystem fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

## AI Recommendations

```mermaid
flowchart LR
    Reader(["<center>fa:fa-user Reader (Patron)</center>"])

    subgraph AIRecommendation [AI Recommendations]
        UC_Wishlist(["<center>UC-BK-04:<br/>Manage Wishlist</center>"])
        UC_View(["<center>UC-AIR-01:<br/>View Recommended Books</center>"])
        UC_Renew(["<center>UC-AIR-02:<br/>Renew Recommendations</center>"])
        UC_Wishlist -. "<< extend >>" .-> UC_View
        UC_Renew -. "<< extend >>" .-> UC_View
    end

    Reader ~~~~ AIRecommendation
    Reader --- UC_View

    style AIRecommendation fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

## Librarian Administration

```mermaid
flowchart LR
    Librarian(["<center>fa:fa-user Librarian</center>"])

    subgraph LibrarianAdministration [Librarian Administration]
        UC_ManageBooks(["<center>{abstract}<br/>Manage Books</center>"])
        UC_Add(["<center>UC-LIB-01:<br/>Add Books</center>"])
        UC_Remove(["<center>UC-LIB-02:<br/>Remove Books</center>"])
        UC_Return(["<center>UC-LIB-03:<br/>Confirm Book Return</center>"])
        UC_Assess(["<center>UC-LIB-04:<br/>Assess Return and<br/>Penalty</center>"])
        UC_Borrow(["<center>UC-LIB-05:<br/>Confirm Book Borrowing</center>"])
        UC_Room(["<center>UC-LIB-06:<br/>Confirm Room Check-in</center>"])
        UC_Announcement(["<center>UC-LIB-07:<br/>Manage Announcements</center>"])
        UC_VerifyPin(["<center>Verify PIN</center>"])

        UC_Add --> UC_ManageBooks
        UC_Remove --> UC_ManageBooks
        UC_Return -. "<< include >>" .-> UC_VerifyPin
        UC_Return -. "<< include >>" .-> UC_Assess
        UC_Borrow -. "<< include >>" .-> UC_VerifyPin
        UC_Room -. "<< include >>" .-> UC_VerifyPin
    end

    Librarian ~~~~ LibrarianAdministration
    Librarian --- UC_ManageBooks
    Librarian --- UC_Return
    Librarian --- UC_Borrow
    Librarian --- UC_Room
    Librarian --- UC_Announcement

    style LibrarianAdministration fill:#fff,stroke:#333,stroke-width:2px
```

<div class="page"/>

## System Administration

```mermaid
flowchart TD
    Admin(["<center>fa:fa-user System Administrator</center>"])

    subgraph AdminAdministration [System Administration]
        direction TB
        UC_Accounts(["<center>UC-ADM-01:<br/>Manage User Accounts</center>"])
        UC_Export(["<center>UC-ADM-02:<br/>Export User CSV</center>"])
        UC_Roles(["<center>UC-ADM-03:<br/>Manage Role Assignments</center>"])
        UC_ChangeRole(["<center>UC-ADM-04:<br/>Promote or Demote<br/>Account</center>"])
        UC_InviteAdmin(["<center>UC-ADM-05:<br/>Invite Administrator</center>"])
        UC_Config(["<center>UC-ADM-06:<br/>System Configuration</center>"])
        UC_Statistics(["<center>UC-ADM-07:<br/>View Statistics</center>"])

        UC_Export -. "<< extend >>" .-> UC_Accounts
        UC_ChangeRole -. "<< include >>" .-> UC_Roles
        UC_InviteAdmin -. "<< include >>" .-> UC_Roles
    end

    Admin ~~~~ AdminAdministration
    Admin --- UC_Accounts
    Admin --- UC_Roles
    Admin --- UC_Config
    Admin --- UC_Statistics

    style AdminAdministration fill:#fff,stroke:#333,stroke-width:2px
```
