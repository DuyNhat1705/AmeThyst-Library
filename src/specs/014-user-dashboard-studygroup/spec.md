# Feature Specification: User Dashboard - Your Study Groups

**Feature Branch**: `feature/user-dashboard-studygroup`

**Created**: 2026-06-26

**Status**: Draft

**Input**: User description: "Tôi muốn tạo một trang con trong trang dashboard để người có thể quản lý những nhóm học tập mà họ đã tham gia. Bao gồm mục Group I Created và Group I Joined, bỏ phần Manage Groups trong thiết kế giao diện. Một số lưu ý: - Làm việc trên folder @[specs/014-user-dashboard-studygroup] , @client\app\dashboard\user\yourstudygroups - Tham khảo bố trí giao diện @[specs/014-user-dashboard-studygroup/dashboard-StudyGroup-Created-layout.txt] cho Group I Created. - Tham khảo bố trí giao diện @[specs/014-user-dashboard-studygroup/dashboard-StudyGroup-Joined-layout.txt] cho Group I Joined. - Tái sử dụng cách hiểu thị study card và pop up khi nhấn vào của trang Study Group vừa thực hiện."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Joined Study Groups (Priority: P1)

As a user, I want to view a list of study groups I have joined in my dashboard so that I can keep track of my active learning sessions.

**Why this priority**: Managing joined groups is the primary value of this dashboard page for standard users.

**Independent Test**: Can be fully tested by navigating to `/dashboard/user/yourstudygroups` and verifying the "Group I Joined" section displays the correct mock study groups.

**Acceptance Scenarios**:

1. **Given** the user is viewing their "Your Study Groups" dashboard page, **When** they look at the "Group I Joined" section, **Then** they see a grid of Study Group Cards representing their joined groups.
2. **Given** the user clicks on a joined study group card, **When** the popup opens, **Then** it reuses the `StudyGroupInfoModal` to display full group details.

---

### User Story 2 - View Created Study Groups (Priority: P1)

As a user, I want to view a list of study groups I have created so that I can manage or review them.

**Why this priority**: Essential for users who organize study sessions to see their own creations.

**Independent Test**: Can be tested by navigating to `/dashboard/user/yourstudygroups` and verifying the "Group I Created" section.

**Acceptance Scenarios**:

1. **Given** the user is viewing their "Your Study Groups" dashboard page, **When** they look at the "Group I Created" section, **Then** they see a grid of Study Group Cards representing the groups they own.
2. **Given** the user clicks on a created study group card, **When** the popup opens, **Then** it reuses the `StudyGroupInfoModal` to display full group details.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a dashboard subpage at `/dashboard/user/yourstudygroups`.
- **FR-002**: System MUST display two main sections on this page: "Group I Joined" and "Group I Created".
- **FR-003**: System MUST NOT include the "Manage Groups" section from the original design layouts.
- **FR-004**: System MUST reuse the `StudyGroupCard` component to render the groups in both sections.
- **FR-005**: System MUST reuse the `StudyGroupInfoModal` component to display group details when any card is clicked.
- **FR-006**: System MUST use mock data to populate the lists of joined and created groups.

### Key Entities

- **StudyGroup** (Reused from `mockData.ts`):
  - `id`, `subject`, `title`, `description`, `leader`, `time`, `address`, `room`, `currentMembers`, `maxMembers`, `status`, `requirements`, `members`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The "Your Study Groups" dashboard page loads and renders the mock data in under 1 second.
- **SC-002**: UI layout accurately reflects the structural requirements of the provided text layouts while omitting the "Manage Groups" section.
- **SC-003**: 100% component reuse achieved for `StudyGroupCard` and `StudyGroupInfoModal` without duplicating their source code.

## Assumptions

- Mock data for "joined" and "created" groups can be derived from the existing `mockData.ts` or explicitly defined as subsets of it.
- The dashboard layout wrapper (sidebar, header, etc.) already exists or is out of scope for this specific subpage implementation.
- Filtering and pagination are not explicitly required for this dashboard view unless there are many groups (assumed simple grid view for now).
