# Project Proposal
Performed by: Nguyễn Lê Hoàng Khải

Reviewed by: Vũ Duy Nhất

Edited by: Nguyễn Lê Hoàng Khải

## 1. Introduction

### 1.1. Executive Summary
Our project is a Modern Library Management System for universities. It connects online convenience with physical library services. The system helps students find and reserve physical books online, then pick them up or return them quickly in person. It also includes a real-time booking feature for university study rooms and an AI tool to suggest the right books for users.

### 1.2. Project Objectives
*   **Speed up physical checkouts:** Stop manual paperwork and long queues when borrowing books or booking study rooms.
*   **Optimize library assets:** Help staff manage book stocks, monitor study room bookings, and view financial data easily in real-time.
*   **Modernize user experience:** Use AI to make finding books intuitive and personalized based on individual reading habits.

### 1.3. Value Proposition
#### For Individuals
*   **No wasted trips:** Book availability and reserve can be checked at home before coming to the library.
*   **Fast pickup and return:** The structured system makes physical checkouts and returns quick and simple.
*   **Fair room booking:** Easy study rooms booking online without conflicts with other groups.

#### For Library Staff
*   **Less daily workload:** Free staff from manual tasks like writing down booking notes or managing queues.
*   **Easy management:** Help staff easily track and control all library operations directly from computers.

### 1.4. Development Tools & Technologies
- **Project Management & Version Control:** GitHub for repository hosting.
- **Task Distribution:** Jira following the Scrum framework.
- **Team Communication & Resources:** Messenger for discussions, Google Drive for documentation storage.

## 2. Scope of Work

### 2.1. Target Users
- **Users seeking reference materials:** Individuals or students who need to quickly locate, reserve, and rent physical books or textbooks for their academic coursework and research. 
- **People looking for collaboration:** Users who want to connect with peers, form study groups, find study partners, and seamlessly book collaborative spaces. 
- **Individuals seeking quiet focus spaces:** People who need a quiet, structured environment to concentrate on their self-study, assignments, or private projects without interruption.

### 2.2. Target Environments
- **Web Application:** Responsive interface compatible with all major desktop and mobile web browsers (Chrome, Safari, Edge).
- **Cross-Platform:** Accessible across all operating systems (Windows, macOS, Linux, iOS, Android) without requiring local installation.

### 2.3. Project Deliverables
* A fully functional web application hosting all key features.
* An integrated AI core supporting Personalized Book Recommendations.
* System documentation including a Product Backlog (Jira) and Source Code (GitHub).

## 3. System Features 
### 3.1. Key Functional Groups
As proposed, there are 8 function groups, with 3 roles: User, Librarian, Admin.
### 3.2. Key Features
*   **Authentication:** Handles secure user registration, password recovery, and login, including quick login through Google OAuth. It keeps the library platform secure and ensures that only verified university accounts can access resources.
*   **Profile Management:** Allows users to view their active borrowed books, history, and edit personal information. It personalizes the user experience on the web and helps users easily track their own library activities in one place.
*   **Borrow & Reserving Feature:** This module lets users check real-time availability to reserve physical books and study rooms. When picking up or returning books, a quick mechanism (6-digit PIN verification) allows users to easily claim or return items with the librarian. This eliminates tedious paperwork and saves a lot of time for the user.
*   **Searching Feature:** A powerful search engine that goes beyond simple keyword matching. It allows users to search by traditional fields or use AI-powered semantic search, helping users find the exact reference materials they need instantly.
*  **Librarian Administration:** Empowers librarians to efficiently oversee daily operations, track physical inventory, and process in-person book pickups and returns. They can also provide timely support to user requests. This offers high reliability for users since a massive data system is directly and safely handled by human staff.
*  **Admin Administration:** Provides a comprehensive dashboard with visual statistics on system usage, popular book trends, and peak study room hours. This data-driven approach allows for easy system maintenance, efficient resource allocation, and book trend tracking to optimize the overall experience for users.
*   **Study Groups:** Fosters a collaborative community by allowing users to connect based on shared academic interests or specific topics. Users can form groups, send join requests, and seamlessly book study rooms together for collaborative work.
*   **User Assistance:** Enhances user satisfaction by offering accessible online guidelines and a direct support channel for troubleshooting. It also provides practical resources like library floor plans and policies to ensure a seamless physical visit.

## 4. Integrated AI Feature
### 4.1. AI-Powered Book Recommendations
The AI suggests books based on the user's reading and borrowing history. By analyzing past interactions, the system recommends new titles that align with the user's preferences. This provides real, practical value by significantly enhancing the experience for avid readers who want to discover new genres or books but are unsure where to start. Ultimately, this delivers a fresh and personalized experience, increasing user engagement and retaining them longer.
* Input: The user's past borrowing history and reading interactions.
* Output: Curated suggestions of books the user is highly likely to enjoy.
* Value: Reduces information overload within a massive library database, helping users easily navigate options and personalizing their learning journey.