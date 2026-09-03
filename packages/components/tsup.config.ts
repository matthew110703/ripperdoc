import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  clean: true,
  sourcemap: true,
  external: [
    'react',
    'react-dom',
    '@ripperdoc-chrome77/tokens',
    '@ripperdoc-chrome77/themes',
    '@ripperdoc-chrome77/utils',
  ],
  banner: {
    js: "'use client';",
  },
});
