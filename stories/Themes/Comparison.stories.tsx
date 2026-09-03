import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '../../packages/components/src/actions/Button';
import { Badge } from '../../packages/components/src/feedback/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../packages/components/src/surfaces/Card';

const meta = {
  title: 'Themes/Comparison',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface ThemePaneProps {
  themeName: 'obsidian' | 'luminous';
  title: string;
  tagline: string;
}

const ThemePane: React.FC<ThemePaneProps> = ({ themeName, title, tagline }) => {
  return (
    <div
      data-theme={themeName}
      style={{
        flex: 1,
        minWidth: '320px',
        backgroundColor: 'var(--rd-color-background)',
        color: 'var(--rd-color-on-surface)',
        borderRadius: 'var(--rd-radius-lg)',
        border: '1px solid var(--rd-color-outline-variant)',
        padding: '1.75rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--rd-color-outline-variant)', paddingBottom: '1rem' }}>
        <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)', fontWeight: 700, letterSpacing: '0.08em' }}>
          THEME // {themeName.toUpperCase()}
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0.25rem 0' }}>{title}</h2>
        <div style={{ fontSize: '13px', color: 'var(--rd-color-on-surface-variant)' }}>{tagline}</div>
      </div>

      {/* Action Buttons Matrix */}
      <div>
        <div style={{ fontSize: '11px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-on-surface-variant)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
          Action Controls (Button)
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <Button variant="primary" size="md">Primary</Button>
          <Button variant="secondary" size="md">Secondary</Button>
          <Button variant="tertiary" size="md">Tertiary</Button>
          <Button variant="ghost" size="md">Ghost</Button>
          <Button variant="danger" size="md">Danger</Button>
          <Button variant="primary" size="md" loading>Loading</Button>
        </div>
      </div>

      {/* Metadata Badges */}
      <div>
        <div style={{ fontSize: '11px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-on-surface-variant)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
          Status Indicators (Badge)
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <Badge variant="primary">LIVE</Badge>
          <Badge variant="success">READY</Badge>
          <Badge variant="warning">DEGRADED</Badge>
          <Badge variant="error">CRITICAL</Badge>
          <Badge variant="neutral">OFFLINE</Badge>
          <Badge variant="default" pill>PILL BADGE</Badge>
        </div>
      </div>

      {/* Composable Card */}
      <div>
        <div style={{ fontSize: '11px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-on-surface-variant)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
          Surface Plate (Card)
        </div>
        <Card elevation={1}>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge variant="primary" size="sm">TELEMETRY</Badge>
              <span style={{ fontSize: '11px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-on-surface-variant)' }}>
                NODE-77
              </span>
            </div>
            <CardTitle>Neural Net Interface</CardTitle>
            <CardDescription>Direct biometric monitoring and feed synchronization</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ fontSize: '13px', lineHeight: '20px' }}>
              All visual tokens adapt seamlessly under the same markup contract.
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Connect Feed</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export const SideBySideComparison: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          LABORATORY // THEME COMPARISON
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
          Real-Time Side-by-Side Verification
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--rd-color-on-surface-variant)', margin: 0 }}>
          Verifies that the same React component composition renders with authentic aesthetic fidelity in both Obsidian (Dark Cinematic) and Luminous (Light Editorial).
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'stretch' }}>
        <ThemePane
          themeName="obsidian"
          title="Obsidian (Dark Cinematic)"
          tagline="#131313 Canvas · Electric Blue #B0C6FF · Soft Atmospheric Ambient"
        />
        <ThemePane
          themeName="luminous"
          title="Luminous (Light Editorial)"
          tagline="#F8F9FF Canvas · Vibrant Cobalt #004AC6 · Crisp Architectural Slate"
        />
      </div>
    </div>
  ),
};
