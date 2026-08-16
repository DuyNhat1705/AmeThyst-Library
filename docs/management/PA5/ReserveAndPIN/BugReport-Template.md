# Bug Report

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026

Performed by: Nguyễn Nhựt Huy | Reviewed by: [Name] | Edited by: [Name]

## Table of Contents

- [Bug Report](#bug-report)
  - [Table of Contents](#table-of-contents)
  - [I. Test Summary](#i-test-summary)
  - [II. Bug Reports](#ii-bug-reports)

## I. Test Summary

- **Number of features tested:** 5
- **Number of test cases:** 50
- **Number of passed test cases:** 50 (initial run: 45 passed, 5 failed; all 5 defects fixed and re-verified in the 2026-08-16 regression run)
- **Number of failed test cases per feature:**
  - Reserve a Book: 1
  - Generate Pickup PIN: 1
  - Verify Pickup PIN and Confirm Borrowing: 1
  - Generate Return PIN: 0
  - Verify Return PIN and Confirm Return: 2

## II. Bug Reports

*Note: This report documents all defects discovered during the testing process. Each of the 5 failed test cases is linked to at least one bug report below. All reported bugs were fixed and re-verified on 2026-08-16 (final regression run: 50/50 Pass).*

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Bug Report: BUG-01
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td>
      <td style="vertical-align: top;"><strong>BUG-01</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Test Case ID</td>
      <td style="vertical-align: top;">TC-SRV-RES-010</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">The borrow limit is not enforced during reservation. A user whose `borrow_num` equals `MAX_BORROW_LIMIT` could still reserve another book, so `BORROW_LIMIT_EXCEEDED` was never returned.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Set user `u-001`'s `borrow_num` to `MAX_BORROW_LIMIT`.</li>
          <li>Send `POST /api/library/reserve` with a valid book and branch.</li>
          <li>Observe that the reservation succeeds and the inventory is decremented.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Result</td>
      <td style="vertical-align: top;">HTTP 400 `BORROW_LIMIT_EXCEEDED` ("You have reached the maximum borrow limit of {limit} books") and the transaction is rolled back.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">The reservation was accepted (HTTP 201), `available_quantity` was decremented, and `borrow_num` was incremented beyond the limit.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td>
      <td style="vertical-align: top;">High</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;">Fixed (re-verified 2026-08-16)</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Bug Report: BUG-02
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td>
      <td style="vertical-align: top;"><strong>BUG-02</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Test Case ID</td>
      <td style="vertical-align: top;">TC-SRV-PIN-US-004</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">A PIN collision during pickup-PIN generation crashed the endpoint with an uncaught database unique-violation (SQLSTATE 23505) instead of retrying with a new random candidate.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Force every generated candidate PIN to collide with an existing active PIN.</li>
          <li>Click "View PIN" on a reserved book card.</li>
          <li>Observe an uncaught duplicate-key error / 500 crash.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Result</td>
      <td style="vertical-align: top;">Retry generation up to 3 times; if all attempts collide, return HTTP 500 `PIN_GENERATION_FAILED` ("Failed to generate unique PIN after 3 attempts") without crashing.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">The first duplicate-key error propagated out of the service (uncaught), crashing the request with a raw database error.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td>
      <td style="vertical-align: top;">High</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;">Fixed (re-verified 2026-08-16)</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Bug Report: BUG-03
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td>
      <td style="vertical-align: top;"><strong>BUG-03</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Test Case ID</td>
      <td style="vertical-align: top;">TC-SRV-PIN-LIB-005 / TC-CTL-PIN-LIB-004</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">A librarian at one branch could verify a pickup PIN whose reservation belonged to another branch; the branch match was never checked, so `WRONG_BRANCH` was never returned.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Generate a pickup PIN for a reservation with `branch_id = 2`.</li>
          <li>Log in as a librarian whose `branch_id = 1`.</li>
          <li>Submit the PIN to `verifyPin`; observe that verification succeeds.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Result</td>
      <td style="vertical-align: top;">HTTP 403 `WRONG_BRANCH` ("You have arrived at the wrong book borrowing branch.") when the reservation branch differs from the librarian's branch.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">The cross-branch PIN was accepted and borrower/book details were returned.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td>
      <td style="vertical-align: top;">High</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;">Fixed (re-verified 2026-08-16)</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Bug Report: BUG-04
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td>
      <td style="vertical-align: top;"><strong>BUG-04</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Test Case ID</td>
      <td style="vertical-align: top;">TC-SRV-PIN-LIB-016</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">Confirming the return of a lost book did not charge the 2× price penalty; no `book_penalty` row was inserted and `penaltyAmount` stayed 0.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Start with a borrow record in `pending_return` whose book price is 50.</li>
          <li>Call `confirmReturn` with `is_lost = true` (lost book).</li>
          <li>Observe `penaltyAmount = 0` and no `book_penalty` row.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Result</td>
      <td style="vertical-align: top;">A `book_penalty` row of 2 × 50 = 100 is inserted; result reports `penaltyAmount = 100`, `issue = "lost"`, `inventoryUpdated = false`.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">No penalty recorded; `penaltyAmount = 0`, `issue` was null and the lost-book path was silently skipped.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td>
      <td style="vertical-align: top;">Medium</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;">Fixed (re-verified 2026-08-16)</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Bug Report: BUG-05
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td>
      <td style="vertical-align: top;"><strong>BUG-05</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Test Case ID</td>
      <td style="vertical-align: top;">TC-SRV-PIN-LIB-019</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">After a successful return, the `pin` and `expired_at` values were not cleared from the `borrow_book` row, so the return PIN remained reusable.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Generate a return PIN for a borrowed book (status `pending_return`).</li>
          <li>Confirm the return via `confirmReturn`.</li>
          <li>Query `borrow_book`; the `pin`/`expired_at` columns still contain the previous values.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Result</td>
      <td style="vertical-align: top;">`pin` and `expired_at` are set to NULL on the confirmed return so the PIN cannot be reused.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">The PIN remained stored and could be used again against the same record.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td>
      <td style="vertical-align: top;">Medium</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;">Fixed (re-verified 2026-08-16)</td>
    </tr>
  </tbody>
</table>