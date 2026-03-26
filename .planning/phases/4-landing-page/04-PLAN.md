---
wave: 1
depends_on: ["Phase 3"]
files_modified: ["client/pages/index.js"]
autonomous: true
---

# Phase 4: Landing Page - Execution Plan

<objective>
To transform the public-facing landing page from a generic animated template into a premium, mature SaaS marketing site. The new layout will utilize a Vercel-inspired subtle atmosphere, a Bento box feature grid, and stronger narrative flow.
</objective>

<requirements_addressed>
- PAGES-02
</requirements_addressed>

<tasks>

<task>
<description>Redesign the Landing Page layout and styling structure</description>
<read_first>
- client/pages/index.js
</read_first>
<action>
Rewrite the `client/pages/index.js` file with the following major architectural updates:
1. **Hero Section Redesign**:
   - Completely remove the massive animated `blur-3xl` background circles that dominate the screen.
   - Introduce a subtle "✨ Introducing SmartDesk 2.0" pill badge above the main H1.
   - Restructure the headers to use strong, tight typography (`text-primary` or muted gradients) without overwhelming neon.
2. **Metrics & Trust Strip**:
   - Move the 4 core stats (200+ Features, 10k+ Students, etc.) up directly underneath the Hero buttons inside a sleek, single-row `border-y border-border/50` metrics band.
3. **Bento Box Features Grid**:
   - Restructure the 9 symmetric features into an asymmetrical grid (e.g., using `md:col-span-2` for major features like AI Intelligence and Analytics).
   - Ensure these boxes use `futuristic-card` with clean, low-opacity backgrounds (`bg-surface`) and subtle borders.
4. **General Flow & Cleanup**:
   - Convert the "About" section into a clean linear narrative instead of two floating blocks.
   - Refactor the "Get In Touch" section to match the sleek form inputs created in Phase 2.
   - Ensure the footer uses muted tones (`text-secondary/muted`) without bright neon accents.
</action>
<acceptance_criteria>
- The 3 massive Animated background bubble divs are removed.
- The 9 features are structured in a Bento box format (using variable `col-span` utility classes).
- The Stats section is integrated gracefully into the flow instead of being isolated generic cards.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- The landing page must load cleanly without horizontal scroll issues.
- The marketing site must look and feel like an enterprise product rather than a weekend project.
</must_haves>

<verification>
1. Visually check `npm run build` validation for syntax.
2. Ensure there are no instances of `animate-pulse` driving huge `blur-3xl` circles in `index.js`.
</verification>
