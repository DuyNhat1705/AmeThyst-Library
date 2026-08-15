# Code Audit Findings — AmeThyst-Library

> Audit date: 2026-08-09 · Scope: `src/server` (Express + PostgreSQL), `src/client` (Next.js), `src/database` (docker-compose)
> Severity: **Critical** (exploitable security) · **High** (security/robustness) · **Medium** · **Low** (polish/code quality)

---

## 1. Security — Authentication & Session

### 1.1 [Critical] JWT exposed in URL query string (Google OAuth callback)
- **File:** `src/server/src/controllers/auth.controllers.mjs:122`
- Server redirects to `.../auth/callback?token=${token}&user=...`. The JWT and full user payload travel through the browser URL → leaks via browser history, referrer headers, proxy/server access logs.
- **Fix:** Redirect to a page-less endpoint or hand off via server-set short-lived cookie / `POST` to a same-origin relay; strip query params immediately in the client (`history.replaceState`).

### 1.2 [High] JWT stored in `sessionStorage`
- **Files:** `src/client/app/utils/apiClient.ts:5`, `src/client/app/login/page.tsx:43-44`, `src/client/app/auth/callback/page.tsx:16-17`
- Tokens in `sessionStorage` are readable by any XSS and survive only the tab. Combined with 1.1 the token is trivially obtainable.
- **Fix:** Use `HttpOnly` cookies with `SameSite=Lax` for the access token (and a refresh-token flow); keep JWT out of JS-accessible storage.

### 1.3 [High] No rate limiting anywhere
- **Files:** `src/server/src/server.mjs` (app bootstrap); auth routes `src/server/src/routes/auth.routes.mjs`
- No `express-rate-limit` (or similar) on any endpoint — especially `/login`, `/auth/forgot`, `/auth/verify`, `/auth/resend-verification`. Brute-force of passwords and 6-digit OTPs is unthrottled.
- **Fix:** Add strict rate limits on auth endpoints (login, OTP, resend) + global API rate limit; account lockout / exponential backoff after N failures.

### 1.4 [High] OTP generated with non-crypto RNG and compared in plaintext
- **File:** `src/server/src/utils/otpHelpers.mjs:5-6`, `:12`
- `Math.random()` is not cryptographically secure; OTP is stored and compared as plaintext in DB (`otp.service.mjs`). No attempt counter / lockout.
- **Fix:** Use `crypto.randomInt`; store a hash (e.g. HMAC/SHA-256) of the OTP; cap verification attempts per OTP record.

### 1.5 [Medium] User enumeration across auth flows
- **Files:** `src/server/src/services/auth.services.mjs:24` ("Email already exists"), `src/server/src/controllers/auth.controllers.mjs:71` (forgot → 404 "email does not exist"), `:102` (resend), `:16`
- Register / forgot-password / resend return distinct messages that confirm whether an email is registered.
- **Fix:** Return generic messages and use a consistent status code; decouple side-channel via timing.

### 1.6 [Medium] No server-side input validation for register
- **File:** `src/server/src/services/auth.services.mjs:22-42`
- `email` / `password` / `username` are accepted with no format/length/complexity checks server-side (client-only validation). Empty or malformed values can create accounts with weak/empty passwords; empty email can be inserted.
- **Fix:** Validate with a schema (email regex, password policy, username length/charset) before hashing.

### 1.7 [Medium] Password change/reset does not invalidate other sessions
- **Files:** `src/server/src/services/otp.service.mjs` (resetPassword), `user.services.mjs` (changePassword)
- `token_version` is only bumped on logout, not on password change/reset. Old JWTs remain valid after password compromise recovery.
- **Fix:** Increment `token_version` on password change/reset (auth middleware `auth.middleware.mjs:32` already enforces it).

### 1.8 [Low] JWT verification does not pin algorithm
- **File:** `src/server/src/middlewares/auth.middleware.mjs:10`
- `jwt.verify(token, JWT_SECRET)` without `{ algorithms: ['HS256'] }`. Algorithm-confusion hardening.
- **Fix:** Pass the explicit allowed algorithm list.

### 1.9 [Low] JWT secret / env not validated at startup
- **File:** `src/server/src/server.mjs` / `config/postgres.mjs`
- If `JWT_SECRET` or DB envs are missing, failures surface at runtime rather than a clear startup error.
- **Fix:** Fail fast on missing required env vars.

### 1.10 [Low] Suspended account login still leaks suspension state
- **File:** `src/server/src/services/auth.services.mjs:103-105`
- Returns "Your account has been suspended." pre-password-check — combined with 1.5 this is another enumeration vector. (Low impact given 1.5 already exists.)

---

## 2. Security — Network / SSRF / Transport

