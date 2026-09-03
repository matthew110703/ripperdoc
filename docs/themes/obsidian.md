---
name: Obsidian
colors:
  surface: "#131313"
  surface-dim: "#131313"
  surface-bright: "#393939"
  surface-container-lowest: "#0e0e0e"
  surface-container-low: "#1c1b1b"
  surface-container: "#201f1f"
  surface-container-high: "#2a2a2a"
  surface-container-highest: "#353534"
  on-surface: "#e5e2e1"
  on-surface-variant: "#c2c6d7"
  inverse-surface: "#e5e2e1"
  inverse-on-surface: "#313030"
  outline: "#8c90a0"
  outline-variant: "#424654"
  surface-tint: "#b0c6ff"
  primary: "#b0c6ff"
  on-primary: "#002d6e"
  primary-container: "#558dff"
  on-primary-container: "#002761"
  inverse-primary: "#0058ca"
  secondary: "#c6c6c7"
  on-secondary: "#2f3131"
  secondary-container: "#454747"
  on-secondary-container: "#b4b5b5"
  tertiary: "#ffb690"
  on-tertiary: "#542100"
  tertiary-container: "#e86d17"
  on-tertiary-container: "#4a1c00"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#d9e2ff"
  primary-fixed-dim: "#b0c6ff"
  on-primary-fixed: "#001944"
  on-primary-fixed-variant: "#00429b"
  secondary-fixed: "#e2e2e2"
  secondary-fixed-dim: "#c6c6c7"
  on-secondary-fixed: "#1a1c1c"
  on-secondary-fixed-variant: "#454747"
  tertiary-fixed: "#ffdbca"
  tertiary-fixed-dim: "#ffb690"
  on-tertiary-fixed: "#331100"
  on-tertiary-fixed-variant: "#783200"
  background: "#131313"
  on-background: "#e5e2e1"
  surface-variant: "#353534"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-margin-mobile: 16px
  container-margin-desktop: 48px
  gutter: 16px
---

## Brand & Style

The design system establishes a premium, immersive environment for high-end digital cinematography. Moving away from the previous high-friction brutalist aesthetic, this system prioritizes visual clarity and content immersion.

The style is **Modern/Cinematic Minimalism** with a focus on deep tonal layers. It utilizes high-contrast typography against dark backgrounds to create a "lights out" viewing experience. Surfaces feel substantial but clean, using subtle glassmorphism for navigation overlays to maintain a sense of depth without distracting from the core media. The emotional goal is to evoke a sense of exclusivity, calm, and effortless discovery.

## Colors

The palette is strictly dark-mode by default to prioritize the vibrant colors of film and television content.

- **Backgrounds:** A tiered system of `#0A0A0A` for the base canvas and `#121212` for cards and containers.
- **Primary Accent:** A vibrant, saturated blue used sparingly for interactive states, progress bars, and active indicators to provide a "digital spark" within the dark environment.
- **Secondary/Text:** Pure white is reserved for primary headings and critical actions, while various opacities of white (70% and 50%) are used for secondary and tertiary metadata to manage visual hierarchy.
- **Overlays:** Smooth, linear gradients transition from transparent to `#0A0A0A` to ensure text legibility over movie posters and hero imagery.

## Typography

This design system utilizes **Inter** across all roles to ensure maximum legibility and a contemporary, geometric feel.

Headlines use tighter letter-spacing and heavier weights to feel impactful and "editorial." Body text maintains generous line-height for readability during long-form descriptions. For mobile, display sizes are aggressively scaled down to prevent awkward line breaks on narrow screens while maintaining their bold weight. Label styles use uppercase tracking for metadata like "4K," "HDR," or "NEW EPISODE" to distinguish them from standard prose.

## Layout & Spacing

The layout philosophy follows a **fluid-to-fixed model**. On mobile and tablet, a fluid 4-column and 8-column grid is used with 16px side margins. On desktop, the layout is capped at a 1440px max-width to prevent content from becoming overly sparse on ultra-wide monitors.

Spacing is based on a 4px baseline grid. Content "shelves" (horizontal scrolling rows) use 24px spacing between them to clearly delineate different categories. Inner-component spacing (e.g., between a movie title and its rating) uses tight 4px or 8px increments to keep related information grouped tightly.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Soft Ambient Shadows**.

1.  **Level 0 (Base):** `#0A0A0A` - The main background.
2.  **Level 1 (Cards/Lists):** `#121212` - Slightly elevated surfaces using a subtle 1px border of `rgba(255,255,255,0.05)` to define edges.
3.  **Level 2 (Modals/Popovers):** Surface `#1E1E1E` with a soft, diffused shadow: `0 12px 32px rgba(0,0,0,0.5)`.

Interactive elements like hover-state cards should scale slightly (1.05x) and increase shadow density to simulate physical proximity to the user.

## Shapes

The shape language is defined by a consistent **12px radius** for all primary containers, including movie posters, buttons, and input fields. This "Rounded" setting strikes a balance between the precision of the technical typography and the friendly, accessible nature of a premium consumer app. Smaller elements like tags or "chips" use a fully rounded (pill) radius to distinguish them from actionable buttons.

## Components

### Buttons

- **Primary:** Solid White background with Black text for maximum visibility. 12px corner radius.
- **Secondary:** Semi-transparent white (`rgba(255,255,255,0.1)`) with white text and a backdrop blur.
- **Icon Only:** Circular glass containers for secondary actions like "Add to List."

### Cards

- **Media Card:** 12px radius. No visible border in resting state. On hover/focus, a 2px stroke of the Primary Blue is applied.
- **Glass Overlay:** Used for playback controls and bottom navigation on mobile, utilizing a 20px backdrop blur and 70% opacity of the surface color.

### Inputs

- **Search:** Darker than the surface background (`#000000`) with a subtle 1px border. 12px radius.
- **Focus State:** The border transitions to Primary Blue with a soft blue outer glow.

### Feedback Elements

- **Progress Bars:** Thin 4px height. The "track" is `rgba(255,255,255,0.2)` and the "fill" is the Primary Blue.
- **Active States:** Navigation links use a small blue dot indicator beneath the text rather than traditional underlines.
