# Ripperdoc --- Multi-MFE Design System Architecture

**Status:** Proposed architecture\
**Package manager:** pnpm\
**Framework:** React / Next.js\
**Component development:** Storybook with `@storybook/nextjs-vite`\
**Repository:** `ripperdoc`

------------------------------------------------------------------------

## 1. Purpose

Ripperdoc is not intended to be a conventional UI component library.

It is a **shared design-system platform for multiple micro-frontends
(MFEs)**.

The architecture has two levels:

1.  **Global Design System** --- owned and maintained by Ripperdoc.
2.  **MFE Design Systems** --- owned by individual micro-frontends and
    built on top of the global system.

The goal is to provide:

-   Consistent visual language across applications
-   Reusable accessible primitives and components
-   MFE-specific customization without forking global components
-   Strong package and dependency boundaries
-   Independent MFE development
-   Centralized documentation and component development
-   Versioned and predictable releases
-   A clean path to multiple themes and brands

------------------------------------------------------------------------

# 2. Core Architecture

``` text
                         RIPPERDOC
                    Global Design System
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
       Tokens             Components           Tooling
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
        Commerce MFE      Video MFE       Admin MFE
        Design System     Design System    Design System
             │                │                │
             ▼                ▼                ▼
        Commerce App      Video App       Admin App
```

The dependency direction must remain one-way:

``` text
MFE Design System
       │
       ▼
Ripperdoc Global Design System
```

Ripperdoc must **never depend on an MFE**.

------------------------------------------------------------------------

# 3. Responsibilities

## 3.1 Ripperdoc owns

Ripperdoc should own functionality that is genuinely cross-application:

-   Design tokens
-   Semantic tokens
-   Typography
-   Spacing
-   Color system
-   Radius
-   Shadows
-   Motion
-   Breakpoints
-   Global themes
-   Accessibility rules
-   UI primitives
-   Generic components
-   Generic UI hooks
-   UI utilities
-   Icons
-   Component composition patterns
-   Component documentation
-   Visual regression/testing standards

## 3.2 Individual MFEs own

An MFE should own functionality specific to its domain:

-   Domain components
-   Domain-specific patterns
-   Domain-specific layouts
-   Feature components
-   Business logic
-   API/data hooks
-   Domain utilities
-   MFE-specific design tokens
-   MFE-specific themes
-   MFE-specific branding

Examples that should normally stay inside an MFE:

``` text
ProductCard
CartSummary
CheckoutStepper
OrderTable
VideoPlaylist
CreatorDashboard
PaymentForm
```

These should not be added to Ripperdoc simply because they are visually
reusable.

A component belongs in Ripperdoc only when it is **semantically generic
and useful across multiple applications**.

------------------------------------------------------------------------

# 4. Repository Strategy

Use a **pnpm workspace monorepo** for Ripperdoc.

Recommended tooling:

-   pnpm workspaces
-   Turborepo
-   TypeScript
-   Storybook
-   Vite through `@storybook/nextjs-vite`

Recommended initial structure:

``` text
ripperdoc/
│
├── apps/
│   └── storybook/
│
├── packages/
│   ├── tokens/
│   ├── primitives/
│   ├── components/
│   ├── icons/
│   ├── hooks/
│   ├── utils/
│   └── themes/
│
├── tooling/
│   ├── eslint/
│   ├── prettier/
│   ├── typescript/
│   └── vitest/
│
├── .changeset/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.json
```

Do not create all packages immediately if they are not needed. Establish
the boundaries first, then introduce packages as functionality is
implemented.

------------------------------------------------------------------------

# 5. Package Boundaries

The initial public package model should be:

``` text
@ripperdoc/tokens
@ripperdoc/primitives
@ripperdoc/components
@ripperdoc/icons
@ripperdoc/hooks
@ripperdoc/utils
@ripperdoc/themes
```

These packages should have clear responsibilities.

## Dependency direction

``` text
@ripperdoc/tokens
       ▲
       │
@ripperdoc/primitives
       ▲
       │
@ripperdoc/components
```

Supporting packages:

``` text
@ripperdoc/icons
@ripperdoc/hooks
@ripperdoc/utils
@ripperdoc/themes
```

A lower-level package must not import from a higher-level package.

For example:

**Allowed**

``` text
components → primitives
components → tokens
components → icons
```

**Not allowed**

``` text
tokens → components
utils → components
primitives → application code
```

This should be enforced with linting/package-boundary rules later.

------------------------------------------------------------------------

