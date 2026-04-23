import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  globalName: 'SimpleWatch',
  dts: true,
  clean: true,
  sourcemap: true,
});