### 2.1 [Critical] SSRF in avatar crop via remote URL
- **File:** `src/server/src/services/avatar.crop.services.mjs:25-58` (`getImageBuffer`)
- Any authenticated user can POST `imageUrl` pointing at arbitrary hosts (cloud metadata `169.254.169.254`, internal services). Only the response `content-type` is checked — the buffer is fetched and processed regardless of target.
- **Fix:** Validate URL host against an allowlist (e.g., Cloudinary/known image hosts), block private/link-local IPs (DNS-rebind-safe resolve), enforce a size cap and timeouts.

### 2.2 [High] CORS wide open
- **File:** `src/server/src/server.mjs:31` (`app.use(cors())`); `src/server/src/config/socket.mjs`
- `cors()` accepts any origin; socket.io also open. Any site can make authenticated API calls on behalf of a logged-in user (CSRF-like via bearer token if the token were cookies; today tokens are in sessionStorage so impact is reduced, but still wrong).
- **Fix:** Restrict `origin` to `CLIENT_URL`/allowed dev origins; align socket CORS to the same allowlist.

### 2.3 [Medium] No security headers (helmet)
- **File:** `src/server/src/server.mjs`
- Missing `helmet()`: no `X-Frame-Options`, CSP, `X-Content-Type-Options`, HSTS.
- **Fix:** `app.use(helmet())`.

### 2.4 [Low] No body-size limits on some routes
- **File:** `src/server/src/server.mjs`
- `express.json()`/`urlencoded()` without explicit `limit` (default 100kb — acceptable, but confirm); upload route uses `multer` 2MB cap (good). Verify no endpoint accepts unbounded bodies.
- **Fix:** Set explicit `limit` and reject oversize bodies with 413.

### 2.5 [Low] Python prediction server exposed assumptions
- **File:** `src/server/src/predict_server.py`
- Binds `127.0.0.1` (good). Ensure it is never exposed to the LAN, requires no auth by design — acceptable for localhost, document it.

---

## 3. Security — Authorization / Data scoping

### 3.1 [High] Librarian endpoints are not branch-scoped
- **Files:** `src/server/src/controllers/dashboard.librarian.controllers.mjs:64-71, 230-257` (`getPickups`, `getPaidFees`, `getActiveBorrowings`, `getOutstandingDebts` → services without `branchId`), vs room endpoints that ARE scoped (`getRoomsOverview` `:5`, `getActiveReservations` `:15`)
- Room data is filtered by `req.user.branch_id || 1` but book pickups/borrowings/debts are global — a librarian at branch A sees branch B's patron data.
- **Fix:** Pass `branchId` into all four services and add a WHERE clause on `branch_id`.

### 3.2 [High] `branch_id` trust in return/payment flows
- **File:** `src/server/src/controllers/dashboard.librarian.controllers.mjs:192-210` (`confirmReturn` reads `branch_id` from request body) and `:259-277` (`confirmPayment` by bare `penalty_id`)
- Client-supplied `branch_id` lets a librarian record returns for any branch; `penalty_id` is not validated against branch. Also `verifyReturnPin` (`:130-148`) has no branch filter at all, unlike `verifyPin` (`:73-91`).
- **Fix:** Derive branch from `req.user.branch_id` server-side; scope penalty/borrow lookups by branch.

### 3.3 [Medium] `|| 1` default branch fallback
- **Files:** `src/server/src/controllers/dashboard.librarian.controllers.mjs:5,15,35,50,76,153,174` and `dashboard.user.controllers.mjs`
- `req.user?.branch_id || 1` silently defaults to branch 1 for any librarian without a branch (or for admins acting as librarian) — wrong data, silent misrouting.
- **Fix:** Validate presence of `branch_id` for librarian role; 400 if missing.

### 3.4 [Medium] Client-side-only role gating
- **Files:** `src/client/app/dashboard/layout.tsx` and dashboard pages (role checks on `user.role`)
- The UI hides/shows screens by role from sessionStorage; server does enforce via `authorizeRole`, but a user who edits their stored user object can load pages and get misleading 403/redirect UX, and `Statistics` guard reads `localStorage` not `sessionStorage` (`src/client/app/dashboard/user/page.tsx`).
- **Fix:** Keep server enforcement (already present) and derive role from the token/server on the client.

### 3.5 [Medium] Admin role-change does not bump `token_version`
- **File:** `src/server/src/services/admin.services.mjs` (`updateUserRoleService`)
- Changing a user's role leaves their existing JWTs valid with stale role claims until expiry (HTTP layer re-fetches role from DB each request, so impact is mitigated — but other consumers like socket middleware may trust token claims).
- **Fix:** Increment `token_version` on role/suspension changes; ensure socket middleware re-validates against DB.

### 3.6 [Low] Socket auth trusts stale token claims
- **File:** `src/server/src/config/socket.mjs`
- Socket middleware decodes role/status from the JWT at connect time; a demoted/suspended user can hold the socket connection open until token expiry.
- **Fix:** Re-check user status/role/version from DB on connect and on sensitive events.

