import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'unplugin-dts/vite'
import path from 'node:path'
import pkg from './package.json' with {type: 'json'}
import {libInjectCss} from 'vite-plugin-lib-inject-css'

// Only peer dependencies stay external. Anything else the package imports
// must be bundled, otherwise consumers hit "module not found" at runtime.
const externals = Object.keys(pkg.peerDependencies)

export default defineConfig({
    plugins: [
        libInjectCss(),
        react(),
        dts({
            bundleTypes: false,
            tsconfigPath: 'tsconfig.build.json',
        }),
    ],
    build: {
        outDir: 'build',
        emptyOutDir: true,
        copyPublicDir: false,
        cssMinify: false,
        minify: false,

        lib: {
            entry: path.join(import.meta.dirname, 'src/package/index.ts'),
            fileName: (format, entryName) => `${entryName}.${format}.js`,
            formats: ['es', 'cjs'],
        },

        rollupOptions: {
            external: (id) => externals.some(pkg => id === pkg || id.startsWith(`${pkg}/`)),
        },
    },
})
