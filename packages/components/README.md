# @ripperdoc-chrome77/components

> Accessible, generic UI components and layout primitives for the **Ripperdoc** multi-MFE design system platform.

[![npm version](https://img.shields.io/npm/v/@ripperdoc-chrome77/components.svg?color=blue)](https://www.npmjs.com/package/@ripperdoc-chrome77/components)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 1. Overview

`@ripperdoc-chrome77/components` provides domain-agnostic, theme-resilient UI components built for modern React and Next.js applications. All components consume standard Ripperdoc design tokens via CSS custom properties (`--rd-*`), ensuring they automatically adapt to any active theme (**Obsidian** or **Luminous**) without code changes or component forking.

---

## 2. Installation

```bash
# Using pnpm (recommended)
pnpm add @ripperdoc-chrome77/components @ripperdoc-chrome77/tokens @ripperdoc-chrome77/themes

# Using npm
npm install @ripperdoc-chrome77/components @ripperdoc-chrome77/tokens @ripperdoc-chrome77/themes

# Using yarn
yarn add @ripperdoc-chrome77/components @ripperdoc-chrome77/tokens @ripperdoc-chrome77/themes
```

### Peer Dependencies
- `react`: `^18.0.0 || ^19.0.0`
- `react-dom`: `^18.0.0 || ^19.0.0`

---

## 3. Setup

Import the foundation styles and theme stylesheets in your application entry point:

```tsx
// In layout.tsx or _app.tsx
import '@ripperdoc-chrome77/tokens/foundations.css';
import '@ripperdoc-chrome77/themes/obsidian.css';
import '@ripperdoc-chrome77/themes/luminous.css';
import { ThemeProvider } from '@ripperdoc-chrome77/themes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="obsidian">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 4. Component Catalog

### Layout Primitives

| Component | Description | Key Props |
| :--- | :--- | :--- |
| **`Box`** | Fundamental polymorphic layout container. | `as`, `padding`, `margin`, `bg`, `radius`, `border` |
| **`Stack`** | Vertical flex column with uniform spacing tokens. | `gap`, `align`, `justify`, `dividers` |
| **`Inline`** | Horizontal flex row with optional wrapping and gap tokens. | `gap`, `align`, `justify`, `wrap` |
| **`Container`** | Centered layout container with max-width constraints. | `maxWidth` (`sm`, `md`, `lg`, `xl`, `full`), `gutter` |

### Actions

| Component | Description | Key Props |
| :--- | :--- | :--- |
| **`Button`** | Accessible button with states, variants, and spinner. | `variant` (`primary`, `secondary`, `outline`, `ghost`, `danger`), `size` (`sm`, `md`, `lg`), `isLoading`, `leftIcon`, `rightIcon` |

### Feedback

| Component | Description | Key Props |
| :--- | :--- | :--- |
| **`Badge`** | Status, notification count, and tag indicator. | `variant` (`neutral`, `primary`, `success`, `warning`, `danger`), `size` (`sm`, `md`), `dot` |

### Surfaces

| Component | Description | Key Props |
| :--- | :--- | :--- |
| **`Card`** | Surface container with elevation levels and slots. | `variant` (`flat`, `raised`, `overlay`, `interactive`), `header`, `footer`, `padding` |

---

## 5. Examples

### Dashboard Card with Primitives & Actions

```tsx
import React from 'react';
import { Card, Stack, Inline, Badge, Button } from '@ripperdoc-chrome77/components';

export function DeploymentStatusCard() {
  return (
    <Card
      variant="raised"
      header={
        <Inline justify="space-between" align="center">
          <span style={{ fontWeight: 600 }}>Production Cluster</span>
          <Badge variant="success" dot>Operational</Badge>
        </Inline>
      }
      footer={
        <Inline justify="flex-end" gap={2}>
          <Button variant="outline" size="sm">View Logs</Button>
          <Button variant="primary" size="sm">Deploy Update</Button>
        </Inline>
      }
    >
      <Stack gap={2}>
        <p style={{ margin: 0, color: 'var(--rd-color-on-surface-variant)' }}>
          Last sync verified 2 minutes ago with 99.98% uptime across all edge nodes.
        </p>
      </Stack>
    </Card>
  );
}
```

---

## 6. Architectural Invariants

1. **Strict One-Way Dependency**: Components import tokens, themes, and utils. They never import from micro-frontends or domain applications.
2. **Domain Agnosticism**: Contains only generic UI primitives and components. Domain components (`ProductCard`, `UserProfileView`, etc.) belong in their respective MFEs.
3. **No Theme Forking**: Never fork components per theme (e.g. no `ObsidianButton`). All components consume standard tokens like `var(--rd-color-primary)`.

---

## 7. License

MIT © Ripperdoc Team
