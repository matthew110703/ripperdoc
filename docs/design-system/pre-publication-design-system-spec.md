# Ripperdoc Chrome77 --- Pre-Publication Design System Specification

> **Package family:** `@ripperdoc-chrome77/*`\
> **Primary packages:** `@ripperdoc-chrome77/tokens`,
> `@ripperdoc-chrome77/components`\
> **Themes:** Obsidian, Luminous\
> **Environment:** pnpm monorepo + Storybook (Next.js + Vite)\
> **Goal:** Build a production-grade design system for multiple
> independent micro-frontends.

------------------------------------------------------------------------

# 1. Purpose

Ripperdoc is not intended to be a conventional component library where a
collection of React components is published to npm.

It is a **shared design-system platform for multiple micro-frontends**.

Each MFE should be able to:

-   consume the same global design language;
-   use the same accessibility and interaction standards;
-   select a Ripperdoc theme;
-   extend the design system without modifying the core package;
-   maintain domain-specific UI independently;
-   upgrade Ripperdoc without being tightly coupled to internal
    implementation details.

The architecture should therefore separate:

``` text
Design language
      ↓
Tokens
      ↓
Themes
      ↓
Primitives
      ↓
Core components
      ↓
Patterns
      ↓
Micro-frontends
```

Ripperdoc should provide the **system**, not every possible application
component.

------------------------------------------------------------------------

# 2. Definition of Done

Do not consider Ripperdoc ready for its first serious public release
merely because components render.

The system should satisfy:

``` text
□ Design token contract is stable
□ Obsidian theme is complete
□ Luminous theme is complete
□ Theme switching works
□ Primitive API is stable
□ Core component API is stable
□ Accessibility baseline exists
□ Keyboard interactions are tested
□ Responsive behavior is defined
□ Motion behavior is defined
□ Dark/light/theme behavior is defined
□ Component states are documented
□ Storybook documents the public API
□ Components have automated tests
□ Visual regression strategy exists
□ TypeScript declarations are generated
□ ESM/CJS strategy is intentional
□ CSS strategy is intentional
□ Tree-shaking works
□ Package exports are controlled
□ Peer dependencies are correct
□ npm package contents are controlled
□ README/documentation exists
□ Changelog/release strategy exists
□ MFE integration has been tested
□ Package can be installed from npm
□ CI validates pull requests
□ Release workflow is defined
```

------------------------------------------------------------------------

# 3. Package Architecture

Start small.

``` text
ripperdoc/
├── apps/
│   └── storybook/
│
├── packages/
│   ├── tokens/
│   └── components/
│
├── package.json
├── pnpm-workspace.yaml
└── ...
```

## 3.1 Tokens

``` text
@ripperdoc-chrome77/tokens
```

Responsible for:

-   primitive tokens;
-   semantic tokens;
-   component tokens;
-   theme contracts;
-   generated CSS variables;
-   TypeScript token definitions.

It should not contain React components.

------------------------------------------------------------------------

## 3.2 Components

``` text
@ripperdoc-chrome77/components
```

Responsible for:

-   primitives;
-   core UI components;
-   interaction components;
-   composition patterns;
-   component-level accessibility behavior.

It consumes the token package.

------------------------------------------------------------------------

## 3.3 What should NOT be in the global package

Do not put application/domain components such as:

``` text
MovieCard
EpisodeCard
VideoPlayer
VideoControls
CartItem
OrderCard
ProductCard
CheckoutSummary
```

inside Ripperdoc unless they genuinely become cross-MFE patterns.

For example:

``` text
NetWatch
├── MovieCard
├── EpisodeCard
└── VideoPlayer

Braindance
├── PlayerHUD
└── PlaybackTimeline
```

remain MFE/domain code.

Ripperdoc provides:

``` text
Card
Button
Slider
Progress
Dialog
Tooltip
Tabs
etc.
```

------------------------------------------------------------------------

# 4. Token System

The token architecture should have three layers.

``` text
Primitive Tokens
      ↓
Semantic Tokens
      ↓
Component Tokens
```

## 4.1 Primitive tokens

Raw design values:

``` text
color.blue.500
color.gray.900

spacing.1
spacing.2
spacing.4

radius.sm
radius.md

font.size.sm
font.size.md
```

Primitive tokens describe values, not meaning.

------------------------------------------------------------------------

# 5. Semantic Tokens

Semantic tokens describe intent.

Examples:

``` text
color.background.canvas
color.background.surface
color.background.elevated

color.text.primary
color.text.secondary
color.text.muted
color.text.inverse

color.border.default
color.border.subtle
color.border.focus

color.action.primary
color.action.secondary
color.action.danger

color.feedback.success
color.feedback.warning
color.feedback.error
color.feedback.info
```

