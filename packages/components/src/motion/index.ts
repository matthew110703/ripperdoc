// Motion Provider & Config
export * from './MotionProvider';

// Motion Variants & Presets
export * from './variants';

// Declarative Motion Primitives
export * from './primitives/MotionBox';
export * from './primitives/Fade';
export * from './primitives/Slide';
export * from './primitives/Scale';
export * from './primitives/Collapse';
export * from './primitives/Stagger';
export * from './primitives/Attention';

// Re-export core motion/react utilities for direct consumer access
export {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useAnimation,
  useAnimationControls,
  useDragControls,
} from 'motion/react';

export type {
  Transition,
  Variants,
  MotionProps,
  HTMLMotionProps,
  TargetAndTransition,
  PanInfo,
} from 'motion/react';
