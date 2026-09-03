import { addons } from 'storybook/manager-api';
import { obsidianTheme, luminousTheme } from './theme';

addons.setConfig({
  theme: obsidianTheme,
  panelPosition: 'bottom',
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
});

addons.register('ripperdoc/theme-sync', (api: any) => {
  api.on('GLOBALS_UPDATED', ({ globals }: any) => {
    if (globals?.theme) {
      api.setOptions({
        theme: globals.theme === 'luminous' ? luminousTheme : obsidianTheme,
      });
    }
  });
});
