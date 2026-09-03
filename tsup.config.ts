import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    'next',
    'next/image',
    'next/link',
    'next/navigation',
    'next/router',
  ],
  banner: {
    js: "'use client';",
  },
  esbuildOptions(options) {
    options.banner = {
      js: "'use client';",
    };
  },
});
