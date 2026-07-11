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
- The tables that need to be pre-populated such as *books, lirary, study_room,...* are completely filled with data to serve implementation of functionality in this Sprint and later Sprints.
- In terms of implementation of our product, we have:
  - 4 functional groups completed: Authentication, Profile Management, Searching & Filtering, User Assistance (Library Map)
  - Book Borrowing usecase in Borrowing & Reserving, Pin Verification and Announcements usecase in Librarian Administration completed
  - GUI of Study Group completed
  - 36 test cases for Register usecase using Vitest
## II. Problems
- In the early of this sprint, the team members had to take time to get familiar with coding regulations (modulize functions, syntax, refactoring,...) which the team leader required.
- Also in the early of this sprint, there were situations that team members merged their branch into *dev* branch or updated *SQL* file configuring database without announcing team leader to overview and check before. This caused system a crash when others checkout from *dev* branch to implement their features or run database.
- The team members used incorrect table and field name in database causing the query for data to fail and breaking the corresponding API
- The team members was taking over another member's responsibilities, so the team leader needed to redistribute the workload.
- The team members forgot to provide *.env* file to the others, which cause system a crash due to lack of configuration information
- The team members oriented AI agent with inapporiate GUI, causing the confusing about API name and Variable name for that usecase.
## III. What can be done differently in next sprint to improve
- The team members need to strictly follow the coding regulations provided by team leader to ensure the source code is easy to maintain, extend and debug.
- Team members must notify the team leader to review the code or *SQL* file. Once approved, the team leader will merge the code into the *dev* branch or update the *SQL* file on Google Drive.
- The team members must proactively keep track the ERD drawn on *Draw.io* or use *DBeaver* to connect with database to get correct table and field names.
- The team members have to keep track assigned tasks on *Jira* to stay on top of their responsibilities.
- The team members are responsible for uploading *.env* file to group's communication tool or Google Drive when there are new configuration information.
- The team members must follow the Figma UI/UX design and feed these assets to the AI agent to have approriate orientation and context for coding functionality later.
## VI. What lessons we could learn
- The team members got familiar with some new technologies, which are Docker, PostgreSQL, React NextJs, ExpressJs, Vitest.
- The team members learned how to vibe code effectively by using SpecKit with AI agent (SDD - Specification Driven Development).
- The team members learned how to use Draw.io to map out feature workflows before diving into coding.
- Following strictly the coding regulations is also signicant because it prevents project bloating and eliminates redundant API calls, which would otherwise waste system resources.
- Awareness of importance in preparing base, which are ERD for database design, framework for coding, GUI on Figma for orienting usecase workflow and collaboration between team members, in the early stage. This preparation makes the team scale up easily and quickly when coming to implementation stage.
- SCRUM developing process helps the team leader get an overall view of all tasks assigned to the other members, enabling timely adjustments to ensure the team does not deviate from the initial objectives.