---

## 4. Bugs — SQL / Transactions

### 4.1 [Critical] SQL string interpolation in recommendations
- **File:** `src/server/src/services/recommendation.services.mjs:460` (`insertValues.push(\`('${userId}', '${item.id}', ${item.score}, '${showedAt}')\`)`)
- Values are interpolated directly into the INSERT. `item.id`/`score` originate from DB/memgraph-driven data, so a malicious book id or score can break out of the statement (SQL injection / syntax injection). Should be parameterized (`ON CONFLICT ... DO UPDATE` supported with placeholders).
- **Fix:** Use parameterized multi-row insert with `$1..$n` placeholders (or `unnest`).

### 4.2 [Medium] Room reservation TOCTOU race
- **File:** `src/server/src/services/dashboard.user.services.mjs` (`createReservation` for rooms)
- Slot availability is checked (query) and then a row is inserted without a `SELECT ... FOR UPDATE` on the room-slot, relying only on a unique constraint. Two concurrent requests can both pass the check; one fails on unique constraint (handled) but the UX/order is non-deterministic and a slot may be double-booked if the constraint doesn't cover the full window.
- **Fix:** Lock the room slot rows (`FOR UPDATE`) before insert, or add a serializable transaction / exclusion constraint (pgvector schema already has `bookings`-like tables — use the exact columns in `database/init_db/postgres`).

### 4.3 [Medium] Book borrow-limit check is not atomic
- **File:** `src/server/src/services/library.services.mjs` (`createReservation` book flow)
- User's active-borrow count is read and then incremented in separate statements; concurrent reservations by the same user can exceed `MAX_BOOK_BORROW_LIMIT`. (The `SELECT ... FOR UPDATE` protects inventory quantity, not the per-user count.)
- **Fix:** Do the count+increment in one atomic statement (`UPDATE ... SET borrow_num = borrow_num + 1 WHERE borrow_num < $limit RETURNING ...`), or lock the user row.

### 4.4 [Low] Missing pagination caps on export/list endpoints
- **Files:** `admin.services.mjs` (`getUsersList` export), `search.services.mjs`
- CSV export pulls all users with no cap; catalog lists accept `limit=0`/negative to mean "unlimited" (a public, unauthenticated endpoint in some cases) → DoS via huge responses.
- **Fix:** Enforce a hard max (e.g. 1000) and reject `limit<=0`.

### 4.5 [Low] OTP verified flag vs expiry ordering
- **File:** `src/server/src/services/otp.service.mjs`
- `validateVerifiedRecord` checks `verified` before expiry; a verified OTP row with a far-future `expired_at` (e.g. reset TTL 5 min) is fine, but ensure verification itself also checks expiry (`validateOtpRecord` does). Double-check the verify handler enforces the 60s window.

---

## 5. Bugs — Logic / Business rules

### 5.1 [High] `VerificationModal` still uses mock data
- **File:** `src/client/app/components/organisms/VerificationModal.tsx`
- Hardcoded `MOCK_BORROWER` / `MOCK_BOOKS` (PIN `000000`) — if this component is reachable in production flows, anyone can "verify" a mock checkout. Must be wired to the real `/user/verification-pin` endpoints or removed.

### 5.2 [Medium] `dashboard/events` endpoint doesn't exist but client fetches it
- **File:** `src/client/app/dashboard/user/page.tsx` (and related) calls `/api/dashboard/events`; no route registered in `dashboard.user.routes.mjs`. Silent 404 / broken UI.
- **Fix:** Implement or remove the call.

### 5.3 [Medium] Wrong hardcoded ports in client
- **Files:** `src/client/app/dashboard/user/page.tsx:13` (`localhost:4000`), `src/client/app/components/organisms/RoomDetailPanel.tsx:66` (`localhost:3000`) — server runs on `5000` (apiClient default). Direct fetches bypass `apiClient` and hit dead ports.
- **Fix:** Route all fetches through `apiClient`/`NEXT_PUBLIC_API_URL`.

### 5.4 [Medium] `apiClient` parses `response.json()` unconditionally
- **File:** `src/client/app/utils/apiClient.ts:50`
- If the server returns non-JSON (HTML error page, 502 proxy), `.json()` throws and callers get an unhandled rejection instead of the friendly error object. No `Content-Type`/`ok` check first.
- **Fix:** Check `response.ok` and content-type; guard `data` shape.

### 5.5 [Medium] 401 only clears session for two error codes
- **File:** `src/client/app/utils/apiClient.ts:52`
- `AUTH_REQUIRED`, `INVALID_TOKEN`, `INVALID_TOKEN_VERSION`, `MUST_CHANGE_PASSWORD` don't clear stale session, so pages loop on failed calls.
- **Fix:** Clear session + redirect to login on any `401`.

