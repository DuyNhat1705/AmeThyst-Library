# Implementation Tasks: Forgot Password Page & Global Navigation Update

**Feature**: Forgot Password Page & Global Navigation Update
**Branch**: `004-forgot-password-page`

## Implementation Strategy
This feature will be implemented in phases: Setup, Foundational (removing navigation), User Story 1 (Forgot Password Page), and Polish. The goal is to first establish the minimalist interface by removing navigation, followed by the focused Forgot Password implementation.

## Dependencies & Order
- Global Navigation Removal (Foundational) MUST be completed before Forgot Password Page (US1).
- US1 (Forgot Password) can be tested independently after implementation.

## Phase 1: Setup
- [X] T001 Initialize feature-specific directories and files structure

## Phase 2: Foundational (Global Navigation Removal)
- [X] T002 [P] Remove `NavBar` component reference from `client/app/layout.js` (or applicable layout)
- [X] T003 [P] Ensure `client/app/login/page.js` renders without navigation bar
- [X] T004 [P] Ensure `client/app/register/page.js` renders without navigation bar
- [X] T005 [P] Ensure `client/app/library/page.js` renders without navigation bar
- [X] T006 [P] Ensure root `client/app/page.js` (Home) renders without navigation bar

## Phase 3: User Story 1 - Request Password Reset (Priority: P1)
- [X] T007 [US1] Create `ForgotPasswordCard.tsx` component in `client/components/library/ForgotPasswordCard.tsx` per design specs
- [X] T008 [US1] Create `/forgot-password` page route in `client/app/forgot-password/page.js`
- [X] T009 [US1] Implement form validation for email input in `ForgotPasswordCard.tsx`
- [X] T010 [US1] Implement "Send Reset Link" button handling in `ForgotPasswordCard.tsx`
- [X] T011 [US1] Implement "Back to Sign In" navigation logic to `/login`
- [X] T012 [US1] Ensure responsiveness of Forgot Password page per `fw_specify.md`

## Phase 4: Polish & Cross-Cutting Concerns
- [X] T013 Verify global removal of navigation bars across all authenticated and auth pages
- [X] T014 Run quickstart validation scenarios defined in `quickstart.md`
- [X] T015 Final visual check against design specs in `design/fw_specify.md`
