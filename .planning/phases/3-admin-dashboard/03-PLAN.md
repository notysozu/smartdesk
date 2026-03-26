---
wave: 1
depends_on: ["Phase 2"]
files_modified: ["client/pages/admin/index.js"]
autonomous: true
---

# Phase 3: Admin Dashboard - Execution Plan

<objective>
To modernize the admin operations console, updating the main layout, sidebar, and grid elements to a cleaner spacing hierarchy mirroring Vercel or Linear, while removing remaining explicit neon shadow classes.
</objective>

<requirements_addressed>
- PAGES-01
</requirements_addressed>

<tasks>

<task>
<description>Refactor the Admin Dashboard UI Component Density and Layout</description>
<read_first>
- client/pages/admin/index.js
</read_first>
<action>
Modify `client/pages/admin/index.js`:
1. **Reduce Visual Noise in Sidebar**: Standardize the sidebar links' hover and active states (using background opacity, clean borders without explicitly coloring each link). Ensure sidebar takes up `w-64` and uses `var(--surface)`.
2. **Compact Feature Modules Grid**: 
   - Update `getColorClasses` to remove the hardcoded explicit drop shadows (`shadow-[0_0_20px_rgba(...)]`). 
   - Replace them all with generic semantic borders or let `futuristic-card` manage the borders completely by removing the dynamic border variables there.
   - Decrease feature module icon sizes from `text-4xl` to `text-2xl` and adjust spacing to create a tighter look (e.g. `gap-4` instead of `gap-6` or smaller internal padding).
3. **Refine Quick Stats**: 
   - Update the Quick Stats grid to maintain standard metric sizes (label, large value, smaller supporting icon). 
   - Remove overly large decorative elements.
4. **Header hierarchy**: Simplify the bold hero text to use a standard modern sans style, shifting away from massive gradients to crisp, readable, professional UI headings.
</action>
<acceptance_criteria>
- `shadow-[0_0_20px_rgba` patterns do not exist in `client/pages/admin/index.js` anymore.
- Feature module grid uses smaller icons or tighter spacing.
- The Quick stats and Layout sections use cleaner primitive classes resulting in a compact presentation.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- The page must continue rendering cleanly and all 12 modules must remain accessible.
- The layout density scales comfortably on standard desktop displays, appearing like a professional SaaS dashboard.
</must_haves>

<verification>
1. Grep search `client/pages/admin/index.js` for `shadow-\[` to assure hardcoded explicit dropshadows are entirely removed.
</verification>
