# Ripperdoc Chrome77 --- Storybook UI/UX & Documentation Specification

> **Purpose:** Define the complete visual, structural, interaction, and
> documentation experience of the Ripperdoc Storybook.
>
> **Environment:** Storybook + Next.js/Vite + pnpm\
> **Themes:** Obsidian, Luminous\
> **Audience:** Ripperdoc maintainers, designers, developers, and
> micro-frontend teams\
> **Goal:** Storybook should feel like the **official Ripperdoc control
> center**, not a default Storybook installation.

------------------------------------------------------------------------

# 1. Vision

The Ripperdoc Storybook should behave like an **interactive
design-system laboratory**.

It should communicate three things immediately:

1.  **This is a real design system.**
2.  **Themes are first-class citizens.**
3.  **Every component can be explored, tested, and understood
    interactively.**

The experience should feel:

``` text
Cyberpunk-inspired
        +
Professional
        +
Minimal
        +
Technical
        +
Highly usable
```

Avoid making it look like a game UI.

The Cyberpunk 2077 influence should be expressed through:

-   naming;
-   subtle visual language;
-   typography;
-   restrained accents;
-   technical metadata;
-   micro-interactions;
-   surface treatment;

rather than excessive neon, noise, animations, or decorative elements.

The UI must remain useful as a documentation product.

------------------------------------------------------------------------

# 2. Core UX Principle

The Storybook UI should answer these questions without requiring the
developer to hunt:

``` text
What component am I looking at?
What does it do?
When should I use it?
What are its variants?
What states does it support?
How does it look in Obsidian?
How does it look in Luminous?
How do I use it?
What are its accessibility requirements?
What tokens does it consume?
What can I customize?
```

------------------------------------------------------------------------

# 3. High-Level Information Architecture

Use a clear hierarchy.

``` text
RIPPERDOC
│
├── Introduction
│   ├── Welcome
│   ├── Philosophy
│   ├── Getting Started
│   └── Architecture
│
├── Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Radius
│   ├── Shadows
│   ├── Motion
│   ├── Breakpoints
│   └── Density
│
├── Themes
│   ├── Obsidian
│   ├── Luminous
│   └── Theme Architecture
│
├── Primitives
│   ├── Box
│   ├── Stack
│   ├── Inline
│   ├── Container
│   ├── Grid
│   ├── Center
│   ├── AspectRatio
│   ├── Divider
│   └── VisuallyHidden
│
├── Typography
│   ├── Text
│   ├── Heading
│   ├── Label
│   ├── Caption
│   ├── Code
│   └── Link
│
├── Actions
│   ├── Button
│   ├── IconButton
│   └── ButtonGroup
│
├── Forms
│   ├── FormField
│   ├── Input
│   ├── Textarea
│   ├── Select
│   ├── Checkbox
│   ├── Radio
│   └── Switch
│
├── Feedback
│   ├── Badge
│   ├── Alert
│   ├── Spinner
│   ├── Skeleton
│   └── Progress
│
├── Surfaces
│   ├── Card
│   ├── Panel
│   └── Surface
│
├── Overlays
│   ├── Tooltip
│   ├── Popover
│   ├── Dialog
│   ├── Drawer
│   └── DropdownMenu
│
└── Navigation
    ├── Tabs
    ├── Breadcrumb
    └── Pagination
```

Do not organize the sidebar purely alphabetically.

Organize it according to how developers understand a design system.

------------------------------------------------------------------------

# 4. Global Storybook Shell

The Storybook shell should contain four major regions:

``` text
┌──────────────────────────────────────────────────────────┐
│ Ripperdoc Header                                          │
├───────────────┬──────────────────────────────────────────┤
│               │                                          │
│ Navigation    │ Main Content                             │
│ Sidebar       │                                          │
│               │                                          │
│               │                                          │
├───────────────┴──────────────────────────────────────────┤
│ Optional contextual status / information area             │
└──────────────────────────────────────────────────────────┘
```

The default Storybook chrome should be customized to match Ripperdoc.

------------------------------------------------------------------------

# 5. Header

The header should contain:

``` text
[ R ] RIPPERDOC
    Design System

[Theme] [Viewport] [Search] [GitHub] [Version]
```

Recommended elements:

### Brand

``` text
RIPPERDOC
Chrome77
```

The branding should be subtle.

Avoid turning the header into a giant Cyberpunk 2077 logo imitation.

------------------------------------------------------------------------

# 6. Theme Switcher

The theme switcher is one of the most important pieces of the
experience.

It should be globally available.

Recommended control:

``` text
THEME

◉ Obsidian
○ Luminous
```

or a segmented control:

``` text
[ OBSIDIAN ] [ LUMINOUS ]
```

The active theme should be obvious without being visually aggressive.

------------------------------------------------------------------------

