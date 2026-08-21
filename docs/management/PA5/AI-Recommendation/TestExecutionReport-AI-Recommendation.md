# Test Execution Report

    Project: Modern Library Management System (LIMA)
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026

Performed by: Trần Lê Hoàng Gia | Reviewed by: Vũ Duy Nhất | Edited by: Trần Lê Hoàng Gia

## Table of Contents

- [Test Execution Report](#test-execution-report)
  - [Table of Contents](#table-of-contents)
  - [I. Test Execution Overview](#i-test-execution-overview)
    - [Execution Summary Table](#execution-summary-table)
  - [II. Execution Results](#ii-execution-results)
    - [1. Use Case 1: View Recommended Book (UC-AIR-01)](#1-use-case-1-view-recommended-book-uc-air-01)
    - [2. Use Case 2: Reset AI Recommend (UC-AIR-02)](#2-use-case-2-reset-ai-recommend-uc-air-02)

---

## I. Test Execution Overview

The automated integration test suite `recommendation.services.spec.mjs` for the **AI Personalized Book Recommendation Engine** was executed using the **Vitest** test runner (`v4.1.10`) under Node.js `v20.11.0` in an isolated test environment with mocked database, graph database driver, and TCP micro-ranker socket dependencies.

- **Target Services**: `recommendation.services.mjs` & `recommendation.controllers.mjs`
- **Use Cases Covered**: `UC-AIR-01` (View Recommended Book) & `UC-AIR-02` (Reset AI Recommend)
- **Execution Period**: August 12, 2026 – August 16, 2026
- **Lead QA Engineer**: Trần Lê Hoàng Gia

### Execution Summary Table

| Total Test Cases | Passed | Failed | Pass Rate | Total Execution Time | Target SLA |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **10** | **10** | **0** | **100%** | **684ms** | $\le 1000\text{ms}$ |

---

## II. Execution Results

### 1. Use Case 1: View Recommended Book (UC-AIR-01)

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REC-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-12</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong style="color: #16a34a;">Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Returned 15 items; <code>pool.query</code> executed 1 time total across dual lookups (~4ms). Second invocation served directly from in-memory Map cache.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REC-003
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-003</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong style="color: #16a34a;">Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Database pool connection exception caught gracefully; returned 15 fallback catalog books with default <code>score: 0.0</code> (~8ms). Zero unhandled rejections.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REC-004
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-004</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-13</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong style="color: #16a34a;">Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">TCP Socket connected to mock server on port 5999; payload framed and parsed; candidates re-ranked correctly by GCN score (~42ms).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REC-005
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-005</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong style="color: #16a34a;">Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Primary Memgraph Cypher query returned 5 candidates; secondary cold-start Cypher query automatically invoked (<code>session.run</code> call count = 2, ~35ms).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REC-006
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-006</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-14</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong style="color: #16a34a;">Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Candidate <code>stock-book-0</code> with <code>global_available_copies: 0</code> was successfully pruned from final array by <code>adjustCandidateScores</code> (~18ms).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REC-007
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-007</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong style="color: #16a34a;">Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Raw GCN score 0.90 with 2 skipped impressions evaluated to exactly 0.38025 (+/- 1e-4) (~12ms). Floating point precision assertion passed.</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REC-008
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-008</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-15</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong style="color: #16a34a;">Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Initial 1 graph candidate was supplemented with 14 general catalog books to strictly fulfill the 15-item quota (~24ms).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REC-009
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-009</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong style="color: #16a34a;">Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">PostgreSQL click record updated (<code>is_clicked = TRUE</code>), memory cache evicted, and <code>syncRecommendationClick</code> spied with ISO timestamp (~29ms).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REC-010
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong style="color: #16a34a;">Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">REST payload correctly formatted into <code>historyBased</code> (15 items) and <code>trending</code> (6 items) arrays with HTTP 200 status (~15ms).</td>
    </tr>
  </tbody>
</table>

---

### 2. Use Case 2: Reset AI Recommend (UC-AIR-02)

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REC-002
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-002</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-12</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong style="color: #16a34a;">Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">Cache successfully evicted; subsequent <code>getUserRecommendations</code> query count incremented from 1 to 2 (~6ms).</td>
    </tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Test Execution: TC-SRV-REC-010
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Test Case ID</td>
      <td style="vertical-align: top;"><strong>TC-SRV-REC-010</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Execution Date</td>
      <td style="vertical-align: top;">2026-08-16</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;"><strong style="color: #16a34a;">Pass</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">REST payload correctly formatted into <code>historyBased</code> (15 items) and <code>trending</code> (6 items) arrays with HTTP 200 status (~15ms).</td>
    </tr>
  </tbody>
</table>