Components should primarily consume semantic tokens.

------------------------------------------------------------------------

# 6. Component Tokens

When a component needs specific design contracts:

``` text
button.height.md
button.radius
button.padding.inline
button.primary.background
button.primary.foreground
button.primary.background.hover
```

This provides a controlled bridge between the design language and
implementation.

Avoid scattering raw values throughout component CSS.

------------------------------------------------------------------------

# 7. Theme Architecture

Both themes must implement the same semantic contract.

``` text
Theme Contract
      │
      ├── Obsidian
      └── Luminous
```

The component API must not change between themes.

Example:

``` tsx
<Button variant="primary">
  Continue
</Button>
```

Obsidian controls the visual expression.

Luminous controls the visual expression.

The Button does not need to know which theme is active.

------------------------------------------------------------------------

# 8. Theme Requirements

Each theme should define:

``` text
□ Colors
□ Typography
□ Spacing
□ Radius
□ Shadows
□ Borders
□ Focus treatment
□ Motion
□ Component states
□ Surface hierarchy
□ Elevation
□ Overlay behavior
□ Disabled appearance
□ Error/warning/success states
□ High-contrast considerations
```

------------------------------------------------------------------------

# 9. Obsidian

Obsidian should have its own visual personality rather than being simply
"dark mode."

Possible design language:

``` text
Deep surfaces
Controlled contrast
Cybernetic accents
Layered depth
Technical typography
Subtle glow
Strong focus states
Minimal but deliberate motion
```

The theme should remain usable and readable rather than relying entirely
on neon effects.

------------------------------------------------------------------------

# 10. Luminous

Luminous should also be a distinct design language rather than simply
"light mode."

Possible direction:

``` text
Bright surfaces
Light elevation
High clarity
Soft luminance
Controlled glow
Crisp borders
Airier spacing
Clear hierarchy
```

Both themes must still satisfy the same usability and accessibility
contracts.

------------------------------------------------------------------------

# 11. Theme Provider

Provide a public theme mechanism.

Conceptually:

``` tsx
<ThemeProvider theme="obsidian">
  <App />
</ThemeProvider>
```

and:

``` tsx
<ThemeProvider theme="luminous">
  <App />
</ThemeProvider>
```

The provider should manage:

-   active theme;
-   CSS variable scope;
-   theme switching;
-   initial theme;
-   system preference if supported;
-   SSR-safe behavior;
-   persistence if the consumer opts into it.

------------------------------------------------------------------------

# 12. Theme Extension

Do not make consumers edit internal Ripperdoc files.

Provide a controlled extension mechanism:

``` text
Ripperdoc Theme
      ↓
Consumer overrides
      ↓
Application
```

Consumer overrides should be constrained to documented tokens.

Avoid exposing every internal implementation detail.

------------------------------------------------------------------------

# 13. CSS Architecture

Define the CSS strategy before the component count becomes large.

Decide:

``` text
□ CSS variables
□ Component styles
□ Global reset/preflight
□ CSS injection strategy
□ Theme variable scope
□ SSR behavior
□ Style ordering
□ Consumer overrides
```

Prefer CSS variables for runtime theme values.

Example:

``` css
:root {
  --rd-color-background-canvas: ...;
  --rd-color-text-primary: ...;
}
```

Use a consistent namespace:

``` text
--rd-*
```

to avoid collisions with consuming applications.

------------------------------------------------------------------------

# 14. Global Styles / Reset

Provide a deliberately small global baseline.

Define:

``` text
box-sizing
body defaults
button/input inheritance
focus behavior
font smoothing if appropriate
reduced motion behavior
```

Do not aggressively reset application-owned styles.

A micro-frontend should not unexpectedly alter the host application's
entire page.

------------------------------------------------------------------------

# 15. Primitive Layer

The primitive layer is the foundation of the component system.

Recommended primitives:

``` text
Box
Stack
Inline
Container
Grid
Center
AspectRatio
Spacer
Divider
VisuallyHidden
Portal
```

------------------------------------------------------------------------

# 16. Box

`Box` is the controlled low-level layout primitive.

Potential responsibilities:

``` text
display
position
width
height
padding
margin
overflow
alignment
```

Do not expose arbitrary CSS through an uncontrolled prop such as:

``` tsx
<Box css={{ anything: "anything" }} />
```

unless there is a strong reason.

Too much styling freedom defeats the purpose of a design system.

------------------------------------------------------------------------

# 17. Stack

For one-dimensional layouts:

``` tsx
<Stack gap="md">
  ...
</Stack>
```

