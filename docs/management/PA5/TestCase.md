# Test Case

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026
    Version: 1.6

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
| 21/08/2026 | 1.5 | Test Case Description for AI Recommendation | Trần Lê Hoàng Gia |
| 21/08/2026 | 1.6 | Combine all and Edit | Vũ Duy Nhất |


## Table of Contents

- [Test Case](#test-case)
  - [Revision History](#revision-history)
  - [Table of Contents](#table-of-contents)
  - [I. Register](#i-register)
  - [II. Google OAuth](#ii-google-oauth)
  - [III. Resend Verification](#iii-resend-verification)
  - [IV. Verify Email](#iv-verify-email)
  - [V. Reserve Book](#v-reserve-book)
  - [VI. Verify PIN](#vi-verify-pin)
  - [VII. Create Study Group](#vii-create-study-group)
  - [VIII. AI Recommendation](#viii-ai-recommendation)

---

## I. Register

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

## II. Google OAuth

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

## III. Resend Verification

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

## IV. Verify Email

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

## V. Reserve Book
<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Successfully reserve an available book
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-RES-001 / TC-SRV-RES-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that a logged-in member can successfully reserve an available book at a selected branch and receives the full reservation payload. (Maps to TC-CTL-RES-001 / TC-SRV-RES-001)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reserve a Book</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Authenticated user `u-001`; `POST /api/library/reserve` with body `{ "bookId": "b-001", "branchId": 1 }`; branch 1 has `available_quantity &ge; 1` for the book.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Log in as a member and open the book detail page for a book with available copies.</li>
          <li>Select branch 1 (Main Branch) and click "Reserve".</li>
          <li>Confirm the reservation and inspect the API response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 201 with `{ success: true, data: { reservationId, bookId: "b-001", branchId: 1, branchName: "Main Branch", branchAddress: "123 Main St", shelf, reserveDate, status: "reserved" } }`; UI shows the "Reserved" state.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Inventory and borrow_book row updated on reservation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that a successful reservation decrements `library.available_quantity` by exactly 1 at the selected branch and inserts a `borrow_book` row with status `reserved`. (Maps to TC-SRV-RES-002)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reserve a Book</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">User `u-001`, book `b-001`, branch 1 with `available_quantity = 2`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Reserve the book via the API/UI as in TC-CTL-RES-001 / TC-SRV-RES-001.</li>
          <li>Query `public.library` for the (book, branch) pair and `public.borrow_book` for the user's newest row.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">`available_quantity` decreased from 2 to 1; a `borrow_book` row exists for (`u-001`, `b-001`, branch 1) with status `reserved`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: User borrow count incremented on reservation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that the member's `borrow_num` is incremented by 1 after a successful reservation. (Maps to TC-SRV-RES-003)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reserve a Book</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">User `u-001` with `borrow_num = 0` before the reservation.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Reserve a book as in TC-CTL-RES-001 / TC-SRV-RES-001.</li>
          <li>Query `public.users.borrow_num` for `u-001`.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">`borrow_num` is now 1 (incremented exactly once).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Missing bookId rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-RES-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that a reservation request without `bookId` is rejected before reaching the service layer. (Maps to TC-CTL-RES-003)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reserve a Book</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`POST /api/library/reserve` with body `{ "branchId": 1 }` (no `bookId`).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send the reservation request without `bookId`.</li>
          <li>Inspect the HTTP status and response body.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 400 with `{ success: false, error: { code: "MISSING_PARAMETERS", message: "bookId and branchId are required" } }`; the reservation service is not invoked.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Missing branchId rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-RES-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that a reservation request without `branchId` is rejected before reaching the service layer. (Maps to TC-CTL-RES-004)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reserve a Book</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`POST /api/library/reserve` with body `{ "bookId": "b-001" }` (no `branchId`).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send the reservation request without `branchId`.</li>
          <li>Inspect the HTTP status and response body.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 400 with `{ success: false, error: { code: "MISSING_PARAMETERS", message: "bookId and branchId are required" } }`; the reservation service is not invoked.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Non-existent user account rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that reserving a book when the authenticated user no longer exists returns `USER_NOT_FOUND` and rolls back the transaction. (Maps to TC-SRV-RES-008)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reserve a Book</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">User `u-001` whose row is absent from `public.users`; valid book/branch.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Attempt a reservation with a user account that has been deleted from the database.</li>
          <li>Inspect the response and the executed SQL (transaction must roll back).</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 404 `{ code: "USER_NOT_FOUND", message: "User account not found. Please re-login." }`; `ROLLBACK` executed, `COMMIT` not executed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Unpaid penalties block reservation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-009</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that a user with unpaid penalties cannot reserve a new book and the transaction is rolled back. (Maps to TC-SRV-RES-009)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reserve a Book</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">User `u-001` with at least one unpaid penalty (`COUNT(*)` of unpaid = 1).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Attempt a reservation with a user who has an outstanding unpaid penalty.</li>
          <li>Inspect the response and confirm no inventory change occurred.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 400 `{ code: "UNPAID_DEBT", message: "You have unpaid debts. Please clear all outstanding penalties before reserving a new book." }`; `ROLLBACK` executed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Borrow limit exceeded rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that a reservation is rejected with `BORROW_LIMIT_EXCEEDED` when the user has already reached the maximum borrow limit, and the transaction is rolled back. (Maps to TC-SRV-RES-010)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reserve a Book</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">User `u-001` whose `borrow_num` equals `MAX_BORROW_LIMIT`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Set the user's borrow count to the maximum allowed limit.</li>
          <li>Attempt a new reservation and inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 400 `{ code: "BORROW_LIMIT_EXCEEDED", message: "You have reached the maximum borrow limit of {limit} books" }`; `ROLLBACK` executed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Book not stocked at branch rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-011</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that reserving a book that is not stocked at the selected branch returns `BOOK_NOT_FOUND` and rolls back the transaction. (Maps to TC-SRV-RES-011)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reserve a Book</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Book `b-001` with no inventory row for branch 1 (`available_quantity, shelf` query returns zero rows).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Attempt to reserve a book at a branch where it has no inventory entry.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 404 `{ code: "BOOK_NOT_FOUND", message: "Book not found at the selected branch" }`; `ROLLBACK` executed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Unavailable book rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-012 / TC-CTL-RES-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that reserving a book with zero available copies at the branch returns `BOOK_UNAVAILABLE` and rolls back the transaction. (Maps to TC-SRV-RES-012 / TC-CTL-RES-007)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reserve a Book</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Book `b-001` with `available_quantity = 0` at branch 1.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Attempt to reserve a book whose available quantity at the branch is 0.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 400 `{ code: "BOOK_UNAVAILABLE", message: "No available copies at the selected branch" }`; `ROLLBACK` executed.</td>
    </tr>
  </tbody>
</table>
*(Maps to automated cases TC-SRV-RES-001→017, TC-CTL-RES-001→010, TC-MID-LIB-001→008 in `server/tests/services/library.reserve.service.spec.mjs`, `server/tests/controllers/library.reserve.controller.spec.mjs`, `server/tests/middlewares/library.reserve.middleware.spec.mjs`.)*


## VI. Verify PIN

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Generate a 6-digit pickup PIN
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that generating a pickup PIN for a `reserved` book produces a unique 6-digit PIN, sets the status to `pending`, and returns an expiry 180 seconds in the future. (Maps to TC-SRV-PIN-US-001)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Pickup PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">User `u-001`, reservation `bb-001` in status `reserved`; request `POST /api/dashboard/user/reservations/bb-001/pin`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>In the "Currently Borrowing" tab, click "View PIN" on a reserved book card.</li>
          <li>Verify the PIN modal opens with a 6-digit code and a countdown timer.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">PIN matches `/^\d{6}$/`; `borrow_book.status` = `pending`; `expiresAt` is a `Date` approximately 180,000 ms (3 minutes) after `Date.now()`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Reuse an active pickup PIN
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that re-opening the PIN modal while a PIN is still active returns the same active PIN with its ongoing expiry instead of generating a new one. (Maps to TC-SRV-PIN-US-003)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Pickup PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Reservation `bb-001` with an active non-expired PIN (`pin IS NOT NULL AND expired_at > NOW()`), e.g. PIN `111111`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Generate a PIN, close the modal, then click "View PIN" again before expiry.</li>
          <li>Compare the two displayed PINs and countdown values.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">The same PIN (`111111`) and its remaining expiry are returned; no `UPDATE` writing a new PIN is executed (only 2 queries total).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Missing or invalid-status reservation rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-002 / TC-CTL-PIN-US-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that generating a PIN for a reservation that does not exist (or is not in `reserved`/`pending`) returns `RESERVATION_NOT_FOUND`. (Maps to TC-SRV-PIN-US-002 / TC-CTL-PIN-US-002)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Pickup PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">User `u-001` requesting a PIN for a non-existent or already-`borrowed` `borrow_id`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Attempt to generate a PIN for a reservation the user does not own or that has moved past `pending`.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 404 `{ code: "RESERVATION_NOT_FOUND", message: "Reservation not found or invalid status" }`; only the initial lookup query is executed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: PIN collision retry exhaustion
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that when all 3 unique-constraint attempts (SQLSTATE 23505) fail, the system returns `PIN_GENERATION_FAILED` with HTTP 500 instead of crashing. (Maps to TC-SRV-PIN-US-004)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Pickup PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">A reservation where every generated candidate PIN collides with an existing active PIN (`UPDATE` throws code `23505` on all 3 attempts).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Force a unique-violation on each PIN generation attempt.</li>
          <li>Inspect the returned error.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 500 `{ code: "PIN_GENERATION_FAILED", message: "Failed to generate unique PIN after 3 attempts" }` (no uncaught exception).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Non-unique database errors are propagated
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-005</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that genuine database errors (e.g., connection lost) are not swallowed by the PIN retry loop and are rethrown. (Maps to TC-SRV-PIN-US-005)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Pickup PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">The PIN `UPDATE` throws `Error("connection lost")` (no `23505` code).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Simulate a connection failure during PIN persistence.</li>
          <li>Observe the resulting behavior.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">The `connection lost` error is rethrown (surfaces to the error-handling layer) and is not retried 3 times.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller returns generated PIN on success
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify the controller returns `{ success: true, data: { pin, expiresAt } }` when the service succeeds. (Maps to TC-CTL-PIN-US-001)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Pickup PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`req.user.userId = "u-001"`, `req.params.reservationId = "bb-001"`; service resolves `{ pin: "123456", expiresAt }`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call the generate-PIN endpoint with a valid reservation.</li>
          <li>Inspect the JSON response body.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">`{ success: true, data: { pin: "123456", expiresAt } }`; no 4xx status returned.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller forwards domain error status code
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify the controller forwards service domain errors together with their status code. (Maps to TC-CTL-PIN-US-002)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Pickup PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Service resolves `{ error: { code: "RESERVATION_NOT_FOUND", message: "Reservation not found or invalid status" }, statusCode: 404 }`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Trigger a PIN generation for an invalid reservation.</li>
          <li>Inspect the response status and body.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 404 with `{ success: false, error: { code: "RESERVATION_NOT_FOUND", message: "Reservation not found or invalid status" } }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller defaults to 400 for unknown error shape
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify the controller defaults to HTTP 400 when a service error has no `statusCode`. (Maps to TC-CTL-PIN-US-003)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Pickup PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Service resolves `{ error: { code: "X", message: "msg" } }` without `statusCode`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Force the service to return a bare error object.</li>
          <li>Inspect the HTTP status.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 400.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller returns 500 on unexpected throw
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify the controller returns `500 INTERNAL_ERROR` with a generic message when the service throws unexpectedly. (Maps to TC-CTL-PIN-US-004)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Pickup PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Service throws `Error("db down")`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Simulate an unexpected service exception.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 500 `{ success: false, error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred" } }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Cleanup resets reservation PIN and status
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-011 / TC-CTL-PIN-US-005</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that PIN cleanup clears `pin`/`expired_at` and restores the status to `reserved` for a `pending` row, returning `cleaned: true`. (Maps to TC-SRV-PIN-US-011 / TC-CTL-PIN-US-005)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Pickup PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Reservation `bb-001` in `pending` status with an expired PIN; cleanup call `cleanupReservationPin("u-001", "bb-001")`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Let a generated PIN expire (or trigger cleanup).</li>
          <li>Run the cleanup routine and inspect the database row.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Cleanup returns `true`; the row now has `pin = NULL`, `expired_at = NULL`, `status = 'reserved'`.</td>
    </tr>
  </tbody>
</table>
*(Maps to automated cases TC-SRV-PIN-US-001→005 and TC-SRV-PIN-US-011→012 in `server/tests/services/dashboard.user.pin.service.spec.mjs`, TC-CTL-PIN-US-001→006 in `server/tests/controllers/dashboard.user.pin.controller.spec.mjs`.)*


<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Find borrow record by PIN
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that a borrow record matching a PIN is returned joined with the borrower (user) and book details. (Maps to TC-SRV-PIN-LIB-001)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Pickup PIN and Confirm Borrowing</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">PIN `123456` with status `pending`; a matching row exists in `public.borrow_book` joined with `users` and `books`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Query the borrow record by the PIN.</li>
          <li>Verify the joined user and book fields are present.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Returns the record containing `borrow_id`, `user_id`, `book_id`, `status`, plus user and book metadata.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: No record matches the PIN
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that looking up a PIN with no matching row returns `null`. (Maps to TC-SRV-PIN-LIB-002)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Pickup PIN and Confirm Borrowing</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">PIN `999999` with no matching `borrow_book` row.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Look up a non-existent PIN.</li>
          <li>Inspect the returned value.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Returns `null`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Valid pickup PIN returns borrower and book details
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-003 / TC-CTL-PIN-LIB-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that verifying a valid PIN at the correct branch returns the borrower identity and book details. (Maps to TC-SRV-PIN-LIB-003 / TC-CTL-PIN-LIB-003)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Pickup PIN and Confirm Borrowing</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">PIN `123456`, librarian branch 1; record `branch_id = 1`, status `pending`, book "Clean Code".</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>At the counter, enter the PIN provided by the member.</li>
          <li>Verify the confirmation screen shows the borrower and book.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Returns `{ borrowId, borrower: { username, gender, phone_number, email }, book: { title, author, publisher, genre, price } }`; controller responds `success: true` with message "PIN verified successfully".</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Invalid or expired PIN rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-004 / TC-CTL-PIN-LIB-011</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that an invalid or expired PIN returns `PIN_NOT_FOUND` with HTTP 404. (Maps to TC-SRV-PIN-LIB-004 / TC-CTL-PIN-LIB-011)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Pickup PIN and Confirm Borrowing</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">PIN `999999` (no row) or a PIN whose `expired_at` is in the past.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Enter a wrong or expired PIN at the counter.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 404 `{ code: "PIN_NOT_FOUND", message: "The PIN has expired or does not exist." }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: PIN from another branch rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-005 / TC-CTL-PIN-LIB-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that verifying a PIN whose reservation belongs to another branch returns `WRONG_BRANCH` with HTTP 403. (Maps to TC-SRV-PIN-LIB-005 / TC-CTL-PIN-LIB-004)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Pickup PIN and Confirm Borrowing</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Librarian at branch 1 verifies PIN `123456` whose record has `branch_id = 2`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>At branch 1, enter a PIN generated for a reservation at branch 2.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 403 `{ code: "WRONG_BRANCH", message: "You have arrived at the wrong book borrowing branch." }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller rejects malformed PIN format
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-LIB-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that a PIN that is not exactly 6 digits is rejected by the controller with HTTP 400 before calling the service. (Maps to TC-CTL-PIN-LIB-001)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Pickup PIN and Confirm Borrowing</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`req.body = { pin: "123" }` (3 digits).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Submit a short PIN at the verify endpoint.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 400; the verification service is not called.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Confirm borrowing sets status and due date
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-009 / TC-CTL-PIN-LIB-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that confirming borrowing sets `status = 'borrowed'`, `borrow_date = NOW()`, `due_date = NOW() + 14 days` and commits the transaction. (Maps to TC-SRV-PIN-LIB-009 / TC-CTL-PIN-LIB-007)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Pickup PIN and Confirm Borrowing</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`borrow_id = "bb-001"`, user eligible (no overdue books, account exists).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>After PIN verification, confirm the borrowing at the counter.</li>
          <li>Verify `BEGIN`/`COMMIT` executed and the row state.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">`{ borrowId, status: "borrowed", due_date }`; `COMMIT` executed; the SQL sets `due_date = NOW() + INTERVAL '14 days'`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Confirm borrowing on missing record rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that confirming a borrowing whose record does not exist returns `NOT_FOUND` and rolls back the transaction. (Maps to TC-SRV-PIN-LIB-010)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Pickup PIN and Confirm Borrowing</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">A `borrow_id` with no matching `borrow_book` row.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Attempt to confirm a borrowing that was already cancelled.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 404 `{ code: "NOT_FOUND", message: "Borrow record not found." }`; `ROLLBACK` executed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Ineligible borrower rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-011 / TC-SRV-PIN-LIB-012 / TC-CTL-PIN-LIB-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that confirming a borrowing for a borrower with overdue books or a suspended/missing account returns `USER_INELIGIBLE` with HTTP 409 and rolls back. (Maps to TC-SRV-PIN-LIB-011 / TC-SRV-PIN-LIB-012 / TC-CTL-PIN-LIB-008)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Pickup PIN and Confirm Borrowing</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Borrower has `overdue_count = 2` (or no user row exists).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Attempt to confirm borrowing for a borrower with overdue books.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 409 `{ code: "USER_INELIGIBLE", message: "Borrower has overdue books or is suspended. Cannot confirm borrowing." }`; `ROLLBACK` executed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller rejects missing borrow_id on confirmation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-LIB-006</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify the controller returns HTTP 400 when `borrow_id` is missing in a confirm-borrowing request. (Maps to TC-CTL-PIN-LIB-006)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Pickup PIN and Confirm Borrowing</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`req.body = {}` (no `borrow_id`).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send the confirm-borrowing request without `borrow_id`.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 400; the confirmation service is not called.</td>
    </tr>
  </tbody>
</table>
*(Maps to automated cases TC-SRV-PIN-LIB-001→013 in `server/tests/services/dashboard.librarian.pin.service.spec.mjs`, TC-CTL-PIN-LIB-001→008 in `server/tests/controllers/dashboard.librarian.pin.controller.spec.mjs`.)*

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Generate a 6-digit return PIN
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-006</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that generating a return PIN for a currently `borrowed` book produces a 6-digit PIN and sets the status to `pending_return`. (Maps to TC-SRV-PIN-US-006)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Return PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">User `u-001`, borrow record `bb-001` in status `borrowed`; request with `borrow_id = "bb-001"`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>In the user dashboard, click the return-PIN button on a borrowed book card.</li>
          <li>Verify the modal shows a 6-digit code.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">PIN matches `/^\d{6}$/`; `borrow_book.status` = `pending_return`; the update query uses `[pin, expiresAt, borrow_id]`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Book not currently borrowed rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-007 / TC-CTL-PIN-US-009</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that generating a return PIN for a book that is not currently `borrowed` returns `BORROW_NOT_FOUND` with HTTP 404. (Maps to TC-SRV-PIN-US-007 / TC-CTL-PIN-US-009)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Return PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">A `borrow_id` with no row in status `borrowed`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Attempt to generate a return PIN for an already-returned or reserved book.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 404 `{ code: "BORROW_NOT_FOUND", message: "Borrow record not found or book is not currently borrowed" }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Database failure returns 500
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that a database failure during return-PIN generation returns `INTERNAL_ERROR` with HTTP 500. (Maps to TC-SRV-PIN-US-008)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Return PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`pool.query` rejects with `Error("db down")`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Stop/block the database and attempt to generate a return PIN.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 500 `{ error: { code: "INTERNAL_ERROR", message: "db down" }, statusCode: 500 }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Cleanup restores return status
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-009 / TC-CTL-PIN-US-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that return-PIN cleanup clears `pin`/`expired_at` and restores the status to `borrowed` when a `pending_return` row is updated. (Maps to TC-SRV-PIN-US-009 / TC-CTL-PIN-US-010)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Return PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Borrow record `bb-001` in `pending_return` with an expired return PIN.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Let the return PIN expire.</li>
          <li>Run cleanup and inspect the row.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Cleanup returns `true`; the SQL sets `pin = NULL, expired_at = NULL, status = 'borrowed'` for `[borrow_id, user_id]`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Cleanup returns false when nothing matched
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that cleanup returns `false` when no row matched the `pending_return` state. (Maps to TC-SRV-PIN-US-010)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Return PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`pool.query` resolves with `rowCount: 0`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Run cleanup for a record already past the `pending_return` state.</li>
          <li>Inspect the returned value.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Returns `false`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller rejects missing borrow_id
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify the controller returns HTTP 400 when `borrow_id` is missing in a return-PIN request. (Maps to TC-CTL-PIN-US-007)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Return PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`req.body = {}`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send the return-PIN request without `borrow_id`.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 400; the return-PIN service is not called.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller returns generated return PIN on success
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify the controller returns the generated return PIN, its expiry, and a success message. (Maps to TC-CTL-PIN-US-008)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Return PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`req.body = { borrow_id: "bb-001" }`; service resolves `{ pin: "654321", expiresAt }`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Generate a return PIN for a borrowed book.</li>
          <li>Inspect the JSON response body.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">`{ success: true, data: { pin: "654321", expiresAt }, message: "Return PIN generated successfully" }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller forwards BORROW_NOT_FOUND error
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-009</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify the controller forwards the `BORROW_NOT_FOUND` domain error with its 404 status. (Maps to TC-CTL-PIN-US-009)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Return PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`req.body = { borrow_id: "bb-001" }`; service resolves `{ error: { code: "BORROW_NOT_FOUND", message: "..." }, statusCode: 404 }`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Generate a return PIN for a book that is not currently borrowed.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 404 with `{ success: false, data: null, message: "Borrow record not found or book is not currently borrowed" }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Cleanup controller returns cleaned status
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify the cleanup-return-PIN controller returns `{ success: true, cleaned: true }` when the cleanup succeeded. (Maps to TC-CTL-PIN-US-010)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Return PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`req.params.borrowId = "bb-001"`; cleanup service resolves `true`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Trigger cleanup for an expired return PIN.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">`{ success: true, cleaned: true }`; the service was called with `("u-001", "bb-001")`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Cleanup controller returns 500 on throw
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-011</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify the cleanup-return-PIN controller returns HTTP 500 when the cleanup service throws. (Maps to TC-CTL-PIN-US-011)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Generate Return PIN</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`req.params.borrowId = "bb-001"`; cleanup service throws `Error("boom")`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Trigger cleanup while the database is unavailable.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 500 (internal error).</td>
    </tr>
  </tbody>
</table>
*(Maps to automated cases TC-SRV-PIN-US-006→010 in `server/tests/services/dashboard.user.pin.service.spec.mjs`, TC-CTL-PIN-US-007→011 in `server/tests/controllers/dashboard.user.pin.controller.spec.mjs`.)*

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Valid return PIN returns borrowing details
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-007 / TC-CTL-PIN-LIB-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that verifying a valid return PIN returns the borrower, book, and borrowing (dates) details. (Maps to TC-SRV-PIN-LIB-007 / TC-CTL-PIN-LIB-010)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Return PIN and Confirm Return</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Return PIN `654321`; record in status `pending_return` with `borrow_date` and `due_date` populated.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>At the counter, enter the return PIN provided by the member.</li>
          <li>Verify the return screen shows borrower, book, and due date.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Returns `{ borrowId, borrower, book, borrowing: { reserve_date, borrow_date, due_date } }`; the query matches `bb.pin = $1 AND bb.expired_at > NOW()`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Invalid return PIN rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-008 / TC-CTL-PIN-LIB-011</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that an invalid or expired return PIN returns `PIN_NOT_FOUND` with HTTP 404. (Maps to TC-SRV-PIN-LIB-008 / TC-CTL-PIN-LIB-011)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Return PIN and Confirm Return</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Return PIN `999999` (no matching row).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Enter a wrong or expired return PIN.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 404 `{ code: "PIN_NOT_FOUND", message: "The PIN has expired or does not exist." }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Clean return recorded and inventory restored
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-014 / TC-CTL-PIN-LIB-013</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that confirming a clean return (perfect condition, no penalty) inserts a `return_book` row, restores inventory, decrements `borrow_num`, and commits. (Maps to TC-SRV-PIN-LIB-014 / TC-CTL-PIN-LIB-013)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Return PIN and Confirm Return</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`confirmReturn("bb-001", 1, ["perfect_condition"], null, false)`; book price 50.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Confirm the return of a book in perfect condition.</li>
          <li>Verify the return row, inventory, and borrow count in the database.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">`COMMIT` executed; `return_book` row inserted; `available_quantity` incremented by 1; `borrow_num` decremented via `GREATEST(borrow_num - 1, 0)`; returns `{ success: true, data: { returnId, penaltyId: null, penaltyAmount: 0, issue: null, inventoryUpdated: true } }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Return for non-pending_return record rejected
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-015 / TC-CTL-PIN-LIB-015</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that confirming a return for a record not in `pending_return` returns `NOT_FOUND` and rolls back. (Maps to TC-SRV-PIN-LIB-015 / TC-CTL-PIN-LIB-015)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Return PIN and Confirm Return</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">A `borrow_id` whose record is not in `pending_return` status.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Attempt to confirm a return without a prior return PIN.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 404 `{ code: "NOT_FOUND", message: "Borrow record not found or not in pending_return status" }`; `ROLLBACK` executed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Lost book charged twice the price
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-016</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that confirming a return for a lost book charges a penalty of twice the book price, records the penalty, and does not restore inventory. (Maps to TC-SRV-PIN-LIB-016)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Return PIN and Confirm Return</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`confirmReturn("bb-001", 1, [], "Book lost", true)`; book price 50.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Mark the returned book as lost and confirm the return.</li>
          <li>Verify the penalty amount and the `book_penalty` row.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">A `book_penalty` row is inserted; returns `{ success: true, data: { returnId: null, penaltyId: null, penaltyAmount: 100, issue: "lost", inventoryUpdated: false } }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Damaged book penalty applied
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-017</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that a damaged book is charged a penalty based on the worst damage coefficient, and inventory is restored. (Maps to TC-SRV-PIN-LIB-017)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Return PIN and Confirm Return</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`confirmReturn("bb-001", 1, ["folded_pages"], "Fold corner", false)`; price 50; `folded_pages` coefficient 0.10 → 0.10 × 50 + admin fee = 6.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Inspect a returned book with folded pages and confirm the return.</li>
          <li>Verify the computed penalty.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">`penaltyAmount = 6`, `issue = "damaged"`, `inventoryUpdated = true`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Overdue return penalty charged
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-018</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that returning a book after the due date (even in perfect condition) charges an overdue penalty. (Maps to TC-SRV-PIN-LIB-018)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Return PIN and Confirm Return</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`borrow_date = 2026-07-01`, `due_date = 2026-07-10` (already past), price 100; return today.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Confirm the return of a book whose due date has passed.</li>
          <li>Verify the penalty.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">`issue = "overdue"` and `penaltyAmount > 0`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: PIN cleared after successful return
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-019</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that a successful return clears the PIN and expiry from the `borrow_book` row so the PIN cannot be reused. (Maps to TC-SRV-PIN-LIB-019)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Return PIN and Confirm Return</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Borrow record `bb-001` in `pending_return` status with a stored PIN.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Confirm the return of a book.</li>
          <li>Query the `borrow_book` row and verify the PIN fields.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">The SQL `UPDATE public.borrow_book SET pin = NULL, expired_at = NULL` is executed for `[borrow_id]`, so the PIN cannot be reused.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Transaction rollback and client release on failure
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-020</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify that when the return transaction throws, the transaction is rolled back and the database client is released (no connection leak). (Maps to TC-SRV-PIN-LIB-020)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Return PIN and Confirm Return</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`confirmReturn("bb-001", 1, ["perfect_condition"], null, false)` where the borrow-record query throws `Error("transaction failed")`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Cause a database failure during the return transaction.</li>
          <li>Verify rollback and connection release.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">`ROLLBACK` executed, `client.release()` called exactly once, and the error `transaction failed` propagates.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Controller rejects missing confirm-return parameters
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-LIB-012</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Verify the controller returns HTTP 400 when `borrow_id` or `branch_id` is missing in a confirm-return request. (Maps to TC-CTL-PIN-LIB-012)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Verify Return PIN and Confirm Return</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">`req.body = { borrow_id: "bb-001" }` (no `branch_id`).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Send the confirm-return request without `branch_id`.</li>
          <li>Inspect the response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP 400; the confirm-return service is not called.</td>
    </tr>
  </tbody>
</table>
## VII. Create Study Group

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

## VIII. AI Recommendation

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: In-Memory Cache Hit Validation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate that repeating a recommendation request for an active user hits the in-memory Map cache (<code>recommendationCache</code>) and avoids secondary database SQL queries (<code>pool.query</code>).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, memory cache pre-cleared, PostgreSQL DB containing 15 pre-computed recommendations.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call <code>getUserRecommendations('test-user-id')</code>.</li>
          <li>Record the number of SQL queries executed by <code>pool.query</code>.</li>
          <li>Immediately invoke <code>getUserRecommendations('test-user-id')</code> a second time.</li>
          <li>Compare output objects and inspect <code>pool.query</code> call count.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">The first call queries the database once (<code>pool.query</code> count = 1) and returns 15 recommendation items. The second call retrieves the array directly from the in-memory Map cache (<code>pool.query</code> count remains 1). Returned array matching <code>result1 === result2</code>.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Database Connection Resilience & Catalog Fallback
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate system fault tolerance when PostgreSQL pool encounters connection failure, verifying graceful fallback to standard catalog trend items without unhandled exceptions.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, primary query configured to throw <code>Error('PostgreSQL Connection Failed')</code>, secondary query returning 15 fallback catalog books.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Execute <code>getUserRecommendations('test-user-id')</code> during active database pool exception.</li>
          <li>Capture returned data structure and inspect error handling logs.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Service handles exception internally without crashing or throwing an unhandled rejection. Returns exactly 15 fallback items with default <code>score: 0.0</code> and fallback titles (<code>fallback-book-0</code> through <code>fallback-book-14</code>).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: TCP Socket Inference Handler & Framing
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate raw TCP socket IPC communication with Python ML micro-ranker daemon, verifying JSON payload framing with trailing newline <code>\n</code> and output score re-ranking.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, Mock TCP Server on <code>127.0.0.1:5999</code> returning JSON payload with GCN scores <code>[0.9, 0.85, ...]</code>.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Trigger <code>generateRecommendations('test-user-id')</code>.</li>
          <li>Mock server intercepts JSON TCP payload containing candidate array and responds with score JSON.</li>
          <li>Validate candidate score ordering in service response.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Payload serialized as valid JSON string with trailing newline <code>\n</code>. Service receives and parses response buffer correctly. Recommendations returned sorted in descending order of GCN score (<code>result[0].score === 0.9</code>).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Memgraph Candidate Retrieval & Cold-Start Fallback
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-005</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate candidate retrieval from Memgraph DB; verify that if primary graph traversal returns fewer than 60 records, secondary cold-start Cypher query is executed.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, primary Cypher graph query yielding 5 records (&lt; 60 threshold), secondary cold-start query yielding 60 records.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Mock <code>getSession().run</code> to return 5 records on 1st call, and 60 records on 2nd call.</li>
          <li>Invoke <code>generateRecommendations('test-user-id')</code>.</li>
          <li>Count total calls to <code>session.run</code>.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;"><code>session.run</code> is executed exactly twice, successfully triggering the secondary cold-start graph traversal Cypher query. Candidate pool is populated with merged items from both graph passes.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Hard Guardrail – Out-of-Stock Item Filtering
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-006</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate business rule inventory guardrail (<code>adjustCandidateScores</code>) ensuring items with 0 available physical copies (<code>global_available_copies === 0</code>) are pruned regardless of GCN score.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Candidate <code>stock-book-0</code> with raw GCN score <code>0.9</code> and <code>global_available_copies: 0</code>; items <code>stock-book-1..14</code> with <code>global_available_copies: 5</code>.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Invoke <code>generateRecommendations('test-user-id')</code>.</li>
          <li>Inspect candidate list returned by service routine.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Candidate <code>stock-book-0</code> is completely pruned from recommendation output (<code>result.some(b => b.id === 'stock-book-0') === false</code>). Total returned items maintain quota via supplementation.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Exponential Skip Penalty Scoring Calculation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate mathematical precision of exponential skip decay formula Score_final = Score_GCN * (0.65)^N for past skipped impressions.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>book-skipped</code> with raw score <code>0.90</code> and <code>past_impressions_count = 2</code>; <code>book-fresh</code> with raw score <code>0.80</code> and <code>past_impressions_count = 0</code>.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Execute <code>generateRecommendations('test-user-id')</code>.</li>
          <li>Extract calculated <code>book-skipped</code> score from output.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Final score matches exact mathematical formula: 0.90 * (0.65)^2 = 0.90 * 0.4225 = 0.38025. <code>expect(skippedItem.score).toBeCloseTo(0.38025, 4)</code> evaluates to true.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Candidate Pool Catalog Supplementation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate catalog supplementation algorithm ensuring recommendation feed strictly maintains minimum 15-item quota when graph queries return insufficient items.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, Graph queries return only 1 item (<code>few-book-1</code>).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Execute <code>generateRecommendations('test-user-id')</code>.</li>
          <li>Check database queries for catalog supplementation pass.</li>
          <li>Verify returned array length.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Database is queried for catalog supplementation (<code>supp-book-0</code> through <code>supp-book-13</code>). Returned array length is exactly 15 items.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Click Tracking, Eviction & Graph Sync Integration
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-009</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate end-to-end click tracking lifecycle: updating PostgreSQL click flag (<code>is_clicked = TRUE</code>), evicting user cache Map, and invoking async graph sync (<code>syncRecommendationClick</code>).</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, <code>bookId = "book-0"</code>, active recommendations cached in memory Map.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call <code>getUserRecommendations('test-user-id')</code> to populate cache.</li>
          <li>Invoke <code>logRecommendationClick('test-user-id', 'book-0')</code>.</li>
          <li>Assert PostgreSQL update query executed (<code>is_clicked = TRUE</code>).</li>
          <li>Assert <code>syncRecommendationClick</code> called with user, book ID, and timestamp.</li>
          <li>Call <code>getUserRecommendations('test-user-id')</code> again.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Click recorded successfully (<code>logged === true</code>). In-memory cache for user is evicted; subsequent lookup triggers DB reload (<code>pool.query</code> count increments). Non-blocking graph edge sync invoked with ISO timestamp.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Express Controller API Contract Validation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate REST controller endpoint (<code>getRecommendations</code>) payload formatting into <code>historyBased</code> (15 items) and <code>trending</code> arrays with HTTP 200 OK status.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01) & Reset AI Recommend (UC-AIR-02)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Mock Request <code>req = { user: { userId: 'test-user-id' } }</code>, Mock Response <code>res</code> with spied <code>json</code> and <code>status</code> methods.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call <code>getRecommendations(req, res)</code> controller handler.</li>
          <li>Inspect response payload passed to <code>res.json()</code>.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP Response status implicitly set to 200 OK. Response payload contains <code>{ success: true, data: { historyBased: [...], trending: [...] } }</code>.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Cache Invalidation & Miss Flow
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate that invoking <code>invalidateUserRecommendationCache</code> properly evicts user cache entry from memory Map, causing subsequent requests to trigger a database query miss.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">Reset AI Recommend (UC-AIR-02)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;"><code>userId = "test-user-id"</code>, active recommendations cached in memory Map.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Execute <code>getUserRecommendations('test-user-id')</code> to ensure cache populate (<code>pool.query</code> count = 1).</li>
          <li>Invoke <code>invalidateUserRecommendationCache('test-user-id')</code>.</li>
          <li>Call <code>getUserRecommendations('test-user-id')</code> once more.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">Cache eviction function succeeds silently. The subsequent <code>getUserRecommendations</code> call experiences a cache miss and queries PostgreSQL (<code>pool.query</code> count increments to 2).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Case: Express Controller API Contract Validation
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Validate REST controller endpoint (<code>getRecommendations</code>) payload formatting into <code>historyBased</code> (15 items) and <code>trending</code> arrays with HTTP 200 OK status.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Related Use Case</td>
      <td style="vertical-align: top;">View Recommended Book (UC-AIR-01) & Reset AI Recommend (UC-AIR-02)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Input Data</td>
      <td style="vertical-align: top;">Mock Request <code>req = { user: { userId: 'test-user-id' } }</code>, Mock Response <code>res</code> with spied <code>json</code> and <code>status</code> methods.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Steps</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Call <code>getRecommendations(req, res)</code> controller handler.</li>
          <li>Inspect response payload passed to <code>res.json()</code>.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Output</td>
      <td style="vertical-align: top;">HTTP Response status implicitly set to 200 OK. Response payload contains <code>{ success: true, data: { historyBased: [...], trending: [...] } }</code>.</td>
    </tr>
  </tbody>
</table>
