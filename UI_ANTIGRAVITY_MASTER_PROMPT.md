# SmartDesk Antigravity UI Master Prompt

Use this as the master prompt for redesigning or extending the current SmartDesk frontend.

## Master Prompt

```text
You are redesigning and extending the existing SmartDesk frontend, not inventing a totally unrelated product.

Project context:
- Product: SmartDesk
- Domain: AI-powered university management system
- Frontend stack: Next.js pages router + React + Tailwind CSS + Font Awesome
- Existing UI direction: dark theme, soft gradients, glass cards, blur, rounded surfaces, subtle hover states
- Existing product areas: landing page, login, admin dashboard, analytics, users, academic, attendance, hostel, library, events, financial, infrastructure, announcements, config
- The current app already has glassmorphism foundations and dark atmospheric backgrounds; evolve it into a more premium modern SaaS experience

Design objective:
Create a refined, high-end modern SaaS interface that feels inspired by Linear, Stripe, and Vercel:
- elegant and minimal
- premium, calm, and polished
- clean information hierarchy
- visually spacious, never cluttered
- subtle motion, not flashy motion
- glassmorphism only where it improves layering and depth
- production-grade UI that feels intentional and credible

Core art direction:
- Keep the dark sophisticated foundation, but reduce the “neon cyberpunk” feel
- Replace loud neon saturation with restrained brand accents
- Favor slate, graphite, deep navy, soft white, cool blue, muted indigo, and occasional emerald accents
- Surfaces should feel layered, translucent, and crisp
- Use soft light bloom, hairline borders, low-contrast separators, and premium shadows
- Avoid gimmicky sci-fi effects, excessive glow, rainbow gradients, or noisy decoration

Visual style rules:
- Think “executive SaaS dashboard” rather than “gaming UI”
- Use large confident typography, clean spacing, and strong alignment
- Favor rounded-xl to rounded-2xl surfaces
- Use glass panels selectively for nav, hero callouts, stat cards, modal shells, and floating toolbars
- Prefer soft blur, translucent fills, and thin borders over heavy glow
- Use gradients sparingly and strategically in hero areas, KPI emphasis, chart accents, and primary CTAs
- Every section should have breathing room
- Prioritize readability and fast scanning over decoration

Layout rules:
- Use clear visual hierarchy: page shell, header, section intro, primary content, secondary content
- Keep dashboards structured with strong grid systems and predictable spacing
- Use content density similar to Linear or Vercel admin surfaces: compact but not cramped
- Important actions should be obvious without dominating the whole screen
- Keep sidebars, topbars, cards, and tables consistent across admin pages

Motion rules:
- Add subtle animations and micro-interactions only
- Prefer fade-up, soft scale, opacity transitions, hover elevation, shimmer highlights, and smooth panel reveals
- Keep durations around 150ms to 300ms for hover and 300ms to 500ms for entrances
- Avoid bouncy motion, exaggerated parallax, or constant looping effects
- Motion should guide attention, confirm interactivity, and add polish

Glassmorphism rules:
- Use glassmorphism where appropriate, not everywhere
- Apply glass mainly to:
  - top navigation
  - hero callout panels
  - dashboard summary cards
  - modals / drawers
  - floating filter/action bars
- Glass surfaces should include:
  - translucent dark or tinted background
  - backdrop blur
  - subtle inner highlight
  - thin low-contrast border
  - soft shadow
- Do not make text low-contrast just because the panel is glass

Brand and color rules:
- Preserve SmartDesk as a serious, modern software product
- Base palette should feel premium and subdued
- Suggested palette direction:
  - background: deep navy / graphite
  - surface: charcoal / slate glass
  - primary accent: electric-but-muted blue
  - secondary accent: soft indigo
  - success: restrained emerald
  - warning: amber
  - danger: rose/red
- Avoid bright cyan/magenta neon as dominant colors

Typography rules:
- Use a clean, premium sans direction
- Type should feel modern, sharp, and enterprise-ready
- Headlines should be bold and confident
- Body text should be neutral, legible, and slightly softened
- Use tighter tracking in headings and balanced line lengths

Component rules:
- Buttons: sleek, tactile, premium, with clear primary/secondary/ghost hierarchy
- Inputs: soft glass or matte dark surfaces, clear focus rings, excellent readability
- Cards: layered, structured, with concise headings and restrained supporting text
- Tables: cleaner enterprise styling, subtle row separators, hover states, compact spacing
- Charts: elegant, minimal, readable, with muted gridlines and tasteful accent colors
- Navigation: crisp, lightweight, and consistent across pages
- Modals: centered, polished, blurred backdrop, strong action hierarchy
- Empty states: simple, helpful, visually refined

Landing page direction:
- Give the homepage a premium SaaS marketing feel
- Hero should feel ambitious but calm
- Include tasteful gradient atmosphere and one standout product visualization or dashboard preview
- Sections should flow with strong narrative: value proposition, product modules, analytics, trust, CTA
- Make it feel like a real product company, not a template

Admin/dashboard direction:
- The admin experience should feel like a premium operations console
- Improve consistency across all modules
- Use one reusable visual system for cards, headers, tables, forms, filters, and page spacing
- Surface KPIs and quick actions clearly
- Reduce visual noise and improve scanability

Implementation constraints:
- Keep the existing Next.js + Tailwind + Font Awesome setup
- Work within the current frontend architecture instead of rewriting the whole stack
- Reuse and refine existing glass, button, card, and input patterns where possible
- Introduce CSS variables/tokens for a more coherent design system
- Maintain responsive behavior for desktop, tablet, and mobile
- Preserve accessibility: contrast, focus states, keyboard support, readable text sizes

What to optimize for:
- premium SaaS aesthetic
- elegant simplicity
- subtle delight
- consistency across pages
- polished micro-interactions
- strong UX clarity
- implementation realism in the current codebase

What to avoid:
- clutter
- oversized glowing borders
- hyper-saturated neon everywhere
- noisy backgrounds
- generic startup template feel
- over-animated UI
- decorative elements that hurt readability

When generating code or design updates:
- Start by defining a cohesive design token system for colors, surfaces, borders, shadows, radii, spacing, and motion
- Then update shared primitives first: page background, cards, buttons, inputs, tables, nav, modals
- Then apply the system to the landing page and admin dashboard
- Then propagate it to the rest of the admin pages for consistency
- Keep the result believable, polished, and shippable

Final quality bar:
The final UI should feel like SmartDesk matured from a neon prototype into a premium modern SaaS platform with tasteful glassmorphism, subtle motion, and a clean executive-grade interface.
```

