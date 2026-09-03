import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Introduction/Architecture',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SystemArchitecture: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div
          style={{
            fontFamily: 'var(--rd-font-mono)',
            fontSize: '11px',
            color: 'var(--rd-color-primary)',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem',
          }}
        >
          SPECIFICATION // ARCHITECTURE
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 0.75rem 0', color: 'var(--rd-color-on-surface)' }}>
          Multi-MFE Design System Architecture
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--rd-color-on-surface-variant)', margin: 0 }}>
          How Ripperdoc establishes a strict one-way dependency flow and isolates generic UI primitives from consuming application micro-frontends.
        </p>
      </div>

      {/* Architecture Flow Visual */}
      <div
        style={{
          backgroundColor: 'var(--rd-color-surface-container)',
          border: 'var(--rd-border-level-1)',
          borderRadius: 'var(--rd-radius-lg)',
          padding: '2rem',
          marginBottom: '3rem',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 1.5rem 0', color: 'var(--rd-color-on-surface)' }}>
          One-Way Dependency Flow
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
          {/* Micro-Frontends Layer */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%' }}>
            {['MFE A: NetWatch Hub', 'MFE B: Braindance Studio', 'MFE C: CyberDoc Portal'].map((mfe, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--rd-color-surface-container-high)',
                  border: '1px solid var(--rd-color-outline-variant)',
                  borderRadius: 'var(--rd-radius-md)',
                  padding: '1rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '11px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)', marginBottom: '0.25rem' }}>
                  CONSUMING APPLICATION
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{mfe}</div>
                <div style={{ fontSize: '11px', color: 'var(--rd-color-on-surface-variant)', marginTop: '0.25rem' }}>
                  Owns domain logic & business rules
                </div>
              </div>
            ))}
          </div>

          {/* Direction Indicator */}
          <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '12px', color: 'var(--rd-color-primary)', padding: '0.25rem 0' }}>
            ↓ imports and consumes tokens & primitives ↓
          </div>

          {/* Ripperdoc Global Platform Layer */}
          <div
            style={{
              width: '100%',
              backgroundColor: 'var(--rd-color-surface-container-low)',
              border: '1px solid var(--rd-color-primary)',
              borderRadius: 'var(--rd-radius-md)',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--rd-color-primary)' }}>
                RIPPERDOC GLOBAL PLATFORM (@ripperdoc-chrome77/*)
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--rd-font-mono)', color: '#22c55e' }}>
                ZERO DOMAIN DEPENDENCIES
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
              {[
                { name: '@ripperdoc-chrome77/tokens', desc: 'Raw values, scales, foundations.css' },
                { name: '@ripperdoc-chrome77/themes', desc: 'Obsidian, Luminous, ThemeProvider' },
                { name: '@ripperdoc-chrome77/utils', desc: 'cn, DOM, focus helpers' },
                { name: '@ripperdoc-chrome77/components', desc: 'Box, Stack, Button, Card, Badge' },
              ].map((pkg, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--rd-color-surface-container)',
                    border: '1px solid var(--rd-color-outline-variant)',
                    borderRadius: 'var(--rd-radius-sm)',
                    padding: '0.75rem',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--rd-color-on-surface)', marginBottom: '0.25rem' }}>
                    {pkg.name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--rd-color-on-surface-variant)' }}>{pkg.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Three Tier Token Hierarchy */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 1rem 0' }}>Three-Tier Token Normalization</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              tier: 'TIER 1: PRIMITIVE TOKENS',
              example: '--rd-palette-blue-500: #558dff; --rd-space-4: 16px;',
              desc: 'Raw numerical and color values without context. Describing values, not intention.',
            },
            {
              tier: 'TIER 2: SEMANTIC TOKENS (CONSUMER CONTRACT)',
              example: '--rd-color-surface: #131313; --rd-color-primary: #b0c6ff;',
              desc: 'Intent-based design contract. Components consume these tokens. Themes swap values seamlessly under the same token key.',
            },
            {
              tier: 'TIER 3: COMPONENT TOKENS',
              example: '--rd-button-primary-bg: var(--rd-color-primary);',
              desc: 'Scoped overrides for individual component boundaries when customization is required.',
            },
          ].map((tier, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--rd-color-surface-container)',
                border: '1px solid var(--rd-color-outline-variant)',
                borderRadius: 'var(--rd-radius-md)',
                padding: '1.25rem',
              }}
            >
              <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--rd-color-primary)', marginBottom: '0.25rem' }}>
                {tier.tier}
              </div>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '13px', color: 'var(--rd-color-on-surface-variant)' }}>
                {tier.desc}
              </p>
              <code style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-on-surface)' }}>
                {tier.example}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