Support:

``` text
direction
gap
align
justify
wrap
```

Prefer token-backed values.

------------------------------------------------------------------------

# 18. Inline

For horizontal composition:

``` tsx
<Inline gap="sm" align="center">
  ...
</Inline>
```

It should be especially useful for:

-   actions;
-   metadata;
-   badges;
-   icon + label;
-   toolbar content.

------------------------------------------------------------------------

# 19. Container

Provide constrained content widths:

``` text
sm
md
lg
xl
full
```

The values should come from tokens.

------------------------------------------------------------------------

# 20. Grid

Add a responsive grid primitive.

Support controlled abstractions such as:

``` text
columns
gap
responsive columns
```

Avoid turning it into a complete CSS engine.

------------------------------------------------------------------------

# 21. Center

A tiny but useful primitive:

``` tsx
<Center>
  <Spinner />
</Center>
```

------------------------------------------------------------------------

# 22. AspectRatio

Useful for media-heavy MFEs:

``` tsx
<AspectRatio ratio={16 / 9}>
  <Media />
</AspectRatio>
```

This becomes particularly useful for NetWatch/Braindance-style
interfaces without making the media components themselves global.

------------------------------------------------------------------------

# 23. VisuallyHidden

Provide an accessibility primitive for screen-reader-only content.

This should be part of the library because accessibility utilities are
shared infrastructure.

------------------------------------------------------------------------

# 24. Typography Components

Recommended:

``` text
Text
Heading
Label
Caption
Code
Link
```

Typography should consume the token system.

Heading levels should be semantic.

Do not create dozens of visual typography components such as:

``` text
HugeText
SmallText
MediumText
TinyText
```

Use controlled variants instead.

------------------------------------------------------------------------

# 25. Button System

Recommended:

``` text
Button
IconButton
ButtonGroup
```

Button requirements:

``` text
□ variants
□ sizes
□ loading
□ disabled
□ focus
□ keyboard interaction
□ icon support
□ full-width option if needed
□ accessible naming
```

Potential variants:

``` text
primary
secondary
tertiary
ghost
danger
```

Do not create theme-specific variants such as:

``` text
obsidianNeon
luminousGlow
```

Themes should alter presentation, not the semantic API.

------------------------------------------------------------------------

# 26. Link

Create a design-system `Link` that handles:

``` text
default
hover
visited
focus
disabled where applicable
external link indication where appropriate
```

It should remain compatible with routing libraries through composition
or an `as`/slot strategy if that is part of the API.

------------------------------------------------------------------------

# 27. Form Infrastructure

Before creating individual controls, establish:

``` text
FormField
FieldLabel
FieldDescription
FieldError
FieldRequiredIndicator
```

A consistent field should support:

``` text
label
description
error
required
disabled
invalid
help content
```

------------------------------------------------------------------------

# 28. Form Components

Core controls:

``` text
Input
Textarea
Select
Checkbox
Radio
RadioGroup
Switch
Slider
NumberInput
```

Prioritize:

``` text
Input
Select
Checkbox
Switch
Textarea
Radio
```

Then add advanced controls only when real use cases appear.

------------------------------------------------------------------------

# 29. Selection & Combobox Infrastructure

Eventually provide:

``` text
Combobox
Autocomplete
Command
Listbox
```

These should be built only after the primitive accessibility model is
established.

They require careful handling of:

-   keyboard navigation;
-   active item;
-   focus;
-   selection;
-   filtering;
-   ARIA relationships.

------------------------------------------------------------------------

# 30. Feedback Components

Core:

``` text
Badge
Alert
Spinner
Progress
Skeleton
```

Then:

``` text
Toast
Notification
EmptyState
```

These should have semantic variants:

``` text
info
success
warning
error
neutral
```

------------------------------------------------------------------------

# 31. Surface Components

Recommended:

``` text
Card
Surface
Panel
```

Surface hierarchy should be token-driven.

For example:

``` text
canvas
surface
elevated
overlay
```

This allows Obsidian and Luminous to express different depth systems
without changing component APIs.

------------------------------------------------------------------------

# 32. Overlay Components

Create:

``` text
Tooltip
Popover
Dialog
Drawer
DropdownMenu
ContextMenu
```

These must have strong accessibility guarantees.

Requirements include:

``` text
focus management
focus restoration
Escape behavior
outside interaction
keyboard navigation
portal handling
scroll locking where appropriate
ARIA semantics
```

------------------------------------------------------------------------

# 33. Navigation

Recommended:

``` text
Tabs
Breadcrumb
Pagination
Menu
NavigationMenu
```

Navigation components should remain generic.

