import React, { forwardRef } from 'react';
import { motion } from 'motion/react';
import { springs } from '@ripperdoc-chrome77/tokens';
import { cn } from '@ripperdoc-chrome77/utils';
import { useMotionConfig, useReducedMotion } from '../../motion';
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from './Card.types';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      elevation = 1,
      glass = false,
      interactive = false,
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
      backgroundColor: glass ? 'var(--rd-glass-surface)' : `var(--rd-elevation-${elevation})`,
      backdropFilter: glass ? 'blur(var(--rd-glass-blur))' : 'none',
      WebkitBackdropFilter: glass ? 'blur(var(--rd-glass-blur))' : 'none',
      border: glass ? '1px solid var(--rd-glass-border)' : 'var(--rd-border-level-1)',
      borderRadius: 'var(--rd-radius-lg)',
      boxShadow: elevation === 2 ? 'var(--rd-shadow-level-2)' : 'none',
      boxSizing: 'border-box',
      overflow: 'hidden',
      cursor: interactive ? 'pointer' : undefined,
      transition: isMotionActive
        ? 'background-color var(--rd-duration-fast) var(--rd-ease-standard), border-color var(--rd-duration-fast) var(--rd-ease-standard), box-shadow var(--rd-duration-fast) var(--rd-ease-standard)'
        : 'all var(--rd-duration-fast) var(--rd-ease-standard)',
      ...style,
    };

    if (interactive && isMotionActive) {
      return (
        <motion.div
          ref={ref}
          className={cn('rd-card', className)}
          style={baseStyles}
          whileHover={{
            y: -4,
            boxShadow: 'var(--rd-shadow-level-2, 0 8px 24px rgba(0,0,0,0.3))',
          }}
          transition={springs.snappy}
          {...(props as any)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('rd-card', className)}
        style={baseStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rd-card-header', className)}
      style={{
        padding: 'var(--rd-space-5) var(--rd-space-6) var(--rd-space-3) var(--rd-space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--rd-space-1)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, style, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('rd-card-title', className)}
      style={{
        margin: 0,
        fontSize: '18px',
        lineHeight: '24px',
        fontWeight: 600,
        fontFamily: 'var(--rd-font-sans)',
        color: 'var(--rd-color-on-surface)',
        letterSpacing: '-0.01em',
        ...style,
      }}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, style, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('rd-card-description', className)}
      style={{
        margin: 0,
        fontSize: '14px',
        lineHeight: '20px',
        color: 'var(--rd-color-on-surface-variant)',
        fontFamily: 'var(--rd-font-sans)',
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rd-card-content', className)}
      style={{
        padding: 'var(--rd-space-4) var(--rd-space-6)',
        color: 'var(--rd-color-on-surface)',
        fontFamily: 'var(--rd-font-sans)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rd-card-footer', className)}
      style={{
        padding: 'var(--rd-space-3) var(--rd-space-6) var(--rd-space-5) var(--rd-space-6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 'var(--rd-space-3)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';
