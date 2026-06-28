# Feature Specification: Study Together - Study Group

**Feature Branch**: `feature/StudyGroup`

**Created**: 2026-06-26

**Status**: Draft

**Input**: User description: "Tôi muốn tạo một trang xem những học nhóm được tạo ra để kết nối cộng đồng thông qua nút 'STUDY TOGETHER' trên thanh điều hướng trên cùng. - @[specs/013-study-together-study-group] là folder chúng ta sẽ thực hiện trên. - Tham khảo thiết kế giao diện @[specs/013-study-together-study-group/study-together-study-group.txt] nhưng phải đồng bộ hóa với giao diện hiện tại. - Sử dụng mockdata cho phần hiển thị. - Tôi đã tạo folder cần thiết @[client/app/study-together] để code."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Study Groups (Priority: P1)

As a user, I want to access the "Study Together" page from the main navigation bar so that I can discover and view available study groups.

**Why this priority**: Discovering study groups is the core purpose of this feature and is required before any other interaction can take place.

**Independent Test**: Can be fully tested by clicking "STUDY TOGETHER" on the navbar and observing the rendered list of mock study groups.

**Acceptance Scenarios**:

1. **Given** the user is logged in and viewing any page, **When** they click "STUDY TOGETHER" in the top navigation bar, **Then** they are routed to `/study-together` and see a grid of study groups.
2. **Given** the user is on the Study Together page, **When** the page loads, **Then** it correctly displays study groups with their respective details (subject, title, description, leader, and occupancy status) based on mock data.

---

### User Story 2 - Filter and Sort Groups (Priority: P2)

As a user, I want to filter study groups by subject and sort them so that I can easily find groups that match my interests.

**Why this priority**: Enhances the user experience by allowing them to narrow down the list, which is essential if there are many groups.

**Independent Test**: Can be tested by interacting with the filter dropdowns and sort selectors and verifying the mock list updates accordingly.

**Acceptance Scenarios**:

1. **Given** the user is on the Study Together page, **When** they select a specific subject from the filter dropdown, **Then** only study groups matching that subject are displayed.
2. **Given** the user is on the Study Together page, **When** they change the sort order (e.g., "Newest First"), **Then** the list of groups is reordered instantly.

---

### User Story 3 - Join a Study Group (Priority: P3)

As a user, I want to click the "Join Group" button on an available study group so that I can participate in it.

**Why this priority**: This is the call-to-action for the page, though currently it may just be a mock interaction.

**Independent Test**: Can be tested by clicking the "Join Group" button on an available group card.

**Acceptance Scenarios**:

1. **Given** the user views an available study group (not full), **When** they click "Join Group", **Then** the system registers their intent to join.
2. **Given** the user views a full study group, **When** they look at the card, **Then** the button should display "Full" and be unclickable or visually disabled.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a "STUDY TOGETHER" link in the global top navigation bar pointing to `/study-together`.
- **FR-002**: System MUST display a responsive grid layout of study group cards.
- **FR-003**: System MUST populate the study group cards using frontend mock data.
- **FR-004**: System MUST allow users to filter the displayed study groups by subject.
- **FR-005**: System MUST allow users to sort study groups by predefined criteria (e.g., Relevance, Newest First).
- **FR-006**: System MUST visually distinguish between available groups and full groups (e.g., disabling the join action for full groups).
- **FR-007**: System MUST open a "Request to Join" modal when "Join Group" is clicked on an available group. The modal must include an optional message text area (max 100 characters), a Cancel button, and a Send button. The design will be based on the required functions of `join-group-layout.txt` but visually improved to adhere to the system's Atomic Design.

### Key Entities

- **StudyGroup**:
  - `id`: Unique identifier
  - `subject`: Category of the study group (e.g., "Computer Science", "Physics")
  - `title`: Name of the group (e.g., "Algorithms & Logic")
  - `description`: Brief detail about the group's activities
  - `leader`: Name/Initials of the group creator/leader
  - `time`: Time slot (e.g., "5:00 PM - 9:00 PM")
  - `address`: Location address
  - `room`: Room number or name
  - `currentMembers`: Number of users currently in the group
  - `maxMembers`: Maximum capacity of the group
  - `status`: Derived status ("Available" or "Full")

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The Study Together page loads and renders the mock data in under 1 second.
- **SC-002**: Filter and sort actions update the UI instantaneously without a full page reload.
- **SC-003**: All new UI components completely adhere to the Atomic Design system, support Light/Dark mode via Tailwind classes, and use i18n keys for text, avoiding any hardcoded strings.

## Assumptions

- Mock data will be defined as a static array within the frontend codebase (e.g., in a `data` folder or inside the component) and does not require a backend API for this feature scope.
- Filtering and sorting will be done client-side over the mock data array.
- The UI will be responsive across mobile, tablet, and desktop devices according to existing system patterns.
