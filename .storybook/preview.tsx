import React, { useEffect } from 'react';
import type { Preview } from '@storybook/nextjs-vite';

// Foundations and Themes
import '../packages/tokens/src/foundations.css';
import '../packages/themes/src/obsidian.css';
import '../packages/themes/src/luminous.css';

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          ['Welcome', 'Philosophy', 'Architecture', 'Getting Started'],
          'Foundations',
          [
            'Colors',
            'Typography',
            'Spacing & Radius',
            'Elevation & Depth',
            'Motion System',
            [
              'Overview And Controls',
              'Core Motions Live Showcase',
              'Interactive Gesture Physics',
              'Attention Seekers Live',
              'Shared Layout And Morphing',
              'Physics Laboratory',
              'Live MFE Dashboard',
            ],
            'Motion & Grid',
          ],
          'Themes',
          ['Theme Architecture', 'Obsidian', 'Luminous', 'Comparison'],
          'Primitives',
          ['Box', 'Stack', 'Inline', 'Container'],
          'Actions',
          ['Button', 'IconButton'],
          'Feedback',
          ['Badge', 'Spinner'],
          'Surfaces',
          ['Card'],
          '*',
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Ripperdoc Theme (Obsidian / Luminous)',
      defaultValue: 'obsidian',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'obsidian', title: 'Obsidian (Dark Cinematic)', icon: 'moon' },
          { value: 'luminous', title: 'Luminous (Light Editorial)', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'obsidian';

      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.style.backgroundColor =
          theme === 'obsidian' ? 'var(--rd-color-background, #131313)' : 'var(--rd-color-background, #f8f9ff)';
        document.body.style.color =
          theme === 'obsidian' ? 'var(--rd-color-on-background, #e5e2e1)' : 'var(--rd-color-on-background, #0b1c30)';
      }, [theme]);

      return (
        <div
          data-theme={theme}
          style={{
            fontFamily: 'var(--rd-font-sans)',
            color: 'var(--rd-color-on-surface)',
            backgroundColor: 'transparent',
            minHeight: '100%',
            transition: 'background-color 200ms ease, color 200ms ease',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;