# 7. Theme Switcher Behavior

Switching themes should:

``` text
1. Update the entire Storybook preview.
2. Update component examples.
3. Update documentation surfaces where appropriate.
4. Preserve the current story.
5. Preserve current controls.
6. Avoid a full page reload.
7. Respect the same theme contract used by consumers.
```

The switcher must not be a Storybook-only fake theme.

It should exercise the **actual Ripperdoc theme system**.

------------------------------------------------------------------------

# 8. Theme Preview Indicator

Show the active theme somewhere in the UI.

Example:

``` text
● OBSIDIAN
```

or:

``` text
THEME / OBSIDIAN
```

This prevents developers from accidentally documenting a component while
thinking another theme is active.

------------------------------------------------------------------------

# 9. Optional Theme Comparison Mode

Add a dedicated feature:

``` text
Compare Themes
```

which renders:

``` text
┌─────────────────────┬─────────────────────┐
│     OBSIDIAN        │      LUMINOUS       │
│                     │                     │
│      Component      │      Component      │
│                     │                     │
└─────────────────────┴─────────────────────┘
```

This is particularly valuable for Ripperdoc because theme compatibility
is part of the system's identity.

------------------------------------------------------------------------

# 10. Sidebar

The sidebar should be:

``` text
compact
structured
searchable
hierarchical
```

Use section labels:

``` text
FOUNDATIONS
PRIMITIVES
TYPOGRAPHY
ACTIONS
FORMS
FEEDBACK
SURFACES
OVERLAYS
NAVIGATION
```

Do not overload it with decorative labels.

------------------------------------------------------------------------

# 11. Sidebar Search

Global component search should support:

``` text
Button
button
actions
form
input
overlay
```

Search should find:

-   component names;
-   category;
-   keywords;
-   aliases where useful.

------------------------------------------------------------------------

# 12. Component Page Layout

Every component page should follow a consistent structure.

``` text
Component Name
Short description

[Theme] [Viewport] [Controls]

────────────────────────────────

Preview

────────────────────────────────

Variants

────────────────────────────────

States

────────────────────────────────

Composition

────────────────────────────────

Interactive Playground

────────────────────────────────

Usage

────────────────────────────────

Accessibility

────────────────────────────────

API

────────────────────────────────

Design Tokens
```

The exact sections can vary by component, but the hierarchy should
remain predictable.

------------------------------------------------------------------------

# 13. Component Hero

Every component should start with:

``` text
BUTTON

Primary action control for triggering an action.

Category: Actions
Status: Stable
Since: 0.1.0
```

Useful metadata:

``` text
Status
Category
Version introduced
Theme support
Accessibility status
```

Do not display metadata if it adds noise.

------------------------------------------------------------------------

# 14. Preview Area

The preview should be visually isolated.

Use a large canvas:

``` text
┌──────────────────────────────────────────────┐
│                                              │
│                [ Component ]                 │
│                                              │
└──────────────────────────────────────────────┘
```

The preview background should adapt to the active theme.

Avoid using a permanently white preview canvas when testing a dark
theme.

------------------------------------------------------------------------

# 15. Preview Controls

Each preview should provide relevant controls:

``` text
Theme
Viewport
Background
Direction
Density
```

Only expose controls that are useful for that component.

Do not create dozens of controls simply because Storybook allows them.

------------------------------------------------------------------------

# 16. Interactive Playground

Every important component should have a dedicated:

``` text
PLAYGROUND
```

story.

Example:

``` text
┌──────────────────────────────────────────────┐
│ PLAYGROUND                                   │
│                                              │
│       [ Continue ]                           │
│                                              │
├──────────────────────────────────────────────┤
│ variant     [ primary       ▼ ]              │
│ size        [ medium        ▼ ]              │
│ disabled    [ OFF ]                          │
│ loading     [ OFF ]                          │
│ fullWidth   [ OFF ]                          │
└──────────────────────────────────────────────┘
```

The playground should allow developers to discover the component API
naturally.

------------------------------------------------------------------------

# 17. Playground Rules

Controls should be:

``` text
relevant
typed
discoverable
safe
```

Do not expose internal implementation props.

If a prop is not part of the public API, it should not appear.

------------------------------------------------------------------------

# 18. Playground Presets

Add useful presets where appropriate:

``` text
Default
Primary
Secondary
Danger
Disabled
Loading
Long Content
With Icon
Without Icon
```

This is more useful than requiring developers to manually manipulate
every control.

------------------------------------------------------------------------

# 19. Multiple Stories

Each component should have multiple focused stories.

Do not create one giant story with every possible variation.

Example:

``` text
Button
├── Overview
├── Playground
├── Variants
├── Sizes
├── WithIcons
├── Loading
├── Disabled
├── States
├── Composition
└── Accessibility
```

------------------------------------------------------------------------