### 5.6 [Low] `getBranchId` uses `atob` on base64url payload
- **File:** `src/client/app/utils/apiClient.ts:12`
- JWT payloads are base64url (`-`/`_`), `atob` expects base64; small chance of decode failure for some tokens. Use `atob(payload.replace(/-/g,'+').replace(/_/g,'/'))`.
- **Fix:** Normalize base64url → base64 before decoding.

### 5.7 [Low] Statistics page guard reads `localStorage` not `sessionStorage`
- **File:** `src/client/app/dashboard/user/page.tsx` (or `statistics` page)
- `localStorage.getItem('user')` never matches the sessionStorage-based auth → the client-side gate is a no-op (server still enforces, but UI misbehaves).

### 5.8 [Low] Room PIN / PIN expiry edge cases
- **Files:** `room.models.mjs` (pin/backfill logic), `dashboard.user.services.mjs`
- Cleanup/expiry paths are cron-driven; a PIN that expires between generate and verify may 500 or error with unclear message. Confirm graceful handling (returned as `result.error`, not thrown).

### 5.9 [Low] `loginUser` fire-and-forget DB write
- **File:** `src/server/src/services/auth.services.mjs:111-117`
- `UPDATE last_login_at` uses dynamic `import()` of the pool — works but is fragile; use the already-imported pool. Minor.

### 5.10 [Low] Async `done` callback in passport serialize
- **File:** `src/server/src/config/passport.mjs`
- `serializeUser` with `async` + `done(null, user)` is fine, but ensure no `undefined` email path (Google profile without verified email) — `findOrCreateGoogleUser` should guard `profile.emails[0]` to avoid a 500.

---

## 6. Infra / Database / Dev-ops

### 6.1 [Medium] Memgraph lab exposed on host port 8080 with auto-login creds
- **File:** `src/database/docker-compose.yml`
- `memgraph-lab` published to `8080` with env-embedded auto-login user/password. Anyone on the network can open the graph browser. Also `memgraph` port `7687` exposed without TLS.
- **Fix:** Bind to `127.0.0.1:8080`, use secrets, restrict ports in prod.

### 6.2 [Medium] `init_db` mount paths vs actual folder name
- **File:** `src/database/docker-compose.yml`
- Compose mounts `./init_db/postgres` and `./init_db/memgraph`, but the folder on disk is `Init_data/` (check exact casing). If they don't exist, mounts silently create empty dirs → DB schema not initialized on fresh clone.
- **Fix:** Align mount source paths to the real directory names (verify `database/init_db/postgres` per AGENTS.md).

### 6.3 [Low] Orphaned background processes
- **Files:** `src/server/src/scheduler` (`runPythonScript`), `recommendation.services.mjs` spawn of `predict_server.py`
- `detached`/`stdio:'ignore'` python children are not tracked/killed on server shutdown → orphan processes pile up.
- **Fix:** Track child PIDs, kill on `SIGTERM`/`exit`, or use a proper job queue.

### 6.4 [Low] Schema-driven table names
- Per AGENTS.md, DB changes must use exact names from `database/init_db/postgres`. Audit flagged `public.recommends`, `search_history`, `bookings` — confirm all queries use the exact schema names (esp. the `recommends` partial unique index in `recommendation.services.mjs:467`).

---

## 7. Client UX / Polish

| # | Severity | Issue | Location |
|---|----------|-------|----------|
| 7.1 | Low | Recommendations page effect deps on `[t]` may loop/re-run | `src/client/app/dashboard/user/recommendations/page.tsx` |
| 7.2 | Low | `getLoggedInUser` returns `null` for malformed `user` JSON while `isLoggedIn` true → half-auth state | `src/client/app/utils/user.ts` |
| 7.3 | Low | `user.ts` `JSON.parse` without try/catch in storage listener | `src/client/app/utils/user.ts` |
| 7.4 | Low | No error boundaries around data-heavy pages (unhandled API failures blank the UI) | dashboard pages |
| 7.5 | Low | `NavBar` renders `href=""` for logged-out users | `src/client/app/components/organisms/NavBar.tsx` |

---

## Suggested distribution (team)

| Priority bucket | Items |
|---|---|
| **P0 — fix immediately** | 1.1, 1.2, 2.1, 4.1, 5.1 |
| **P1 — next sprint** | 1.3, 1.4, 2.2, 3.1, 3.2, 4.2, 4.3 |
| **P2 — planned hardening** | 1.5–1.10, 2.3–2.5, 3.3–3.6, 4.4–4.5, 5.2–5.5 |
| **P3 — polish** | 5.6–5.10, 6.1–6.4, 7.1–7.5 |

Assign one issue per finding above; each references the exact `file:line` and suggested fix for ticket description.
