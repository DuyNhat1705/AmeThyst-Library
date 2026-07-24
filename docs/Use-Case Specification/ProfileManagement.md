# Use-Case Specification: Profile Management

    Project Name: Modern Library Management System
    Course: CS300 – CSC13002 – Introduction to Software Engineering 
    Group ID: 03
    Group Name: Amethyst
    Assignment: PA3-2026
    Document Identifier: NGLP-SRS-PROF-001
    Version: 1.1

Performed by: Trần Lê Hoàng Gia, Phan Lê Anh Minh | Reviewed by: All Members | Edited by: Trần Lê Hoàng Gia, Phan Lê Anh Minh

---

## Revision History

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 20-Jul-2026 | 1.1 | Profile Management Use case specification(RUP specification layout). | Anh Minh, Hoang Gia |

---

## Table of Contents
1. [Regulation](#regulation)
2. [Use case diagram](#use-case-diagram)
3. [UC-PROF-01: View Self Profile](#uc-prof-01-view-self-profile)
4. [UC-PROF-02: Edit Profile](#uc-prof-02-edit-profile)
5. [UC-PROF-03: Change Avatar](#uc-prof-03-change-avatar)
6. [UC-PROF-04: Change Password](#uc-prof-04-change-password)


---

## Regulation
```mermaid
flowchart RL
    L1(["<center>{abstract} <br> Logged user</center>"])

    L2_1([Admin])
    L2_2([User])
    L2_3([Librarian])

    L3(["<center>{abstract} <br> General user</center>"])

    L4_1([Guest])
    L4_2([Admin])
    L4_3([User])
    L4_4([Librarian])

    L2_1 --> L1
    L2_2 --> L1
    L2_3 --> L1
 
    L4_1 --> L3
    L4_2 --> L3
    L4_3 --> L3
    L4_4 --> L3

    
```

---

## Use case diagram

```mermaid
flowchart LR
    %% Actors
    ActorLeft(["<center>{abstract} <br> logged user</center>"])
    ActorRight(["<center>&lt&lt; service &gt&gt; <br> Storage Service</center>"]) 

    %% System Boundary
    subgraph ProfileManagement [Profile Management]
        UC1((View Self Profile))
        UC2((Edit Profile))
        UC3((Change Avatar))
        UC4((Change Password))
    end
    
	ActorLeft ~~~~~ ProfileManagement ~~~ ActorRight

    %% Relationships
    ActorLeft --- UC1
    ActorLeft --- UC4
    
    UC2 -. "<< extend >>" .-> UC1
    UC3 -. "<< extend >>" .-> UC1
    
    UC3  --- ActorRight 
   
    %% Styling to make it clean
    style ProfileManagement fill:#fff,stroke:#333,stroke-width:2px

```

---
## UC-PROF-01: View Self Profile

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Use Case: View Self Profile
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Use Case ID</td>
      <td style="vertical-align: top;"><strong>UC-PROF-01</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Brief Description</td>
      <td style="vertical-align: top;">
        Allows an authenticated user to view their personal profile page dashboard, showcasing their account metadata, current avatar, and personal details.
        <br><em>(Includes / Extends: <strong>Extended by Edit Profile and Change Avatar (at Step 5).</strong>)</em>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actor(s)</td>
      <td style="vertical-align: top;">Logged user</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Preconditions</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
          <li><strong>Verified Authentication State:</strong> The user has successfully authenticated and holds an active session token.</li>
          <li><strong>Workspace Navigation Focus:</strong> The user has navigated to the account settings layout area.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Flow of Events<br><span style="font-weight: normal; font-size: 12px; color: #64748b;">(Basic Flow)</span></td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li><strong>[Actor Action]:</strong> The user clicks on the "My Profile" item link within the primary navigation menu layout.</li>
          <li><strong>[Data Processing]:</strong> The system fetches the corresponding profile record metrics from the user database partition.</li>
          <li><strong>[Display Result]:</strong> The system maps and populates user data fields (Display Name, Account Email, Registration Date) into the view interface template.</li>
          <li><strong>[Display Result]:</strong> The system requests the active profile image thumbnail link to render the user's avatar image block.</li>
          <li><strong>[System Response]:</strong> The system exposes extension interface interaction triggers ("Edit Profile" and "Change Avatar" button widgets).</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Alternative / Exception Flows</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
          <li style="margin-bottom: 8px;">
            <strong>Database Partition Retrieval Failure (Step 2):</strong> If profile data records fail to resolve due to localized database connection drops:
            <ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 20px;">
              <li>The system halts the dashboard layout compilation steps immediately.</li>
              <li>The system overlays a persistent error component banner layout: "Profile details are temporarily offline."</li>
            </ol>
            <span style="font-size: 13px; color: #475569;"><strong>Postcondition (Alternative Flow):</strong> The screen display shows a structural retrieval error indicator; no empty form entry containers open.</span>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Postconditions</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Dashboard UI Component Staging:</strong> The user's complete private profile view profile template renders securely onto the client interface screen.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Special Requirements</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Sensitive Session Token Masking:</strong> The profile dashboard viewport screen must obscure highly sensitive configuration values (such as underlying token identifiers) from plain view elements.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Extension Points</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Edit Profile:</strong> Location inside event flow: Exposing extension interface triggers (Step 5).</li>
          <li><strong>Change Avatar:</strong> Location inside event flow: Exposing extension interface triggers (Step 5).   ---</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Prototype Screen</td>
      <td style="vertical-align: top;">
        None
      </td>
    </tr>
  </tbody>
</table>

---

## UC-PROF-02: Edit Profile

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Use Case: Edit Profile
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Use Case ID</td>
      <td style="vertical-align: top;"><strong>UC-PROF-02</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Brief Description</td>
      <td style="vertical-align: top;">
        Extends the basic profile view dashboard by converting plain-text data fields into dynamic, editable input forms to let users update their personal details.
        <br><em>(Includes / Extends: <strong>Extends UC-PROF-01 (View Self Profile) — extension point: User triggers the active "Edit Profile" control button link within the profile dashboard view layout.</strong>)</em>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actor(s)</td>
      <td style="vertical-align: top;">Logged user</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Preconditions</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
          <li><strong>Active Base Context Display:</strong> The base use case `View Self Profile (UC-PROF-01)` must be currently active and rendering data on screen.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Flow of Events<br><span style="font-weight: normal; font-size: 12px; color: #64748b;">(Basic Flow)</span></td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li><strong>[Actor Action]:</strong> The user clicks the "Edit Profile" action button component widget.</li>
          <li><strong>[System Response]:</strong> The system toggles the dashboard interface layout state variables, swapping static display texts for live text input boxes.</li>
          <li><strong>[Actor Action]:</strong> The user modifies targeted data entry string values (e.g., changes their Display Name or Bio summary details).</li>
          <li><strong>[Actor Action]:</strong> The user clicks the "Save Changes" configuration submit button.</li>
          <li><strong>[Data Processing]:</strong> The system parses inputs, sanitizes string objects, and executes a database update sequence transaction against the target user data row columns.</li>
          <li><strong>[Display Result]:</strong> The system switches the view screen state criteria back to the standard text-display layout mode and surfaces a brief confirmation success toast banner notice.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Alternative / Exception Flows</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
          <li style="margin-bottom: 8px;">
            <strong>Lexical Parsing Constraints Rejection (Step 5):</strong> If input text parsing rules flag validation constraint breakages (e.g. illegal structural characters in name elements):
            <ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 20px;">
              <li>The system prevents data persistence steps.</li>
              <li>The system returns visual focus to the problem field element and displays explicit inline error tips.</li>
            </ol>
            <span style="font-size: 13px; color: #475569;"><strong>Postcondition (Alternative Flow):</strong> Database table values remain locked to historical state values; the input edit layout remains active pending string correction actions.</span>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Postconditions</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Global Variable Synchronization:</strong> Revised personal metadata values write securely to production databases and update globally across active user session viewports.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Special Requirements</td>
      <td style="vertical-align: top;">
        None
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Extension Points</td>
      <td style="vertical-align: top;">
        None
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Prototype Screen</td>
      <td style="vertical-align: top;">
        <img src="Img/Profile/uc-your-profile.jfif" alt="alt text" style="max-width: 100%; height: auto; border: 1px solid #cbd5e1; padding: 4px; border-radius: 4px;">
      </td>
    </tr>
  </tbody>
</table>

---

## UC-PROF-03: Change Avatar

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Use Case: Change Avatar
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Use Case ID</td>
      <td style="vertical-align: top;"><strong>UC-PROF-03</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Brief Description</td>
      <td style="vertical-align: top;">
        Extends the base profile display context to allow users to upload, process, and attach a customized picture graphic to act as their system identity avatar icon.
        <br><em>(Includes / Extends: <strong>Extends UC-PROF-01 (View Self Profile) — extension point: User selects the profile picture thumbnail element or clicks the "Change Avatar" button action link.</strong>)</em>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actor(s)</td>
      <td style="vertical-align: top;">Logged user</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Preconditions</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
          <li><strong>Parent Workspace Alignment:</strong> The user is currently interacting with the visual dashboard space inside `UC-PROF-01`.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Flow of Events<br><span style="font-weight: normal; font-size: 12px; color: #64748b;">(Basic Flow)</span></td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li><strong>[Actor Action]:</strong> The user clicks on the "Change Avatar" image editing control button widget.</li>
          <li><strong>[System Response]:</strong> The system triggers a local device filesystem upload dialogue wrapper window prompt.</li>
          <li><strong>[Actor Action]:</strong> The user selects a target image file object and approves submission steps.</li>
          <li><strong>[Data Processing]:</strong> The system validates the asset metadata properties client-side to verify file configuration boundaries match structural rules.</li>
          <li><strong>[Data Processing]:</strong> The system establishes an API communication uplink tunnel to stream the binary image payload object directly out to the external secondary **Storage Service**.</li>
          <li><strong>[Data Processing]:</strong> The **Storage Service** buffers the upload stream, saves the graphic file inside optimized media asset buckets, and passes a unique public reference image URL string parameter back down to the application server.</li>
          <li><strong>[Data Processing]:</strong> The system updates the user's base record rows inside the database, mapping the `avatar_url` coordinate pointer value to the fresh link string.</li>
          <li><strong>[Display Result]:</strong> The system refreshes image element sources on screen to display the updated profile avatar graphic asset instantly.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Alternative / Exception Flows</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
          <li style="margin-bottom: 8px;">
            <strong>File Volume Size Exception (Step 4):</strong> If the selected graphic object file passes boundary parameters for maximum size limits (e.g., file sizes exceed 5MB benchmarks):
            <ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 20px;">
              <li>The system halts processing loops immediately.</li>
              <li>The system alerts users via popup text blocks: "File exceeds maximum size limits."</li>
            </ol>
            <span style="font-size: 13px; color: #475569;"><strong>Postcondition (Alternative Flow):</strong> Network payloads are blocked from firing; user profile configuration records undergo zero status value changes.</span>
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Invalid MIME Asset Format (Step 4):</strong> If the file parsing script flags unacceptable format MIME types (e.g., user uploads raw text documents instead of JPEG/PNG engines):
            <ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 20px;">
              <li>The system blocks transfer tasks completely.</li>
              <li>The system prints operational warning instructions to the client panel interface.</li>
            </ol>
            <span style="font-size: 13px; color: #475569;"><strong>Postcondition (Alternative Flow):</strong> The system drops data components instantly; upload form workspaces reset back to baseline resting defaults.</span>
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Storage Pipeline Outage Timeout (Step 6):</strong> If the connection interface endpoint linking application nodes to the external Storage Service encounters latency drops or timeouts:
            <ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 20px;">
              <li>The system drops active transaction staging states.</li>
              <li>The system clears target memory buffer pools and fires an application interface error notice.</li>
            </ol>
            <span style="font-size: 13px; color: #475569;"><strong>Postcondition (Alternative Flow):</strong> Media record rows within system database tables maintain original data entries; image displays roll back parameters to current images.</span>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Postconditions</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Cloud Asset Mapping Commitment:</strong> Old media file references drop, target accounts link securely to new cloud image URLs, and graphics update across application headers.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Special Requirements</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Asynchronous Image Compressing Rules:</strong> Upload pipelines must run optimized image compressing scripts asynchronously to crop, square, and scale uploaded source files down to standardized thumbnail dimensions before cloud transmission steps.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Extension Points</td>
      <td style="vertical-align: top;">
        None
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Prototype Screen</td>
      <td style="vertical-align: top;">
        <img src="Img/Profile/uc-upload-avatar.jfif" alt="alt text" style="max-width: 100%; height: auto; border: 1px solid #cbd5e1; padding: 4px; border-radius: 4px;">
        <br>
        <img src="Img/Profile/uc-crop-avatar.jfif" alt="Change Avatar Prototype" style="max-width: 100%; height: auto; border: 1px solid #cbd5e1; padding: 4px; border-radius: 4px;">
      </td>
    </tr>
  </tbody>
</table>

---

## UC-PROF-04: Change Password

<table width="100%" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; border: 1px solid #d1d5db; margin-bottom: 20px;">
  <thead>
    <tr style="background-color: #1e3a8a; color: #ffffff;">
      <th colspan="2" style="text-align: left; padding: 12px; font-size: 16px;">
        Use Case: Change Password
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="22%" style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Use Case ID</td>
      <td style="vertical-align: top;"><strong>UC-PROF-04</strong></td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Brief Description</td>
      <td style="vertical-align: top;">
        Enables a logged-in system member to securely re-verify their identity credentials and initialize a password modification procedure to overwrite existing authentication keys.
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Actor(s)</td>
      <td style="vertical-align: top;">Logged user</td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Preconditions</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
          <li><strong>Validated Configuration Entry Path:</strong> The user maintains verified access status parameters and has loaded the security configurations panel menu space.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Flow of Events<br><span style="font-weight: normal; font-size: 12px; color: #64748b;">(Basic Flow)</span></td>
      <td style="vertical-align: top;">
        <ol style="margin: 0; padding-left: 20px; line-height: 1.6;">
          <li><strong>[Actor Action]:</strong> The user clicks the "Update Account Password" interaction panel control option.</li>
          <li><strong>[System Response]:</strong> The system generates a credential editing secure form layout showcasing input boxes labeled "Current Password", "New Password", and "Confirm New Password".</li>
          <li><strong>[Actor Action]:</strong> The user inputs their current secret key string along with a fresh replacement passphrase combination variant and triggers submission.</li>
          <li><strong>[Data Processing]:</strong> The system securely hashes the input "Current Password" to perform matching comparisons against verification strings recorded inside account user database table indices.</li>
          <li><strong>[Data Processing]:</strong> The system confirms credential accuracy, validates that the "New Password" string satisfies length and complexity parameter algorithms, and checks that both confirmation entries match exactly.</li>
          <li><strong>[Data Processing]:</strong> The system passes the new password text string through structural hashing algorithms, creating a unique replacement secure credential string object.</li>
          <li><strong>[Data Processing]:</strong> The system overrides database user authentication columns with the newly compiled hash values model.</li>
          <li><strong>[Display Result]:</strong> The system renders a transaction complete validation message layout panel block and automatically log-purges other active stale cross-device cookie sessions for safety.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Alternative / Exception Flows</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
          <li style="margin-bottom: 8px;">
            <strong>Core Signature Verification Defect (Step 4):</strong> If the validation evaluation proves the entered "Current Password" value fails signature matching metrics:
            <ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 20px;">
              <li>The system stops processing immediately and blocks database update transactions.</li>
              <li>The system returns an error notice banner: "The current password entered is incorrect."</li>
            </ol>
            <span style="font-size: 13px; color: #475569;"><strong>Postcondition (Alternative Flow):</strong> Security tracking values count a configuration error instance; baseline account authentication records remain unchanged.</span>
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Density Metrics Criteria Violation (Step 5):</strong> If the new replacement passphrase choice does not meet password density criteria benchmarks:
            <ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 20px;">
              <li>The system refuses form submissions.</li>
              <li>The system underlines broken constraint text rules explicitly below the formatting inputs.</li>
            </ol>
            <span style="font-size: 13px; color: #475569;"><strong>Postcondition (Alternative Flow):</strong> Form view panels lock values in place; internal system tables reject any modification updates.</span>
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Prompt Field Input Discrepancy (Step 5):</strong> If the confirmation entry box input differs from the target characters mapped inside the first password initialization prompt field:
            <ol style="margin-top: 4px; margin-bottom: 4px; padding-left: 20px;">
              <li>The system blocks submission pipelines.</li>
              <li>The system prompts the user with warning text indicating: "New password fields do not match."</li>
            </ol>
            <span style="font-size: 13px; color: #475569;"><strong>Postcondition (Alternative Flow):</strong> Authentication databases cancel commitment actions; interface layouts await fresh confirmation re-entry typings.</span>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Postconditions</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Production Verification Update:</strong> Core account verification criteria fields update fully within production data layers, forcing all subsequent device sign-in events to map to the fresh secret key strings.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Special Requirements</td>
      <td style="vertical-align: top;">
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Interface Visibility Masking:</strong> Entry placeholder forms must enforce hidden masking states (`type="password"`) on client interfaces to fully block shoulder-surfing security vulnerabilities.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Extension Points</td>
      <td style="vertical-align: top;">
        None
      </td>
    </tr>
    <tr>
      <td style="background-color: #f8fafc; font-weight: bold; vertical-align: top;">Prototype Screen</td>
      <td style="vertical-align: top;">
        <img src="Img/Profile/uc-change-pass.jfif" alt="alt text" style="max-width: 100%; height: auto; border: 1px solid #cbd5e1; padding: 4px; border-radius: 4px;">
      </td>
    </tr>
  </tbody>
</table>
