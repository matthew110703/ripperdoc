# Ripperdoc --- Unified Design System & Theme Architecture

> **Status:** Foundation specification\
> **Themes:** Obsidian, Luminous\
> **Purpose:** Normalize the existing theme specifications into one
> shared Ripperdoc design-system contract.

---

## 1. Purpose

Ripperdoc is the shared UI/design-system platform consumed by multiple
micro-frontends.

The two current visual themes are:

- **Obsidian** --- dark, immersive, cinematic minimalism
- **Luminous** --- light, editorial, architectural minimalism

The existing theme documents are strong visual specifications, but they
use slightly different naming, spacing scales, typography scales, and
some conflicting color descriptions.

This document establishes the unified architecture that sits between
those design documents and the implementation.

The goal is:

```text
Theme Design Specifications
        ↓
Ripperdoc Design Contract
        ↓
Foundations / Tokens
        ↓
Themes
        ↓
Components
        ↓
Micro-frontends
```

---

# 2. Core Architecture

Ripperdoc is divided into four conceptual layers:

```text
┌─────────────────────────────────────┐
│  1. Foundations                     │
│  Spacing, type, radius, breakpoints │
│  motion, sizing, layout primitives  │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│  2. Semantic Design Tokens          │
│  Color roles, text roles, surfaces  │
│  borders, focus, states, elevation  │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│  3. Themes                          │
│  Obsidian / Luminous                │
│  Same token contract, different     │
│  visual values                      │
└──────────────────┬──────────────────┘
                   ↓
┌─────────────────────────────────────┐
│  4. Components                      │
│  Button, Card, Input, Dialog, etc.  │
│  Theme-aware implementation         │
└─────────────────────────────────────┘
```

A component should not contain theme-specific hard-coded values.

For example:

```tsx
<Button variant="primary">Play</Button>
```

The component API remains the same.

Obsidian and Luminous determine how the button looks.

---

# 3. Global vs Theme-Specific

A critical rule:

> **Themes change visual expression; foundations define the shared
> system.**

## Global foundations

These should be shared by all themes:

```text
spacing
typography structure
font family
font weights
radius scale
breakpoints
grid structure
container behavior
z-index conventions
motion durations
interaction principles
component API
```

## Theme-specific values

These may change between themes:

```text
color values
surface colors
text colors
borders
shadows
elevation treatment
glass/blur treatment
accent colors
component visual treatment
```

This prevents Obsidian and Luminous from becoming two unrelated design
systems.

---

# 4. Token Architecture

Use three token layers.

```text
Primitive Tokens
      ↓
Semantic Tokens
      ↓
Component Tokens
```

## 4.1 Primitive Tokens

Primitive tokens represent raw values.

Examples:

```text
blue-500
blue-600
slate-900
neutral-0
neutral-950
white
black
space-4
space-8
radius-8
```

Primitive tokens should generally not be consumed directly by
components.

---

## 4.2 Semantic Tokens

Semantic tokens describe intent.

Examples:

```text
color.primary
color.on-primary

color.surface
color.surface-elevated

color.text-primary
color.text-secondary

color.border
color.focus

color.error
color.on-error
```

A semantic token can map to different primitives per theme.

Example:

```text
Obsidian:
color.primary → #b0c6ff

Luminous:
color.primary → #004ac6
```

The existing Obsidian token specification already follows a semantic
color model with roles such as `primary`, `on-primary`, `surface`,
`outline`, and `error`. Luminous follows the same general role
structure. fileciteturn4file1L284-L333 fileciteturn4file0L10-L59

---

## 4.3 Component Tokens

Component tokens describe component-specific intent.

Examples:

```text
button-primary-background
button-primary-foreground
button-primary-hover
button-primary-focus-ring

card-background
card-border
card-radius

input-background
input-border
input-focus-ring
```

Use component tokens when a component needs a value that should not
affect the rest of the system.

---

# 5. Naming Convention

Use lowercase kebab-case for token names.