They should not know anything about the application's routing framework
unless explicitly designed as adapters.

------------------------------------------------------------------------

# 34. Data Display

After the foundation:

``` text
Avatar
AvatarGroup
List
ListItem
Table
DataTable
KeyValue
Timeline
```

Do not rush into a complex `DataTable`.

A serious DataTable may eventually require:

``` text
sorting
filtering
pagination
selection
column visibility
keyboard navigation
virtualization
loading
empty states
responsive behavior
```

Build it only when the underlying primitives are mature.

------------------------------------------------------------------------

# 35. Media Components

For your ecosystem, a useful generic layer could include:

``` text
Image
Avatar
AspectRatio
Media
MediaPlaceholder
```

Do not put a full domain-specific video player into Ripperdoc initially.

A generic media foundation is reusable; a NetWatch-specific player is
not.

------------------------------------------------------------------------

# 36. State Components

Standardize:

``` text
LoadingState
ErrorState
EmptyState
SuccessState
```

These patterns are especially useful for micro-frontends because each
MFE otherwise tends to invent its own loading/error UX.

------------------------------------------------------------------------

# 37. Component Composition

Prefer composable APIs.

Example:

``` tsx
<Card>
  <Card.Header>
    <Heading>System Status</Heading>
  </Card.Header>

  <Card.Body>
    ...
  </Card.Body>

  <Card.Footer>
    <Button>Continue</Button>
  </Card.Footer>
</Card>
```

The exact API can differ, but the principle is:

> Compose components rather than creating a new component for every
> visual combination.

------------------------------------------------------------------------

# 38. Slot / Polymorphic Strategy

Decide early whether Ripperdoc needs:

``` text
as
asChild
Slot
render prop
```

Do not add polymorphism everywhere simply because it is technically
possible.

Use it where it solves real composition problems.

------------------------------------------------------------------------

# 39. Icons

Do not bundle a huge icon collection into the component package without
a reason.

Define an icon contract:

``` text
Icon
IconButton
```

Then decide whether Ripperdoc:

``` text
□ provides its own icon package
□ accepts consumer-supplied icons
□ supports an external icon library through adapters
```

For the first release, consumer-supplied icons can keep the package
smaller.

------------------------------------------------------------------------

# 40. Hooks

Do not create a separate hooks package initially.

Only create hooks that represent genuinely shared UI behavior.

Examples:

``` text
useTheme
useMediaQuery
useDisclosure
useControllableState
useReducedMotion
```

Hooks should be internal unless consumers genuinely need them.

Avoid exposing implementation hooks merely because they exist.

------------------------------------------------------------------------

# 41. Utilities

Likewise, do not create a generic `utils` package containing random
helpers.

Utilities should have a clear purpose.

Good candidates:

``` text
cn / class composition
token helpers
ID generation
accessibility helpers
```

If a utility is not part of the public design-system contract, keep it
internal.

------------------------------------------------------------------------

# 42. Accessibility

Accessibility should be a first-class architectural concern.

Every interactive component must define:

``` text
□ Keyboard behavior
□ Focus behavior
□ ARIA semantics
□ Screen-reader behavior
□ Disabled behavior
□ Loading behavior
□ Error behavior
□ Reduced-motion behavior
□ Color contrast
```

Use established accessibility primitives where appropriate instead of
reinventing complex behavior.

------------------------------------------------------------------------

# 43. Focus System

Standardize focus styles.

Provide semantic tokens such as:

``` text
focus.ring.color
focus.ring.width
focus.ring.offset
```

Every interactive component should have a visible focus state.

Do not remove focus outlines without replacing them with an equally
strong mechanism.

------------------------------------------------------------------------

# 44. Motion System

Create motion tokens:

``` text
duration.fast
duration.normal
duration.slow

easing.standard
easing.emphasized
easing.exit
```

Then define component motion behavior.

Also support:

``` text
prefers-reduced-motion
```

Do not add animation merely for visual spectacle.

Ripperdoc's cyberpunk identity should remain usable.

------------------------------------------------------------------------

# 45. Responsive System

Define breakpoints and responsive tokens centrally.

Example concept:

``` text
sm
md
lg
xl
2xl
```

Do not let individual components invent random breakpoint values.

Responsive behavior should be predictable across MFEs.

------------------------------------------------------------------------

# 46. Density System

This is an area where Ripperdoc can exceed a typical component library.

Consider a global density contract:

``` text
compact
comfortable
spacious
```

Density can influence:

``` text
control heights
padding
gaps
table rows
navigation
form fields
```

The component API remains unchanged.

This is particularly useful when different MFEs have different
information densities.

------------------------------------------------------------------------

