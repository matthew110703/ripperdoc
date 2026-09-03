import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack } from '../../packages/components/src/primitives/Stack';

const meta = {
  title: 'Primitives/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
      description: 'Gap based on the 4px baseline rhythm scale',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalLayout: Story = {
  args: {
    gap: 4,
    align: 'stretch',
  },
  render: (args) => (
    <div style={{ maxWidth: '500px' }}>
      <Stack {...args}>
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            style={{
              padding: '1rem',
              backgroundColor: 'var(--rd-color-surface-container)',
              border: '1px solid var(--rd-color-outline-variant)',
              borderRadius: 'var(--rd-radius-md)',
              fontFamily: 'var(--rd-font-mono)',
              fontSize: '13px',
              textAlign: 'center',
            }}
          >
            Stack Item #{item}
          </div>
        ))}
      </Stack>
    </div>
  ),
};
