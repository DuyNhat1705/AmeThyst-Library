# Bug Report

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026

Performed by: Phan Lê Anh Minh | Reviewed by: Vũ Duy Nhất | Edited by: Phan Lê Anh Minh


## Table of Contents

- [Bug Report](#bug-report)
  - [Table of Contents](#table-of-contents)
  - [I. Test and Defect Summary](#i-test-and-defect-summary)
  - [II. Failed-Test Traceability](#ii-failed-test-traceability)
  - [III. Bug Reports](#iii-bug-reports)

## I. Test and Defect Summary

- **Features tested:** 4
- **Test cases:** 40
- **Passed:** 35
- **Failed:** 5
- **Bug reports:** 5
- **Failed tests by feature:** Registration 2; Email Verification 0; Resend Verification 3; Google OAuth 0.

Each failed test case has its own bug report. The five failures therefore map one-to-one to five sequential Bug IDs: `BUG-AUTH-01` through `BUG-AUTH-05`.

## II. Failed-Test Traceability

| No. | Failed Test Case | Feature | Layer | Spec Kit Created | Reviewed | Reviewed By | Expected Result Adjusted | Bug Report |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | TC-SRV-REG-003 | Registration | Service | Yes | Yes | Phan Lê Anh Minh | No | BUG-AUTH-01 |
| 2 | TC-INT-REG-005 | Registration | Integration | No | Yes | Phan Lê Anh Minh | No | BUG-AUTH-02 |
| 3 | TC-SRV-RV-003 | Resend Verification | Service | Yes | Yes | Phan Lê Anh Minh | Yes | BUG-AUTH-03 |
| 4 | TC-INT-RV-003 | Resend Verification | Integration | No | Yes | Phan Lê Anh Minh | No | BUG-AUTH-04 |
| 5 | TC-INT-RV-004 | Resend Verification | Integration | No | Yes | Phan Lê Anh Minh | No | BUG-AUTH-05 |

The numbering follows the failed-test order in the execution evidence. All five failed cases are reviewed by Phan Lê Anh Minh. Full Expected Result adjustment text and reasons remain in the Test Cases document.

## III. Bug Reports

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">BUG-AUTH-01 — Pending registration remains after initial email failure</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td><td><strong>BUG-AUTH-01</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Failed Test Case</td><td>TC-SRV-REG-003</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td>The registration service commits a new pending row before verification-email delivery succeeds and does not remove it when delivery fails.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td><td><ol><li>Arrange a valid unused registration.</li><li>Allow pending-user persistence to commit.</li><li>Make verification-email delivery reject.</li><li>Inspect the pending-registration state after the service returns the delivery error.</li></ol></td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result</td><td>The typed delivery error is returned and no newly committed unusable pending registration remains.</td></tr>
<tr><td style="background-color: #fee2e2; font-weight: bold; vertical-align: top;">Actual Result</td><td>The typed delivery error is returned, but the newly inserted pending row remains committed.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Impact</td><td>Failed delivery leaves stale state for an account whose verification message was never received.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td><td>High</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td>Open</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">BUG-AUTH-02 — Immediate registration retry is blocked after delivery failure</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td><td><strong>BUG-AUTH-02</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Failed Test Case</td><td>TC-INT-REG-005</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td>After an initial registration email fails, an immediate retry is treated as an active pending registration and does not create or deliver a fresh token.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td><td><ol><li>POST a valid unused registration and make its mail delivery reject.</li><li>Confirm the first request returns HTTP 502.</li><li>Immediately POST the same registration again.</li><li>Inspect the second response, token state, and mailer call count.</li></ol></td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result</td><td>The retry creates a fresh pending token and performs a second delivery attempt.</td></tr>
<tr><td style="background-color: #fee2e2; font-weight: bold; vertical-align: top;">Actual Result</td><td>The retry returns the generic HTTP 201 response, but no fresh token is issued and the mailer runs only once across both requests.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Impact</td><td>A user cannot retry registration successfully until the stale pending row expires.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td><td>High</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td>Open</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">BUG-AUTH-03 — Resend service commits replacement before delivery succeeds</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td><td><strong>BUG-AUTH-03</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Failed Test Case</td><td>TC-SRV-RV-003</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td>The resend service commits the replacement token and TTL before confirming that the replacement verification email was delivered.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td><td><ol><li>Arrange a pending row with an active token and TTL.</li><li>Call the resend service with delivery held unresolved.</li><li>Inspect committed state when the mailer starts.</li><li>Reject delivery and inspect the compensated final state.</li></ol></td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result</td><td>The previous token and TTL remain committed until replacement delivery succeeds.</td></tr>
<tr><td style="background-color: #fee2e2; font-weight: bold; vertical-align: top;">Actual Result</td><td>The mailer observes the undelivered replacement already committed; compensation restores the previous values only after delivery rejects.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Impact</td><td>The pending registration temporarily references a verification token that the user has not received.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td><td>High</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td>Open</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">BUG-AUTH-04 — Resend API exposes replacement state at the delivery boundary</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td><td><strong>BUG-AUTH-04</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Failed Test Case</td><td>TC-INT-RV-003</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td>The resend API exposes the undelivered replacement token as persisted state while email delivery is in progress.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td><td><ol><li>Start a resend request for an active pending registration.</li><li>Hold the mail delivery promise unresolved.</li><li>Inspect persisted token and TTL at the delivery boundary.</li><li>Reject delivery and inspect the HTTP response and final state.</li></ol></td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result</td><td>Persisted state remains on the previous token throughout delivery; a failed delivery returns HTTP 502 without changing it.</td></tr>
<tr><td style="background-color: #fee2e2; font-weight: bold; vertical-align: top;">Actual Result</td><td>The request eventually returns HTTP 502 and restores the old state, but the persisted token at the delivery boundary is the undelivered replacement.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Impact</td><td>Concurrent requests can observe inconsistent pending-registration state before compensation finishes.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td><td>High</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td>Open</td></tr>
</tbody></table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
<thead><tr style="background-color: #1e3a8a; color: #ffffff;"><th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">BUG-AUTH-05 — Previous verification token becomes unusable during failed resend</th></tr></thead>
<tbody>
<tr><td width="24%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td><td><strong>BUG-AUTH-05</strong></td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Failed Test Case</td><td>TC-INT-RV-004</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td>The previously valid verification token becomes unusable while a resend delivery is pending, even when that replacement delivery later fails.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td><td><ol><li>Create a pending registration with an active token.</li><li>Start resend and hold replacement delivery unresolved.</li><li>Submit the previous token to <code>/auth/verify-email</code>.</li><li>Reject resend delivery and inspect both responses and final state.</li></ol></td></tr>
<tr><td style="background-color: #fff7ed; font-weight: bold; vertical-align: top;">Expected Result</td><td>The previous token remains verifiable while resend is in progress; verification returns HTTP 200 and failed resend does not invalidate it.</td></tr>
<tr><td style="background-color: #fee2e2; font-weight: bold; vertical-align: top;">Actual Result</td><td>Verification with the previous token returns HTTP 400 while resend is pending; the resend later returns HTTP 502 and restores the old token.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Impact</td><td>A user following a valid earlier link during an in-flight resend can be incorrectly rejected.</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td><td>High</td></tr>
<tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td>Open</td></tr>
</tbody></table>
