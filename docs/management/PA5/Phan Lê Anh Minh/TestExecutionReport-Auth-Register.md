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
  - [II. Execution Results](#ii-execution-results)
    - [1. Use Case 1: Registration](#1-use-case-1-registration)
    - [2. Use Case 2: Email Verification](#2-use-case-2-email-verification)
    - [3. Use Case 3: Resend Verification](#3-use-case-3-resend-verification)
    - [4. Use Case 4: Google OAuth](#4-use-case-4-google-oauth)

## I. Test Execution Overview

The `test_auth_register` Vitest was executed from `src/server` using:

```bash
npm run test:auth:register
```

The run discovered 12 test files and executed 27 cases. Database access, mail delivery, password hashing, and authentication sessions were isolated through mocks; Google OAuth behavior was isolated through Passport mocks. Controller tests mock <code>setAuthCookies</code> where it is asserted, while API-level cookie handling only sets local response headers and performs no network operation. The register API issued 2 requests against a limit of 5 per 60 minutes, and the resend API issued 2 requests against a limit of 3 per 15 minutes. Each integration file creates its own Express app instance, so limiter state does not accumulate across files. Neither <code>registerLimiter</code> nor <code>recoveryLimiter</code> was mocked, and no HTTP 429 response occurred.

- **Execution date:** 2026-08-14
- **Test files:** 12
- **Test cases:** 27
- **Passed:** 23
- **Failed:** 4
- **Result:** 3 failed files and 9 passed files

## II. Execution Results

*Note: Each result records the test case ID, execution date, Pass/Fail status, and actual result. Failed results are linked to the corresponding bug report.*

### 1. Use Case 1: Registration

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

### 2. Use Case 2: Email Verification

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

### 3. Use Case 3: Resend Verification

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

### 4. Use Case 4: Google OAuth

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
