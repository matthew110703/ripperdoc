import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Inline } from '../../packages/components/src/primitives/Inline';
import { Badge } from '../../packages/components/src/feedback/Badge';
import { Button } from '../../packages/components/src/actions/Button';

const meta = {
  title: 'Primitives/Inline',
  component: Inline,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 8],
    },
    wrap: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Inline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalLayout: Story = {
  args: {
    gap: 3,
    wrap: true,
  },
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <Inline {...args}>
        <Button variant="primary" size="sm">Action 1</Button>
        <Button variant="secondary" size="sm">Action 2</Button>
        <Badge variant="primary">TAG ALPHA</Badge>
        <Badge variant="success">TAG BETA</Badge>
        <Badge variant="warning">TAG GAMMA</Badge>
      </Inline>
    </div>
  ),
};
