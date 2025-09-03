import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'unplugin-dts/vite'
import path from 'path'
import { dependencies, devDependencies, peerDependencies } from './package.json'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

const externalsDeps = new Set([
  ...Object.keys(dependencies || {}),
  ...Object.keys(devDependencies || {}),
  ...Object.keys(peerDependencies || {}),
])

export default defineConfig({
  plugins: [
    libInjectCss(),
    react(),
    dts({
      bundleTypes: true,
      tsconfigPath: 'tsconfig.build.json',
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'build',
    cssMinify: false,
    minify: false,

    lib: {
      entry: path.join(__dirname, './src/package/index.ts'),
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es', 'cjs'],
    },

    rollupOptions: {
      external(id) {
        for (const pkg of externalsDeps) {
          if (id === pkg || id.startsWith(`${pkg}/`)) {
            return true
          }
        }

        return false
      },
    },
  },
})
