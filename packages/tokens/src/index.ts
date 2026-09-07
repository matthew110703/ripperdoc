export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const;

export type SpacingScale = keyof typeof spacing;

export const radii = {
  sm: '4px',
  default: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

export type RadiiScale = keyof typeof radii;

export const cssMotion = {
  fast: '150ms',
  normal: '250ms',
  slow: '400ms',
  easeStandard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeDecelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  easeAccelerate: 'cubic-bezier(0.4, 0, 1, 1)',
} as const;

export * from './motion';

export const typography = {
  displayHero: { size: '48px', lineHeight: '56px', weight: '700', letterSpacing: '-0.03em' },
  headlineXl: { size: '40px', lineHeight: '48px', weight: '700', letterSpacing: '-0.025em' },
  headlineLg: { size: '28px', lineHeight: '36px', weight: '700', letterSpacing: '-0.02em' },
  headlineMd: { size: '22px', lineHeight: '28px', weight: '600', letterSpacing: '-0.015em' },
  headlineSm: { size: '18px', lineHeight: '24px', weight: '600', letterSpacing: '-0.01em' },
  titleMd: { size: '16px', lineHeight: '22px', weight: '600', letterSpacing: '-0.005em' },
  bodyLg: { size: '18px', lineHeight: '28px', weight: '400', letterSpacing: '0' },
  bodyMd: { size: '16px', lineHeight: '24px', weight: '400', letterSpacing: '0' },
  bodySm: { size: '14px', lineHeight: '20px', weight: '400', letterSpacing: '0' },
  labelLg: { size: '14px', lineHeight: '18px', weight: '600', letterSpacing: '0.01em' },
  labelMd: { size: '12px', lineHeight: '16px', weight: '600', letterSpacing: '0.02em' },
  labelSm: { size: '11px', lineHeight: '14px', weight: '700', letterSpacing: '0.06em' },
} as const;

export type TypographyRole = keyof typeof typography;