# 20. Story Naming

Use names that communicate intent.

Good:

``` text
Primary
Secondary
Danger
Loading
Disabled
WithLeadingIcon
WithTrailingIcon
LongLabel
```

Avoid:

``` text
Test1
Test2
Example
Example2
NewButton
```

Stories are documentation.

------------------------------------------------------------------------

# 21. States Story

Create a dedicated state matrix when appropriate.

Example:

``` text
BUTTON STATES

┌───────────┬───────────┬───────────┐
│ Default   │ Hover     │ Active    │
├───────────┼───────────┼───────────┤
│ Focus     │ Disabled  │ Loading   │
└───────────┴───────────┴───────────┘
```

This allows designers to review the entire state system quickly.

------------------------------------------------------------------------

# 22. Responsive Story

Components with responsive behavior should have a dedicated story:

``` text
Responsive
```

Test:

``` text
Mobile
Tablet
Desktop
Wide
```

Use Storybook viewport tooling.

------------------------------------------------------------------------

# 23. RTL Story

For components that support bidirectional layouts:

``` text
RTL
```

The story should visibly demonstrate the component in right-to-left
mode.

------------------------------------------------------------------------

# 24. Density Story

If the density system is implemented:

``` text
Density
├── Compact
├── Comfortable
└── Spacious
```

This makes the global density contract tangible.

------------------------------------------------------------------------

# 25. Theme Stories

Do not create redundant stories such as:

``` text
ButtonObsidian
ButtonLuminous
```

if the global theme switcher already changes the preview.

Instead, provide:

``` text
Theme Comparison
```

when side-by-side comparison is useful.

The story names should describe behavior, not implementation details.

------------------------------------------------------------------------

# 26. Composition Stories

For composable components, show realistic combinations.

Example:

``` text
Card
├── Basic
├── WithHeader
├── WithFooter
├── WithActions
├── ComplexContent
└── Composition
```

The Composition story should demonstrate how the component is intended
to be built.

------------------------------------------------------------------------

# 27. Realistic Examples

Do not use meaningless placeholder examples everywhere.

Instead of:

``` text
Button
Input
Text
```

also demonstrate realistic UI:

``` text
Account settings
System status
Media controls
Authentication
Search
Notifications
```

The examples should remain domain-neutral enough for a shared design
system.

------------------------------------------------------------------------

# 28. Cyberpunk Identity

Ripperdoc's identity can appear through subtle details:

``` text
RIPPERDOC
SYSTEM / COMPONENTS
STATUS / STABLE
THEME / OBSIDIAN
BUILD / ...
```

Possible labels:

``` text
FOUNDATIONS
INTERFACE
TOKENS
THEMES
COMPONENTS
```

Keep these as flavor, not as replacements for clear technical
terminology.

------------------------------------------------------------------------

# 29. Avoid Over-Theming the Documentation

The Storybook itself should not become difficult to read because of the
theme.

Avoid:

``` text
excessive glow
animated scanlines
constant flickering
heavy backgrounds
giant neon borders
decorative noise
```

A design system needs to communicate precision.

The aesthetic should say:

> Cyberpunk engineering lab.

Not:

> Cyberpunk poster.

------------------------------------------------------------------------

# 30. Visual Language

Use:

``` text
strong hierarchy
small metadata labels
thin borders
controlled radii
consistent spacing
subtle elevation
restrained accent usage
technical typography
```

Use large decorative elements only on the landing page.

------------------------------------------------------------------------

# 31. Introduction Page

Create a custom Ripperdoc landing page.

It should replace the feeling of the default Storybook welcome page.

Suggested structure:

``` text
RIPPERDOC

The shared interface system
for the Chrome77 micro-frontends.

[ Explore Components ]
[ Read the Architecture ]

────────────────────────────

THEMES

[ OBSIDIAN ] [ LUMINOUS ]

────────────────────────────

SYSTEM

Tokens
Components
Accessibility
Themes
Testing
```

------------------------------------------------------------------------

# 32. System Status Panel

A small technical status section can provide useful information:

``` text
SYSTEM STATUS

TOKENS       READY
THEMES       2
COMPONENTS   24
ACCESSIBILITY BASELINE
VERSION      0.1.0
```

These values should be generated where possible rather than manually
maintained.

------------------------------------------------------------------------

# 33. Foundations Pages

Do not document tokens only as JSON or code.

Create visual token pages.

For colors:

``` text
Semantic Colors

Primary
Secondary
Success
Warning
Danger
Surface
Text
Border
Focus
```

Each token should show:

``` text
visual sample
token name
CSS variable
usage
theme values
```

------------------------------------------------------------------------

# 34. Color Explorer

Create an interactive color explorer.

Example:

``` text
COLOR EXPLORER

Theme: [ Obsidian ▼ ]

Surface Primary
████████████
--rd-color-surface-primary

Text Primary
████████████
--rd-color-text-primary
```

Allow switching between themes.

------------------------------------------------------------------------

# 35. Typography Explorer

Provide:

``` text
Heading 1
Heading 2
Heading 3
Body
Small
Caption
Code
```

Show:

``` text
font family
size
weight
line height
letter spacing
token
```

------------------------------------------------------------------------

# 36. Spacing Explorer

Provide a visual scale:

``` text
XS  ███
SM  █████
MD  ███████
LG  ██████████
XL  █████████████
```

Show actual token names and values.

------------------------------------------------------------------------

# 37. Motion Explorer

Create a page showing:

``` text
Fast
Normal
Slow

Standard easing
Emphasized easing
Exit easing
```

Also include:

``` text
Reduced Motion
```

This makes motion an explicit part of the design system.

------------------------------------------------------------------------

# 38. Accessibility Dashboard

Create a dedicated accessibility page.

Show:

``` text
Keyboard Support
Focus Visibility
Color Contrast
Reduced Motion
ARIA
Screen Reader Semantics
RTL
```

For mature components, show:

``` text
ACCESSIBILITY
● PASS
```

or an appropriate status.

Do not claim automated compliance merely because an accessibility addon
reports no violations.

------------------------------------------------------------------------

# 39. Component Status

Every component should have a maturity indicator.

Example:

``` text
● STABLE
```

Other statuses:

``` text
EXPERIMENTAL
BETA
STABLE
DEPRECATED
```

The status should be visible on the component page.

------------------------------------------------------------------------

# 40. Component API Documentation

API documentation should be easy to scan.

Example:

``` text
Button

variant
Type: "primary" | "secondary" | "ghost" | "danger"
Default: "primary"

size
Type: "sm" | "md" | "lg"
Default: "md"

loading
Type: boolean
Default: false
```

Generated docs can provide the raw type information, while MDX should
explain intent.

------------------------------------------------------------------------

# 41. Usage Guidelines

Every significant component should document:

``` text
Use when...
Do not use when...
```

Example:

``` text
Use Button for actions.

Use Link when the user is navigating to another location.
```

This prevents misuse.

------------------------------------------------------------------------

# 42. Do / Don't Examples

For important components, add visual guidance:

``` text
DO
[ Save changes ]

DON'T
[ Click here maybe ]
```

Useful for:

``` text
Button
Link
Input
Alert
Dialog
Card
```

------------------------------------------------------------------------

# 43. Code Examples

Every important story should expose usable code.

The code should represent the recommended public API:

``` tsx
<Button variant="primary">
  Continue
</Button>
```

Never show internal implementation paths.

------------------------------------------------------------------------

# 44. Copy Code

Code blocks should have:

``` text
syntax highlighting
copy button
language label
```

The copy button should provide immediate feedback.

------------------------------------------------------------------------

# 45. Installation Examples

The Introduction page should show:

``` bash
pnpm add @ripperdoc-chrome77/components
```

and:

``` bash
pnpm add @ripperdoc-chrome77/tokens
```

Then a minimal example.

------------------------------------------------------------------------

# 46. Theme Setup Example

Document the canonical setup:

``` tsx
<ThemeProvider theme="obsidian">
  <App />
</ThemeProvider>
```

Then show Luminous.

The code should always match the actual package API.

------------------------------------------------------------------------

# 47. Search

Global search should prioritize:

``` text
components
tokens
themes
documentation
```

Search results should show context:

``` text
Button
Actions / Button

FormField
Forms / FormField

color.text.primary
Foundations / Colors
```

------------------------------------------------------------------------

# 48. Keyboard Navigation

The Storybook itself should be keyboard usable.

Ensure:

``` text
Tab
Shift+Tab
Enter
Space
Escape
Arrow keys
```

work correctly where appropriate.

Do not build an inaccessible documentation site while documenting
accessible components.

------------------------------------------------------------------------

# 49. Focus Management

Focus should be visually obvious.

Especially for:

``` text
sidebar
search
theme switcher
playground controls
interactive components
dialogs
menus
```

------------------------------------------------------------------------

# 50. Mobile Storybook

The Storybook documentation site should remain usable on smaller
screens.

Sidebar should become:

``` text
drawer / collapsible navigation
```

The component preview should remain usable.

Do not simply shrink the desktop UI.

------------------------------------------------------------------------

# 51. Responsive Preview

The preview toolbar should make viewport testing easy.

Suggested controls:

``` text
Auto
Mobile
Tablet
Desktop
Wide
```

Optionally allow a custom viewport.

------------------------------------------------------------------------

# 52. Background Controls

For components where contrast matters, provide:

``` text
Canvas
Surface
Elevated
Transparent
```

This is especially useful for:

``` text
Button
Badge
Card
Input
Text
Icon
```

------------------------------------------------------------------------

# 53. Component Test Matrix

For each component, think in a matrix:

``` text
                  Obsidian   Luminous
Default              ✓          ✓
Hover                ✓          ✓
Focus                ✓          ✓
Disabled             ✓          ✓
Loading              ✓          ✓
Responsive           ✓          ✓
RTL                  ✓          ✓
Reduced Motion       ✓          ✓
```

Not every cell is applicable to every component, but the matrix defines
the testing mindset.

------------------------------------------------------------------------

# 54. Theme Regression

Create visual regression coverage for both themes.

High-priority targets:

``` text
Button
Input
Select
Checkbox
Switch
Card
Alert
Dialog
Tooltip
Tabs
```

These should be checked whenever token or theme changes occur.

------------------------------------------------------------------------

# 55. Story Organization

Use a predictable naming convention in the source tree.

Example:

``` text
stories/
├── foundations/
├── primitives/
├── typography/
├── actions/
├── forms/
├── feedback/
├── surfaces/
├── overlays/
└── navigation/
```

Stories should mirror the public design-system structure.

------------------------------------------------------------------------

# 56. Story Metadata

Each story should define meaningful metadata:

``` text
title
component
tags
parameters
argTypes
```

Avoid duplicated configuration.

Use shared Storybook decorators for:

``` text
theme
direction
viewport
providers
```

------------------------------------------------------------------------

# 57. Global Decorators

Centralize cross-cutting concerns.

For example:

``` text
Theme decorator
RTL decorator
Provider decorator
Layout decorator
```

Do not repeat theme setup in every story.

------------------------------------------------------------------------

# 58. Global Theme Decorator

The theme decorator should consume the same theme infrastructure used by
applications.

Conceptually:

``` text
Storybook
   ↓
Theme Decorator
   ↓
ThemeProvider
   ↓
Story
```

This prevents Storybook and production from having different theme
implementations.

------------------------------------------------------------------------

# 59. Toolbar

The global toolbar should provide only high-value controls.

Recommended:

``` text
Theme
Direction
Viewport
Density
```

Avoid adding every configuration option to the toolbar.

------------------------------------------------------------------------

# 60. Component Playground Architecture

Separate:

``` text
Documentation
```

from:

``` text
Experimentation
```

A component page should explain the component first.

The Playground should then allow experimentation.

This prevents the documentation from becoming a giant control panel.

------------------------------------------------------------------------

# 61. Advanced Playground

For complex components, optionally provide a dedicated "Lab" story.

Example:

``` text
Button / Lab
```

The lab can expose:

``` text
variant
size
icons
loading
disabled
width
content
theme
density
```

This should be used for advanced exploration rather than every simple
component.

------------------------------------------------------------------------

# 62. Accessibility Lab

Create a special global story/page:

``` text
Labs
└── Accessibility Lab
```

Use it to test:

``` text
keyboard navigation
focus
screen reader labels
contrast
reduced motion
RTL
```

This becomes a maintenance tool, not just documentation.

------------------------------------------------------------------------

# 63. Theme Lab

Create:

``` text
Labs
└── Theme Lab
```

Render a representative set:

``` text
Button
Input
Card
Badge
Alert
Dialog
Tabs
```

side by side:

``` text
Obsidian
vs
Luminous
```

This gives maintainers a fast way to detect theme drift.

------------------------------------------------------------------------

# 64. Token Lab

Create:

``` text
Labs
└── Token Lab
```

Allow maintainers to inspect:

``` text
semantic token
resolved value
active theme
component usage
```

This is particularly useful when debugging theme issues.

------------------------------------------------------------------------

# 65. Design-System Health Page

Add:

``` text
System
└── Health
```

Potential metrics:

``` text
Components
Stable components
Experimental components
Deprecated components
Themes
Accessibility coverage
Test coverage
Story coverage
```

Where possible, generate these from actual project metadata.

Do not manually maintain fake statistics.

------------------------------------------------------------------------

# 66. Release Information

Show version information in the Storybook footer/header:

``` text
RIPPERDOC
v0.1.0
```

Optionally:

``` text
Commit
Build
Environment
```

This is extremely useful when multiple MFEs consume different versions.

------------------------------------------------------------------------

# 67. Version Switcher

When documentation hosting eventually supports multiple versions:

``` text
Version
[ 0.2.x ▼ ]
```

allow developers to navigate documentation for the version their MFE
consumes.

Do not implement this prematurely if there is only one release.

Design the architecture so it can be added later.

------------------------------------------------------------------------

# 68. Deprecation UX

Deprecated components should visibly show:

``` text
DEPRECATED
```

with:

``` text
Replacement
Migration guide
Removal target
```

Example:

``` text
⚠ Deprecated

Use `NewComponent` instead.

Migration →
```

