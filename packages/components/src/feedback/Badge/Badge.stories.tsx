import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Feedback/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    pill: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    pill: false,
    children: 'STATUS: ACTIVE',
  },
  render: (args) => (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <Badge {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
      <Badge variant="default">DEFAULT</Badge>
      <Badge variant="primary">PRIMARY</Badge>
      <Badge variant="success">READY / PASS</Badge>
      <Badge variant="warning">WARNING</Badge>
      <Badge variant="error">CRITICAL</Badge>
      <Badge variant="neutral">OFFLINE</Badge>
    </div>
  ),
};

export const PillBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
      <Badge variant="primary" pill>Live Stream</Badge>
      <Badge variant="success" pill>Operational</Badge>
      <Badge variant="warning" pill>High Load</Badge>
      <Badge variant="error" pill>Firewall Block</Badge>
    </div>
  ),
};

export const PulsingStatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
      <div>
        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '15px', fontWeight: 600 }}>Pulsing Attention Badges</h4>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--rd-color-on-surface-variant)' }}>
          Continuous subtle breathing scale loop for live streams, active recordings, and critical alerts.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <Badge variant="error" pill pulse>
          ● LIVE ON AIR
        </Badge>
        <Badge variant="success" pill pulse>
          ● RECORDING ACTIVE
        </Badge>
        <Badge variant="warning" pill pulse>
          ● SYNCING TELEMETRY
        </Badge>
        <Badge variant="error" pill pulse motion={false}>
          ● PULSE DISABLED (motion=false)
        </Badge>
      </div>
    </div>
  ),
};

