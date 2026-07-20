# Authentication

## 1. Register

| Field | Description |
| --- | --- |
| **Use case ID** | UC-AUTH-01 |
| **Use Case Name** | Register |
| **Description** | Allows a new guest user to create an account within the system by providing an email address and creating a secure password. |
| **Actor(s)** | Guest (Unauthenticated User) |
| **Preconditions** | - The user is not currently authenticated within the active session environment. <br> - The user has opened the registration view layout component. |

### Main Flow

1. The user enters their name, email address, password, and password confirmation into the designated registration fields.
2. The user submits the registration form.
3. The system validates that the email format is correct and checks the database to verify the email is not already associated with an existing account.
4. The system executes the mandatory include sub-routine **Verify By Email (UC-AUTH-02)** to issue a verification link.
5. The system hashes the password using a secure cryptographic algorithm and saves a new user record with a "Pending Verification" status flag.
6. The system displays a registration success message instructing the user to check their email inbox to complete the verification sequence.

### Postconditions

* A new user profile record is instantiated in the database with a status set to "Pending Verification".

### Alternative / Exception Flows

* **3'.1 Email address already exists in the system database:** The system terminates the registration sequence, prevents record creation, and displays an inline validation error: "Email address is already registered."
* **3'.2 Password complexity requirements are not met:** The system rejects the payload and returns a detailed structural validation notice detailing missing criteria (e.g., character length, special symbols).

### Postconditions (Alternative Flows)

* 3'.1: No database writes commit; the registration form state remains intact with user inputs preserved.
* 3'.2: The account parameters are unchanged; the interface updates to highlight the non-compliant password fields.

**Special Requirements**

* All client-side transmission payloads containing passwords must be encrypted in transit via TLS.

---

## 2. Google OAuth


| Field | Description |
| --- | --- |
| **Use case ID** | UC-AUTH-03 |
| **Use Case Name** | Google OAuth |
| **Description** | Allows a user to instantly log in or register a new profile by authenticating via their external Google account credentials. |
| **Actor(s)** | Guest (Unauthenticated User), Google Identity Provider (External Actor) |
| **Preconditions** | - The system maintains a valid OAuth client integration configuration mapping with Google APIs. |

### Main Flow

1. **[Actor Action]**: The user clicks the "Continue with Google" layout control object node.
2. **[System Response]**: The system redirects the user's browser context to the secure Google Identity Provider authentication interface page.
3. **[Actor Action]**: The user logs into their Google account (if not already logged in) and grants authorization permissions to the application.
4. **[System Response]**: The Google Identity Provider returns a secure authorization token callback signal parameter to the system's redirect URI.
5. **[Data Processing]**: The system verifies the token integrity with Google's servers, extracts the user profile data (email, name, external ID), and checks if the user exists.
6. **[System Response]**: The system instantiates a valid authenticated application session token block and routes the user directly to the home dashboard view workspace.

### Postconditions

* A secure application session token binds to the client browser, establishing a fully authenticated state.

### Alternative / Exception Flows

* **4'.1 The user cancels the authentication request on the Google portal side:** The external provider passes a cancellation callback parameter; the system catches the state and returns the user to the login screen.
* **5'.1 The user account linked to the incoming Google email address has been explicitly suspended/banned internally:** The system drops the token lifecycle and presents an account blockade notification card layout.

### Postconditions (Alternative Flows)

* 4'.1: Session token flags maintain an unauthenticated resting state; no user data modifications occur.
* 5'.1: Authentication is denied; security tracking logs record the blocked access attempt instance.

**Special Requirements**

* The system must fallback gracefully if third-party token validation endpoints experience sudden latency spikes or service outages.

---

## 3. Login

| Field | Description |
| --- | --- |
| **Use case ID** | UC-AUTH-04 |
| **Use Case Name** | Login |
| **Description** | Authenticates an existing user utilizing their registered email address and password string credentials. |
| **Actor(s)** | Guest (Unauthenticated User) |
| **Preconditions** | - The user possesses an active, fully verified account record inside the system database. |

### Main Flow

1. **[Actor Action]**: The user inputs their email address and account password into the login card component interface fields.
2. **[Actor Action]**: The user hits the primary "Login" submission action node control.
3. **[System Response]**: The system queries the identity tables to locate the matching user profile by the supplied email parameter identifier.
4. **[Data Processing]**: The system extracts the saved hashed password string and runs a comparison matrix check against the incoming plain text password.
5. **[Data Processing]**: The system initializes an active authenticated session context array block and updates the user's "Last Login" metadata timestamp log row.
6. **[Display Result]**: The system redirects the active UI framework viewport into the central authenticated landing layout dashboard.

### Postconditions

