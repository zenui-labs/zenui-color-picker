import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'unplugin-dts/vite'
import path from "path";
import {dependencies, devDependencies} from './package.json'

export default defineConfig({
    plugins: [
        react(),
        dts({
            tsconfigPath: 'tsconfig.build.json',
        }),
    ],
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
    build: {
        lib: {
            entry: path.join(__dirname, './src/index.ts'),
            name: 'zenui-color-picker',
            fileName: (format, entryName) => `${entryName}.${format}.js`,
            formats: ['es', 'cjs', 'umd'],
        },
        outDir: 'dist-package',
        minify: false,
        cssMinify: false,
        rollupOptions: {
            external: [
                ...Object.keys(dependencies || {}),
                ...Object.keys(devDependencies || {}),
            ],
        },
    }
});