------------------------------------------------------------------------

# 69. Empty States

If a section has no content, show a useful state.

Do not leave blank screens.

Example:

``` text
No experimental components yet.

Stable components are available in Components.
```

------------------------------------------------------------------------

# 70. Loading States

Storybook documentation should avoid excessive loading indicators.

For asynchronous examples, use clear loading states.

Do not animate indefinitely without purpose.

------------------------------------------------------------------------

# 71. Error States

If an interactive example fails, provide an understandable message.

Example:

``` text
Preview unavailable

The story failed to render.
Check the component error or open the console.
```

The documentation experience should degrade gracefully.

------------------------------------------------------------------------

# 72. Accessibility Status Badge

Use a consistent status:

``` text
A11Y
● VERIFIED
```

But define exactly what "verified" means.

For example:

``` text
automated checks passed
keyboard interaction tested
manual review completed
```

Do not use accessibility badges as marketing claims.

------------------------------------------------------------------------

# 73. Documentation Writing Style

Documentation should be:

``` text
concise
technical
direct
example-driven
```

Avoid unnecessary marketing language.

Bad:

> Our revolutionary next-generation button empowers developers...

Better:

> Button triggers an action or submits an operation.

------------------------------------------------------------------------

# 74. Component Documentation Template

Every component can follow:

``` text
# Component

Short description.

## When to use

...

## When not to use

...

## Examples

...

## Variants

...

## States

...

## Accessibility

...

## Theming

...

## API

...

## Composition

...

## Related components

...
```

Not every section must appear if irrelevant.

------------------------------------------------------------------------

# 75. Related Components

Add navigation between related components.

Example:

``` text
Button
Related:
→ IconButton
→ Link
→ ButtonGroup
```

For:

``` text
Input
Related:
→ FormField
→ Select
→ Textarea
```

This creates a discoverable system rather than isolated component pages.

------------------------------------------------------------------------

# 76. Component Comparison Pages

For confusingly similar components, create comparison documentation.

Example:

``` text
Button vs Link

Button → action
Link   → navigation
```

Other possible comparisons:

``` text
Alert vs Toast
Card vs Panel
Dialog vs Drawer
Text vs Caption
```

This is extremely useful for adoption.

------------------------------------------------------------------------

# 77. Design-to-Code Alignment

Where practical, document:

``` text
Design token
Component prop
CSS variable
Story
```

Example:

``` text
Button
variant="primary"
      ↓
button.primary.*
      ↓
semantic action tokens
```

This creates a visible bridge between design and implementation.

------------------------------------------------------------------------

# 78. Figma Integration Readiness

Even if Figma integration is not implemented now, structure the naming
so that:

``` text
Figma component
        ↕
Ripperdoc component
```

can be mapped cleanly later.

Keep:

``` text
component names
variants
sizes
states
tokens
```

consistent across design and code.

------------------------------------------------------------------------

# 79. Analytics

Do not add invasive analytics by default.

If usage analytics are eventually needed, prefer privacy-conscious,
opt-in infrastructure.

Storybook is primarily a development tool.

------------------------------------------------------------------------

# 80. Performance

The Storybook should remain fast even as the component library grows.

Avoid:

``` text
huge animated backgrounds
large unoptimized assets
unnecessary runtime dependencies
heavy custom visual effects
```

Optimize for:

``` text
fast navigation
fast story rendering
fast theme switching
fast search
```

------------------------------------------------------------------------

# 81. Asset Strategy

Keep decorative assets minimal.

Prefer:

``` text
CSS
SVG
small optimized assets
```

over large background images.

Do not depend on external network resources for basic Storybook
functionality.

------------------------------------------------------------------------

# 82. Motion Guidelines for Storybook

Use motion to communicate:

``` text
state change
theme change
navigation
feedback
```

Avoid continuous animation.

Theme switching can use a subtle transition, but it must respect:

``` text
prefers-reduced-motion
```

------------------------------------------------------------------------

# 83. Sound

Do not use sound by default.

The Cyberpunk identity should remain visual and technical.

------------------------------------------------------------------------

# 84. Easter Eggs

Optional, but keep them extremely subtle.

Possible examples:

``` text
Chrome77 build labels
Ripperdoc terminology
small hidden system messages
```

They should never interfere with:

``` text
navigation
accessibility
performance
documentation
```

------------------------------------------------------------------------

# 85. Recommended Storybook Navigation

Final navigation:

``` text
RIPPERDOC
│
├── Overview
│   ├── Welcome
│   ├── Philosophy
│   ├── Getting Started
│   └── Architecture
│
├── Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Radius
│   ├── Elevation
│   ├── Motion
│   ├── Responsive
│   └── Density
│
├── Themes
│   ├── Obsidian
│   ├── Luminous
│   └── Theme Architecture
│
├── Primitives
├── Typography
├── Actions
├── Forms
├── Feedback
├── Surfaces
├── Overlays
├── Navigation
│
└── Labs
    ├── Theme Lab
    ├── Accessibility Lab
    ├── Token Lab
    └── System Health
```

