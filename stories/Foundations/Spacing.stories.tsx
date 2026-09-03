import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Foundations/Spacing & Radii',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const spacingScale = [
  { name: '--rd-space-1', value: '4px', label: '1 (4px) · Micro padding' },
  { name: '--rd-space-2', value: '8px', label: '2 (8px) · Compact gap / icon-text' },
  { name: '--rd-space-3', value: '12px', label: '3 (12px) · Card internal gap' },
  { name: '--rd-space-4', value: '16px', label: '4 (16px) · Base layout unit / standard gap' },
  { name: '--rd-space-5', value: '20px', label: '5 (20px) · Medium padding' },
  { name: '--rd-space-6', value: '24px', label: '6 (24px) · Section margin / card padding' },
  { name: '--rd-space-8', value: '32px', label: '8 (32px) · Large section spacing' },
  { name: '--rd-space-10', value: '40px', label: '10 (40px) · Page header spacing' },
  { name: '--rd-space-12', value: '48px', label: '12 (48px) · Major section break' },
  { name: '--rd-space-16', value: '64px', label: '16 (64px) · Hero vertical spacing' },
];

const radiiScale = [
  { name: '--rd-radius-sm', value: '4px', label: 'sm (4px) · Badges, tags, inner elements' },
  { name: '--rd-radius-default', value: '8px', label: 'default (8px) · Buttons, input fields' },
  { name: '--rd-radius-md', value: '12px', label: 'md (12px) · Standard cards, content tiles' },
  { name: '--rd-radius-lg', value: '16px', label: 'lg (16px) · Modals, popovers, containers' },
  { name: '--rd-radius-xl', value: '24px', label: 'xl (24px) · Feature banners, hero containers' },
  { name: '--rd-radius-full', value: '9999px', label: 'full (9999px) · Pills, avatars, circular buttons' },
];

export const SpacingAndRadii: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.75rem', color: 'var(--rd-color-on-surface)' }}>
          Spacing & Radius Foundations
        </h2>
        <p style={{ margin: 0, color: 'var(--rd-color-on-surface-variant)', fontSize: '0.875rem' }}>
          Ripperdoc adheres to a strict 4px baseline rhythm. All layout containers, margins, gaps, and paddings must align with this scale.
        </p>
      </div>

      <div style={{ marginBottom: '3.5rem' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: 'var(--rd-color-on-surface)' }}>
          4px Baseline Spacing Scale
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {spacingScale.map((item) => (
            <div
              key={item.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '240px 1fr',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--rd-color-outline-variant)',
              }}
            >
              <div>
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.label}</span>
                <div style={{ fontSize: '0.75rem', color: 'var(--rd-color-on-surface-variant)', fontFamily: 'var(--rd-font-mono)' }}>
                  {item.name}
                </div>
              </div>
              <div>
                <div
                  style={{
                    height: '24px',
                    width: `var(${item.name})`,
                    backgroundColor: 'var(--rd-color-primary)',
                    borderRadius: 'var(--rd-radius-sm)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: 'var(--rd-color-on-surface)' }}>
          Corner Radii Scale
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {radiiScale.map((item) => (
            <div
              key={item.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '140px',
                backgroundColor: 'var(--rd-color-surface-container)',
                border: '1px solid var(--rd-color-outline-variant)',
                borderRadius: `var(${item.name})`,
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{item.value}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--rd-color-on-surface-variant)', fontFamily: 'var(--rd-font-mono)' }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
