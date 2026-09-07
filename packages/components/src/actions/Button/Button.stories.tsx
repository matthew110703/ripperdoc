import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta = {
  title: 'Actions/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      description: 'The visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Displays a loading spinner and disables click events',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction and lowers opacity',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button stretches to fit 100% of container width',
    },
    children: {
      control: 'text',
      description: 'Button content label',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
    children: 'Confirm Action',
  },
  render: (args) => (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <Button {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small (32px)</Button>
      <Button size="md">Medium (40px)</Button>
      <Button size="lg">Large (48px)</Button>
    </div>
  ),
};

export const StatesMatrix: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '18px' }}>Interaction State Matrix</h3>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--rd-color-on-surface-variant)' }}>
          Standard action control states tested across theme contrast guidelines.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{ fontSize: '12px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)' }}>
            DEFAULT
          </span>
          <Button variant="primary">Primary Default</Button>
          <Button variant="secondary">Secondary Default</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{ fontSize: '12px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)' }}>
            LOADING STATE
          </span>
          <Button variant="primary" loading>Submitting</Button>
          <Button variant="secondary" loading>Submitting</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{ fontSize: '12px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)' }}>
            DISABLED STATE
          </span>
          <Button variant="primary" disabled>Primary Disabled</Button>
          <Button variant="secondary" disabled>Secondary Disabled</Button>
        </div>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Button variant="primary" fullWidth>Full Width Button</Button>
    </div>
  ),
};

export const MotionFeedback: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
      <div>
        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '15px', fontWeight: 600 }}>Spring Press & Hover Feedback</h4>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--rd-color-on-surface-variant)' }}>
          Motion is active by default. Tap/click any button below to see the snappy spring compression physics.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary">Spring Motion (Default)</Button>
        <Button variant="secondary">Secondary Spring</Button>
        <Button variant="danger">Danger Spring</Button>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '14px', fontWeight: 600 }}>Component Opt-Out (motion={'{false}'})</h4>
        <p style={{ margin: '0 0 0.75rem 0', fontSize: '12px', color: 'var(--rd-color-on-surface-variant)' }}>
          Consumers can opt out per-component without affecting global configuration.
        </p>
        <Button variant="secondary" motion={false}>Static Button (No Motion)</Button>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const handleTrigger = () => {
      setIsLoading(true);
      setIsSuccess(false);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
      }, 2000);
    };

    return (
      <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: 'var(--rd-font-sans)' }}>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '18px', fontWeight: 600 }}>Interactive Loading & Async States</h3>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--rd-color-on-surface-variant)' }}>
            When <code>loading={'{true}'}</code>, the button displays a 60fps spinner, preserves the text label, disables clicks, and maintains layout stability.
          </p>
        </div>

        {/* Live Interactive Trigger */}
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--rd-color-surface-container)', borderRadius: 'var(--rd-radius-lg)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span style={{ fontSize: '12px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)' }}>
            ASYNC ACTION SIMULATOR (CLICK TO TEST)
          </span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              loading={isLoading}
              onClick={handleTrigger}
            >
              {isLoading ? 'Processing Request...' : isSuccess ? '✓ Completed!' : 'Click to Submit'}
            </Button>
            <Button
              variant="secondary"
              loading={isLoading}
              onClick={handleTrigger}
            >
              {isLoading ? 'Saving...' : 'Save Draft'}
            </Button>
          </div>
        </div>

        {/* Sizes Matrix in Loading State */}
        <div>
          <span style={{ fontSize: '12px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)', display: 'block', marginBottom: '0.75rem' }}>
            LOADING ACROSS SIZES
          </span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button size="sm" variant="primary" loading>Small Loading</Button>
            <Button size="md" variant="primary" loading>Medium Loading</Button>
            <Button size="lg" variant="primary" loading>Large Loading</Button>
          </div>
        </div>

        {/* Variants Matrix in Loading State */}
        <div>
          <span style={{ fontSize: '12px', fontFamily: 'var(--rd-font-mono)', color: 'var(--rd-color-primary)', display: 'block', marginBottom: '0.75rem' }}>
            LOADING ACROSS VARIANTS
          </span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" loading>Primary</Button>
            <Button variant="secondary" loading>Secondary</Button>
            <Button variant="tertiary" loading>Tertiary</Button>
            <Button variant="danger" loading>Danger</Button>
            <Button variant="ghost" loading>Ghost</Button>
          </div>
        </div>
      </div>
    );
  },
};


