# UI Specification: Responsive Forgot Password Page

## 1. Page Layout & Structure
The Forgot Password page must completely adapt the outer page layout, grid/flex system, and responsive background configurations of the existing **Register** page. The main component block inside the content zone is replaced with the responsive **ForgotPasswordCard** specified below.

- **Overall Layout:** Inherited directly from Register Page.
- **Card Constraints:** - Width: `100%`
  - Max Width: `480px`
  - Border Radius: `12px` (`rounded-xl`)
  - Background: White (`#FFFFFF`)
  - Border: `1px solid #C5C6CD`
  - Shadow: `0px 1px 2px 0px rgba(0, 0, 0, 0.05)`
  - Overflow: `hidden`
- **Responsive Padding Buffer:**
  - Mobile/Tablet (`<640px`): Top: `48px` (`pt-12`), Bottom: `48px` (`pb-12`), Horizontal Left/Right: `24px` (`px-6`)
  - Desktop (`>=640px`): Top: `64px` (`sm:pt-16`), Bottom: `48px` (`pb-12`), Horizontal Left/Right: `48px` (`sm:px-12`)

---

## 2. Component Layout Breakdown (Vertical Flow)
The card wrapper is a unified vertical flex engine (`flex flex-col items-start w-full gap-2`).

### Phase 1: Header Title & Description
- **Title Block (`<h1>`):**
  - Font: Inter, Semibold, Letter Spacing: `-0.01em`
  - Color: Dark Slate (`#091426`)
  - Mobile Sizing: `24px` (`text-2xl`), Line Height: `36px` (`leading-9`)
  - Desktop Sizing: `32px` (`sm:text-[32px]`), Line Height: `40px` (`sm:leading-10`)
- **Description Block (`<p>`):**
  - Font: Inter, Regular, Line Height: `24px` (`leading-6`)
  - Color: Muted Gray (`#45474C`)
  - Mobile Sizing: `14px` (`text-sm`)
  - Desktop Sizing: `16px` (`sm:text-base`)
  - Text Content: `Enter the email address associated with your LIMA account to receive a secure password reset link.`

### Phase 2: Input & Action Section
Wrapped inside a full-width block container featuring `24px` vertical padding (`py-6 px-0`) and a strict vertical gap layout of `24px` (`gap-6`).

#### A. Email Input Group (Semantic Form Elements)
- **Label (`<label>` with `htmlFor="email"`):**
  - Font: Inter, `14px` (`text-sm`), Semibold, Line Height: `20px` (`leading-5`)
  - Color: Dark Slate (`#091426`)
  - Letter Spacing: `0.01em`
  - Text Content: `Email Address`
- **Input Container Box:**
  - Position: `relative`
  - Layout: Flex configuration, vertically centering elements (`flex items-center w-full`)
- **Mail Icon Container (SVG):**
  - Position: `absolute`, Left: `16px` (`left-4`)
  - Alignment: Vertically centered relative to the input box (`flex items-center justify-center pointer-events-none`)
  - SVG Metrics: Width `17px`, Height `14px`, Path Fill: `#45474C`
  - Path Data: `M1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8438C0.163194 12.5174 0 12.125 0 11.6667V1.66667C0 1.20833 0.163194 0.815972 0.489583 0.489583C0.815972 0.163194 1.20833 0 1.66667 0H15C15.4583 0 15.8507 0.163194 16.1771 0.489583C16.5035 0.815972 16.6667 1.20833 16.6667 1.66667V11.6667C16.6667 12.125 16.5035 12.5174 16.1771 12.8438C15.8507 13.1701 15.4583 13.3333 15 13.3333H1.66667ZM8.33333 7.5L1.66667 3.33333V11.6667H15V3.33333L8.33333 7.5ZM8.33333 5.83333L15 1.66667H1.66667L8.33333 5.83333ZM1.66667 3.33333V1.66667V3.33333V11.6667V3.33333Z`
- **Native Input Element (`<input type="email" id="email" />`):**
  - Layout: Full width (`w-full`), Top/Bottom Padding `14px` (`py-[14px]`), Right Padding `16px` (`pr-4`), Left Padding `44px` (`pl-11` to prevent text-icon clipping)
  - Styling: Border `1px solid #C5C6CD`, Background `#FFFFFF`, Border Radius `4px` (`rounded`)
  - Typography: Inter, `16px` (`text-base`), Active Color `#091426`
  - Placeholder Styling: Color `rgba(117, 119, 125, 0.50)`, Content: `researcher@university.edu`
  - Interactive States: Focus outline suppressed (`focus:outline-none`), border changes smoothly on focus to `#091426` via transition utility (`transition-colors`).

#### B. Submit Button (`<button type="submit">`)
- **Behavior States:** `cursor-pointer`, forces text to single line (`text-nowrap`), no base borders.
- **Layout:** Full width (`w-full`), Flex row layout, perfectly centered (`justify-center items-center`), element spacing `8px` (`gap-2`), Padding: Top/Bottom `16px` (`py-4`), Left/Right `16px` (`px-4`)
- **Styling UI:** Base Background `#091426`, Hover State Background `#122544`, Border Radius `4px` (`rounded`), Shadow `0px 1px 2px 0px rgba(0,0,0,0.05)`, transition active (`transition-colors`).
- **Typography:** Inter, `14px` (`text-sm`), Semibold, Line Height `20px` (`leading-5`), Color `#FFFFFF`, Letter Spacing `0.01em`
- **Text:** `Send Reset Link`
- **Arrow Right Icon (SVG):**
  - Dimensions: Width `12px`, Height `12px`, Vector color mapping `white`, strict fixed scales (`flex-shrink-0`)
  - Path Data: `M9.13125 6.75H0V5.25H9.13125L4.93125 1.05L6 0L12 6L6 12L4.93125 10.95L9.13125 6.75Z`

### Phase 3: Footer Navigation Link (`<button type="button">`)
- **Layout Divider:** Top Padding `32px` (`pt-8`), top border delimiter line (`border-t border-t-[#C5C6CD]`), full width alignment, components center-justified.
- **Interactive Container Box:** `cursor-pointer`, Flex row engine, items aligned center (`items-center justify-center`), inline spacing elements `6px` (`gap-1.5`), transparent background, no border boundaries. Class hooked to a global interaction (`group`).
- **Arrow Left Icon (SVG):**
  - Dimensions: Width `12px`, Height `12px`, Color fill `#091426`, structural constraint (`flex-shrink-0`)
  - Interactive State: Under active container hover, shifts `-2px` to the left (`transform group-hover:-translate-x-0.5 transition-transform`).
  - Path Data: `M2.86875 6.75L7.06875 10.95L6 12L0 6L6 0L7.06875 1.05L2.86875 5.25H12V6.75H2.86875Z`
- **Link Typography (`<span>`):**
  - Font: Inter, `14px` (`text-sm`), Semibold, Line Height `20px` (`leading-5`), Letter Spacing `0.01em`
  - Color: `#091426`
  - Text Content: `Back to Sign In`

---

## 3. System Color Key Variables
* `#091426` : Brand Primary Dark / Font Primary / Main Button Solid Fill
* `#122544` : Interactive Primary Hover Color
* `#45474C` : Medium Gray / Secondary Narrative Copy
* `#C5C6CD` : Base Architectural Grid / Borders / Horizontal Dividers
* `#FFFFFF` : Canvas Background Color
* `rgba(117, 119, 125, 0.50)` : Transparent Placeholder Font Mask