## Short Version

```text
Redesign the current SmartDesk frontend into a premium modern SaaS experience inspired by Linear, Stripe, and Vercel. Keep the existing Next.js + Tailwind architecture and evolve the current dark glass foundation into a cleaner, calmer, more refined system. Reduce the cyber/neon feel, introduce restrained brand accents, use glassmorphism selectively, add subtle micro-interactions, improve hierarchy and spacing, and make every page feel polished, spacious, and consistent. Prioritize elegant dashboards, readable forms and tables, soft gradients, premium shadows, thin borders, strong typography, and implementation realism within the existing codebase.
```

## Notes For SmartDesk Specifically

- Current strength: the app already has good dark/glass foundations in [`client/styles/globals.css`](/home/sonukumar/Documents/projects/smartdesk/client/styles/globals.css) and reusable utility classes like `futuristic-card`, `glass`, `btn-neon`, and `input-neon`.
- Current gap: the page styling still leans heavily on neon cyan/pink/purple tokens in [`client/tailwind.config.js`](/home/sonukumar/Documents/projects/smartdesk/client/tailwind.config.js), plus some sections still read as “futuristic neon” instead of “premium SaaS”.
- Best use of this prompt: pair it with a request like “refactor the landing page and admin dashboard first, then normalize the rest of the admin pages to the same design system.”
