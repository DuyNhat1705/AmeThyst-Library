# Implementation Plan: Interactive Floor Plan Map

**Branch**: `023-interactive-floor-map` | **Date**: 2026-07-01 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/023-interactive-floor-map/spec.md`

## Summary
Implement a fully responsive and interactive library floor map feature supporting multiple maps (Map 1 for NVC branch, Map 2 for Linh Trung branch). The UI combines a 2D floor layout PNG background (`mapCS1.png` or `map_cs2.png`) from `client/app/assets/MapImages/` overlaid with an interactive SVG coordinates layer (`map_layout1.svg` or `Map_layout_2.svg`). Hovering highlights room elements and clicking opens a side drawer details panel displaying database room records, availability, and a 3D visualization preview from the Map's `3D/` asset directory.

The map route is configured at `/map` in `client/app/map/page.tsx`, directly binding to the navigation bar's LIMA map tab link.

Special layout rules are applied dynamically based on the space's capacity:
- If `capacity = 1`, only the name, description, and 3D preview (`room_{room_id}.png`) are shown (no reservation or other attributes are shown).
- If `capacity > 1`, all room attributes are shown, and reservation/calendar elements are displayed exclusively for logged-in users (guests see a login CTA prompt).

The 3D visualization preview images are loaded from `client/app/assets/MapImages/3D/room_{room_id}.png`, mapping the database primary key `room_id` dynamically.

## Technical Context

**Language/Version**: JavaScript (ES Modules for Node.js backend, ES6+ for React frontend)

**Primary Dependencies**: React 19, Next.js 16, Tailwind CSS v4, Express 5.x, pg 8.x (PostgreSQL client)

**Storage**: PostgreSQL (tables: `study_room`, `room_avail`, `reserve_room`)

**Testing**: Jest (for backend API controller, service, and model tests)

**Target Platform**: Modern Desktop and Mobile Web Browsers (Chrome, Safari, Firefox, Edge)

**Project Type**: Web Application (Next.js client + Express backend)

**Performance Goals**:
- Floor map rendering and coordinates overlay setup in < 1 second.
- Toggling between Map 1 and Map 2 layouts under 500 milliseconds.
- Side drawer details panel opening with 3D image preloaded under 300 milliseconds.

**Constraints**:
- Absolute pixel layout alignment must be scaled responsively using responsive SVGs (`viewBox`).
- Interactivity must not be occluded (overlay elements must use `pointer-events: none` container / `pointer-events: auto` shapes).
- Strict adherence to project's Light/Dark mode and localization constraints.
- Conditional render logic in details panel based on capacity (informative vs. reservable space) and authentication status (member booking calendar vs. guest login prompt).
- Static assets directory is located at `client/app/assets/MapImages/`.
- Frontend route directory is at `client/app/map/page.tsx` corresponding to URL path `/map`.

**Scale/Scope**: Two branches/maps: Map 1 (NVC, 15 room/zone elements), Map 2 (LT, 9 room/zone elements).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I: Component-Driven & Reusability**: Yes. Interactive map rendered via atomic component `<FloorMap />` and details panel via `<RoomDetailPanel />`, matching `FilterPanel` structures.
- **Principle II: State Management & Data Fetching**: Yes. activeMap state and loading/error/success states handled explicitly. URL constants configured dynamically via environment variables.
- **Principle III: Responsive & Beautiful Design**: Yes. Uses Tailwind CSS layout alignment and micro-interactions for highlights.
- **Principle V: Error Handling & Accessibility**: Yes. Displays graceful fallbacks for missing 3D images and database connection errors.
- **Principle IX: Light/Dark Mode & Localization (i18n)**: Yes. Styled using Tailwind CSS v4 dark mode utilities. Text strings localized via translation keys in `en.json` and `vi.json`.
- **Backend Architecture & Casing**: Yes. Strictly follows Controller -> Service -> Model layer chain. Filenames use ES Modules `.mjs` naming conventions.

---

## Project Structure

### Documentation (this feature)

```text
specs/023-interactive-floor-map/
├── plan.md              # This file
├── research.md          # Decision log on alignment, mappings, and availability queries
├── data-model.md        # Relational schema structure and SQL seeds script
├── contracts/
│   └── api.md           # API endpoints contracts specifications
├── quickstart.md        # Guide to run database setup, localizations, and verify feature
└── checklists/
    └── requirements.md  # Quality assurance requirements checklist
```

### Source Code Layout

```text
client/
├── app/
│   ├── assets/
│   │   └── MapImages/
│   │       ├── 3D/          # Contains room_1.png to room_23.png
│   │       ├── LayoutCS1.png
│   │       ├── Layout_cs2.png
│   │       ├── mapCS1.png
│   │       ├── map_cs2.png
│   │       ├── map_layout1.svg
│   │       └── Map_layout_2.svg
│   └── map/
│       └── page.tsx         # Next.js floor map page (/map)
└── components/
    └── library/
        ├── FloorMap.tsx     # Map renderer with absolute SVG overlay
        └── RoomDetailPanel.tsx # Side-drawer details slide-out panel
 
server/
└── src/
    ├── controllers/
    │   └── room.controllers.mjs
    ├── models/
    │   └── room.models.mjs
    ├── routes/
    │   └── room.routes.mjs
    └── services/
        └── room.services.mjs
```

**Structure Decision**: Web application layout utilizing a fat Service layer in the backend Express service and modular reusable React components in the frontend client.

## Complexity Tracking

*No violations identified.*
