# Project Roadmap

**5 phases** | **5 requirements mapped** | All v1 requirements covered ✓

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Design Tokens | Establish the new core visual foundation in Tailwind | TOK-01 | 2 |
| 2 | Shared Primitives | Update standard UI components to match the new tokens | PRIM-01 | 3 |
| 3 | Admin Dashboard | Refactor the dashboard layout and visual hierarchy | PAGES-02 | 3 |
| 4 | Landing Page | Give the homepage a premium SaaS marketing feel | PAGES-01 | 3 |
| 5 | Consistency Pass | Ensure all remaining admin pages use the new system | CONS-01 | 2 |

### Phase Details

**Phase 1: Design Tokens**
Goal: Define cohesive design token system for colors, surfaces, borders, shadows, radii, spacing, and motion.
Requirements: TOK-01
Success criteria:
1. `tailwind.config.js` updated with new palette (slate, graphite, deep navy, etc.) instead of bright neon.
2. `globals.css` updated with new CSS variables/tokens for a coherent design system.
**UI hint**: yes

**Phase 2: Shared Primitives**
Goal: Update core UI components using the new token system.
Requirements: PRIM-01
Success criteria:
1. Buttons, inputs, and cards exhibit premium SaaS aesthetic (subtle hover states, refined glass).
2. Navigation, tables, and modals have updated layers, translucent backgrounds, and crisp shadows.
3. Typography uses modern sans direction, bold headlines, neutral body.
**UI hint**: yes

**Phase 3: Admin Dashboard**
Goal: Modernize the admin operations console.
Requirements: PAGES-02
Success criteria:
1. Dashboard utilizes the new card, header, and table primitives.
2. KPIs and quick actions are clearly surfaced with reduced visual noise.
3. Content density feels similar to Vercel/Linear (compact but not cramped).
**UI hint**: yes

**Phase 4: Landing Page**
Goal: Refresh the public-facing landing page.
Requirements: PAGES-01
Success criteria:
1. Hero section feels ambitious but calm with restricted gradient atmosphere.
2. Sections flow with strong narrative (value prop, product modules, trust).
3. The page reflects a mature, real product company rather than a generic template.
**UI hint**: yes

**Phase 5: Consistency Pass**
Goal: Normalize all other pages to the new design system.
Requirements: CONS-01
Success criteria:
1. Analytics, users, academic, and other domain modules inherit the updated primitives cleanly.
2. No residual "cyberpunk" or glaring neon remains on secondary pages.
**UI hint**: yes
