---
wave: 1
depends_on: []
files_modified: ["client/tailwind.config.js", "client/styles/globals.css"]
autonomous: true
---

# Phase 1: Design Tokens - Execution Plan

<objective>
To establish a cohesive design token system by defining new colors, surfaces, borders, shadows, radii, spacing, and motion utilities that replace the "neon cyberpunk" aesthetic with a premium, executive-grade SaaS look inspired by Linear, Stripe, and Vercel.
</objective>

<requirements_addressed>
- TOK-01
</requirements_addressed>

<tasks>

<task>
<description>Update global CSS variables in globals.css</description>
<read_first>
- client/styles/globals.css
</read_first>
<action>
Modify `client/styles/globals.css` to introduce the new overarching aesthetic and design tokens:
1. Replace all highly saturated neon theme variables (e.g. bright cyan, magenta) with a premium palette including: slate, graphite, deep navy, soft white, cool blue, muted indigo, and occasional emerald accents.
2. Ensure the base dark/glass foundation is preserved but made more translucent, structured, and modern.
3. Define CSS variables for `radius-xl` and `radius-2xl` for rounded corners.
4. Establish softer shadows (no glowing borders), thin hairline borders with low contrast, and soft blur. 
5. Adjust `futuristic-card` or `btn-neon` utilities if they exist to match the new subdued style, keeping the names for backward compatibility or updating them to more generic token names like `card-glass` and `btn-primary`.
</action>
<acceptance_criteria>
- `client/styles/globals.css` contains variables replacing bright neon cyan/pink colors.
- `client/styles/globals.css` defines softened shadow variables without excessive glow.
</acceptance_criteria>
</task>

<task>
<description>Update Tailwind Config with new Token System</description>
<read_first>
- client/tailwind.config.js
- client/styles/globals.css
</read_first>
<action>
Update `client/tailwind.config.js` to map the Tailwind configuration to the newly defined CSS variables or direct hex codes for the new tokens:
1. Remove bright "cyberpunk" colors and ensure the theme `colors` object includes the new subdued `brand`, `surface`, `background`, and `accent` colors.
2. Include the new drop shadows for hovering elevation or refined depth.
3. Validate that standard fonts (like Inter or Roboto) are established as the default sans family.
</action>
<acceptance_criteria>
- `client/tailwind.config.js` exports configuration with non-neon styling.
- `client/tailwind.config.js` properly integrates typography and color overrides that reflect the new SaaS direction.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- The UI retains a dark mode foundation but without any aggressive neon or gaming-style artifacts.
- The Tailwind theme cleanly imports the new design variables to be used by the shared primitives later.
</must_haves>

<verification>
1. Run `npm run lint` or visually inspect the tailwind configuration file to ensure syntax is valid.
2. Check that no high-saturation `#ff00ff` or similar stark colors remain as dominant themes in the CSS definitions.
</verification>