# 47. State Model

Define a consistent state vocabulary.

For components where applicable:

``` text
default
hover
active
focus
focus-visible
disabled
loading
selected
checked
invalid
error
success
readonly
```

Do not let each component invent different names for equivalent states.

------------------------------------------------------------------------

# 48. Component Anatomy Documentation

Every component should document its anatomy.

Example:

``` text
Button
├── root
├── leading icon
├── label
└── trailing icon
```

For Card:

``` text
Card
├── Header
├── Body
└── Footer
```

This helps designers and developers reason about composition.

------------------------------------------------------------------------

# 49. Storybook

Storybook should be treated as the **interactive specification** of
Ripperdoc, not merely a component gallery.

Every component should have stories for:

``` text
default
variants
sizes
states
themes
responsive behavior
composition
edge cases
accessibility
```

------------------------------------------------------------------------

# 50. Theme Testing in Storybook

Every component must be tested under:

``` text
Obsidian
Luminous
```

Do not build a component under one theme and assume the other works.

Storybook should make theme comparison easy.

------------------------------------------------------------------------

# 51. Component Story Structure

For each component:

``` text
Component/
├── Component.tsx
├── Component.types.ts
├── Component.test.tsx
├── Component.stories.tsx
├── Component.css / styles
└── index.ts
```

For larger components, split internal files as needed.

Keep the public export surface controlled.

------------------------------------------------------------------------

# 52. Storybook Addons / Tooling

Use Storybook tooling for:

``` text
accessibility
interactions
documentation
controls
viewport/responsive testing
test integration
```

The exact addon set can evolve, but the important principle is that
stories should exercise real component behavior.

------------------------------------------------------------------------

# 53. Testing Strategy

Use multiple levels of testing.

## Unit / component tests

Test:

``` text
rendering
props
state
events
keyboard behavior
conditional rendering
```

## Interaction tests

Test:

``` text
click
keyboard navigation
focus
open/close
selection
validation
```

## Accessibility tests

Automate checks where possible.

## Visual regression

Introduce screenshot-based regression once the visual system stabilizes.

------------------------------------------------------------------------

# 54. Visual Regression

A theme-driven library benefits heavily from visual regression.

Test combinations such as:

``` text
Button × Obsidian
Button × Luminous

Card × Obsidian
Card × Luminous
```

You do not need every theoretical combination immediately.

Prioritize components where visual regressions are costly.

------------------------------------------------------------------------

# 55. TypeScript Contract

The public API must have strong types.

Avoid:

``` ts
any
```

in public component APIs.

Prefer:

``` ts
type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger";
```

Public types should be exported deliberately.

------------------------------------------------------------------------

# 56. Package Exports

Do not expose internal paths.

Consumers should write:

``` ts
import { Button, Card } from "@ripperdoc-chrome77/components";
```

not:

``` ts
import Button from "@ripperdoc-chrome77/components/src/Button";
```

Define an explicit `exports` map in `package.json`.

------------------------------------------------------------------------

# 57. Build Output

The package should produce production-ready artifacts.

Verify:

``` text
JavaScript
TypeScript declarations
CSS
assets if applicable
```

Choose an intentional module strategy, normally favoring modern ESM.

If CommonJS support is actually required, add it deliberately rather
than generating it by default.

------------------------------------------------------------------------

# 58. Tree Shaking

Ensure consumers do not receive the entire library when importing one
component.

For example:

``` ts
import { Button } from "@ripperdoc-chrome77/components";
```

should allow bundlers to eliminate unrelated components.

Avoid unnecessary side effects.

------------------------------------------------------------------------

# 59. Peer Dependencies

React and related runtime dependencies should normally be treated as
peer dependencies for a component library.

Do not accidentally bundle duplicate React runtimes.

Verify the package's dependency model with an actual consumer project.

------------------------------------------------------------------------

# 60. CSS and Package Consumption Test

Test the package in a clean application.

The consumer should be able to:

``` bash
pnpm add @ripperdoc-chrome77/components
pnpm add @ripperdoc-chrome77/tokens
```

and immediately use:

``` tsx
import { Button } from "@ripperdoc-chrome77/components";
```

without copying internal files.

------------------------------------------------------------------------

# 61. SSR and Micro-Frontend Safety

Because the library will be consumed by multiple MFEs, consider:

``` text
SSR
hydration
CSS variable collisions
style leakage
DOM ID collisions
portal ownership
multiple React roots
multiple ThemeProviders
```

Do not assume the library will always run as a single standalone React
application.

------------------------------------------------------------------------

# 62. CSS Isolation

Avoid global selectors such as:

``` css
button { ... }
```

