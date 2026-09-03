import { create } from 'storybook/theming/create';

export const obsidianTheme = create({
  base: 'dark',
  colorPrimary: '#558dff',
  colorSecondary: '#b0c6ff',

  // UI
  appBg: '#0e0e0e',
  appContentBg: '#131313',
  appPreviewBg: '#131313',
  appBorderColor: 'rgba(255, 255, 255, 0.08)',
  appBorderRadius: 8,

  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',

  // Text colors
  textColor: '#e5e2e1',
  textInverseColor: '#131313',
  textMutedColor: '#8c90a0',

  // Toolbar default and active colors
  barTextColor: '#8c90a0',
  barSelectedColor: '#b0c6ff',
  barHoverColor: '#ffffff',
  barBg: '#131313',

  // Form colors
  inputBg: '#1c1b1b',
  inputBorder: '#424654',
  inputTextColor: '#e5e2e1',
  inputBorderRadius: 6,

  // Branding
  brandTitle: 'RIPPERDOC // Chrome77',
  brandUrl: '/',
  brandTarget: '_self',
});

export const luminousTheme = create({
  base: 'light',
  colorPrimary: '#2563eb',
  colorSecondary: '#004ac6',

  // UI
  appBg: '#f1f5f9',
  appContentBg: '#f8f9ff',
  appPreviewBg: '#f8f9ff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 8,

  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',

  // Text colors
  textColor: '#0b1c30',
  textInverseColor: '#ffffff',
  textMutedColor: '#565e74',

  // Toolbar default and active colors
  barTextColor: '#565e74',
  barSelectedColor: '#004ac6',
  barHoverColor: '#0b1c30',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#c3c6d7',
  inputTextColor: '#0b1c30',
  inputBorderRadius: 6,

  // Branding
  brandTitle: 'RIPPERDOC // Chrome77',
  brandUrl: '/',
  brandTarget: '_self',
});