# 6. Design Token Architecture

Tokens are the foundation of Ripperdoc.

Do not start by building components. Define the token architecture
first.

Use three conceptual layers:

``` text
Primitive Tokens
       ↓
Semantic Tokens
       ↓
Component Tokens
```

## 6.1 Primitive tokens

Primitive tokens are raw values.

Examples:

``` text
color.blue.500
color.gray.900
spacing.4
radius.md
font.size.14
shadow.sm
```

These should rarely be consumed directly by application components.

## 6.2 Semantic tokens

Semantic tokens express intent.

Examples:

``` text
color.background
color.surface
color.text.primary
color.text.secondary
color.border
color.action.primary
color.action.primary.hover
color.status.error
```

Components should prefer semantic tokens.

## 6.3 Component tokens

Component-specific tokens are used when a component needs explicit
customization.

Examples:

``` text
button.primary.background
button.primary.foreground
button.radius
input.border
dialog.shadow
```

Do not create component tokens unnecessarily. Prefer semantic tokens
unless a component genuinely requires its own contract.

------------------------------------------------------------------------

# 7. MFE Token Overrides

The MFE should not fork Ripperdoc's components just to change colors or
branding.

Instead:

``` text
Ripperdoc primitive tokens
          ↓
Ripperdoc semantic tokens
          ↓
MFE theme overrides
          ↓
CSS custom properties
          ↓
Ripperdoc components
```

For example:

``` css
:root {
  --rd-color-action-primary: ...;
  --rd-color-background: ...;
  --rd-color-text-primary: ...;
}

[data-design="commerce"] {
  --rd-color-action-primary: ...;
}
```

The component remains:

``` tsx
<Button variant="primary">
  Checkout
</Button>
```

The component should not know that it is running inside the Commerce
MFE.

------------------------------------------------------------------------

# 8. Themes

Themes should be treated as configuration rather than duplicated
component implementations.

Initial theme model:

``` text
@ripperdoc/themes
│
├── light
├── dark
└── high-contrast
```

Later, MFE themes can build on the global theme:

``` text
Ripperdoc Light
       ↓
Commerce Light
```

or:

``` text
Ripperdoc Dark
       ↓
Admin Dark
```

The goal is to make visual customization possible without duplicating
components.

------------------------------------------------------------------------

# 9. Components

Components should be organized by component rather than putting every
file into one large directory.

Recommended structure:

``` text
components/
├── button/
│   ├── Button.tsx
│   ├── Button.types.ts
│   ├── Button.stories.tsx
│   ├── Button.test.tsx
│   └── index.ts
│
├── input/
│   ├── Input.tsx
│   ├── Input.types.ts
│   ├── Input.stories.tsx
│   ├── Input.test.tsx
│   └── index.ts
│
├── dialog/
│   ├── Dialog.tsx
│   ├── Dialog.types.ts
│   ├── Dialog.stories.tsx
│   ├── Dialog.test.tsx
│   └── index.ts
│
└── index.ts
```

The public API should be intentionally small:

``` tsx
import {
  Button,
  Input,
  Dialog,
} from "@ripperdoc/components";
```

Avoid deep imports becoming part of the public contract unless
explicitly intended.

------------------------------------------------------------------------

# 10. Primitives

Primitives are lower-level building blocks used to construct components.

Examples:

``` text
Box
Stack
Inline
Text
Heading
VisuallyHidden
Portal
FocusScope
```

Primitives should be:

-   Small
-   Composable
-   Accessible
-   Generic
-   Stable
-   Independent of application/business logic

Do not turn primitives into a second component library full of business
abstractions.

------------------------------------------------------------------------

# 11. Hooks

Ripperdoc hooks should be UI/system hooks.

Good examples:

``` text
useDisclosure
useControllableState
useMediaQuery
useClickOutside
useDebounce
usePrevious
useEvent
```

Avoid application-specific hooks:

``` text
useCart
useCheckout
useProduct
useOrder
usePayment
```

Those belong to the relevant MFE/application.

------------------------------------------------------------------------

# 12. Utilities

Utilities should support UI development rather than business logic.

Examples:

``` text
cn
composeRefs
mergeProps
keyboard helpers
focus helpers
DOM helpers
CSS helpers
```

Do not put domain/business utilities in Ripperdoc.

Avoid:

``` text
calculateCartTotal
calculateShipping
createOrder
getProductPrice
```

------------------------------------------------------------------------

# 13. Icons

Icons should have their own package:

``` text
@ripperdoc/icons
```

