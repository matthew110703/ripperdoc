import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Container } from '../../packages/components/src/primitives/Container';

const meta = {
  title: 'Primitives/Container',
  component: Container,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CenteredContainer: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <Container {...args}>
      <div
        style={{
          padding: '2.5rem',
          backgroundColor: 'var(--rd-color-surface-container)',
          border: '1px dashed var(--rd-color-primary)',
          borderRadius: 'var(--rd-radius-lg)',
          textAlign: 'center',
          fontFamily: 'var(--rd-font-mono)',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--rd-color-primary)', marginBottom: '0.5rem' }}>
          CONTAINER BOUNDARY: {args.size?.toUpperCase()}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
          Automatically centers content and applies fluid gutter padding according to viewport size.
        </div>
      </div>
    </Container>
  ),
};
