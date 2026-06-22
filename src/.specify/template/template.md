## 2. Global Feature Requirements (Light/Dark Mode & Localization)

All newly created or updated UI components and pages MUST strictly adhere to the following two global systems:

### 2.1. Theme System (Light/Dark Mode)
* **Standard:** Hardcoded color codes (hex, rgb, etc.) are strictly prohibited. All styling must utilize the system Design Tokens or explicit framework-level dark mode utilities (e.g., Tailwind CSS utility classes: `bg-white dark:bg-slate-900`).
* **Default State:** The theme must initially resolve to the user's Operating System preference (System Preference). If undetected, it must fallback to `light` mode.
* **Persistence:** The active theme state must be synchronized and persisted in `LocalStorage` to maintain the user's preference across browser sessions and page reloads.

### 2.2. Localization System (i18n - English/Vietnamese)
* **Standard:** Hardcoded text strings within UI files/components are strictly prohibited. All user-facing text, placeholders, and error messages must be managed as key-value pairs within the global localization dictionaries (`en.json` and `vi.json`).
* **Implementation:** Text invocation must exclusively use the framework's i18n translation hook/method (e.g., `t('namespace.key')`).
* **Automation & Expansion:** When generating or modifying components containing text, the system must automatically derive and append the corresponding keys to both `en.json` and `vi.json`. If an English translation is not immediately available, the Vietnamese text must be used as a temporary fallback value, but the keys must structurally exist in both translation files simultaneously.