* An active authenticated session token mounts securely inside the user workspace context environment.

### Alternative / Exception Flows

* **3'.1 / 4'.1 Supplied email parameter does not exist, or the computed password hash fails verification checks:** The system blocks credential confirmation and displays a generalized error: "Invalid email or password combination."
* **5'.1 The target account profile maintains an unverified state flag (e.g., registration incomplete):** The system interrupts the standard loading routine and redirects the view to a dynamic email re-verification workflow layout.

### Postconditions (Alternative Flows)

* 3'.1 / 4'.1: Session context objects remain completely unauthenticated; internal login failure counter logs increment.
* 5'.1: Access to secure workspaces remains blocked; the user is locked to the verification dashboard lane.

**Special Requirements**

* To prevent brute-force profiling vectors, the login endpoint must enforce strict rate-limiting mechanics after 5 sequential authentication failures.

---

## 4. Forget Password

| Field | Description |
| --- | --- |
| **Use case ID** | UC-AUTH-05 |
| **Use Case Name** | Forget Password |
| **Description** | Orchestrates the multi-stage account recovery sequence allowing a user who lost their credentials to re-secure account access via dynamic secondary channel checks. |
| **Actor(s)** | Guest (Unauthenticated User) |
| **Preconditions** | - The user cannot access their account due to forgotten credential parameters. |

### Main Flow

1. **[Actor Action]**: The user clicks the "Forgot Password?" text link navigation node on the login view panel layout.
2. **[Actor Action]**: The user inputs their registered account email identifier into the recovery prompt and submits.
3. **[System Response]**: The system verifies the user record exists and triggers the mandatory include sub-routine **Verify By OTP (UC-AUTH-06)** to validate identity.
4. **[System Response]**: Upon catching a successful callback validation status from the OTP routine, the system invokes the mandatory include sub-routine **Change Password (UC-AUTH-07)**.
5. **[Display Result]**: The system presents a password reset complete confirmation view layout with a redirection button linking back to the login page.

### Postconditions

* The targeted user account credentials update to the new password configuration block successfully.

### Alternative / Exception Flows

* **3'.1 The provided email parameter cannot be found inside active database records:** The system executes a silent fallback dummy path (to prevent user enumeration exploits) showing an identical notification screen: "Recovery steps dispatched if account exists."

### Postconditions (Alternative Flows)

* 3'.1: No background system variables update; downstream OTP generation routines abort safely.

**Special Requirements**

* The recovery orchestration flow lifecycle must expire within 15 minutes of initial generation token stamping.

---

## 5. Verify By Email

*Included UC supporting parent operational blocks under UC-AUTH-01 (Register).*

| Field | Description |
| --- | --- |
| **Use case ID** | UC-AUTH-02 |
| **Use Case Name** | Verify By Email |
| **Description** | Internal system routine handling verification token string generation, external email transactional routing, and account activation logic. |
| **Actor(s)** | System, Transactional Email Service Provider (External Actor) |
| **Preconditions** | - An orchestration call framework request is actively triggered via a parent user registration event. |

### Main Flow

1. The system generates a cryptographically secure, time-limited verification token string link.
2. The system packages a transactional email notification payload enclosing the activation token URI link parameters.
3. The system dispatches the compilation payload out to the external Transactional Email Service Provider engine API.
4. The user opens their personal email client workspace, opens the message, and clicks the enclosed activation link parameter object.
5. The system interceptor parses the incoming request URI, confirms token validity, updates the matching user account status parameter flag from "Pending" to "Active", and returns a verification success confirmation callback to the parent context.

### Postconditions

* User profile database rows convert permanently to fully verified "Active" operation states.

### Alternative / Exception Flows

* **5'.1 The user clicks the validation link after the expiration boundary has passed:** The system flags the token as invalid, renders a "Link Expired" error block layout, and provides an interface node to request a new verification message block.

### Postconditions (Alternative Flows)

* 5'.1: Account attributes retain their unverified resting states; target token entries purge from the operational caching memory layer.

**Special Requirements**

* Verification tokens must be unique nonces signed with an HMAC signature protocol layer.

---

## 6. Verify By OTP

*Included UC supporting parent operational blocks under UC-AUTH-05 (Forget Password).*

| Field | Description |
| --- | --- |
| **Use case ID** | UC-AUTH-06 |
| **Use Case Name** | Verify By OTP |
| **Description** | Internal identity verification framework routine processing temporary One-Time Password generation, delivery routing, and validation. |
| **Actor(s)** | System, SMS/Email OTP Messaging Service (External Actor) |
| **Preconditions** | - Context validation parameters are received systematically via parent recovery orchestration flows. |

### Main Flow