------------------------------------------------------------------------

# 86. Recommended Global Controls

Keep the toolbar to:

``` text
THEME
DIRECTION
DENSITY
VIEWPORT
```

Optional:

``` text
Contrast
Motion
```

Do not expose internal developer flags in the global toolbar.

------------------------------------------------------------------------

# 87. Recommended Component Page Controls

Each page should have:

``` text
Theme
Background
Viewport
```

and then component-specific controls.

For example:

``` text
Button
───────────────
Theme       Obsidian
Variant     Primary
Size        Medium
Loading     Off
Disabled    Off
```

------------------------------------------------------------------------

# 88. Story Types

Use a consistent taxonomy:

``` text
Overview
Playground
Variants
States
Composition
Responsive
Accessibility
Theme Comparison
```

Not every component needs every story.

------------------------------------------------------------------------

# 89. Example Button Story Structure

``` text
Button
│
├── Overview
│
├── Playground
│
├── Variants
│   ├── Primary
│   ├── Secondary
│   ├── Ghost
│   └── Danger
│
├── Sizes
│
├── States
│   ├── Default
│   ├── Disabled
│   ├── Loading
│   └── Focus
│
├── WithIcons
│
├── Composition
│
├── Responsive
│
└── ThemeComparison
```

------------------------------------------------------------------------

# 90. Example Card Story Structure

``` text
Card
│
├── Overview
├── Playground
├── Basic
├── WithHeader
├── WithFooter
├── WithActions
├── Interactive
├── ComplexContent
├── ThemeComparison
└── Accessibility
```

------------------------------------------------------------------------

# 91. Example Input Story Structure

``` text
Input
│
├── Overview
├── Playground
├── Sizes
├── WithLabel
├── WithDescription
├── Error
├── Disabled
├── ReadOnly
├── WithIcon
├── Loading
├── RTL
├── Responsive
└── Accessibility
```

------------------------------------------------------------------------

# 92. Quality Rules for Stories

A story should:

``` text
□ demonstrate one idea clearly
□ use public APIs
□ be deterministic
□ work in both themes
□ be keyboard usable
□ avoid unnecessary dependencies
□ have meaningful names
□ be suitable for visual regression when appropriate
```

------------------------------------------------------------------------

# 93. Storybook as a Release Gate

Before publishing a component:

``` text
Implementation
      ↓
Storybook
      ↓
Theme review
      ↓
Accessibility review
      ↓
Interaction review
      ↓
Visual review
      ↓
Tests
      ↓
Release
```

If a component cannot be clearly demonstrated in Storybook, it probably
is not sufficiently documented yet.

------------------------------------------------------------------------

# 94. Recommended Technical Structure

Keep Storybook configuration separate from component implementation.

Conceptually:

``` text
apps/storybook/
├── .storybook/
│   ├── main.ts
│   ├── preview.tsx
│   ├── theme.ts
│   ├── decorators/
│   │   ├── ThemeDecorator.tsx
│   │   ├── DirectionDecorator.tsx
│   │   └── ProviderDecorator.tsx
│   └── ...
│
├── src/
│   ├── docs/
│   ├── foundations/
│   ├── themes/
│   └── labs/
│
└── ...
```

Component stories should live close to their components where practical:

``` text
packages/components/src/actions/Button/
├── Button.tsx
├── Button.types.ts
├── Button.test.tsx
├── Button.stories.tsx
└── index.ts
```

This keeps ownership clear.

------------------------------------------------------------------------

# 95. Storybook Theme Architecture

Conceptually:

``` text
                    Ripperdoc Theme Contract
                              │
                    ┌─────────┴─────────┐
                    │                   │
                Obsidian             Luminous
                    │                   │
                    └─────────┬─────────┘
                              │
                       ThemeProvider
                              │
                        Storybook Decorator
                              │
                           Story
```

The Storybook decorator should not implement a second theme system.

------------------------------------------------------------------------

# 96. Theme Switching Implementation Principle

The switcher should change:

``` text
theme context
CSS variables
visual tokens
```

not:

``` text
component props
story definitions
component implementations
```

This validates that the design system is truly theme-driven.

------------------------------------------------------------------------

# 97. Preview Isolation

Each story should render inside a predictable environment.

Provide:

``` text
theme
font
CSS variables
direction
background
```

without leaking arbitrary story styles into other stories.

------------------------------------------------------------------------

# 98. Font Strategy

The Storybook should load the same font stack used by the design system.

Avoid using one font in documentation and another in components unless
intentionally documented.