inside the component package unless they are explicitly part of the
reset strategy.

Prefer component-scoped styles and namespaced variables.

This is particularly important for micro-frontends.

------------------------------------------------------------------------

# 63. Theme Isolation

A micro-frontend should not unexpectedly change the theme of another
MFE.

Consider theme scope:

``` text
Host
├── MFE A
│   └── ThemeProvider: Obsidian
│
└── MFE B
    └── ThemeProvider: Luminous
```

The architecture should make this possible if required.

------------------------------------------------------------------------

# 64. Internationalization

The core library should avoid hardcoded user-facing English strings.

Components such as:

``` text
Pagination
DatePicker
Calendar
Dialog
Toast
```

should provide localization mechanisms or accept consumer-provided
labels.

Do not build English-only accessibility labels into the library.

------------------------------------------------------------------------

# 65. RTL

Plan for right-to-left layouts before the CSS architecture becomes
difficult to change.

Prefer logical properties:

``` css
margin-inline
padding-inline
inset-inline
border-inline
```

rather than unnecessary left/right assumptions.

------------------------------------------------------------------------

# 66. Browser Support

Define a supported browser/runtime matrix.

Document:

``` text
supported browsers
minimum React version
minimum Node version for development
supported bundlers
```

Do not support everything.

A clear support contract is better than accidental compatibility.

------------------------------------------------------------------------

# 67. Performance

Measure:

``` text
bundle size
component import cost
CSS size
runtime overhead
rendering behavior
```

Avoid:

``` text
large dependencies for tiny utilities
unnecessary runtime styling
heavy icon bundles
global listeners without cleanup
```

------------------------------------------------------------------------

# 68. Error Boundaries

Do not automatically create a global application error boundary in the
component package.

Instead, document how complex components behave when internal operations
fail.

Application-level error boundaries belong to the MFE/application layer.

------------------------------------------------------------------------

# 69. Security

For a shared package:

``` text
□ Audit dependencies
□ Avoid unsafe HTML
□ Avoid arbitrary code execution APIs
□ Avoid injecting unsanitized content
□ Review third-party dependencies
□ Keep publishing credentials out of source control
```

Never place secrets in Storybook, package files, or `.env` files that
can be published.

------------------------------------------------------------------------

# 70. Documentation

Documentation should cover:

``` text
Getting Started
Installation
Themes
Tokens
Primitives
Components
Accessibility
Customization
Composition
Migration
Release Notes
```

Every component should explain:

``` text
Purpose
When to use
When not to use
API
Variants
States
Examples
Accessibility
Theme behavior
```

------------------------------------------------------------------------

# 71. Usage Guidelines

A mature design system should tell users what **not** to do.

Example:

``` text
Use Button for actions.

Do not use Button as a navigation link.
Use Link when the interaction changes location.
```

These rules prevent visual consistency from being separated from UX
consistency.

------------------------------------------------------------------------

# 72. Design Tokens Documentation

Document tokens by meaning.

Bad:

``` text
blue500
```

Better:

``` text
action.primary
```

The documentation should explain:

``` text
token
purpose
theme values
allowed usage
```

------------------------------------------------------------------------

# 73. Component Contribution Contract

Before accepting new components, require:

``` text
□ Real cross-MFE use case
□ Design specification
□ Token usage
□ Accessibility plan
□ Storybook stories
□ Tests
□ Theme compatibility
□ Responsive behavior
□ Documentation
```

This prevents Ripperdoc from becoming a dumping ground for one-off UI.

------------------------------------------------------------------------

# 74. Component Maturity Levels

This is another area where Ripperdoc can go beyond a typical component
library.

Assign maturity levels:

``` text
Experimental
      ↓
Beta
      ↓
Stable
      ↓
Deprecated
```

Only `Stable` components should be considered safe for broad MFE
adoption.

------------------------------------------------------------------------

# 75. API Stability

Once a component becomes stable:

``` text
props
events
CSS contracts
tokens
exports
```

should be treated as public API.

Avoid breaking changes casually.

------------------------------------------------------------------------

# 76. Versioning

Use Semantic Versioning.

Conceptually:

``` text
PATCH
bug fix

MINOR
new backward-compatible functionality

MAJOR
breaking API changes
```

With multiple packages, use Changesets to manage package-specific
releases.

------------------------------------------------------------------------

# 77. Changelog

Every public release should explain:

``` text
Added
Changed
Fixed
Deprecated
Removed
Breaking Changes
```

Do not make consumers inspect git commits to understand a release.

------------------------------------------------------------------------

# 78. Deprecation Strategy

When replacing a component:

``` text
Stable
   ↓
Deprecated
   ↓
Migration guidance
   ↓
Removal in a major release
```

Do not silently remove public APIs.

------------------------------------------------------------------------

# 79. MFE Integration Contract

Test at least two independent consumers.

Example:

``` text
NetWatch
    ↓
Ripperdoc

Braindance
    ↓
Ripperdoc
```

Verify:

``` text
□ installation
□ theme selection
□ CSS isolation
□ tokens
□ components
□ build
□ SSR if applicable
□ independent deployment
□ package upgrades
```

The goal is to prove that Ripperdoc actually works as a shared MFE
design system.

------------------------------------------------------------------------

# 80. Public Package Quality Gate

Before publishing, verify:

``` text
Architecture
□ Package boundaries are stable
□ Public API is intentional
□ No MFE-specific code leaked into core

Design
□ Tokens are complete
□ Obsidian works
□ Luminous works
□ Component states are consistent
□ Typography is consistent
□ Spacing is consistent

Components
□ Primitives complete
□ Core controls complete
□ Form foundation complete
□ Feedback components complete
□ Surface components complete
□ Overlay behavior tested

Accessibility
□ Keyboard navigation
□ Focus management
□ ARIA
□ Contrast
□ Reduced motion
□ Screen reader behavior

Engineering
□ TypeScript
□ Tests
□ Storybook
□ Visual regression
□ Build
□ Tree shaking
□ Package exports
□ CSS isolation
□ SSR considerations

Documentation
□ README
□ Installation
□ Theme guide
□ Token guide
□ Component docs
□ Accessibility docs
□ Contribution guide
□ Changelog

Release
□ Version
□ npm package metadata
□ npm files verified
□ npm pack --dry-run
□ Tarball tested
□ Public package tested from npm
□ CI release workflow ready
```

------------------------------------------------------------------------

# 81. Recommended First Stable Component Set

Do not attempt to build every possible component before the first
release.

A strong initial set is:

## Primitives

``` text
Box
Stack
Inline
Container
Grid
Center
AspectRatio
Divider
VisuallyHidden
```

## Typography

``` text
Text
Heading
Label
Caption
Code
Link
```

## Actions

``` text
Button
IconButton
ButtonGroup
```

## Forms

``` text
FormField
FieldLabel
FieldDescription
FieldError
Input
Textarea
Select
Checkbox
Radio
Switch
```

## Feedback

``` text
Badge
Alert
Spinner
Progress
Skeleton
```

## Surfaces

``` text
Card
Panel
Surface
```

## Overlays

``` text
Tooltip
Popover
Dialog
Drawer
DropdownMenu
```

## Navigation

``` text
Tabs
Breadcrumb
Pagination
```

This is already a substantial and useful design system.

------------------------------------------------------------------------

# 82. What Should Wait

Do not prioritize these for the first public release unless your real
MFEs require them:

``` text
DataTable
DatePicker
Calendar
Combobox
Command
ColorPicker
RichTextEditor
Carousel
Complex Charts
Advanced FileUploader
Full VideoPlayer
Kanban
TreeView
```

Complex components create a large maintenance burden.

Build them when there is a demonstrated cross-MFE requirement.

------------------------------------------------------------------------

# 83. Recommended Development Order

The actual implementation order should be:

``` text
1. Token contract
2. Theme contract
3. ThemeProvider
4. CSS architecture
5. Box
6. Stack
7. Inline
8. Container
9. Grid
10. Center
11. Divider
12. VisuallyHidden
13. Text
14. Heading
15. Label
16. Link
17. Button
18. IconButton
19. FormField infrastructure
20. Input
21. Textarea
22. Checkbox
23. Radio
24. Switch
25. Select
26. Badge
27. Alert
28. Spinner
29. Skeleton
30. Progress
31. Card
32. Panel
33. Surface
34. Tooltip
35. Popover
36. Dialog
37. Drawer
38. DropdownMenu
39. Tabs
40. Breadcrumb
41. Pagination
```

At every stage:

``` text
Implementation
      ↓
Storybook
      ↓
Obsidian
      ↓
Luminous
      ↓
Accessibility
      ↓
Tests
      ↓
Documentation
```

Do not postpone these steps until the end.

------------------------------------------------------------------------

# 84. Definition of a Ripperdoc Component

A component is not considered complete simply because its `.tsx` file
exists.

A component is complete when:

``` text
Component
    │
    ├── API
    ├── Types
    ├── Tokens
    ├── Styles
    ├── States
    ├── Accessibility
    ├── Theme compatibility
    ├── Responsive behavior
    ├── Tests
    ├── Storybook
    └── Documentation
```

This should be the team's definition of "done."

