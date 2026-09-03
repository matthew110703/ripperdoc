# Unified Tokens & Themes Rules

## 1. Token Conventions
- Prefix: All CSS custom properties and token keys must use `--rd-` (e.g. `--rd-color-surface`, `--rd-space-4`).
- Three-tier token hierarchy:
  1. **Primitive Tokens**: Pure values (`blue-500`, `4px`).
  2. **Semantic Tokens**: Intent-based tokens (`color-primary`, `space-md`, `radius-lg`). Components must consume these.
  3. **Component Tokens**: Isolated component styling when needed (`button-primary-bg`).

## 2. Supported Themes
- **Obsidian**:
  - Dark-mode default.
  - Surface base: `#131313`.
  - Primary accent: `#B0C6FF` (with `#002D6E` on-primary).
  - Tonal layering: Surface Lowest (`#0E0E0E`), Low (`#1C1B1B`), Container (`#201F1F`), High (`#2A2A2A`), Highest (`#353534`).
  - Depth: Level 0 (`#0A0A0A`), Level 1 (`#121212` with 1px border), Level 2 (`#1E1E1E` with soft ambient shadow).
- **Luminous**:
  - Light-mode editorial.
  - Surface base: `#F8F9FF`.
  - Primary accent: `#004AC6` / `#2563EB` (with `#FFFFFF` on-primary).
  - Tonal layering: Surface Lowest (`#FFFFFF`), Low (`#EFF4FF`), Container (`#E5EEFF`), High (`#DCE9FF`), Highest (`#D3E4FE`).
  - Depth: Level 0 (`#F8FAFC`), Level 1 (`#FFFFFF` with `#E2E8F0` border), Level 2 (`#FFFFFF` with crisp architectural shadow).

## 3. Shared Foundations (Do NOT modify per theme)
- Spacing: 4px baseline scale (`--rd-space-1: 4px` through `--rd-space-16: 64px`).
- Radius: `sm` (4px), `default` (8px), `md` (12px), `lg` (16px), `xl` (24px), `full` (9999px).
- Typography: Inter sans-serif. Always use `tnum` (tabular numerals) for counters, runtimes, and timestamps.
- Motion: `fast` (150ms), `normal` (250ms), `slow` (400ms) with `cubic-bezier(0.4, 0, 0.2, 1)`.
