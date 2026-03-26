---
wave: 1
depends_on: ["Phase 1"]
files_modified: ["client/pages/**/*.js", "client/components/**/*.js"]
autonomous: true
---

# Phase 2: Shared Primitives - Execution Plan

<objective>
To update core UI components (buttons, inputs, cards, navigation, tables, and modals) to utilize the new premium SaaS design token system established in Phase 1, replacing all legacy hardcoded "neon" tailwind classes (which are now broken) across the codebase.
</objective>

<requirements_addressed>
- PRIM-01
</requirements_addressed>

<tasks>

<task>
<description>Refactor Hardcoded Colors and Legacy Utility Classes in Core Pages</description>
<read_first>
- client/tailwind.config.js
- client/pages/index.js
- client/pages/login.js
- client/pages/student.js
- client/pages/terms.js
- client/pages/privacy.js
- client/pages/_app.js
</read_first>
<action>
Iterate through the core base pages and replace legacy generic classes with the semantic tokens:
1. Replace `text-neon-cyan` and `text-neon-pink` with `text-brand` or `text-brand-strong`.
2. Replace `border-neon-cyan/30` or `border-neon-pink` with `border-border-strong`.
3. Replace `bg-dark` or `bg-darker` with `bg-background` or `bg-background-soft`.
4. Replace `bg-card` with `bg-surface`.
5. Remove `neon-glow` from standard text or navigation links and replace with standard `text-primary hover:text-brand`.
6. Ensure that `btn-neon` and `input-neon` inputs structure aligns with the newly defined styling (using standard structural layout, e.g. replacing any hardcoded borders wrapping them).
</action>
<acceptance_criteria>
- `text-neon-cyan` and `text-neon-pink` do not exist in `client/pages/index.js`.
- `text-neon-cyan` and `text-neon-pink` do not exist in `client/pages/student.js`.
- `bg-dark` is completely replaced.
</acceptance_criteria>
</task>

<task>
<description>Refactor Hardcoded Colors and Legacy Utilities in Admin Dashboard</description>
<read_first>
- client/pages/admin/index.js
- client/pages/admin/analytics.js
- client/pages/admin/users.js
- client/pages/admin/settings.js
- client/pages/admin/events.js
- client/pages/admin/announcements.js
- client/pages/admin/academic.js
- client/pages/admin/attendance.js
- client/pages/admin/financial.js
- client/pages/admin/hostel.js
- client/pages/admin/infrastructure.js
- client/pages/admin/library.js
</read_first>
<action>
Iterate through the admin pages and sanitize the component utility classes:
1. Strip out `text-neon-cyan`, `text-neon-purple`, etc. replacing them with `text-brand`, `text-accent`, or `text-primary`.
2. Update table definitions to have clean borders (`border-border`) instead of neon coloring.
3. Update specific modals that have `border-neon-cyan` to `border-border`.
4. Ensure typography focuses on modern sans layout (bold semantic headers, `text-secondary` body contents).
</action>
<acceptance_criteria>
- `text-neon-cyan` and `text-neon-purple` do not exist in the admin pages.
- Admin dashboard components properly utilize `bg-surface` or `futuristic-card` interchangeably without manual neon border overrides.
</acceptance_criteria>
</task>

<task>
<description>Update Chart Components for consistency</description>
<read_first>
- client/components/Charts.js
</read_first>
<action>
Modify the chart component styling directly:
1. Update chart stroke and fill colors from explicit hex neon values (`#00ffff`, `#ff00ff`) to reference the CSS variables or literal Hex codes from the new palette (e.g., `#3b82f6` for brand, `#6366f1` for accent).
2. Ensure grid lines and axes use `rgba(148, 163, 184, 0.1)` for a subtle look matching `var(--surface-border)`.
</action>
<acceptance_criteria>
- `client/components/Charts.js` no longer contains `#00ffff` or `#ff00ff`.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- The UI contains no broken Tailwind classes resulting from the token cleanup in Phase 1.
- Buttons, inputs, and cards standardly inherit the Phase 1 primitives.
</must_haves>

<verification>
1. Run `grep -r "neon-cyan" client/pages` and ensure it returns 0.
2. Build the app using `npm run build` or visually review to ensure the layout remains stable.
</verification>
