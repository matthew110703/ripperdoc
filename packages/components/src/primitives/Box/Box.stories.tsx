import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box } from './Box';

const meta = {
  title: 'Primitives/Box',
  component: Box,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    as: {
      control: 'text',
      description: 'Polymorphic element type (div, section, article, etc.)',
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: 'div',
  },
  render: (args) => (
    <Box
      {...args}
      style={{
        padding: '2rem',
        backgroundColor: 'var(--rd-color-surface-container)',
        border: 'var(--rd-border-level-1)',
        borderRadius: 'var(--rd-radius-lg)',
        fontFamily: 'var(--rd-font-mono)',
        fontSize: '13px',
      }}
    >
      <div style={{ fontWeight: 700, color: 'var(--rd-color-primary)', marginBottom: '0.5rem' }}>
        POLYMORPHIC BOX
      </div>
      <div style={{ color: 'var(--rd-color-on-surface-variant)' }}>
        Rendered as an HTML <code>&lt;{String(args.as || 'div')}&gt;</code> container.
      </div>
    </Box>
  ),
};
