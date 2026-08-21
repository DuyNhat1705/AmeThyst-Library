# Test Plan and Test Cases

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026

Performed by: Nguyễn Lê Hoàng Khải | Reviewed by: Vũ Duy Nhất | Edited by: All members

## Table of Contents

- [I. Test Plan](#i-test-plan)
  - [1. Test objectives and scope](#1-test-objectives-and-scope)
  - [2. Features to be tested](#2-features-to-be-tested)
  - [3. Test environment and tools](#3-test-environment-and-tools)
  - [4. Test schedule and responsibilities](#4-test-schedule-and-responsibilities)
  - [5. Entry and exit criteria](#5-entry-and-exit-criteria)
- [II. Test Cases](#ii-test-cases)
  - [1. Use Case 1: Create Study Group](#1-use-case-1-create-study-group)

## I. Test Plan

### 1. Test objectives and scope
The objective of this test plan is to verify the functional correctness of the Create Study Group module across all tested layers (Middleware, API/Integration, Controller, and Service). The scope includes validating positive workflows, authorization, input normalization/validation, error handling, capacity constraints, and transactional atomicity.

Test case IDs use `TC-<SCOPE>-CSG-<SEQUENCE>`, where `TC` means Test Case, `CSG` means Create Study Group, and the scope is `MID` (Middleware), `INT` (Integration/API), `CTL` (Controller), or `SRV` (Service). For example, `TC-CTL-CSG-001` means Test Case - Controller - Create Study Group - 001.

### 2. Features to be tested
- Create Study Group.

### 3. Test environment and tools
- Frameworks: Express.js, Vitest, Supertest.
- Database: PostgreSQL (mocked via transaction and query intercepts).
- Other: JSONWebToken for authentication, Socket.io for events.

### 4. Test schedule and responsibilities
- Tester: Nguyễn Lê Hoàng Khải
- Schedule: Unit and integration testing carried out during and post-implementation of the feature.

### 5. Entry and exit criteria
- **Entry:** Create Study Group feature fully implemented across routes, controllers, and services.
- **Exit:** All test cases executed successfully across all layers.

## II. Test Cases

### 1. Use Case 1: Create Study Group

**--- API & INTEGRATION LEVEL ---**

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Successful API creation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the API returns 201 after the complete route pipeline normalizes and creates a group.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Valid payload with a valid Bearer token.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send POST request to `/api/study-groups` with valid payload and token.</li>
          <li>Verify response status code.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Response status 201.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Missing bearer token
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the API returns 401 when the bearer token is missing.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Request without Authorization header.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send POST request to `/api/study-groups`.</li>
          <li>Observe response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Response status 401 with `AUTH_REQUIRED`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Invalid token
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the API returns 401 when the token is invalid.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Invalid or malformed Bearer token.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send POST request to `/api/study-groups` with invalid token.</li>
          <li>Observe response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Response status 401 with `INVALID_TOKEN`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Unauthorized role guard
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the API returns 403 for non-student roles.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Token representing a librarian or admin user.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send POST request with non-student role token.</li>
          <li>Observe response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Response status 403.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Request validation - unsupported field
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-005</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the API returns a structured 400 response for an unsupported field.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Payload containing the unsupported field `createdBy`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send POST request with unsupported field.</li>
          <li>Observe response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Response status 400.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Request validation - invalid metadata
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-006</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the API returns a structured 400 response for invalid creation metadata.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Payload containing `title: "12345"`, which has no letter.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send POST request with invalid payload.</li>
          <li>Observe response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Response status 400.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Service outcome mapping (Not Found / Conflict)
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that service-layer errors are mapped to appropriate HTTP status codes (404, 409).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Service layer rejects with `NOT_FOUND`, `SLOT_UNAVAILABLE`, or `INVALID_CAPACITY`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Trigger a service conflict error.</li>
          <li>Observe API response mapping.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Response status 404 or 409.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Unexpected service failure (500)
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the API returns a safe 500 envelope for unexpected failures.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Simulated internal server error.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Force service to throw an unexpected error.</li>
          <li>Observe API response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Response status 500.</td>
    </tr>
  </tbody>
</table>

**--- MIDDLEWARE LEVEL ---**

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Normalize a valid creation request</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-001</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify that the middleware converts a numeric availability ID, trims metadata, and removes empty requirements before continuing.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Create Study Group</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">`availId: "12"` and metadata/requirements containing surrounding spaces and an empty item.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;"><ol style="margin: 0; padding-left: 20px; line-height: 1.6;"><li>Invoke `validateCreateStudyGroup` with the valid request.</li><li>Inspect the normalized body and middleware continuation.</li></ol></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">`availId` becomes `12`, metadata is trimmed, empty requirements are removed, `next()` is called once, and no error response is sent.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Default omitted requirements</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-002</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify that omitted optional requirements default to an empty array.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Create Study Group</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">A valid creation request without the `requirements` field.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;"><ol style="margin: 0; padding-left: 20px; line-height: 1.6;"><li>Remove `requirements` from the valid request.</li><li>Invoke the creation middleware and inspect the request body.</li></ol></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">`requirements` is `[]` and `next()` is called once.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Reject an unsupported request field</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-003</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify that the middleware rejects unsupported fields and reports their names.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Create Study Group</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">A valid request containing `createdBy: "another-user"`.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;"><ol style="margin: 0; padding-left: 20px; line-height: 1.6;"><li>Add `createdBy` to the request body.</li><li>Invoke the middleware and inspect the response.</li></ol></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 400 with `VALIDATION_ERROR`, `Unsupported request field.`, and `details.fields: ["createdBy"]`; `next()` is not called.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Reject an invalid availability ID</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-004</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify that the middleware rejects availability IDs that are not positive integers.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Create Study Group</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Parameterized values: `0`, `-1`, `1.5`, and `"not-a-number"`.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;"><ol style="margin: 0; padding-left: 20px; line-height: 1.6;"><li>Set each invalid value as `availId`.</li><li>Invoke the middleware and inspect each response.</li></ol></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">Each value returns HTTP 400 with `VALIDATION_ERROR` and `availId must be a positive integer.`; `next()` is not called.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Reject an invalid start date format</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-005</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify that the middleware requires `startDate` to use `YYYY-MM-DD`.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Create Study Group</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">`startDate: "01/08/2099"`.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;"><ol style="margin: 0; padding-left: 20px; line-height: 1.6;"><li>Set the slash-formatted date in the request.</li><li>Invoke the middleware and inspect the response.</li></ol></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 400 with `VALIDATION_ERROR` and `startDate must use YYYY-MM-DD.`; `next()` is not called.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Case: Reject more than five normalized requirements</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-006</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Verify that the middleware rejects more than five non-empty requirements after normalization.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td><td style="vertical-align: top;">Create Study Group</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td><td style="vertical-align: top;">Six non-empty requirements: `["1", "2", "3", "4", "5", "6"]`.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td><td style="vertical-align: top;"><ol style="margin: 0; padding-left: 20px; line-height: 1.6;"><li>Set six requirements in the request.</li><li>Invoke the middleware and inspect the response.</li></ol></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td><td style="vertical-align: top;">HTTP 400 with `VALIDATION_ERROR` and the five-item limit message; `next()` is not called.</td></tr>
  </tbody>
</table>

**--- CONTROLLER LEVEL ---**

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller delegates correctly
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-CSG-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the controller delegates the authenticated user and request body to the service layer.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Valid req and res objects.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke controller method.</li>
          <li>Spy on service invocation.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Controller forwards correct parameters to service.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller socket emission order
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-CSG-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the controller emits the created socket event only after the service succeeds.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Valid req, res, and mocked socket layer.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke controller method successfully.</li>
          <li>Check socket emission order.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Socket event is emitted successfully after service completion.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller maps validation error
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-CSG-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the controller maps a Study Group error to its status and complete error envelope.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Service throws mapped validation error.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke controller.</li>
          <li>Verify status and next() call.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Response status 400 with details.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller maps internal error
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-CSG-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the controller maps an unexpected failure to 500 without emitting an event.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Service throws generic error.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke controller method.</li>
          <li>Verify socket emission was skipped.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Response status 500.</td>
    </tr>
  </tbody>
</table>

**--- SERVICE LEVEL ---**

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Metadata normalization
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify trimming of metadata and removal of empty requirements.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Metadata with extra spaces and empty array elements.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call `normalizeMetadata`.</li>
          <li>Verify output.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Returns cleaned up payload.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Requirements coercion
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify coercion of requirement values to strings before trimming.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Array containing numbers, booleans, and un-trimmed strings.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call `normalizeRequirements`.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Returns an array of standard strings.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Unauthenticated rejection
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Rejects an unauthenticated caller before opening a transaction.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Null user ID.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke service.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Rejects with UNAUTHORIZED (401).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Invalid metadata rejection
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Rejects invalid metadata before opening a transaction.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Blank title, title without letters (`12345`), blank description, or subject without letters (`---`).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke service.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Rejects with VALIDATION_ERROR (400).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Requirements overflow rejection
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-005</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Rejects more than five normalized requirements before opening a transaction.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Array with 6 requirements.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke service.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Rejects with VALIDATION_ERROR (400).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Missing slot rejection
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-006</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Rejects a missing slot without inserting a reservation or group.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Non-existent slot.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke service.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Rejects with NOT_FOUND (404).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Invalid capacity rejection
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Rejects a room with no host capacity without writing data.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Slot with capacity 0.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke service.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Rejects with INVALID_CAPACITY (409).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Already-booked slot rejection
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Rejects an already-booked room slot before inserting a reservation or study group.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">The selected slot has capacity 4 and `occupied: true` for `availId: 12` on `2099-08-01`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Mock the authoritative slot lookup to return an occupied slot.</li>
          <li>Invoke `createStudyGroup` with a valid payload.</li>
          <li>Verify that no reservation or study group insert is attempted.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Rejects with `SLOT_UNAVAILABLE` (409); `findSlotForCreation` receives availability ID, start date, and transaction client; no persistence insert runs.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Atomic creation orchestration
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-009</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Creates reservation then group and returns the projected detail in one transaction.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Valid payload.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke service.</li>
          <li>Verify transaction flow.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Returns group detail successfully.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Uniqueness race condition mapping
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Maps an active-slot uniqueness race to SLOT_UNAVAILABLE.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Database throws 23505 constraint error.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke service.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Rejects with SLOT_UNAVAILABLE (409).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Auth user FK violation mapping
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-011</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Maps a missing authenticated user foreign key to AUTH_USER_NOT_FOUND.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Database throws fk violation for user.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke service.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Rejects with AUTH_USER_NOT_FOUND (401).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Unexpected persistence error
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-012</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Preserves unexpected persistence errors for the controller boundary.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Create Study Group</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Generic Error instance.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke service.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Rejects with standard Error instance.</td>
    </tr>
  </tbody>
</table>
