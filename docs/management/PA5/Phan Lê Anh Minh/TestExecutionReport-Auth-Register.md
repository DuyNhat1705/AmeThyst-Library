# Test Execution Report

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026

Performed by: Phan Lê Anh Minh | Reviewed by: Vũ Duy Nhất | Edited by: Phan Lê Anh Minh


## Table of Contents

- [Test Execution Report](#test-execution-report)
  - [Table of Contents](#table-of-contents)
  - [I. Test Execution Overview](#i-test-execution-overview)
    - [1. Recorded execution](#1-recorded-execution)
    - [2. Feature execution summary](#2-feature-execution-summary)
    - [3. Provenance and review snapshot](#3-provenance-and-review-snapshot)
  - [II. Execution Results](#ii-execution-results)
    - [1. Registration](#1-registration)
    - [2. Email Verification](#2-email-verification)
    - [3. Resend Verification](#3-resend-verification)
    - [4. Google OAuth](#4-google-oauth)
  - [III. Recorded Vitest Summary](#iii-recorded-vitest-summary)

## I. Test Execution Overview

### 1. Recorded execution

The controlled `test_auth_register` project was executed from `src/server` on 2026-08-21 using:

```bash
npm run test:auth:register
```

Vitest 4.1.10 discovered all 12 configured files and executed 40 tests. Database, mailer, hashing, session, cookie, and Passport behavior were mocked; no real external service was contacted. Stateful persistence mocks were used for consistency scenarios. The figures below are the recorded execution evidence supplied with this report; this documentation revision does not claim a new test run.

- **Execution date:** 2026-08-21
- **Test files:** 12 (`4 failed | 8 passed`)
- **Tests:** 40 (`5 failed | 35 passed`)
- **Duration:** 1.73 s

### 2. Feature execution summary

| Feature | Test Cases | Passed | Failed | Linked Bugs |
| --- | ---: | ---: | ---: | --- |
| Registration | 10 | 8 | 2 | BUG-AUTH-01; BUG-AUTH-02 |
| Email Verification | 10 | 10 | 0 | None |
| Resend Verification | 10 | 7 | 3 | BUG-AUTH-03; BUG-AUTH-04; BUG-AUTH-05 |
| Google OAuth | 10 | 10 | 0 | None |
| **Total** | **40** | **35** | **5** | **5 bug reports** |

### 3. Provenance and review snapshot

| Feature | Spec Kit Created: Yes | Added/Split After Baseline | Reviewed: Yes | Pending Review | Expected Result Adjusted |
| --- | ---: | ---: | ---: | ---: | ---: |
| Registration | 7 | 3 | 10 | 0 | 3 |
| Email Verification | 7 | 3 | 10 | 0 | 4 |
| Resend Verification | 7 | 3 | 10 | 0 | 4 |
| Google OAuth | 6 | 4 | 10 | 0 | 2 |
| **Total** | **27** | **13** | **40** | **0** | **13** |

The detailed original-versus-revised Expected Result text and its rationale are maintained in `TestCases-Auth-Register.md`. This report carries the provenance/review flags into execution evidence so the lecturer can trace a result back to the current case definition without assuming every revised case came from Spec Kit. All 40 current cases are reviewed by Phan Lê Anh Minh.

## II. Execution Results

Each table represents one independently executed Test Case ID. `Adjusted?` means the documented Expected Result was historically revised; it does not indicate whether the test passed.

### 1. Registration

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-REG-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">Password hashing, pending persistence, transaction ordering, mail invocation, and generic response matched expectations.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-REG-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">A pending row expiring exactly at current time was deleted and registration continued.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-REG-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #fee2e2; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Fail</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The service returned the typed delivery error, but the newly inserted pending row remained committed after mail failure.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">BUG-AUTH-01</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-REG-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The controller delegated request fields and returned HTTP 201 with the generic message.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-REG-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The controller exposed no distinction for an existing account.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-REG-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The API committed pending data, requested delivery, and returned generic HTTP 201.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-REG-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">An existing-user request returned the generic HTTP 201 response without sending mail.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-REG-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">An active pending registration was hidden behind the generic response and was neither replaced nor re-mailed.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-REG-004</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">Invalid email/password/username input returned HTTP 400 VALIDATION_ERROR before persistence.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-REG-005</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #fee2e2; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Fail</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The first request returned 502, but its active pending row blocked the retry; the mailer ran once instead of twice and no fresh token was issued.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">BUG-AUTH-02</td></tr>
</tbody></table>

### 2. Email Verification

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-VE-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">Pending promotion and token deletion completed atomically and returned a safe non-JWT payload.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-VE-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The exact-boundary token was rejected as expired, deleted, and did not promote a user.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-VE-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">A duplicate registered email caused pending-token cleanup and no duplicate insertion.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-VE-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The handler created a session, set cookies, and returned HTTP 200 with user only.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-VE-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">A missing token returned HTTP 400 without calling the service.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-VE-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The expiration error mapped independently to HTTP 410.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-VE-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The API promoted the user, created a session, and returned user data without a token field.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-VE-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">An empty request returned HTTP 400 with the required-token error.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-VE-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">A non-existent token returned HTTP 400 and did not create a session.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-VE-004</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The first verification succeeded; reuse of the consumed token returned HTTP 400 and no second session was created.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

### 3. Resend Verification

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-RV-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">Token/TTL refreshed, stored credentials were reused, mail was sent, and the generic response returned.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-RV-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The no-pending branch returned the generic result without persistence or mail.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-RV-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #fee2e2; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Fail</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The final compensation restored the old values, but the mailer observed the replacement token already committed before delivery succeeded.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">BUG-AUTH-03</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-RV-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">A valid request returned generic HTTP 200.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-RV-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">An unexpected untyped service failure was hidden behind generic HTTP 200.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-RV-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">A missing email returned HTTP 400 without service invocation.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-RV-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The route committed a new token/TTL, invoked mail, and returned generic HTTP 200.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-RV-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">No pending row returned the same generic HTTP 200 response without mail.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-RV-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #fee2e2; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Fail</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The request eventually returned 502 and restored old state, but the persisted token at the delivery boundary was already the undelivered replacement.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">BUG-AUTH-04</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-RV-004</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #fee2e2; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Fail</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">While the replacement delivery was pending and later failed, verification with the previously valid token returned HTTP 400 instead of 200.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">BUG-AUTH-05</td></tr>
</tbody></table>

### 4. Google OAuth

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CFG-GA-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">A first-time Google user was inserted with mapped email, name, avatar, provider marker, and role.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CFG-GA-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">An existing Google user was returned without insertion.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CFG-GA-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">A first-time profile without photos was inserted with a null avatar.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CFG-GA-004</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">A password-account collision was refused with the expected Passport information result.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CFG-GA-005</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">A profile without a verified email was refused before database access.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-GA-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The callback created session/cookies and redirected to the clean client callback URL.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-GA-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The redirect exposed neither password_hash nor GOOGLE_AUTH.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-GA-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">GET /auth/google returned HTTP 302 to Google's authorization endpoint.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-GA-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The successful callback created a session and redirected without a query token.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution Record</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-GA-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-21</td></tr>
<tr><td style="background-color: #dcfce7; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result Adjusted</td><td style="vertical-align: top;">No</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">A refused authentication redirected to client login and created no session.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Bug</td><td style="vertical-align: top;">None</td></tr>
</tbody></table>

## III. Recorded Vitest Summary

```text
Test Files  4 failed | 8 passed (12)
Tests       5 failed | 35 passed (40)
Duration    1.73s
```

The five failed test cases are intentionally preserved as execution evidence and each maps to its own sequential bug report in `BugReport-Auth-Register.md`.
