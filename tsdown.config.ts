import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  globalName: 'SimpleWatch',
  dts: true,
  clean: true,
  sourcemap: true,
});
