# Bug Report

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026
    Version: 1.4

Performed by: All Members | Reviewed by: All Members | Edited by: Vũ Duy Nhất

---
## Revision History
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 14/08/2026 | 1.0 | Template for Test Case | Nguyễn Lê Hoàng Khải |
| 15/08/2026 | 1.1 | Test Case Description for Create Study Group | Nguyễn Lê Hoàng Khải |
| 15/08/2026 | 1.2 | Test Case Description for Register, Google OAuth, Verify Email, Resend Verification | Phan Lê Anh Minh |
| 16/08/2026 | 1.3 | Test Case Description for Reserve Book and Verify PIN | Nguyễn Nhựt Huy |
| 16/08/2026 | 1.4 | Update more test cases for Create Study Group | Nguyễn Lê Hoàng Khải |

## Table of Contents

## I. Test Summary
Execution covered the full set of **107 test cases** defined in the **Test Plan and Test Cases** document, spanning the Middleware, API/Integration, Controller, and Service layers across all seven implemented features (Register, Google OAuth, Resend Verification, Verify Email, Reserve Book, Verify PIN, Create Study Group). Testing combined the automated Vitest suite (`npm test` / feature-specific scripts, from `src/server`) with mocked PostgreSQL, mail, and session dependencies, cross-checked by manual functional testing through the web client and API. Execution ran between **2026-08-13** and **2026-08-16**.

On the initial runs, **98 of 107 test cases passed and 9 failed**, and 9 defects were logged in the Bug Report (BUG-01 → BUG-05 for Reserve Book / Verify PIN, BUG-AUTH-01 → BUG-AUTH-04 for Register). The 5 Reserve Book / Verify PIN failures were fixed and re-verified in a full regression run on **2026-08-16**, which passed 50/50 for that feature set. The 4 Register-related failures (BUG-AUTH-01 → BUG-AUTH-04) remain **open** as of this version and are still marked **Fail** below.

**Overall statistics:**

| Metric | Count |
| :--- | :--- |
| Number feature tested | 7 |
| Total test cases executed | 107 |
| Passed | 98 |
| Failed | 9 |
| Pass rate | 91.6% |


**Results by feature:**

| Feature | Test Cases | Passed | Failed | Execution Date(s) |
| :--- | :---: | :---: | :---: | :--- |
| Register | 7 | 4 | 3 | 2026-08-14 |
| Google OAuth | 6 | 6 | 0 | 2026-08-14 |
| Resend Verification | 7 | 6 | 1 | 2026-08-14 |
| Verify Email | 7 | 7 | 0 | 2026-08-14 |
| Reserve Book | 10 | 8 | 2 | 2026-08-13 – 2026-08-16 |
| Verify PIN | 40 | 37 | 3 | 2026-08-13 – 2026-08-16 |
| Create Study Group | 30 | 30 | 0 | 2026-08-16 |
| **Total** | **107** | **98** | **9** | **2026-08-13 – 2026-08-16** |


## II. Bug Reports in First Testing
### 2.1 Register
### 2.2 Resend Verification
### 2.3 Resend Verification