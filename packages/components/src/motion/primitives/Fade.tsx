import React, { forwardRef } from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';
import {
  fade,
  fadeScale,
  fadeSlideUp,
  fadeSlideDown,
  fadeSlideLeft,
  fadeSlideRight,
  blur,
} from '../variants';
import { useMotionConfig } from '../MotionProvider';

export type FadePreset =
  | 'fade'
  | 'fadeScale'
  | 'fadeSlideUp'
  | 'fadeSlideDown'
  | 'fadeSlideLeft'
  | 'fadeSlideRight'
  | 'blur';

const fadePresetMap = {
  fade,
  fadeScale,
  fadeSlideUp,
  fadeSlideDown,
  fadeSlideLeft,
  fadeSlideRight,
  blur,
};

export interface FadeProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /**
   * Controls whether the element is visible.
   * @default true
   */
  in?: boolean;
  /**
   * Sub-variant for the fade animation.
   * @default 'fade'
   */
  preset?: FadePreset;
  /**
   * Whether to unmount child from DOM when invisible.
   * @default true
   */
  unmountOnExit?: boolean;
  /**
   * Locally disable animation for this component.
   */
  disabled?: boolean;
  /**
   * Child content.
   */
  children?: React.ReactNode;
}

export const Fade = forwardRef<HTMLDivElement, FadeProps>(
  (
    {
      in: isVisible = true,
      preset = 'fade',
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
    const variants = fadePresetMap[preset] || fade;

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

Fade.displayName = 'Fade';
