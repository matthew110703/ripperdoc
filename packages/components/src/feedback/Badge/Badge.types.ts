import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from './Badge';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Label or inner element */
  children?: React.ReactNode;
}
