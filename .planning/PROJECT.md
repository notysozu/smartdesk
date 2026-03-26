# SmartDesk UI Antigravity Redesign

## Core Value
The ONE thing that must work: A premium, modern, executive-grade SaaS interface that feels polished, calm, and highly readable, replacing the current "neon cyberpunk" prototype feel while retaining the dark glassmorphism foundation.

## Context
Redesigning and extending the existing SmartDesk frontend (an AI-powered university management system). The frontend stack is Next.js pages router + React + Tailwind CSS + Font Awesome. The goal is to bring the design up to the quality of Linear, Stripe, or Vercel, without rewriting the whole stack.

## Constraints
- Keep the existing Next.js + Tailwind + Font Awesome architecture.
- Work within the current frontend architecture instead of rewriting the whole stack.
- Reuse and refine existing components (glass, buttons, cards, inputs) where possible.
- Maintain responsive behavior and preserve accessibility (contrast, focus states, keyboard support, readable text).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Retain dark/glass foundation | App already has reusable utilities (`futuristic-card`, `glass`, etc.) in `globals.css` and `tailwind.config.js`. | Evolve from neon to premium (slate, graphite, deep navy, soft white, muted indigo). |
| Implement Design Token System | Needed for a coherent design system before updating shared primitives. | Pending |

## Requirements

### Validated
- ✓ Dark glassmorphism foundation exists in `globals.css` and `tailwind.config.js`.

### Active
- [ ] Define cohesive design token system in `tailwind.config.js` and `globals.css`.
- [ ] Update shared primitives: page background, cards, buttons, inputs, tables, nav, modals.
- [ ] Apply the new system to the Landing Page.
- [ ] Apply the new system to the Admin Dashboard.
- [ ] Propagate the design system to the rest of the Admin pages for consistency.

### Out of Scope
- Complete rewrite of the frontend stack (Next.js/React).
- Bright cyan/magenta neon as dominant colors.
- Exaggerated parallax or constant looping effects (over-animated UI).

---
*Last updated: 2026-03-27 after initialization*

## Evolution
This document evolves at phase transitions and milestone boundaries.