Recommended structure:

```text
color.primary
color.on-primary
color.surface
color.surface-elevated

typography.display-lg
typography.body-md

space.4
space.8

radius.sm
radius.md

elevation.level-1
```

For implementation, these can become CSS variables such as:

```css
--rd-color-primary
--rd-color-surface
--rd-space-4
--rd-radius-md
--rd-elevation-level-1
```

The `rd-` prefix means Ripperdoc.

---

# 6. Color System

The current theme documents already share a strong semantic color
vocabulary.

The unified color contract should include:

```text
background
on-background

surface
surface-dim
surface-bright
surface-container-lowest
surface-container-low
surface-container
surface-container-high
surface-container-highest

on-surface
on-surface-variant

inverse-surface
inverse-on-surface

outline
outline-variant
surface-tint

primary
on-primary
primary-container
on-primary-container
inverse-primary

secondary
on-secondary
secondary-container
on-secondary-container

tertiary
on-tertiary
tertiary-container
on-tertiary-container

error
on-error
error-container
on-error-container
```

These roles are retained because both existing specifications already
use this model. fileciteturn4file0L12-L59
fileciteturn4file1L286-L333

---

# 7. Color Role Rules

## Primary

Used for:

```text
primary actions
active indicators
focus states
progress
selection
```

Luminous uses electric cobalt for primary interaction, while Obsidian
uses a bright blue accent within its dark palette.
fileciteturn4file0L184-L195 fileciteturn4file1L404-L411

## Secondary

Used for:

```text
secondary actions
supporting UI
neutral grounding
```

## Tertiary

Used sparingly for:

```text
special statuses
media-quality indicators
highlight states
```

## Error

Used consistently for:

```text
validation
destructive actions
error feedback
```

---

# 8. Color Source-of-Truth Rule

The current documents contain a few prose values that differ from their
structured token values.

Example:

Obsidian prose describes `#0A0A0A` and `#121212` for the main
canvas/card hierarchy, while the structured token block defines
`surface: #131313` and other surface-container values.
fileciteturn4file1L404-L431 fileciteturn4file1L286-L333

Luminous prose similarly describes `#F8FAFC`, `#FFFFFF`, `#F1F5F9`, and
`#E2E8F0`, while its structured token block contains closely related but
not identical values. fileciteturn4file0L180-L195
fileciteturn4file0L12-L59

Therefore:

> **The final token definition is the source of truth.**

Prose should explain the role of a token, not introduce a competing
value.

Before implementation, these values must be explicitly reconciled.

---

# 9. Typography

Both themes use Inter.

That should become the initial global Ripperdoc font family:

```text
font.family.sans = Inter
```

The typography architecture should be global while theme-specific
emphasis can modify values where necessary.

## Unified type roles

Use:

```text
display-xl
display-lg

headline-xl
headline-lg
headline-md
headline-sm

title-lg
title-md
title-sm

body-lg
body-md
body-sm

label-lg
label-md
label-sm
label-badge
```

Not every component must use every role.

The existing themes can map their current scales into this contract.

Obsidian currently defines display, headline, body, and label roles.
Luminous adds larger display/headline and title/body/label roles.
fileciteturn4file1L334-L378 fileciteturn4file0L60-L144

---

# 10. Typography Rules

### Font family

```text
Inter
```

### Weight hierarchy

Use:

```text
400 — Regular
500 — Medium
600 — Semibold
700 — Bold
800 — Extra Bold
```

Only introduce additional weights if a real design requirement exists.

### Numerals

Use tabular figures where numerical alignment matters:

```text
runtime
timestamps
episode numbers
quality badges
statistics
```

This requirement comes directly from the Luminous typography
specification. fileciteturn4file0L197-L204

### Long-form text

Media descriptions should remain readable and constrained in line
length.

The current Luminous specification recommends a maximum synopsis length
of approximately 68 characters per line. fileciteturn4file0L201-L204

