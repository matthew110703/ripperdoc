import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Introduction/Welcome',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ControlCenter: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
        {/* HUD Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--rd-color-outline-variant)',
            marginBottom: '2.5rem',
            fontFamily: 'var(--rd-font-mono)',
            fontSize: '12px',
            letterSpacing: '0.08em',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
              }}
            />
            <span style={{ fontWeight: 700, color: 'var(--rd-color-primary)' }}>RIPPERDOC // CHROME77</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ opacity: 0.7 }}>SYS.VER 0.1.0</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', opacity: 0.8 }}>
            <span>THEMES: OBSIDIAN · LUMINOUS</span>
            <span>SPEC: PRE-PUB v1.0</span>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: 'var(--rd-radius-sm)',
              backgroundColor: 'var(--rd-color-surface-container-high)',
              border: '1px solid var(--rd-color-outline-variant)',
              fontFamily: 'var(--rd-font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--rd-color-primary)',
              letterSpacing: '0.06em',
              marginBottom: '1rem',
            }}
          >
            SHARED DESIGN-SYSTEM PLATFORM
          </div>
          <h1
            style={{
              fontSize: '44px',
              lineHeight: '52px',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              margin: '0 0 1rem 0',
              color: 'var(--rd-color-on-surface)',
            }}
          >
            Architectural Precision for Multi-MFE Ecosystems
          </h1>
          <p
            style={{
              fontSize: '18px',
              lineHeight: '28px',
              color: 'var(--rd-color-on-surface-variant)',
              maxWidth: '750px',
              margin: 0,
            }}
          >
            Ripperdoc provides a shared token contract, cinematic theme engine, and accessible primitive layer consumed by independent micro-frontends without brand drift or runtime coupling.
          </p>
        </div>

        {/* System Status Dashboard */}
        <div
          style={{
            backgroundColor: 'var(--rd-color-surface-container)',
            border: 'var(--rd-border-level-1)',
            borderRadius: 'var(--rd-radius-lg)',
            padding: '1.75rem',
            marginBottom: '3rem',
            boxShadow: 'var(--rd-shadow-level-1, none)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--rd-font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--rd-color-primary)',
                textTransform: 'uppercase',
              }}
            >
              Telemetry // System Status
            </span>
            <span style={{ fontSize: '12px', color: '#22c55e', fontFamily: 'var(--rd-font-mono)' }}>
              ● ALL SYSTEMS NOMINAL
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              { label: 'TOKEN CONTRACT', value: '3-TIER STABLE', status: 'READY' },
              { label: 'ACTIVE THEMES', value: 'OBSIDIAN & LUMINOUS', status: 'SYNCED' },
              { label: 'PRIMITIVE LAYER', value: 'BOX · STACK · INLINE', status: 'ACTIVE' },
              { label: 'A11Y BASELINE', value: 'KEYBOARD & CONTRAST', status: 'PASS' },
              { label: 'PACKAGE ACCESS', value: 'PUBLIC SCOPED', status: 'CONFIGURED' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--rd-color-surface-container-low)',
                  border: '1px solid var(--rd-color-outline-variant)',
                  borderRadius: 'var(--rd-radius-md)',
                  padding: '1rem',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--rd-font-mono)',
                    fontSize: '10px',
                    color: 'var(--rd-color-on-surface-variant)',
                    letterSpacing: '0.05em',
                    marginBottom: '0.35rem',
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--rd-color-on-surface)', marginBottom: '0.25rem' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '10px', color: '#22c55e', fontFamily: 'var(--rd-font-mono)' }}>
                  [{stat.status}]
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quickstart Code Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 1rem 0' }}>Quickstart Integration</h2>
          <div
            style={{
              backgroundColor: 'var(--rd-color-surface-container-lowest)',
              border: '1px solid var(--rd-color-outline-variant)',
              borderRadius: 'var(--rd-radius-md)',
              padding: '1.25rem',
              fontFamily: 'var(--rd-font-mono)',
              fontSize: '13px',
              lineHeight: '22px',
              color: 'var(--rd-color-on-surface)',
            }}
          >
            <div style={{ color: 'var(--rd-color-on-surface-variant)', marginBottom: '0.5rem' }}>
              # 1. Install packages in your micro-frontend
            </div>
            <div style={{ color: 'var(--rd-color-primary)', marginBottom: '1rem' }}>
              pnpm add @ripperdoc-chrome77/components @ripperdoc-chrome77/tokens @ripperdoc-chrome77/themes
            </div>

            <div style={{ color: 'var(--rd-color-on-surface-variant)', marginBottom: '0.5rem' }}>
              # 2. Wrap your application with the ThemeProvider
            </div>
            <div style={{ opacity: 0.9 }}>
              {`import { ThemeProvider } from '@ripperdoc-chrome77/themes';`}
              <br />
              {`import '@ripperdoc-chrome77/tokens/foundations.css';`}
              <br />
              {`import '@ripperdoc-chrome77/themes/obsidian.css';`}
              <br />
              {`import '@ripperdoc-chrome77/themes/luminous.css';`}
              <br />
              <br />
              {`export function App() {`}
              <br />
              {`  return (`}
              <br />
              {`    <ThemeProvider defaultTheme="obsidian">`}
              <br />
              {`      <YourMFEContent />`}
              <br />
              {`    </ThemeProvider>`}
              <br />
              {`  );`}
              <br />
              {`}`}
            </div>
          </div>
        </div>

        {/* Invariant Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              title: 'One-Way Dependency Flow',
              desc: 'MFEs import Ripperdoc. Ripperdoc never imports or knows about MFE business logic, cart states, or domain code.',
            },
            {
              title: 'Themes as Configuration',
              desc: 'Obsidian and Luminous configure design tokens via CSS variables. Never fork components for branding.',
            },
            {
              title: 'Domain Agnosticism',
              desc: 'Ripperdoc houses reusable UI primitives, generic layout tools, and tokens. Domain components live in MFEs.',
            },
          ].map((pillar, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--rd-color-surface-container)',
                border: 'var(--rd-border-level-1)',
                borderRadius: 'var(--rd-radius-lg)',
                padding: '1.5rem',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 0.5rem 0', color: 'var(--rd-color-primary)' }}>
                {pillar.title}
              </h3>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: '20px', color: 'var(--rd-color-on-surface-variant)' }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
