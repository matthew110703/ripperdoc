/**
 * Ripperdoc Motion Tokens
 * Centralized durations, easing curves, spring physics, and transitions.
 * Consumed by both CSS custom properties and JavaScript motion libraries.
 */

export const durations = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  fastMs: '150ms',
  normalMs: '250ms',
  slowMs: '400ms',
} as const;

export type DurationKey = 'fast' | 'normal' | 'slow';

export const easings = {
  // Cubic-bezier array representation (for Motion/Framer Motion)
  standard: [0.4, 0, 0.2, 1] as const,
  decelerate: [0, 0, 0.2, 1] as const,
  accelerate: [0.4, 0, 1, 1] as const,
  emphasized: [0.2, 0, 0, 1] as const,

  // CSS cubic-bezier strings
  standardCss: 'cubic-bezier(0.4, 0, 0.2, 1)',
  decelerateCss: 'cubic-bezier(0, 0, 0.2, 1)',
  accelerateCss: 'cubic-bezier(0.4, 0, 1, 1)',
  emphasizedCss: 'cubic-bezier(0.2, 0, 0, 1)',
} as const;

export type EasingKey = 'standard' | 'decelerate' | 'accelerate' | 'emphasized';

export const springs = {
  // Snappy: Ideal for standard interactive elements (buttons, chips, toggles)
  snappy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },
  // Gentle: Ideal for modals, dialogs, drawers, and large surfaces
  gentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
  },
  // Bouncy: Playful feedback for badges, toasts, and attention states
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 15,
    mass: 1,
  },
  // Stiff: Instantaneous response with minimal travel
  stiff: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  },
} as const;

export type SpringKey = keyof typeof springs;

export const transitions = {
  fast: { duration: durations.fast, ease: easings.decelerate },
  normal: { duration: durations.normal, ease: easings.standard },
  slow: { duration: durations.slow, ease: easings.standard },
  spring: springs.snappy,
  springGentle: springs.gentle,
  springBouncy: springs.bouncy,
  springStiff: springs.stiff,
  easeIn: { duration: durations.normal, ease: easings.accelerate },
  easeOut: { duration: durations.normal, ease: easings.decelerate },
  easeInOut: { duration: durations.normal, ease: easings.standard },
  reduced: { duration: 0 },
} as const;

export type TransitionKey = keyof typeof transitions;

export const motionTokens = {
  durations,
  easings,
  springs,
  transitions,
} as const;
