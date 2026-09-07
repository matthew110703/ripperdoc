import React, { forwardRef, useEffect, useState } from 'react';
import { motion, useAnimationControls, type HTMLMotionProps } from 'motion/react';
import { shake, bounce, pulseOnce, wiggle } from '../variants';
import { useMotionConfig } from '../MotionProvider';

export type AttentionVariant = 'shake' | 'bounce' | 'pulse' | 'wiggle';

const attentionVariantMap = {
  shake,
  bounce,
  pulse: pulseOnce,
  wiggle,
};

export interface AttentionProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /**
   * Attention seeker motion variant.
   * @default 'shake'
   */
  variant?: AttentionVariant;
  /**
   * Value whose change triggers the animation.
   * (e.g. error count, submit attempt, notification)
   */
  trigger?: any;
  /**
   * Whether to animate immediately on mount.
   * @default false
   */
  animateOnMount?: boolean;
  /**
   * Locally disable animation.
   */
  disabled?: boolean;
  /**
   * Child content.
   */
  children?: React.ReactNode;
}

export const Attention = forwardRef<HTMLDivElement, AttentionProps>(
  (
    {
      variant = 'shake',
      trigger,
      animateOnMount = false,
      disabled = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const { disabled: globalDisabled } = useMotionConfig();
    const isEffectivelyDisabled = disabled || globalDisabled;
    const controls = useAnimationControls();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      if (isEffectivelyDisabled) return;

      if (!hasMounted) {
        setHasMounted(true);
        if (animateOnMount) {
          controls.start('animate');
        }
        return;
      }

      controls.start('animate');
    }, [trigger, isEffectivelyDisabled, hasMounted, animateOnMount, controls]);

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

    const activeVariants = attentionVariantMap[variant] || shake;

    return (
      <motion.div
        ref={ref}
        initial="initial"
        animate={controls}
        variants={activeVariants}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Attention.displayName = 'Attention';