This should be treated as a layout/content guideline rather than a
typography token.

---

# 11. Spacing

Spacing should be **global**, not theme-specific.

The two existing documents use different scales:

Obsidian uses a 4px baseline with values including 4, 8, 16, 24, and
40px. fileciteturn4file1L386-L395

Luminous uses a broader 4px-derived scale from 4px through 96px.
fileciteturn4file0L152-L167

Normalize them into one Ripperdoc spacing scale.

## Recommended scale

```text
space-1   = 4px
space-2   = 8px
space-3   = 12px
space-4   = 16px
space-5   = 20px
space-6   = 24px
space-8   = 32px
space-10  = 40px
space-12  = 48px
space-16  = 64px
space-20  = 80px
space-24  = 96px
```

The gaps intentionally include values needed by both existing themes.

---

# 12. Layout

Layout behavior is global, while individual product layouts can
specialize it.

## Grid

Use:

```text
mobile  → 4 columns
tablet  → 8 columns
desktop → 12 columns
```

This matches the existing Luminous responsive specification and the
broader responsive philosophy of the two themes.
fileciteturn4file0L206-L220

## Breakpoints

Initial contract:

```text
mobile:  < 768px
tablet:  768px – 1279px
desktop: ≥ 1280px
```

These boundaries are already explicitly defined by Luminous.
fileciteturn4file0L210-L220

## Container

Use a shared container system:

```text
container.max-width
container.margin
container.gutter
```

Do not make each theme invent a separate grid system.

---

# 13. Responsive Rules

Themes should not change the basic responsive contract.

Components should provide:

```text
responsive sizing
responsive typography
responsive spacing
responsive composition
```

Media-specific components may define product behavior such as:

```text
2:3 poster ratio
16:9 episode card
horizontal media shelf
```

Those are component/product patterns rather than global spacing tokens.

The existing theme documents use 2:3 posters and 16:9 media cards as
cinematic content patterns. fileciteturn4file0L218-L220
fileciteturn4file0L258-L260

---

# 14. Radius

Radius is also global.

Both themes currently converge on essentially the same base scale:

```text
sm     = 4px
default = 8px
md     = 12px
lg     = 16px
xl     = 24px
full   = 9999px
```

fileciteturn4file1L379-L385 fileciteturn4file0L145-L151

Normalize to:

```text
radius.sm
radius.md
radius.lg
radius.xl
radius.full
```

Recommended semantic usage:

```text
sm     → compact tags / small controls
md     → inputs / technical elements
lg     → cards / dialogs / containers
xl     → large visual surfaces
full   → pills / circular controls
```

---

# 15. Shape Language

The global radius system should provide the primitives.

Themes and components decide how strongly those primitives are used.

For example:

```text
Obsidian
→ more restrained container curvature
→ strong 12px content surfaces
→ pill chips/actions

Luminous
→ 8–12px content structures
→ stronger pill treatment for actions
```

Obsidian explicitly uses 12px for primary containers and pills for
smaller tags/chips. Luminous uses 8px/12px structures and full pills for
actions and chips. fileciteturn4file1L435-L448
fileciteturn4file0L242-L249

---

# 16. Elevation & Depth

Elevation is **theme-specific** because the two themes intentionally
express depth differently.

## Obsidian

Uses:

```text
tonal layering
soft ambient shadows
dark surface hierarchy
glass overlays
```

The specification defines base, card/list, and modal/popover levels and
calls for increased shadow density on interactive hover states.
fileciteturn4file1L425-L433

## Luminous

Uses:

```text
crisp architectural layers
slate-tinted shadows
translucent surfaces
backdrop blur
```

Its elevation hierarchy defines flat canvas, card/content plate, hovered
media, and translucent overlay levels. fileciteturn4file0L222-L240

Therefore elevation belongs in the theme token layer:

```text
elevation.level-0
elevation.level-1
elevation.level-2
elevation.level-3
```

The semantic levels remain consistent; the actual shadow/surface
implementation changes.

