# Tasks: Account Registration (Register) Flow Test Coverage

**Input**: Design documents from `specs/022-register-test-coverage/`

**Prerequisites**: plan.md (required), spec.md (required)

---

## Phase 1: Analysis & Setup

### Task 1: Analyze existing Register tests
- **Description**: Review the existing test file `src/server/tests/services/register.service.spec.mjs` to study current mocks, mock imports, beforeEach blocks, and testing style.
- **Expected Outcome**: Solid understanding of how `vi.mock` is declared, how mock states are managed, and how to replicate the testing conventions.
- [x] Task 1.1: Analyze existing Service tests.

### Task 2: Install devDependencies & Configure testing library
- **Description**: Open `src/server/package.json`, insert `supertest` into `devDependencies`, and run the installation script.
- **Expected Outcome**: `supertest` package is installed and is accessible inside the Vitest runner.
- [x] Task 2.1: Add `supertest` to `devDependencies` in `src/server/package.json`.

---

## Phase 2: Service-Level Test Implementation

### Task 3: Implement 10 Service-level test scenarios
- **Description**: Modify `src/server/tests/services/register.service.spec.mjs` to add unit test cases testing the `registerUser` service method directly against all 10 scenarios.
- **Expected Outcome**: All service logic flows are verified, checking correct function calling, hashing logic, db inputs, and exceptions.
- [x] Task 3.1: Scenario 1 - Test successful registration service logic (creates pending user, hashes pwd, returns success).
- [x] Task 3.2: Scenario 2 - Test duplicate email service logic (aborts when user already exists).
- [x] Task 3.3: Scenario 3 - Test active pending registration service logic (aborts when active pending record exists).
- [x] Task 3.4: Scenario 4 - Test expired pending registration service logic (deletes expired record, hashes, creates new pending user).
- [x] Task 3.5: Scenario 5 - Test user check database failure service logic (propagates database errors).
- [x] Task 3.6: Scenario 6 - Test pending check database failure service logic (propagates database errors).
- [x] Task 3.7: Scenario 7 - Test password hashing failure service logic (aborts when hashing throws).
- [x] Task 3.8: Scenario 8 - Test transaction / pending-user creation failure service logic (aborts and rolls back when insert fails).
- [x] Task 3.9: Scenario 9 - Test verification email sending failure service logic (aborts when email sending fails).
- [x] Task 3.10: Scenario 10 - Test expired pending cleanup failure service logic (aborts when deleting expired pending user fails).

---

## Phase 3: Controller-Level Test Implementation

### Task 4: Implement 10 Controller-level test scenarios
- **Description**: Modify `src/server/tests/controllers/register.controller.spec.mjs` to test `register(req, res)` using manually mocked Express request and response objects.
- **Expected Outcome**: Controller verifies input validation, catches exceptions, and maps them to standard HTTP status codes (`201`, `409`, `400`).
- [x] Task 4.1: Scenario 1 - Test successful registration controller output (returns status 201).
- [x] Task 4.2: Scenario 2 - Test duplicate email controller output (returns status 409).
- [x] Task 4.3: Scenario 3 - Test active pending registration controller output (returns status 409).
- [x] Task 4.4: Scenario 4 - Test expired pending registration controller output (returns status 201).
- [x] Task 4.5: Scenario 5 - Test user check database failure controller output (returns status 400).
- [x] Task 4.6: Scenario 6 - Test pending check database failure controller output (returns status 400).
- [x] Task 4.7: Scenario 7 - Test password hashing failure controller output (returns status 400).
- [x] Task 4.8: Scenario 8 - Test transaction / pending-user creation failure controller output (returns status 400).
- [x] Task 4.9: Scenario 9 - Test verification email sending failure controller output (returns status 400).
- [x] Task 4.10: Scenario 10 - Test expired pending cleanup failure controller output (returns status 400).

---

## Phase 4: API Integration Test Implementation

### Task 5: Implement 10 API Integration test scenarios
- **Description**: Create and implement `src/server/tests/integration/register.api.spec.mjs` using `supertest` and a lightweight Express server referencing real routers (`auth.routes.mjs`), controllers, services, and models. Only the database connection pool (`postgres.mjs`) and SMTP mailer (`mailer.mjs`) are mocked.
- **Expected Outcome**: End-to-end API pipeline validation, verifying HTTP requests, JSON body parsers, transaction steps, and responses work in integration.
- [x] Task 5.1: Setup Express test application and mock pg database pool inside `tests/integration/register.api.spec.mjs`.
- [x] Task 5.2: Scenario 1 - Test successful registration API endpoint (returns 201, queries DB, checks mailer).
- [x] Task 5.3: Scenario 2 - Test duplicate email API endpoint (returns 409, does not query transaction/mailer).
- [x] Task 5.4: Scenario 3 - Test active pending registration API endpoint (returns 409, does not mutate DB).
- [x] Task 5.5: Scenario 4 - Test expired pending registration API endpoint (deletes old, inserts new, sends mail, returns 201).
- [x] Task 5.6: Scenario 5 - Test database failure on user check API endpoint (returns 400).
- [x] Task 5.7: Scenario 6 - Test database failure on pending check API endpoint (returns 400).
- [x] Task 5.8: Scenario 7 - Test password hashing failure API endpoint (returns 400).
- [x] Task 5.9: Scenario 8 - Test transaction / pending-user creation failure API endpoint (returns 400).
- [x] Task 5.10: Scenario 9 - Test verification email sending failure API endpoint (returns 400).
- [x] Task 5.11: Scenario 10 - Test expired pending cleanup failure API endpoint (returns 400).

---

## Phase 5: Verification & Documentation

### Task 6: Execute Vitest, remove duplicate setups, and fix failing tests
- **Description**: Run test runner commands, inspect errors, eliminate redundant mocks or test fixtures, and clean up empty test files.
- **Expected Outcome**: All 30 tests pass successfully. Running `npm test` runs all backend suites green.
- [x] Task 6.1: Run `npx vitest run tests/services/register.service.spec.mjs` and fix any errors.
- [x] Task 6.2: Run `npx vitest run tests/controllers/register.controller.spec.mjs` and fix any errors.
- [x] Task 6.3: Run `npx vitest run tests/integration/register.api.spec.mjs` and fix any errors.
- [x] Task 6.4: Clean up any placeholder/empty test files (e.g. `tests/utils/authHelpers.spec.mjs`) to avoid "No test suite found" errors in Vitest.
- [x] Task 6.5: Run full test coverage verification using `npx vitest run` and confirm all suites pass.

### Task 7: Update documentation
- **Description**: Mark all tasks as completed in `tasks.md`, set status in `spec.md` and `plan.md` to Completed, and verify that references are accurate.
- **Expected Outcome**: Spec documents reflect final implemented status.
- [x] Task 7.1: Mark documentation files as Final/Complete.
