import React, { forwardRef } from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';
import { scale } from '../variants';
import { useMotionConfig } from '../MotionProvider';

export interface ScaleProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /**
   * Controls whether the element is visible.
   * @default true
   */
  in?: boolean;
  /**
   * Whether to unmount child when invisible.
   * @default true
   */
  unmountOnExit?: boolean;
  /**
   * Locally disable animation.
   */
  disabled?: boolean;
  /**
   * Child content.
   */
  children?: React.ReactNode;
}

export const Scale = forwardRef<HTMLDivElement, ScaleProps>(
  (
    {
      in: isVisible = true,
      unmountOnExit = true,
      disabled = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const { disabled: globalDisabled } = useMotionConfig();
    const isEffectivelyDisabled = disabled || globalDisabled;

    if (isEffectivelyDisabled) {
      if (unmountOnExit && !isVisible) return null;
      return (
        <div
          ref={ref}
          style={{
            display: isVisible ? undefined : 'none',
            ...((style as React.CSSProperties) || {}),
          }}
          {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      );
    }

    if (unmountOnExit) {
      return (
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              ref={ref}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={scale}
              style={style}
              {...props}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={false}
        animate={isVisible ? 'animate' : 'initial'}
        variants={scale}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Scale.displayName = 'Scale';
