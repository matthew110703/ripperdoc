import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from './Button';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Whether the button is in an active loading state */
  loading?: boolean;
  /** Optional icon rendered before label */
  leadingIcon?: React.ReactNode;
  /** Optional icon rendered after label */
  trailingIcon?: React.ReactNode;
  /** Button content */
  children?: React.ReactNode;
}
