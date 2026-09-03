export declare const spacing: {
    readonly 1: '4px';
    readonly 2: '8px';
    readonly 3: '12px';
    readonly 4: '16px';
    readonly 5: '20px';
    readonly 6: '24px';
    readonly 8: '32px';
    readonly 10: '40px';
    readonly 12: '48px';
    readonly 16: '64px';
};
export type SpacingScale = keyof typeof spacing;
export declare const radii: {
    readonly sm: '4px';
    readonly default: '8px';
    readonly md: '12px';
    readonly lg: '16px';
    readonly xl: '24px';
    readonly full: '9999px';
};
export type RadiiScale = keyof typeof radii;
export declare const motion: {
    readonly fast: '150ms';
    readonly normal: '250ms';
    readonly slow: '400ms';
    readonly easeStandard: 'cubic-bezier(0.4, 0, 0.2, 1)';
    readonly easeDecelerate: 'cubic-bezier(0, 0, 0.2, 1)';
    readonly easeAccelerate: 'cubic-bezier(0.4, 0, 1, 1)';
};
export declare const typography: {
    readonly displayHero: {
        readonly size: '48px';
        readonly lineHeight: '56px';
        readonly weight: '700';
        readonly letterSpacing: '-0.03em';
    };
    readonly headlineXl: {
        readonly size: '40px';
        readonly lineHeight: '48px';
        readonly weight: '700';
        readonly letterSpacing: '-0.025em';
    };
    readonly headlineLg: {
        readonly size: '28px';
        readonly lineHeight: '36px';
        readonly weight: '700';
        readonly letterSpacing: '-0.02em';
    };
    readonly headlineMd: {
        readonly size: '22px';
        readonly lineHeight: '28px';
        readonly weight: '600';
        readonly letterSpacing: '-0.015em';
    };
    readonly headlineSm: {
        readonly size: '18px';
        readonly lineHeight: '24px';
        readonly weight: '600';
        readonly letterSpacing: '-0.01em';
    };
    readonly titleMd: {
        readonly size: '16px';
        readonly lineHeight: '22px';
        readonly weight: '600';
        readonly letterSpacing: '-0.005em';
    };
    readonly bodyLg: {
        readonly size: '18px';
        readonly lineHeight: '28px';
        readonly weight: '400';
        readonly letterSpacing: '0';
    };
    readonly bodyMd: {
        readonly size: '16px';
        readonly lineHeight: '24px';
        readonly weight: '400';
        readonly letterSpacing: '0';
    };
    readonly bodySm: {
        readonly size: '14px';
        readonly lineHeight: '20px';
        readonly weight: '400';
        readonly letterSpacing: '0';
    };
    readonly labelLg: {
        readonly size: '14px';
        readonly lineHeight: '18px';
        readonly weight: '600';
        readonly letterSpacing: '0.01em';
    };
    readonly labelMd: {
        readonly size: '12px';
        readonly lineHeight: '16px';
        readonly weight: '600';
        readonly letterSpacing: '0.02em';
    };
    readonly labelSm: {
        readonly size: '11px';
        readonly lineHeight: '14px';
        readonly weight: '700';
        readonly letterSpacing: '0.06em';
    };
};
export type TypographyRole = keyof typeof typography;
