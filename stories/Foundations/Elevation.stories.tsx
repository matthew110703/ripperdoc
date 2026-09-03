import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Foundations/Elevation',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TonalElevation: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.75rem', color: 'var(--rd-color-on-surface)' }}>
          Tonal Elevation & Depth
        </h2>
        <p style={{ margin: 0, color: 'var(--rd-color-on-surface-variant)', fontSize: '0.875rem' }}>
          Depth in Ripperdoc is achieved through disciplined surface layering. In Obsidian (Dark), depth is expressed via surface luminance progression and soft diffusion. In Luminous (Light), depth is defined by architectural containment and crisp slate drop shadows.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'stretch',
        }}
      >
        {/* Level 0 */}
        <div
          style={{
            backgroundColor: 'var(--rd-elevation-0)',
            borderRadius: 'var(--rd-radius-lg)',
            padding: '2rem',
            border: '1px dashed var(--rd-color-outline-variant)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '220px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rd-color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Level 0 · Canvas
            </div>
            <h3 style={{ margin: '0.5rem 0 0.75rem 0', fontSize: '1.25rem' }}>Base Canvas</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rd-color-on-surface-variant)' }}>
              The bottommost foundation layer. Flat background, maximum contrast with foreground content.
            </p>
          </div>
          <code style={{ fontSize: '0.75rem', color: 'var(--rd-color-on-surface-variant)' }}>
            var(--rd-elevation-0)
          </code>
        </div>

        {/* Level 1 */}
        <div
          style={{
            backgroundColor: 'var(--rd-elevation-1)',
            borderRadius: 'var(--rd-radius-lg)',
            padding: '2rem',
            border: 'var(--rd-border-level-1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '220px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rd-color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Level 1 · Surfaces & Cards
            </div>
            <h3 style={{ margin: '0.5rem 0 0.75rem 0', fontSize: '1.25rem' }}>Card / Content Plate</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rd-color-on-surface-variant)' }}>
              Standard surface for feed items, media cards, panels, and tables. Bound with a 1px structural stroke.
            </p>
          </div>
          <code style={{ fontSize: '0.75rem', color: 'var(--rd-color-on-surface-variant)' }}>
            var(--rd-elevation-1) + var(--rd-border-level-1)
          </code>
        </div>

        {/* Level 2 */}
        <div
          style={{
            backgroundColor: 'var(--rd-elevation-2)',
            borderRadius: 'var(--rd-radius-lg)',
            padding: '2rem',
            boxShadow: 'var(--rd-shadow-level-2)',
            border: 'var(--rd-border-level-1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '220px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--rd-color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Level 2 · Modals & Popovers
            </div>
            <h3 style={{ margin: '0.5rem 0 0.75rem 0', fontSize: '1.25rem' }}>Floating Dialog</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rd-color-on-surface-variant)' }}>
              Elevated overlays, popovers, navigation dropdowns, and modals hovering over the page.
            </p>
          </div>
          <code style={{ fontSize: '0.75rem', color: 'var(--rd-color-on-surface-variant)' }}>
            var(--rd-shadow-level-2)
          </code>
        </div>
      </div>

      {/* Glassmorphism Section */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: 'var(--rd-color-on-surface)' }}>
          Atmospheric Glassmorphism
        </h3>
        <div
          style={{
            position: 'relative',
            padding: '3rem 2rem',
            borderRadius: 'var(--rd-radius-lg)',
            background: 'linear-gradient(135deg, var(--rd-color-primary) 0%, var(--rd-color-surface-container-high) 100%)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--rd-glass-surface)',
              backdropFilter: 'blur(var(--rd-glass-blur))',
              WebkitBackdropFilter: 'blur(var(--rd-glass-blur))',
              borderRadius: 'var(--rd-radius-md)',
              border: '1px solid var(--rd-glass-border)',
              padding: '1.5rem',
              maxWidth: '500px',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--rd-color-on-surface)' }}>
              Frosted Glass Layer
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--rd-color-on-surface-variant)' }}>
              Provides contextual depth for floating headers, search bars, and player overlay controls without obscuring underlying content.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};