------------------------------------------------------------------------

# 85. Recommended Component Directory

Example:

``` text
packages/components/
└── src/
    ├── primitives/
    │   ├── Box/
    │   ├── Stack/
    │   ├── Inline/
    │   ├── Container/
    │   ├── Grid/
    │   └── ...
    │
    ├── typography/
    │   ├── Text/
    │   ├── Heading/
    │   └── ...
    │
    ├── actions/
    │   ├── Button/
    │   ├── IconButton/
    │   └── ...
    │
    ├── forms/
    │   ├── FormField/
    │   ├── Input/
    │   ├── Select/
    │   └── ...
    │
    ├── feedback/
    │   ├── Alert/
    │   ├── Badge/
    │   └── ...
    │
    ├── surfaces/
    │   ├── Card/
    │   ├── Panel/
    │   └── ...
    │
    ├── overlays/
    │   ├── Dialog/
    │   ├── Popover/
    │   └── ...
    │
    └── navigation/
        ├── Tabs/
        ├── Breadcrumb/
        └── ...
```

------------------------------------------------------------------------

# 86. Public Exports

Expose categories from the package root.

Example:

``` ts
import {
  Button,
  Card,
  Input,
  Stack,
  Heading
} from "@ripperdoc-chrome77/components";
```

Avoid exposing internal category paths unless there is a strong reason.

------------------------------------------------------------------------

# 87. Naming Convention

Use consistent names.

Prefer:

``` text
Button
IconButton
FormField
FieldLabel
DropdownMenu
```

Avoid inconsistent patterns such as:

``` text
Btn
ButtonComponent
ButtonUI
FormInputControl
```

The library should feel like one system.

------------------------------------------------------------------------

# 88. Design-System Principles

Ripperdoc should follow these principles:

### 1. Semantic over cosmetic

Prefer:

``` text
primary
danger
surface
muted
```

over:

``` text
blue
red
dark-gray
```

### 2. Composition over duplication

Build small primitives that compose into larger patterns.

### 3. Accessibility by default

Consumers should receive accessible behavior without implementing it
themselves.

### 4. Theme independence

Components should not know which visual theme is active.

### 5. Controlled flexibility

Give consumers useful escape hatches without turning every component
into arbitrary CSS.

### 6. MFE isolation

Do not leak styles or application assumptions across micro-frontends.

### 7. Stable public APIs

Internal implementation can change; public contracts should remain
deliberate.

------------------------------------------------------------------------

# 89. The Ripperdoc Layer Model

The final conceptual model should be:

``` text
                    Ripperdoc
                       │
        ┌──────────────┴──────────────┐
        │                             │
      Tokens                        Themes
        │                    ┌────────┴────────┐
        │                    │                 │
        │                Obsidian          Luminous
        │                    │                 │
        └────────────────────┴─────────────────┘
                             │
                       Theme Contract
                             │
                             ▼
                         Primitives
                             │
                             ▼
                       Core Components
                             │
                             ▼
                         Patterns
                             │
                ┌────────────┼────────────┐
                ▼            ▼            ▼
             NetWatch    Braindance    Other MFEs
                │            │            │
          Domain UI     Domain UI    Domain UI
```

The key boundary is:

``` text
Ripperdoc = shared language + shared behavior

MFE = application/domain experience
```

------------------------------------------------------------------------

# 90. Final Release Sequence

The recommended path to the first public release is:

``` text
TOKENS
  ↓
Theme contract
  ↓
Obsidian
  ↓
Luminous
  ↓
ThemeProvider
  ↓
CSS architecture
  ↓
Primitive layer
  ↓
Typography
  ↓
Actions
  ↓
Forms
  ↓
Feedback
  ↓
Surfaces
  ↓
Overlays
  ↓
Navigation
  ↓
Accessibility
  ↓
Tests
  ↓
Storybook
  ↓
Documentation
  ↓
MFE integration
  ↓
Build/package validation
  ↓
npm pack --dry-run
  ↓
Local tarball test
  ↓
@ripperdoc-chrome77/tokens
  ↓
@ripperdoc-chrome77/components
  ↓
Changesets
  ↓
CI
  ↓
npm Trusted Publishing
```

------------------------------------------------------------------------

# 91. The Most Important Rule

**Do not optimize Ripperdoc for the number of components.**

Optimize it for:

``` text
Consistency
Accessibility
Composition
Themeability
Isolation
Type safety
Developer experience
Documentation
Upgrade safety
```

A library with 30 excellent components is more valuable than a library
with 150 inconsistent components.

Ripperdoc should feel like a **coherent operating system for the UI of
your micro-frontends**, not a random collection of React components.
