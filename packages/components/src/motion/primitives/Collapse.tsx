import React, { forwardRef } from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';
import { collapse } from '../variants';
import { useMotionConfig } from '../MotionProvider';

export interface CollapseProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /**
   * Whether the collapsible content is open / expanded.
   */
  isOpen: boolean;
  /**
   * Whether to completely unmount contents when collapsed.
   * @default false
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

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (
    {
      isOpen,
      unmountOnExit = false,
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
      if (unmountOnExit && !isOpen) return null;
      return (
        <div
          ref={ref}
          style={{
            display: isOpen ? 'block' : 'none',
            overflow: 'hidden',
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
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              ref={ref}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={collapse}
              style={{ overflow: 'hidden', ...style }}
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
        animate={isOpen ? 'animate' : 'initial'}
        variants={collapse}
        style={{ overflow: 'hidden', ...style }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Collapse.displayName = 'Collapse';
