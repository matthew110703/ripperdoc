# Ripperdoc Design System Platform (`@ripperdoc-chrome77`)

> A unified, high-performance design-system platform for multiple micro-frontends (MFEs), built on React 19, Next.js, Vite, and Storybook.

[![npm version](https://img.shields.io/npm/v/@ripperdoc-chrome77/tokens.svg?color=blue)](https://www.npmjs.com/package/@ripperdoc-chrome77/tokens)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 1. Monorepo Architecture

Ripperdoc acts as the **single source of truth** for tokens, themes, primitives, and accessible UI components across all consuming micro-frontends (MFEs).

```text
┌────────────────────────────────────────────────────────┐
│               Consuming Micro-Frontends                │
│             (MFE Store, MFE Admin, etc.)               │
└───────────────────────────┬────────────────────────────┘
                            │ imports (one-way dependency)
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Ripperdoc Platform                   │
│                                                        │
│  ┌──────────────────────────────┐                      │
│  │ @ripperdoc-chrome77/components │ ◄── UI Components   │
│  └──────────────┬───────────────┘                      │
│                 │                                      │
│        ┌────────┴────────┐                             │
│        ▼                 ▼                             │
│  ┌────────────┐   ┌────────────┐                       │
│  │   themes   │   │   utils    │ ◄── ThemeProvider, cn │
│  └─────┬──────┘   └────────────┘                       │
│        │                                               │
│        ▼                                               │
│  ┌────────────┐                                        │
│  │   tokens   │ ◄── 3-Tier Tokens, 4px baseline rhythm │
│  └────────────┘                                        │
└────────────────────────────────────────────────────────┘
```

---

## 2. Packages

| Package | Version | Description | Readme |
| :--- | :--- | :--- | :--- |
| [**`@ripperdoc-chrome77/tokens`**](./packages/tokens) | `1.0.0-beta` | Raw and semantic design tokens, TypeScript scales, foundations CSS | [Docs](./packages/tokens/README.md) |
| [**`@ripperdoc-chrome77/themes`**](./packages/themes) | `1.0.0-beta` | Obsidian (Dark) & Luminous (Light) themes, `<ThemeProvider>`, `useTheme` | [Docs](./packages/themes/README.md) |
| [**`@ripperdoc-chrome77/utils`**](./packages/utils) | `1.0.0-beta` | ClassName composition utility (`cn`) combining `clsx` + `tailwind-merge` | [Docs](./packages/utils/README.md) |
| [**`@ripperdoc-chrome77/components`**](./packages/components) | `1.0.0-beta` | Accessible primitives (`Box`, `Stack`, `Inline`, `Container`), `Button`, `Badge`, `Card` | [Docs](./packages/components/README.md) |

---

## 3. Getting Started

### Local Development

Clone the repository and install dependencies using `pnpm`:

```bash
# Install dependencies
pnpm install

# Start Storybook dev server (interactive design-system playground)
pnpm dev
# (or pnpm storybook) -> http://localhost:6006

# Watch and rebuild packages in parallel
pnpm dev:packages
```

---

## 4. Scripts Guide

### Build & Typecheck
- `pnpm build`: Builds all workspace packages (`tsup` + `tsc --emitDeclarationOnly`).
- `pnpm build tokens utils`: Targeted build for specific packages.
- `pnpm typecheck:all`: Runs root and package-level TypeScript typechecks (`tsc --noEmit`).
- `pnpm build-storybook`: Compiles Storybook static bundle to `storybook-static/`.

### Testing & Quality
- `pnpm test`: Runs Vitest test suites.
- `pnpm test:watch`: Runs Vitest in watch mode.
- `pnpm commit`: Interactive commit wizard with conventional commit rules (`cz-git`).

### Release & Publishing
- `pnpm changeset`: Interactively create a changeset file describing changes.
- `pnpm version-packages`: Consumes pending changesets, bumps versions, and generates `CHANGELOG.md`.
- `pnpm release`: Builds packages and publishes unpublished packages to npm.
- `pnpm release:changed`: Automated release script that detects changes, generates changesets, writes changelogs, builds, and publishes!

---

## 5. Architectural Invariants

1. **Strict One-Way Dependency**:
   `MFE Design System → Ripperdoc Global Design System`.
   Ripperdoc never imports or depends on any MFE code, business logic, or domain models.
2. **Domain Agnosticism**:
   Ripperdoc contains only cross-application, reusable UI primitives, generic components, tokens, and utilities.
3. **Themes as Configuration**:
   Themes configure design tokens via CSS custom properties (`--rd-*`). Components are never forked for branding (e.g. no `ObsidianButton` vs `LuminousButton`).

---

## 6. Documentation Hub

Detailed documentation is available in the [`docs/`](./docs) directory:
- [Multi-MFE Design System Architecture](./docs/architecture/multi-mfe-design-system-architecture.md)
- [Unified Design System & Token Specifications](./docs/design-system/unified-design-system.md)
- [Obsidian Theme Specifications](./docs/themes/obsidian.md)
- [Luminous Theme Specifications](./docs/themes/luminous.md)
- [Publishing & Release Process](./docs/publishing/publishing-process.md)

---

## 7. License

MIT © Ripperdoc Team
