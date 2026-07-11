# Review Report

    Project: Modern Library Management System 
    Course: CS300 – CSC13002 – Introduction to Software Engineering 
    Group ID: 03
    Group Name: AmeThyst 
    Assignment: PA2-2026

Performed by: Vũ Duy Nhất | Reviewed by: All Other Members | Edited by: Vũ Duy Nhất

## I. What went well
- We have Project Plan to orientate the tasks we have to do in remain Sprints to complete our product thoroughly.
- We have Vision Document providing us general view of workflow, implementation idea of each functional group.
- The GUI is completed on Figma for 3 roles, which are user, librarian and admin and it supports significantly in shaping workflow of usecase when implementing and designing table for data saving.
- The tables that need to be pre-populated such as *books, library, study_room,...* are completely filled with data to serve implementation of functionality in this Sprint and later Sprints.
- In terms of implementation of our product, we have:
  - 4 functional groups completed: Authentication, Profile Management, Searching & Filtering, User Assistance (Library Map)
  - Book Borrowing usecase in Borrowing & Reserving, Pin Verification and Announcements usecase in Librarian Administration completed
  - GUI of Study Group completed
  - 36 test cases for Register usecase using Vitest
## II. Problems
- At the beginning of this sprint, considerable time was spent familiarizing with the coding regulations (modularized functions, syntax, refactoring, ...) established by the team leader.
- There were also instances where branches were merged into the *dev* branch or SQL files were updated without first notifying the team leader for review and approval. This caused system crashes when others pulled from the *dev* branch to implement features or run the database.
- Incorrect table and field names in the database caused data queries to fail and broke the corresponding APIs.
- Some members took on responsibilities outside their assigned tasks, requiring the team leader to redistribute the workload.
- The *.env* file was not shared among members, causing system crashes due to missing configuration information.
- Feeding the AI agent with inappropriate GUI descriptions led to confusion regarding API names and variable names for the corresponding use case.
## III. What can be done differently in next sprint to improve
- Coding regulations established by the team leader must be strictly followed to ensure the source code remains maintainable, extensible, and easy to debug.
- The team leader must be notified to review all code changes and SQL files. Only after approval should code be merged into the *dev* branch or SQL files be updated on Google Drive.
- The ERD on *Draw.io* should be proactively consulted, or *DBeaver* used to connect to the database, to ensure correct table and field names are used.
- Assigned tasks on *Jira* must be actively tracked to stay current with individual responsibilities.
- The *.env* file must be uploaded to the group's communication tool or Google Drive whenever new configuration information is introduced.
- The Figma UI/UX design should be followed closely, and these assets should be provided to the AI agent to ensure proper orientation and context when implementing functionality.
## IV. What lessons we could learn
- Familiarity was gained with several new technologies, including Docker, PostgreSQL, React Next.js, ExpressJS, and Vitest.
- The team learned how to drive AI-assisted coding effectively using SpecKit via Specification-Driven Development (SDD).
- Draw.io proved valuable for mapping out feature workflows before writing any code.
- Strict adherence to coding regulations is also significant, as it prevents project bloating and eliminates redundant API calls that would otherwise waste system resources.
- The importance of early-stage preparation: ERD for database design, framework selection, Figma GUI for use case workflow orientation, and collaboration protocols—became evident. Such preparation enables the team to scale up easily and quickly during implementation.
- The SCRUM development process provided the team leader with a comprehensive view of all assigned tasks, enabling timely adjustments to keep the team aligned with the initial objectives.
