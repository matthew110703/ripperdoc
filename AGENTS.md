# Ripperdoc Agent Guidelines

> **Notice for all AI Agents**: You are assisting in the **Ripperdoc** repository.
> Always consult this file and the specifications in `docs/` before making architectural, design token, theme, or component changes.

---

## 1. Project Purpose & Philosophy

**Ripperdoc** is a **shared design-system platform for multiple micro-frontends (MFEs)**, built on React, Next.js, Vite, and Storybook (`@storybook/nextjs-vite`).

### Absolute Invariants:
1. **Strict One-Way Dependency**:
   - `MFE Design System → Ripperdoc Global Design System`.
   - Ripperdoc **never** imports or depends on any MFE code, business logic, or domain models.
2. **Domain Agnosticism**:
   - Ripperdoc contains **only** cross-application, reusable UI primitives, generic components, tokens, hooks, and utilities.
   - Domain components (e.g. `ProductCard`, `OrderTable`, `VideoPlayerWithDRM`) belong in their respective MFEs.
3. **Themes as Configuration**:
   - Themes (e.g. **Obsidian** and **Luminous**) configure design tokens via CSS custom properties.
   - Never fork components for branding (e.g. do not create `ObsidianButton` vs. `LuminousButton`). All components consume standard tokens like `var(--rd-color-primary)`.

---

## 2. Token Architecture & Naming Conventions

All tokens follow the **three-tier hierarchy**:
1. **Primitive Tokens**: Raw palette and scale values.
2. **Semantic Tokens**: Intent-based tokens (`--rd-color-surface`, `--rd-color-primary`, `--rd-space-4`, etc.).
3. **Component Tokens**: Component-scoped contracts when necessary (`--rd-button-primary-bg`).

- **Prefix**: All CSS variables **MUST** be prefixed with `--rd-`.
- **Theme Switcher**: Supported themes apply via `[data-theme="obsidian"]` or `[data-theme="luminous"]` (or root default).

---

## 3. Package Boundaries

The repository is organized as a pnpm workspace:
- `@ripperdoc/tokens`: Raw and semantic design tokens, TypeScript types, and foundation CSS.
- `@ripperdoc/themes`: Theme-specific color mappings, elevation layers, and theme providers (`obsidian.css`, `luminous.css`).
- `@ripperdoc/utils`: UI utilities (`cn`, focus helpers, DOM helpers).
- `@ripperdoc/components`: Accessible, reusable UI components.

---

## 4. Documentation References

Before implementing or modifying features, review the relevant specs:
- Architecture & Principles: [`docs/architecture/multi-mfe-design-system-architecture.md`](docs/architecture/multi-mfe-design-system-architecture.md)
- Unified Design System & Tokens: [`docs/design-system/unified-design-system.md`](docs/design-system/unified-design-system.md)
- Obsidian Theme (Dark): [`docs/themes/obsidian.md`](docs/themes/obsidian.md)
- Luminous Theme (Light): [`docs/themes/luminous.md`](docs/themes/luminous.md)
- Publishing & Release Process: [`docs/publishing/publishing-process.md`](docs/publishing/publishing-process.md)
