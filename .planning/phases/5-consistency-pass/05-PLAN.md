---
wave: 1
depends_on: ["Phase 4"]
files_modified: ["client/pages/api-docs.js", "client/pages/login.js", "client/pages/student.js", "client/pages/privacy.js", "client/pages/terms.js"]
autonomous: true
---

# Phase 5: Consistency Pass - Execution Plan

<objective>
To perform a final normalization pass across all remaining secondary pages ensuring the complete removal of explicit "cyberpunk" inline colors (like `neon-yellow`) and standardizing header typography across the platform to lock in the cohesive enterprise design system.
</objective>

<requirements_addressed>
- CONS-01
</requirements_addressed>

<tasks>

<task>
<description>Normalize Hardcoded Yellow Highlights</description>
<read_first>
- client/pages/api-docs.js
</read_first>
<action>
Modify `client/pages/api-docs.js`:
1. The documentation contains endpoints using explicit warning or update colors like `bg-neon-yellow/20`, `text-neon-yellow`, etc. Replace all these instances with the standardized warning/highlight colors in our semantic toolkit (e.g., `text-accent`, `bg-accent/20`, `border-accent`).
</action>
<acceptance_criteria>
- No explicit `neon-yellow` classes remain anywhere in `client/pages/api-docs.js`.
</acceptance_criteria>
</task>

<task>
<description>Standardize Secondary Page Headings</description>
<read_first>
- client/pages/login.js
- client/pages/student.js
- client/pages/privacy.js
- client/pages/terms.js
- client/pages/api-docs.js
</read_first>
<action>
Iterate through the auxiliary pages listed above:
1. Re-format `<h1 className="... text-gradient-neon">` and `<h2 className="... text-gradient-neon">` headers into clean `text-3xl md:text-4xl font-bold text-primary tracking-tight` format (or equivalent relative size).
2. Sidelining `text-gradient-neon` aligns these pages with the mature, high-converting visual hierarchy implemented inside the Admin Dashboard and Landing Page.
</action>
<acceptance_criteria>
- Secondary pages feature clean, non-gradient semantic primary text headers.
- The `text-gradient-neon` class is drastically reduced or fully eliminated from page hero segments.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- The final application is completely rid of `neon-*` inline text and background utility patches.
- The system should maintain its layout structures intact during typography normalization.
</must_haves>

<verification>
1. Run a final global recursive grep for `neon-yellow` and `text-gradient-neon` inside `client/pages/` to confirm complete phase execution.
</verification>