Example:

``` tsx
import {
  SearchIcon,
  CloseIcon,
  ChevronDownIcon,
} from "@ripperdoc/icons";
```

Keeping icons separate allows applications to consume them without
importing the entire component package.

------------------------------------------------------------------------

# 14. Accessibility

Accessibility should be part of the component architecture, not
something added later.

Every interactive component should consider:

-   Keyboard navigation
-   Focus management
-   Focus visibility
-   Screen reader semantics
-   ARIA only when required
-   Disabled/loading states
-   Error states
-   Reduced motion
-   Color contrast
-   Touch targets

Recommended foundation:

**React Aria / React Aria Components**

Use accessible primitives where they provide a strong fit rather than
implementing complex interaction behavior from scratch.

Ripperdoc should own the visual design and component API while
leveraging mature accessibility behavior where appropriate.

------------------------------------------------------------------------

# 15. Styling Strategy

Recommended approach:

## CSS Custom Properties + utility classes

Use CSS variables as the runtime design-token layer.

For component styling, use:

-   Tailwind CSS where utility composition is useful
-   CSS Modules or colocated CSS where component styling needs stronger
    encapsulation
-   `class-variance-authority` for typed component variants
-   `clsx` for conditional class composition
-   `tailwind-merge` when merging Tailwind utility classes

Do not make Tailwind itself the design system.

The design system is:

``` text
Tokens
+
Component contracts
+
Accessibility
+
Themes
+
Patterns
```

Tailwind is only a styling implementation tool.

------------------------------------------------------------------------

# 16. Recommended Development Stack

## Core

  Tool         Purpose
  ------------ -------------------------------------
  TypeScript   Type safety
  React        UI runtime
  pnpm         Workspace/package management
  Turborepo    Monorepo task orchestration
  Vite         Fast development/build tooling
  Storybook    Component development/documentation

## Styling

  Tool                       Purpose
  -------------------------- ------------------------------
  CSS Variables              Runtime design tokens/themes
  Tailwind CSS               Utility styling
  class-variance-authority   Typed component variants
  clsx                       Conditional classes
  tailwind-merge             Safe Tailwind class merging

## Accessibility

  -----------------------------------------------------------------------
  Tool                                Purpose
  ----------------------------------- -----------------------------------
  React Aria / React Aria Components  Accessible interaction primitives

  axe / Storybook accessibility       Automated accessibility checks
  tooling                             
  -----------------------------------------------------------------------

## Testing

  Tool                      Purpose
  ------------------------- -----------------------------------
  Vitest                    Unit/component tests
  Testing Library           User-focused component tests
  Playwright                Browser/E2E testing
  Storybook test tooling    Interaction and component testing
  Chromatic or equivalent   Visual regression/Storybook CI

## Code Quality

  Tool                  Purpose
  --------------------- -------------------
  ESLint                Static analysis
  Prettier              Formatting
  TypeScript            Type checking
  Husky + lint-staged   Pre-commit checks

## Releases

  Tool              Purpose
  ----------------- ---------------------------------
  Changesets        Versioning and package releases
  pnpm workspaces   Internal package linking

------------------------------------------------------------------------

# 17. Storybook

The current setup is the correct direction.

You currently have:

``` text
pnpm
+
Storybook
+
Next.js
+
Vite
```

Keep the Next.js Vite framework:

``` text
@storybook/nextjs-vite
```

Storybook currently recommends the Vite-based Next.js framework for most
Next.js projects because of faster startup/build performance and strong
testing support.

Storybook should be the main **development workshop and documentation
layer** for Ripperdoc.

It should contain:

``` text
Foundations
├── Colors
├── Typography
├── Spacing
├── Radius
├── Shadows
└── Motion

Primitives
├── Box
├── Stack
├── Text
└── ...

Components
├── Button
├── Input
├── Dialog
├── Select
├── Tabs
└── ...

Patterns
├── Forms
├── Search
└── Navigation
```

Each component should have stories for important states, not just one
happy-path example.

Examples:

``` text
Button
├── Default
├── Primary
├── Secondary
├── Destructive
├── Loading
├── Disabled
├── WithIcon
└── FullWidth
```

------------------------------------------------------------------------

# 18. Storybook and MFE Design Systems

There should be a distinction between the global Ripperdoc Storybook and
MFE-specific documentation.

## Ripperdoc Storybook

Documents:

``` text
Global Design System
```

## MFE Storybook

Documents:

