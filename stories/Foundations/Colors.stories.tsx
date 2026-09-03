import React, { useState } from 'react';
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
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`var(${varName})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      onClick={handleCopy}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--rd-radius-md)',
        overflow: 'hidden',
        border: `1px solid ${borderColor}`,
        background: `var(${varName})`,
        minHeight: '92px',
        padding: '0.75rem',
        justifyContent: 'space-between',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      title="Click to copy CSS variable"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: textColor }}>{label}</div>
        {copied && (
          <span
            style={{
              fontSize: '9px',
              fontFamily: 'var(--rd-font-mono)',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: '#4ade80',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            COPIED
          </span>
        )}
      </div>
      <div style={{ fontSize: '0.6875rem', opacity: 0.85, color: textColor, fontFamily: 'var(--rd-font-mono)' }}>
        {varName}
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  children,
}) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--rd-color-outline-variant)', paddingBottom: '0.5rem' }}>
      <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600, color: 'var(--rd-color-on-surface)' }}>
        {title}
      </h3>
      {subtitle && (
        <span style={{ fontSize: '0.75rem', color: 'var(--rd-color-on-surface-variant)', fontFamily: 'var(--rd-font-mono)' }}>
          {subtitle}
        </span>
      )}
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
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
      {/* HUD Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ fontFamily: 'var(--rd-font-mono)', fontSize: '11px', color: 'var(--rd-color-primary)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          FOUNDATIONS // COLOR ENGINE
        </div>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '28px', fontWeight: 700, color: 'var(--rd-color-on-surface)' }}>
          Normalized Semantic Color Palette
        </h1>
        <p style={{ margin: 0, color: 'var(--rd-color-on-surface-variant)', fontSize: '14px' }}>
          Click any color tile to copy its CSS custom property. Switch between <strong>Obsidian</strong> and <strong>Luminous</strong> in the Storybook toolbar to see live theme adaptation.
        </p>
      </div>

      <Section title="Surfaces & Depth Layers" subtitle="Progressive tonal luminance contract">
        <ColorSwatch label="Surface Base" varName="--rd-color-surface" />
        <ColorSwatch label="Surface Dim" varName="--rd-color-surface-dim" />
        <ColorSwatch label="Surface Bright" varName="--rd-color-surface-bright" />
        <ColorSwatch label="Container Lowest" varName="--rd-color-surface-container-lowest" />
        <ColorSwatch label="Container Low" varName="--rd-color-surface-container-low" />
        <ColorSwatch label="Container Default" varName="--rd-color-surface-container" />
        <ColorSwatch label="Container High" varName="--rd-color-surface-container-high" />
        <ColorSwatch label="Container Highest" varName="--rd-color-surface-container-highest" />
      </Section>

      <Section title="Primary Brand Accent" subtitle="Primary interactive focal triggers">
        <ColorSwatch label="Primary Accent" varName="--rd-color-primary" textColor="var(--rd-color-on-primary)" />
        <ColorSwatch label="On Primary Text" varName="--rd-color-on-primary" />
        <ColorSwatch label="Primary Container" varName="--rd-color-primary-container" textColor="var(--rd-color-on-primary-container)" />
        <ColorSwatch label="On Primary Container" varName="--rd-color-on-primary-container" />
        <ColorSwatch label="Inverse Primary" varName="--rd-color-inverse-primary" />
      </Section>

      <Section title="Secondary Accent" subtitle="Structural neutral & slate accents">
        <ColorSwatch label="Secondary" varName="--rd-color-secondary" textColor="var(--rd-color-on-secondary)" />
        <ColorSwatch label="On Secondary" varName="--rd-color-on-secondary" />
        <ColorSwatch label="Secondary Container" varName="--rd-color-secondary-container" textColor="var(--rd-color-on-secondary-container)" />
        <ColorSwatch label="On Secondary Container" varName="--rd-color-on-secondary-container" />
      </Section>

      <Section title="Tertiary Highlight" subtitle="Warmer highlight & copper accents">
        <ColorSwatch label="Tertiary" varName="--rd-color-tertiary" textColor="var(--rd-color-on-tertiary)" />
        <ColorSwatch label="On Tertiary" varName="--rd-color-on-tertiary" />
        <ColorSwatch label="Tertiary Container" varName="--rd-color-tertiary-container" textColor="var(--rd-color-on-tertiary-container)" />
        <ColorSwatch label="On Tertiary Container" varName="--rd-color-on-tertiary-container" />
      </Section>

      <Section title="Feedback & Outlines" subtitle="Accessible contrast boundaries & focus indicators">
        <ColorSwatch label="Error / Destructive" varName="--rd-color-error" textColor="var(--rd-color-on-error)" />
        <ColorSwatch label="Error Container" varName="--rd-color-error-container" textColor="var(--rd-color-on-error-container)" />
        <ColorSwatch label="Outline Default" varName="--rd-color-outline" />
        <ColorSwatch label="Outline Variant" varName="--rd-color-outline-variant" />
        <ColorSwatch label="Focus Ring" varName="--rd-color-focus" textColor="#ffffff" />
      </Section>
    </div>
  ),
};
