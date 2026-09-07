import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { motion } from 'motion/react';
import { cn } from '@ripperdoc-chrome77/utils';
import { useMotionConfig, useReducedMotion } from '../../motion';
import { pulse as pulseVariant } from '../../motion/variants';
import type { BadgeProps } from './Badge.types';

export const badgeVariants = cva('rd-badge inline-flex items-center font-medium tracking-wide', {
  variants: {
    variant: {
      default: 'rd-badge-default',
      primary: 'rd-badge-primary',
      success: 'rd-badge-success',
      warning: 'rd-badge-warning',
      error: 'rd-badge-error',
      neutral: 'rd-badge-neutral',
    },
    size: {
      sm: 'rd-badge-sm',
      md: 'rd-badge-md',
    },
    pill: {
      true: 'rounded-full',
      false: 'rounded-md',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    pill: false,
  },
});

const variantStyles: Record<string, React.CSSProperties> = {
  default: {
    backgroundColor: 'var(--rd-color-surface-container-high)',
    color: 'var(--rd-color-on-surface)',
    border: '1px solid var(--rd-color-outline-variant)',
  },
  primary: {
    backgroundColor: 'var(--rd-color-primary-container)',
    color: 'var(--rd-color-on-primary-container)',
    border: '1px solid transparent',
  },
  success: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    color: '#4ade80',
    border: '1px solid rgba(34, 197, 94, 0.3)',
  },
  warning: {
    backgroundColor: 'var(--rd-color-tertiary-container)',
    color: 'var(--rd-color-on-tertiary-container)',
    border: '1px solid transparent',
  },
  error: {
    backgroundColor: 'var(--rd-color-error-container)',
    color: 'var(--rd-color-on-error-container)',
    border: '1px solid transparent',
  },
  neutral: {
    backgroundColor: 'var(--rd-color-surface-container)',
    color: 'var(--rd-color-on-surface-variant)',
    border: '1px solid var(--rd-color-outline-variant)',
  },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: {
    fontSize: '11px',
    lineHeight: '14px',
    padding: '2px 8px',
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  md: {
    fontSize: '12px',
    lineHeight: '16px',
    padding: '4px 10px',
    fontWeight: 600,
    letterSpacing: '0.02em',
  },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      pill = false,
      pulse = false,
      motion: motionProp = true,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { disabled: globalMotionDisabled } = useMotionConfig();
    const isReduced = useReducedMotion();
    const isMotionActive = motionProp && !globalMotionDisabled && !isReduced;

    const baseStyles: React.CSSProperties = {
      fontFamily: 'var(--rd-font-sans)',
      borderRadius: pill ? 'var(--rd-radius-full)' : 'var(--rd-radius-sm)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--rd-space-1)',
      ...variantStyles[variant || 'default'],
      ...sizeStyles[size || 'md'],
      ...style,
    };

    if (pulse && isMotionActive) {
      return (
        <motion.span
          ref={ref}
          className={cn(badgeVariants({ variant, size, pill, className }))}
          style={baseStyles}
          variants={pulseVariant}
          initial="initial"
          animate="animate"
          {...(props as any)}
        >
          {children}
        </motion.span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, pill, className }))}
        style={baseStyles}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