---

# 17. Motion System Architecture

Motion is a global foundation shared across all themes (Obsidian & Luminous) and consumed by all micro-frontends.

Ripperdoc adopts the **Tokens → Primitives → Components** model:

```text
Motion Tokens (@ripperdoc-chrome77/tokens)
       ↓
Motion Primitives & System (@ripperdoc-chrome77/components)
       ↓
UI Components (Button, Card, Badge, Dialog, Toast)
```

### 17.1 Token Contract

#### Durations
- `fast`: `150ms` (0.15s) — popovers, badges, tooltips, color transitions (`--rd-duration-fast`)
- `normal`: `250ms` (0.25s) — standard UI elements, dialog entries, layout movement (`--rd-duration-normal`)
- `slow`: `400ms` (0.40s) — large panels, full-page transitions, drawers (`--rd-duration-slow`)

#### Easing Curves
- `standard`: `cubic-bezier(0.4, 0, 0.2, 1)` / `[0.4, 0, 0.2, 1]` (`--rd-ease-standard`)
- `decelerate` (Ease Out): `cubic-bezier(0, 0, 0.2, 1)` / `[0, 0, 0.2, 1]` (`--rd-ease-decelerate`)
- `accelerate` (Ease In): `cubic-bezier(0.4, 0, 1, 1)` / `[0.4, 0, 1, 1]` (`--rd-ease-accelerate`)
- `emphasized`: `cubic-bezier(0.2, 0, 0, 1)` / `[0.2, 0, 0, 1]` (`--rd-ease-emphasized`)

#### Spring Physics Presets
- `snappy`: `{ stiffness: 400, damping: 30, mass: 0.8 }` — recommended default for interactive controls (buttons, chips, toggles)
- `gentle`: `{ stiffness: 200, damping: 25, mass: 1 }` — smooth entries for dialogs, drawers, and cards
- `bouncy`: `{ stiffness: 300, damping: 15, mass: 1 }` — playful feedback for badges, toasts, and notifications
- `stiff`: `{ stiffness: 500, damping: 35, mass: 0.5 }` — immediate response with minimal travel

---

### 17.2 Motion Provider & Global Configuration

Ripperdoc components have **motion enabled by default**. Consumers can configure or disable motion globally via `<MotionProvider>`:

```tsx
import { MotionProvider } from '@ripperdoc-chrome77/components';

export function App() {
  return (
    <MotionProvider
      disabled={false} // Set to true to disable all Motion animations and CSS transitions
      reducedMotion="user" // 'user' (respects OS) | 'always' (forces reduced) | 'never'
    >
      <MicroFrontend />
    </MotionProvider>
  );
}
```

When `disabled={true}`, the provider simultaneously:
1. Configures `motion/react` with zero transition duration and instant state resolution.
2. Injects `data-motion-disabled="true"` on the DOM root, which sets `--rd-duration-*` to `0ms !important` across all CSS transitions.

Hooks available:
- `useMotionConfig()`: Read/write motion enabled state and reduced-motion mode.
- `useReducedMotion()`: Check if reduced-motion is active via OS or provider override.
- `useIsMotionEnabled()`: True if motion is active and not reduced.

---

### 17.3 Core Semantic Motion Variants & Primitives

Instead of writing bespoke animation logic, components compose from standard primitives:

| Primitive | Presets / Props | Common Usage |
| :--- | :--- | :--- |
| `<Fade>` | `fade`, `fadeScale`, `fadeSlideUp`, `fadeSlideDown`, `blur` | Modals, tooltips, toasts |
| `<Slide>` | `direction="up" \| "down" \| "left" \| "right"` | Drawers, notification trays |
| `<Scale>` | `initialScale={0.9}` | Dropdown menus, popovers |
| `<Collapse>` | `isOpen={boolean}`, `unmountOnExit` | Accordions, disclosure panels |
| `<Stagger>` | `staggerDelay={0.05}`, `<StaggerItem>` | List feeds, search result grids |
| `<Attention>` | `variant="shake" \| "bounce" \| "pulse" \| "wiggle"` | Validation errors, badges, alerts |
| `<MotionBox>` | Polymorphic `motion.div` wrapper | Custom layout animations |

