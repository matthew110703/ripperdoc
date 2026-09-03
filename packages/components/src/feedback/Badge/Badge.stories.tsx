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
