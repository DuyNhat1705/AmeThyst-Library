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
    - [1. Test objectives and scope](#1-test-objectives-and-scope)
    - [2. Features to be tested](#2-features-to-be-tested)
    - [3. Test environment and tools](#3-test-environment-and-tools)
    - [4. Test schedule and responsibilities](#4-test-schedule-and-responsibilities)
    - [5. Entry and exit criteria](#5-entry-and-exit-criteria)
  - [II. Test Cases](#ii-test-cases)
    - [1. Use Case 1: Registration](#1-use-case-1-registration)
    - [2. Use Case 2: Email Verification](#2-use-case-2-email-verification)
    - [3. Use Case 3: Resend Verification](#3-use-case-3-resend-verification)
    - [4. Use Case 4: Google OAuth](#4-use-case-4-google-oauth)

## I. Test Plan

### 1. Test objectives and scope

The objective is to verify the functional behavior, security contracts, HTTP mappings, expiration boundaries, and transaction consistency of the `test_auth_register` Vitest project. The scope covers 12 automated test files and 27 cases across Passport strategy (configuration), service, controller, and API integration layers.

Production changes, unrelated authentication features, real external email delivery, and real Google OAuth network calls are outside this scope.

### 2. Features to be tested

- **Registration:** successful pending registration, password protection, anti-email-enumeration, expiration boundary, delivery consistency, controller mapping, and API contract.
- **Email Verification:** pending-user promotion, safe response shape, duplicate email handling, token expiration, session/cookie creation, and HTTP mapping.
- **Resend Verification:** token and TTL refresh, anti-email-enumeration, delivery consistency, request validation, and API contract.
- **Google OAuth:** first-time provisioning, returning users, password-account collision, session redirect, and sensitive-data protection.

### 3. Test environment and tools

- **Runtime:** Node.js project runtime.
- **Test framework:** Vitest.
- **API test utility:** Supertest-based integration testing.
- **Vitest project:** `test_auth_register`.
- **Working directory:** `src/server`.
- **Command:** `npm run test:auth:register`.
- **Isolation:** database, mailer, hashing, sessions, cookies, and OAuth behavior are mocked; no external database or network is required.

### 4. Test schedule and responsibilities

- **Test design and review:** before execution - Phan Lê Anh Minh.
- **Automated execution:** 2026-08-21 - Phan Lê Anh Minh.
- **Failure analysis and bug reporting:** after execution - Phan Lê Anh Minh.
- **Final review:** before PA5 submission - Phan Lê Anh Minh.

### 5. Entry and exit criteria

**Entry criteria**

- All 12 test files are discoverable by `test_auth_register`.
- Dependencies are installed and Vitest can start.
- External dependencies are isolated through mocks.
- Every test file contains 2-3 executable cases.

**Exit criteria**

- All 27 cases execute.
- Test IDs are unique and `@A_R1` through `@A_R10` remain represented.
- Pass/fail results are documented.
- Every failed case links to at least one bug report.
- Failures are not hidden by weakening or deleting assertions.

## II. Test Cases

### 1. Use Case 1: Registration

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Secure successful registration
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REG-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify hashing, pending persistence, verification delivery, and the generic registration response.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Registration</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid username, unused email, and valid plaintext password</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Mock no existing user or active pending registration.</li>
          <li>Call registerUser with valid details.</li>
          <li>Inspect hashing, persistence, transaction order, mailer call, and response.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The password is hashed and plaintext is not persisted; pending data is stored; verification mail is sent; a generic confirmation is returned.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Exact-boundary pending expiration
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REG-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify a pending registration expiring exactly at the current time is treated as expired.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Registration</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Pending record with expired_at equal to the current time</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Freeze time at the pending record's expired_at value.</li>
          <li>Call registerUser for the same email.</li>
          <li>Inspect pending-record cleanup and continuation.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The boundary record is deleted as expired and does not block the new registration.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Initial verification-delivery consistency
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REG-003</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify failed initial email delivery does not leave unusable committed pending data.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Registration</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid registration data; verification mailer rejects</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Allow registration database operations to succeed.</li>
          <li>Make verification email delivery fail.</li>
          <li>Inspect the final pending-registration state.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Failed delivery does not leave newly committed pending registration data.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller success mapping
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-REG-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify the controller delegates registration fields and maps success to HTTP 201.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Registration</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid registration request body</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke the registration controller.</li>
          <li>Inspect the arguments passed to the service.</li>
          <li>Inspect response status and body.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The service receives the body fields and the controller returns HTTP 201 with the generic confirmation.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller anti-enumeration mapping
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-REG-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify an existing account is not exposed through a distinct controller response.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Registration</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Existing email; service returns generic confirmation</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Submit registration for the existing email.</li>
          <li>Inspect the response status and body.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The controller returns HTTP 201 with the same generic confirmation and does not expose account existence.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Registration API success
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-REG-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify successful registration through the HTTP route.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Registration</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid unused email and registration fields</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>POST a valid registration request.</li>
          <li>Inspect the status and response body.</li>
          <li>Verify the mailer invocation.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The API returns HTTP 201 with the generic confirmation and sends a verification email.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Registration API existing-user privacy
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-REG-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify the API hides whether the submitted email already belongs to a user.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Registration</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Registration request using an existing user email</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>POST the registration request.</li>
          <li>Inspect the status and body.</li>
          <li>Inspect mailer calls.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The API returns HTTP 201 with the same generic confirmation and does not call the mailer.</td></tr>
  </tbody>
</table>

### 2. Use Case 2: Email Verification

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Promote pending user safely
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-VE-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify successful pending-user promotion, cleanup, and safe service payload.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Email Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid unexpired token for an unregistered pending email</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call the verification service.</li>
          <li>Inspect user insertion and pending deletion.</li>
          <li>Inspect the returned object.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The user is promoted, the pending record is deleted, and a safe { user, userRow } payload is returned without password_hash or a JWT response field.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Exact-boundary token expiration
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-VE-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify a token expiring exactly at the current time is rejected.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Email Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Pending token with expired_at equal to the current time</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Freeze time at the token's expired_at value.</li>
          <li>Call the verification service.</li>
          <li>Inspect whether user promotion occurs.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The token is expired; verification is rejected and no user is promoted.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Duplicate email during verification
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-VE-003</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify cleanup when the pending email was registered before token use.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Email Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid pending token whose email now exists in users</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call the verification service.</li>
          <li>Return an existing registered user for the email.</li>
          <li>Inspect cleanup and the thrown error.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The pending token is deleted, the service throws Email already exists., and no duplicate user is created.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller session response
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-VE-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify successful verification creates a session and safe HTTP body.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Email Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid token; service returns verified user</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke the verification controller.</li>
          <li>Inspect session creation and cookies.</li>
          <li>Inspect the HTTP response body.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The controller returns HTTP 200 with { user: session.user }, creates session/cookies, and exposes no token field.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller missing and expired mappings
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-VE-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify missing and expired tokens map to correct HTTP responses.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Email Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Request without token; expired-token service error</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke the controller without a token.</li>
          <li>Invoke it again with an expired-token error.</li>
          <li>Compare the response statuses.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">A missing token returns HTTP 400 and an expired token returns HTTP 410.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Verification API success
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-VE-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify successful email verification through the HTTP route.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Email Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid unexpired verification token</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>POST the token to the verification endpoint.</li>
          <li>Inspect the HTTP status and response body, and verify that <code>createAuthSession</code> is called.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The API calls <code>createAuthSession</code> and returns HTTP 200 with { user } and no JWT/token field in the body. This test does not assert <code>setAuthCookies</code>.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Verification API missing token
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-VE-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify the API returns the controller's missing-token error response.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Email Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Verification request without token</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>POST the request without a token.</li>
          <li>Inspect the HTTP status and exact response body.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The API returns HTTP 400 with <code>{ error: 'Verification token is required' }</code>.</td></tr>
  </tbody>
</table>

### 3. Use Case 3: Resend Verification

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Successful verification resend
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RV-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify token and TTL refresh, password-hash and username reuse, email delivery, and generic response.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Resend Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Email with an existing pending registration</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call the resend service.</li>
          <li>Inspect refreshed token and TTL.</li>
          <li>Inspect the reused password hash and username, mailer call, and response.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Token and TTL are refreshed, the existing password hash and username are reused, mail is sent, and a generic confirmation is returned.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: No-pending anti-enumeration
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RV-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify absence of a pending registration is hidden.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Resend Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Email with no pending registration</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call the resend service.</li>
          <li>Inspect persistence and mailer calls.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The generic confirmation is returned with no replacement or email side effect.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Failed resend-delivery consistency
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RV-003</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify the previous token remains usable if replacement email delivery fails.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Resend Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Existing pending token; replacement mailer rejects</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call the resend service for an existing pending registration.</li>
          <li>Configure the mailer to reject the replacement verification email.</li>
          <li>Verify that the previous token and TTL remain usable after the rejection, whether through delayed commit, rollback, or restoration.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The previous token and TTL remain unchanged and usable.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller normal and missing-email responses
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-RV-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify generic success passthrough and missing-email validation.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Resend Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid email; request without email</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Submit a valid request.</li>
          <li>Submit a request without email.</li>
          <li>Inspect both responses.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The valid request returns HTTP 200 with the generic body; missing email returns HTTP 400 with Email is required.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller infrastructure privacy
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-RV-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify unexpected resend-service failures are not exposed.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Resend Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Valid request; service throws</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke the resend controller.</li>
          <li>Make the service throw.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The controller returns HTTP 200 with the generic confirmation and no infrastructure details.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Resend API success
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-RV-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify successful resend through the HTTP route.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Resend Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Email with a pending registration</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>POST the resend request.</li>
          <li>Inspect transaction completion, mailer invocation, status, and body.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Replacement data commits, the mailer is called, and HTTP 200 returns the generic confirmation.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Resend API no-pending privacy
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-RV-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify the route hides absence of a pending registration.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Resend Verification</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Email with no pending registration</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>POST the resend request.</li>
          <li>Inspect status, body, and mailer calls.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 200 returns the same generic confirmation and the mailer is not called.</td></tr>
  </tbody>
</table>

### 4. Use Case 4: Google OAuth

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: First-time Google provisioning
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CFG-GA-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify first-time provisioning, profile mapping, and avatar fallback.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Google OAuth</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Google profile with email, name, and photo; repeat without photo</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Return no existing user.</li>
          <li>Invoke the callback with a photo and inspect insertion.</li>
          <li>Repeat without a photo.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">A user is created with mapped profile data; avatar uses the photo URL when present and null otherwise.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Returning user and account collision
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CFG-GA-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify returning Google users are reused and password-account collisions are refused safely.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Google OAuth</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Existing GOOGLE_AUTH user; existing password-based user</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke the callback for the Google user.</li>
          <li>Verify no insertion occurs.</li>
          <li>Invoke it for the password-account collision.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The existing Google user is returned; the password-account collision is refused without sensitive disclosure.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: OAuth controller session redirect
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-GA-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify the callback creates session/cookies and redirects without a query token.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Google OAuth</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Authenticated Google user</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke the Google callback controller.</li>
          <li>Inspect session creation and cookies.</li>
          <li>Inspect the redirect URL.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The controller redirects to CLIENT_URL/auth/callback using session authentication and no query token.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: OAuth redirect data protection
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-GA-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify credential-related fields never appear in the redirect URL.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Google OAuth</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">User object containing internal authentication fields</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke the Google callback controller.</li>
          <li>Inspect the complete redirect URL.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">The URL contains neither password_hash nor GOOGLE_AUTH.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: OAuth initiation API redirect
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-GA-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify the OAuth initiation endpoint redirects to Google.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Google OAuth</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">GET /auth/google</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send the GET request.</li>
          <li>Inspect the status and Location header.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 302 redirects to the Google OAuth authorization endpoint.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: OAuth callback API redirect
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-GA-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify a successful callback creates a session and redirects without exposing a token.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Google OAuth</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Successful authenticated callback</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Request the OAuth callback endpoint.</li>
          <li>Verify that <code>createAuthSession</code> is called and inspect the redirect URL.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;"><code>createAuthSession</code> is called, and HTTP 302 redirects to CLIENT_URL/auth/callback without <code>token=</code> in the URL. This test does not assert <code>setAuthCookies</code>.</td></tr>
  </tbody>
</table>
