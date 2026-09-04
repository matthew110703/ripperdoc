# @ripperdoc-chrome77/themes

> Theme specifications (**Obsidian** & **Luminous**), CSS variable mappings, and dynamic `<ThemeProvider>` for the **Ripperdoc** multi-MFE design system platform.

[![npm version](https://img.shields.io/npm/v/@ripperdoc-chrome77/themes.svg?color=blue)](https://www.npmjs.com/package/@ripperdoc-chrome77/themes)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 1. Overview

`@ripperdoc-chrome77/themes` contains the official visual themes for the Ripperdoc platform:

1. **Obsidian Theme** (Dark Cinematic Minimalism):
   - Canvas background: `#131313` (`--rd-color-surface-dim`)
   - Primary Accent: Electric Ice Blue `#B0C6FF` (`--rd-color-primary`)
   - Surface elevation layers with glowing neon borders (`rgba(176, 198, 255, 0.15)`).
   - Applied via attribute: `[data-theme="obsidian"]`.

2. **Luminous Theme** (Light Editorial Minimalism):
   - Canvas background: `#F8F9FF` (`--rd-color-surface-dim`)
   - Primary Accent: Deep Cobalt Blue `#004AC6` (`--rd-color-primary`)
   - Multi-layered soft box shadows (`rgba(15, 23, 42, 0.08)`).
   - Applied via attribute: `[data-theme="luminous"]`.

---

## 2. Installation

```bash
# Using pnpm (recommended)
pnpm add @ripperdoc-chrome77/themes @ripperdoc-chrome77/tokens

# Using npm
npm install @ripperdoc-chrome77/themes @ripperdoc-chrome77/tokens

# Using yarn
yarn add @ripperdoc-chrome77/themes @ripperdoc-chrome77/tokens
```

---

## 3. Usage

### A. Importing Theme Stylesheets

Import the theme CSS files along with the base tokens in your application entry point:

```ts
// In your global layout or _app.tsx
import '@ripperdoc-chrome77/tokens/foundations.css';
import '@ripperdoc-chrome77/themes/obsidian.css';
import '@ripperdoc-chrome77/themes/luminous.css';
```

### B. React `<ThemeProvider>` Setup

Wrap your application or micro-frontend subtree with `<ThemeProvider>`:

```tsx
import React from 'react';
import { ThemeProvider } from '@ripperdoc-chrome77/themes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="obsidian" storageKey="app-theme" applyToRoot>
      {children}
    </ThemeProvider>
  );
}
```

#### `ThemeProvider` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `React.ReactNode` | *(required)* | Application elements wrapped by the theme context. |
| `defaultTheme` | `'obsidian' \| 'luminous'` | `'obsidian'` | Default fallback theme if no persisted choice is found. |
| `storageKey` | `string` | `'rd-theme'` | `localStorage` key used to persist user theme choice. |
| `applyToRoot` | `boolean` | `true` | When true, synchronizes `data-theme` on `document.documentElement`. |

### C. Using the `useTheme()` Hook

Consume and toggle themes dynamically anywhere inside `<ThemeProvider>`:

```tsx
import React from 'react';
import { useTheme } from '@ripperdoc-chrome77/themes';

export function ThemeSwitcher() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme} (Click to toggle)
    </button>
  );
}
```

---

## 4. Semantic Color Variables

Both themes configure the standard Ripperdoc semantic color tokens:

| Token Name | Description |
| :--- | :--- |
| `--rd-color-surface` | Default background surface |
| `--rd-color-surface-dim` | Recessed canvas / page background |
| `--rd-color-surface-bright` | High-visibility container surface |
| `--rd-color-surface-container-low` | Subtle container background |
| `--rd-color-surface-container-high` | Elevated container background |
| `--rd-color-primary` | Main brand action and highlight color |
| `--rd-color-primary-container` | Filled container background for primary elements |
| `--rd-color-secondary` | Supporting secondary UI role |
| `--rd-color-tertiary` | Accent / highlight role |
| `--rd-color-on-surface` | High-contrast text on surfaces |
| `--rd-color-on-surface-variant` | Muted secondary text |
| `--rd-color-outline` | Border and structural divider stroke |
| `--rd-color-outline-variant` | Subtle card borders |

---

## 5. Architectural Invariants

- **Themes are Configuration, Not Code**: Never create theme-forked components (e.g. do not create `ObsidianButton` vs `LuminousButton`). Components always consume generic `--rd-*` tokens.
- **Nested Themes Supported**: You can scope a theme to a specific section of the page by setting `data-theme="obsidian"` or `data-theme="luminous"` on any container element.

---

## 6. License

MIT © Ripperdoc Team
