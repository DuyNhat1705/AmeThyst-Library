# Test Execution Result

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
| 14/08/2026 | 1.0 | Template for Test Execution Result | Nguyễn Lê Hoàng Khải |
| 15/08/2026 | 1.1 | Test Execution Result for Create Study Group | Nguyễn Lê Hoàng Khải |
| 15/08/2026 | 1.2 | Test Execution Result for Register, Google OAuth, Verify Email, Resend Verification | Phan Lê Anh Minh |
| 16/08/2026 | 1.3 | Test Execution Result for Reserve Book and Verify PIN | Nguyễn Nhựt Huy |
| 16/08/2026 | 1.4 | Update Execution Result for more test in Create Study Group | Nguyễn Lê Hoàng Khải |

## Table of Contents

- [Test Execution Result](#test-execution-result)
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
        Test Execution: TC-SRV-REG-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REG-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">Password was hashed, pending data was persisted, verification mail was requested, and a generic confirmation was returned.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REG-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REG-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Fail</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The pending record with expired_at equal to now remained active; cleanup was not called. Linked bug: BUG-AUTH-01.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REG-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REG-003</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Fail</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">Pending data remained committed after the verification mailer failed. Linked bug: BUG-AUTH-02.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-REG-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-REG-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The controller passed request fields to the service and returned HTTP 201 with the generic message.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-REG-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-REG-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The existing-account flow returned the same generic HTTP 201 response.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-REG-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-REG-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The API returned HTTP 201 and invoked verification mail delivery.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-REG-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-REG-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The API returned HTTP 201 and did not invoke the mailer.</td></tr>
  </tbody>
</table>

## II. Google OAuth

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CFG-GA-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CFG-GA-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The first-time user was provisioned with mapped data and a null-avatar fallback.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CFG-GA-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CFG-GA-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The returning Google user was reused and the password-account collision was refused safely.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-GA-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-GA-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">Session/cookies were created and the redirect contained no query token.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-GA-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-GA-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The redirect exposed neither password_hash nor GOOGLE_AUTH.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-GA-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-GA-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">GET /auth/google returned HTTP 302 to Google authorization.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-GA-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-GA-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The callback returned HTTP 302 to the client callback without token= in the URL.</td></tr>
  </tbody>
</table>

## III. Resend Verification

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-RV-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RV-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The service refreshed token/TTL, reused the existing password hash and username, called the mailer, and returned a generic response.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-RV-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RV-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The no-pending flow returned a generic response without side effects.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-RV-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RV-003</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Fail</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">Replacement token and TTL were committed before failed mail delivery, so the previous values were not preserved. Linked bug: BUG-AUTH-04.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-RV-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-RV-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The valid request returned HTTP 200; missing email returned HTTP 400.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-RV-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-RV-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The unexpected service error was hidden behind the generic HTTP 200 response.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-RV-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-RV-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The API committed replacement data, called the mailer, and returned HTTP 200.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-RV-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-RV-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The no-pending API request returned HTTP 200 without calling the mailer.</td></tr>
  </tbody>
</table>

## IV. Verify Email

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-VE-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-VE-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The pending user was promoted and deleted, and a safe payload was returned.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-VE-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-VE-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Fail</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The token with expired_at equal to now was accepted and verification succeeded. Linked bug: BUG-AUTH-03.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-VE-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-VE-003</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The duplicate email caused pending cleanup and the expected error.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-VE-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-VE-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The controller created session/cookies and returned HTTP 200 without a token field.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-VE-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-VE-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">Missing token mapped to HTTP 400 and expired token mapped to HTTP 410.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-VE-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-VE-001</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;"><code>createAuthSession</code> was called, and the API returned HTTP 200 with { user } and no <code>token</code> field. This test did not assert <code>setAuthCookies</code>.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-VE-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-VE-002</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-14</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The API returned HTTP 400 with <code>{ error: 'Verification token is required' }</code>.</td></tr>
  </tbody>
</table>

## V. Reserve Book
<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-RES-001 / TC-SRV-RES-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-RES-001 / TC-SRV-RES-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Reservation created; HTTP 201 with the full reservation payload (reservationId, branchName "Main Branch", shelf, status "reserved"); UI showed the "Reserved" state.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-RES-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">`available_quantity` decreased from 2 to 1; a `borrow_book` row for (u-001, b-001, branch 1) with status `reserved` was inserted.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-RES-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">`borrow_num` incremented from 0 to 1 exactly once after the successful reservation.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-RES-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-RES-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">HTTP 400 with `MISSING_PARAMETERS`; the reservation service was not invoked.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-RES-004
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-RES-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">HTTP 400 with `MISSING_PARAMETERS`; the reservation service was not invoked.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-RES-008
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">HTTP 404 `USER_NOT_FOUND`; transaction rolled back (no COMMIT).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-RES-009
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-009</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">HTTP 400 `UNPAID_DEBT`; transaction rolled back; no inventory change.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-RES-010
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13 (initial) — re-verified 2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Fail</strong> (fixed — see BUG-01; re-run Pass)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">The reservation was accepted even though `borrow_num` was at the maximum limit; `BORROW_LIMIT_EXCEEDED` was not returned because the borrow-limit check was missing in `createReservation`. After the fix (BUG-01), the case returns HTTP 400 `BORROW_LIMIT_EXCEEDED` with rollback.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-RES-011
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-011</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">HTTP 404 `BOOK_NOT_FOUND`; transaction rolled back.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-RES-012 / TC-CTL-RES-007
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-RES-012 / TC-CTL-RES-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">HTTP 400 `BOOK_UNAVAILABLE`; transaction rolled back.</td>
    </tr>
  </tbody>
</table>


## VI. Verify PIN

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-US-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">A 6-digit PIN (e.g. 550000) was generated, status changed to `pending`, and `expiresAt` was ~180 s in the future; the PIN modal opened with a countdown.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-US-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Re-opening the PIN modal returned the same active PIN (`111111`) with its remaining expiry; no new PIN was generated (only 2 queries).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-US-002 / TC-CTL-PIN-US-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-002 / TC-CTL-PIN-US-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">HTTP 404 `RESERVATION_NOT_FOUND`; only the lookup query was executed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-US-004
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14 (initial) — re-verified 2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Fail</strong> (fixed — see BUG-02; re-run Pass)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">A PIN collision (SQLSTATE 23505) crashed the endpoint with an uncaught database error instead of retrying with a new candidate; the retry loop was missing. After the fix (BUG-02), the endpoint returns HTTP 500 `PIN_GENERATION_FAILED` after 3 attempts without crashing.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-US-005
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-005</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">A non-23505 error (`connection lost`) was rethrown and not swallowed by the retry loop.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-US-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Controller responded `{ success: true, data: { pin: "123456", expiresAt } }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-US-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">HTTP 404 `RESERVATION_NOT_FOUND` forwarded with its code and message.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-US-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">A service error without a `statusCode` defaulted to HTTP 400.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-US-004
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Unexpected service exception → HTTP 500 `INTERNAL_ERROR` with the generic message.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-US-011 / TC-CTL-PIN-US-005
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-011 / TC-CTL-PIN-US-005</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Cleanup cleared `pin`/`expired_at`, restored status `reserved`, and returned `cleaned: true`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">The borrow record matching the PIN was returned joined with user and book fields.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Lookup of an unmatched PIN returned `null`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-003 / TC-CTL-PIN-LIB-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-003 / TC-CTL-PIN-LIB-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Valid PIN returned borrower (username, gender, phone_number, email) and book (title, author, publisher, genre, price); controller responded "PIN verified successfully".</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-004 / TC-CTL-PIN-LIB-011
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-004 / TC-CTL-PIN-LIB-011</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Invalid/expired PIN → HTTP 404 `PIN_NOT_FOUND`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-005 / TC-CTL-PIN-LIB-004
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-005 / TC-CTL-PIN-LIB-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14 (initial) — re-verified 2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Fail</strong> (fixed — see BUG-03; re-run Pass)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">A PIN whose reservation belonged to branch 2 was accepted by a librarian at branch 1; `WRONG_BRANCH` was not returned because the branch check was missing in `verifyPin`. After the fix (BUG-03), HTTP 403 `WRONG_BRANCH` is returned for cross-branch PINs.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-LIB-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-LIB-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">A PIN with 3 digits was rejected with HTTP 400; the service was not called.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-009 / TC-CTL-PIN-LIB-007
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-009 / TC-CTL-PIN-LIB-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Borrowing confirmed: status `borrowed`, `due_date = NOW() + 14 days`, transaction committed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-010
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Missing borrow record → HTTP 404 `NOT_FOUND`; transaction rolled back.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-011 / TC-SRV-PIN-LIB-012 / TC-CTL-PIN-LIB-008
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-011 / TC-SRV-PIN-LIB-012 / TC-CTL-PIN-LIB-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Borrower with overdue books / missing account → HTTP 409 `USER_INELIGIBLE`; transaction rolled back.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-LIB-006
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-LIB-006</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Missing `borrow_id` on confirm-borrowing → HTTP 400; service not called.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-US-006
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-006</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">A 6-digit return PIN was generated for a borrowed book and the status changed to `pending_return`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-US-007 / TC-CTL-PIN-US-009
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-007 / TC-CTL-PIN-US-009</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Book not currently borrowed → HTTP 404 `BORROW_NOT_FOUND`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-US-008
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Database failure → HTTP 500 `INTERNAL_ERROR` (message echoed).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-US-009 / TC-CTL-PIN-US-010
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-009 / TC-CTL-PIN-US-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Cleanup cleared `pin`/`expired_at` and restored status `borrowed`; returned `true`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-US-010
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-US-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Cleanup returned `false` when no row matched `pending_return`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-US-007
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Missing `borrow_id` → HTTP 400; service not called.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-US-008
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Controller returned `{ success: true, data: { pin: "654321", expiresAt }, message: "Return PIN generated successfully" }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-US-009
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-009</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">`BORROW_NOT_FOUND` domain error forwarded with HTTP 404 and `data: null`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-US-010
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Cleanup-return-PIN controller returned `{ success: true, cleaned: true }`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-US-011
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-US-011</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Cleanup service threw → HTTP 500 returned.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-007 / TC-CTL-PIN-LIB-010
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-007 / TC-CTL-PIN-LIB-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Valid return PIN returned borrower, book, and borrowing (reserve/borrow/due dates); controller responded "Return PIN verified successfully".</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-008 / TC-CTL-PIN-LIB-011
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-008 / TC-CTL-PIN-LIB-011</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Invalid/expired return PIN → HTTP 404 `PIN_NOT_FOUND`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-014 / TC-CTL-PIN-LIB-013
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-014 / TC-CTL-PIN-LIB-013</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Clean return recorded: `return_book` row inserted, `available_quantity` +1, `borrow_num` decremented, transaction committed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-015 / TC-CTL-PIN-LIB-015
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-015 / TC-CTL-PIN-LIB-015</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Record not in `pending_return` → HTTP 404 `NOT_FOUND`; transaction rolled back.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-016
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-016</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15 (initial) — re-verified 2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Fail</strong> (fixed — see BUG-04; re-run Pass)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Confirming the return of a lost book did not record the 2× price penalty (`penaltyAmount` stayed 0, no `book_penalty` row); the lost-book branch was missing in `confirmReturn`. After the fix (BUG-04), `penaltyAmount = 100` (2 × 50) with `issue = "lost"` and a `book_penalty` row inserted.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-017
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-017</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Damaged book (`folded_pages`, price 50) → `penaltyAmount = 6`, `issue = "damaged"`, `inventoryUpdated = true`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-018
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-018</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Return after due date → `issue = "overdue"` with `penaltyAmount > 0`.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-019
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-019</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15 (initial) — re-verified 2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Fail</strong> (fixed — see BUG-05; re-run Pass)</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">After a successful return the `pin`/`expired_at` values were left in `borrow_book`, so the PIN could be reused; the clearing step was missing in `confirmReturn`. After the fix (BUG-05), `pin` and `expired_at` are set to NULL on return.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-PIN-LIB-020
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-PIN-LIB-020</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Transaction failure → `ROLLBACK` executed and the client connection was released exactly once.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-PIN-LIB-012
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-PIN-LIB-012</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Missing `borrow_id` or `branch_id` → HTTP 400; confirm-return service not called.</td>
    </tr>
  </tbody>
</table>

## VII. Create Study Group

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-CSG-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Response was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-CSG-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Response was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-CSG-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Response was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-CSG-004
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Response was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-CSG-005
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-005</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Response was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-CSG-006
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-006</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Response was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-CSG-007
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Response was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-INT-CSG-008
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-INT-CSG-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Response was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution: TC-MID-CSG-001</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-001</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-16</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The request body was normalized exactly as expected, `next()` ran once, and no error response was sent.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution: TC-MID-CSG-002</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-002</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-16</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The omitted `requirements` field became an empty array and `next()` ran once.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution: TC-MID-CSG-003</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-003</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-16</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The middleware returned the expected 400 error naming `createdBy` and did not call `next()`.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution: TC-MID-CSG-004</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-004</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-16</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">All four invalid `availId` values returned the expected 400 validation error without calling `next()`.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution: TC-MID-CSG-005</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-005</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-16</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The slash-formatted date returned the expected `YYYY-MM-DD` validation error and did not call `next()`.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">Test Execution: TC-MID-CSG-006</th></tr></thead>
  <tbody>
    <tr><td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td><td style="vertical-align: top;"><strong>TC-MID-CSG-006</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td><td style="vertical-align: top;">2026-08-16</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;"><strong>Pass</strong></td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">Six non-empty requirements returned the expected five-item-limit error and did not call `next()`.</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-CSG-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-CSG-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Execution was successfully completed without errors.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-CSG-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-CSG-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Execution was successfully completed without errors.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-CSG-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-CSG-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Execution was successfully completed without errors.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-CTL-CSG-004
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-CTL-CSG-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Execution was successfully completed without errors.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Output was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Output was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Output was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-004
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Output was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-005
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-005</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Output was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-006
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-006</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Output was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-007
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Output was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-008
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">The occupied slot was rejected with `SLOT_UNAVAILABLE` (409) before any reservation or study group insert.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-009
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-009</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Output was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-010
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Output was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-011
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-011</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Output was exactly as expected.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-CSG-012
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-CSG-012</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong>Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Output was exactly as expected.</td>
    </tr>
  </tbody>
</table>

## VIII. AI Recommendation

*No execution records were supplied for this feature yet — add them here once the AI Recommendation test cases have been executed (no matching content found in the uploaded source files).*
