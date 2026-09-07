import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from './Badge';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Whether to animate with a subtle pulsing attention loop (e.g. live, recording, critical alert).
   * @default false
   */
  pulse?: boolean;
  /**
   * Whether motion is enabled. Enabled by default; can be disabled per component or globally.
   * @default true
   */
  motion?: boolean;
  /** Label or inner element */
  children?: React.ReactNode;
}