---

### 17.4 Component Motion Compliance Rule

All future components added to Ripperdoc must adhere to:
1. **Motion Enabled by Default**: Interactive actions (buttons, cards, badges) include spring feedback by default.
2. **Component Opt-Out**: Expose `motion?: boolean` (default `true`) allowing per-component opt-out (`motion={false}`).
3. **Respect Global Config**: Read `useMotionConfig()` to honor global disable and reduced-motion settings.
4. **Never Hardcode Timing**: Always consume tokens from `@ripperdoc-chrome77/tokens`.


---

# 18. Focus & Interaction

Focus must be a first-class semantic token.

Recommended:

```text
color.focus
color.focus-ring
```

Components should consistently expose a visible focus state.

Examples from the existing themes include blue focus rings for
search/input interactions and blue strokes/glows for active media.
fileciteturn4file0L265-L270 fileciteturn4file1L450-L452

---

# 19. Component Architecture

Global Ripperdoc components should remain generic.

Recommended first-level components:

```text
Button
IconButton
Input
Textarea
Select
Checkbox
Radio
Switch

Card
Badge
Chip
Avatar

Dialog
Drawer
Popover
Tooltip
Dropdown

Tabs
Pagination
Breadcrumbs

Progress
Spinner
Skeleton
Alert
Toast

Container
Stack
Grid
Separator
```

The exact component list should grow based on actual MFE needs.

---

# 20. Product-Specific Components

Do not place product/domain-specific components into the global package
unless they are intentionally reusable.

The current theme documents contain cinematic examples such as:

```text
Media Card
Episode Card
Movie Card
Video Player HUD
Watchlist
4K HDR badge
Dolby Vision badge
```

These should generally live in a product/MFE package rather than global
Ripperdoc.

Recommended separation:

```text
Ripperdoc
├── Button
├── Card
├── Badge
├── Input
├── Dialog
└── ...

Cinema MFE
├── MovieCard
├── EpisodeCard
├── VideoPlayerHUD
├── WatchlistButton
└── MediaShelf
```

The theme documents provide useful visual specifications for these
cinematic components, but their domain semantics should remain outside
the global foundation. fileciteturn4file0L251-L273
fileciteturn4file1L439-L456

---

# 21. Component Theming

A component should consume semantic/component tokens.

Example:

```text
Button
├── primary
│   ├── background
│   ├── foreground
│   ├── border
│   ├── hover
│   └── focus
│
├── secondary
└── ghost
```

Theme values:

```text
Obsidian
Button.primary.background → surface/light accent treatment

Luminous
Button.primary.background → cobalt
```

The existing specifications intentionally demonstrate this difference:
Obsidian uses a white primary button with black text, while Luminous
uses a cobalt primary play button with white text.
fileciteturn4file1L439-L444 fileciteturn4file0L251-L256

---

# 22. Theme Structure

Recommended theme structure:

```text
themes/
├── obsidian/
│   ├── colors
│   ├── typography
│   ├── elevation
│   └── component overrides
│
└── luminous/
    ├── colors
    ├── typography
    ├── elevation
    └── component overrides
```

Both themes must satisfy the same token contract.

Conceptually:

```ts
type Theme = {
  colors: ColorTokens;
  typography: TypographyTokens;
  elevation: ElevationTokens;
  components: ComponentTokens;
};
```

---

# 23. Obsidian Theme

## Identity

**Obsidian**

Visual direction:

```text
Modern cinematic minimalism
Lights-out viewing
Deep tonal layers
High contrast
Subtle glassmorphism
Calm
Exclusive
Immersive
```

These characteristics are explicitly established in the Obsidian design
specification. fileciteturn4file1L398-L417