------------------------------------------------------------------------

# 99. Documentation Search Optimization

Component titles and descriptions should use predictable terminology.

For example:

``` text
Actions / Button
Forms / Input
Feedback / Alert
```

This improves discoverability.

------------------------------------------------------------------------

# 100. Final Storybook Experience

The ideal experience should feel like:

``` text
                    RIPPERDOC
              UI SYSTEM / CHROME77

       ┌───────────────────────────────────┐
       │ THEME      OBSIDIAN / LUMINOUS    │
       │ VIEWPORT   DESKTOP                │
       │ DENSITY    COMFORTABLE            │
       └───────────────────────────────────┘

FOUNDATIONS        BUTTON
PRIMITIVES         ─────────────────────────
TYPOGRAPHY         Primary action control...
ACTIONS
FORMS              [ Playground ]
FEEDBACK
SURFACES           ┌───────────────────────┐
OVERLAYS           │                       │
NAVIGATION         │      [ CONTINUE ]     │
                   │                       │
LABS               └───────────────────────┘

                   Variants
                   States
                   Composition
                   Accessibility
                   API
                   Tokens
```

The visual identity should be distinctive, but the information
architecture should remain immediately understandable to a developer who
has never seen Ripperdoc before.

------------------------------------------------------------------------

# 101. Final Principles

### 1. Storybook is part of Ripperdoc

Treat it as a first-class product.

### 2. Documentation is interactive

Show behavior, not just screenshots.

### 3. Themes are first-class

Obsidian and Luminous should be switchable everywhere.

### 4. Playground over prop tables

Let developers experiment with components.

### 5. Real examples over filler

Demonstrate realistic UI patterns.

### 6. Accessibility is visible

Document and test it as part of every component.

### 7. Cyberpunk should be subtle

Technical, sharp, distinctive --- never noisy.

### 8. Consistency beats decoration

Every component page should feel like the same system.

### 9. Storybook should validate the architecture

If themes, tokens, components, and accessibility work correctly in
Storybook, the actual MFEs should inherit that confidence.

### 10. Build for discovery

A developer should be able to go from:

``` text
"I need a button"
```

to:

``` text
Button → Playground → Usage → Accessibility → API → Copy
```

in seconds.

------------------------------------------------------------------------

# 102. Final Implementation Checklist

## Shell

``` text
□ Custom Storybook theme
□ Ripperdoc branding
□ Custom header
□ Structured sidebar
□ Global search
□ Version indicator
□ Theme switcher
□ Responsive shell
```

## Themes

``` text
□ Obsidian
□ Luminous
□ Global theme switching
□ Theme comparison
□ Theme persistence if desired
□ Reduced-motion support
```

## Foundations

``` text
□ Color explorer
□ Typography explorer
□ Spacing explorer
□ Radius explorer
□ Elevation explorer
□ Motion explorer
□ Responsive documentation
□ Density documentation
```

## Components

``` text
□ Consistent page layout
□ Overview
□ Playground
□ Variants
□ States
□ Composition
□ Responsive stories
□ Accessibility stories where relevant
□ Theme comparison where useful
□ Code examples
□ API documentation
```

## Labs

``` text
□ Theme Lab
□ Accessibility Lab
□ Token Lab
□ System Health
```

## UX

``` text
□ Keyboard navigation
□ Visible focus
□ Mobile support
□ Search
□ Copyable code
□ Clear loading states
□ Clear error states
□ Reduced motion
□ RTL where applicable
```

## Engineering

``` text
□ Shared decorators
□ Real ThemeProvider
□ No duplicated theme implementation
□ Deterministic stories
□ Visual regression
□ Interaction tests
□ Accessibility checks
□ Production-like package imports
```

## Documentation

``` text
□ Getting Started
□ Architecture
□ Theme guide
□ Token guide
□ Component usage
□ Do/Don't guidance
□ Accessibility
□ Migration
□ Release/version information
```

------------------------------------------------------------------------

# 103. The Ripperdoc Storybook Contract

The final mental model:

``` text
                         RIPPERDOC STORYBOOK
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
          DESIGN SYSTEM        THEMES             DOCUMENTATION
              │             ┌─────┴─────┐              │
              │             │           │              │
           Tokens       Obsidian    Luminous       Guidelines
              │             │           │              │
              └─────────────┴───────────┘              │
                            │                           │
                       Components ←─────────────────────┘
                            │
                     Interactive Labs
                            │
              ┌─────────────┼─────────────┐
              │             │             │
          Playground      A11y       Theme Lab
              │             │             │
              └─────────────┼─────────────┘
                            │
                         MFEs
```

**Ripperdoc Storybook should ultimately be the place where the entire
design system can be understood, experimented with, validated, and
trusted before it reaches NetWatch, Braindance, or any other
micro-frontend.**
