import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
  },
  {
    entry: {
      'browser': 'src/index.browser.ts'
    },
    format: ['cjs', 'esm'],
    dts: true,
    clean: false,
    outDir: 'dist'
  }
])
