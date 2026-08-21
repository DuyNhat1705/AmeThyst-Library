# Test Plan and Test Cases

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026

Performed by: Phan Lê Anh Minh | Reviewed by: Vũ Duy Nhất | Edited by: Phan Lê Anh Minh


## Table of Contents

- [Test Plan and Test Cases](#test-plan-and-test-cases)
  - [Table of Contents](#table-of-contents)
  - [I. Test Plan](#i-test-plan)
    - [1. Objectives and scope](#1-objectives-and-scope)
    - [2. Feature and traceability coverage](#2-feature-and-traceability-coverage)
    - [3. Environment and responsibilities](#3-environment-and-responsibilities)
    - [4. Lecturer-feedback traceability fields](#4-lecturer-feedback-traceability-fields)
    - [5. Entry and exit criteria](#5-entry-and-exit-criteria)
  - [II. Test Cases](#ii-test-cases)
    - [1. Registration](#1-registration)
    - [2. Email Verification](#2-email-verification)
    - [3. Resend Verification](#3-resend-verification)
    - [4. Google OAuth](#4-google-oauth)

## I. Test Plan

### 1. Objectives and scope

The `test_auth_register` Vitest project covers four authentication features—Registration, Email Verification, Resend Verification, and Google OAuth—through 12 configured test files and 40 independently executable test cases. The current revision expands the earlier 27-case Spec Kit baseline so that compound scenarios are split where necessary and lecturer-requested feature coverage is explicit. Database, hashing, mail, session, cookie, and Passport behavior are isolated through mocks; no real external service is contacted.

### 2. Feature and traceability coverage

| Feature | Test Cases | Spec Kit Created: Yes | Added/Split After Baseline | Reviewed: Yes | Pending Review | Expected Result Adjusted |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Registration | 10 | 7 | 3 | 10 | 0 | 3 |
| Email Verification | 10 | 7 | 3 | 10 | 0 | 4 |
| Resend Verification | 10 | 7 | 3 | 10 | 0 | 4 |
| Google OAuth | 10 | 6 | 4 | 10 | 0 | 2 |
| **Total** | **40** | **27** | **13** | **40** | **0** | **13** |

The 27 `Spec Kit Created: Yes` cases correspond to the Feature 022 Spec Kit baseline. The remaining 13 cases were introduced or split into independent executable cases during the lecturer-feedback revision. All 40 current cases have been reviewed by Phan Lê Anh Minh; Spec Kit provenance remains recorded separately.

### 3. Environment and responsibilities

- **Runtime/framework:** Node.js, Vitest 4.1.10, Express 5.2.1, and Supertest.
- **Working directory/command:** `src/server`; `npm run test:auth:register`.
- **Spec Kit baseline:** Feature 022 authentication-registration test-suite reduction, 27 cases.
- **Test design and lecturer-feedback revision:** Phan Lê Anh Minh.
- **Test-case reviewer:** Phan Lê Anh Minh.
- **Automated execution and failure analysis:** Phan Lê Anh Minh, 2026-08-21.
- **Revision review status:** all 40 current test cases are marked `Reviewed: Yes` by Phan Lê Anh Minh.

### 4. Lecturer-feedback traceability fields

Every test case below contains the following explicit fields:

- **Spec Kit Created (Yes/No):** whether the independently executable Test Case ID comes directly from the Feature 022 Spec Kit baseline.
- **Reviewed (Yes/No):** whether the current test case has documented review evidence; all current cases are reviewed.
- **Reviewed By:** Phan Lê Anh Minh for every current test case.
- **Adjust Expected Result:** the original expected behavior and the revised expected behavior when a real correction occurred; otherwise `None`.
- **Adjust Reason:** why the expected result was changed. New cases do not invent a previous expected result.

This distinction is intentionally conservative: provenance, review, and expected-result correction are recorded separately rather than treating all revised tests as Spec Kit generated or reviewed.

### 5. Entry and exit criteria

**Entry criteria**

- All 12 configured test files are discoverable.
- All 40 Test Case IDs in this document exist in the current test bundle.
- External dependencies are isolated appropriately for automated testing.

**Exit criteria**

- Exactly 40 independently executable tests are represented: 10 per feature.
- Every `it(...)` has one Test Case ID and one primary scenario.
- Test Cases and Test Execution Report use the same 40 IDs.
- Every failed test links to an applicable root-cause bug.
- Failures remain visible; assertions are not weakened or removed to force a pass.

## II. Test Cases

Each case uses the lecturer-requested template. `Adjust Expected Result` records only a genuine historical change; `None` means no supported change is recorded.

### 1. Registration

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Secure successful registration</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-REG-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Secure successful registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid unused email, username, and plaintext password.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Call registerUser ; inspect hashing, pending persistence, transaction-before-mail order, mail arguments, and response.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Password is hashed, plaintext is not persisted, pending data is committed, verification mail is sent, and the generic confirmation is returned.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Exact pending-expiration boundary</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-REG-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Exact pending-expiration boundary.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Pending row whose expired_at equals the frozen current time.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Freeze time; call registerUser ; inspect deletion and continuation.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The row is expired at equality, is deleted, and does not block a fresh registration.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: equality was accepted as active. Revised: equality is expired.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Aligns with the current now &gt;= expired_at lifecycle and avoids accepting a zero-lifetime record.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Initial mail-delivery consistency</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-REG-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Initial mail-delivery consistency.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid registration; mailer rejects after pending persistence.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Model persisted pending state; invoke the service; reject delivery; inspect final state.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The typed delivery error is returned and no newly committed unusable pending registration remains.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Controller success mapping</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-REG-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Controller success mapping.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid request body and successful service result.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke register ; inspect service arguments, status, and body.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The controller delegates all fields and returns HTTP 201 with the generic confirmation.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Controller anti-email-enumeration mapping</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-REG-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Controller anti-email-enumeration mapping.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Existing email hidden by the service's generic result.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke the controller and inspect status/body.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 201 and the same generic message are returned; account existence is not disclosed.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: duplicate email produced a distinct conflict response. Revised: duplicate and unused emails share the generic 201 response.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Enforces the approved anti-email-enumeration requirement.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Registration API success</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-REG-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Registration API success.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid unused registration body.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">POST /auth/register ; inspect status/body, transaction, and mail call.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 201 returns the generic confirmation after pending persistence and delivery request.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Existing-user privacy at the API</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-REG-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Existing-user privacy at the API.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid body using an existing user's email.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">POST registration; inspect response and mailer calls.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 201 returns the generic confirmation and no email is sent.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: duplicate email produced HTTP 409. Revised: it produces the same generic HTTP 201 response.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Prevents email-address enumeration through the HTTP contract.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Active pending-registration handling</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-REG-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Active pending-registration handling.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid request for an email with an unexpired pending row.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">POST registration; inspect response, database connection, and mailer.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 201 returns the generic message without replacing the active row or sending another message.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; this is a newly added boundary scenario.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Registration request validation</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-REG-004</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Registration request validation.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Malformed email, weak password, and empty username.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">POST the invalid body; inspect validation response and side effects.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 400 returns VALIDATION_ERROR ; no persistence, hashing, or mail occurs.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; this is a newly added validation scenario.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Retry after failed initial delivery</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-REG-005</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Retry after failed initial delivery.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">First mail attempt rejects; immediate retry uses the same valid body.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Model committed pending state; POST twice; inspect both responses, delivery count, and token replacement.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">First request returns 502; retry creates a fresh pending token and performs a second delivery attempt instead of being blocked by stale state.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; this is a new regression objective for BUG-AUTH-02.</td></tr>
</tbody></table>


### 2. Email Verification

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Successful pending-user promotion</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-VE-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Successful pending-user promotion.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Email Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid unexpired token for an unregistered pending email.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Call verifyEmail ; inspect insertion, token deletion, and payload.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Promotion and deletion occur atomically; the safe { user, userRow } result contains no password hash or JWT field.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: service returned a signed JWT with the user. Revised: service returns user data for controller-managed cookie-session creation and no JWT response field.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Aligns with the approved session-based authentication design and protects bearer credentials.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Exact verification-token expiration boundary</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-VE-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Exact verification-token expiration boundary.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Email Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Token whose expired_at equals current time.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Freeze time; verify; inspect cleanup and promotion calls.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Verification is rejected, the expired row is deleted, and no user is promoted.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: equality remained valid. Revised: equality is expired.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Aligns boundary semantics with now &gt;= expired_at and the approved TTL interpretation.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Duplicate email during verification</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-VE-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Duplicate email during verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Email Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid pending token whose email now exists in users.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Call service; return an existing user; inspect cleanup and insertion calls.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The pending token is deleted, Email already exists. is thrown, and no duplicate user is inserted.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Controller session mapping</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-VE-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Controller session mapping.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Email Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid token and verified user result.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke handler; inspect session creation, cookies, status, and body.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 200 returns only { user: session.user } after session cookies are set.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: response exposed a JWT. Revised: protected cookies carry the session and the body contains only the user.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Session-based authentication replaced browser-readable bearer-token responses.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Missing-token controller response</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-VE-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Missing-token controller response.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Email Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Request body without token.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke handler; inspect service calls, status, and body.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 400 returns Verification token is required and the service is not called.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; the compound case was narrowed to one scenario.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Expired-token controller response</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-VE-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Expired-token controller response.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Email Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Service expiration error.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke handler with a token; make service reject as expired; inspect response.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 410 returns the expiration message.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No — split from a Feature 022 compound case.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; only executable independence changed.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Verification API success</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-VE-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verification API success.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Email Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid unexpired token and pending row.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">POST verification; inspect transaction, session creation, status, and body.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 200 returns the session user without a token field and promotion commits.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: API returned { token, user } . Revised: API creates a protected-cookie session and returns { user } only.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Aligns the expected result with the approved session architecture and prevents token exposure.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Missing-token API request</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-VE-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Missing-token API request.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Email Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Empty JSON body.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">POST verification; inspect status/body and session calls.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 400 returns the required-token error and no session is created.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Non-existent token rejection</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-VE-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Non-existent token rejection.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Email Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Unknown token.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">POST token with no matching row; inspect status/body and session calls.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 400 returns Invalid or expired verification link. ; no session is created.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; this is a newly added negative scenario.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Successful token cannot be reused</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-VE-004</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Successful token cannot be reused.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Email Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Same valid token submitted twice.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Model deletion on first promotion; POST twice; inspect statuses and session count.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">First request succeeds; second returns HTTP 400; exactly one session is created.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; this is a newly added replay-prevention scenario.</td></tr>
</tbody></table>


### 3. Resend Verification

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Successful resend</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-RV-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Successful resend.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Resend Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Existing pending registration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Call service; inspect reused credentials, new token/TTL, ordering, mail, and response.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">A new token and later TTL commit, existing hash/name are reused, mail is sent, and the generic response returns.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: No-pending anti-enumeration</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-RV-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">No-pending anti-enumeration.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Resend Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Email with no pending row.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Call service; inspect response and side effects.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The same generic response returns without replacement or mail.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: absence produced a distinct error. Revised: absence returns the generic confirmation.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Enforces anti-email-enumeration for pending registrations.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Service-level pre-delivery consistency</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-SRV-RV-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Service-level pre-delivery consistency.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Resend Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Active old token/TTL; replacement mail rejects.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Model real replacement/restoration semantics; capture stored state when mail delivery starts; inspect final state after rejection.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The old token/TTL remain committed until delivery succeeds and remain unchanged after failure.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: restoring the old token after delivery failure was sufficient. Revised: the old token/TTL must remain committed until replacement delivery succeeds.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Post-failure compensation leaves an observable invalid-token window; the transaction-consistency requirement promises continued usability, not only eventual restoration.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Controller successful response</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-RV-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Controller successful response.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Resend Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid email and successful generic service result.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke controller; inspect delegation, status, and body.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 200 returns the generic confirmation.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; the compound case was narrowed to one scenario.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Unexpected-infrastructure privacy</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-RV-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Unexpected-infrastructure privacy.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Resend Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid request; untyped service exception.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke controller; make service throw; inspect response.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 200 returns the generic response without infrastructure details.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: unexpected failure returned HTTP 500 with error details. Revised: untyped failures return the generic HTTP 200 response.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Preserves the approved privacy contract; typed delivery failure remains separately mapped to HTTP 502.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Missing-email validation</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-RV-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Missing-email validation.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Resend Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Request body without email.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke controller; inspect service calls and response.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 400 returns Email is required and service is not called.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No — split from a Feature 022 compound case.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; only executable independence changed.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Resend API success</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-RV-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Resend API success.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Resend Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Pending registration email.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">POST resend; inspect inserted values, transaction, mail call, status, and body.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Replacement data commits, mail is requested, and HTTP 200 returns the generic response.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: No-pending privacy at the API</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-RV-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">No-pending privacy at the API.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Resend Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid email without pending row.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">POST resend; inspect response and mail calls.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 200 returns the generic confirmation and no email is sent.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: no row returned HTTP 400. Revised: it returns generic HTTP 200.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Prevents enumeration of pending registrations.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: HTTP-level pre-delivery state consistency</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-RV-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">HTTP-level pre-delivery state consistency.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Resend Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Active old token/TTL and a mailer that rejects.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">POST resend with stateful database mocks; capture persisted state at the mail boundary and after the 502 response.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The old token/TTL remain committed throughout; the request returns 502 and final state is unchanged.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; this is a new API-level regression objective for BUG-AUTH-04.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Old token remains verifiable during a failed resend</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-RV-004</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Old token remains verifiable during a failed resend.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Resend Verification.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Active old token; replacement delivery held pending and then rejected.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Start resend; while mail is unresolved, POST old token to verification; reject mail; inspect both responses and restored state.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The old token verifies successfully while resend is pending; resend returns 502 and restores/retains the old state.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; this is a new cross-endpoint regression objective for BUG-AUTH-05.</td></tr>
</tbody></table>


### 4. Google OAuth

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: First-time provisioning with avatar</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CFG-GA-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">First-time provisioning with avatar.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Google OAuth.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Verified Google email, display name, and photo.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Return no user; invoke verify callback; inspect lookup, insert mapping, and done .</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">A GOOGLE_AUTH user with default user role and supplied avatar is returned.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; the compound case was narrowed.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Returning Google user</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CFG-GA-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Returning Google user.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Google OAuth.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Existing user with password_hash = GOOGLE_AUTH .</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke callback; inspect query count, absence of insert, and done .</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Existing user is returned without duplicate insertion.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; the compound case was narrowed.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: First-time provisioning without avatar</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CFG-GA-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">First-time provisioning without avatar.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Google OAuth.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Verified email and display name with no photos.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Return no user; invoke callback; inspect insertion and done .</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">A GOOGLE_AUTH user is inserted with avatar = null .</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No — split from the first Feature 022 compound provisioning case.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; only executable independence changed.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Password-account collision</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CFG-GA-004</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Password-account collision.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Google OAuth.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Existing user with bcrypt password hash.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke callback; inspect query count and refusal result.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Authentication is refused with account_exists_with_password and no insert occurs.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No — split from the second Feature 022 compound Google-user case.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; only executable independence changed.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Verified-email requirement</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CFG-GA-005</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verified-email requirement.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Google OAuth.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Profile containing only an explicitly unverified email.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke callback; inspect database calls and refusal result.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Authentication is refused with verified_email_required before any database query.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; this is a newly added security scenario.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: OAuth controller session redirect</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-GA-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">OAuth controller session redirect.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Google OAuth.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Authenticated Google user.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke callback handler; inspect session, cookies, redirect, and next .</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Session cookies are set and redirect targets CLIENT_URL/auth/callback without a query token.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: controller signed a JWT and placed token/user in the URL. Revised: it creates a cookie session and uses a clean callback URL.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Prevents sensitive query-string exposure and aligns with session authentication.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: OAuth redirect sensitive-data protection</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-CTL-GA-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">OAuth redirect sensitive-data protection.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Google OAuth.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">User object containing internal authentication fields.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Invoke callback; inspect complete redirect URL.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">URL contains neither password_hash nor GOOGLE_AUTH .</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: OAuth initiation redirect</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-GA-001</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">OAuth initiation redirect.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Google OAuth.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">GET /auth/google .</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">Send request; inspect status and Location.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 302 redirects to Google's authorization endpoint.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Successful OAuth callback</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-GA-002</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Successful OAuth callback.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Google OAuth.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Successful mocked Passport callback.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">GET callback; inspect session call and Location.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 302 redirects to the clean client callback and a session is created; no token is in the URL.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">Original: callback redirected with JWT and serialized user query parameters. Revised: callback creates a cookie session and redirects without credentials.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">Aligns with the secure session-based callback contract.</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Refused OAuth callback redirect</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-INT-GA-003</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Refused OAuth callback redirect.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case / Feature</td><td style="vertical-align: top;">Google OAuth.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Passport refusal for a password-account collision.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;">GET callback; inspect redirect and session calls.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 302 redirects to client login and no session is created.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Spec Kit Created</td><td style="vertical-align: top;">No.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed</td><td style="vertical-align: top;">Yes.</td></tr>
<tr><td style="background-color: #eef2ff; font-weight: bold; vertical-align: top;">Reviewed By</td><td style="vertical-align: top;">Phan Lê Anh Minh.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Expected Result</td><td style="vertical-align: top;">None.</td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Adjust Reason</td><td style="vertical-align: top;">N/A; this is a newly added failure-path scenario.</td></tr>
</tbody></table>