## Theme responsibilities

Obsidian controls:

```text
dark surface hierarchy
dark-mode text contrast
blue interactive accents
dark glass overlays
ambient shadows
cinematic gradients
```

The existing structured palette provides the starting semantic values.
fileciteturn4file1L284-L333

---

# 24. Luminous Theme

## Identity

**Luminous**

Visual direction:

```text
Pristine atmospheric minimalism
Editorial clarity
Electric cobalt energy
Spatial restraint
Cool-slate surfaces
Glass-like navigation
```

These characteristics are established in the Luminous specification.
fileciteturn4file0L170-L178

## Theme responsibilities

Luminous controls:

```text
light surface hierarchy
slate typography
cobalt interactions
cool borders
architectural shadows
translucent overlays
```

The structured palette provides the starting semantic values.
fileciteturn4file0L10-L59

---

# 25. Theme Comparison

---

System Obsidian Luminous

---

Mode Dark Light

Primary visual goal Immersion Editorial clarity

Surface strategy Tonal dark layers White/cool-slate layers

Accent Bright blue Electric cobalt

Depth Ambient shadow + tonal Architectural shadow +
layering blur

Glass Dark/translucent White/translucent

Content emphasis Cinematic Editorial

Global spacing Same Same

Global radius Same Same

Component API Same Same

Semantic token names Same Same

---

---

# 26. What Must Stay Global

The following should not be duplicated between themes:

```text
spacing scale
breakpoints
grid definitions
font family
core font-weight definitions
radius scale
component APIs
layout primitives
motion token names
accessibility rules
interaction state contract
```

---

# 27. What Can Be Theme-Specific

The following may differ:

```text
color values
surface values
text contrast values
border colors
shadows
blur
elevation surfaces
accent colors
gradients
component visual treatment
theme-specific decorative effects
```

This is what allows two visually distinct experiences to share one
component library.

---

# 28. CSS Variable Strategy

The runtime theme should be represented through CSS custom properties.

Example:

```css
:root {
  --rd-color-primary: ...;
  --rd-color-surface: ...;
  --rd-color-text-primary: ...;
  --rd-radius-md: 12px;
  --rd-space-4: 16px;
}
```

Theme selector:

```css
[data-theme="obsidian"] {
  --rd-color-primary: ...;
  --rd-color-surface: ...;
}

[data-theme="luminous"] {
  --rd-color-primary: ...;
  --rd-color-surface: ...;
}
```

Components consume:

```css
background: var(--rd-color-surface);
color: var(--rd-color-text-primary);
border-radius: var(--rd-radius-md);
```

They should not know which theme supplied the values.

---

# 29. Storybook Strategy

Storybook is the primary development and documentation environment for
Ripperdoc.

Each component should be tested against both themes.

Example:

```text
Button
├── Obsidian
│   ├── Primary
│   ├── Secondary
│   ├── Ghost
│   └── Disabled
│
└── Luminous
    ├── Primary
    ├── Secondary
    ├── Ghost
    └── Disabled
```

Storybook should make theme switching easy so visual regressions can be
identified early.

---

# 30. Accessibility

Accessibility is part of the global Ripperdoc contract.

Every component must account for:

```text
keyboard navigation
focus visibility
semantic HTML
screen-reader behavior
color contrast
reduced motion
disabled states
loading states
touch targets
```

Themes may change colors, but must not violate the accessibility
contract.

---

# 31. Design Token Ownership

Recommended ownership:

```text
Global Foundation
│
├── spacing
├── radius
├── typography structure
├── breakpoints
├── motion
└── layout primitives

Theme
│
├── colors
├── elevation
├── shadows
├── overlays
└── visual expression

Component
│
├── component token mapping
├── states
└── API

MFE
│
├── domain components
├── content patterns
└── product-specific composition
```

---

# 32. Recommended Package Structure

The normalized architecture maps cleanly to the planned Ripperdoc
repository:

```text
ripperdoc/
│
├── apps/
│   └── storybook/
│
├── packages/
│   ├── tokens/
│   │   ├── src/
│   │   │   ├── primitives/
│   │   │   ├── semantic/
│   │   │   ├── themes/
│   │   │   │   ├── obsidian/
│   │   │   │   └── luminous/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── components/
│       ├── src/
│       │   ├── button/
│       │   ├── input/
│       │   ├── card/
│       │   ├── dialog/
│       │   └── ...
│       └── package.json
│
├── tooling/
├── .changeset/
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

---

# 33. Implementation Order

Do not immediately implement every value from the two theme documents.

Use this order:

### Phase 1 --- Contract

```text
Finalize token names
Finalize global foundations
Finalize theme token contract
Resolve conflicting source values
```

### Phase 2 --- Tokens

```text
Primitive tokens
Semantic tokens
Obsidian theme
Luminous theme
CSS variables
```

### Phase 3 --- Storybook

```text
Theme provider
Theme switcher
Token documentation
Token visualization
```

### Phase 4 --- Components

Start with:

```text
Button
IconButton
Input
Badge
Card
```

Then expand.

### Phase 5 --- Validation

```text
Accessibility
Responsive behavior
Visual regression
Cross-theme testing
```

### Phase 6 --- Publishing

```text
Changesets
Build
npm package
Trusted Publishing
```

---

# 34. Normalization Decisions

The following decisions are now part of the Ripperdoc architecture:

### Decision 1

**Obsidian and Luminous are themes, not separate design systems.**

### Decision 2

**Spacing is global.**

The different theme spacing definitions are normalized into one
Ripperdoc scale.

### Decision 3

**Radius is global.**

Both themes already converge closely enough to share the same scale.

### Decision 4

**Typography has a shared role contract.**

Themes can tune individual values but should not invent incompatible
naming systems.

### Decision 5

**Color is semantic and theme-specific.**

The semantic role remains stable while values change.

### Decision 6

**Elevation is semantic and theme-specific.**

The level names remain stable while shadows/surfaces differ.

### Decision 7

**Component APIs are global.**

Theme changes must not change how an MFE consumes a component.

### Decision 8

**Domain-specific cinematic components stay outside global Ripperdoc.**

### Decision 9

**Structured token definitions become the source of truth.**

Prose documentation describes token intent.

### Decision 10

**Every theme must satisfy the same token contract.**

---

# 35. Final Architecture

The final model is:

```text
                         RIPPERDOC
                             │
                 ┌───────────┴───────────┐
                 │                       │
           FOUNDATIONS              SEMANTIC TOKENS
                 │                       │
       ┌─────────┼─────────┐       ┌─────┴─────┐
       │         │         │       │           │
    Spacing   Radius   Typography  Colors   Elevation
       │         │         │       │           │
       └─────────┴─────────┴───────┴───────────┘
                             │
                             ▼
                         THEMES
                    ┌────────┴────────┐
                    │                 │
                Obsidian           Luminous
                    │                 │
                    └────────┬────────┘
                             ▼
                        COMPONENTS
                             │
            ┌────────────────┼────────────────┐
            │                │                │
          Button            Card             Input
            │                │                │
            └────────────────┼────────────────┘
                             ▼
                       MICRO-FRONTENDS
                             │
                 ┌───────────┴───────────┐
                 │                       │
            Global UI               MFE UI
                 │                       │
            Ripperdoc              Domain-specific
                                    components
```

---

# 36. Final Rule

The most important principle for Ripperdoc is:

> **One design contract, multiple visual expressions.**

Obsidian and Luminous should feel like different products while
remaining technically interchangeable.

An MFE should be able to switch:

```tsx
<RipperdocProvider theme="obsidian">
```

to:

```tsx
<RipperdocProvider theme="luminous">
```

without changing:

```tsx
<Button />
<Card />
<Input />
<Dialog />
```

That is the architectural goal of the unified Ripperdoc design system.