``` text
Global Ripperdoc
+
MFE-specific Design System
```

For example:

``` text
Commerce MFE
├── Ripperdoc components
├── Commerce components
├── Commerce tokens
└── Commerce patterns
```

The MFE should not require modifying the Ripperdoc Storybook for every
application-specific component.

------------------------------------------------------------------------

# 19. Package API

Prefer explicit public exports.

Example:

``` text
@ripperdoc/components
```

``` ts
export {
  Button,
  Input,
  Dialog,
  Select,
} from "./components";
```

Avoid exposing internal implementation details.

Do not make this a supported API:

``` text
@ripperdoc/components/src/button/internal/ButtonImpl
```

Public APIs should remain stable even if the internal implementation
changes.

------------------------------------------------------------------------

# 20. Versioning

Use independent package versioning only if it becomes necessary.

Initially, a coordinated versioning strategy may be easier:

``` text
@ripperdoc/components 1.4.0
@ripperdoc/primitives 1.4.0
@ripperdoc/tokens 1.4.0
```

Use **Changesets** to:

-   Record package changes
-   Determine semantic versions
-   Generate changelogs
-   Prepare release pull requests
-   Publish packages

Every breaking public API change should be explicitly versioned.

------------------------------------------------------------------------

# 21. MFE Package Naming

Global Ripperdoc packages:

``` text
@ripperdoc/tokens
@ripperdoc/primitives
@ripperdoc/components
@ripperdoc/icons
@ripperdoc/hooks
@ripperdoc/utils
@ripperdoc/themes
```

For MFE-specific design systems, prefer keeping ownership with the MFE.

For example:

``` text
commerce-mfe/
  design/
    tokens/
    components/
    themes/
```

If an MFE design system eventually needs independent publication, a
package such as:

``` text
@ripperdoc/commerce
```

can be introduced later.

Do not prematurely create a package for every MFE.

------------------------------------------------------------------------

# 22. What NOT to do

## Do not create one giant package

Avoid:

``` text
@ripperdoc/everything
```

This makes dependency boundaries unclear.

## Do not put business components in Ripperdoc

Avoid:

``` text
@ripperdoc/ProductCard
@ripperdoc/Checkout
@ripperdoc/OrderTable
```

unless multiple MFEs genuinely need the exact same domain abstraction.

## Do not fork components for branding

Avoid:

``` text
CommerceButton
AdminButton
VideoButton
```

when the difference is only theme/token configuration.

Prefer:

``` text
Button
+
Theme
```

## Do not let Ripperdoc depend on applications

Never:

``` text
Ripperdoc → Commerce MFE
```

The relationship must remain:

``` text
Commerce MFE → Ripperdoc
```

------------------------------------------------------------------------

# 23. Recommended Initial Dependency Graph

``` text
                    @ripperdoc/tokens
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
     @ripperdoc/primitives        @ripperdoc/themes
             │
             │
             ├───────────────┐
             ▼               ▼
   @ripperdoc/components   @ripperdoc/hooks
             │
             └───────────────┐
                             ▼
                    MFE Design Systems
                             │
                ┌────────────┼────────────┐
                ▼            ▼            ▼
             Commerce       Video        Admin
                │            │            │
                ▼            ▼            ▼
              MFE          MFE          MFE
```

------------------------------------------------------------------------

# 24. Development Workflow

The intended workflow should be:

``` text
1. Define design requirement
        ↓
2. Determine whether it is global or MFE-specific
        ↓
3. If global → Ripperdoc
        ↓
4. Define/update tokens
        ↓
5. Build primitive if required
        ↓
6. Build component
        ↓
7. Add Storybook stories
        ↓
8. Add accessibility tests
        ↓
9. Add component tests
        ↓
10. Review API
        ↓
11. Add Changeset
        ↓
12. Release
```

For an MFE:

``` text
MFE requirement
      ↓
Can existing Ripperdoc component solve it?
      │
   yes ─────────→ compose Ripperdoc components
      │
     no
      ↓
Is the abstraction generic across MFEs?
      │
   yes ─────────→ propose addition to Ripperdoc
      │
     no
      ↓
Create inside MFE Design System
```

This decision tree is critical to prevent Ripperdoc from becoming a
dumping ground.

------------------------------------------------------------------------

# 25. Suggested First Milestone

Do not build 50 components immediately.

Build the foundation first.

## Phase 1 --- Infrastructure

``` text
✓ pnpm workspace
✓ Turborepo
✓ TypeScript
✓ Storybook + nextjs-vite
✓ ESLint
✓ Prettier
✓ Vitest
✓ Testing Library
✓ Changesets
```

