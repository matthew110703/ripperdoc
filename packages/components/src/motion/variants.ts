import type { Variants, Transition } from 'motion/react';
import { motionTokens } from '@ripperdoc-chrome77/tokens';

const { durations, easings, springs, transitions } = motionTokens;

/* =========================================================================
   1. FADE VARIANTS
   ========================================================================= */

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitions.normal },
  exit: { opacity: 0, transition: transitions.fast },
};

export const fadeOut: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: transitions.fast },
};

export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitions.normal },
  exit: { opacity: 0, transition: transitions.fast },
};

/* =========================================================================
   2. FADE + SCALE VARIANTS
   ========================================================================= */

export const fadeScale: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: springs.snappy },
  exit: { opacity: 0, scale: 0.95, transition: transitions.fast },
};

export const fadeScaleIn: Variants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1, transition: springs.gentle },
};

export const fadeScaleOut: Variants = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 0, scale: 0.92, transition: transitions.fast },
};

/* =========================================================================
   3. FADE + SLIDE VARIANTS
   ========================================================================= */

export const fadeSlideUp: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: transitions.normal },
  exit: { opacity: 0, y: 16, transition: transitions.fast },
};

export const fadeSlideDown: Variants = {
  initial: { opacity: 0, y: -16 },
  animate: { opacity: 1, y: 0, transition: transitions.normal },
  exit: { opacity: 0, y: -16, transition: transitions.fast },
};

export const fadeSlideLeft: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: transitions.normal },
  exit: { opacity: 0, x: 20, transition: transitions.fast },
};

export const fadeSlideRight: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: transitions.normal },
  exit: { opacity: 0, x: -20, transition: transitions.fast },
};

/* =========================================================================
   4. SCALE VARIANTS
   ========================================================================= */

export const scale: Variants = {
  initial: { scale: 0.85, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: springs.snappy },
  exit: { scale: 0.85, opacity: 0, transition: transitions.fast },
};

export const scaleIn: Variants = {
  initial: { scale: 0 },
  animate: { scale: 1, transition: springs.bouncy },
};

export const scaleOut: Variants = {
  initial: { scale: 1 },
  animate: { scale: 0, transition: transitions.fast },
};

/* =========================================================================
   5. SLIDE VARIANTS (Full displacement for sheets, drawers, toasts)
   ========================================================================= */

export const slideUp: Variants = {
  initial: { y: '100%' },
  animate: { y: 0, transition: springs.snappy },
  exit: { y: '100%', transition: transitions.fast },
};

export const slideDown: Variants = {
  initial: { y: '-100%' },
  animate: { y: 0, transition: springs.snappy },
  exit: { y: '-100%', transition: transitions.fast },
};

export const slideLeft: Variants = {
  initial: { x: '100%' },
  animate: { x: 0, transition: springs.snappy },
  exit: { x: '100%', transition: transitions.fast },
};

export const slideRight: Variants = {
  initial: { x: '-100%' },
  animate: { x: 0, transition: springs.snappy },
  exit: { x: '-100%', transition: transitions.fast },
};

/* =========================================================================
   6. EXPAND / COLLAPSE (Height accordion animation)
   ========================================================================= */

export const collapse: Variants = {
  initial: { height: 0, opacity: 0, overflow: 'hidden' },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: durations.normal, ease: easings.standard },
      opacity: { duration: durations.fast, delay: 0.05 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: { duration: durations.fast },
      height: { duration: durations.normal, ease: easings.accelerate },
    },
  },
};

export const expandCollapse = collapse;

/* =========================================================================
   7. BLUR IN / OUT
   ========================================================================= */

export const blur: Variants = {
  initial: { filter: 'blur(12px)', opacity: 0 },
  animate: { filter: 'blur(0px)', opacity: 1, transition: transitions.normal },
  exit: { filter: 'blur(12px)', opacity: 0, transition: transitions.fast },
};

