# @ripperdoc-chrome77/tokens

> Design tokens, shared foundation scales, and CSS variables for the **Ripperdoc** multi-MFE design system platform.

[![npm version](https://img.shields.io/npm/v/@ripperdoc-chrome77/tokens.svg?color=blue)](https://www.npmjs.com/package/@ripperdoc-chrome77/tokens)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 1. Overview

`@ripperdoc-chrome77/tokens` provides the raw primitives, semantic scales, and foundational CSS custom properties consumed across all Ripperdoc themes, packages, and micro-frontends (MFEs).

### Key Features
- **Strict 3-Tier Token Architecture**: Primitive tokens → Semantic design tokens (`--rd-*`) → Component tokens.
- **4px Baseline Grid**: Linear spacing scale (4px to 64px) calibrated for consistent visual rhythm.
- **Inter Typography Scale**: Pre-calculated responsive font sizes, line heights, letter spacings, and font weights.
- **Micro-Motion Curves**: Consistent durations and cubic-bezier easing tokens for fluid transitions.
- **TypeScript-First**: Strictly typed scale constants and string literal types.

---

## 2. Installation

```bash
# Using pnpm (recommended)
pnpm add @ripperdoc-chrome77/tokens

# Using npm
npm install @ripperdoc-chrome77/tokens

# Using yarn
yarn add @ripperdoc-chrome77/tokens
```

---

## 3. Usage

### A. Foundational CSS Custom Properties
Import the foundation styles into your global stylesheet, Storybook preview, or Next.js `_app.tsx` / `layout.tsx`:

```css
/* In your global.css or app entry point */
@import '@ripperdoc-chrome77/tokens/foundations.css';
```

Or via JavaScript / TypeScript:

```ts
import '@ripperdoc-chrome77/tokens/foundations.css';
```

This injects standard CSS variables on `:root`:

```css
.my-card {
  padding: var(--rd-space-4); /* 16px */
  border-radius: var(--rd-radius-md); /* 12px */
  transition: all var(--rd-motion-normal) var(--rd-ease-standard);
}
```

### B. JavaScript / TypeScript Scale Constants
You can also import type-safe token values directly in code:

```ts
import { spacing, radii, motion, typography } from '@ripperdoc-chrome77/tokens';
import type { SpacingScale, RadiiScale, TypographyRole } from '@ripperdoc-chrome77/tokens';

// Access spacing scale values
console.log(spacing[4]); // "16px"
console.log(radii.md);   // "12px"
console.log(motion.fast); // "150ms"
```

---

## 4. Token Reference

### Spacing Scale (4px Baseline)
| Key | Value | CSS Variable |
| :--- | :--- | :--- |
| `1` | `4px` | `--rd-space-1` |
| `2` | `8px` | `--rd-space-2` |
| `3` | `12px` | `--rd-space-3` |
| `4` | `16px` | `--rd-space-4` |
| `5` | `20px` | `--rd-space-5` |
| `6` | `24px` | `--rd-space-6` |
| `8` | `32px` | `--rd-space-8` |
| `10` | `40px` | `--rd-space-10` |
| `12` | `48px` | `--rd-space-12` |
| `16` | `64px` | `--rd-space-16` |

### Corner Radii
| Key | Value | CSS Variable |
| :--- | :--- | :--- |
| `sm` | `4px` | `--rd-radius-sm` |
| `default` | `8px` | `--rd-radius-md` |
| `md` | `12px` | `--rd-radius-md` |
| `lg` | `16px` | `--rd-radius-lg` |
| `xl` | `24px` | `--rd-radius-xl` |
| `full` | `9999px` | `--rd-radius-full` |

### Motion & Transitions
| Key | Value | CSS Variable |
| :--- | :--- | :--- |
| `fast` | `150ms` | `--rd-motion-fast` |
| `normal` | `250ms` | `--rd-motion-normal` |
| `slow` | `400ms` | `--rd-motion-slow` |
| `easeStandard` | `cubic-bezier(0.4, 0, 0.2, 1)` | `--rd-ease-standard` |
| `easeDecelerate` | `cubic-bezier(0, 0, 0.2, 1)` | `--rd-ease-decelerate` |
| `easeAccelerate` | `cubic-bezier(0.4, 0, 1, 1)` | `--rd-ease-accelerate` |

---

## 5. Architectural Invariants

1. **One-Way Dependency**: Ripperdoc never imports MFE code or business logic.
2. **Strict Prefixing**: Every CSS variable defined by Ripperdoc begins with `--rd-`.
3. **Theme Independence**: Tokens establish the contract; themes map color palettes into this contract.

---

## 6. License

MIT © Ripperdoc Team
