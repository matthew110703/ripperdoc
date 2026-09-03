import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../../actions/Button';
import { Badge } from '../../feedback/Badge';

const meta = {
  title: 'Surfaces/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardCard: Story = {
  render: () => (
    <div style={{ maxWidth: '480px' }}>
      <Card elevation={1}>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Badge variant="primary" size="sm">TELEMETRY</Badge>
            <span style={{ fontSize: '12px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-on-surface-variant)' }}>
              NODE #0492
            </span>
          </div>
          <CardTitle>System Diagnostic Module</CardTitle>
          <CardDescription>Real-time neural link latency and throughput stream</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ fontSize: '13px', lineHeight: '22px', color: 'var(--rd-color-on-surface-variant)' }}>
            All micro-frontend applications render surface plates using standard elevation tokens. Structural 1px strokes preserve optical containment across both dark and light modes.
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm">Dismiss</Button>
          <Button variant="primary" size="sm">Calibrate</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const GlassmorphicCard: Story = {
  render: () => (
    <div
      style={{
        padding: '3rem',
        borderRadius: 'var(--rd-radius-xl)',
        background: 'linear-gradient(135deg, var(--rd-color-primary-container) 0%, var(--rd-color-surface-container-high) 100%)',
        maxWidth: '520px',
      }}
    >
      <Card glass>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Badge variant="success" size="sm">FROSTED GLASS</Badge>
            <span style={{ fontSize: '11px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-on-surface)' }}>
              BLUR: 20px
            </span>
          </div>
          <CardTitle>Atmospheric Glass Overlay</CardTitle>
          <CardDescription>Backdrop blur container for floating panels and HUD controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ fontSize: '13px', lineHeight: '20px' }}>
            Maintains visual context of the underlying video stream or dashboard canvas while ensuring clear typography legibility.
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">Configure</Button>
          <Button variant="primary" size="sm">Engage</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
