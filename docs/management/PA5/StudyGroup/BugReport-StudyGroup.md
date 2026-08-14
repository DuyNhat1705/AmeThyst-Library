# Bug Report

    Project: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering
    Group ID: 03
    Group Name: AmeThyst
    Assignment: PA5-2026

Performed by: Nguyễn Lê Hoàng Khải | Reviewed by: Vũ Duy Nhất | Edited by: All members

## Table of Contents

- [I. Test Summary](#i-test-summary)
- [II. Bug Reports](#ii-bug-reports)

## I. Test Summary

- **Number of features tested:** 1 (Study Group Management)
- **Number of test cases:** 10
- **Number of passed test cases:** 9
- **Number of failed test cases per feature:**
  - Study Group Management: 1

## II. Bug Reports

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Bug Report: BUG-SG-001
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td>
      <td style="vertical-align: top;"><strong>BUG-SG-001</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Test Case ID</td>
      <td style="vertical-align: top;">TC-SRV-SG-004</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td>
      <td style="vertical-align: top;">The system fails to reject duplicate join requests. A user can bypass the check and create multiple pending requests for the same study group.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>User submits a join request to a study group.</li>
          <li>User intercepts the request or submits another request immediately before the first is processed.</li>
          <li>Check the database for the user's participation status.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Result</td>
      <td style="vertical-align: top;">The system should throw a `DUPLICATE_PARTICIPATION` conflict error and only allow one pending request.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td>
      <td style="vertical-align: top;">The system successfully processes both requests, resulting in duplicate active participations for the same user.</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td>
      <td style="vertical-align: top;">Medium</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td>
      <td style="vertical-align: top;">Open</td>
    </tr>
  </tbody>
</table>
