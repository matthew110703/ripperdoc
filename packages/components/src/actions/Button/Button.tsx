import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@ripperdoc-chrome77/utils';
import type { ButtonProps } from './Button.types';

export const buttonVariants = cva(
  'rd-button inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'rd-btn-primary',
        secondary: 'rd-btn-secondary',
        tertiary: 'rd-btn-tertiary',
        ghost: 'rd-btn-ghost',
        danger: 'rd-btn-danger',
      },
      size: {
        sm: 'rd-btn-sm',
        md: 'rd-btn-md',
        lg: 'rd-btn-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--rd-color-primary)',
    color: 'var(--rd-color-on-primary)',
    border: '1px solid transparent',
  },
  secondary: {
    backgroundColor: 'var(--rd-color-surface-container-high)',
    color: 'var(--rd-color-on-surface)',
    border: '1px solid var(--rd-color-outline-variant)',
  },
  tertiary: {
    backgroundColor: 'var(--rd-color-surface-container-low)',
    color: 'var(--rd-color-primary)',
    border: '1px solid transparent',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--rd-color-on-surface)',
    border: '1px solid transparent',
  },
  danger: {
    backgroundColor: 'var(--rd-color-error)',
    color: 'var(--rd-color-on-error)',
    border: '1px solid transparent',
  },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: {
    height: '32px',
    padding: '0 var(--rd-space-3)',
    fontSize: '12px',
    borderRadius: 'var(--rd-radius-default)',
    gap: 'var(--rd-space-2)',
  },
  md: {
    height: '40px',
    padding: '0 var(--rd-space-4)',
    fontSize: '14px',
    borderRadius: 'var(--rd-radius-default)',
    gap: 'var(--rd-space-2)',
  },
  lg: {
    height: '48px',
    padding: '0 var(--rd-space-6)',
    fontSize: '16px',
    borderRadius: 'var(--rd-radius-md)',
    gap: 'var(--rd-space-3)',
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      leadingIcon,
      trailingIcon,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        style={{
          fontFamily: 'var(--rd-font-sans)',
          fontWeight: 600,
          display: fullWidth ? 'flex' : 'inline-flex',
          width: fullWidth ? '100%' : 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all var(--rd-duration-fast) var(--rd-ease-standard)',
          ...variantStyles[variant || 'primary'],
          ...sizeStyles[size || 'md'],
          ...style,
        }}
        {...props}
      >
        {loading ? (
          <span
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: `2px solid currentColor`,
              borderRightColor: 'transparent',
              borderRadius: '50%',
              animation: 'rd-spin 0.6s linear infinite',
            }}
          />
        ) : (
          <>
            {leadingIcon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{leadingIcon}</span>}
            <span>{children}</span>
            {trailingIcon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{trailingIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
