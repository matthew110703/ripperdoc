import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface TypeRowProps {
  role: string;
  specs: string;
  example: string;
  className?: string;
  style?: React.CSSProperties;
}

const TypeRow: React.FC<TypeRowProps> = ({ role, specs, example, className, style }) => (
  <div
    style={{
      padding: '1.25rem 0',
      borderBottom: '1px solid var(--rd-color-outline-variant)',
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: '2rem',
      alignItems: 'baseline',
    }}
  >
    <div>
      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--rd-color-primary)' }}>{role}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--rd-color-on-surface-variant)', fontFamily: 'var(--rd-font-mono)' }}>
        {specs}
      </div>
    </div>
    <div className={className} style={{ color: 'var(--rd-color-on-surface)', ...style }}>
      {example}
    </div>
  </div>
);

export const InterTypeScale: Story = {
  render: () => (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.75rem', color: 'var(--rd-color-on-surface)' }}>
          Inter Typography Scale
        </h2>
        <p style={{ margin: 0, color: 'var(--rd-color-on-surface-variant)', fontSize: '0.875rem' }}>
          Inter Sans is the primary typeface across both Obsidian and Luminous themes, utilizing tight tracking on display headlines and optical clarity for metadata.
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <TypeRow
          role="Display Hero"
          specs="48px / 56px · Bold · -0.03em"
          example="Immersive Storytelling Engine"
          className="rd-display-hero"
        />
        <TypeRow
          role="Headline XL"
          specs="40px / 48px · Bold · -0.025em"
          example="Architectural & Cinematic Precision"
          className="rd-headline-xl"
        />
        <TypeRow
          role="Headline LG"
          specs="28px / 36px · Bold · -0.02em"
          example="Curated Design System Foundations"
          className="rd-headline-lg"
        />
        <TypeRow
          role="Headline MD"
          specs="22px / 28px · Semibold · -0.015em"
          example="Multi-MFE Component Architecture"
          className="rd-headline-md"
        />
        <TypeRow
          role="Headline SM"
          specs="18px / 24px · Semibold · -0.01em"
          example="Unified Token and Theme Contracts"
          className="rd-headline-sm"
        />
        <TypeRow
          role="Title MD"
          specs="16px / 22px · Semibold · -0.005em"
          example="Interactive Controls & Navigation Headers"
          className="rd-title-md"
        />
        <TypeRow
          role="Body LG"
          specs="18px / 28px · Regular"
          example="Ripperdoc provides a high-density, accessible foundation for high-fidelity interactive media applications."
          className="rd-body-lg"
        />
        <TypeRow
          role="Body MD"
          specs="16px / 24px · Regular"
          example="Consistent spacing and typography create visual harmony across disparate micro-frontends without brand drift."
          className="rd-body-md"
        />
        <TypeRow
          role="Body SM"
          specs="14px / 20px · Regular"
          example="Secondary metadata, timestamps, user captions, and informational footnotes."
          className="rd-body-sm"
        />
        <TypeRow
          role="Label LG"
          specs="14px / 18px · Semibold · 0.01em"
          example="Interactive Action Trigger"
          className="rd-label-lg"
        />
        <TypeRow
          role="Label MD"
          specs="12px / 16px · Semibold · 0.02em"
          example="Status Pill / Metadata Badge"
          className="rd-label-md"
        />
        <TypeRow
          role="Label SM"
          specs="11px / 14px · Bold · 0.06em · Uppercase"
          example="Live Broadcast"
          className="rd-label-sm"
        />
      </div>

      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: 'var(--rd-color-on-surface)' }}>
          Tabular Numerals (Counters & Timers)
        </h3>
        <p style={{ margin: '0 0 1.5rem 0', color: 'var(--rd-color-on-surface-variant)', fontSize: '0.875rem' }}>
          Always use <code>.rd-tabular-nums</code> for episode timers, durations, and counters to prevent layout jitter.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '2rem',
            padding: '1.5rem',
            backgroundColor: 'var(--rd-color-surface-container)',
            borderRadius: 'var(--rd-radius-md)',
            border: '1px solid var(--rd-color-outline-variant)',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--rd-color-on-surface-variant)', marginBottom: '0.25rem' }}>
              Standard Proportional Numerals
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>01:42:19 / 02:30:00</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--rd-color-on-surface-variant)', marginBottom: '0.25rem' }}>
              Tabular Numerals (.rd-tabular-nums)
            </div>
            <div className="rd-tabular-nums" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--rd-color-primary)' }}>
              01:42:19 / 02:30:00
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
