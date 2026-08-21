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
  - [I. Test Summary](#i-test-summary)
  - [II. Bug Reports](#ii-bug-reports)

## I. Test Summary

- **Number of features tested:** 4
- **Number of test cases:** 27
- **Number of passed test cases:** 25
- **Number of failed test cases:** 2
- **Number of reported bugs:** 2
- **Number of failed test cases per feature:**
  - Registration: 1
  - Email Verification: 0
  - Resend Verification: 1
  - Google OAuth: 0

## II. Bug Reports

*Note: Each failed test case is linked to one open bug report. The current execution contains two bugs: BUG-AUTH-01 and BUG-AUTH-02.*

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Bug Report: BUG-AUTH-01
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td>
      <td style="vertical-align: top;"><strong>BUG-AUTH-01</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Test Case ID</td><td style="vertical-align: top;">TC-SRV-REG-003</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Initial registration commits pending data before verification email delivery succeeds.</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Configure successful database operations.</li>
          <li>Call registerUser with valid data.</li>
          <li>Make the verification mailer reject.</li>
          <li>Inspect the final pending-registration state.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Result</td><td style="vertical-align: top;">Failed initial delivery does not leave newly committed pending data.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The pending record remains committed although the email was not delivered.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td><td style="vertical-align: top;">High</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;">Open</td></tr>
  </tbody>
</table>

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Bug Report: BUG-AUTH-02
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Bug ID</td>
      <td style="vertical-align: top;"><strong>BUG-AUTH-02</strong></td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Linked Test Case ID</td><td style="vertical-align: top;">TC-SRV-RV-003</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Description</td><td style="vertical-align: top;">Resend verification replaces the previous token before successful email delivery is confirmed.</td></tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Steps to Reproduce</td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li>Create a pending registration with a valid token and TTL.</li>
          <li>Configure the replacement verification mailer to reject.</li>
          <li>Call the resend service.</li>
          <li>After the rejection, inspect the stored token and TTL.</li>
        </ol>
      </td>
    </tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Expected Result</td><td style="vertical-align: top;">The previous token and TTL remain usable when replacement email is not delivered.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actual Result</td><td style="vertical-align: top;">The replacement token and TTL are committed before delivery fails.</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Severity</td><td style="vertical-align: top;">High</td></tr>
    <tr><td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Status</td><td style="vertical-align: top;">Open</td></tr>
  </tbody>
</table>
