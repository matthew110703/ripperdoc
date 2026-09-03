import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom', '@ripperdoc-chrome77/tokens'],
  banner: {
    js: "'use client';",
  },
});
