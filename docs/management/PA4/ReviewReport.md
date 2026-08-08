# Review Report

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA4-2026

Performed by: Vũ Duy Nhất | Reviewed by: All Other Members | Edited by: Vũ Duy Nhất

## I. What went well

- We have C4 diagrams at 3 levels of abstraction (System Context, Container, and Component) that provide a much clearer understanding of the overall system architecture. The detailed descriptions of each component in the diagrams also contribute to clarifying how they interact and operate.
- The product is essentially complete and ready to enter the testing and deployment phase, covering 9 functional groups:
  - Authentication
  - Profile Management
  - Searching & Filtering
  - Borrowing & Reserving
  - Librarian Administration
  - Admin Administration
  - AI Recommendation
  - Study Group
  - Library Map
- The product was built entirely using free AI agents — Antigravity, Opencode, and Gemini CLI — demonstrating an effective AI-assisted development workflow.

## II. Problems

- Drawing C4 diagrams using Mermaid code was quite challenging to fine-tune and adjust, as the layout and positioning of elements are not easily controlled through script alone.
- Multiple members encountered difficulty understanding the scope and boundaries of each C4 diagram level, requiring collective review sessions to align on a shared interpretation.
- Some members needed additional database changes (new fields and tables) discovered during late-stage feature implementation, which introduced unexpected integration overhead.
- Unit testing was an unfamiliar practice for some members at the start, leading to slower initial progress on that front.

## III. What can be done differently in next sprint to improve

- Consider using diagramming tools with visual editors (e.g., draw.io or Structurizr) alongside or instead of Mermaid code to speed up the creation and refinement of C4 diagrams.
- Establish a shared understanding of architecture diagrams and testing practices earlier in the sprint through a brief onboarding or knowledge-sharing session for all members.
- Identify database schema changes and new requirements at the beginning of the sprint rather than during implementation, to minimize late-stage rework and integration conflicts.
- Assign a dedicated peer reviewer for each major document (diagrams, specifications) before final submission to catch inconsistencies early.

## IV. What lessons we could learn

- Clear architectural documentation (such as C4 diagrams) is invaluable not just for external stakeholders but also for the development team itself — it helps maintain a shared mental model of the system and reduces miscommunication.
- AI-assisted development with tools like Antigravity, Opencode, and Gemini CLI can significantly accelerate implementation, but the team must still maintain strong code review practices to ensure quality and consistency.
- While our develop-first approach works well for rapid feature delivery, unit testing should still be given dedicated time and planning within the sprint — not squeezed in at the very end. Allocating a clear testing phase after implementation, with defined test case goals, helps ensure meaningful coverage rather than rushed, minimal tests.
