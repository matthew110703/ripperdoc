import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Foundations/Motion & Grid',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const MotionAndGridSystem: Story = {
  render: () => {
    const [animate, setAnimate] = useState(false);

    const triggerAnimation = () => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 50);
    };

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            FOUNDATIONS // MOTION & GRID
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Motion & Layout Constraints</h1>
          <p style={{ fontSize: '14px', color: 'var(--rd-color-on-surface-variant)', margin: 0 }}>
            Standard motion timing curves and responsive grid layout boundaries to guarantee fluid, jitter-free interactive feedback.
          </p>
        </div>

        {/* Motion Section */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Interactive Motion Easing Curves</h2>
            <button
              onClick={triggerAnimation}
              style={{
                fontFamily: 'var(--rd-font-mono)',
                fontSize: '12px',
                fontWeight: 600,
                padding: '6px 14px',
                backgroundColor: 'var(--rd-color-primary)',
                color: 'var(--rd-color-on-primary)',
                border: 'none',
                borderRadius: 'var(--rd-radius-sm)',
                cursor: 'pointer',
              }}
            >
              ▶ TRIGGER MOTION
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              {
                name: 'Standard Easing (var(--rd-ease-standard))',
                curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
                duration: 'var(--rd-duration-normal)',
                timing: '250ms',
                desc: 'Used for regular transitions, modal appearances, and color changes.',
              },
              {
                name: 'Decelerate (var(--rd-ease-decelerate))',
                curve: 'cubic-bezier(0, 0, 0.2, 1)',
                duration: 'var(--rd-duration-fast)',
                timing: '150ms',
                desc: 'Incoming elements entering from off-screen or popovers expanding.',
              },
              {
                name: 'Accelerate (var(--rd-ease-accelerate))',
                curve: 'cubic-bezier(0.4, 0, 1, 1)',
                duration: 'var(--rd-duration-slow)',
                timing: '400ms',
                desc: 'Elements exiting the viewport or dialog dismissals.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--rd-color-surface-container)',
                  border: 'var(--rd-border-level-1)',
                  borderRadius: 'var(--rd-radius-md)',
                  padding: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{item.name}</span>
                  <span style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)' }}>
                    {item.timing}
                  </span>
                </div>
                <p style={{ margin: '0 0 1rem 0', fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
                  {item.desc}
                </p>

                {/* Track */}
                <div
                  style={{
                    height: '32px',
                    backgroundColor: 'var(--rd-color-surface-container-lowest)',
                    borderRadius: 'var(--rd-radius-sm)',
                    border: '1px solid var(--rd-color-outline-variant)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '60px',
                      backgroundColor: 'var(--rd-color-primary)',
                      borderRadius: 'var(--rd-radius-sm)',
                      transform: animate ? 'translateX(calc(1000px - 100%))' : 'translateX(0)',
                      transition: `transform ${item.duration} ${item.curve}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Constraints */}
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 1rem 0' }}>Container Layout Constraints</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {[
              { label: 'MOBILE MARGIN', val: '16px', var: '--rd-container-margin-mobile' },
              { label: 'DESKTOP MARGIN', val: '48px', var: '--rd-container-margin-desktop' },
              { label: 'CONTENT GUTTER', val: '16px', var: '--rd-gutter' },
              { label: 'MAX VIEWPORT', val: '1440px', var: '--rd-container-max-width' },
            ].map((grid, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--rd-color-surface-container)',
                  border: '1px solid var(--rd-color-outline-variant)',
                  borderRadius: 'var(--rd-radius-md)',
                  padding: '1rem',
                }}
              >
                <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '10px', color: 'var(--rd-color-on-surface-variant)', marginBottom: '0.25rem' }}>
                  {grid.label}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--rd-color-on-surface)', marginBottom: '0.25rem' }}>
                  {grid.val}
                </div>
                <code style={{ fontSize: '10px', color: 'var(--rd-color-primary)', fontFamily: 'var(--rd-font-mono)' }}>
                  {grid.var}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
