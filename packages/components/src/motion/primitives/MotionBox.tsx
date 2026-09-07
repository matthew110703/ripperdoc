import React, { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { motionVariants, type MotionVariantName } from '../variants';
import { useMotionConfig } from '../MotionProvider';

export interface MotionBoxProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /**
   * Semantic motion variant preset name.
   */
  preset?: MotionVariantName;
  /**
   * Locally disable motion for this specific element.
   * @default false
   */
  disabled?: boolean;
  /**
   * Child content.
   */
  children?: React.ReactNode;
}

export const MotionBox = forwardRef<HTMLDivElement, MotionBoxProps>(
  ({ preset, disabled = false, initial, animate, exit, variants, style, children, ...props }, ref) => {
    const { disabled: globalDisabled } = useMotionConfig();
    const isEffectivelyDisabled = disabled || globalDisabled;

    const activeVariants = preset ? motionVariants[preset] : variants;

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
        initial={initial ?? (activeVariants ? 'initial' : undefined)}
        animate={animate ?? (activeVariants ? 'animate' : undefined)}
        exit={exit ?? (activeVariants ? 'exit' : undefined)}
        variants={activeVariants}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionBox.displayName = 'MotionBox';
