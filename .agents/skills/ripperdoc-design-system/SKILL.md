---
name: ripperdoc-design-system
description: Standards, conventions, and workflows for authoring tokens, themes, primitives, and components in the Ripperdoc multi-MFE design system platform.
---

# Ripperdoc Design System Playbook

Use this skill whenever working in the Ripperdoc codebase to author or refactor tokens, themes, primitives, or components.

## 1. Decision Flow Before Creating Components
1. Ask: Is the component semantically generic and needed by multiple MFEs?
   - If YES -> Implement in `@ripperdoc/components`.
   - If NO -> Guide the user to keep it inside the relevant MFE.
2. Check if an existing primitive (`Box`, `Stack`, `Text`, etc.) or component can be composed.
3. Define the component contract with typed variants via `class-variance-authority` (cva).
4. Connect all visual properties to semantic tokens (`--rd-*`). Never use hardcoded values.

## 2. Component Structure
Each component in `@ripperdoc/components` should follow:
```text
components/
└── <component-name>/
    ├── <ComponentName>.tsx
    ├── <ComponentName>.types.ts
    ├── <ComponentName>.module.css (or styled via cva/cn)
    ├── <ComponentName>.stories.tsx
    ├── <ComponentName>.test.tsx
    └── index.ts
```

## 3. Theming & Storybook Validation
- When adding or updating styles, verify in Storybook under both **Obsidian (Dark)** and **Luminous (Light)**.
- Ensure all interactive states (hover, focus, active, disabled, loading) render distinctly and pass accessibility contrast checks in both themes.

## 4. Motion Standards & Compliance (Mandatory for All Components)
All newly authored or refactored components in `@ripperdoc-chrome77/components` **must support motion**:
1. **Tokens → Primitives → Components Architecture**:
   - Never hardcode durations (e.g. `0.2s`) or easing curves in components.
   - Centralize timing values in `motionTokens` (`durations.fast`, `durations.normal`, `durations.slow`) and `--rd-duration-*`.
   - Use centralized physics springs (`springs.snappy`, `springs.gentle`, `springs.bouncy`, `springs.stiff`).
2. **Motion by Default with Opt-Out Support**:
   - **Enabled by Default**: Interactive elements (buttons, cards, badges, disclosures) have motion enabled by default.
   - **Component-Level Opt-Out**: Every animated component must expose a `motion?: boolean` prop (default `true`) or accept motion props allowing consumers to disable it locally (`motion={false}`).
   - **Global Configuration**: Components must consume `useMotionConfig()` and `useReducedMotion()` from `@ripperdoc-chrome77/components/motion`. When motion is globally disabled via `<MotionProvider disabled={true}>`, all transforms, animations, and CSS transitions must be suppressed (falling back to immediate state updates).
3. **Accessibility First (Reduced Motion)**:
   - Always respect `prefers-reduced-motion: reduce` and the global `reducedMotion` mode (`user` | `always` | `never`).
   - Transform/position jumps must be eliminated or replaced with subtle instant opacity transitions.
4. **Use the Motion Primitives**:
   - Instead of re-implementing bespoke animations in each component, compose from standard primitives:
     * `<Fade>` for reveals and tooltips.
     * `<Slide>` for trays, drawers, and toasts.
     * `<Scale>` for dialogs, popovers, and modal centers.
     * `<Collapse>` for accordions and disclosures.
     * `<Stagger>` for lists, grids, and card feeds.
     * `<Attention>` for alerts, error shakes, and status badges.
     * `<MotionBox>` for polymorphic custom motion elements.