1. The system generates a highly localized 6-digit numeric One-Time Password parameter token.
2. The system saves the generated OTP token to a short-lived memory cache with an explicit 5-minute time-to-live parameter.
3. The system routes the OTP payload to the user's secondary verification channel via the External Messaging Service Provider API.
4. The user receives the numeric passcode, types the characters into the application UI validation interface layout box, and submits.
5. The system references the cache layer to verify match alignment and returns a successful verification completion token callback.

### Postconditions

* The current browser session context earns a temporary "Identity Confirmed" verification token pass.

### Alternative / Exception Flows

* **5'.1 The user inputs a numeric sequence that does not match the active cached value:** The system blocks submission, increments a failure tally index, and throws a validation mismatch warning notice.
* **5'.2 The user interface session remains idle until the 5-minute TTL cache window completely clears:** The system invalidates the attempt path and forces a fresh request iteration.

### Postconditions (Alternative Flows)

* 5'.1: The verification validation step remains unfulfilled; if failures surpass 3 consecutive attempts, the session token blocks completely.
* 5'.2: The memory cache layer purges the entry parameters cleanly; the user interface falls back to step 1.

**Special Requirements**

* The system must prevent brute forcing by restricting individual OTP generation requests to a maximum frequency of once per 60 seconds per user profile.

---

## 7. Change Password

*Included UC supporting parent operational blocks under UC-AUTH-05 (Forget Password).*

| Field | Description |
| --- | --- |
| **Use case ID** | UC-AUTH-07 |
| **Use Case Name** | Change Password |
| **Description** | Internal business utility module managing new password parameter capture, verification constraints check, and core database credential updates. |
| **Actor(s)** | Guest (Unauthenticated User), System |
| **Preconditions** | - The current transaction flow state contains a valid "Identity Confirmed" pass flag passed forward from `UC-AUTH-06`. |

### Main Flow

1. The system displays a structural "Reset Password" input entry form layout component framework.
2. The user inputs a fresh password string value and completes the verifying confirmation field duplication text box.
3. The system evaluates the input parameters to ensure both entries align perfectly and clear complexity criteria check limits.
4. The system hashes the fresh input password selection payload using cryptographic salt properties and writes the value directly to the user profile table column database space.
5. The system clears out any active external session token allocations for this user to enforce a global logout across all peripheral devices.
6. The system issues a successful operation completion code signal return back out to the master workflow orchestrator.

### Postconditions

* The underlying application database records permanent structural mutations over the user's credential secret parameter attributes.

### Alternative / Exception Flows

* **3'.1 The secondary confirmation verification text input does not match the primary new password string entry:** The system blocks submission pipelines and displays a localized validation text warning notice: "Passwords do not match."

### Postconditions (Alternative Flows)

* 3'.1: Security credentials preserve historical states exactly; write operations are intercepted and discarded prior to database execution threads.

**Special Requirements**

* None.

<div class="page"/>

## Use case diagram
```mermaid
flowchart LR
    %% Left Actor
    ActorGuest((Guest))
        %% Central System Boundary Subgraph
    subgraph Authentication [Authentication]
        UC_Reg((Register))
        UC_OAuth((Google OAuth))
        UC_Login((Login))
        UC_Forget((Forget Password))
        UC_Change((Change Password))
        UC_VerifyEmail((Verify By Email))
        UC_VerifyOTP((Verify By OTP))
    end

    %% Right Actors
    ActorEmail(["<center><< service >><br>Email</center>"])
    ActorGoogle(["<center><< service >><br>Google Client</center>"])

    %% -------------------------------------------------------------
    %% Structural Layout Anchors (Invisible lines to center-align the subgraph)
    %% -------------------------------------------------------------
    ActorGuest ~~~ Authentication ~~~ ActorEmail
    ActorGuest ~~~ Authentication ~~~~ ActorGoogle

    %% -------------------------------------------------------------
    %% Actual Connections (Matching your image exactly)
    %% -------------------------------------------------------------
    %% Left Actor Associations
    ActorGuest --- UC_Reg
    ActorGuest --- UC_OAuth
    ActorGuest --- UC_Login
    ActorGuest --- UC_Forget

    %% Subgraph Internal Include Relationships
    UC_Reg -. "<< include >>" .-> UC_VerifyEmail
    UC_Forget -. "<< include >>" .-> UC_VerifyOTP
    UC_Forget -. "<< include >>" .-> UC_Change

    %% Right Actor Associations
    UC_VerifyEmail --- ActorEmail
    UC_OAuth --- ActorGoogle
    UC_VerifyOTP --- ActorEmail

    %% Styling
    style Authentication fill:#fff,stroke:#333,stroke-width:2px
```
