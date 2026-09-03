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
