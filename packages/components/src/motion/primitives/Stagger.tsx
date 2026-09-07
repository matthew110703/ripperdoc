import React, { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { createStaggerContainer, staggerItem as defaultStaggerItem } from '../variants';
import { useMotionConfig } from '../MotionProvider';

export interface StaggerProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /**
   * Delay in seconds between each child animating in.
   * @default 0.05
   */
  staggerDelay?: number;
  /**
   * Initial delay before the first child starts.
   * @default 0.02
   */
  delayChildren?: number;
  /**
   * Locally disable animation.
   */
  disabled?: boolean;
  /**
   * Child content.
   */
  children?: React.ReactNode;
}

export const Stagger = forwardRef<HTMLDivElement, StaggerProps>(
  (
    {
      staggerDelay = 0.05,
      delayChildren = 0.02,
      disabled = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const { disabled: globalDisabled } = useMotionConfig();
    const isEffectivelyDisabled = disabled || globalDisabled;
    const containerVariants = createStaggerContainer(staggerDelay, delayChildren);

    if (isEffectivelyDisabled) {
      return (
        <div
          ref={ref}
          style={style as React.CSSProperties}
          {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={containerVariants}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Stagger.displayName = 'Stagger';

export interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  disabled?: boolean;
  children?: React.ReactNode;
}

export const StaggerItem = forwardRef<HTMLDivElement, StaggerItemProps>(
  ({ variants = defaultStaggerItem, disabled = false, children, style, ...props }, ref) => {
    const { disabled: globalDisabled } = useMotionConfig();
    const isEffectivelyDisabled = disabled || globalDisabled;

    if (isEffectivelyDisabled) {
      return (
        <div
          ref={ref}
          style={style as React.CSSProperties}
          {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      );
    }

    return (
      <motion.div ref={ref} variants={variants} style={style} {...props}>
        {children}
      </motion.div>
    );
  }
);

StaggerItem.displayName = 'StaggerItem';
