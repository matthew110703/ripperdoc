import React, { forwardRef } from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';
import { slideUp, slideDown, slideLeft, slideRight } from '../variants';
import { useMotionConfig } from '../MotionProvider';

export type SlideDirection = 'up' | 'down' | 'left' | 'right';

const slideDirectionMap = {
  up: slideUp,
  down: slideDown,
  left: slideLeft,
  right: slideRight,
};

export interface SlideProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /**
   * Controls whether the element is visible.
   * @default true
   */
  in?: boolean;
  /**
   * Slide movement direction.
   * @default 'up'
   */
  direction?: SlideDirection;
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

export const Slide = forwardRef<HTMLDivElement, SlideProps>(
  (
    {
      in: isVisible = true,
      direction = 'up',
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
    const variants = slideDirectionMap[direction] || slideUp;

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
              variants={variants}
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
        variants={variants}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Slide.displayName = 'Slide';
