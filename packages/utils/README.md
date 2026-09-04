# @ripperdoc-chrome77/utils

> Lightweight UI utilities and className composition helpers for the **Ripperdoc** multi-MFE design system platform.

[![npm version](https://img.shields.io/npm/v/@ripperdoc-chrome77/utils.svg?color=blue)](https://www.npmjs.com/package/@ripperdoc-chrome77/utils)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 1. Overview

`@ripperdoc-chrome77/utils` delivers lightweight, cross-application UI utilities shared across Ripperdoc primitives, components, and consuming micro-frontends.

### Key Features
- **Intelligent Class Name Merging**: Combines `clsx` and `tailwind-merge` to resolve conditional class names and conflict-free Tailwind/custom utility classes.
- **Zero Configuration**: Ready to import and use with TypeScript types out of the box.

---

## 2. Installation

```bash
# Using pnpm (recommended)
pnpm add @ripperdoc-chrome77/utils

# Using npm
npm install @ripperdoc-chrome77/utils

# Using yarn
yarn add @ripperdoc-chrome77/utils
```

---

## 3. Usage

### The `cn` Utility

Use `cn` to merge multiple class expressions conditionally and resolve conflicting styles:

```tsx
import React from 'react';
import { cn } from '@ripperdoc-chrome77/utils';

interface CardProps {
  isActive?: boolean;
  variant?: 'flat' | 'raised';
  className?: string;
  children: React.ReactNode;
}

export function Card({ isActive, variant = 'flat', className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-4 transition-all',
        variant === 'flat' && 'bg-surface border border-outline',
        variant === 'raised' && 'bg-surface shadow-md',
        isActive && 'ring-2 ring-primary',
        className
      )}
    >
      {children}
    </div>
  );
}
```

---

## 4. Architectural Invariants

- **Generic Utility Only**: This package contains only domain-agnostic UI helpers. No component logic or state management belongs here.
- **Dependency Isolation**: Does not depend on any specific theme or MFE domain code.

---

## 5. License

MIT © Ripperdoc Team