## Phase 2 --- Design Foundations

``` text
Tokens
├── Colors
├── Typography
├── Spacing
├── Radius
├── Shadows
├── Breakpoints
└── Motion
```

Then:

``` text
Themes
CSS variables
Dark mode
Accessibility foundations
```

## Phase 3 --- Primitives

Start with:

``` text
Box
Stack
Inline
Text
Heading
VisuallyHidden
Portal
```

Only create primitives that actually simplify component composition.

## Phase 4 --- Core Components

Start with:

``` text
Button
IconButton
Input
Textarea
Label
Checkbox
Radio
Switch
Select
Dialog
Popover
Tooltip
Tabs
Card
Badge
Spinner
```

The exact list should be driven by actual application needs.

## Phase 5 --- MFE Integration

Take one real MFE and integrate:

``` text
MFE
 ↓
Ripperdoc tokens
 ↓
Ripperdoc components
 ↓
MFE theme
 ↓
MFE-specific components
```

Use this integration to validate the architecture before onboarding more
MFEs.

------------------------------------------------------------------------

# 26. Recommended Technology Decisions

### Use

``` text
pnpm
Turborepo
TypeScript
React
Storybook
@storybook/nextjs-vite
Vite
CSS Variables
Tailwind CSS
class-variance-authority
clsx
tailwind-merge
React Aria / React Aria Components
Vitest
Testing Library
Playwright
axe
Changesets
ESLint
Prettier
```

### Avoid adding initially

Do not add a library simply because it is popular.

In particular, avoid prematurely adding:

``` text
styled-components
Emotion
multiple CSS-in-JS systems
multiple component libraries
multiple state-management libraries
heavy animation frameworks
```

Ripperdoc should have **one clear styling model** and **one clear
accessibility foundation**.

------------------------------------------------------------------------

# 27. Naming

The project identity:

``` text
Ripperdoc
```

Repository:

``` text
ripperdoc
```

Global packages:

``` text
@ripperdoc/tokens
@ripperdoc/primitives
@ripperdoc/components
@ripperdoc/icons
@ripperdoc/hooks
@ripperdoc/utils
@ripperdoc/themes
```

The Cyberpunk naming can remain outside the design-system package
structure:

``` text
NightCity   → frontend/application
NetWatch    → frontend/service
Arasaka     → API gateway
Braindance  → video streaming
Ripperdoc   → global design system
```

This keeps the naming fun while keeping the technical architecture
understandable.

------------------------------------------------------------------------

# 28. Final Architecture

The target architecture is:

``` text
                           NIGHTCITY
                        Micro-frontends
                              │
             ┌────────────────┼────────────────┐
             │                │                │
          Commerce           Video            Admin
             │                │                │
             ▼                ▼                ▼
      MFE Design System  MFE Design System  MFE Design System
             │                │                │
             └────────────────┼────────────────┘
                              │
                              ▼
                         RIPPERDOC
                    Global Design System
                              │
       ┌──────────────┬───────┼────────┬──────────────┐
       │              │       │        │              │
     Tokens       Primitives Components Hooks        Themes
       │              │       │        │              │
       └──────────────┴───────┴────────┴──────────────┘
                              │
                           Icons
                              │
                         UI Utilities
```

The central principle is:

> **Ripperdoc provides the global language. Each MFE is allowed to speak
> that language with its own dialect.**

The global system should provide the **rules and foundations**, while
each MFE provides the **domain-specific expression**.

------------------------------------------------------------------------

# 29. Immediate Next Step

Since the pnpm + Storybook + Next.js + Vite setup already exists, do
**not** recreate the Storybook setup.

The next implementation step should be:

``` text
1. Convert the repository into the intended workspace structure
2. Establish package boundaries
3. Set up TypeScript project references/configuration
4. Establish lint/format rules
5. Define the token architecture
6. Define CSS variable naming conventions
7. Define theme architecture
8. Set up accessibility/testing foundations
9. Create the first primitive
10. Create the first component
```

The most important decision before implementing components is the
**token + theme contract**. Once that contract is correct, the rest of
Ripperdoc can be built on top of it without repeatedly redesigning the
foundation.

## Reference documentation

-   Storybook recommends `@storybook/nextjs-vite` for most Next.js
    projects and documents Vite as the preferred modern path for
    performance and testing support.
-   Storybook is intended for isolated component development, testing,
    and documentation.