export const blurIn: Variants = {
  initial: { filter: 'blur(12px)', opacity: 0 },
  animate: { filter: 'blur(0px)', opacity: 1, transition: transitions.normal },
};

export const blurOut: Variants = {
  initial: { filter: 'blur(0px)', opacity: 1 },
  animate: { filter: 'blur(12px)', opacity: 0, transition: transitions.fast },
};

/* =========================================================================
   8. ROTATE IN / OUT
   ========================================================================= */

export const rotate: Variants = {
  initial: { rotate: -180, scale: 0.75, opacity: 0 },
  animate: { rotate: 0, scale: 1, opacity: 1, transition: springs.snappy },
  exit: { rotate: 180, scale: 0.75, opacity: 0, transition: transitions.fast },
};

export const rotateIn: Variants = {
  initial: { rotate: -90, opacity: 0 },
  animate: { rotate: 0, opacity: 1, transition: springs.gentle },
};

export const rotateOut: Variants = {
  initial: { rotate: 0, opacity: 1 },
  animate: { rotate: 90, opacity: 0, transition: transitions.fast },
};

/* =========================================================================
   9. STAGGER CHILDREN
   ========================================================================= */

export const createStaggerContainer = (
  staggerChildren = 0.05,
  delayChildren = 0.02
): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
});

export const staggerContainer = createStaggerContainer();

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: springs.snappy },
  exit: { opacity: 0, y: -8, transition: transitions.fast },
};

/* =========================================================================
   10. GESTURES & INTERACTION (Hover, Tap, Focus)
   ========================================================================= */

export const hoverLift = {
  y: -2,
  transition: springs.snappy,
};

export const hoverScale = {
  scale: 1.02,
  transition: springs.snappy,
};

export const hoverGlow = {
  boxShadow: '0 0 16px var(--rd-color-primary, #60a5fa)',
  transition: transitions.fast,
};

export const tapScale = {
  scale: 0.97,
  transition: springs.snappy,
};

export const tapSink = {
  y: 1,
  scale: 0.98,
  transition: springs.snappy,
};

export const focusRing = {
  outline: '2px solid var(--rd-color-primary, #60a5fa)',
  outlineOffset: '2px',
  scale: 1.01,
  transition: transitions.fast,
};

/* =========================================================================
   11. ATTENTION SEEKERS (Shake, Bounce, Pulse, Wiggle)
   ========================================================================= */

export const shake: Variants = {
  initial: { x: 0 },
  animate: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: {
      duration: durations.slow,
      ease: easings.standard,
    },
  },
};

export const bounce: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -14, 0, -7, 0, -2, 0],
    transition: {
      duration: 0.5,
      ease: easings.standard,
    },
  },
};

export const pulse: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.06, 1],
    opacity: [1, 0.85, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: easings.standard,
    },
  },
};

export const pulseOnce: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.08, 1],
    transition: {
      duration: durations.slow,
      ease: easings.standard,
    },
  },
};

export const wiggle: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [0, -7, 7, -5, 5, -2, 2, 0],
    transition: {
      duration: durations.slow,
      ease: easings.standard,
    },
  },
};

/* =========================================================================
   12. MOTION PRESETS REGISTRY
   ========================================================================= */

export const motionVariants = {
  fadeIn,
  fadeOut,
  fade,
  fadeScale,
  fadeScaleIn,
  fadeScaleOut,
  fadeSlideUp,
  fadeSlideDown,
  fadeSlideLeft,
  fadeSlideRight,
  scale,
  scaleIn,
  scaleOut,
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  collapse,
  expandCollapse,
  blur,
  blurIn,
  blurOut,
  rotate,
  rotateIn,
  rotateOut,
  staggerContainer,
  staggerItem,
  shake,
  bounce,
  pulse,
  pulseOnce,
  wiggle,
} as const;

export type MotionVariantName = keyof typeof motionVariants;
