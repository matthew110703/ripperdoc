import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface ColorSwatchProps {
  label: string;
  varName: string;
  textColor?: string;
  borderColor?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  label,
  varName,
  textColor = 'var(--rd-color-on-surface)',
  borderColor = 'var(--rd-color-outline-variant)',
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--rd-radius-md)',
      overflow: 'hidden',
      border: `1px solid ${borderColor}`,
      background: `var(${varName})`,
      minHeight: '84px',
      padding: '0.75rem',
      justifyContent: 'space-between',
      boxShadow: 'var(--rd-shadow-sm, 0 1px 3px rgba(0,0,0,0.1))',
    }}
  >
    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: textColor }}>{label}</div>
    <div style={{ fontSize: '0.6875rem', opacity: 0.8, color: textColor, fontFamily: 'var(--rd-font-mono)' }}>
      {varName}
    </div>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h3
      style={{
        margin: '0 0 1rem 0',
        fontSize: '1.125rem',
        fontWeight: 600,
        color: 'var(--rd-color-on-surface)',
        borderBottom: '1px solid var(--rd-color-outline-variant)',
        paddingBottom: '0.5rem',
      }}
    >
      {title}
    </h3>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '1rem',
      }}
    >
      {children}
    </div>
  </div>
);

export const SemanticPalette: Story = {
  render: () => (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'var(--rd-font-sans)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.75rem', color: 'var(--rd-color-on-surface)' }}>
          Normalized Semantic Color Palette
        </h2>
        <p style={{ margin: 0, color: 'var(--rd-color-on-surface-variant)', fontSize: '0.875rem' }}>
          Switch between <strong>Obsidian</strong> and <strong>Luminous</strong> in the Storybook toolbar above to see how all semantic tokens dynamically adapt.
        </p>
      </div>

      <Section title="Surfaces & Containers">
        <ColorSwatch label="Surface (Base)" varName="--rd-color-surface" />
        <ColorSwatch label="Surface Dim" varName="--rd-color-surface-dim" />
        <ColorSwatch label="Surface Bright" varName="--rd-color-surface-bright" />
        <ColorSwatch label="Container Lowest" varName="--rd-color-surface-container-lowest" />
        <ColorSwatch label="Container Low" varName="--rd-color-surface-container-low" />
        <ColorSwatch label="Container Default" varName="--rd-color-surface-container" />
        <ColorSwatch label="Container High" varName="--rd-color-surface-container-high" />
        <ColorSwatch label="Container Highest" varName="--rd-color-surface-container-highest" />
      </Section>

      <Section title="Primary Brand Accent">
        <ColorSwatch label="Primary" varName="--rd-color-primary" textColor="var(--rd-color-on-primary)" />
        <ColorSwatch label="On Primary" varName="--rd-color-on-primary" />
        <ColorSwatch label="Primary Container" varName="--rd-color-primary-container" textColor="var(--rd-color-on-primary-container)" />
        <ColorSwatch label="On Primary Container" varName="--rd-color-on-primary-container" />
        <ColorSwatch label="Inverse Primary" varName="--rd-color-inverse-primary" />
      </Section>

      <Section title="Secondary Accent">
        <ColorSwatch label="Secondary" varName="--rd-color-secondary" textColor="var(--rd-color-on-secondary)" />
        <ColorSwatch label="On Secondary" varName="--rd-color-on-secondary" />
        <ColorSwatch label="Secondary Container" varName="--rd-color-secondary-container" textColor="var(--rd-color-on-secondary-container)" />
        <ColorSwatch label="On Secondary Container" varName="--rd-color-on-secondary-container" />
      </Section>

      <Section title="Tertiary Highlight">
        <ColorSwatch label="Tertiary" varName="--rd-color-tertiary" textColor="var(--rd-color-on-tertiary)" />
        <ColorSwatch label="On Tertiary" varName="--rd-color-on-tertiary" />
        <ColorSwatch label="Tertiary Container" varName="--rd-color-tertiary-container" textColor="var(--rd-color-on-tertiary-container)" />
        <ColorSwatch label="On Tertiary Container" varName="--rd-color-on-tertiary-container" />
      </Section>

      <Section title="Feedback & Outlines">
        <ColorSwatch label="Error" varName="--rd-color-error" textColor="var(--rd-color-on-error)" />
        <ColorSwatch label="Error Container" varName="--rd-color-error-container" textColor="var(--rd-color-on-error-container)" />
        <ColorSwatch label="Outline" varName="--rd-color-outline" />
        <ColorSwatch label="Outline Variant" varName="--rd-color-outline-variant" />
        <ColorSwatch label="Focus Ring" varName="--rd-color-focus" textColor="#ffffff" />
      </Section>
    </div>
  ),
};
